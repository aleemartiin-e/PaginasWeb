import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { ClientContent } from "@/lib/types";

export function Footer({ footer }: { footer: ClientContent["footer"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 py-10">
      <Container className="flex flex-col items-center gap-4 text-center text-sm text-[var(--color-muted)] sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-[var(--color-foreground)]">{footer.companyName}</p>
          {footer.tagline && <p>{footer.tagline}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {footer.links?.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--color-foreground)]">
              {link.label}
            </Link>
          ))}
          {footer.contact.email && <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>}
        </div>
        <p>© {year} {footer.companyName}</p>
      </Container>
    </footer>
  );
}
