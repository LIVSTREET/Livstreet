import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import benefitsBg from "@/assets/benefits-oak-bg.jpg";

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

/**
 * Pinned-scroll testimonials — same mechanic as BenefitsSection.
 * Kort, regissert: ett sitat om gangen, rask progresjon.
 */
export function PinnedTestimonials() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = wrapperRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const raw = scrolled / vh;
      const idx = Math.min(
        testimonials.length - 1,
        Math.max(0, Math.floor(raw + 0.001)),
      );
      setActiveIndex(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${(testimonials.length + 1) * 100}vh` }}
      aria-label="Ord fra familier som har valgt Livstreet"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${benefitsBg})`, backgroundPosition: "center 30%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.55)_100%)]"
        />

        <div className="relative h-full w-full">
          {testimonials.map((t, i) => {
            const state =
              i === activeIndex ? "active" : i < activeIndex ? "past" : "next";
            const translate =
              state === "active"
                ? "translate-y-0 opacity-100"
                : state === "past"
                ? "-translate-y-10 opacity-0"
                : "translate-y-10 opacity-0";

            return (
              <figure
                key={t.author}
                aria-hidden={state !== "active"}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${translate}`}
              >
                <div className="container relative px-6 text-center max-w-3xl">
                  <div className="relative mx-auto mb-8 w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/40 ring-2 ring-accent/50 flex items-center justify-center shadow-2xl">
                    <Quote className="h-9 w-9 md:h-11 md:w-11 text-accent" strokeWidth={1.5} />
                  </div>
                  <blockquote className="font-display text-2xl md:text-4xl font-medium text-white leading-relaxed drop-shadow-lg">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 md:mt-8 text-base md:text-lg text-white/80 tracking-wide">
                    — {t.author}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {testimonials.map((t, i) => (
            <span
              key={t.author}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-8 bg-accent" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
