import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="sobre" className="relative bg-soil-900 py-28 sm:py-36">
      <div className="section-container grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
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

        <div className="space-y-6 text-lg leading-relaxed text-sage-300 sm:text-xl">
          <Reveal>
            <p>
              Há pouco mais de dois anos comecei a liderar uma equipe pequena dentro de uma
              operação de e-commerce que nunca para: pedidos entrando o dia inteiro, integrações
              de pagamento e logística que não podem falhar, banco de dados que precisa responder
              rápido mesmo sob pressão. Aprendi, na prática, que liderança técnica não é sobre ter
              todas as respostas — é sobre criar processos que sobrevivem à minha ausência:
              documentação que se lê de fato, onboarding que não depende de decorar segredos,
              decisões de arquitetura que qualquer pessoa da equipe consiga continuar.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p>
              Fora do código, minha rotina tem outro ritmo. Sou da natureza — literalmente: gosto
              de lugares onde o silêncio tem peso, e a meditação entrou na minha vida como uma
              ferramenta tão prática quanto qualquer índice de banco de dados bem colocado: reduz
              ruído, isola o que importa, deixa o sistema responder mais rápido ao que realmente
              precisa de atenção. Tenho também um lado mais espiritual, que raramente cabe numa
              reunião de trabalho, mas que sustenta como encaro problemas difíceis: com paciência,
              com a crença de que tudo tem seu tempo de maturação — inclusive um sistema em
              produção.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p>
              Entre otimizar uma query que caiu de 900ms para 300ms e sentar em silêncio
              observando uma árvore, encontrei o mesmo princípio: raiz antes de altura. Resolver a
              causa, não o sintoma. Construir por camadas, com paciência, sem pressa de aparência.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
