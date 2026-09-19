import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ClientContent } from "@/lib/types";

export function Faq({ faq }: { faq: NonNullable<ClientContent["faq"]> }) {
  return (
    <section id="faq" className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading title={faq.title} />
        <div className="mx-auto flex w-full max-w-2xl flex-col divide-y divide-black/5">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[var(--color-foreground)]">
                {item.question}
                <span className="text-[var(--color-muted)] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
