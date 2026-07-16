import type { Project as PrismaProject } from "@prisma/client";
import { db } from "@/lib/db";
import type { Project } from "@/types/content";

/**
 * Converte uma linha do banco no shape público já consumido pelo
 * `ProjectCard` da Fase 1 — nenhuma mudança visual foi necessária, só a
 * fonte dos dados. "Em breve" continua sendo derivado da ausência de
 * links (github/demo), não do campo de rascunho/publicado do admin.
 */
export function toPublicProject(project: PrismaProject): Project {
  return {
    id: project.slug,
    title: project.title,
    tagline: project.tagline,
    description: project.description,
    stack: project.stack,
    links: {
      github: project.githubUrl ?? undefined,
      demo: project.demoUrl ?? undefined,
    },
    status: project.githubUrl || project.demoUrl ? "live" : "in-progress",
    image: project.coverImage ?? undefined,
    order: project.order,
    featured: project.featured,
  };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await db.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  return projects.map(toPublicProject);
}
