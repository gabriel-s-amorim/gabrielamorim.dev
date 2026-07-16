"use client";

import { useCallback, useEffect, useRef } from "react";
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
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (items.length === 0) return;
      onChange((next + items.length) % items.length);
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
          className="fixed inset-0 z-[80] flex flex-col bg-soil-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria fullscreen — ${title}`}
        >
          <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4">
            <div className="min-w-0">
              <p className="truncate text-[11px] uppercase tracking-wide2 text-amber-400">
                {title}
              </p>
              <p className="mt-0.5 truncate text-sm text-linen-200">
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
              className="shrink-0 rounded-full border border-moss-600/50 px-4 py-2 text-sm text-sage-300 active:border-amber-400 active:text-amber-300"
            >
              Fechar
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(delta) < 45) return;
              go(index + (delta < 0 ? 1 : -1));
            }}
          >
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(index - 1)}
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-soil-900/75 text-linen-100 backdrop-blur sm:left-4 sm:h-12 sm:w-12"
            >
              ←
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, x: reduce ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -20 }}
                transition={{ duration: reduce ? 0 : 0.22 }}
                className="relative h-[min(62dvh,520px)] w-full max-w-6xl overflow-hidden bg-soil-900 sm:mx-4 sm:h-[min(72dvh,900px)] sm:rounded-2xl sm:border sm:border-moss-700/40"
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
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-soil-900/75 text-linen-100 backdrop-blur sm:right-4 sm:h-12 sm:w-12"
            >
              →
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:justify-center sm:px-6">
            {items.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => onChange(itemIndex)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition active:scale-95 sm:h-16 sm:w-24 ${
                  itemIndex === index
                    ? "border-amber-400 ring-1 ring-amber-400/50"
                    : "border-white/10 opacity-70"
                }`}
                aria-label={item.label}
              >
                <ProjectMedia
                  src={
                    item.kind === "video"
                      ? item.src.replace(/demo\.(mp4|webm)$/i, "cover.png")
                      : item.src
                  }
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
