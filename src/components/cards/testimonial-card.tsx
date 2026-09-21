import { Star } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

export function TestimonialCard({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial;
  delay?: number;
}) {
  return (
    <AnimatedReveal
      delay={delay}
      className="flex flex-col gap-6 rounded-2xl border border-dashed border-border bg-background p-8"
    >
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-primary/60 text-primary/60" strokeWidth={1.5} />
        ))}
      </div>
      <p className="text-sm italic leading-relaxed text-muted">
        “{testimonial.quote}”
      </p>
      <div>
        <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
        <p className="text-xs text-muted">{testimonial.role}</p>
      </div>
    </AnimatedReveal>
  );
}
