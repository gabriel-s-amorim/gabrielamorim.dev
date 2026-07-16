"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/lib/lenisContext";
import { getPrefersReducedMotion } from "@/lib/useReducedMotionPref";

const LINKS = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contato", label: "Contato" },
];

export function Nav() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, { offset: -88, duration: 1.1 });
    } else {
      el.scrollIntoView({
        behavior: getPrefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-soil-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between py-5">
        <a
          href="#hero"
          onClick={(event) => goTo(event, "hero")}
          className="font-serif text-lg tracking-wide text-linen-100"
          aria-label="Voltar ao início"
        >
          G·A
        </a>

        <ul className="hidden items-center gap-8 text-sm text-sage-400 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(event) => goTo(event, link.id)}
                className="transition-colors duration-300 hover:text-amber-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          onClick={(event) => goTo(event, "contato")}
          className="hidden rounded-full border border-moss-600/60 px-4 py-2 text-sm text-linen-200 transition-colors duration-300 hover:border-amber-400 hover:text-amber-300 sm:inline-block"
        >
          Vamos conversar
        </a>
      </nav>

      <ul className="section-container flex gap-6 overflow-x-auto pb-4 text-sm text-sage-400 md:hidden">
        {LINKS.map((link) => (
          <li key={link.id} className="shrink-0">
            <a
              href={`#${link.id}`}
              onClick={(event) => goTo(event, link.id)}
              className="transition-colors duration-300 hover:text-amber-400"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
