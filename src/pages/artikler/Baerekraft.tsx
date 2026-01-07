import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, TreeDeciduous, Globe, CheckCircle2, Heart, Truck, Shield, Quote } from "lucide-react";
import baerekraftHero from "@/assets/baerekraft-hero.png";

export default function Baerekraft() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-forest/10 via-moss/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/5 via-transparent to-transparent" />
        <div className="container px-4 relative">
          <Link 
            to="/informasjon" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tilbake til artikler
          </Link>
          
          <div className="max-w-4xl animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-forest/10 text-forest rounded-full text-sm font-medium">
                Bærekraft
              </span>
              <span className="text-muted-foreground text-sm">10. desember 2024</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Bærekraft
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 font-display italic mb-6">
              – et bevisst valg i naturlige materialer
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Et varmt og verdig alternativ til granitt – for dem som ønsker et gravminne med lavere miljøbelastning.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative -mt-8 md:-mt-12 pb-12 md:pb-20">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={baerekraftHero} 
                alt="Majestetisk eiketre i grønt landskap" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                Hos Livstreet formidler vi bærekraftige gravplater i massivt, FSC-sertifisert eik – som et varmt og verdig alternativ til den tradisjonelle gravsteinen i granitt. Produktene er designet og produsert i Danmark, og utformet for å hedre minnet på en personlig, vakker og miljøvennlig måte.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Gravplaten i tre er et bevisst valg for dem som ønsker et gravminne i naturlige materialer, med lavere miljøbelastning og et roligere uttrykk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Natural Materials Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest/10 mb-6">
                <Leaf className="w-8 h-8 text-forest" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Naturlige materialer – lavere avtrykk
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Tre er en fornybar ressurs som lagrer CO₂ gjennom hele sin levetid.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <TreeDeciduous className="w-10 h-10 text-forest mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Karbonlagring</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Når eik brukes i et varig produkt, forblir karbonet bundet i materialet i mange år. Samtidig krever tre mindre tungindustri og færre inngrep i naturen enn mange tradisjonelle løsninger.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Globe className="w-10 h-10 text-forest mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Lavere CO₂-avtrykk</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I motsetning til granittgravsteiner, som ofte brytes med store maskiner og transporteres over lange avstander, har våre gravplater et samlet lavere CO₂-avtrykk.
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-gradient-to-br from-forest/5 to-moss/10 rounded-2xl p-8 md:p-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-display text-xl font-semibold mb-6 text-center">Våre gravplater er:</h3>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  "Produsert i Danmark",
                  "Laget av FSC-sertifisert eik",
                  "Lettere å håndtere",
                  "Produsert med kortere transport og mindre energibruk"
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                  <Truck className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Håndverk fra Danmark – formidlet i Norge
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Gravplatene produseres av Dan og Steffen Frederiksen i Danmark, med fokus på presisjon, materialkunnskap og varighet. Deres håndverk og verdier videreføres nå i Norge gjennom Livstreet, hvor vi formidler produktene til norske kunder med samme respekt for minnet og miljøet.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">~10,5</span>
                    </div>
                    <span className="text-sm text-muted-foreground">kg vekt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-forest" />
                    </div>
                    <span className="text-sm text-muted-foreground">20 års garanti</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-wood/20 to-wood-dark/10 rounded-2xl p-8 md:p-10 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <Heart className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-4">Vår misjon</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Vår misjon er å gi pårørende muligheten til å velge et verdig, personlig og klimavennlig gravminne – uten å gå på kompromiss med kvalitet, uttrykk eller levetid.
                </p>
                <div className="space-y-3">
                  {[
                    "Et alternativ til granittgravstein",
                    "Et gravminne uten plast",
                    "En personlig løsning i naturlige materialer"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Hva våre kunder sier
              </h2>
              <p className="text-muted-foreground">
                Ekte historier fra familier som har valgt Livstreet
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                <blockquote className="text-foreground leading-relaxed mb-6 relative z-10">
                  «Det var tungt å måtte ta stilling til gravminne, men vi kjente med en gang at tre var riktig – han var jo en stolt tømrer. Da vi tilfeldigvis så et innslag om Livstræet på TV samme kveld, føltes det nesten som et tegn. Våre ønsker ble fulgt, og resultatet ser utrolig fint og helt riktig ut.»
                </blockquote>
                <footer className="text-sm text-muted-foreground font-medium">
                  – Claus' familie
                </footer>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                <blockquote className="text-foreground leading-relaxed mb-6 relative z-10">
                  «Mamma elsket hagen, blomster og alt som vokste. Derfor ble en gravplate i tre et naturlig valg – den passer så godt til et gravsted fylt med blomster. Vi fikk god hjelp, flere valgmuligheter og fantastisk service. Platen ble levert og satt opp, og den er virkelig vakker. Men vi skulle helst hatt mamma her.»
                </blockquote>
                <footer className="text-sm text-muted-foreground font-medium">
                  – Ditte
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Leaf className="w-12 h-12 text-forest mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Vi er her for å veilede deg
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Enten du ser etter et alternativ til granitt, ønsker et gravminne uten plast, eller leter etter en personlig løsning i naturlige materialer – vi hjelper deg trygt gjennom valget.
            </p>
            <Link 
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Ta kontakt med oss
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
