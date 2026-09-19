import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 py-24 md:py-32">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <div className="prose-legal mt-8 flex flex-col gap-4 text-sm leading-relaxed text-muted md:text-base">
          {children}
        </div>
      </Container>
    </main>
  );
}
