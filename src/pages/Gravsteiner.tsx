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
    description: "Perfekt for enkeltpersoner. 30x40 cm i eik.",
    price: "fra 3 990 kr",
    image: templateMellom,
    size: "30x40 cm",
  },
  {
    id: 2,
    name: "Gravplate Stor",
    description: "Større plate for en eller to personer. 40x50 cm i eik.",
    price: "fra 5 490 kr",
    image: templateStor,
    size: "40x50 cm",
  },
];

export default function Gravsteiner() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-12 md:py-24 bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-2 md:mb-4">
            Våre gravplater i tre
          </h1>
          <p className="text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Håndlagde minneplater i eik – dansk design og produksjon formidlet i Norge.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-border hover:border-primary/30 transition-all">
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 md:p-8">
                    <span className="text-xs md:text-sm text-muted-foreground">{product.size}</span>
                    <h2 className="font-display text-xl md:text-2xl font-bold mt-1 md:mt-2 mb-2 md:mb-3">{product.name}</h2>
                    <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-xl font-semibold text-primary">{product.price}</span>
                      <Button variant="hero" asChild>
                        <Link to="/komponer">Send forespørsel</Link>
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
      <section className="py-10 md:py-20 bg-secondary">
        <div className="container px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Hvorfor velge tre?
          </h2>
          <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-2 md:p-6">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4">🌳</div>
              <h3 className="font-display text-sm md:text-xl font-semibold mb-1 md:mb-2">Bærekraftig</h3>
              <p className="text-muted-foreground text-xs md:text-base hidden md:block">Naturlig materiale som brytes ned organisk over tid.</p>
            </div>
            <div className="text-center p-2 md:p-6">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4">✨</div>
              <h3 className="font-display text-sm md:text-xl font-semibold mb-1 md:mb-2">Unikt</h3>
              <p className="text-muted-foreground text-xs md:text-base hidden md:block">Hver plate har sin egen trestruktur og personlighet.</p>
            </div>
            <div className="text-center p-2 md:p-6">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4">🇩🇰</div>
              <h3 className="font-display text-sm md:text-xl font-semibold mb-1 md:mb-2">Dansk design og produksjon</h3>
              <p className="text-muted-foreground text-xs md:text-base hidden md:block">Designet og produsert i Danmark, formidlet i Norge med fokus på håndverk og kvalitet.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
