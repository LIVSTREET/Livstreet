import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ArrowRight } from "lucide-react";
import gravplateHero from "@/assets/gravplate-hero.png";
import plateOddarMarie from "@/assets/plate-oddar-marie.jpg";
import plateDetailOak from "@/assets/plate-detail-oak.jpg";

const HERO_VIMEO_ID = "1184738419";
const HERO_VIDEO_SRC = `https://player.vimeo.com/video/${HERO_VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&controls=0&title=0&byline=0&portrait=0&badge=0&app_id=58479`;

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-center overflow-hidden bg-primary">
      {/* Background: Video on mobile, image on desktop */}
      <div className="absolute inset-0">
        {/* Mobile video */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={HERO_VIDEO_SRC}
              title="Livstreet – gravplate i eik"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="eager"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none border-0"
            />
          </div>
          {/* Lighter warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/55" />
        </div>

        {/* Desktop image */}
        <div className="hidden md:block absolute inset-0">
          <OptimizedImage
            src={gravplateHero}
            alt="Gravplate i eik på kirkegård"
            className="w-full h-full object-cover"
            priority={true}
          />
          {/* Warm directional gradient — left readable, right airy */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
        </div>
      </div>

      {/* Warm accent glow — adds the "uplifting" warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full bg-accent/20 blur-[120px]"
      />

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-24 px-4">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Text */}
          <div className="md:col-span-7 text-center md:text-left space-y-5 md:space-y-7 animate-fade-in">
            <h1 className="font-display text-[2.3rem] leading-[1.05] md:text-5xl lg:text-7xl font-bold text-white md:leading-[1.05] drop-shadow-lg">
              Et varmere alternativ til gravstein
            </h1>
            <p className="font-display text-base md:text-xl leading-relaxed text-white/90 drop-shadow-md max-w-xl mx-auto md:mx-0">
              Personlige minnesmerker i heltre eik.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3">
                <Button
                  size="lg"
                  asChild
                  className="group h-14 px-8 text-base font-semibold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_14px_40px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_18px_46px_-10px_hsl(var(--primary)/0.75)] hover:-translate-y-0.5 transition-all duration-300 rounded-full w-full sm:w-auto"
                >
                  <Link to="/komponer" className="inline-flex items-center justify-center gap-2">
                    Design gravplaten
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="h-14 px-6 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full w-full sm:w-auto"
                >
                  <Link to="/om-produktet">Lær mer</Link>
                </Button>
              </div>
              <p className="text-xs md:text-sm text-primary-foreground/80 drop-shadow text-center md:text-left">
                Gratis design – uforpliktende. Personlig svar innen 24 timer.
              </p>
            </div>
          </div>

          {/* Floating product showcase — desktop only */}
          <div className="hidden md:block md:col-span-5 relative animate-fade-in">
            <div className="relative aspect-[4/3] max-w-md ml-auto">
              {/* Warm glow behind */}
              <span
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/30 via-wood/20 to-transparent blur-2xl"
              />
              {/* Main plate image */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary-foreground/20 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                <OptimizedImage
                  src={plateOddarMarie}
                  alt="Gravplate i eik – Oddar og Marie Knutsen, med utsikt over havet"
                  className="w-full h-full object-cover"
                  priority={true}
                />
              </div>
              {/* Detail card overlay */}
              <div className="absolute -bottom-6 -left-8 w-44 aspect-square rounded-xl overflow-hidden shadow-2xl ring-1 ring-primary-foreground/20 rotate-[5deg] hover:rotate-0 transition-transform duration-700 hidden lg:block">
                <OptimizedImage
                  src={plateDetailOak}
                  alt="Detalj av gravering i eiketre"
                  className="w-full h-full object-cover"
                />
              </div>
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
