"use client";

import * as React from "react";
import { Clock, MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// getDay(): 0 = domingo ... 6 = sábado. clinic.hours empieza en lunes.
const DAY_INDEX = [6, 0, 1, 2, 3, 4, 5];

function isOpenNow(ranges: readonly string[]) {
  if (ranges.length === 0) return false;
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return ranges.some((range) => {
    const [start, end] = range.split("–").map((s) => s.trim());
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    return minutes >= toMinutes(start) && minutes <= toMinutes(end);
  });
}

function getTodayStatus() {
  const index = DAY_INDEX[new Date().getDay()];
  return { index, openNow: isOpenNow(clinic.hours[index].ranges) };
}

export function DentalHours() {
  const [today, setToday] = React.useState<{ index: number; openNow: boolean } | null>(null);

  React.useEffect(() => {
    // Depende de la hora local del visitante: se calcula tras el montaje
    // para evitar un desajuste de hidratación con la hora del servidor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(getTodayStatus());
  }, []);

  const todayIndex = today?.index ?? null;
  const openNow = today?.openNow ?? false;

  return (
    <section id="horario" className="border-t border-border bg-surface py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Horario"
              title="Horario de apertura"
              description="Pídenos cita en el horario que mejor te venga, o escríbenos y te confirmamos hueco cuanto antes."
            />

            {todayIndex !== null ? (
              <AnimatedReveal delay={0.05}>
                <Badge
                  className={cn(
                    "w-fit border-transparent",
                    openNow ? "bg-primary text-primary-foreground" : "bg-accent-soft text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      openNow ? "animate-pulse bg-primary-foreground" : "bg-primary"
                    )}
                  />
                  {openNow ? "Abierto ahora" : "Cerrado ahora"}
                </Badge>
              </AnimatedReveal>
            ) : null}

            <AnimatedReveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${clinic.phoneHref}`}
                className={cn(buttonVariants({ size: "default" }), "hover:-translate-y-0.5")}
              >
                <Phone className="h-4 w-4" />
                Llamar ahora
              </a>
              <a
                href={`https://wa.me/${clinic.whatsappHref}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "hover:-translate-y-0.5"
                )}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </AnimatedReveal>
          </div>

          <AnimatedReveal
            delay={0.1}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <ul>
              {clinic.hours.map((entry, index) => {
                const isToday = index === todayIndex;
                return (
                  <li
                    key={entry.day}
                    className={cn(
                      "flex flex-col gap-1 border-b border-border px-6 py-4 transition-colors duration-200 last:border-b-0 sm:flex-row sm:items-center sm:justify-between",
                      isToday && "bg-accent-soft"
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium",
                        isToday ? "text-primary" : "text-foreground"
                      )}
                    >
                      {isToday ? <Clock className="h-4 w-4" strokeWidth={2} /> : null}
                      {entry.day}
                      {isToday ? (
                        <span className="text-xs font-normal text-primary/70">(hoy)</span>
                      ) : null}
                    </span>
                    <span className="text-sm text-muted">
                      {entry.ranges.length > 0 ? entry.ranges.join(" · ") : "Cerrado"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
