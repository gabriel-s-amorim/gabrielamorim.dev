import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedProjectBySlug,
  getPublishedProjectSlugs,
} from "@/lib/projects";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedProjectSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getPublishedProjectBySlug(params.slug);
  if (!project) return { title: "Projeto" };

  return {
    title: `${project.title} · Gabriel Amorim`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getPublishedProjectBySlug(params.slug);
  if (!project || project.status === "in-progress") notFound();

  return <ProjectDetailView project={project} />;
}
