import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Hammer, Droplets, Clock, Leaf, CheckCircle2, AlertCircle, Heart } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import monteringImg from "@/assets/montering-vedlikehold.png";
import { Card, CardContent } from "@/components/ui/card";
import { SeoHead } from "@/seo/SeoHead";
import { ROUTE_META } from "@/seo/metadata";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/seo/jsonLd";

export default function MonteringVedlikehold() {
  return (
    <Layout>
      <SeoHead
        title={ROUTE_META["/informasjon/montering-vedlikehold"].title}
        description={ROUTE_META["/informasjon/montering-vedlikehold"].description}
        path="/informasjon/montering-vedlikehold"
        type="article"
        image={monteringImg}
        jsonLd={[
          buildArticleJsonLd({
            title: ROUTE_META["/informasjon/montering-vedlikehold"].title,
            description: ROUTE_META["/informasjon/montering-vedlikehold"].description,
            path: "/informasjon/montering-vedlikehold",
            image: monteringImg,
            datePublished: "2025-01-07",
          }),
          buildBreadcrumbJsonLd([
            { name: "Hjem", path: "/" },
            { name: "Informasjon", path: "/informasjon" },
            { name: "Montering og vedlikehold", path: "/informasjon/montering-vedlikehold" },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative py-8 md:py-14 bg-gradient-to-b from-secondary to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container px-4 relative">
          <Link 
            to="/informasjon" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tilbake til artikler
          </Link>
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <span className="text-xs font-medium text-accent uppercase tracking-wider px-4 py-1.5 bg-accent/10 rounded-full border border-accent/20">
              Vedlikehold
            </span>
            <span className="text-sm text-muted-foreground">7. januar 2025</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold max-w-4xl animate-fade-in leading-tight">
            Montering og vedlikehold av gravplate i tre
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl animate-fade-in font-light">
            Et levende minne – enkelt å ta vare på
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-background -mt-8 md:-mt-12 relative z-10">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
              <OptimizedImage 
                src={monteringImg} 
                alt="Montering av gravplate i tre" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in">
              <p>
                En gravplate fra Livstreet er laget i massivt eiketre og behandlet for å tåle nordisk klima. 
                Tre er et levende materiale som endrer seg sakte over tid, og med litt enkelt vedlikehold 
                vil platen forbli vakker i mange år fremover.
              </p>
              <p>
                For mange oppleves det også meningsfullt å kunne gjøre noe selv – å sette platen på plass 
                og ta vare på den med egne hender. Det skaper ofte en stille form for eierskap og nærhet, 
                uten at det krever mye arbeid eller forkunnskap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Montering Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Hammer className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Montering</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
              Enkelt og oversiktlig. Det følger med mal og stålstenger som gjør monteringen trygg og stabil.
            </p>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { step: 1, text: "Plasser malen på bakken der platen skal stå, og finn ønsket helning og posisjon." },
                { step: 2, text: "Slå stålstengene ned gjennom hullene i malen ved hjelp av hammer." },
                { step: 3, text: "Fjern malen og sett gravplaten ned på stengene." },
                { step: 4, text: "Juster høyden slik at platen står stødig og følger terrenget naturlig." },
              ].map((item, index) => (
                <Card key={item.step} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6 flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <p className="text-muted-foreground leading-relaxed pt-2">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  Gode råd
                </h3>
                <ul className="space-y-3">
                  {[
                    "Det kan være en fordel å være to personer under monteringen.",
                    "Er bakken hard eller frossen, bør jorden løsnes først. Bruk eventuelt en litt tyngre hammer.",
                    "Monteringen krever ingen spesialverktøy og tar som regel kort tid.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vedlikehold Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Vedlikehold</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Sjeldent og overkommelig. Gravplaten er behandlet med en slitesterk, UV-bestandig lakk 
              som beskytter mot sol, regn og vind.
            </p>

            {/* Timeline */}
            <div className="space-y-8">
              {/* 3 years */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/5 p-6 md:p-8 md:w-64 flex-shrink-0 flex items-center justify-center">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <span className="font-display text-2xl font-bold block">3 år</span>
                      <span className="text-sm text-muted-foreground">Første vedlikehold</span>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 flex-1">
                    <ol className="space-y-3">
                      {[
                        "Rengjør overflaten for smuss og støv.",
                        "Slip lett med fint sandpapir (korning ca. 240).",
                        "Påfør ett tynt lag sterk båtlakk med UV-filter.",
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-4 text-sm text-muted-foreground/80 italic">
                      Dette frisker opp overflaten og forhindrer at små sprekker utvikler seg.
                    </p>
                  </CardContent>
                </div>
              </Card>

              {/* 6-7 years */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/5 p-6 md:p-8 md:w-64 flex-shrink-0 flex items-center justify-center">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <span className="font-display text-2xl font-bold block">6–7 år</span>
                      <span className="text-sm text-muted-foreground">Videre vedlikehold</span>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 flex-1">
                    <ol className="space-y-3">
                      {[
                        "Rengjør og slip lett som tidligere.",
                        "Påfør to tynne lag lakk, med ca. 24 timers tørketid mellom lagene.",
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-4 text-sm text-muted-foreground/80 italic">
                      Deretter kan platen vedlikeholdes etter behov hvert 5.–7. år, avhengig av værforhold og plassering.
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Løpende stell */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
              Løpende stell – 3 enkle trinn
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Droplets,
                  title: "Rengjør forsiktig",
                  desc: "Bruk myk klut eller børste, lunkent vann og mild såpe. Unngå sterke rengjøringsmidler.",
                },
                {
                  icon: Leaf,
                  title: "Vurder overflaten",
                  desc: "Når treverket begynner å se matt eller tørt ut, er det tid for nytt strøk.",
                },
                {
                  icon: Heart,
                  title: "Frisk opp ved behov",
                  desc: "Ett tynt lag lakk i tørt vær er som regel tilstrekkelig.",
                },
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-display text-lg font-semibold mb-3">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Viktig å vite */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/30">
              <CardContent className="p-8">
                <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  Viktig å vite
                </h3>
                <ul className="space-y-4">
                  {[
                    "Unngå å lakke i direkte sollys eller svært fuktig vær.",
                    "Ikke olje over lakken – bruk alltid sterk båtlakk ved vedlikehold.",
                    "Eik vil over tid få en naturlig patina. Dette er normalt og en del av treets uttrykk.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Et varig minne, tatt vare på med ro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Med enkel montering og sjeldent vedlikehold er en gravplate i tre et trygt og varig valg. 
              For noen betyr det også noe ekstra å kunne bidra selv – å ta del i omsorgen for et minne 
              som lever og eldes naturlig, i stedet for å stå stille.
            </p>
            <p className="text-xl md:text-2xl font-display font-semibold text-primary">
              Enkelt. Verdige rammer. Og laget for å vare.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
