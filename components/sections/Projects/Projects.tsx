import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projetos" className="relative bg-soil-900 py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projetos"
          title="Coisas que construí e mantenho"
          description="Cada projeto carrega uma decisão técnica real por trás — não apenas uma vitrine."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
