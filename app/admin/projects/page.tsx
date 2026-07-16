import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export const metadata: Metadata = {
  title: "Projetos — Painel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      <AdminHeader />

      {projects.length === 0 ? (
        <p className="text-sage-400">
          Nenhum projeto cadastrado ainda.{" "}
          <Link href="/admin/projects/new" className="text-amber-400 underline">
            Criar o primeiro
          </Link>
          .
        </p>
      ) : (
        <ProjectsTable projects={projects} />
      )}
    </div>
  );
}
