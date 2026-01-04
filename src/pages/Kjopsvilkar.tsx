import { Layout } from "@/components/layout/Layout";

const Kjopsvilkar = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-serif text-foreground mb-6 md:mb-8">
            Salgs- og handelsbetingelser for Livstreet
          </h1>
          
          <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            Disse salgsbetingelsene gjelder for kjøp hos Livstreet og er i samsvar med norsk lovgivning for norske forbrukere.
          </p>

          <div className="space-y-6 md:space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">1. Generell informasjon</h2>
              <div className="text-muted-foreground space-y-1 text-sm md:text-base">
                <p>Firmanavn: <strong className="text-foreground">Livstreet</strong> (enkeltpersonforetak)</p>
                <p>Organisasjonsnummer: <strong className="text-foreground">927 309 114</strong></p>
                <p>Sted: <strong className="text-foreground">Oslo, Norge</strong></p>
                <p>Telefon: <strong className="text-foreground">45 25 12 80</strong></p>
                <p>E-post: <a href="mailto:livstreet.store@gmail.com" className="text-primary hover:underline">livstreet.store@gmail.com</a></p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">2. Priser og betaling</h2>
              <div className="text-muted-foreground space-y-3 text-sm md:text-base">
                <p>Alle priser er oppgitt i <strong className="text-foreground">norske kroner (NOK)</strong> og inkluderer merverdiavgift der dette er påkrevd.</p>
                <p>Bestilling via nettsiden innebærer en <strong className="text-foreground">forespørsel</strong> og er ikke bindende før kunden har mottatt og akseptert faktura.</p>
                <p><strong className="text-foreground">Betaling skjer utelukkende via faktura</strong>, som sendes til kunden etter bekreftet bestilling. Betalingsfrist fremgår av fakturaen.</p>
                <p>Ingen betaling gjennomføres direkte via nettsiden eller Shopify.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">3. Produksjon og levering</h2>
              <div className="text-muted-foreground space-y-3 text-sm md:text-base">
                <p>Alle produkter fra Livstreet produseres på bestilling etter kundens spesifikasjoner.</p>
                <p>Forventet leveringstid er normalt <strong className="text-foreground">2–3 uker</strong>. I perioder med høy pågang (for eksempel sommerferie) kan leveringstiden være opptil <strong className="text-foreground">4 uker</strong>.</p>
                <p>Produksjon igangsettes først etter at faktura er akseptert og betaling er mottatt, med mindre annet er avtalt skriftlig.</p>
                <p>Levering skjer til adressen kunden oppgir. Kunden vil bli informert dersom det oppstår forsinkelser.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">4. Angrerett</h2>
              <div className="text-muted-foreground space-y-3 text-sm md:text-base">
                <p>I henhold til <strong className="text-foreground">angrerettloven § 22 bokstav e</strong>, gjelder <strong className="text-foreground">ikke angrerett</strong> for produkter som er fremstilt etter kundens spesifikasjoner eller har et tydelig personlig preg.</p>
                <p>Når produksjonen er igangsatt, kan bestillingen ikke angres eller kanselleres.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">5. Reklamasjon</h2>
              <div className="text-muted-foreground space-y-3 text-sm md:text-base">
                <p>Dersom produktet har en feil eller mangel, gjelder reglene i <strong className="text-foreground">forbrukerkjøpsloven</strong>.</p>
                <p>Reklamasjon må meldes skriftlig til: <a href="mailto:livstreet.store@gmail.com" className="text-primary hover:underline">livstreet.store@gmail.com</a></p>
                <p>Reklamasjonen skal inneholde:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Beskrivelse av feilen</li>
                  <li>Bilder som dokumenterer mangelen</li>
                </ul>
                <p>Ved godkjent reklamasjon vil Livstreet, etter eget valg:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Utbedre feilen</li>
                  <li>Erstatte produktet</li>
                  <li>Eventuelt refundere kjøpesummen</li>
                </ul>
                <p>Ved godkjent reklamasjon dekker Livstreet kostnader knyttet til ny levering.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">6. Ansvarsbegrensning</h2>
              <div className="text-muted-foreground space-y-3 text-sm md:text-base">
                <p>Livstreet kan ikke holdes ansvarlig for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
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
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">7. Personopplysninger</h2>
              <div className="text-muted-foreground space-y-3 text-sm md:text-base">
                <p>Livstreet behandler personopplysninger i samsvar med gjeldende <strong className="text-foreground">personvernlovgivning (GDPR)</strong>.</p>
                <p>Personopplysninger brukes kun til:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Behandling av bestillinger</li>
                  <li>Fakturering og levering</li>
                  <li>Kundedialog og lovpålagt regnskapsføring</li>
                </ul>
                <p>Opplysningene deles ikke med tredjeparter, utover det som er nødvendig for fakturering og levering.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">8. Kontakt</h2>
              <div className="text-muted-foreground space-y-2 text-sm md:text-base">
                <p>Har du spørsmål om bestilling, betaling eller levering, kan du kontakte oss på:</p>
                <p>📧 <a href="mailto:livstreet.store@gmail.com" className="text-primary hover:underline">livstreet.store@gmail.com</a></p>
                <p>📞 <a href="tel:+4745251280" className="text-primary hover:underline">45 25 12 80</a></p>
              </div>
            </section>

            <p className="text-muted-foreground text-xs md:text-sm pt-4 border-t border-border">
              <strong>Sist oppdatert: 4. januar 2026</strong>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Kjopsvilkar;
