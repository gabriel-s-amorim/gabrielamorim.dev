"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("E-mail ou senha incorretos. Se errou várias vezes, aguarde alguns minutos.");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-wide2 text-sage-400">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-xs uppercase tracking-wide2 text-sage-400">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
        />
      </div>

      {error && <p className="text-sm text-amber-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-amber-400 px-6 py-3 font-medium text-soil-950 transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
