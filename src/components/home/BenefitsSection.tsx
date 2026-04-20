import { Heart, TreePine, Sparkles, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

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
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 md:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/40 transition-all duration-500 opacity-0 ${
        inView ? "animate-reveal-up" : ""
      }`}
    >
      {/* Top accent bar – ledende kontrastfarge */}
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative mx-auto mb-4 md:mb-5 w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/15 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/25">
        <span className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out" />
        <Icon className="relative h-7 w-7 md:h-8 md:w-8 text-accent" />
      </div>
      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
