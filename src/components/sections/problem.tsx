import { Smartphone, TrendingDown, Search, Clock, EyeOff } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const problems = [
  {
    icon: Smartphone,
    title: "Mala experiencia en móvil",
    description:
      "Más del 70% de tus visitas llegan desde el móvil, pero tu web no está pensada para esa pantalla.",
  },
  {
    icon: Search,
    title: "Poca visibilidad en Google",
    description:
      "Cuando alguien busca tu servicio, aparece la competencia antes que tú.",
  },
  {
    icon: TrendingDown,
    title: "Pocas conversiones",
    description:
      "Tienes visitas, pero muy pocas se convierten en llamadas, reservas o ventas.",
  },
  {
    icon: Clock,
    title: "Procesos manuales",
    description:
      "Reservas, presupuestos y seguimientos se gestionan a mano, uno por uno.",
  },
  {
    icon: EyeOff,
    title: "Presencia digital anticuada",
    description:
      "Tu web no transmite la calidad real de tu negocio ni genera confianza.",
  },
];

export function Problem() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="El problema"
          title="Tu negocio es bueno. Tu web no lo demuestra."
          description="Estos son los frenos más habituales que impiden a pymes y profesionales conseguir más clientes por internet."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <AnimatedReveal
              key={problem.title}
              delay={index * 0.05}
              className="group flex flex-col gap-4 bg-background p-8 transition-colors duration-300 hover:bg-surface"
            >
              <problem.icon
                className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {problem.description}
              </p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
