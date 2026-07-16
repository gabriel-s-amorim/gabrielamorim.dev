"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/validation/project";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
}

function parseProjectForm(formData: FormData) {
  const optionalUrl = (key: string) => {
    const value = (formData.get(key) as string | null)?.trim();
    return value ? value : undefined;
  };

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    longDescription: optionalUrl("longDescription"),
    stack: String(formData.get("stack") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    githubUrl: optionalUrl("githubUrl"),
    demoUrl: optionalUrl("demoUrl"),
    coverImage: optionalUrl("coverImage"),
    order: Number(formData.get("order") ?? 0) || 0,
    status: (formData.get("status") as string) === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    featured: formData.get("featured") === "on",
  };
}

export type ProjectActionState = { error?: string } | undefined;

/** Usada tanto para criar (id vazio) quanto para editar (id preenchido). */
export async function saveProject(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const parsed = projectSchema.safeParse(parseProjectForm(formData));

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  try {
    if (id) {
      await db.project.update({ where: { id }, data: parsed.data });
    } else {
      await db.project.create({ data: parsed.data });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Já existe um projeto com esse slug." };
    }
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await db.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function moveProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || (direction !== "up" && direction !== "down")) return;

  const projects = await db.project.findMany({ orderBy: { order: "asc" } });
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= projects.length) return;

  const current = projects[index];
  const swapWith = projects[swapIndex];

  await db.$transaction([
    db.project.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    db.project.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
