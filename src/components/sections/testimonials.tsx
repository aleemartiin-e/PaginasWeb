import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/cards/testimonial-card";

export function Testimonials() {
  return (
    <section id="opiniones" className="border-t border-border bg-background py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen quienes ya han venido"
          description="En cuanto recopilemos las primeras reseñas verificadas, esta sección mostrará opiniones reales de nuestros clientes."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} delay={index * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
