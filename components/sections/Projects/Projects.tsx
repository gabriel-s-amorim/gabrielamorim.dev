import { getPublishedProjects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export async function Projects() {
  const projects = await getPublishedProjects();
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projetos" className="relative bg-soil-900 py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projetos"
          title="Coisas que construí e mantenho"
          description="Cada projeto carrega uma decisão técnica real por trás — não apenas uma vitrine."
        />

        {sorted.length === 0 ? (
          <p className="text-sage-400">Novos projetos a caminho.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
