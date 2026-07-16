import type { ExperienceEntry } from "@/types/content";

export const experience: ExperienceEntry[] = [
  {
    id: "visual-ecommerce",
    role: "Technical Lead e Desenvolvedor",
    company: "Visual E-commerce",
    period: "01/2024 — Atual",
    current: true,
    summary:
      "Liderando o time técnico de uma plataforma que processa cerca de 80 mil pedidos por mês, com foco em performance de banco de dados e integrações críticas de pagamento e logística.",
    bullets: [
      "Liderei o direcionamento técnico e a gestão de qualidade de uma equipe de 2 desenvolvedores em plataforma de e-commerce.",
      "Implementei protocolos de onboarding e documentação técnica de sistemas, reduzindo o tempo de rampa de novos integrantes de 2 meses para 2 semanas.",
      "Arquiteturei e desenvolvi ferramentas de personalização de produtos em tempo real com JavaScript avançado (Fabric.js), reduzindo em cerca de 40% o tempo de entrega de customizações solicitadas pelos clientes.",
      "Integrei e mantive APIs críticas de pagamento e logística (SafraPay, Magalu, Getnet, Sislogica/TMSLog), processando cerca de 80 mil pedidos por mês.",
      "Otimizei performance e segurança em bancos de dados SQL por meio de criação e ajuste de índices, reduzindo o tempo de queries críticas em cerca de 65% (de ~900ms para ~300ms).",
    ],
    order: 1,
  },
  {
    id: "mercado-livre",
    role: "Estágio em Desenvolvimento Web",
    company: "Mercado Livre",
    period: "08/2023 — 01/2024",
    current: false,
    summary:
      "Trabalhei em componentes de alto tráfego do fluxo de compra, unindo performance, acessibilidade e testes automatizados.",
    bullets: [
      "Refatorei componentes legados do fluxo de carrinho em React com lazy loading, reduzindo o First Contentful Paint (FCP) em 15%.",
      "Implementei melhorias de acessibilidade (WCAG e ARIA) no painel do vendedor, garantindo navegação por teclado e compatibilidade com leitores de tela.",
      "Otimizei o fluxo de checkout consumindo APIs internas para validação rápida de pagamentos.",
      "Desenvolvi dashboards internos em Node.js e React para monitoramento de logs de erro e estruturei testes E2E com Cypress no fluxo principal de busca e compras.",
    ],
    order: 2,
  },
  {
    id: "instituto-braudel",
    role: "Estagiário em Desenvolvimento de Software",
    company: "Instituto Fernand Braudel de Economia Mundial",
    period: "06/2021 — 12/2021",
    current: false,
    summary:
      "Meu primeiro contato profissional com desenvolvimento: manutenção de um site institucional com foco em estabilidade.",
    bullets: [
      "Desenvolvi e mantive o site institucional, entregando novos recursos com foco em estabilidade.",
      "Executei testes e corrigi bugs em colaboração com a equipe interna.",
    ],
    order: 3,
  },
];
