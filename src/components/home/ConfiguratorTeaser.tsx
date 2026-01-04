import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Type, Eye } from "lucide-react";
import plateImg from "@/assets/plate-preview.png";
export function ConfiguratorTeaser() {
  return <section className="py-10 md:py-20 bg-muted">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Preview */}
          <div className="relative">
            <div className="aspect-[4/3] max-w-lg mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-card">
              <img alt="Gravplate i tre" src="/lovable-uploads/d0419dda-1a16-415b-abb8-e0af94719ab4.png" className="w-full h-full object-cover rounded-sm border-dotted" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="space-y-4 md:space-y-8">
            <div>
              <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-accent/10 text-accent rounded-full text-xs md:text-sm font-medium mb-2 md:mb-4">
                Lag din egen
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                Komponer din personlige gravplate
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
                Bruk vårt enkle verktøy for å designe en unik minneplate. Velg størrelse, 
                legg til navn, datoer og velg blant vakre symboler.
              </p>
            </div>

            <div className="grid gap-2 md:gap-4">
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-lg">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg">
                  <Palette className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Velg symboler</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Livets tre, kors, hjerte, due og mange flere</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-lg">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg">
                  <Type className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Personlig tekst</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Legg til navn, datoer og en vakker etterskrift</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-lg">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg">
                  <Eye className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Se resultatet</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Forhåndsvisning i sanntid før du bestiller</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" asChild>
              <Link to="/komponer">
                Start komponeringen
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}