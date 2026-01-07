import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import oakCraftsmanship from "@/assets/oak-craftsmanship.png";
import foundersImg from "@/assets/founders.png";
import pederImg from "@/assets/peder.png";
import { Heart, Leaf, Hammer, TreeDeciduous, Sparkles, CheckCircle2 } from "lucide-react";

const values = [
  { icon: Heart, title: "Verdige minner" },
  { icon: Leaf, title: "Naturlige valg" },
  { icon: Hammer, title: "Ekte håndverk" },
];

const gravminnePoints = [
  "er laget av et levende, naturlig materiale",
  "har et enkelt og rolig uttrykk",
  "kan føles personlig uten å være påtrengende",
  "er produsert med omtanke for både mennesker og miljø",
];

export default function OmOss() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="container text-center px-4 relative z-10">
          <p className="text-primary-foreground/70 text-sm md:text-base mb-2 animate-fade-in">
            – hvorfor vi begynte
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 animate-fade-in">
            Om oss
          </h1>
          <p className="text-primary-foreground/90 text-base md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Et gravminne formet av håndverk, erfaring og omtanke
          </p>
          {/* Values */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-10">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="flex items-center gap-2 text-primary-foreground/90 animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <value.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-medium text-sm md:text-base">{value.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Question */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary mb-6 md:mb-8 animate-scale-in">
              <TreeDeciduous className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <p className="font-display text-2xl md:text-4xl text-foreground italic mb-6 animate-fade-in">
              "Må et gravminne alltid være stein?"
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Livstreet startet med et enkelt spørsmål.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Story with Image */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4 md:space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base order-2 lg:order-1">
              <p className="animate-fade-in">
                Bak Livstreet står brødrene Dan og Steffen Frederiksen, begge utdannede tømrere med lang 
                erfaring i arbeid med tre. Gjennom et liv i håndverket har de utviklet en dyp respekt for 
                materialer, prosesser og det som varer over tid.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Tre har alltid vært en naturlig del av deres arbeid – og etter hvert også av tankene 
                rundt minne, verdighet og avskjed.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                I mange år har gravminner vært preget av få valg og faste uttrykk. Samtidig har samfunnet 
                endret seg. Flere ønsker i dag løsninger som speiler hvem et menneske var – og hvordan de 
                levde. Det åpnet rom for noe nytt.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2 animate-scale-in">
              <img
                src={oakCraftsmanship}
                alt="Eiketre og håndverksverktøy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Points */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 mb-4 animate-scale-in">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h2 className="font-display text-xl md:text-3xl font-bold text-foreground animate-fade-in">
                Dan og Steffen ønsket å lage et gravminne som:
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {gravminnePoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-secondary rounded-xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <p className="text-foreground text-sm md:text-base">{point}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8 md:mt-12 text-sm md:text-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Slik vokste ideen om gravplater i massivt eiketre frem.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Philosophy */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed animate-fade-in">
              Som tømrere tenker de i tre. I form, i konstruksjon og i detaljer. Resultatet er et 
              gravminne som er nedtonet, ærlig og solid – uten unødvendige symboler, men med rom 
              for stillhet og ettertanke.
            </p>
            <div className="pt-4 md:pt-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <p className="font-display text-lg md:text-2xl text-foreground italic">
                Livstreet handler ikke om å erstatte tradisjoner, men om å tilby et alternativ.
              </p>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Et valg for dem som kjenner at tre føles riktig.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container px-4">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 animate-fade-in">
            Hva våre kunder sier
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-secondary rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <blockquote className="text-muted-foreground leading-relaxed italic mb-3 md:mb-6 text-sm md:text-base">
                "Det var tungt å måtte ta stilling til gravminne, men vi kjente med en gang at tre var riktig – han var jo en stolt tømrer. Da vi tilfeldigvis så et innslag om Livstræet på TV samme kveld, føltes det nesten som et tegn. Våre ønsker ble fulgt, og resultatet ser utrolig fint og helt riktig ut."
              </blockquote>
              <p className="font-medium text-foreground text-sm md:text-base">– Claus' familie</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-secondary rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <blockquote className="text-muted-foreground leading-relaxed italic mb-3 md:mb-6 text-sm md:text-base">
                "Mamma elsket hagen, blomster og alt som vokster. Derfor ble en gravplate i tre et naturlig valg – den passer så godt til et gravsted fylt med blomster. Vi fikk god hjelp, flere valgmuligheter og fantastisk service. Platen ble levert og satt opp, og den er virkelig vakker. Men vi skulle helst hatt mamma her."
              </blockquote>
              <p className="font-medium text-foreground text-sm md:text-base">– Ditte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founders */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container text-center px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 animate-scale-in">
              <img
                src={foundersImg}
                alt="Dan og Steffen Frederiksen"
                className="w-full h-full rounded-full object-cover object-top shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-primary/10" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 md:mb-4 animate-fade-in">
              Håndverk fra Danmark – formidlet i Norge
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Dan og Steffen Frederiksen startet Livstreet i Danmark med et ønske om å lage gravplater i tre – 
              et naturlig og bærekraftig alternativ til granitt. Deres håndverk og passion for kvalitet 
              videreføres nå i Norge gjennom Livstreet, hvor vi formidler disse unike produktene til norske 
              kunder med samme fokus på verdighet og miljøvennlige valg.
            </p>
          </div>
        </div>
      </section>

      {/* Norwegian Representative */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container text-center px-4">
          <div className="max-w-3xl mx-auto">
            <img
              src={pederImg}
              alt="Peder August Halvorsen"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 md:mb-6 object-cover object-center shadow-lg animate-scale-in"
            />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 md:mb-4 animate-fade-in">
              Din kontakt i Norge
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Jeg heter Peder August Halvorsen, og som nevø av Dan formidler jeg Livstreets gravplater 
              til Norge. Jeg er her for å hjelpe deg gjennom hele prosessen – fra valg av plate til levering.
            </p>
            <Button variant="hero" size="lg" asChild className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link to="/kontakt">Ta kontakt</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
