"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { GalleryItem } from "@/content/projectGalleries";
import { ProjectMedia } from "./ProjectMedia";

interface ProjectLightboxProps {
  open: boolean;
  items: GalleryItem[];
  index: number;
  title: string;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function ProjectLightbox({
  open,
  items,
  index,
  title,
  onClose,
  onChange,
}: ProjectLightboxProps) {
  const reduce = useReducedMotion();
  const current = items[index];

  const go = useCallback(
    (next: number) => {
      if (items.length === 0) return;
      const wrapped = (next + items.length) % items.length;
      onChange(wrapped);
    },
    [items.length, onChange]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(index + 1);
      if (event.key === "ArrowLeft") go(index - 1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, index, onClose, open]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-soil-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria fullscreen — ${title}`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs uppercase tracking-wide2 text-amber-400">{title}</p>
              <p className="mt-1 text-sm text-linen-200">
                {current.label}
                <span className="text-sage-500">
                  {" "}
                  · {index + 1}/{items.length}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-moss-600/50 px-4 py-2 text-sm text-sage-300 transition hover:border-amber-400 hover:text-amber-300"
            >
              Fechar
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-8">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(index - 1)}
              className="absolute left-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-soil-900/70 text-linen-100 backdrop-blur sm:flex md:left-6"
            >
              ←
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 1.01 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
                className="relative h-full max-h-[min(78vh,900px)] w-full max-w-6xl overflow-hidden rounded-2xl border border-moss-700/40 bg-soil-900"
              >
                <ProjectMedia
                  src={current.src}
                  title={title}
                  label={current.label}
                  reduceMotion={reduce}
                  fit="contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Próximo"
              onClick={() => go(index + 1)}
              className="absolute right-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-soil-900/70 text-linen-100 backdrop-blur sm:flex md:right-6"
            >
              →
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:justify-center sm:px-6">
            {items.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => onChange(itemIndex)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                  itemIndex === index
                    ? "border-amber-400 ring-1 ring-amber-400/50"
                    : "border-white/10 opacity-70"
                }`}
                aria-label={item.label}
              >
                <ProjectMedia
                  src={item.kind === "video" ? item.src.replace(/demo\.(mp4|webm)$/i, "cover.png") : item.src}
                  title={title}
                  label={item.label}
                  reduceMotion
                  className="pointer-events-none"
                />
                {item.kind === "video" && (
                  <span className="absolute inset-x-0 bottom-0 bg-soil-950/70 py-0.5 text-center text-[10px] uppercase tracking-wide text-linen-100">
                    Demo
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
