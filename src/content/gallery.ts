import type { LucideIcon } from "lucide-react";
import { Sandwich, Fish, Flame, Wine, Salad, Soup } from "lucide-react";

export type GalleryItem = {
  id: string;
  icon: LucideIcon;
  caption: string;
  isPlaceholder: true;
};

/**
 * PLACEHOLDER — sustituir por fotografías reales del local y los platos
 * (las que ya existen en Facebook/Instagram) antes de publicar la web.
 */
export const galleryItems: GalleryItem[] = [
  { id: "placeholder-1", icon: Sandwich, caption: "Hamburguesa de la casa", isPlaceholder: true },
  { id: "placeholder-2", icon: Fish, caption: "Pescado a la brasa", isPlaceholder: true },
  { id: "placeholder-3", icon: Flame, caption: "Brochetas a la parrilla", isPlaceholder: true },
  { id: "placeholder-4", icon: Wine, caption: "Cócteles de autor", isPlaceholder: true },
  { id: "placeholder-5", icon: Salad, caption: "Verduras a la brasa", isPlaceholder: true },
  { id: "placeholder-6", icon: Soup, caption: "Salsas y guarniciones caseras", isPlaceholder: true },
];
