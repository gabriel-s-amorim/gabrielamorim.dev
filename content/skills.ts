import type { LanguageEntry, SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [
  {
    id: "linguagens-frameworks",
    title: "Linguagens & Frameworks",
    items: ["PHP", "Laravel", "JavaScript ES6+", "React", "Node.js", "HTML5", "CSS3"],
    order: 1,
  },
  {
    id: "banco-de-dados",
    title: "Banco de Dados",
    items: ["SQL", "Otimização de Queries", "Indexação", "Modelagem de Dados"],
    order: 2,
  },
  {
    id: "integracoes-ferramentas",
    title: "Integrações & Ferramentas",
    items: [
      "APIs RESTful",
      "Automação (Crons/Robôs)",
      "Marketplaces (ML, Shopee)",
      "ERPs (Bling, Tiny, Zoho, Webmais)",
      "Cypress / Fabric.js",
    ],
    order: 3,
  },
  {
    id: "metodologias-gestao",
    title: "Metodologias & Gestão",
    items: [
      "Liderança Técnica",
      "Mentoria / Onboarding",
      "Documentação de Processos",
      "Metodologias Ágeis",
    ],
    order: 4,
  },
];

export const languages: LanguageEntry[] = [
  { id: "portugues", name: "Português", level: "Nativo", proficiency: 100, order: 1 },
  { id: "ingles", name: "Inglês", level: "Instrumental", proficiency: 35, order: 2 },
];
