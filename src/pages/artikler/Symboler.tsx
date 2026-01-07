import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Heart, Feather, Flower2, TreeDeciduous, Cross, Anchor, CircleDot, Info, PenTool, MessageCircle } from "lucide-react";
import symbolImage from "@/assets/article-3.jpg";

export default function Symboler() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-accent/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
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
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Symboler
              </span>
              <span className="text-muted-foreground text-sm">5. desember 2024</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Symboler
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 font-display italic mb-6">
              – små tegn med stor betydning
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Et symbol trenger ikke forklares. Det skal bare få lov til å være der – som et stille minne.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative -mt-8 md:-mt-12 pb-12 md:pb-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={symbolImage} 
                alt="Gravplate med håndtegnet symbol" 
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
                Symboler har fulgt mennesker så lenge vi har hatt behov for å huske, håpe og tro. De kan være en figur, en gjenstand eller en enkel strek – men bærer ofte med seg noe langt større enn det vi ser ved første øyekast.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For noen er et symbol knyttet til et konkret minne. For andre handler det om tro, et løfte eller en livsholdning. Det finnes ingen riktig eller gal tolkning. Et symbol får sin verdi først når det betyr noe for dem som ser det.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                På et gravminne kan et symbol bli en stille trøst. Noe å hvile blikket på. Noe som får stå, også når ordene ikke strekker til.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meaning Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Når et tegn blir til mening
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Et symbol er et ytre tegn som bærer en indre betydning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CircleDot className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Synlig og usynlig</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Noe synlig som peker mot noe usynlig. Det kan være konkret – som en hjort, en due eller en blomst – eller mer abstrakt, som et kors, et anker eller en sirkel.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Heart className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Tilhørighet og identitet</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Opprinnelig var et symbol en fysisk gjenstand som ble delt i to. Når delene ble satt sammen igjen, bekreftet det tilhørighet og identitet. Kanskje er det nettopp dette symboler fortsatt gjør.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-8 md:p-10 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-lg text-foreground italic leading-relaxed">
                Symboler knytter sammen det som var, det som er, og det vi bærer videre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Symbols in Culture Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <TreeDeciduous className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Symboler i liv og kultur
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Gjennom historien har symboler hatt en viktig plass i kunst, tro og hverdagsliv.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Cross, title: "Korset", description: "Symbol på tro i kristen tradisjon" },
                { icon: Anchor, title: "Ankeret", description: "Symbol på håp og trygghet" },
                { icon: Heart, title: "Hjertet", description: "Symbol på kjærlighet og hengivenhet" },
                { icon: Feather, title: "Duen", description: "Symbol på fred og sjelen" },
                { icon: TreeDeciduous, title: "Hjorten", description: "Symbol på verdighet og styrke" },
                { icon: Flower2, title: "Blomster", description: "Symbol på livets skjørhet og skjønnhet" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border text-center animate-fade-in hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <p className="text-muted-foreground leading-relaxed text-center">
                Symboler har også vært brukt i tider der ord var vanskelige eller umulige. Små tegn kunne romme store budskap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Choice Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Det personlige valget
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Hos Livstreet finnes det ingen regler for hva som er riktig, for mye eller for lite. Et symbol skal ikke forklare noe for andre – det skal først og fremst bety noe for dem som står igjen.
                </p>
                <p className="text-foreground font-medium mb-4">
                  Mange velger symboler som speiler:
                </p>
                <div className="space-y-3">
                  {[
                    "Et minne eller en person",
                    "Natur, dyr eller et sted",
                    "Tro, håp eller kjærlighet"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-wood/20 to-wood-dark/10 rounded-2xl p-8 md:p-10 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <PenTool className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-4">Håndtegnede symboler</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Vi mener symboler fortjener ekstra omtanke. Derfor er våre symboler håndtegnet av Vilje Grude.
                </p>
                <p className="text-foreground leading-relaxed">
                  En håndtegnet strek gir symbolene et menneskelig og nært uttrykk – og gjør hvert motiv litt mer personlig enn masseproduserte alternativer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No Limits Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ingen grenser – bare muligheter
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Selv om mange velger hjort, duer, kors eller blomster, er det ingen forventning om at du skal velge det samme. Har du et ønske eller en idé til et symbol som betyr noe spesielt for deg eller dere, gjør vi så godt vi kan for å tegne og lage det – også om det ikke allerede finnes.
            </p>
            <Link 
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Bare ta kontakt
            </Link>
          </div>
        </div>
      </section>

      {/* Fact Box */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">Faktaboks – kort om symboler</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Ordet symbol kommer fra gresk og betyr opprinnelig «tegn» eller «det som settes sammen».",
                  "Et symbol kan være basert på likhet (ikon), avtale eller tradisjon.",
                  "Symboler brukes ofte der ord ikke strekker til – i kunst, tro og menneskelige overganger."
                ].map((fact, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Til slutt
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Et symbol trenger ikke forklares. Det skal bare få lov til å være der – som et stille minne, en trøst og et nærvær for dem som er igjen.
            </p>
            <p className="text-xl text-foreground font-display italic">
              Og noen ganger er det mer enn nok.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}