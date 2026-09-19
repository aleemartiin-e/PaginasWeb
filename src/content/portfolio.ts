export type PortfolioItem = {
  id: string;
  client: string;
  category: string;
  description: string;
  isPlaceholder: true;
};

/**
 * PLACEHOLDER — no son proyectos reales.
 * Estructura preparada para sustituir por casos de estudio reales
 * en cuanto existan (nombre de cliente, categoría, resultado, imágenes).
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "placeholder-1",
    client: "Próximamente",
    category: "Desarrollo Web",
    description: "Aquí mostraremos un proyecto real con su resultado.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    client: "Próximamente",
    category: "Ecommerce",
    description: "Aquí mostraremos un proyecto real con su resultado.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    client: "Próximamente",
    category: "Landing Page",
    description: "Aquí mostraremos un proyecto real con su resultado.",
    isPlaceholder: true,
  },
];
