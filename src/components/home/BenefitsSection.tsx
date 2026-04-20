import { Heart, TreePine, Sparkles } from "lucide-react";

const benefits = [
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

export function BenefitsSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border/60 bg-card p-6 md:p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="mx-auto mb-4 md:mb-5 w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/15 flex items-center justify-center">
                <Icon className="h-6 w-6 md:h-7 md:w-7 text-accent" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
