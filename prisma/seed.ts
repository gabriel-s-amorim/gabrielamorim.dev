import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { projects } from "../content/projects";

const db = new PrismaClient();

/**
 * Migra os dados reais de content/projects.ts (Fase 1) para o banco —
 * sem inventar ou alterar nada — e cria o usuário admin único a partir de
 * ADMIN_EMAIL/ADMIN_PASSWORD. Idempotente: pode ser rodado mais de uma vez.
 */
async function main() {
  console.log("Seedando projetos a partir de content/projects.ts...");

  for (const project of projects) {
    await db.project.upsert({
      where: { slug: project.id },
      update: {
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        stack: project.stack,
        githubUrl: project.links.github ?? null,
        demoUrl: project.links.demo ?? null,
        coverImage: project.image ?? null,
        order: project.order,
        featured: project.featured ?? false,
        status: "PUBLISHED",
      },
      create: {
        slug: project.id,
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        stack: project.stack,
        githubUrl: project.links.github ?? null,
        demoUrl: project.links.demo ?? null,
        coverImage: project.image ?? null,
        order: project.order,
        featured: project.featured ?? false,
        status: "PUBLISHED",
      },
    });
    console.log(`  ✓ ${project.title}`);
  }

  // Remove placeholder legado quando o PR Assistant (ou outro projeto) ocupa o slot
  const removed = await db.project.deleteMany({
    where: { slug: "projeto-em-construcao" },
  });
  if (removed.count > 0) {
    console.log("  ✓ Removido placeholder: projeto-em-construcao");
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn(
      "\nADMIN_EMAIL/ADMIN_PASSWORD não definidos no ambiente — pulando criação do usuário admin."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await db.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  console.log(`  ✓ Usuário admin pronto: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
