import { Quote } from "lucide-react";
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
      <Quote className="h-6 w-6 text-primary/60" strokeWidth={1.5} />
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
