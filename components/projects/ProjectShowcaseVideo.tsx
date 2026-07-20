"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProjectShowcaseVideoProps {
  youtubeId: string;
  title: string;
  durationLabel?: string;
  className?: string;
}

export function ProjectShowcaseVideo({
  youtubeId,
  title,
  durationLabel,
  className = "",
}: ProjectShowcaseVideoProps) {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const poster = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-moss-700/40 bg-soil-950 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:rounded-3xl ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-br from-amber-400/15 via-transparent to-moss-500/10 opacity-80" />

      <div className="relative aspect-video w-full bg-soil-950">
        {started ? (
          <iframe
            src={embedSrc}
            title={`Walkthrough do projeto ${title}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
            aria-label={`Reproduzir walkthrough de ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soil-950/90 via-soil-950/40 to-soil-950/30" />

            <motion.span
              initial={false}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400 text-soil-950 shadow-[0_18px_50px_-12px_rgba(214,164,90,0.75)] transition sm:h-[4.5rem] sm:w-[4.5rem]"
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-0.5 h-7 w-7 sm:h-8 sm:w-8"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
              </svg>
            </motion.span>

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-3 sm:p-5">
              <div className="min-w-0 text-left">
                <p className="text-[10px] uppercase tracking-wide2 text-amber-300/90 sm:text-[11px]">
                  Walkthrough
                </p>
                <p className="mt-0.5 truncate text-sm text-linen-100 sm:text-base">
                  Tour completo do {title}
                </p>
              </div>
              {durationLabel && (
                <span className="shrink-0 rounded-full border border-white/15 bg-soil-950/65 px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-linen-100 backdrop-blur sm:text-[11px]">
                  {durationLabel}
                </span>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
