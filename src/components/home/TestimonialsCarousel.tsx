import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    image: testimonial1,
    quote: "Den helt perfekte og vakkert utformede minneplaten til min far 🙏🏻 Fantastisk service og resultat – helt i hans ånd.",
    author: "Jette",
  },
  {
    id: 2,
    image: testimonial2,
    quote: "Et vakkert alternativ til gravstein. Fantastisk arbeid, rask oppfølging og en svært flott gravplate. Anbefales på det varmeste.",
    author: "Lone",
  },
  {
    id: 3,
    image: testimonial3,
    quote: "Da vi ønsket noe personlig og ekte, ble Livstræet den perfekte løsningen. Våre ønsker ble ivaretatt, og resultatet føles helt riktig.",
    author: "Claus' familie",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
          Hva våre kunder sier
        </h2>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={testimonials[current].image}
                alt="Gravplate fra Livstreet"
                className="w-full h-full object-contain bg-muted transition-opacity duration-500"
              />
            </div>

            {/* Quote */}
            <div className="space-y-6 p-4">
              <Quote className="h-12 w-12 text-accent opacity-50" />
              <blockquote className="text-xl md:text-2xl font-display leading-relaxed text-foreground">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="pt-4">
                <p className="font-semibold text-foreground">{testimonials[current].author}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-primary/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
