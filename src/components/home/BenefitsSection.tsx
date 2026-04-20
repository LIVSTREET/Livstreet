import { HeartHandshake, Trees, PhoneCall, type LucideIcon } from "lucide-react";
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

/**
 * Pinned-scroll benefits:
 * - Outer wrapper is tall (one viewport per benefit + one extra for exit).
 * - Sticky inner stage stays fixed while user scrolls.
 * - We compute progress through the wrapper to swap the active slide.
 * - Last slide scrolls OUT with the container at the end.
 */
export function BenefitsSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = wrapperRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // Total scrollable distance while pinned = (benefits.length) * vh
      // (wrapper height is (benefits.length + 1) * vh, sticky stage = 1vh)
      const scrolled = -rect.top;
      const perSlide = vh;
      const raw = scrolled / perSlide;
      const idx = Math.min(
        benefits.length - 1,
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
      style={{ height: `${(benefits.length + 1) * 100}vh` }}
      aria-label="Hvorfor velge Livstreet"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Shared background — never changes */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${benefitsBg})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background/95"
        />

        {/* Slides — only text/icon swaps */}
        <div className="relative h-full w-full">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            const state =
              i === activeIndex ? "active" : i < activeIndex ? "past" : "next";
            const translate =
              state === "active"
                ? "translate-y-0 opacity-100"
                : state === "past"
                ? "-translate-y-10 opacity-0"
                : "translate-y-10 opacity-0";

            return (
              <div
                key={b.title}
                aria-hidden={state !== "active"}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${translate}`}
              >
                {/* Per-slide accent glow */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-32 ${
                    i % 2 === 0 ? "-right-32" : "-left-32"
                  } w-[32rem] h-[32rem] rounded-full ${b.bgSoft} blur-3xl transition-opacity duration-700 ${
                    state === "active" ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="container relative px-6 text-center max-w-3xl">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur ring-1 ${b.ring} ${b.text} text-sm md:text-base font-medium tracking-wide mb-8`}
                  >
                    {b.eyebrow}
                  </div>

                  <div
                    className={`relative mx-auto mb-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-background/80 backdrop-blur ring-2 ${b.ring} flex items-center justify-center shadow-2xl`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-full ${b.bgSoft} ${
                        state === "active" ? "animate-ping" : ""
                      }`}
                      style={{ animationDuration: "2.5s" }}
                    />
                    <Icon
                      className={`relative h-12 w-12 md:h-16 md:w-16 ${b.text}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    {b.title}
                  </h2>

                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress dots — fixed inside the stage */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {benefits.map((b, i) => (
            <span
              key={b.title}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? `w-8 ${b.dot}` : "w-1.5 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
