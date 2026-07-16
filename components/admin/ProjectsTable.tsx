"use client";

import Link from "next/link";
import type { Project } from "@prisma/client";
import { deleteProject, moveProject } from "@/app/admin/projects/actions";

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-moss-600/30">
      <table className="w-full text-left text-sm">
        <thead className="bg-soil-800/60 text-xs uppercase tracking-wide2 text-sage-500">
          <tr>
            <th className="px-4 py-3">Ordem</th>
            <th className="px-4 py-3">Projeto</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Destaque</th>
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-moss-600/20">
          {projects.map((project, index) => (
            <tr key={project.id} className="text-sage-300">
              <td className="px-4 py-4">
                <div className="flex items-center gap-1">
                  <form action={moveProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      type="submit"
                      disabled={index === 0}
                      className="rounded p-1 text-sage-500 transition-colors duration-300 hover:text-amber-400 disabled:opacity-30"
                      aria-label="Mover para cima"
                    >
                      ↑
                    </button>
                  </form>
                  <span className="w-6 text-center text-xs text-sage-500">{project.order}</span>
                  <form action={moveProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={index === projects.length - 1}
                      className="rounded p-1 text-sage-500 transition-colors duration-300 hover:text-amber-400 disabled:opacity-30"
                      aria-label="Mover para baixo"
                    >
                      ↓
                    </button>
                  </form>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="font-medium text-linen-100">{project.title}</p>
                <p className="text-xs text-sage-500">/{project.slug}</p>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide2 ${
                    project.status === "PUBLISHED"
                      ? "border-moss-500/50 text-moss-400"
                      : "border-sage-500/40 text-sage-500"
                  }`}
                >
                  {project.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                </span>
              </td>
              <td className="px-4 py-4">{project.featured ? "Sim" : "—"}</td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-sage-300 transition-colors duration-300 hover:text-amber-400"
                  >
                    Editar
                  </Link>
                  <form
                    action={deleteProject}
                    onSubmit={(event) => {
                      if (
                        !window.confirm(
                          `Excluir "${project.title}"? Essa ação não pode ser desfeita.`
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={project.id} />
                    <button
                      type="submit"
                      className="text-amber-500/80 transition-colors duration-300 hover:text-amber-400"
                    >
                      Excluir
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
