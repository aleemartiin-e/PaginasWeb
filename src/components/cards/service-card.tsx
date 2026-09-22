import type { Service } from "@/content/services";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <AnimatedReveal
      delay={delay}
      className="group flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
        <service.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>

      <h3 className="font-display text-xl font-semibold text-foreground">
        {service.name}
      </h3>

      <dl className="flex flex-col gap-3 text-sm leading-relaxed">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Problema
          </dt>
          <dd className="mt-1 text-muted">{service.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Solución
          </dt>
          <dd className="mt-1 text-foreground/90">{service.solution}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Beneficio
          </dt>
          <dd className="mt-1 font-medium text-foreground">{service.benefit}</dd>
        </div>
      </dl>
    </AnimatedReveal>
  );
}
