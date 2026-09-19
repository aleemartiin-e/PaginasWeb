import { portfolioItems } from "@/content/portfolio";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PortfolioCard } from "@/components/cards/portfolio-card";

export function Portfolio() {
  return (
    <section id="portfolio" className="border-t border-border bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Proyectos en camino"
          description="Estamos construyendo nuestro portfolio de proyectos reales. Esta sección se actualizará con casos de estudio a medida que se completen."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} delay={index * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
