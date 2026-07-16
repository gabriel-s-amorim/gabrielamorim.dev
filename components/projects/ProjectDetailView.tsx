"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const touchStartX = useRef<number | null>(null);
  const current: GalleryItem | undefined = gallery[active];

  function go(delta: number) {
    if (gallery.length === 0) return;
    setActive((prev) => (prev + delta + gallery.length) % gallery.length);
  }

  function onTouchStart(clientX: number) {
    touchStartX.current = clientX;
  }

  function onTouchEnd(clientX: number) {
    if (touchStartX.current === null) return;
    const delta = clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta < 0 ? 1 : -1);
  }

  return (
    <div className="pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-20 sm:pt-28 md:pb-24">
      {/* Mobile: mídia edge-to-edge primeiro */}
      <div className="lg:hidden">
        <div className="section-container pb-3 pt-2">
          <Link
            href="/#projetos"
            className="inline-flex min-h-10 items-center gap-2 text-sm text-sage-400 active:text-amber-400"
          >
            ← Projetos
          </Link>
        </div>

        <div className="relative bg-soil-950">
          <div
            className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]"
            onTouchStart={(event) => onTouchStart(event.touches[0]?.clientX ?? 0)}
            onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          >
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, x: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : -16 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  className="absolute inset-0"
                >
                  <ProjectMedia
                    src={current.src}
                    title={project.title}
                    label={current.label}
                    reduceMotion={reduce}
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-soil-950 to-transparent" />

            <div className="absolute inset-x-0 top-3 z-10 flex items-center justify-between px-3">
              <span className="rounded-full bg-soil-950/55 px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-linen-100 backdrop-blur">
                {current?.label} · {active + 1}/{gallery.length || 1}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="rounded-full border border-white/20 bg-soil-950/55 px-3 py-1.5 text-[10px] uppercase tracking-wide2 text-linen-100 backdrop-blur active:border-amber-400"
              >
                Tela cheia
              </button>
            </div>

            {gallery.length > 1 && (
              <div className="pointer-events-none absolute inset-x-4 bottom-3 z-10 flex gap-1">
                {gallery.map((item, index) => (
                  <span
                    key={item.src}
                    className={`h-1 flex-1 rounded-full ${
                      index === active ? "bg-amber-400" : "bg-white/25"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {gallery.length > 0 && (
            <div className="flex gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`relative h-[4.25rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl border transition active:scale-95 ${
                    index === active
                      ? "border-amber-400 ring-1 ring-amber-400/40"
                      : "border-white/10 opacity-80"
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
                  <span className="absolute inset-x-0 bottom-0 bg-soil-950/80 py-0.5 text-center text-[9px] uppercase tracking-wide text-linen-100">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="section-container mt-5 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-wide2 text-amber-400">
              {project.tagline}
            </p>
            <h1 className="mt-2 font-serif text-[2rem] leading-tight text-linen-100">
              {project.title}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-sage-300">
              {project.description}
            </p>
          </div>

          {project.stack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-moss-600/45 bg-soil-800/50 px-2.5 py-1.5 text-xs text-sage-300">
                    <TechIcon name={tech} className="h-3.5 w-3.5 text-amber-400" />
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <p className="text-xs text-sage-500">Deslize a imagem · toque nas miniaturas</p>
        </div>
      </div>

      {/* Desktop / tablet wide */}
      <div className="section-container hidden lg:block">
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-2 text-sm text-sage-400 transition hover:text-amber-400"
        >
          ← Voltar aos projetos
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-moss-700/40 bg-soil-950 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
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
                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition ${
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

          <div>
            <p className="text-xs uppercase tracking-wide2 text-amber-400">{project.tagline}</p>
            <h1 className="mt-3 font-serif text-5xl text-linen-100">{project.title}</h1>
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
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 text-sm font-semibold text-soil-950 hover:bg-amber-300"
                >
                  Abrir demo ao vivo
                  <IconExternal className="h-4 w-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-moss-600/50 px-5 text-sm text-sage-300 hover:border-amber-400/60 hover:text-amber-300"
                >
                  <IconGitHub className="h-4 w-4" />
                  Ver código
                </a>
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

      {/* Barra de ação sticky — acima do dock mobile */}
      <div className="fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom))] z-40 border-t border-moss-700/40 bg-soil-950/92 px-3 py-2.5 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          {project.links.demo && (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className="inline-flex min-h-11 flex-[1.4] items-center justify-center gap-1.5 rounded-2xl bg-amber-400 px-3 text-sm font-semibold text-soil-950"
            >
              Demo
              <IconExternal className="h-3.5 w-3.5" />
            </motion.a>
          )}
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-2xl border border-moss-600/50 text-sm text-sage-300"
            >
              <IconGitHub className="h-4 w-4" />
              Código
            </motion.a>
          )}
          <motion.button
            type="button"
            onClick={() => setLightbox(true)}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-moss-600/50 text-sm text-sage-300"
          >
            Fullscreen
          </motion.button>
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
