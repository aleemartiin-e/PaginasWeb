import type { LucideIcon } from "lucide-react";
import { Beef, Fish, Soup, Wine, Sandwich, Flame } from "lucide-react";

export type MenuCategory = {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  highlight: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "hamburguesas",
    icon: Sandwich,
    name: "Hamburguesas gourmet",
    description:
      "Carne 100% de vacuno a la brasa, bacon crujiente, queso fundido y toppings frescos.",
    highlight: "La favorita de la casa",
  },
  {
    id: "pescado",
    icon: Fish,
    name: "Pescado a la brasa",
    description:
      "Pescado fresco del día a la parrilla con verduras y guarnición, con un toque de limón.",
    highlight: "Producto del día",
  },
  {
    id: "brochetas",
    icon: Flame,
    name: "Brochetas a la parrilla",
    description:
      "Brochetas de pollo y verduras marinadas, asadas lentamente al carbón.",
    highlight: "Para compartir",
  },
  {
    id: "carnes",
    icon: Beef,
    name: "Carnes a la brasa",
    description:
      "Cortes seleccionados cocinados al punto, acompañados de patatas y salsas caseras.",
    highlight: "Al punto que prefieras",
  },
  {
    id: "guarniciones",
    icon: Soup,
    name: "Guarniciones y salsas",
    description:
      "Verduras asadas, patatas al horno y salsas caseras como el alioli, para acompañar cualquier plato.",
    highlight: "Recetas de la casa",
  },
  {
    id: "cocteleria",
    icon: Wine,
    name: "Coctelería",
    description:
      "Cócteles de autor y clásicos con fruta fresca, para tomar en la terraza a cualquier hora.",
    highlight: "Cocktail bar",
  },
];
