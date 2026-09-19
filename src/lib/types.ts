export interface ClientTheme {
  clientId: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  radius: string;
  logo: string;
  favicon: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  image?: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  cta: CtaLink;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClientContent {
  meta: {
    title: string;
    description: string;
  };
  sections: string[];
  nav: {
    links: NavLink[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: HeroContent;
  benefits?: {
    title: string;
    subtitle?: string;
    items: BenefitItem[];
  };
  services?: {
    title: string;
    subtitle?: string;
    items: ServiceItem[];
  };
  testimonials?: {
    title: string;
    items: TestimonialItem[];
  };
  pricing?: {
    title: string;
    subtitle?: string;
    plans: PricingPlan[];
  };
  faq?: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle?: string;
    button: CtaLink;
  };
  footer: {
    companyName: string;
    tagline?: string;
    links?: NavLink[];
    contact: {
      email?: string;
      phone?: string;
      whatsapp?: string;
    };
  };
}

export interface ClientConfig {
  theme: ClientTheme;
  content: ClientContent;
}
