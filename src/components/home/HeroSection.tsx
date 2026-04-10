import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import gravplateHero from "@/assets/gravplate-hero.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={gravplateHero}
          alt="Gravplate i eik på kirkegård"
          className="w-full h-full object-cover"
          priority={true}
        />
        
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-28 px-4">
        <div className="max-w-2xl space-y-5 md:space-y-7 animate-fade-in">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight drop-shadow-lg">
            Et vakkert og miljøvennlig alternativ for å hedre dine kjære
          </h1>
          <p className="hidden md:block text-base md:text-xl leading-relaxed font-serif text-primary-foreground/90 drop-shadow-md">
            Hver plate er unik – laget med kjærlighet og respekt for naturen.
          </p>

          {/* CTA area */}
          <div className="pt-2 space-y-5">
            <p className="hidden md:block text-sm md:text-base font-medium text-primary-foreground/80 drop-shadow-sm font-serif">
              Start her – vi hjelper deg hele veien
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="hero" size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl">
                <Link to="/komponer">Lag min gravplate</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="hidden md:inline-flex border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/kontakt">Få hjelp / kontakt oss</Link>
              </Button>
            </div>
            <p className="hidden md:block text-xs md:text-sm text-primary-foreground/70 drop-shadow-sm max-w-sm">
              Design selv og send inn – vi tar kontakt før produksjon
            </p>
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