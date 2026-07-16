"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "@/lib/lenisContext";
import { getPrefersReducedMotion } from "@/lib/useReducedMotionPref";
import { SocialLinks } from "@/components/ui/SocialLinks";

const LINKS = [
  { id: "sobre", label: "Sobre", short: "Sobre" },
  { id: "experiencia", label: "Experiência", short: "Exp" },
  { id: "projetos", label: "Projetos", short: "Work" },
  { id: "habilidades", label: "Habilidades", short: "Skills" },
  { id: "contato", label: "Contato", short: "Fala" },
];

export function Nav() {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...LINKS.map((l) => l.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, { offset: -72, duration: 1.05 });
    } else {
      el.scrollIntoView({
        behavior: getPrefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-soil-900/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="section-container flex items-center justify-between py-4 sm:py-5">
          <a
            href="#hero"
            onClick={(event) => goTo(event, "hero")}
            className="font-serif text-lg tracking-wide text-linen-100"
            aria-label="Voltar ao início"
          >
            G·A
          </a>

          <ul className="hidden items-center gap-7 text-sm text-sage-400 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => goTo(event, link.id)}
                  className={`transition-colors duration-300 hover:text-amber-400 ${
                    active === link.id ? "text-amber-400" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 sm:flex">
            <SocialLinks size="sm" />
            <a
              href="#contato"
              onClick={(event) => goTo(event, "contato")}
              className="rounded-full border border-moss-600/60 px-4 py-2 text-sm text-linen-200 transition-colors duration-300 hover:border-amber-400 hover:text-amber-300"
            >
              Vamos conversar
            </a>
          </div>
        </nav>
      </header>

      {/* Dock mobile — dopamina tátil + seção ativa */}
      <nav
        aria-label="Navegação mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-moss-700/40 bg-soil-950/90 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between gap-1">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="flex-1">
                <motion.a
                  href={`#${link.id}`}
                  onClick={(event) => goTo(event, link.id)}
                  whileTap={reduce ? undefined : { scale: 0.9 }}
                  className={`relative flex min-h-12 flex-col items-center justify-center rounded-2xl px-1 text-[10px] uppercase tracking-wide2 transition-colors ${
                    isActive ? "text-amber-300" : "text-sage-500"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute inset-1 -z-10 rounded-2xl bg-amber-400/15"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`mb-1 h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-amber-400 shadow-[0_0_10px_rgba(214,164,90,0.8)]" : "bg-moss-700"
                    }`}
                  />
                  {link.short}
                </motion.a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
