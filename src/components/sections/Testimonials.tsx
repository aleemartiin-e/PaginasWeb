import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ClientContent } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: NonNullable<ClientContent["testimonials"]> }) {
  return (
    <section id="opiniones" className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading title={testimonials.title} />
        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.items.map((item) => (
            <figure key={item.author} className="flex flex-col gap-4 rounded-[var(--radius)] border border-black/5 p-6">
              <blockquote className="text-[var(--color-foreground)]">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="text-sm text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-foreground)]">{item.author}</span> — {item.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
