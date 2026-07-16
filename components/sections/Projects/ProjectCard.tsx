"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/content";
import { getProjectGallery, type GalleryItem } from "@/content/projectGalleries";
import { TechIcon } from "@/components/ui/TechIcon";
import { IconExternal, IconGitHub } from "@/components/ui/icons";
import { ProjectMedia } from "@/components/projects/ProjectMedia";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isComingSoon = project.status === "in-progress";
  const gallery = useMemo(() => getProjectGallery(project), [project]);
  const frames: GalleryItem[] = gallery.length
    ? gallery
    : project.image
      ? [{ src: project.image, label: "Demo", kind: /\.(mp4|webm)$/i.test(project.image) ? "video" : "image" }]
      : [];

  const [active, setActive] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const href = `/projetos/${project.id}`;
  const current = frames[active];

  function scrubFromClientX(clientX: number) {
    const node = mediaRef.current;
    if (!node || frames.length < 2) return;
    const rect = node.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = Math.min(frames.length - 1, Math.floor(ratio * frames.length));
    setActive(next);
  }

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
      whileHover={isComingSoon || shouldReduceMotion ? undefined : { y: -6 }}
      className={`group relative flex h-full snap-center flex-col overflow-hidden rounded-3xl border transition-[border-color,box-shadow] duration-500 ${
        isComingSoon
          ? "border-dashed border-moss-600/40 bg-soil-800/30"
          : "border-moss-600/40 bg-soil-800/70 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.85)] hover:border-amber-400/55 hover:shadow-[0_32px_70px_-28px_rgba(214,164,90,0.38)]"
      }`}
    >
      {current && !isComingSoon ? (
        <div
          ref={mediaRef}
          className="relative isolate min-h-[16rem] w-full overflow-hidden border-b border-moss-700/30 bg-soil-950 sm:min-h-[18rem] md:min-h-[20rem] aspect-[16/10]"
          onPointerEnter={() => setScrubbing(true)}
          onPointerLeave={() => setScrubbing(false)}
          onPointerMove={(event) => {
            if (event.pointerType === "mouse") scrubFromClientX(event.clientX);
          }}
          onTouchStart={(event) => scrubFromClientX(event.touches[0]?.clientX ?? 0)}
          onTouchMove={(event) => scrubFromClientX(event.touches[0]?.clientX ?? 0)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
              animate={{ opacity: 1, scale: scrubbing && !shouldReduceMotion ? 1.02 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
              className="absolute inset-0"
            >
              <ProjectMedia
                src={current.src}
                title={project.title}
                label={current.label}
                reduceMotion={shouldReduceMotion}
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-soil-950 via-soil-950/55 to-transparent"
          />

          {/* Progress scrub dots */}
          {frames.length > 1 && (
            <div className="pointer-events-none absolute inset-x-4 top-3 z-10 flex gap-1">
              {frames.map((frame, frameIndex) => (
                <span
                  key={frame.src}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-200 ${
                    frameIndex === active ? "bg-amber-400" : "bg-white/25"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 p-3">
            <div className="mb-2 flex items-end justify-between gap-3">
              <p className="text-[11px] uppercase tracking-wide2 text-linen-100/90">
                {current.label}
                <span className="text-sage-400">
                  {" "}
                  · {active + 1}/{frames.length}
                </span>
              </p>
              <p className="hidden text-[10px] uppercase tracking-wide2 text-sage-400 sm:block">
                Passe o mouse para explorar
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {frames.map((frame, frameIndex) => (
                <button
                  key={frame.src}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setActive(frameIndex);
                  }}
                  className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border transition active:scale-95 sm:h-16 sm:w-24 ${
                    frameIndex === active
                      ? "border-amber-400 ring-1 ring-amber-400/45"
                      : "border-white/15 opacity-80"
                  }`}
                  aria-label={`Ver ${frame.label}`}
                >
                  <ProjectMedia
                    src={
                      frame.kind === "video"
                        ? frame.src.replace(/demo\.(mp4|webm)$/i, "cover.png")
                        : frame.src
                    }
                    title={project.title}
                    label={frame.label}
                    reduceMotion
                  />
                </button>
              ))}
            </div>
          </div>
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

          <h3 className="mt-3 font-serif text-2xl text-linen-100 sm:text-3xl">
            {isComingSoon ? (
              project.title
            ) : (
              <Link href={href} className="transition-colors hover:text-amber-300">
                {project.title}
              </Link>
            )}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-sage-300 sm:text-base">
            {project.description}
          </p>

          {project.stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-moss-600/45 bg-soil-900/50 px-2.5 py-1.5 text-xs text-sage-300">
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
            <motion.div whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }} className="flex-1 sm:flex-none">
              <Link
                href={href}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 text-sm font-semibold text-soil-950 transition-colors hover:bg-amber-300 sm:w-auto"
              >
                Ver projeto
              </Link>
            </motion.div>
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-moss-600/50 px-4 text-sm text-sage-300 transition-colors hover:border-amber-400/60 hover:text-amber-300"
              >
                Demo
                <IconExternal className="h-4 w-4" />
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-moss-600/50 px-3 text-sm text-sage-300 transition-colors hover:border-amber-400/60 hover:text-amber-300"
                aria-label="GitHub"
              >
                <IconGitHub className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
