"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { getGsap } from "@/lib/gsap";

const Scene = dynamic(() => import("./Scene").then((mod) => mod.Scene), {
  ssr: false,
});

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const prefersReduced = useReducedMotionPref();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (prefersReduced || !contentRef.current) return;

    const { gsap, ScrollTrigger } = getGsap();
    const tween = gsap.to(contentRef.current, {
      yPercent: 16,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-soil-900"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {prefersReduced ? (
          <div className="h-full w-full bg-radial-fade" />
        ) : (
          <Scene dense={!isMobile} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soil-900/30 to-soil-900" />
      </div>

      <div ref={contentRef} className="section-container relative z-10 pt-28 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-xs uppercase tracking-wide2 text-amber-400"
        >
          {site.heroKicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] text-linen-100 sm:text-6xl md:text-7xl"
        >
          Gabriel Henrique
          <br />
          Santos Amorim
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
          className="mt-5 max-w-xl text-lg text-sage-300 sm:text-xl"
        >
          {site.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.48, ease: EASE }}
          className="mt-8 max-w-lg text-balance text-base text-sage-400 sm:text-lg"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-16 flex flex-col items-start gap-3 text-xs uppercase tracking-wide2 text-sage-500"
        >
          <span>Continue rolando</span>
          <span
            aria-hidden="true"
            className={`h-9 w-px bg-gradient-to-b from-amber-400 to-transparent ${
              prefersReduced ? "" : "animate-bounce"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
}
