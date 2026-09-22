import type { Metadata } from "next";
import { clinic } from "@/content/idea-centro-dental";
import { DentistJsonLd } from "@/components/shared/dental-json-ld";
import { DentalNavbar } from "@/components/sections/dental/navbar";
import { DentalHero } from "@/components/sections/dental/hero";
import { DentalAbout } from "@/components/sections/dental/about";
import { DentalHours } from "@/components/sections/dental/hours";
import { DentalTestimonials } from "@/components/sections/dental/testimonials";
import { DentalLocation } from "@/components/sections/dental/location";
import { DentalBooking } from "@/components/sections/dental/booking";
import { DentalFooter } from "@/components/sections/dental/footer";
import { DentalMobileCtaBar } from "@/components/sections/dental/mobile-cta-bar";

export const metadata: Metadata = {
  title: `${clinic.name} — Clínica dental en Algarrobo, Málaga`,
  description: `${clinic.tagline}. Trato cercano, precios ajustados y valoración 5.0 en Google. Pide tu cita en ${clinic.address.city}.`,
  alternates: {
    canonical: "/idea-centro-dental-algarrobo",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: `${clinic.name} — Clínica dental en Algarrobo`,
    description: clinic.tagline,
  },
};

export default function IdeaCentroDentalPage() {
  return (
    <div className="theme-dental flex min-h-screen flex-col bg-background text-foreground">
      <DentistJsonLd />
      <DentalNavbar />
      <main className="flex-1">
        <DentalHero />
        <DentalAbout />
        <DentalHours />
        <DentalTestimonials />
        <DentalLocation />
        <DentalBooking />
      </main>
      <DentalFooter />
      <DentalMobileCtaBar />
    </div>
  );
}
