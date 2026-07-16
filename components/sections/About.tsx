import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionParticles } from "@/components/visuals/SectionParticles";
import { NoiseBlob } from "@/components/visuals/NoiseBlob";

const callouts = [
  {
    label: "Em produção",
    body: "Há dois anos lidero o time técnico de um e-commerce que não para. Liderança, pra mim, é criar processos que sobrevivem à minha ausência.",
  },
  {
    label: "Fora do código",
    body: "Natureza, silêncio, meditação. Mesmo princípio de um índice bem colocado: reduzir ruído, isolar o que importa.",
  },
] as const;

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-soil-900 py-28 sm:py-36">
      <SectionParticles variant="about" />
      <NoiseBlob
        className="-right-24 top-10 h-[22rem] w-[22rem] opacity-80 sm:right-0 sm:h-[28rem] sm:w-[28rem]"
        color="rgba(214, 164, 90, 0.12)"
        scale={0.5}
        speed={0.14}
      />
      <NoiseBlob
        className="-left-32 bottom-0 h-[18rem] w-[18rem] opacity-70 sm:h-[24rem] sm:w-[24rem]"
        color="rgba(92, 125, 95, 0.14)"
        scale={0.65}
        speed={0.1}
      />

      <div className="section-container relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Sobre" title="Raiz antes de altura" />
          <Reveal delay={0.1}>
            <dl className="mt-4 space-y-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide2 text-moss-400">Atuação</dt>
                <dd className="mt-1 text-linen-200">Technical Lead, e-commerce</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide2 text-moss-400">
                  Tempo liderando
                </dt>
                <dd className="mt-1 text-linen-200">~2 anos</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide2 text-moss-400">
                  Fora do código
                </dt>
                <dd className="mt-1 text-linen-200">Natureza, meditação, contemplação</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="space-y-5">
          {callouts.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.1}>
              <article className="border-l border-amber-400/40 pl-5 sm:pl-6">
                <p className="text-xs uppercase tracking-wide2 text-moss-400">{item.label}</p>
                <p className="mt-2 text-lg leading-snug text-sage-300 sm:text-xl">{item.body}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.22}>
            <blockquote className="mt-2 max-w-xl font-serif text-2xl leading-snug text-linen-100 sm:text-3xl">
              Resolver a causa, não o sintoma. Construir por camadas — sem pressa de aparência.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
