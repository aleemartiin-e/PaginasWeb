import { Flame, Leaf, Users, MapPinned } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const points = [
  {
    icon: Flame,
    title: "Todo a la brasa de carbón",
    description:
      "Carnes, pescados y verduras cocinados al fuego, con el sabor que solo da el carbón.",
  },
  {
    icon: Leaf,
    title: "Producto fresco del día",
    description:
      "Trabajamos con proveedores locales y renovamos la carta según el producto de temporada.",
  },
  {
    icon: Users,
    title: "Ambiente familiar",
    description:
      "Un sitio pensado para venir en grupo, en pareja o con niños, sin prisas.",
  },
  {
    icon: MapPinned,
    title: "En pleno centro de Nerja",
    description:
      "A pocos pasos del Balcón de Europa, con terraza para disfrutar del buen tiempo.",
  },
];

export function Differentiation() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Más que un grill, un sitio para volver"
          description="No lo decimos nosotros: se nota en cada plato."
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
