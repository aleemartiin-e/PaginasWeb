"use client";

import * as React from "react";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { dentalBookingSchema, type DentalBookingValues } from "@/lib/validations";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { clinic } from "@/content/idea-centro-dental";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const preferredTimes: { value: DentalBookingValues["preferredTime"]; label: string }[] = [
  { value: "cualquiera", label: "Cualquier horario" },
  { value: "manana", label: "Por la mañana" },
  { value: "tarde", label: "Por la tarde" },
];

const quickContacts = [
  {
    icon: Phone,
    label: "Llamar",
    detail: clinic.phone,
    href: `tel:${clinic.phoneHref}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    detail: "Respuesta rápida",
    href: `https://wa.me/${clinic.whatsappHref}`,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    detail: clinic.email,
    href: `mailto:${clinic.email}`,
  },
];

export function DentalBooking() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setErrors({});

    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      preferredTime: String(formData.get("preferredTime") ?? "cualquiera"),
      message: String(formData.get("message") ?? ""),
      company_website: String(formData.get("company_website") ?? ""),
    };

    const parsed = dentalBookingSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/idea-centro-dental/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="reservar" className="border-t border-border bg-background py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Reservar cita"
          title="Pide tu cita hoy mismo"
          description="Elige la opción que prefieras: te respondemos lo antes posible."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {quickContacts.map((contact, index) => (
            <AnimatedReveal key={contact.label} delay={index * 0.05}>
              <a
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent-soft hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-110">
                  <contact.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="font-display text-sm font-semibold text-foreground">
                  {contact.label}
                </span>
                <span className="text-xs text-muted">{contact.detail}</span>
              </a>
            </AnimatedReveal>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {status === "success" ? (
            <AnimatedReveal className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-accent-soft p-10 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Solicitud recibida
              </h3>
              <p className="text-sm text-muted">
                Gracias por confiar en {clinic.name}. Te llamaremos en breve para
                confirmar tu cita.
              </p>
            </AnimatedReveal>
          ) : (
            <AnimatedReveal delay={0.15}>
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Formulario de reserva de cita"
                className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8 shadow-sm"
              >
                {/* Honeypot anti-spam, oculto para personas */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nombre" htmlFor="name" error={errors.name} required>
                    <Input id="name" name="name" placeholder="Tu nombre" autoComplete="name" />
                  </Field>
                  <Field label="Teléfono" htmlFor="phone" error={errors.phone} required>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="600 000 000"
                      autoComplete="tel"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email (opcional)" htmlFor="email" error={errors.email}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Horario preferido" htmlFor="preferredTime">
                    <Select id="preferredTime" name="preferredTime" defaultValue="cualquiera">
                      {preferredTimes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <Field label="Cuéntanos qué necesitas (opcional)" htmlFor="message">
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Ej: Necesito una revisión y me viene bien por las tardes..."
                  />
                </Field>

                {status === "error" && Object.keys(errors).length === 0 ? (
                  <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    Ha ocurrido un error al enviar el formulario. Inténtalo de nuevo.
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="w-full shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Solicitar cita"
                  )}
                </Button>

                <p className="text-xs text-muted">
                  También puedes escribirnos directamente por{" "}
                  <a
                    href={`https://wa.me/${clinic.whatsappHref}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-1 underline")}
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </form>
            </AnimatedReveal>
          )}
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      {children}
      {error ? (
        <span className="text-xs text-red-600" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
