# gabrielamorim.dev

Meu portfólio pessoal. Diferente dos meus outros projetos, esse aqui não resolve um
problema de negócio — ele existe para contar quem eu sou, técnica e pessoalmente, num
lugar que eu controlo por completo.

## Por que esse projeto existe

A maior parte dos portfólios de dev parece a mesma coisa: fundo escuro genérico, gradiente
roxo/azul, cards de "sobre mim" com bullet points de LinkedIn. Eu queria o oposto disso.
Queria um lugar que tivesse a cadência de quem passa tempo em silêncio, que respirasse
devagar, e que ainda assim mostrasse — sem enfeite — o trabalho técnico real que sustento
todos os dias: liderar um time, manter integrações críticas de pagamento e logística no ar,
e otimizar banco de dados sob pressão de produção.

## Direção de design — "jardim editorial noturno"

O nome que dei internamente pra essa estética resume a intenção: um jardim (orgânico, vivo,
com seu próprio tempo) visto à noite (contemplativo, sem pressa), com o rigor tipográfico de
uma revista editorial (autoral, não-template).

Isso se traduz em decisões concretas:

- **Paleta terrosa, não SaaS.** Fundo quase preto com sub-tom verde (`soil-900`/`soil-950`),
  acentos em âmbar (`amber-400`) e verde-musgo (`moss-600`), texto em off-white quente
  (`linen-200`). Nada de roxo/azul genérico de produto.
- **Tipografia com personalidade.** [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (serifada, variável, com eixos ópticos que dão uma sensação quase "respirando") para
  títulos, [Inter](https://fonts.google.com/specimen/Inter) para o corpo — legível, limpa,
  sem competir com o título.
- **Textura, não brilho.** Um overlay de grain sutil (SVG `feTurbulence` gerado em CSS, sem
  nenhuma imagem carregada) dá uma sensação de papel/filme em vez do "polimento" digital
  padrão.
- **Espiritualidade sem clipart.** Nenhum ícone de cristal, tarot ou lua. A parte
  contemplativa da minha vida aparece no ritmo do scroll, no espaço generoso entre seções, e
  na forma como o texto da seção "Sobre" é escrito — não em iconografia literal.
- **Movimento com propósito.** Scroll suave (Lenis) + revelações progressivas (GSAP
  ScrollTrigger + Framer Motion) fazem o conteúdo aparecer no ritmo da leitura, não tudo de
  uma vez. Nada de animação decorativa que não carregue significado.

## Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Framework | Next.js 14 (App Router) + TypeScript | Performance, SSR/SSG, DX |
| Estilo | Tailwind CSS 3 | Tokens de design centralizados em `tailwind.config.ts` |
| Micro-interação | Framer Motion | Hover, reveals de componente, transições declarativas |
| Storytelling de scroll | GSAP + ScrollTrigger | Parallax do hero, linha da timeline de experiência |
| Smooth scroll | Lenis | Sincronizado ao ticker do GSAP para não conflitar |
| 3D / imersivo | React Three Fiber + drei (sobre Three.js) | Campo de partículas orgânico no hero |
| Fontes | `next/font/google` (Fraunces + Inter) | Self-hosted, sem layout shift |
| Deploy | Vercel | Zero-config para Next.js |

> Nota de versões: `@react-three/fiber`/`@react-three/drei` estão pinados na major 8/9
> porque a major 9 exige React 19 como peer — este projeto roda em React 18 (padrão estável
> do Next 14). Ao migrar para React 19/Next 15+, vale revisitar essa versão.

## Estrutura de conteúdo (pensando na Fase 2 desde já)

Nada de texto solto dentro dos componentes. Todo o conteúdo real (experiência, projetos,
habilidades, dados do site) vive em `content/*.ts`, tipado por `types/content.ts`:

```
types/content.ts       → interfaces Project, ExperienceEntry, SkillGroup, etc.
content/site.ts        → nome, cargo, tagline, contatos
content/experience.ts  → histórico profissional
content/education.ts   → formação acadêmica
content/projects.ts    → Nativa Store, DevLevel, próximo projeto
content/skills.ts      → habilidades por categoria + idiomas
```

Os campos desses tipos (`id`, `title`, `description`, `tags`/`stack`, `links`, `order`,
`status`) foram escolhidos de propósito para mapear direto em colunas de tabela. Isso é o
que torna a Fase 2 uma migração, não uma reescrita.

## Rodando localmente

Pré-requisitos: Node 18.18+ e [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para gerar o build de produção (o que a Vercel roda no deploy):

```bash
pnpm build
pnpm start
```

## Deploy

Projeto pronto para a Vercel sem configuração adicional: conecte o repositório, o
framework é detectado automaticamente como Next.js, e o build usa `pnpm build`.

## Acessibilidade e performance

- `prefers-reduced-motion` é respeitado em duas camadas: um hook (`lib/useReducedMotionPref`)
  desliga o Canvas 3D e reduz amplitude das animações de GSAP/Framer Motion; uma regra CSS
  global (`app/globals.css`) zera qualquer animação/transição residual como rede de
  segurança.
- Nenhuma tela de intro bloqueia o conteúdo — o hero carrega o texto imediatamente e o
  Canvas 3D entra com fade progressivo, sem gate de "pular introdução".
- Seções abaixo da primeira viewport (Sobre, Experiência, Projetos, Habilidades, Contato)
  são code-split via `next/dynamic` em `app/page.tsx`.
- O campo de partículas do hero reduz a contagem de pontos em telas menores que 768px.
- Fontes carregadas via `next/font/google` (self-hosted, `display: swap`, sem FOUC).

## Assets que ainda preciso fornecer

O projeto está completo e funcional com placeholders onde ainda não há asset real:

- **Favicon**: criei um SVG provisório (`app/icon.svg`) com o mesmo motivo de partículas do
  hero. Troque por uma versão definitiva se quiser algo mais autoral.
- **Foto pessoal**: não há foto no hero/sobre hoje (o texto carrega o peso visual). Se
  quiser adicionar uma, é um ponto de extensão natural na seção "Sobre".
- **Screenshots dos projetos**: os cards de projeto hoje não usam imagem (`image` no tipo
  `Project` está definido, mas vazio). Ao ter capturas de tela reais da Nativa Store e do
  DevLevel, é só preencher esse campo e ajustar o `ProjectCard` para renderizá-las com
  `next/image`.

## Roadmap — Fase 2 (painel administrativo)

A Fase 1 é 100% estática e não tem banco de dados nem autenticação — de propósito, pra
poder ir ao ar hoje. O próximo passo planejado, quando eu confirmar, é:

1. **Banco de dados**: PostgreSQL hospedado (Neon ou Supabase).
2. **ORM**: Prisma, com modelos `Project`, `ExperienceEntry`, `SkillGroup` espelhando as
   interfaces já existentes em `types/content.ts`.
3. **Autenticação**: Auth.js protegendo a rota `/admin` — mesma stack que já uso no
   DevLevel, por consistência entre os projetos.
4. **CRUD**: interface simples em `/admin` para cadastrar/editar/remover projetos sem
   precisar tocar em código ou fazer novo deploy.
5. **Migração de dados**: os arrays em `content/*.ts` se tornam o *seed* inicial das tabelas
   — não uma estrutura descartável.

Nenhum código dessa fase foi implementado ainda. A Fase 1 foi construída para que essa
transição seja incremental: trocar a fonte dos dados (arquivo estático → banco via Prisma
Client) sem precisar reescrever os componentes de seção.
