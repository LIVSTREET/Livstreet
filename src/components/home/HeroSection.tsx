import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import gravplateHero from "@/assets/gravplate-hero.png";

const HERO_VIMEO_ID = "1184738419";
const HERO_VIDEO_SRC = `https://player.vimeo.com/video/${HERO_VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&controls=0&title=0&byline=0&portrait=0&badge=0&app_id=58479`;

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background: Video on mobile, image on desktop (perf + premium-ro på desktop) */}
      <div className="absolute inset-0">
        {/* Mobile video */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* 16:9 iframe scaled to cover */}
            <iframe
              src={HERO_VIDEO_SRC}
              title="Livstreet – gravplate i eik"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="eager"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none border-0"
            />
          </div>
          {/* Warm/dark overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/15 to-primary/55" />
        </div>

        {/* Desktop image */}
        <div className="hidden md:block absolute inset-0">
          <OptimizedImage
            src={gravplateHero}
            alt="Gravplate i eik på kirkegård"
            className="w-full h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-28 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5 md:space-y-7 animate-fade-in">
          <h1 className="font-display text-[2.1rem] leading-[1.1] md:text-5xl lg:text-6xl font-bold text-primary-foreground md:leading-tight drop-shadow-lg">
            Et varmere alternativ til gravstein
          </h1>
          <p className="text-sm md:text-lg leading-relaxed font-serif text-primary-foreground/90 drop-shadow-md">
            Laget i heltre eik – et mer personlig alternativ til tradisjonelle gravsteiner.
          </p>

          {/* CTA area */}
          <div className="pt-2 space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="hero"
                size="lg"
                asChild
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl w-full sm:w-auto"
              >
                <Link to="/komponer">Design gravplate</Link>
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                asChild
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
              >
                <Link to="/om-produktet">Lær mer</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
