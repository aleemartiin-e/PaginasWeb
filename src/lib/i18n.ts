/**
 * Infraestructura mínima de i18n. Hoy solo hay contenido en español, pero
 * la detección ya queda lista para poder añadir locales sin reestructurar
 * páginas ni componentes: solo haría falta (1) añadir el locale a
 * `locales`, (2) mover los textos hardcodeados a un diccionario por locale,
 * y (3) leer `useLocale()` donde se necesite el texto traducido.
 */
export const locales = ["es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const STORAGE_KEY = "site-locale";

function isSupportedLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Lee navigator.language / navigator.languages y lo reduce a un locale soportado. */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const short = candidate?.slice(0, 2).toLowerCase();
    if (short && isSupportedLocale(short)) return short;
  }

  return defaultLocale;
}

/** Locale elegido manualmente por el visitante en una visita anterior, si lo hay. */
export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && isSupportedLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage puede fallar en navegación privada; no es crítico.
  }
}

/** Resuelve el locale activo: preferencia guardada > idioma del navegador > default. */
export function resolveLocale(): Locale {
  return getStoredLocale() ?? detectBrowserLocale();
}
