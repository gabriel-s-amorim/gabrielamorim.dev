import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata: Metadata = {
  title: "Novo projeto — Painel",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <AdminHeader />
      <ProjectForm mode="create" />
    </div>
  );
}
