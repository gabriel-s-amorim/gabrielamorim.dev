import type { Project } from "@/types/content";

/**
 * Galerias de screenshot por slug — alimentam o carrossel interno dos cards.
 * Arquivos vivem em public/projects/<slug>/gallery/.
 */
export const projectGalleries: Record<string, string[]> = {
  "nativa-store": [
    "/projects/nativa-store/gallery/01-home.png",
    "/projects/nativa-store/gallery/02-produto.png",
    "/projects/nativa-store/gallery/03-carrinho.png",
    "/projects/nativa-store/gallery/04-checkout.png",
    "/projects/nativa-store/gallery/06-admin-dashboard.png",
  ],
  devlevel: [
    "/projects/devlevel/gallery/01-landing.png",
    "/projects/devlevel/gallery/03-dashboard.png",
    "/projects/devlevel/gallery/04-dashboard-charts.png",
    "/projects/devlevel/gallery/05-entries.png",
    "/projects/devlevel/gallery/07-reflection.png",
  ],
};

export function getProjectGallery(project: Project): string[] {
  return projectGalleries[project.id] ?? [];
}
