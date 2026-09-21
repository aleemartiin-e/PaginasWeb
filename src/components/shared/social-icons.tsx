import type { SVGProps } from "react";

/**
 * lucide-react retiró los iconos de marcas (Instagram, LinkedIn...) en
 * versiones recientes, así que se implementan aquí como SVG inline.
 */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M14.5 8.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h3l-.5 2.5h-2.5V19" />
    </svg>
  );
}
