import { Phone, Mail, MapPin } from "lucide-react";
import { clinic } from "@/content/idea-centro-dental";
import { Container } from "@/components/shared/container";

export function DentalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface pb-20 md:pb-0">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg font-semibold text-foreground">
            {clinic.name}
          </span>
          <p className="text-sm leading-relaxed text-muted">{clinic.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground/90">
          <a
            href={`tel:${clinic.phoneHref}`}
            className="flex items-center gap-2 transition-colors duration-200 hover:text-primary"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
            {clinic.phone}
          </a>
          <a
            href={`mailto:${clinic.email}`}
            className="flex items-center gap-2 transition-colors duration-200 hover:text-primary"
          >
            <Mail className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
            {clinic.email}
          </a>
          <span className="flex items-start gap-2 text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
            {clinic.address.full}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Horario</h3>
          <p className="text-sm text-foreground/90">Lun – Jue: 10:00–14:00 y 15:00–18:30</p>
          <p className="text-sm text-foreground/90">Viernes: 10:00–14:00</p>
          <p className="text-sm text-muted">Sábado y domingo cerrado</p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted md:flex-row">
          <p>
            © {year} {clinic.name} — Todos los derechos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
