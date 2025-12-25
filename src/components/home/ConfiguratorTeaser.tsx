import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Type, Eye } from "lucide-react";
import templateImg from "@/assets/template-mellom-1.jpg";

export function ConfiguratorTeaser() {
  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Preview */}
          <div className="relative">
            <div className="aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-card">
              <img
                src={templateImg}
                alt="Gravplate mal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 p-8">
                  <p className="font-display text-2xl text-primary/60">Navn Navnesen</p>
                  <p className="text-primary/50">1940 - 2024</p>
                  <p className="text-sm text-primary/40 mt-4 italic">
                    "I kjærlig minne"
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Lag din egen
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Komponer din personlige gravplate
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Bruk vårt enkle verktøy for å designe en unik minneplate. Velg størrelse, 
                legg til navn, datoer og velg blant vakre symboler.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Palette className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Velg symboler</h4>
                  <p className="text-sm text-muted-foreground">Livets tre, kors, hjerte, due og mange flere</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Type className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Personlig tekst</h4>
                  <p className="text-sm text-muted-foreground">Legg til navn, datoer og en vakker etterskrift</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Se resultatet</h4>
                  <p className="text-sm text-muted-foreground">Forhåndsvisning i sanntid før du bestiller</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" asChild>
              <Link to="/komponer">
                Start komponeringen
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
