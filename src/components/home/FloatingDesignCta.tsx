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
        className="group inline-flex items-center gap-1.5 rounded-full bg-primary/95 backdrop-blur text-primary-foreground pl-4 pr-3 py-2 text-sm font-medium tracking-wide shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.5)] hover:shadow-[0_10px_28px_-8px_hsl(var(--primary)/0.7)] hover:-translate-y-0.5 transition-all ring-1 ring-primary-foreground/10"
      >
        Design gravplaten
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
