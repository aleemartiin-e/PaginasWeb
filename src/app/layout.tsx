import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getClientConfig } from "@/lib/getClientConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const { content, theme } = getClientConfig();
  return {
    title: content.meta.title,
    description: content.meta.description,
    icons: { icon: theme.favicon },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { theme } = getClientConfig();

  const themeVars = {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-background": theme.colors.background,
    "--color-foreground": theme.colors.foreground,
    "--color-muted": theme.colors.muted,
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
    "--radius": theme.radius,
  } as React.CSSProperties;

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={themeVars}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        {children}
      </body>
    </html>
  );
}
