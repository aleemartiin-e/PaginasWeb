"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

type Status = "idle" | "loading" | "success" | "error";

const projectTypes: { value: ContactFormValues["projectType"]; label: string }[] = [
  { value: "web-nueva", label: "Web nueva" },
  { value: "rediseno", label: "Rediseño de mi web actual" },
  { value: "landing", label: "Landing page" },
  { value: "ecommerce", label: "Ecommerce" },
  { value: "seo", label: "SEO" },
  { value: "automatizacion", label: "Automatización / IA" },
  { value: "otro", label: "Otro" },
];

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      projectType: String(formData.get("projectType") ?? "otro"),
      message: String(formData.get("message") ?? ""),
      company_website: String(formData.get("company_website") ?? ""),
    };

    const parsed = contactFormSchema.safeParse(values);

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <AnimatedReveal className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-accent-soft p-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </motion.div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          Mensaje recibido
        </h3>
        <p className="text-sm text-muted">
          Gracias por escribirnos. Te responderemos en menos de 24-48 horas laborables.
        </p>
      </AnimatedReveal>
    );
  }

  return (
    <AnimatedReveal delay={0.1}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8"
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
          <Field label="Nombre" htmlFor="name" error={errors.name}>
            <Input id="name" name="name" placeholder="Tu nombre" autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="email" error={errors.email}>
            <Input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Teléfono (opcional)" htmlFor="phone">
            <Input id="phone" name="phone" type="tel" placeholder="+34 600 000 000" autoComplete="tel" />
          </Field>
          <Field label="Tipo de proyecto" htmlFor="projectType">
            <Select id="projectType" name="projectType" defaultValue="web-nueva">
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Cuéntanos sobre tu proyecto" htmlFor="message" error={errors.message}>
          <Textarea
            id="message"
            name="message"
            placeholder="Ej: Tengo una peluquería y necesito una web con reservas online..."
          />
        </Field>

        {status === "error" && Object.keys(errors).length === 0 ? (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" />
            Ha ocurrido un error al enviar el formulario. Inténtalo de nuevo.
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Solicitar presupuesto"
          )}
        </Button>
      </form>
    </AnimatedReveal>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </div>
  );
}
