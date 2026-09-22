"use client";

import { Phone, CalendarCheck, Star } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";

export function DentalHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(22,58,94,0.10),transparent_65%)]" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-6">
            <AnimatedReveal>
              <Badge className="border-primary/20 bg-accent-soft text-primary">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                5.0 en Google · Algarrobo, Málaga
              </Badge>
            </AnimatedReveal>

            <AnimatedReveal delay={0.05}>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {clinic.name}
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                {clinic.tagline}, con un trato cercano que ayuda a perder el miedo al
                dentista y presupuestos siempre ajustados.
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.15} className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                size="lg"
                className="group shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                onClick={() =>
                  document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <CalendarCheck className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                Reservar cita
              </Button>
              <a
                href={`tel:${clinic.phoneHref}`}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "transition-all duration-200 hover:-translate-y-0.5"
                )}
              >
                <Phone className="h-4 w-4" />
                {clinic.phone}
              </a>
            </AnimatedReveal>

            <AnimatedReveal
              delay={0.2}
              className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 sm:grid-cols-4"
            >
              {clinic.highlights.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-display text-lg font-semibold text-primary">
                    {item.label}
                  </span>
                  <span className="text-xs leading-snug text-muted">{item.detail}</span>
                </div>
              ))}
            </AnimatedReveal>
          </div>

          <AnimatedReveal delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-primary/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={clinic.photo}
                alt="Equipo de Idea Centro Dental atendiendo a un paciente"
                className="h-full w-full object-cover"
                width={704}
                height={396}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-surface-elevated px-6 py-4 shadow-xl sm:block">
              <p className="font-display text-2xl font-semibold text-primary">2015</p>
              <p className="text-xs text-muted">cuidando sonrisas en Algarrobo</p>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
