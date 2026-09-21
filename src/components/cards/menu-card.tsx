import type { MenuCategory } from "@/content/menu";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function MenuCard({ item, delay = 0 }: { item: MenuCategory; delay?: number }) {
  return (
    <AnimatedReveal
      delay={delay}
      className="group flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-primary/40"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft transition-colors duration-300 group-hover:bg-primary/15">
        <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
          {item.highlight}
        </span>
        <h3 className="font-display text-xl font-semibold text-foreground">
          {item.name}
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
    </AnimatedReveal>
  );
}
