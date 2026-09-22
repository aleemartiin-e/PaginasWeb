"use client";

import * as React from "react";
import { Menu, X, Phone } from "lucide-react";
import { clinic, dentalNav } from "@/content/idea-centro-dental";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function DentalNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        isScrolled || isOpen
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-primary md:text-xl"
          onClick={() => setIsOpen(false)}
        >
          {clinic.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {dentalNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${clinic.phoneHref}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            {clinic.phone}
          </a>
          <Button
            size="sm"
            onClick={() =>
              document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Reservar cita
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-foreground transition-transform duration-200 active:scale-90 md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-6 py-8">
            {dentalNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setIsOpen(false);
                document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reservar cita
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
