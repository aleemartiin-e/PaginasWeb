"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(62,207,142,0.16),_transparent_65%)]"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-10 py-28 text-center md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge>Diseño web · IA · SEO · Automatización</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Webs que convierten visitas en{" "}
          <span className="text-primary">clientes reales</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          Diseñamos y desarrollamos webs, tiendas online y landing pages para
          pymes y profesionales que quieren dejar de perder clientes por una
          presencia digital anticuada.
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
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Solicitar presupuesto
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() =>
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <MessageCircle className="h-4 w-4" />
            Hablar con nosotros
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
  const bars = [42, 68, 55, 82, 71, 94, 60];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-10">
      <div className="mb-8 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="ml-4 font-mono text-xs text-muted">
          resultados-en-tiempo-real.tsx
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
        <div className="flex items-end gap-3 border-b border-border pb-6">
          {bars.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              whileInView={{ height: `${value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-10 rounded-t-md bg-gradient-to-t from-primary/40 to-primary"
            />
          ))}
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Conversión
            </p>
            <p className="font-display text-3xl font-semibold text-foreground">
              Web + IA + SEO
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Mobile-first
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Carga &lt; 1s
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> SEO técnico
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
