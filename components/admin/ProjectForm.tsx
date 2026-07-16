"use client";

import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { Project as PrismaProject } from "@prisma/client";
import { saveProject } from "@/app/admin/projects/actions";
import { ProjectCard } from "@/components/sections/Projects/ProjectCard";
import type { Project as PublicProject } from "@/types/content";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ProjectFormProps {
  mode: "create" | "edit";
  project?: PrismaProject;
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-amber-400 px-6 py-3 font-medium text-soil-950 transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Salvando…" : mode === "create" ? "Criar projeto" : "Salvar alterações"}
    </button>
  );
}

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const [state, formAction] = useFormState(saveProject, undefined);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [tagline, setTagline] = useState(project?.tagline ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [longDescription, setLongDescription] = useState(project?.longDescription ?? "");
  const [stack, setStack] = useState(project?.stack.join(", ") ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? "");
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl ?? "");
  const [coverImage, setCoverImage] = useState(project?.coverImage ?? "");
  const [status, setStatus] = useState(project?.status ?? "DRAFT");
  const [featured, setFeatured] = useState(project?.featured ?? false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  const previewProject: PublicProject = useMemo(() => {
    const stackList = stack
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    return {
      id: project?.id ?? "preview",
      title: title || "Título do projeto",
      tagline: tagline || "Tagline curta",
      description: description || "A descrição aparece aqui enquanto você escreve.",
      stack: stackList,
      links: {
        github: githubUrl || undefined,
        demo: demoUrl || undefined,
      },
      status: githubUrl || demoUrl ? "live" : "in-progress",
      image: coverImage || undefined,
      order: project?.order ?? 0,
      featured,
    };
  }, [title, tagline, description, stack, githubUrl, demoUrl, coverImage, featured, project]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={project?.id ?? ""} />

        <div>
          <label htmlFor="title" className="text-xs uppercase tracking-wide2 text-sage-400">
            Título
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label htmlFor="slug" className="text-xs uppercase tracking-wide2 text-sage-400">
            Slug (usado na URL/identificador)
          </label>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 font-mono text-sm text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="text-xs uppercase tracking-wide2 text-sage-400">
            Tagline curta
          </label>
          <input
            id="tagline"
            name="tagline"
            required
            value={tagline}
            onChange={(event) => setTagline(event.target.value)}
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-xs uppercase tracking-wide2 text-sage-400">
            Descrição curta (aparece no card)
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label
            htmlFor="longDescription"
            className="text-xs uppercase tracking-wide2 text-sage-400"
          >
            Descrição longa (opcional — reservado para uma futura página de detalhe)
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            rows={4}
            value={longDescription ?? ""}
            onChange={(event) => setLongDescription(event.target.value)}
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label htmlFor="stack" className="text-xs uppercase tracking-wide2 text-sage-400">
            Stack (separado por vírgulas)
          </label>
          <input
            id="stack"
            name="stack"
            value={stack}
            onChange={(event) => setStack(event.target.value)}
            placeholder="Next.js, TypeScript, PostgreSQL"
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="githubUrl" className="text-xs uppercase tracking-wide2 text-sage-400">
              URL do GitHub (opcional)
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              value={githubUrl ?? ""}
              onChange={(event) => setGithubUrl(event.target.value)}
              className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
            />
          </div>

          <div>
            <label htmlFor="demoUrl" className="text-xs uppercase tracking-wide2 text-sage-400">
              URL do demo (opcional)
            </label>
            <input
              id="demoUrl"
              name="demoUrl"
              type="url"
              value={demoUrl ?? ""}
              onChange={(event) => setDemoUrl(event.target.value)}
              className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="coverImage" className="text-xs uppercase tracking-wide2 text-sage-400">
            URL da imagem de capa (opcional)
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            value={coverImage ?? ""}
            onChange={(event) => setCoverImage(event.target.value)}
            className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="order" className="text-xs uppercase tracking-wide2 text-sage-400">
              Ordem
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={project?.order ?? 0}
              className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
            />
          </div>

          <div>
            <label htmlFor="status" className="text-xs uppercase tracking-wide2 text-sage-400">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value as "DRAFT" | "PUBLISHED")}
              className="mt-2 w-full rounded-lg border border-moss-600/40 bg-soil-800/60 px-4 py-3 text-linen-100 outline-none transition-colors duration-300 focus:border-amber-400"
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>

          <div className="flex items-end gap-2 pb-3">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 rounded border-moss-600/60 bg-soil-800 accent-amber-400"
            />
            <label htmlFor="featured" className="text-sm text-sage-300">
              Destaque
            </label>
          </div>
        </div>

        {state?.error && <p className="text-sm text-amber-400">{state.error}</p>}

        <SubmitButton mode={mode} />
      </form>

      <div className="lg:sticky lg:top-10">
        <p className="mb-4 text-xs uppercase tracking-wide2 text-sage-500">
          Preview — como o card aparece no site
        </p>
        <div className="max-w-sm">
          <ProjectCard project={previewProject} index={0} />
        </div>
      </div>
    </div>
  );
}
