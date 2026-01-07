import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, FileEdit, CheckCircle, CreditCard, Package, HeartHandshake, Clock } from "lucide-react";
import heroImage from "@/assets/hva-skjer-etterpa.png";

export default function HvaSkjerEtterpa() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-secondary overflow-hidden">
        <div className="container px-4">
          <Link 
            to="/informasjon" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tilbake til artikler
          </Link>
          
          <div className="max-w-4xl animate-fade-in">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider px-3 py-1 bg-accent/10 rounded-full mb-4">
              Prosess
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hva skjer etter bestilling er sendt?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              En trygg prosess – steg for steg
            </p>
          </div>
        </div>
      </section>

      {/* Introduction with Image */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                Å velge et gravminne skjer ofte i en tid der mye annet også skal tas stilling til. Hos Livstreet ønsker vi å gjøre prosessen så rolig, oversiktlig og trygg som mulig.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Du trenger ikke å ha alle svarene med én gang – vi tar det steg for steg, sammen med deg. Her kan du lese hvordan veien videre ser ut etter at du har tatt kontakt med oss.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={heroImage} 
                  alt="Notatbok på trebord med utsikt mot gammelt eiketre" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-3">
                    1. Vi starter med dine ønsker
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Når vi mottar henvendelsen din, går vi først gjennom opplysningene og ønskene du har sendt inn. Det kan være tekst, symboler, størrelse eller andre tanker du har gjort deg. Har du ikke alt klart ennå, er det helt i orden – dette er noe vi kan avklare underveis.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3 italic">
                    Vår rolle er å lytte, veilede og foreslå løsninger som passer for deg.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileEdit className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-3">
                    2. Designutkast til godkjenning
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Basert på dialogen lager vi et designutkast av gravplaten. Dette sendes til deg på e-post, slik at du i ro og fred kan se hvordan det ferdige gravminnet vil fremstå.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Ønsker du endringer eller justeringer, tar vi oss god tid til å tilpasse designet. Det er først når du kjenner at dette føles riktig, at vi går videre.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-3">
                    3. Endelig bekreftelse
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Når designet er godkjent, ber vi deg bekrefte dette skriftlig. Først da regnes utformingen som endelig. På dette tidspunktet avklarer vi også hvor gravplaten skal monteres, dersom dette ikke allerede er gjort.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-3">
                    4. Faktura og oppstart av produksjon
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Etter godkjenning sender vi faktura. Når betalingen er mottatt, settes gravplaten i produksjon. Hver plate lages i massivt eiketre og ferdigstilles med stor nøyaktighet og omtanke.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-3">
                    5. Produksjon og levering
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Normal produksjonstid er 2–3 uker fra betalingen er registrert. Dersom du har behov for raskere levering, kan du ta kontakt med oss – så ser vi på mulighetene.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Når gravplaten er ferdig, avtaler vi levering videre med deg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-xl md:text-2xl font-semibold">
                  Underveis – og etterpå
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Du er alltid velkommen til å ta kontakt med oss dersom du lurer på noe, både under prosessen og i etterkant. Enten det gjelder montering, vedlikehold eller små spørsmål, er vi her for å hjelpe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Et valg i ditt tempo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hos Livstreet er det ingen hast. Ingen skjemaer som må fylles perfekt ut. Ingen beslutninger som ikke kan justeres underveis.
            </p>
            <p className="text-lg text-foreground leading-relaxed font-medium">
              Vårt mål er at du skal føle deg trygg – og sitte igjen med et gravminne som føles riktig, også mange år frem i tid.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Link 
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Ta kontakt med oss
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
