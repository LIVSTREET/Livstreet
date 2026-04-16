import { Layout } from "@/components/layout/Layout";

export default function Kjopsvilkar() {
  return (
    <Layout>
      <div className="container py-10 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-display font-bold text-primary mb-6 md:mb-8">
            Salgs- og handelsbetingelser for Livstreet
          </h1>
          
          <p className="text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">
            Disse salgsbetingelsene gjelder for kjøp hos Livstreet og er i samsvar med norsk lovgivning for norske forbrukere.
          </p>

          <div className="space-y-8 md:space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                1. Generell informasjon
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-1">
                <p><strong>Livstreet</strong> (enkeltpersonforetak)</p>
                <p>Organisasjonsnummer: <strong>927 309 114</strong></p>
                <p>Sted: <strong>Oslo, Norge</strong></p>
                <p>Telefon: <strong>45 25 12 80</strong></p>
                <p>E-post: <a href="mailto:livstreet.store@gmail.com" className="text-accent hover:underline">livstreet.store@gmail.com</a></p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                2. Priser og betaling
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-3">
                <p>Alle priser er oppgitt i <strong>norske kroner (NOK)</strong> og inkluderer merverdiavgift der dette er påkrevd.</p>
                <p>Bestilling via nettsiden er en <strong>forespørsel</strong> og er ikke bindende før design og omfang er avklart skriftlig.</p>
                <p><strong>Faktura sendes per e-post etter levering/montering.</strong> Betalingsfrist fremgår av fakturaen.</p>
                <p>Ingen betaling gjennomføres direkte via nettsiden eller Shopify.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                3. Produksjon og levering
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-3">
                <p>Alle produkter fra Livstreet produseres på bestilling etter kundens spesifikasjoner.</p>
                <p>Normal leveringstid er <strong>2–4 uker</strong>. Ved særlig høy pågang kan leveringstiden bli lengre, og du varsles i så fall.</p>
                <p>Produksjon igangsettes først etter at design er avklart skriftlig med deg.</p>
                <p>Levering skjer til adressen kunden oppgir. Kunden vil bli informert dersom det oppstår forsinkelser.</p>
                <p><strong>Gratis montering i Oslo-området tilbys i en introduksjonsperiode og kan avsluttes uten varsel.</strong></p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                4. Angrerett
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-3">
                <p>I henhold til <strong>angrerettloven § 22 bokstav e</strong>, gjelder <strong>ikke angrerett</strong> for produkter som er fremstilt etter kundens spesifikasjoner eller har et tydelig personlig preg.</p>
                <p>Når produksjonen er igangsatt, kan bestillingen ikke angres eller kanselleres.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                5. Reklamasjon
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-3">
                <p>Dersom produktet har en feil eller mangel, gjelder reglene i <strong>forbrukerkjøpsloven</strong>.</p>
                <p>Reklamasjon må meldes skriftlig til: <a href="mailto:livstreet.store@gmail.com" className="text-accent hover:underline">livstreet.store@gmail.com</a></p>
                <p>Reklamasjonen skal inneholde:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Beskrivelse av feilen</li>
                  <li>Bilder som dokumenterer mangelen</li>
                </ul>
                <p>Ved godkjent reklamasjon vil Livstreet, etter eget valg:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Utbedre feilen</li>
                  <li>Erstatte produktet</li>
                  <li>Eventuelt refundere kjøpesummen</li>
                </ul>
                <p>Ved godkjent reklamasjon dekker Livstreet kostnader knyttet til ny levering.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                6. Ansvarsbegrensning
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-3">
                <p>Livstreet kan ikke holdes ansvarlig for:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Skader som følge av feil montering</li>
                  <li>Skader forårsaket av ekstreme værforhold (frost, storm, kraftig nedbør mv.)</li>
                  <li>Hærverk, påkjørsel eller annen ytre påvirkning</li>
                  <li>Manglende eller feil vedlikehold av produktet</li>
                  <li>Forsinkelser som skyldes forhold utenfor vår kontroll (force majeure)</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                7. Personopplysninger
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-3">
                <p>Livstreet behandler personopplysninger i samsvar med gjeldende <strong>personvernlovgivning (GDPR)</strong>.</p>
                <p>Personopplysninger brukes kun til:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Behandling av bestillinger</li>
                  <li>Fakturering og levering</li>
                  <li>Kundedialog og lovpålagt regnskapsføring</li>
                </ul>
                <p>Opplysningene deles ikke med tredjeparter, utover det som er nødvendig for fakturering og levering.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-2xl font-display font-semibold text-primary mb-3 md:mb-4">
                8. Kontakt
              </h2>
              <div className="text-sm md:text-base text-muted-foreground space-y-2">
                <p>Har du spørsmål om bestilling, betaling eller levering, kan du kontakte oss på:</p>
                <p>📧 <a href="mailto:livstreet.store@gmail.com" className="text-accent hover:underline">livstreet.store@gmail.com</a></p>
                <p>📞 <a href="tel:+4745251280" className="text-accent hover:underline">45 25 12 80</a></p>
              </div>
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
