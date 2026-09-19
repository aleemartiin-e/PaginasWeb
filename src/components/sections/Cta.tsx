import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ClientContent } from "@/lib/types";

export function Cta({ cta }: { cta: ClientContent["cta"] }) {
  return (
    <section id="contacto" className="py-20">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-[var(--radius)] bg-[var(--color-secondary)] px-8 py-16 text-center text-white">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">{cta.title}</h2>
          {cta.subtitle && <p className="max-w-xl text-white/80">{cta.subtitle}</p>}
          <Button href={cta.button.href} className="!bg-[var(--color-accent)]">
            {cta.button.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
