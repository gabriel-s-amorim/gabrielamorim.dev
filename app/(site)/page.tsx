import nextDynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero/Hero";
import { HashScroll } from "@/components/layout/HashScroll";

// A seção de Projetos busca dados publicados direto do banco a cada
// request — isso força renderização dinâmica, então uma edição no /admin
// aparece no site sem precisar de novo deploy.
export const dynamic = "force-dynamic";

const About = nextDynamic(() => import("@/components/sections/About").then((mod) => mod.About));
const Experience = nextDynamic(() =>
  import("@/components/sections/Experience").then((mod) => mod.Experience)
);
const Projects = nextDynamic(() =>
  import("@/components/sections/Projects/Projects").then((mod) => mod.Projects)
);
const Skills = nextDynamic(() =>
  import("@/components/sections/Skills").then((mod) => mod.Skills)
);
const Contact = nextDynamic(() =>
  import("@/components/sections/Contact").then((mod) => mod.Contact)
);

export default function Home() {
  return (
    <>
      <HashScroll />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
