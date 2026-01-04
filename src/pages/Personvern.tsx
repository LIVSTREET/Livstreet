import { Layout } from "@/components/layout/Layout";

export default function Personvern() {
  return (
    <Layout>
      <div className="container py-10 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-display font-bold text-primary mb-6 md:mb-8">
            Personvernerklæring for Livstreet
          </h1>
          
          <p className="text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">
            Hos Livstreet tar vi personvernet ditt på alvor. Denne personvernerklæringen forklarer hvordan vi samler inn, bruker og beskytter personopplysninger når du besøker nettsiden vår eller handler hos oss.
          </p>

          <div className="space-y-8 md:space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                1. Dataansvarlig
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-1">
                <p><strong>Livstreet</strong> (enkeltpersonforetak)</p>
                <p>Organisasjonsnummer: <strong>927 309 114</strong></p>
                <p>Sted: <strong>Oslo, Norge</strong></p>
                <p>Telefon: <strong>45 25 12 80</strong></p>
                <p>E-post: <a href="mailto:livstreet.store@gmail.com" className="text-accent hover:underline">livstreet.store@gmail.com</a></p>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mt-4">
                Livstreet er behandlingsansvarlig for personopplysningene som behandles via nettsiden.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                2. Hvilke opplysninger samler vi inn
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-3">
                Når du besøker nettsiden, kontakter oss eller legger inn en bestilling, kan vi samle inn følgende opplysninger:
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 ml-2">
                <li>Navn</li>
                <li>Leverings- og fakturaopplysninger</li>
                <li>Telefonnummer</li>
                <li>E-postadresse</li>
                <li>Eventuelle meldinger eller tilleggsopplysninger du selv oppgir</li>
              </ul>
              <p className="text-sm md:text-base text-muted-foreground mt-4">
                Vi samler <strong>ikke</strong> inn personopplysninger via cookies, analyseverktøy eller sporing.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                3. Formål med innsamlingen
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-3">
                Personopplysninger brukes kun til:
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 ml-2">
                <li>Behandling og levering av bestillinger</li>
                <li>Kundeservice og kommunikasjon</li>
                <li>Utarbeidelse av tilbud og designforslag</li>
                <li>Administrasjon og oppfølging</li>
                <li>Regnskaps- og bokføringsformål i henhold til gjeldende lovverk</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                4. Lagring og sikkerhet
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Vi lagrer personopplysninger kun så lenge det er nødvendig for formålet de ble samlet inn for, eller så lenge vi er lovpålagt å oppbevare dem (for eksempel etter bokføringsloven).
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-3">
                Opplysningene lagres sikkert i systemer som benyttes til drift av nettbutikken, og behandles konfidensielt. Kun virksomhetens eier har tilgang.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                5. Deling av opplysninger
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-3">
                Livstreet deler ikke personopplysninger med tredjeparter, med mindre dette er nødvendig for å gjennomføre en bestilling eller oppfylle lovpålagte krav.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-3">
                Opplysninger kan deles med:
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 ml-2">
                <li><strong>Shopify</strong> (drift av nettbutikk og ordrebehandling)</li>
                <li>Betalings- og regnskapssystemer (kun nødvendige opplysninger)</li>
                <li>Frakt- og leveringstjenester ved utsendelse av produkter</li>
              </ul>
              <p className="text-sm md:text-base text-muted-foreground mt-4">
                Alle databehandlere behandler opplysninger på våre vegne og i tråd med gjeldende personvernlovgivning (GDPR).
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-3">
                Personopplysninger selges eller brukes aldri til markedsføring fra tredjeparter.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                6. Cookies og sporing
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Livstreet bruker <strong>ikke egne cookies, sporingsverktøy eller analyseverktøy</strong>.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-3">
                Merk: Shopify kan benytte <strong>teknisk nødvendige cookies</strong> for at nettbutikken skal fungere korrekt (for eksempel handlekurv og kasse). Disse brukes ikke til markedsføring eller sporing.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                7. Dine rettigheter
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-3">
                Du har rett til:
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 ml-2">
                <li>Innsyn i hvilke personopplysninger vi har lagret om deg</li>
                <li>Å få rettet eller slettet opplysninger</li>
                <li>Å trekke tilbake samtykke der behandlingen er samtykkebasert</li>
                <li>Å klage til Datatilsynet dersom du mener personopplysninger behandles i strid med regelverket</li>
              </ul>
              <p className="text-sm md:text-base text-muted-foreground mt-4">
                Henvendelser kan sendes til: <a href="mailto:livstreet.store@gmail.com" className="text-accent hover:underline">livstreet.store@gmail.com</a>
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                8. Endringer i personvernerklæringen
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Denne personvernerklæringen kan bli oppdatert ved behov. Oppdatert versjon vil alltid være tilgjengelig på nettsiden.
              </p>
            </section>

            {/* Last updated */}
            <p className="text-sm md:text-base text-muted-foreground font-semibold pt-4 border-t">
              Sist oppdatert: 4. januar 2026
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
