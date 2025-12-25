import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import templateMellom from "@/assets/template-mellom-1.jpg";
import templateStor from "@/assets/template-stor-1.jpg";

const products = [
  {
    id: 1,
    name: "Gravplate Mellom",
    size: "30x40 cm",
    price: 3990,
    image: templateMellom,
    features: ["Norsk eik", "1 navn inkludert", "Lasergravering", "Valgfritt symbol"],
  },
  {
    id: 2,
    name: "Gravplate Stor",
    size: "40x50 cm",
    price: 5490,
    image: templateStor,
    features: ["Norsk eik", "1-2 navn inkludert", "Lasergravering", "Valgfritt symbol", "Større plass"],
    popular: true,
  },
];

export default function Bestill() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Bestill din gravplate
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Velg størrelse og start å designe din personlige minneplate.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative bg-card rounded-2xl overflow-hidden shadow-lg border-2 transition-all ${
                  product.popular ? "border-primary" : "border-border"
                }`}
              >
                {product.popular && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Mest populær
                  </div>
                )}
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <span className="text-sm text-muted-foreground">{product.size}</span>
                  <h2 className="font-display text-2xl font-bold mt-1 mb-2">{product.name}</h2>
                  <p className="text-3xl font-bold text-primary mb-6">
                    {product.price.toLocaleString("nb-NO")} kr
                  </p>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <Check className="h-5 w-5 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/komponer">
                      Komponer nå
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-semibold mb-4">
              Trenger du hjelp med bestillingen?
            </h3>
            <p className="text-muted-foreground mb-6">
              Vi hjelper deg gjerne med å designe den perfekte gravplaten. 
              Ta kontakt så finner vi løsningen sammen.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/kontakt">Kontakt oss</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
