"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let registered = false;

/**
 * Registra o ScrollTrigger uma única vez, no cliente. Chamar em todo
 * componente que precisar de gsap/ScrollTrigger em vez de importar
 * diretamente, para evitar registro duplicado em fast refresh.
 */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
