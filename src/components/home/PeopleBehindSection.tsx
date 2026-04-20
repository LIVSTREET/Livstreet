import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductVideoPlayer } from "@/components/ProductVideoPlayer";

const STORY_VIMEO_ID = "1184891710";
const STORY_VIDEO_SRC = `https://player.vimeo.com/video/${STORY_VIMEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&endscreen=0`;

export function PeopleBehindSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Video */}
          <div className="order-1 md:order-1 max-w-sm mx-auto md:max-w-none w-full">
            <ProductVideoPlayer
              src={STORY_VIDEO_SRC}
              title="Folka bak Livstreet"
            />
          </div>

          {/* Text */}
          <div className="order-2 md:order-2 text-center md:text-left space-y-4 md:space-y-6">
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
                <Link to="/komponer">Lag din gravplate</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
