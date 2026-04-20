import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductVideoPlayer } from "@/components/ProductVideoPlayer";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";

const STORY_VIMEO_ID = "1184891710";
const STORY_VIDEO_SRC = `https://player.vimeo.com/video/${STORY_VIMEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&endscreen=0`;

export function PeopleBehindSection() {
  const { ref: videoRef, inView: videoInView } = useInView<HTMLDivElement>();
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Subtle accent glow that draws the eye to this section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 md:w-96 md:h-96 rounded-full bg-wood/10 blur-3xl"
      />

      <div className="container relative px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Video */}
          <div
            ref={videoRef}
            className={`order-1 md:order-1 max-w-sm mx-auto md:max-w-none w-full opacity-0 ${
              videoInView ? "animate-reveal-zoom" : ""
            }`}
          >
            <div className="relative">
              {/* Soft accent frame behind video */}
              <span className="absolute -inset-2 md:-inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-wood/15 to-transparent blur-lg" aria-hidden />
              <div className="relative">
                <ProductVideoPlayer
                  src={STORY_VIDEO_SRC}
                  title="Folka bak Livstreet"
                  aspectRatio="portrait"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`order-2 md:order-2 text-center md:text-left space-y-4 md:space-y-6 opacity-0 ${
              textInView ? "animate-reveal-up" : ""
            }`}
          >
            <SectionDivider className="md:justify-start md:[&>span:first-child]:hidden" />
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
              Folka bak Livstreet
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Et personlig prosjekt skapt med ønske om å tilby et varmere og
              mer naturlig alternativ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.6)] hover:-translate-y-0.5 transition-all"
              >
                <Link to="/om-produktet" className="inline-flex items-center gap-2 group">
                  Om produktet
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link to="/komponer">Design gravplaten</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
