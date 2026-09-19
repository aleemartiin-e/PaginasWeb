import { faqItems } from "@/content/faq";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-surface py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          description="Si tienes cualquier otra duda, escríbenos y te respondemos personalmente."
        />

        <AnimatedReveal delay={0.1}>
          <Accordion items={faqItems} />
        </AnimatedReveal>
      </Container>
    </section>
  );
}
