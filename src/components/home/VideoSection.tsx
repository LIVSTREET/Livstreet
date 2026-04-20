import { Link } from "react-router-dom";
import { ProductVideoPlayer } from "@/components/ProductVideoPlayer";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";

const VIMEO_ID = "1151281409";
const VIDEO_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&endscreen=0`;

export function VideoSection() {
  const { ref: revealRef, inView: revealInView } = useInView<HTMLDivElement>();
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>();

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="container relative px-4">
        <div
          ref={headingRef}
          className={`text-center max-w-3xl mx-auto mb-8 md:mb-12 opacity-0 ${
            headingInView ? "animate-reveal-up" : ""
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Håndverk med sjel
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Se hvordan vi skaper hver gravplate med presisjon og omsorg i vårt verksted.
          </p>
          <SectionDivider className="mt-5" />
        </div>

        {/* Video — auto-play with sound when in view, pauses when scrolled past */}
        <div
          ref={revealRef}
          className={`relative max-w-3xl mx-auto opacity-0 ${
            revealInView ? "animate-reveal-zoom" : ""
          }`}
        >
          <span
            aria-hidden
            className="absolute -inset-2 md:-inset-3 rounded-3xl bg-gradient-to-br from-accent/25 via-wood/15 to-transparent blur-lg"
          />
          <div className="relative">
            <ProductVideoPlayer
              src={VIDEO_SRC}
              title="Håndverk med sjel – Livstreet verksted"
              autoPlayInView
              showControls={false}
            />
          </div>

          {/* Quality stamp under video */}
          <div className="mt-5 md:mt-6 flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground text-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span>Gratis design – uforpliktende. Personlig svar innen 24 timer.</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/bilder"
            className="inline-flex items-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg md:text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Se flere bilder
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
