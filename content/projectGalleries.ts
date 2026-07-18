import type { Project } from "@/types/content";

export type GalleryItem = {
  src: string;
  label: string;
  kind: "image" | "video";
};

/**
 * Galerias por slug — cards + página do projeto.
 * Arquivos em public/projects/<slug>/.
 */
export const projectGalleries: Record<string, GalleryItem[]> = {
  "pr-assistant": [
    {
      src: "/projects/pr-assistant/demo.mp4",
      label: "Demo",
      kind: "video",
    },
    {
      src: "/projects/pr-assistant/gallery/01-hero.png",
      label: "Landing",
      kind: "image",
    },
    {
      src: "/projects/pr-assistant/gallery/02-fluxo.png",
      label: "Fluxo",
      kind: "image",
    },
    {
      src: "/projects/pr-assistant/gallery/03-evidencia.png",
      label: "Evidência",
      kind: "image",
    },
    {
      src: "/projects/pr-assistant/gallery/06-bot-review.png",
      label: "Review do bot",
      kind: "image",
    },
    {
      src: "/projects/pr-assistant/gallery/05-produto.png",
      label: "Produto",
      kind: "image",
    },
  ],
  "nativa-store": [
    {
      src: "/projects/nativa-store/demo.mp4",
      label: "Demo",
      kind: "video",
    },
    {
      src: "/projects/nativa-store/gallery/01-home.png",
      label: "Home",
      kind: "image",
    },
    {
      src: "/projects/nativa-store/gallery/02-produto.png",
      label: "Produto",
      kind: "image",
    },
    {
      src: "/projects/nativa-store/gallery/03-carrinho.png",
      label: "Carrinho",
      kind: "image",
    },
    {
      src: "/projects/nativa-store/gallery/04-checkout.png",
      label: "Checkout",
      kind: "image",
    },
    {
      src: "/projects/nativa-store/gallery/06-admin-dashboard.png",
      label: "Admin",
      kind: "image",
    },
  ],
  devlevel: [
    {
      src: "/projects/devlevel/demo.mp4",
      label: "Demo",
      kind: "video",
    },
    {
      src: "/projects/devlevel/gallery/01-landing.png",
      label: "Landing",
      kind: "image",
    },
    {
      src: "/projects/devlevel/gallery/03-dashboard.png",
      label: "Dashboard",
      kind: "image",
    },
    {
      src: "/projects/devlevel/gallery/04-dashboard-charts.png",
      label: "Gráficos",
      kind: "image",
    },
    {
      src: "/projects/devlevel/gallery/05-entries.png",
      label: "Entradas",
      kind: "image",
    },
    {
      src: "/projects/devlevel/gallery/07-reflection.png",
      label: "Reflexão",
      kind: "image",
    },
  ],
};

export function getProjectGallery(project: Project | string): GalleryItem[] {
  const id = typeof project === "string" ? project : project.id;
  return projectGalleries[id] ?? [];
}

export function getProjectCover(project: Project): string {
  const gallery = getProjectGallery(project);
  const image = gallery.find((item) => item.kind === "image");
  return image?.src ?? project.image?.replace(/demo\.(mp4|webm|gif)$/i, "cover.png") ?? "";
}
