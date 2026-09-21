"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(255,122,41,0.18),_transparent_65%)]"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-10 py-28 text-center md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge>
            <MapPin className="h-3 w-3" />
            Grill · Cócteles · Centro de Nerja
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Sabor a brasa a un paso del{" "}
          <span className="text-primary">Mediterráneo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          Carnes y pescados a la brasa, hamburguesas gourmet y cócteles de
          autor en pleno centro de Nerja. Producto fresco, terraza y ambiente
          para disfrutar en buena compañía.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            onClick={() =>
              document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Reservar mesa
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() =>
              document.getElementById("carta")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver la carta
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 w-full max-w-4xl"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  const highlights = [
    { label: "Hamburguesas gourmet a la brasa" },
    { label: "Pescado fresco del día" },
    { label: "Brochetas y verduras a la parrilla" },
    { label: "Cócteles de autor" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-10">
      <div className="mb-8 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="ml-4 font-mono text-xs text-muted">
          {site.name.toLowerCase().replace(/\s+/g, "-")}.es
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-left text-sm text-foreground/90 md:text-base">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Hoy abrimos
            </p>
            <p className="font-display text-2xl font-semibold text-foreground">
              {site.hours}
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Terraza en el centro
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Ingredientes frescos
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Reserva online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
