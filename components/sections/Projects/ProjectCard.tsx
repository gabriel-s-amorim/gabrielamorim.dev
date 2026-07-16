"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isComingSoon = project.status === "in-progress";

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.7,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.08, 0.24),
        ease: EASE,
      }}
      whileHover={isComingSoon || shouldReduceMotion ? undefined : { y: -6 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-colors duration-500 sm:p-8 ${
        isComingSoon
          ? "border-dashed border-moss-600/40 bg-soil-800/30"
          : "border-moss-600/40 bg-soil-800/60 hover:border-amber-400/50"
      }`}
    >
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

        <h3 className="mt-4 font-serif text-2xl text-linen-100 sm:text-3xl">{project.title}</h3>

        <p className="mt-4 text-sage-300">{project.description}</p>

        {project.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}
      </div>

      {!isComingSoon && (
        <div className="relative z-10 mt-8 flex items-center gap-5 text-sm">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-linen-100 transition-colors duration-300 hover:text-amber-400"
            >
              Ver demo <span aria-hidden="true">→</span>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sage-400 transition-colors duration-300 hover:text-amber-400"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
