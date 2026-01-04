import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gravplateHero from "@/assets/gravplate-hero.png";
export function HeroSection() {
  return <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img alt="Gravplate i eik på kirkegård" className="w-full h-full object-cover" src={gravplateHero} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/45" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-6 md:py-16 px-4">
        <div className="max-w-xl md:max-w-lg space-y-4 md:space-y-8 animate-fade-in">
          <h1 className="font-cormorant-sc text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F3EDE4] leading-[1.2]">
            Et vakkert og miljøvennlig alternativ for å hedre dine kjære
          </h1>
          <p className="text-base md:text-xl text-primary-foreground/90 leading-relaxed">Hver plate er unik – laget med kjærlighet og respekt for naturen.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
            <Button variant="hero" size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/komponer">Lag din plate</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/gravsteiner">Se gravsteiner</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>;
}