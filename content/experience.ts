import type { ExperienceEntry } from "@/types/content";

export const experience: ExperienceEntry[] = [
  {
    id: "visual-ecommerce",
    role: "Technical Lead e Desenvolvedor",
    company: "Visual E-commerce",
    period: "01/2024 — Atual",
    current: true,
    summary:
      "Time técnico de uma plataforma com ~80 mil pedidos/mês — performance de banco e integrações críticas.",
    bullets: [
      "Onboarding e documentação: rampa de 2 meses → 2 semanas.",
      "Personalização em tempo real (Fabric.js): ~40% menos tempo de customização.",
      "Índices SQL: queries críticas de ~900ms → ~300ms (~65%).",
    ],
    order: 1,
  },
  {
    id: "mercado-livre",
    role: "Estágio em Desenvolvimento Web",
    company: "Mercado Livre",
    period: "08/2023 — 01/2024",
    current: false,
    summary: "Componentes de alto tráfego no fluxo de compra — performance, a11y e E2E.",
    bullets: [
      "Lazy loading no carrinho: FCP −15%.",
      "Acessibilidade (WCAG/ARIA) no painel do vendedor.",
      "Dashboards internos + testes E2E com Cypress.",
    ],
    order: 2,
  },
  {
    id: "instituto-braudel",
    role: "Estagiário em Desenvolvimento de Software",
    company: "Instituto Fernand Braudel de Economia Mundial",
    period: "06/2021 — 12/2021",
    current: false,
    summary: "Primeiro contato profissional: site institucional com foco em estabilidade.",
    bullets: ["Manutenção do site e correção de bugs com a equipe interna."],
    order: 3,
  },
];
