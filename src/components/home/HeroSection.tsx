import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ArrowRight } from "lucide-react";
import gravplateHero from "@/assets/gravplate-hero.png";
import plateOddarMarie from "@/assets/plate-oddar-marie.jpg";
import plateDetailOak from "@/assets/plate-detail-oak.jpg";

const HERO_VIMEO_ID = "1184738419";
// Låst til mobilvennlig kvalitet for raskere start i in-app browsere
const HERO_VIDEO_SRC = `https://player.vimeo.com/video/${HERO_VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&controls=0&title=0&byline=0&portrait=0&badge=0&dnt=1&quality=360p&app_id=58479`;

export function HeroSection() {
  return (
    <section className="relative min-h-[88svh] md:min-h-[92vh] flex items-center overflow-hidden bg-primary">
      {/* Background: Video on mobile, image on desktop */}
      <div className="absolute inset-0">
        {/* Mobile video — stabilt frame i Instagram/in-app browsers */}
        <div className="md:hidden absolute inset-0 overflow-hidden bg-primary">
          <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-primary/8 to-primary/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_35%,_hsl(var(--accent)/0.22),_transparent_65%)]" />
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={HERO_VIDEO_SRC}
              title="Livstreet – gravplate i eik"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="eager"
              style={{ transform: "translate(-50%, -50%) scale(1.12)" }}
              className="absolute top-1/2 left-1/2 w-[177.78svh] h-[100svh] min-w-[120vw] min-h-[110svh] pointer-events-none border-0 will-change-transform"
            />
          </div>
        </div>

        {/* Desktop image */}
        <div className="hidden md:block absolute inset-0">
          <OptimizedImage
            src={gravplateHero}
            alt="Gravplate i eik på kirkegård"
            className="w-full h-full object-cover"
            priority={true}
          />
          {/* Light summery wash — soft golden glow, airier feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/45 via-primary/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,_hsl(var(--accent)/0.22),_transparent_60%)]" />
        </div>
      </div>

      {/* Warm accent glow — adds the "uplifting" warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full bg-accent/25 blur-[120px]"
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
