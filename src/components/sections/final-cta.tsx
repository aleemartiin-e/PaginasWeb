import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/sections/contact-form";

export function FinalCta() {
  return (
    <section id="contacto" className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_at_bottom,_rgba(62,207,142,0.14),_transparent_65%)]"
        aria-hidden="true"
      />
      <Container className="relative grid gap-16 lg:grid-cols-2 lg:items-start">
        <SectionHeading
          eyebrow="Hablemos"
          title="Cuéntanos qué necesitas y diseñaremos una solución para tu negocio"
          description="Rellena el formulario con los datos de tu proyecto. Te responderemos en menos de 24-48 horas laborables con los siguientes pasos."
        />
        <ContactForm />
      </Container>
    </section>
  );
}
