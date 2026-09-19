import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/lib/types";

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        {hero.eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            {hero.eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-6xl">
          {hero.title}
        </h1>
        <p className="max-w-xl text-lg text-[var(--color-muted)]">{hero.subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          {hero.secondaryCta && (
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
