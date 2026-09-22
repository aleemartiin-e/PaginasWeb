import { Star, Quote, ExternalLink } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function DentalTestimonials() {
  return (
    <section id="opiniones" className="border-t border-border bg-background py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen nuestros pacientes"
          description="Reseñas reales verificadas en Google."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <AnimatedReveal
            delay={0.05}
            className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1" aria-label={`Valoración: ${clinic.testimonial.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <Quote className="h-6 w-6 text-primary/30" strokeWidth={1.5} />
            </div>
            <p className="text-base italic leading-relaxed text-foreground">
              &ldquo;{clinic.testimonial.quote}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-foreground">{clinic.testimonial.author}</p>
              <p className="text-xs text-muted">{clinic.testimonial.source}</p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal
            delay={0.1}
            className="flex flex-col items-start justify-center gap-4 rounded-2xl border border-dashed border-border bg-surface p-8"
          >
            <p className="text-sm leading-relaxed text-muted">
              ¿Ya has sido paciente de {clinic.name}? Nos ayuda mucho que compartas tu
              experiencia con otros pacientes.
            </p>
            <a
              href={clinic.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-dark"
            >
              Dejar una opinión en Google
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
