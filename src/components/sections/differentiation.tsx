import { Gauge, Layers, Wrench, Target } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const points = [
  {
    icon: Layers,
    title: "Un proceso documentado",
    description:
      "Cada fase del proyecto está definida: sabes qué se hace, cuándo y por qué en cada momento.",
  },
  {
    icon: Gauge,
    title: "Tecnología moderna y rápida",
    description:
      "Construimos con las mismas herramientas que usan los productos digitales más rápidos del mercado.",
  },
  {
    icon: Wrench,
    title: "Personalización real",
    description:
      "No partimos de plantillas cerradas: cada web se adapta a tu negocio, tu marca y tu público.",
  },
  {
    icon: Target,
    title: "Orientación a resultados",
    description:
      "Cada decisión de diseño y contenido se toma pensando en la conversión, no solo en la estética.",
  },
];

export function Differentiation() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Diferenciación"
          title="Por qué trabajar con nosotros"
          description="No lo decimos nosotros: se ve en cómo trabajamos."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((point, index) => (
            <AnimatedReveal key={point.title} delay={index * 0.05} className="flex flex-col gap-3">
              <point.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <h3 className="font-display text-base font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{point.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
