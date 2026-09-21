"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site, nav } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function Navbar() {
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
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-foreground"
          onClick={() => setIsOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            size="sm"
            onClick={() =>
              document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Reservar mesa
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-foreground md:hidden"
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
            {nav.map((item) => (
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
                document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reservar mesa
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
