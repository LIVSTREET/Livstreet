import { Heart, TreePine, Sparkles, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import benefitsBg from "@/assets/benefits-oak-bg.jpg";

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Heart,
    title: "Personlig uttrykk",
    desc: "Et gravminne med varme, nærhet og personlighet.",
  },
  {
    icon: TreePine,
    title: "Heltre eik",
    desc: "Laget i solid eik og behandlet for utendørs bruk.",
  },
  {
    icon: Sparkles,
    title: "Enkelt å bestille",
    desc: "Vi hjelper deg hele veien – fra idé til ferdig gravplate.",
  },
];

function BenefitCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 120}ms` }}
      className={`group relative overflow-hidden rounded-2xl border border-white/30 bg-background/70 backdrop-blur-md p-6 md:p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-accent/60 transition-all duration-500 opacity-0 ${
        inView ? "animate-reveal-up" : ""
      }`}
    >
      {/* Top accent bar */}
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative mx-auto mb-4 md:mb-5 w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/30 ring-1 ring-accent/30">
        <span className="absolute inset-0 rounded-full bg-accent/15 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out" />
        <Icon className="relative h-7 w-7 md:h-8 md:w-8 text-accent" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export function BenefitsSection() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Oak photo background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${benefitsBg})` }}
      />
      {/* Warm wash for legibility + brand mood */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/85"
      />
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full bg-wood/15 blur-3xl"
      />

      <div className="container relative px-4">
        <div
          ref={headRef}
          className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 opacity-0 ${
            headInView ? "animate-reveal-up" : ""
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-background/70 backdrop-blur text-accent text-sm md:text-base font-medium ring-1 ring-accent/30 shadow-sm">
            Hvorfor velge Livstreet
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
