import { getPublishedProjects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionParticles } from "@/components/visuals/SectionParticles";
import { ProjectCard } from "./ProjectCard";

export async function Projects() {
  const projects = await getPublishedProjects();
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projetos" className="relative overflow-hidden bg-soil-900 py-24 sm:py-36">
      <SectionParticles variant="projects" />
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Projetos"
          title="Coisas que construí e mantenho"
          description="Deslize nos cards, toque nas miniaturas e veja o fluxo real — não só um título bonito."
        />
      </div>

      {sorted.length === 0 ? (
        <p className="section-container text-sage-400">Novos projetos a caminho.</p>
      ) : (
        <div className="relative z-10 mt-2">
          <p className="section-container mb-4 text-xs uppercase tracking-wide2 text-sage-500 md:hidden">
            Arraste sideways →
          </p>
          <div className="projects-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pb-4 pt-1 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))] lg:grid-cols-3">
            {sorted.map((project, index) => (
              <div
                key={project.id}
                className="w-[min(86vw,22rem)] shrink-0 snap-center md:w-auto md:shrink"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
