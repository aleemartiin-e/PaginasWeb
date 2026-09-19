import { processSteps } from "@/content/process";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function Process() {
  return (
    <section id="proceso" className="border-t border-border bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Proceso"
          title="Un método claro, de principio a fin"
          description="Nada se improvisa. Cada proyecto sigue el mismo proceso probado, adaptado a la escala de tu negocio."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <AnimatedReveal
              key={step.number}
              delay={index * 0.05}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8"
            >
              <span className="font-mono text-sm text-primary">{step.number}</span>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
