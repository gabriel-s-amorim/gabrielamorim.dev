import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero/Hero";

const About = dynamic(() => import("@/components/sections/About").then((mod) => mod.About));
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((mod) => mod.Experience)
);
const Projects = dynamic(() =>
  import("@/components/sections/Projects/Projects").then((mod) => mod.Projects)
);
const Skills = dynamic(() => import("@/components/sections/Skills").then((mod) => mod.Skills));
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((mod) => mod.Contact)
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
