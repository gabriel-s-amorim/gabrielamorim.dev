"use client";

import { useEffect, useId } from "react";
import { tsParticles, type Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { useInViewOnce } from "@/lib/useInViewOnce";
import {
  getSectionParticleOptions,
  type ParticleVariant,
} from "./sectionParticleOptions";

let slimReady: Promise<void> | null = null;

function ensureSlim() {
  if (!slimReady) {
    slimReady = loadSlim(tsParticles);
  }
  return slimReady;
}

interface SectionParticlesProps {
  variant: ParticleVariant;
  className?: string;
}

/**
 * Campo de partículas por seção — carrega o engine só na primeira seção
 * visível e só monta o canvas quando entra na viewport.
 */
export function SectionParticles({ variant, className = "" }: SectionParticlesProps) {
  const prefersReduced = useReducedMotionPref();
  const [hostRef, inView] = useInViewOnce<HTMLDivElement>();
  const reactId = useId().replace(/:/g, "");
  const containerId = `section-particles-${variant}-${reactId}`;

  useEffect(() => {
    if (prefersReduced || !inView) return;

    let cancelled = false;
    let container: Container | undefined;

    (async () => {
      await ensureSlim();
      if (cancelled || !document.getElementById(containerId)) return;

      container = await tsParticles.load({
        id: containerId,
        options: getSectionParticleOptions(variant),
      });
    })();

    return () => {
      cancelled = true;
      container?.destroy();
    };
  }, [containerId, inView, prefersReduced, variant]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {!prefersReduced && inView && (
        <div id={containerId} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
