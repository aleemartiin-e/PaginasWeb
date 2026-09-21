import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section id="reservas" className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,122,41,0.16),_transparent_65%)]"
        aria-hidden="true"
      />
      <Container className="relative grid gap-16 lg:grid-cols-2 lg:items-start">
        <SectionHeading
          eyebrow="Reserva tu mesa"
          title="Te esperamos en Bruno's Grill"
          description={`Rellena el formulario con tus datos y te confirmaremos la reserva lo antes posible. También puedes llamarnos al ${site.phone}.`}
        />
        <ContactForm />
      </Container>
    </section>
  );
}
