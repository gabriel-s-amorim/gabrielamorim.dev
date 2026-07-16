import type { Project } from "@/types/content";

export const projects: Project[] = [
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
    status: "live",
    order: 1,
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
    status: "live",
    order: 2,
    featured: true,
  },
  {
    id: "projeto-em-construcao",
    title: "Próximo projeto",
    tagline: "Em construção",
    description:
      "Um novo projeto está em desenvolvimento. Os detalhes chegam em breve — por enquanto, este espaço fica reservado para ele.",
    stack: [],
    links: {},
    status: "in-progress",
    order: 3,
    featured: false,
  },
];
