import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "pr-assistant",
    title: "PR Assistant",
    tagline: "Review automático de Pull Requests com IA",
    description:
      "GitHub App que analisa diffs de PRs com Claude, posta comentários estruturados em português e evita reanálise duplicada com Redis — webhook HMAC, installation token e deploy serverless na Vercel.",
    stack: [
      "Next.js",
      "TypeScript",
      "GitHub App",
      "Claude",
      "Upstash Redis",
      "Vercel",
    ],
    links: {
      github: "https://github.com/gabriel-s-amorim/pr-reviewer-ai",
      demo: "https://pr-reviewer-ai-zeta.vercel.app",
    },
    image: "/projects/pr-assistant/demo.mp4",
    status: "live",
    order: 1,
    featured: true,
  },
  {
    id: "nativa-store",
    title: "Nativa Store",
    tagline: "E-commerce completo, do checkout ao painel",
    description:
      "Plataforma de e-commerce completa para a Nativa, com loja pública, painel administrativo e integrações reais de pagamento (Mercado Pago) e frete (Melhor Envio).",
    stack: ["Next.js", "TypeScript", "Node.js", "Mercado Pago", "Melhor Envio"],
    links: {
      github: "https://github.com/gabriel-s-amorim/nativa-store",
      demo: "https://nativa-store.vercel.app",
    },
    // Vídeo/GIF gerados por `pnpm capture:nativa-store` → public/projects/nativa-store/
    image: "/projects/nativa-store/demo.mp4",
    status: "live",
    order: 2,
    featured: true,
  },
  {
    id: "devlevel",
    title: "DevLevel",
    tagline: "Auto-observação com gamificação",
    description:
      "App de tracking comportamental para desenvolvedores, com journal diário, gamificação por XP/streak e análise de correlação entre compliance e produtividade.",
    stack: ["TypeScript", "PostgreSQL", "Prisma", "Auth.js"],
    links: {
      github: "https://github.com/gabriel-s-amorim/devlevel",
      demo: "https://habito-angular.vercel.app/",
    },
    // Vídeo/GIF gerados por `pnpm capture:devlevel` → public/projects/devlevel/
    image: "/projects/devlevel/demo.mp4",
    status: "live",
    order: 3,
    featured: true,
  },
];
