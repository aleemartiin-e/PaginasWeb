import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ClientContent, ClientTheme } from "@/lib/types";

export function Header({ theme, content }: { theme: ClientTheme; content: ClientContent }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--color-background)]/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#" className="flex items-center gap-2 font-bold text-[var(--color-foreground)]">
          <Image src={theme.logo} alt={theme.name} width={28} height={28} className="rounded" />
          {theme.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {content.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button href={content.nav.ctaHref} className="!px-4 !py-2 text-sm">
          {content.nav.ctaLabel}
        </Button>
      </Container>
    </header>
  );
}
