import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";
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

function ArticleCard({
  article,
  index,
}: {
  article: (typeof articles)[number];
  index: number;
}) {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to={`/informasjon/${article.slug}`}
      style={{ animationDelay: `${index * 100}ms` }}
      className={`group block opacity-0 ${inView ? "animate-reveal-up" : ""}`}
    >
      <article className="relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-border/60 group-hover:border-accent/40 h-full">
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <div className="aspect-[4/3] overflow-hidden">
          <OptimizedImage
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-4 md:p-5">
          <span className="text-xs md:text-sm font-medium text-accent uppercase tracking-wider">
            {article.category}
          </span>
          <h3 className="font-display text-base md:text-xl font-semibold mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2 hidden md:block leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

export function ArticlesSection() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
  return (
    <section className="py-12 md:py-20">
      <div className="container px-4">
        <div
          ref={headRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-8 md:mb-12 opacity-0 ${
            headInView ? "animate-reveal-up" : ""
          }`}
        >
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-2 md:mb-3">
              Nyttig informasjon
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Artikler og veiledninger for å hjelpe deg på veien.
            </p>
            <SectionDivider className="mt-4 md:[&>span:first-child]:hidden md:justify-start" />
          </div>
          <Link
            to="/informasjon"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-base md:text-lg"
          >
            Se alle artikler
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
