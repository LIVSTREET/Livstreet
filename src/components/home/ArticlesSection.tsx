import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import monteringImg from "@/assets/montering-vedlikehold.png";
import baerekraftImg from "@/assets/baerekraft-hero.png";
import symbolerImg from "@/assets/article-3.jpg";
import hvaSkjerImg from "@/assets/hva-skjer-etterpa.png";

const articles = [
  {
    id: 1,
    image: monteringImg,
    category: "Vedlikehold",
    title: "Montering og vedlikehold",
    excerpt: "Enkelt å ta vare på – et trygt og varig valg.",
    slug: "montering-vedlikehold",
  },
  {
    id: 2,
    image: baerekraftImg,
    category: "Bærekraft",
    title: "Miljøvennlige alternativer",
    excerpt: "Hvorfor trebaserte gravplater er et godt valg for naturen.",
    slug: "miljovennlig",
  },
  {
    id: 3,
    image: symbolerImg,
    category: "Symboler",
    title: "Betydningen av ulike symboler",
    excerpt: "Lær om tradisjoner og symbolikk i gravminnedesign.",
    slug: "symboler",
  },
  {
    id: 4,
    image: hvaSkjerImg,
    category: "Prosess",
    title: "Hva skjer etter bestilling?",
    excerpt: "En trygg prosess – steg for steg.",
    slug: "hva-skjer-etterpa",
  },
];

export function ArticlesSection() {
  return (
    <section className="py-10 md:py-20 bg-secondary">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-4 mb-6 md:mb-12">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-1 md:mb-2">
              Nyttig informasjon
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg">
              Artikler og veiledninger for å hjelpe deg på veien.
            </p>
          </div>
          <Link
            to="/informasjon"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm md:text-base"
          >
            Se alle artikler
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/informasjon/${article.slug}`}
              className="group"
            >
              <article className="bg-card rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border group-hover:border-primary/20">
                <div className="aspect-[4/3] overflow-hidden">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 md:p-5">
                  <span className="text-[10px] md:text-xs font-medium text-accent uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="font-display text-sm md:text-lg font-semibold mt-1 md:mt-2 mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 hidden md:block">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
