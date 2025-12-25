import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
export function HeroSection() {
  return <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img alt="Gravplate i tre" className="w-full h-full object-cover" src="/lovable-uploads/a085ae19-1921-47c4-93f4-d107d1df05fd.webp" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl space-y-8 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Et bæredyktig minne i naturlig tre
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Våre håndlagde gravplater i tre er et vakkert og miljøvennlig alternativ. 
            Hver plate er unik – laget med kjærlighet og respekt for naturen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="hero" size="xl" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/komponer">Lag din plate</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/gravsteiner">Se gravsteiner</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>;
}