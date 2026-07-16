"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionParticles } from "@/components/visuals/SectionParticles";
import { NoiseBlob } from "@/components/visuals/NoiseBlob";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionPref();

  useEffect(() => {
    if (prefersReduced || !lineRef.current || !sectionRef.current) return;

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 65%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReduced]);

  const sorted = [...experience].sort((a, b) => a.order - b.order);

  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-soil-950 py-28 sm:py-36"
    >
      <SectionParticles variant="experience" />
      <NoiseBlob
        className="right-[-10%] top-24 h-[26rem] w-[26rem] opacity-70"
        color="rgba(124, 155, 126, 0.12)"
        scale={0.58}
        speed={0.12}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Experiência"
          title="Uma trajetória construída em produção"
          description="Do site institucional à liderança técnica de dezenas de milhares de pedidos por mês."
        />

        <div ref={sectionRef} className="relative mt-4 pl-8 sm:pl-12">
          <div className="absolute left-[3px] top-0 h-full w-px bg-moss-700/40 sm:left-[7px]" />
          <div
            ref={lineRef}
            className="absolute left-[3px] top-0 h-full w-px origin-top bg-amber-400 sm:left-[7px]"
            style={{ transform: "scaleY(0)" }}
          />

          <ol className="space-y-10">
            {sorted.map((job, index) => (
              <li key={job.id} className="relative">
                <span className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-amber-400 bg-soil-950 sm:-left-12" />
                <Reveal delay={Math.min(index * 0.08, 0.3)}>
                  <article className="max-w-2xl rounded-sm border border-moss-700/25 bg-soil-900/40 px-5 py-5 backdrop-blur-[2px] sm:px-6 sm:py-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-serif text-2xl text-linen-100">{job.role}</h3>
                      <span className="text-xs uppercase tracking-wide2 text-sage-500">
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-amber-400">
                      {job.company}
                      {job.current && (
                        <span className="ml-2 rounded-full border border-amber-400/40 px-2 py-0.5 text-[10px] uppercase tracking-wide2 text-amber-300">
                          Atual
                        </span>
                      )}
                    </p>
                    <p className="mt-3 text-sage-300">{job.summary}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-1">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 border-t border-moss-700/20 pt-2 text-sm text-sage-400 first:border-t-0 first:pt-0"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-moss-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
