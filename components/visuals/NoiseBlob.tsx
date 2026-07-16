"use client";

import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { useInViewOnce } from "@/lib/useInViewOnce";

interface NoiseBlobProps {
  /** Cor CSS do preenchimento (com alpha embutido ou via opacity do canvas). */
  color?: string;
  className?: string;
  /** Escala do ruído — valores maiores = forma mais suave. */
  scale?: number;
  /** Velocidade da animação. */
  speed?: number;
}

/**
 * Blob orgânico animado via simplex-noise.
 * Lazy: só desenha quando a seção está (ou esteve) na viewport.
 */
export function NoiseBlob({
  color = "rgba(214, 164, 90, 0.14)",
  className = "",
  scale = 0.55,
  speed = 0.18,
}: NoiseBlobProps) {
  const prefersReduced = useReducedMotionPref();
  const [hostRef, inView] = useInViewOnce<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!inView || prefersReduced) return;

    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise2D = createNoise2D();
    let raf = 0;
    let time = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const points = 64;

    const draw = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.5;
      const baseR = Math.min(w, h) * 0.38;

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);
        const n = noise2D(nx * scale + time, ny * scale + time * 0.7);
        const r = baseR * (0.82 + n * 0.22);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.92;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      time += speed * 0.012;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, hostRef, inView, prefersReduced, scale, speed]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
    >
      {!prefersReduced && inView && (
        <canvas ref={canvasRef} className="h-full w-full" />
      )}
      {prefersReduced && (
        <div
          className="h-full w-full rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
