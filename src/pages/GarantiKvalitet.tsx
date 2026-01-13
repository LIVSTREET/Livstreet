import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, CheckCircle2, Wrench, Info, Mail, Phone, AlertCircle } from "lucide-react";

export default function GarantiKvalitet() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-10 md:py-20 bg-primary">
        <div className="container px-4">
          <Link 
            to="/informasjon" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tilbake til artikler
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Garanti og kvalitet
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Hos Livstreet lager vi gravplater i naturlige materialer, produsert på bestilling og ment å stå ute i mange år. Denne siden forklarer hvilke garantier som gjelder, og hvilke valg du har for vedlikehold over tid.
            </p>
          </div>
        </div>
      </section>

      {/* 10 års garanti */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-forest/10 rounded-full">
                <Shield className="w-8 h-8 text-forest" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">10 års kvalitetsgaranti</h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Vi tilbyr 10 års kvalitetsgaranti på våre gravplater.
            </p>

            <div className="bg-forest/5 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="font-semibold text-lg mb-4">Garantien dekker:</h3>
              <ul className="space-y-3">
                {[
                  "feil i materialer",
                  "produksjonsfeil",
                  "konstruksjonsfeil som påvirker produktets funksjon eller holdbarhet"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="font-semibold text-lg mb-4">Garantien gjelder forutsatt:</h3>
              <ul className="space-y-3">
                {[
                  "normal bruk",
                  "korrekt montering",
                  "vedlikehold utført i tråd med vår veiledning"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to="/informasjon/montering-vedlikehold"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-8"
            >
              👉 Se egen side for montering og vedlikehold
            </Link>
          </div>
        </div>
      </section>

      {/* Hva garantien ikke dekker */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Hva garantien ikke dekker</h2>
            </div>

            <p className="text-muted-foreground mb-6">Garantien dekker ikke:</p>
            
            <ul className="space-y-3 mb-8">
              {[
                "naturlig slitasje og aldring i treverket",
                "endringer i farge og overflate over tid",
                "skader som skyldes manglende eller feil vedlikehold",
                "skader forårsaket av ekstremt vær, ytre påvirkning, hærverk eller påkjørsel",
                "skader som følge av feil montering"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Tre er et levende naturmateriale, og mindre endringer over tid er normalt og forventet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vedlikehold */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Vedlikehold – ditt ansvar, ditt valg</h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              For å bevare platen best mulig anbefaler vi jevnlig vedlikehold.
            </p>

            <div className="bg-muted rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="font-semibold text-lg mb-4">Du kan velge:</h3>
              <ul className="space-y-3">
                {[
                  "å følge vår vedlikeholdsguide selv",
                  "å få vedlikehold utført lokalt"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-muted-foreground">
              Så lenge vedlikeholdet gjøres i tråd med vår veiledning, påvirker dette ikke garantien.
            </p>
          </div>
        </div>
      </section>

      {/* Fabrikkfornyelse */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Valgfri fabrikkfornyelse i Danmark
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              For kunder som ønsker det, tilbyr vi full fabrikkfornyelse ved vårt verksted i Danmark.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Dette kan inkludere:</h3>
                <ul className="space-y-2">
                  {["sliping", "ny overflatebehandling", "kontroll før retur"].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Dette er:</h3>
                <ul className="space-y-2">
                  {[
                    "et valgfritt tilbud",
                    "ikke en del av garantien",
                    "forbundet med frakt- og servicekostnader"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground">
              Pris og praktisk gjennomføring avtales individuelt ved forespørsel.
            </p>
          </div>
        </div>
      </section>

      {/* Reklamasjon */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Reklamasjon</h2>

            <p className="text-muted-foreground mb-6">
              Dersom du mener produktet har en feil som omfattes av garantien, ber vi deg kontakte oss skriftlig.
            </p>

            <div className="bg-muted rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="font-semibold mb-4">Reklamasjonen må inneholde:</h3>
              <ul className="space-y-3">
                {[
                  "kort beskrivelse av feilen",
                  "bilder som dokumenterer forholdet"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href="mailto:livstreet.store@gmail.com"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-6"
            >
              <Mail className="w-4 h-4" />
              livstreet.store@gmail.com
            </a>

            <p className="text-sm text-muted-foreground">
              Reklamasjoner behandles i tråd med forbrukerkjøpsloven og våre{" "}
              <Link to="/kjopsvilkar" className="text-primary hover:underline">
                salgs- og handelsbetingelser
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Spørsmål */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Spørsmål?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Er du usikker på garanti, vedlikehold eller hva som gjelder i ditt tilfelle, er du alltid velkommen til å ta kontakt. Vi svarer gjerne.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:livstreet.store@gmail.com"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-full font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                livstreet.store@gmail.com
              </a>
              <a 
                href="tel:+4745251280"
                className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                45 25 12 80
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
