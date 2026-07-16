"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewOnceOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Ativa uma flag na primeira vez que o elemento entra na viewport.
 * Usado para lazy-load de fundos generativos (tsParticles, blobs).
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOnceOptions = {}
): [RefObject<T>, boolean] {
  const { rootMargin = "120px 0px", threshold = 0.05 } = options;
  const ref = useRef<T>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return [ref, inView];
}
