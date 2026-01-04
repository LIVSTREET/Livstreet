import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import oakCraftsmanship from "@/assets/oak-craftsmanship.png";
import foundersImg from "@/assets/founders.png";
import { Heart, Leaf, Hammer } from "lucide-react";

const values = [
  { icon: Heart, title: "Verdige minner" },
  { icon: Leaf, title: "Naturlige valg" },
  { icon: Hammer, title: "Ekte håndverk" },
];

export default function OmOss() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-10 md:py-20 bg-primary">
        <div className="container text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-2 md:mb-4">
            Om oss
          </h1>
          {/* Values */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-8">
            {values.map((value) => (
              <div key={value.title} className="flex items-center gap-2 text-primary-foreground/90">
                <value.icon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="font-medium text-sm md:text-base">{value.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Image */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4 md:space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Hos Livstreet formidler vi bærekraftige gravplater i massivt, FSC-sertifisert eik – 
                som et varmt og verdig alternativ til den tradisjonelle gravsteinen i granitt. 
                Produktene våre er designet og produsert i Danmark, og utformet for å hedre minnet på en 
                personlig, vakker og miljøvennlig måte.
              </p>
              <p>
                I en tid hvor stadig flere ønsker å ta bevisste og bærekraftige valg – også ved 
                livets slutt – tilbyr vi et gravminne laget av naturlig tre. I motsetning til 
                tunge granittsteiner som ofte importeres langveisfra, er våre gravplater 
                produsert i Danmark, lette å håndtere og laget med omtanke for miljøet.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <img
                src={oakCraftsmanship}
                alt="Eiketre og håndverksverktøy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-secondary">
        <div className="container px-4">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16">
            Hva våre kunder sier
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-background rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm">
              <blockquote className="text-muted-foreground leading-relaxed italic mb-3 md:mb-6 text-sm md:text-base">
                "Det var tungt å måtte ta stilling til gravminne, men vi kjente med en gang at tre var riktig – han var jo en stolt tømrer. Da vi tilfeldigvis så et innslag om Livstræet på TV samme kveld, føltes det nesten som et tegn. Våre ønsker ble fulgt, og resultatet ser utrolig fint og helt riktig ut."
              </blockquote>
              <p className="font-medium text-foreground text-sm md:text-base">– Claus' familie</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-background rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm">
              <blockquote className="text-muted-foreground leading-relaxed italic mb-3 md:mb-6 text-sm md:text-base">
                "Mamma elsket hagen, blomster og alt som vokster. Derfor ble en gravplate i tre et naturlig valg – den passer så godt til et gravsted fylt med blomster. Vi fikk god hjelp, flere valgmuligheter og fantastisk service. Platen ble levert og satt opp, og den er virkelig vakker. Men vi skulle helst hatt mamma her."
              </blockquote>
              <p className="font-medium text-foreground text-sm md:text-base">– Ditte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Vår misjon er å gi pårørende muligheten til å velge et verdig, personlig og 
              klimavennlig gravminne – uten å gå på kompromiss med kvalitet, uttrykk eller holdbarhet.
            </p>
            <p>
              Gravplatene fra Livstreet veier kun ca. 10,5 kg, og kan brukes som alternativ til 
              tradisjonell granitt på mange norske kirkegårder (i tråd med lokale retningslinjer). 
              Vi gir 20 års garanti på våre produkter.
            </p>
            <p>
              Enten du ser etter et alternativ til granittgravstein, et gravminne uten plast, 
              eller en mer personlig løsning med lavere CO₂-avtrykk, er vi her for å veilede deg 
              trygt gjennom valget.
            </p>
          </div>
        </div>
      </section>

      {/* Norwegian Representative */}
      <section className="py-10 md:py-20 bg-secondary">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1 space-y-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold">Din kontakt i Norge</h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Jeg heter Peder August Halvorsen, og jeg er stolt av å formidle Livstræets gravplater til Norge. 
                Som nevø av Dan har jeg vokst opp med en dyp respekt for godt håndverk og kvalitet.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Jeg har alltid vært glad i skogen og fascinert av treverk – alt man kan gjøre med det. 
                Det er et vakkert, fleksibelt og varmt materiale som representerer noe annet enn hva stein 
                kan gjøre. Når jeg så onkel Dans arbeid med Livstreet, skjønte jeg at dette var noe jeg 
                måtte bringe til Norge.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Jeg er her for å hjelpe deg gjennom hele prosessen – fra valg av plate til levering. 
                Ta gjerne kontakt hvis du har spørsmål eller trenger veiledning.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/kontakt">Ta kontakt</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-muted">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center p-8">
                    <p className="text-sm">Bilde av Peder kommer her</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founders */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container text-center px-4">
          <div className="max-w-3xl mx-auto">
            <img
              src={foundersImg}
              alt="Dan og Steffen Frederiksen"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 md:mb-6 object-cover object-top shadow-lg"
            />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 md:mb-4">Håndverk fra Danmark – formidlet i Norge</h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8">
              Dan og Steffen Frederiksen startet Livstreet i Danmark med et ønske om å lage gravplater i tre – 
              et naturlig og bærekraftig alternativ til granitt. Deres håndverk og passion for kvalitet 
              videreføres nå i Norge gjennom Livstreet, hvor vi formidler disse unike produktene til norske 
              kunder med samme fokus på verdighet og miljøvennlige valg.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/kontakt">Ta kontakt med oss</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
