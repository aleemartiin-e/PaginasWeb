import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Indica tu nombre completo."),
  email: z.email("Introduce un email válido."),
  phone: z.string().trim().optional(),
  projectType: z.enum([
    "web-nueva",
    "rediseno",
    "landing",
    "ecommerce",
    "seo",
    "automatizacion",
    "otro",
  ]),
  message: z.string().trim().min(10, "Cuéntanos un poco más sobre tu proyecto."),
  // Honeypot: debe llegar vacío. Si tiene contenido, es un bot.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const dentalBookingSchema = z.object({
  name: z.string().trim().min(2, "Indica tu nombre completo."),
  phone: z.string().trim().min(6, "Indica un teléfono de contacto."),
  email: z.email("Introduce un email válido.").optional().or(z.literal("")),
  preferredTime: z.enum(["manana", "tarde", "cualquiera"]),
  message: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot: debe llegar vacío. Si tiene contenido, es un bot.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type DentalBookingValues = z.infer<typeof dentalBookingSchema>;
