import type { ISourceOptions } from "@tsparticles/engine";

export type ParticleVariant = "about" | "experience" | "projects";

const BASE: ISourceOptions = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 45,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 28, density: { enable: true, width: 900, height: 700 } },
    color: { value: "#d6a45a" },
    opacity: { value: { min: 0.12, max: 0.35 } },
    size: { value: { min: 1, max: 2.4 } },
    move: {
      enable: true,
      speed: 0.35,
      direction: "none",
      outModes: { default: "out" },
      random: true,
    },
    links: {
      enable: true,
      distance: 140,
      color: "#5c7d5f",
      opacity: 0.12,
      width: 1,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
      resize: { enable: true },
    },
  },
};

const VARIANTS: Record<ParticleVariant, ISourceOptions> = {
  about: {
    ...BASE,
    particles: {
      ...BASE.particles,
      number: { value: 22, density: { enable: true, width: 900, height: 700 } },
      color: { value: ["#d6a45a", "#7c9b7e"] },
      move: {
        enable: true,
        speed: 0.22,
        direction: "none",
        outModes: { default: "out" },
        random: true,
      },
      links: {
        enable: true,
        distance: 160,
        color: "#4a6b4f",
        opacity: 0.1,
        width: 1,
      },
    },
  },
  experience: {
    ...BASE,
    particles: {
      ...BASE.particles,
      number: { value: 36, density: { enable: true, width: 900, height: 700 } },
      color: { value: ["#7c9b7e", "#c3cec1"] },
      move: {
        enable: true,
        speed: 0.4,
        direction: "top",
        outModes: { default: "out" },
        random: true,
      },
      links: {
        enable: true,
        distance: 120,
        color: "#d6a45a",
        opacity: 0.08,
        width: 0.8,
      },
    },
  },
  projects: {
    ...BASE,
    particles: {
      ...BASE.particles,
      number: { value: 18, density: { enable: true, width: 900, height: 700 } },
      color: { value: "#a8763a" },
      move: {
        enable: true,
        speed: 0.18,
        direction: "none",
        outModes: { default: "bounce" },
        random: true,
      },
      links: {
        enable: false,
      },
    },
  },
};

export function getSectionParticleOptions(variant: ParticleVariant): ISourceOptions {
  return VARIANTS[variant];
}
