export type Testimonial = {
  id: string;
  author: string;
  role: string;
  quote: string;
  isPlaceholder: true;
};

/**
 * PLACEHOLDER — no son testimonios reales.
 * Sustituir por opiniones reales de clientes en cuanto se recopilen.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    author: "Nombre del cliente",
    role: "Cargo, Empresa",
    quote: "Aquí aparecerá la opinión real de un cliente sobre el proyecto.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    author: "Nombre del cliente",
    role: "Cargo, Empresa",
    quote: "Aquí aparecerá la opinión real de un cliente sobre el proyecto.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    author: "Nombre del cliente",
    role: "Cargo, Empresa",
    quote: "Aquí aparecerá la opinión real de un cliente sobre el proyecto.",
    isPlaceholder: true,
  },
];
