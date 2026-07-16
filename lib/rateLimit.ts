import { db } from "@/lib/db";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

/**
 * Rate limiting básico do login, sustentado na própria tabela Postgres
 * (LoginAttempt) em vez de um serviço externo como Upstash — evita mais
 * uma conta/credencial para um painel de admin de único usuário.
 */
export async function isRateLimited(identifier: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - WINDOW_MS);
  const failedAttempts = await db.loginAttempt.count({
    where: { identifier, success: false, createdAt: { gte: windowStart } },
  });
  return failedAttempts >= MAX_FAILED_ATTEMPTS;
}

export async function recordLoginAttempt(identifier: string, success: boolean) {
  await db.loginAttempt.create({ data: { identifier, success } });

  if (success) {
    await db.loginAttempt.deleteMany({ where: { identifier, success: false } });
  }
}
