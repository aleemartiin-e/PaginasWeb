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
