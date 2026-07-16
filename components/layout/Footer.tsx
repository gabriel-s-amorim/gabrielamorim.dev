import { site } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-soil-600/60 bg-soil-950 pb-[max(5.5rem,calc(4.5rem+env(safe-area-inset-bottom)))] md:pb-0">
      <div className="section-container flex flex-col gap-6 py-10 text-sm text-sage-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. Feito com raiz, café e algumas releituras de código.
        </p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
