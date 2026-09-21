import type { GalleryItem } from "@/content/gallery";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function GalleryCard({ item, delay = 0 }: { item: GalleryItem; delay?: number }) {
  return (
    <AnimatedReveal
      delay={delay}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-accent-soft">
        <item.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Foto próximamente
        </span>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,122,41,0.1)_100%)]" />
      </div>
      <div className="flex flex-col gap-1 p-6">
        <h3 className="font-display text-base font-semibold text-foreground">
          {item.caption}
        </h3>
      </div>
    </AnimatedReveal>
  );
}
