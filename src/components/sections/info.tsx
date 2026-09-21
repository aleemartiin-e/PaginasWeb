import { infoItems } from "@/content/info";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function Info() {
  return (
    <section className="border-t border-border bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Información práctica"
          title="Todo lo que necesitas para venir a vernos"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoItems.map((item, index) => (
            <AnimatedReveal
              key={item.title}
              delay={index * 0.05}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8"
            >
              <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
