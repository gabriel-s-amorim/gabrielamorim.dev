import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-soil-600/60 bg-soil-950">
      <div className="section-container flex flex-col gap-4 py-10 text-sm text-sage-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. Feito com raiz, café e algumas releituras de código.
        </p>
        <div className="flex gap-6">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-amber-400"
          >
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-amber-400"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors duration-300 hover:text-amber-400"
          >
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
}
