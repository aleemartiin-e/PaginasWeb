import { Globe, Sparkles, Search, Workflow } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const pillars = [
  { icon: Globe, label: "Web" },
  { icon: Sparkles, label: "IA" },
  { icon: Search, label: "SEO" },
  { icon: Workflow, label: "Automatización" },
];

export function Solution() {
  return (
    <section className="border-t border-border bg-surface py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="La solución"
          title="Un sistema integrado, no una lista de servicios sueltos"
          description="No construimos una web y desaparecemos. Combinamos desarrollo, inteligencia artificial, SEO y automatización para que tu presencia digital trabaje como un solo sistema orientado a conseguir clientes."
        />

        <AnimatedReveal delay={0.15}>
          <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-border bg-background p-10">
            <div className="grid w-full grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <pillar.icon
                    className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-primary/40 bg-accent-soft p-6 text-center">
              <span className="font-display text-lg font-semibold text-primary">
                Más clientes, con menos trabajo manual
              </span>
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
