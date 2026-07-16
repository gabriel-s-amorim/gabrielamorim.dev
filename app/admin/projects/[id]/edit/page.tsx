import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata: Metadata = {
  title: "Editar projeto — Painel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await db.project.findUnique({ where: { id: params.id } });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminHeader />
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
