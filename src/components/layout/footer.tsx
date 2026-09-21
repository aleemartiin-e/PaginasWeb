import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "@/components/shared/social-icons";
import { site, nav } from "@/content/site";
import { menuCategories } from "@/content/menu";
import { Container } from "@/components/shared/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-1">
          <span className="font-display text-lg font-semibold text-foreground">
            {site.name}
          </span>
          <p className="text-sm leading-relaxed text-muted">{site.tagline}</p>
          <div className="flex gap-3 pt-2">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            Navegación
          </h3>
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            La carta
          </h3>
          <ul className="flex flex-col gap-3">
            {menuCategories.map((item) => (
              <li key={item.id}>
                <a
                  href="#carta"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            Contacto
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-foreground/80">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-primary">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li className="text-muted">{site.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted md:flex-row">
          <p>© {year} {site.legalName} — Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="transition-colors hover:text-primary">
              Política de privacidad
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-primary">
              Política de cookies
            </Link>
            <Link href="/aviso-legal" className="transition-colors hover:text-primary">
              Aviso legal
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
