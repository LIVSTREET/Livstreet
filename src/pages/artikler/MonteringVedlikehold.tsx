import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import monteringImg from "@/assets/montering-vedlikehold.png";

export default function MonteringVedlikehold() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-10 md:py-20 bg-secondary">
        <div className="container px-4">
          <Link 
            to="/informasjon" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til artikler
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-medium text-accent uppercase tracking-wider px-3 py-1 bg-accent/10 rounded-full">
              Vedlikehold
            </span>
            <span className="text-sm text-muted-foreground">7. januar 2025</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold max-w-4xl">
            Montering og vedlikehold av gravplate i tre
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto prose prose-lg prose-stone dark:prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Et levende minne – enkelt å ta vare på
            </p>

            <img 
              src={monteringImg} 
              alt="Montering av gravplate i tre" 
              className="w-full rounded-xl my-8"
            />

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

            <h2>Montering – enkelt og oversiktlig</h2>

            <p>Det følger med mal og stålstenger som gjør monteringen trygg og stabil.</p>

            <h3>Slik gjør du det:</h3>

            <ol>
              <li>Plasser malen på bakken der platen skal stå, og finn ønsket helning og posisjon.</li>
              <li>Slå stålstengene ned gjennom hullene i malen ved hjelp av hammer.</li>
              <li>Fjern malen og sett gravplaten ned på stengene.</li>
              <li>Juster høyden slik at platen står stødig og følger terrenget naturlig.</li>
            </ol>

            <h3>Gode råd:</h3>

            <ul>
              <li>Det kan være en fordel å være to personer under monteringen.</li>
              <li>Er bakken hard eller frossen, bør jorden løsnes først. Bruk eventuelt en litt tyngre hammer.</li>
              <li>Monteringen krever ingen spesialverktøy og tar som regel kort tid.</li>
            </ul>

            <h2>Vedlikehold – sjeldent og overkommelig</h2>

            <p>
              Gravplaten er behandlet med en slitesterk, UV-bestandig lakk som beskytter mot sol, 
              regn og vind. Vedlikeholdet er enkelt og utføres med flere års mellomrom.
            </p>

            <h3>Første vedlikehold – etter ca. 3 år</h3>

            <ol>
              <li>Rengjør overflaten for smuss og støv.</li>
              <li>Slip lett med fint sandpapir (korning ca. 240).</li>
              <li>Påfør ett tynt lag sterk båtlakk med UV-filter.</li>
            </ol>

            <p>Dette frisker opp overflaten og forhindrer at små sprekker utvikler seg.</p>

            <h3>Videre vedlikehold – etter 6–7 år</h3>

            <ol>
              <li>Rengjør og slip lett som tidligere.</li>
              <li>Påfør to tynne lag lakk, med ca. 24 timers tørketid mellom lagene.</li>
            </ol>

            <p>
              Deretter kan platen vedlikeholdes etter behov hvert 5.–7. år, avhengig av værforhold og plassering.
            </p>

            <h3>Løpende stell – 3 enkle trinn</h3>

            <ol>
              <li>
                <strong>Rengjør forsiktig</strong><br />
                Bruk myk klut eller børste, lunkent vann og mild såpe. Unngå sterke rengjøringsmidler.
              </li>
              <li>
                <strong>Vurder overflaten</strong><br />
                Når treverket begynner å se matt eller tørt ut, er det tid for nytt strøk.
              </li>
              <li>
                <strong>Frisk opp ved behov</strong><br />
                Ett tynt lag lakk i tørt vær er som regel tilstrekkelig.
              </li>
            </ol>

            <h2>Viktig å vite</h2>

            <ul>
              <li>Unngå å lakke i direkte sollys eller svært fuktig vær.</li>
              <li>Ikke olje over lakken – bruk alltid sterk båtlakk ved vedlikehold.</li>
              <li>Eik vil over tid få en naturlig patina. Dette er normalt og en del av treets uttrykk.</li>
            </ul>

            <h2>Et varig minne, tatt vare på med ro</h2>

            <p>
              Med enkel montering og sjeldent vedlikehold er en gravplate i tre et trygt og varig valg. 
              For noen betyr det også noe ekstra å kunne bidra selv – å ta del i omsorgen for et minne 
              som lever og eldes naturlig, i stedet for å stå stille.
            </p>

            <p className="text-lg font-medium">
              Enkelt. Verdige rammer. Og laget for å vare.
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
}
