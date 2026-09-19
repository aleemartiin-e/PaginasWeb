import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Rocket,
  ShoppingCart,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";

export type Service = {
  id: string;
  icon: LucideIcon;
  name: string;
  problem: string;
  solution: string;
  benefit: string;
};

export const services: Service[] = [
  {
    id: "desarrollo-web",
    icon: Code2,
    name: "Desarrollo Web",
    problem: "Tu web actual es lenta, anticuada o no representa tu negocio.",
    solution:
      "Diseñamos y construimos webs a medida, rápidas y con una identidad visual propia.",
    benefit: "Una imagen profesional que genera confianza desde el primer segundo.",
  },
  {
    id: "landing-pages",
    icon: Rocket,
    name: "Landing Pages",
    problem: "Inviertes en publicidad pero las visitas no se convierten en clientes.",
    solution:
      "Creamos páginas enfocadas a un único objetivo: captar el contacto o la venta.",
    benefit: "Cada visita tiene más probabilidades de convertirse en cliente.",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    name: "Ecommerce",
    problem: "Vender online te resulta complicado, lento o poco rentable.",
    solution:
      "Desarrollamos tiendas online rápidas, seguras y preparadas para escalar.",
    benefit: "Un canal de ventas propio que funciona 24 horas al día.",
  },
  {
    id: "seo",
    icon: Search,
    name: "SEO",
    problem: "Tu negocio no aparece cuando tus clientes te buscan en Google.",
    solution:
      "Optimizamos la estructura técnica, el contenido y el posicionamiento local.",
    benefit: "Más visibilidad orgánica y clientes que te encuentran solos.",
  },
  {
    id: "inteligencia-artificial",
    icon: Sparkles,
    name: "Inteligencia Artificial",
    problem: "Pierdes tiempo en tareas repetitivas de atención y gestión.",
    solution:
      "Integramos IA en tu web y procesos: chat, contenido, análisis y recomendaciones.",
    benefit: "Más capacidad de atención sin aumentar el equipo.",
  },
  {
    id: "automatizacion",
    icon: Workflow,
    name: "Automatización",
    problem: "Reservas, formularios y seguimientos se gestionan a mano.",
    solution:
      "Automatizamos flujos entre tu web, email, calendario y herramientas de gestión.",
    benefit: "Menos trabajo manual y menos oportunidades perdidas.",
  },
];
