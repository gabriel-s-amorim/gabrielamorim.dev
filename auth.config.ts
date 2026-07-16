import type { NextAuthConfig } from "next-auth";

/**
 * Configuração "leve" do Auth.js, sem o Credentials Provider (que depende
 * de Prisma/bcrypt, incompatíveis com o runtime Edge do middleware).
 * `auth.ts` estende esta config adicionando o provider para uso em Route
 * Handlers, Server Components e Server Actions (runtime Node.js).
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/projects", request.nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
