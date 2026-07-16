"use client";

import { motion } from "framer-motion";
import { skills, languages } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

export function Skills() {
  const prefersReduced = useReducedMotionPref();
  const sortedSkills = [...skills].sort((a, b) => a.order - b.order);
  const sortedLanguages = [...languages].sort((a, b) => a.order - b.order);

  return (
    <section id="habilidades" className="relative bg-soil-950 py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Habilidades"
          title="Ferramentas que sustentam o dia a dia"
          description="Não é uma lista de badges — é o que realmente sustenta liderar uma equipe e escrever código em produção."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {sortedSkills.map((group, groupIndex) => (
            <Reveal key={group.id} delay={Math.min(groupIndex * 0.08, 0.24)}>
              <div className="h-full rounded-2xl border border-moss-600/30 bg-soil-800/40 p-7 sm:p-8">
                <h3 className="font-serif text-xl text-linen-100">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-moss-600/40 px-3.5 py-1.5 text-sm text-sage-300 transition-colors duration-300 hover:border-amber-400/60 hover:text-amber-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 max-w-md">
          <h3 className="text-xs uppercase tracking-wide2 text-amber-400">Idiomas</h3>
          <div className="mt-5 space-y-4">
            {sortedLanguages.map((lang) => (
              <div key={lang.id}>
                <div className="flex items-baseline justify-between text-sm text-sage-300">
                  <span>{lang.name}</span>
                  <span className="text-sage-500">{lang.level}</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-soil-600">
                  <motion.div
                    initial={{ width: prefersReduced ? `${lang.proficiency}%` : "0%" }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: prefersReduced ? 0 : 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full rounded-full bg-amber-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
