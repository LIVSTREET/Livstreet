import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const testimonials = [
  {
    id: 1,
    image: testimonial1,
    quote: "Den helt perfekte og så vakkert utformede minneplaten til min far 🙏🏻 De største og varmeste anbefalinger herfra. Helt fantastisk service og resultat – helt i min fars ånd. Tusen takk.",
    author: "Jette",
  },
  {
    id: 2,
    image: testimonial2,
    quote: "De beste anbefalinger herfra til et alternativ til en gravstein. Takk for den fine gravplaten dere har laget, levert og montert i forbindelse med vår fars bortgang. Fantastisk arbeid og en svært vakker gravplate. Rask og effektiv oppfølging. Det er også veldig fint at man selv kan lage forslag på nettsiden deres, og deretter få profesjonelle innspill fra dere. Våre foreldre har sett arbeidet deres på TV Midtvest, og er begge enige om at når den dagen kommer, skal det være en gravplate fra dere. Tusen takk.",
    author: "Lone",
  },
  {
    id: 3,
    image: testimonial1,
    quote: "Dagen før vår far og bror, Claus, sovnet inn på hospice, snakket vi som familie om de tingene vi uunngåelig måtte ta stilling til – blant annet gravminne. Det var tungt, men vi fikk en plutselig tanke om at noe i tre ville passe langt bedre, siden Claus var en stolt og dyktig tømrer og snekker. Men hvordan skulle det la seg gjøre? Det helt utrolige var at det samme kvelden kom et innslag om 'Livstræet' på TV – nesten som om tanken var blitt hørt. Det var akkurat den løsningen som var perfekt for vår situasjon. Vi bestilte en minneplate, våre ønsker ble ivaretatt, og nå gleder vi oss til å se det ferdige resultatet, som allerede på bildet ser utrolig vakkert og helt riktig ut.",
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
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={testimonials[current].image}
                alt="Testimonial"
                className="w-full h-full object-cover transition-opacity duration-500"
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
