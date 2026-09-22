"use client";

import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";

export function DentalMobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href={`tel:${clinic.phoneHref}`}
          className="flex flex-col items-center gap-1 py-3 text-foreground transition-colors duration-200 active:bg-accent-soft"
        >
          <Phone className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-[11px] font-medium">Llamar</span>
        </a>
        <a
          href={`https://wa.me/${clinic.whatsappHref}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-foreground transition-colors duration-200 active:bg-accent-soft"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() =>
            document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-1 bg-primary py-3 text-primary-foreground transition-colors duration-200 active:bg-primary-dark"
        >
          <CalendarCheck className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-[11px] font-medium">Reservar</span>
        </button>
      </div>
    </div>
  );
}
