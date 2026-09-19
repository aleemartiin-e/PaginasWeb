import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ClientContent } from "@/lib/types";

export function Benefits({ benefits }: { benefits: NonNullable<ClientContent["benefits"]> }) {
  return (
    <section id="beneficios" className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading title={benefits.title} subtitle={benefits.subtitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-[var(--radius)] border border-black/5 p-6">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-semibold text-[var(--color-foreground)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
