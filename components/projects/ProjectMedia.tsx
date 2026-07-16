"use client";

import { useEffect, useRef } from "react";

interface ProjectMediaProps {
  src: string;
  title: string;
  label?: string;
  reduceMotion?: boolean | null;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}

export function ProjectMedia({
  src,
  title,
  label,
  reduceMotion = false,
  className = "",
  priority = false,
  fit = "cover",
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm)$/i.test(src);
  const stillFallback = src.replace(/demo\.(mp4|webm|gif)$/i, "cover.png");
  const objectClass = fit === "contain" ? "object-contain" : "object-cover object-top";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    const play = () => {
      void video.play().catch(() => undefined);
    };
    play();
  }, [src, reduceMotion]);

  if (isVideo && !reduceMotion) {
    return (
      <video
        ref={videoRef}
        className={`h-full w-full ${objectClass} ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={stillFallback !== src ? stillFallback : undefined}
        aria-label={label ?? `Demo do projeto ${title}`}
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
      alt={label ? `${title} — ${label}` : `Prévia do projeto ${title}`}
      className={`h-full w-full ${objectClass} ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
