"use client";

import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap";
import { getPrefersReducedMotion } from "@/lib/useReducedMotionPref";
import { LenisContext } from "@/lib/lenisContext";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (getPrefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
