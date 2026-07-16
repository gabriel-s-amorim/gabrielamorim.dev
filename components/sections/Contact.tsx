import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-soil-900 py-24 pb-36 sm:py-40 md:pb-40"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-radial-fade" />
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Contato"
          title="Bora conversar?"
          description="Aberto a oportunidades de liderança técnica, colaborações e boas conversas sobre e-commerce, performance de banco de dados ou o que for."
          align="center"
        />

        <Reveal delay={0.12} className="mx-auto flex max-w-lg flex-col items-center gap-7">
          <a
            href={`mailto:${site.email}`}
            className="tap-pop inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 py-3.5 text-center font-semibold text-soil-950 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-amber-300 active:scale-95"
          >
            {site.email}
          </a>

          <SocialLinks size="lg" showLabels />
        </Reveal>
      </div>
    </section>
  );
}
