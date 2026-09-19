import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ClientContent } from "@/lib/types";

export function Services({ services }: { services: NonNullable<ClientContent["services"]> }) {
  return (
    <section id="servicios" className="bg-black/[0.02] py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading title={services.title} subtitle={services.subtitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 rounded-[var(--radius)] bg-[var(--color-background)] p-6 shadow-sm">
              <h3 className="font-semibold text-[var(--color-foreground)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
