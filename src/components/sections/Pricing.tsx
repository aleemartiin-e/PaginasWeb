import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { ClientContent } from "@/lib/types";

export function Pricing({ pricing }: { pricing: NonNullable<ClientContent["pricing"]> }) {
  return (
    <section id="precios" className="bg-black/[0.02] py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading title={pricing.title} subtitle={pricing.subtitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-6 rounded-[var(--radius)] p-8 ${
                plan.highlighted
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm"
              }`}
            >
              <div>
                <h3 className="font-semibold">{plan.name}</h3>
                {plan.description && <p className="mt-1 text-sm opacity-80">{plan.description}</p>}
              </div>
              <p className="text-3xl font-bold">
                {plan.price}
                {plan.period && <span className="text-base font-normal opacity-70">{plan.period}</span>}
              </p>
              <ul className="flex flex-1 flex-col gap-2 text-sm opacity-90">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <Button
                href={plan.cta.href}
                variant={plan.highlighted ? "secondary" : "primary"}
                className={plan.highlighted ? "!border-white !text-white" : ""}
              >
                {plan.cta.label}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
