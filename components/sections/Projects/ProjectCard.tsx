"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/content";
import { TechIcon } from "@/components/ui/TechIcon";
import { IconExternal, IconGitHub } from "@/components/ui/icons";
import { getProjectGallery } from "@/content/projectGalleries";

const EASE = [0.16, 1, 0.3, 1] as const;

function ProjectMedia({
  src,
  title,
  reduceMotion,
}: {
  src: string;
  title: string;
  reduceMotion: boolean | null;
}) {
  const isVideo = /\.(mp4|webm)$/i.test(src);
  const stillFallback = src.replace(/demo\.(mp4|webm|gif)$/i, "cover.png");

  if (isVideo && !reduceMotion) {
    return (
      <video
        className="h-full w-full object-cover object-top"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={stillFallback !== src ? stillFallback : undefined}
        aria-label={`Demo do projeto ${title}`}
      >
        <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
    );
  }

  const imageSrc = reduceMotion && isVideo ? stillFallback : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={`Prévia do projeto ${title}`}
      className="h-full w-full object-cover object-top"
      loading="lazy"
      decoding="async"
    />
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isComingSoon = project.status === "in-progress";
  const gallery = getProjectGallery(project);
  const [activeShot, setActiveShot] = useState<string | null>(null);
  const mediaSrc = activeShot ?? project.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32, scale: shouldReduceMotion ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.75,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.1, 0.3),
        ease: EASE,
      }}
      whileHover={isComingSoon || shouldReduceMotion ? undefined : { y: -8 }}
      whileTap={isComingSoon || shouldReduceMotion ? undefined : { scale: 0.985 }}
      className={`group relative flex h-full snap-center flex-col overflow-hidden rounded-3xl border transition-[border-color,box-shadow] duration-500 ${
        isComingSoon
          ? "border-dashed border-moss-600/40 bg-soil-800/30"
          : "border-moss-600/40 bg-soil-800/70 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.8)] hover:border-amber-400/55 hover:shadow-[0_28px_60px_-24px_rgba(214,164,90,0.35)]"
      }`}
    >
      {mediaSrc && !isComingSoon ? (
        <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-moss-700/30 bg-soil-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={mediaSrc}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
              className="absolute inset-0"
            >
              <ProjectMedia
                src={mediaSrc}
                title={project.title}
                reduceMotion={shouldReduceMotion}
              />
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-soil-900 via-soil-900/50 to-transparent"
          />

          {gallery.length > 0 && (
            <div className="absolute inset-x-0 bottom-3 z-10 flex gap-2 overflow-x-auto px-3 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => setActiveShot(null)}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition ${
                  !activeShot
                    ? "border-amber-400 ring-1 ring-amber-400/40"
                    : "border-white/15 opacity-80"
                }`}
                aria-label="Ver demo em vídeo"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image?.replace(/demo\.(mp4|webm|gif)$/i, "cover.png") ?? gallery[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-soil-950/35 text-[10px] font-semibold uppercase tracking-wide text-linen-100">
                  Demo
                </span>
              </button>
              {gallery.map((shot, shotIndex) => (
                <button
                  key={shot}
                  type="button"
                  onClick={() => setActiveShot(shot)}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition active:scale-95 ${
                    activeShot === shot
                      ? "border-amber-400 ring-1 ring-amber-400/40"
                      : "border-white/15 opacity-80"
                  }`}
                  aria-label={`Screenshot ${shotIndex + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-fade opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wide2 text-amber-400">
              {project.tagline}
            </span>
            {isComingSoon && (
              <span className="shrink-0 rounded-full border border-sage-500/40 px-3 py-1 text-[10px] uppercase tracking-wide2 text-sage-400">
                Em breve
              </span>
            )}
          </div>

          <h3 className="mt-3 font-serif text-2xl text-linen-100 sm:text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-sage-300 sm:text-base">
            {project.description}
          </p>

          {project.stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-moss-600/45 bg-soil-900/50 px-2.5 py-1.5 text-xs text-sage-300 transition-colors duration-300 hover:border-amber-400/50 hover:text-amber-300">
                    <TechIcon name={tech} className="h-3.5 w-3.5 text-amber-400" />
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isComingSoon && (
          <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3">
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 text-sm font-semibold text-soil-950 transition-colors hover:bg-amber-300 sm:flex-none"
              >
                Abrir demo
                <IconExternal className="h-4 w-4" />
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-moss-600/50 px-4 text-sm text-sage-300 transition-colors hover:border-amber-400/60 hover:text-amber-300"
              >
                <IconGitHub className="h-4 w-4" />
                Código
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
