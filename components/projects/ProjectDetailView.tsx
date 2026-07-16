"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/content";
import { getProjectGallery, type GalleryItem } from "@/content/projectGalleries";
import { TechIcon } from "@/components/ui/TechIcon";
import { IconExternal, IconGitHub } from "@/components/ui/icons";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectLightbox } from "./ProjectLightbox";

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const reduce = useReducedMotion();
  const gallery = useMemo(() => getProjectGallery(project), [project]);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current: GalleryItem | undefined = gallery[active];

  return (
    <div className="pb-28 pt-28 md:pb-20">
      <div className="section-container">
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-2 text-sm text-sage-400 transition hover:text-amber-400"
        >
          ← Voltar aos projetos
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-moss-700/40 bg-soil-950 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="group relative block aspect-[16/11] w-full overflow-hidden text-left"
                aria-label="Abrir galeria em tela cheia"
              >
                {current && (
                  <ProjectMedia
                    src={current.src}
                    title={project.title}
                    label={current.label}
                    reduceMotion={reduce}
                    priority
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soil-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-soil-950/60 px-3 py-1.5 text-xs uppercase tracking-wide2 text-linen-100 backdrop-blur transition group-hover:border-amber-400/60 group-hover:text-amber-300">
                  Tela cheia
                </span>
              </button>

              {gallery.length > 0 && (
                <div className="flex gap-2 overflow-x-auto border-t border-moss-700/30 p-3">
                  {gallery.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActive(index)}
                      onDoubleClick={() => {
                        setActive(index);
                        setLightbox(true);
                      }}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition active:scale-95 ${
                        index === active
                          ? "border-amber-400 ring-1 ring-amber-400/40"
                          : "border-white/10 opacity-75 hover:opacity-100"
                      }`}
                      aria-label={`Mostrar ${item.label}`}
                    >
                      <ProjectMedia
                        src={
                          item.kind === "video"
                            ? item.src.replace(/demo\.(mp4|webm)$/i, "cover.png")
                            : item.src
                        }
                        title={project.title}
                        label={item.label}
                        reduceMotion
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-soil-950/75 px-1 py-0.5 text-center text-[10px] uppercase tracking-wide text-linen-100">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide2 text-amber-400">{project.tagline}</p>
            <h1 className="mt-3 font-serif text-4xl text-linen-100 sm:text-5xl">{project.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-sage-300">{project.description}</p>

            {project.stack.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-moss-600/45 bg-soil-800/50 px-3 py-1.5 text-sm text-sage-300">
                      <TechIcon name={tech} className="h-4 w-4 text-amber-400" />
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 text-sm font-semibold text-soil-950 hover:bg-amber-300"
                >
                  Abrir demo ao vivo
                  <IconExternal className="h-4 w-4" />
                </motion.a>
              )}
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-moss-600/50 px-5 text-sm text-sage-300 hover:border-amber-400/60 hover:text-amber-300"
                >
                  <IconGitHub className="h-4 w-4" />
                  Ver código
                </motion.a>
              )}
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-moss-600/50 px-5 text-sm text-sage-300 transition hover:border-amber-400/60 hover:text-amber-300"
              >
                Galeria fullscreen
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProjectLightbox
        open={lightbox}
        items={gallery}
        index={active}
        title={project.title}
        onClose={() => setLightbox(false)}
        onChange={setActive}
      />
    </div>
  );
}
