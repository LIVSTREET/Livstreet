import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import productionImg from "@/assets/production-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

export default function OmOss() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Om Livstreet
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Vi skaper bæredyktige minner i tre – med respekt for naturen og de vi har mistet.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">Vår historie</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Livstreet ble født ut av et ønske om å tilby et mer bæredyktig alternativ 
                  til tradisjonelle gravsteiner. Vi tror at et minne kan være vakkert uten 
                  å belaste miljøet.
                </p>
                <p>
                  Våre gravplater lages av norsk eik fra bærekraftig skogbruk. Hvert tre 
                  som brukes erstattes med nye trær, slik at skogen lever videre – akkurat 
                  som minnene vi hedrer.
                </p>
                <p>
                  Vi kombinerer tradisjonelt håndverk med moderne lasergravering for å 
                  skape varige, personlige minnesmerker som tåler tidens tann.
                </p>
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={productionImg}
                alt="Vårt verksted"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Våre verdier</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-display text-xl font-semibold mb-3">Bærekraft</h3>
              <p className="text-muted-foreground">
                Alt vi gjør er med tanke på kommende generasjoner og miljøet.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="font-display text-xl font-semibold mb-3">Omsorg</h3>
              <p className="text-muted-foreground">
                Vi forstår at hvert minne er unikt og behandler alle med respekt.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="font-display text-xl font-semibold mb-3">Kvalitet</h3>
              <p className="text-muted-foreground">
                Norsk håndverk og materialer av høyeste kvalitet i hver plate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <img
              src={testimonial2}
              alt="Vårt team"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
            />
            <h2 className="font-display text-3xl font-bold mb-4">Et lite team med stor lidenskap</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Vi er en familie av håndverkere, designere og naturelskere som brenner for 
              å skape vakre, bæredyktige minner.
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
