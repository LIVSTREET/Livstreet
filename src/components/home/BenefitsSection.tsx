import { HeartHandshake, Trees, PhoneCall, ChevronDown, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import benefitsBg from "@/assets/benefits-oak-bg.jpg";

type Benefit = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  desc: string;
  text: string;
  ring: string;
  bgSoft: string;
  dot: string;
};

const benefits: Benefit[] = [
  {
    icon: HeartHandshake,
    eyebrow: "01 — Personlig",
    title: "Personlig uttrykk",
    desc: "Ikke alle kjenner seg igjen i tradisjonell granittstein.",
    text: "text-accent",
    ring: "ring-accent/50",
    bgSoft: "bg-accent/15",
    dot: "bg-accent",
  },
  {
    icon: Trees,
    eyebrow: "02 — Bærekraft",
    title: "Et bærekraftig minne",
    desc: "Laget i nordisk eik av erfarne danske håndverkere.",
    text: "text-wood",
    ring: "ring-wood/50",
    bgSoft: "bg-wood/15",
    dot: "bg-wood",
  },
  {
    icon: PhoneCall,
    eyebrow: "03 — Omsorg",
    title: "Personlig oppfølging",
    desc: "Vi er her for deg – også etter levering.",
    text: "text-forest",
    ring: "ring-forest/50",
    bgSoft: "bg-forest/15",
    dot: "bg-forest",
  },
];

function BenefitPanel({
  benefit,
  index,
  total,
}: {
  benefit: Benefit;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const Icon = benefit.icon;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setActive(e.intersectionRatio > 0.5));
      },
      { threshold: [0, 0.5, 0.75, 1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isLast = index === total - 1;

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] w-full snap-start flex items-center justify-center overflow-hidden"
      aria-labelledby={`benefit-${index}-title`}
    >
      {/* Background image (shared feel, slight parallax-like zoom on active) */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out ${
          active ? "scale-105" : "scale-100"
        }`}
        style={{ backgroundImage: `url(${benefitsBg})` }}
      />
      {/* Dark warm wash for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background/95"
      />
      {/* Accent glow that shifts per panel */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-32 ${
          index % 2 === 0 ? "-right-32" : "-left-32"
        } w-[32rem] h-[32rem] rounded-full ${benefit.bgSoft} blur-3xl`}
      />

      <div className="container relative px-6 text-center max-w-3xl">
        {/* Step counter */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur ring-1 ${benefit.ring} ${benefit.text} text-sm md:text-base font-medium tracking-wide mb-8 transition-all duration-700 ${
            active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {benefit.eyebrow}
        </div>

        {/* Icon */}
        <div
          className={`relative mx-auto mb-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-background/80 backdrop-blur ring-2 ${benefit.ring} flex items-center justify-center shadow-2xl transition-all duration-700 delay-100 ${
            active ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <span
            aria-hidden
            className={`absolute inset-0 rounded-full ${benefit.bgSoft} ${
              active ? "animate-ping" : ""
            }`}
            style={{ animationDuration: "2.5s" }}
          />
          <Icon
            className={`relative h-12 w-12 md:h-16 md:w-16 ${benefit.text}`}
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h2
          id={`benefit-${index}-title`}
          className={`font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight transition-all duration-700 delay-200 ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {benefit.title}
        </h2>

        {/* Description */}
        <p
          className={`text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {benefit.desc}
        </p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? `w-8 ${benefit.dot}` : "w-1.5 bg-foreground/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      {!isLast && (
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground transition-opacity duration-700 ${
            active ? "opacity-90" : "opacity-0"
          }`}
        >
          <span className="text-xs md:text-sm uppercase tracking-widest">
            Scroll videre
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      )}
    </section>
  );
}

export function BenefitsSection() {
  return (
    <div className="relative bg-background">
      {benefits.map((b, i) => (
        <BenefitPanel
          key={b.title}
          benefit={b}
          index={i}
          total={benefits.length}
        />
      ))}
    </div>
  );
}
