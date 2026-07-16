import Link from "next/link";
import { logout } from "@/lib/actions/logout";

export function AdminHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-moss-600/30 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide2 text-amber-400">Painel</p>
        <h1 className="mt-1 font-serif text-2xl text-linen-100">Projetos</h1>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link
          href="/admin/projects"
          className="text-sage-400 transition-colors duration-300 hover:text-amber-400"
        >
          Listagem
        </Link>
        <Link
          href="/admin/projects/new"
          className="rounded-full border border-moss-600/60 px-4 py-2 text-linen-200 transition-colors duration-300 hover:border-amber-400 hover:text-amber-300"
        >
          Novo projeto
        </Link>
        <Link
          href="/"
          target="_blank"
          className="text-sage-400 transition-colors duration-300 hover:text-amber-400"
        >
          Ver site ↗
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-sage-500 transition-colors duration-300 hover:text-amber-400"
          >
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}
