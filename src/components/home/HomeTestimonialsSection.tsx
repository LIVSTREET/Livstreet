import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Et vakkert alternativ til gravstein. Fantastisk arbeid, rask oppfølging og en svært flott gravplate. Anbefales på det varmeste.",
    author: "Lone",
  },
  {
    quote:
      "Da vi ønsket noe personlig og ekte, ble Livstræet den perfekte løsningen. Våre ønsker ble ivaretatt, og resultatet føles helt riktig.",
    author: "Claus' familie",
  },
];

export function HomeTestimonialsSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container px-4">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
          Ord fra familier som har valgt Livstreet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="relative rounded-2xl bg-card p-6 md:p-8 shadow-sm border border-border/50"
            >
              <Quote className="h-7 w-7 md:h-9 md:w-9 text-accent/60 mb-3 md:mb-4" />
              <blockquote className="font-display text-base md:text-lg leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 md:mt-6 text-sm font-medium text-muted-foreground">
                — {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
