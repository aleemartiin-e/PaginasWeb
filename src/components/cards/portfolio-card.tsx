import type { PortfolioItem } from "@/content/portfolio";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function PortfolioCard({ item, delay = 0 }: { item: PortfolioItem; delay?: number }) {
  return (
    <AnimatedReveal
      delay={delay}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/20"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-accent-soft">
        <span className="font-mono text-xs uppercase tracking-widest text-muted transition-transform duration-300 group-hover:scale-105">
          Placeholder de proyecto
        </span>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(62,207,142,0.08)_100%)]" />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
          {item.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground">
          {item.client}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{item.description}</p>
      </div>
    </AnimatedReveal>
  );
}
