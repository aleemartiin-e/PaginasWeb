import type { LucideIcon } from "lucide-react";
import { Clock, MapPin, Phone, Umbrella } from "lucide-react";
import { site } from "@/content/site";

export type InfoItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const infoItems: InfoItem[] = [
  {
    icon: Clock,
    title: "Horario",
    description: site.hours,
  },
  {
    icon: MapPin,
    title: "Ubicación",
    description: `${site.address}. A pocos minutos del Balcón de Europa y la playa.`,
  },
  {
    icon: Phone,
    title: "Reservas",
    description: `Llama o escribe por WhatsApp al ${site.phone}.`,
  },
  {
    icon: Umbrella,
    title: "Terraza",
    description: "Zona techada y terraza exterior, ideal para grupos y familias.",
  },
];
