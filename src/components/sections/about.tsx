import { Flame, Wine, Fish, Salad } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const pillars = [
  { icon: Flame, label: "Brasa de carbón" },
  { icon: Fish, label: "Producto fresco" },
  { icon: Wine, label: "Cócteles de autor" },
  { icon: Salad, label: "Guarniciones caseras" },
];

export function About() {
  return (
    <section id="nosotros" className="border-t border-border bg-surface py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Nosotros"
          title="Cocina a la brasa con alma, en el centro de Nerja"
          description="En Bruno's Grill cuidamos cada detalle: carnes y pescados a fuego de carbón, hamburguesas gourmet, guarniciones caseras y una coctelería propia pensada para alargar la sobremesa. Un sitio para comer bien, sin prisa, rodeado de buen ambiente."
        />

        <AnimatedReveal delay={0.15}>
          <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-border bg-background p-10">
            <div className="grid w-full grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6"
                >
                  <pillar.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  <span className="text-center font-mono text-xs uppercase tracking-widest text-muted">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-primary/40 bg-accent-soft p-6 text-center">
              <span className="font-display text-lg font-semibold text-primary">
                Del carbón a la mesa
              </span>
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
