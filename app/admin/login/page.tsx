import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login — Painel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/projects");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-soil-950 px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-wide2 text-amber-400">Painel administrativo</p>
        <h1 className="mt-2 font-serif text-3xl text-linen-100">Bem-vindo de volta</h1>
        <p className="mt-2 text-sm text-sage-400">
          Acesso restrito. Entre com as credenciais do administrador.
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
