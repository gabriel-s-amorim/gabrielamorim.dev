/**
 * Shapes compartilhados entre a camada de conteúdo estático (Fase 1) e o
 * futuro schema Prisma (Fase 2). Os nomes de campo aqui foram escolhidos
 * para mapear 1:1 em colunas de tabela (id, title, description, tags,
 * links, order, status), evitando retrabalho na migração para o painel
 * administrativo.
 */

export interface SiteContent {
  name: string;
  role: string;
  location: string;
  tagline: string;
  heroKicker: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
  };
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  summary: string;
  bullets: string[];
  order: number;
}

export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  status: string;
  period: string;
  order: number;
}

export type ProjectStatus = "live" | "in-progress";

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  links: ProjectLinks;
  status: ProjectStatus;
  image?: string;
  order: number;
  featured?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
  order: number;
}

export interface LanguageEntry {
  id: string;
  name: string;
  level: string;
  proficiency: number;
  order: number;
}
