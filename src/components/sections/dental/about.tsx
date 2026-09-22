import { HeartHandshake, Sparkles } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const values = [
  {
    icon: Sparkles,
    title: "Sonrisas naturales",
    description: "Cuidamos cada detalle para resaltar la personalidad de cada paciente.",
  },
  {
    icon: HeartHandshake,
    title: "Trato cercano",
    description: "Charlamos contigo y te acompañamos para que pierdas el miedo al dentista.",
  },
];

export function DentalAbout() {
  return (
    <section id="sobre-nosotros" className="border-t border-border bg-background py-20 md:py-28">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
          <SectionHeading
            eyebrow="Sobre nosotros"
            title="Trabajando en tu sonrisa desde 2015"
            description={clinic.description[1]}
            align="center"
            className="mx-auto"
          />
          <p className="text-base leading-relaxed text-muted">{clinic.description[0]}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {values.map((value, index) => (
            <AnimatedReveal
              key={value.title}
              delay={0.1 + index * 0.05}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-primary transition-transform duration-200 group-hover:scale-110">
                <value.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{value.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
