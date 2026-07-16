import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validation/auth";
import { isRateLimited, recordLoginAttempt } from "@/lib/rateLimit";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = loginSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const identifier =
          headers().get("x-forwarded-for")?.split(",")[0]?.trim() ??
          headers().get("x-real-ip") ??
          "unknown";

        if (await isRateLimited(identifier)) {
          throw new Error("Muitas tentativas de login. Tente novamente em alguns minutos.");
        }

        const { email, password } = parsed.data;
        const admin = await db.adminUser.findUnique({ where: { email } });
        const isValidPassword = admin
          ? await bcrypt.compare(password, admin.passwordHash)
          : false;

        await recordLoginAttempt(identifier, Boolean(admin) && isValidPassword);

        if (!admin || !isValidPassword) return null;

        return { id: admin.id, email: admin.email };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
