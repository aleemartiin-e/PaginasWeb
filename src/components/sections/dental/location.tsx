import { MapPin, Navigation } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DentalLocation() {
  const mapQuery = encodeURIComponent(clinic.address.mapsQuery);

  return (
    <section id="ubicacion" className="border-t border-border bg-surface py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Ubicación"
              title="Fácil de encontrar en Algarrobo"
              description="Te esperamos en nuestra clínica, con aparcamiento cercano y fácil acceso."
            />

            <AnimatedReveal delay={0.05} className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
              <p className="text-sm leading-relaxed text-foreground">{clinic.address.full}</p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "default" }), "w-fit hover:-translate-y-0.5")}
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
            </AnimatedReveal>
          </div>

          <AnimatedReveal
            delay={0.1}
            className="overflow-hidden rounded-2xl border border-border shadow-lg shadow-primary/5"
          >
            <iframe
              title={`Mapa de ubicación de ${clinic.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-80 w-full grayscale-[15%] transition-all duration-300 hover:grayscale-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
