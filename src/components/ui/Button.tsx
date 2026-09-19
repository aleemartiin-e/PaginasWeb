import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius)] px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-primary)] text-white"
      : "border border-[var(--color-muted)] text-[var(--color-foreground)]";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
