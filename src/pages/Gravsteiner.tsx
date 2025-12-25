import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import templateMellom from "@/assets/template-mellom-1.jpg";
import templateStor from "@/assets/template-stor-1.jpg";

const products = [
  {
    id: 1,
    name: "Gravplate Mellom",
    description: "Perfekt for enkeltpersoner. 30x40 cm i norsk eik.",
    price: "fra 3 990 kr",
    image: templateMellom,
    size: "30x40 cm",
  },
  {
    id: 2,
    name: "Gravplate Stor",
    description: "Større plate for en eller to personer. 40x50 cm i norsk eik.",
    price: "fra 5 490 kr",
    image: templateStor,
    size: "40x50 cm",
  },
];

export default function Gravsteiner() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Våre gravplater i tre
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Håndlagde minneplater i norsk eik – et bæredyktig og vakkert alternativ til tradisjonelle gravsteiner.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:border-primary/30 transition-all">
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-sm text-muted-foreground">{product.size}</span>
                    <h2 className="font-display text-2xl font-bold mt-2 mb-3">{product.name}</h2>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-primary">{product.price}</span>
                      <Button variant="hero" asChild>
                        <Link to="/komponer">Komponer</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Hvorfor velge tre?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="font-display text-xl font-semibold mb-2">Bærekraftig</h3>
              <p className="text-muted-foreground">Naturlig materiale som brytes ned organisk over tid.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-display text-xl font-semibold mb-2">Unikt</h3>
              <p className="text-muted-foreground">Hver plate har sin egen trestruktur og personlighet.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🇳🇴</div>
              <h3 className="font-display text-xl font-semibold mb-2">Norsk håndverk</h3>
              <p className="text-muted-foreground">Laget med stolthet i Norge av dyktige håndverkere.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
