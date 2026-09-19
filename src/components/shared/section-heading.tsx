import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <AnimatedReveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl",
          align === "center" && "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted md:text-lg",
            align === "center" && "max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </AnimatedReveal>
  );
}
