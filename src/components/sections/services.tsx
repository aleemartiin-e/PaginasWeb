import { services } from "@/content/services";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/cards/service-card";

export function Services() {
  return (
    <section id="servicios" className="border-t border-border bg-background py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que necesitas para crecer en internet"
          align="center"
          description="Seis áreas de trabajo, un mismo objetivo: que tu negocio consiga más clientes por internet."
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
