import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Svevende CTA som dukker opp når brukeren har scrollet forbi hero,
 * og som følger viewporten nedover siden. Skjules på /komponer for å
 * unngå dobbel-CTA der brukeren allerede er i designeren.
 */
export function FloatingDesignCta() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      // Vis etter ca. 70% av viewporthøyden (etter hero)
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/komponer")) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Link
        to="/komponer"
        className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 md:px-7 md:py-4 text-base md:text-lg font-semibold shadow-[0_14px_40px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_18px_46px_-10px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition-all"
      >
        Design gravplaten
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
