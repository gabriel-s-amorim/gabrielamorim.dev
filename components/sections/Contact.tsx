import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-soil-900 py-28 sm:py-40">
      <div aria-hidden="true" className="absolute inset-0 bg-radial-fade" />
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Contato"
          title="Bora conversar?"
          description="Aberto a oportunidades de liderança técnica, colaborações e boas conversas sobre e-commerce, performance de banco de dados ou o que for."
          align="center"
        />

        <Reveal delay={0.15} className="mx-auto flex max-w-md flex-col items-center gap-6">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 font-medium text-soil-950 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
          >
            {site.email}
          </a>

          <div className="flex gap-8 text-sm text-sage-400">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-amber-400"
            >
              LinkedIn
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-amber-400"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
