import { Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";

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

function TestimonialCard({
  quote,
  author,
  index,
}: {
  quote: string;
  author: string;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <figure
      ref={ref}
      style={{ animationDelay: `${index * 150}ms` }}
      className={`relative rounded-2xl bg-card p-6 md:p-8 shadow-sm border border-border/50 hover:shadow-lg hover:-translate-y-1 hover:border-accent/40 transition-all duration-500 opacity-0 ${
        inView ? "animate-reveal-up" : ""
      }`}
    >
      {/* Soft accent ring on top corner */}
      <span className="absolute -top-3 left-6 inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-accent-foreground shadow-md">
        <Quote className="h-4 w-4" />
      </span>
      <blockquote className="font-display text-base md:text-lg leading-relaxed text-foreground pt-4">
        "{quote}"
      </blockquote>
      <figcaption className="mt-4 md:mt-6 text-sm font-medium text-muted-foreground">
        — {author}
      </figcaption>
    </figure>
  );
}

export function HomeTestimonialsSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
            Ord fra familier som har valgt Livstreet
          </h2>
          <SectionDivider className="mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
