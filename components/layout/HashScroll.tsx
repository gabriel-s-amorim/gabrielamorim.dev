"use client";

import { useEffect } from "react";
import { useLenis } from "@/lib/lenisContext";
import { getPrefersReducedMotion } from "@/lib/useReducedMotionPref";

/** Quando a home abre com /#projetos (vindo de outra página), faz o scroll. */
export function HashScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const run = () => {
      const el = document.getElementById(hash);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -72, duration: 1.05 });
      } else {
        el.scrollIntoView({
          behavior: getPrefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    const timer = window.setTimeout(run, 80);
    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}
