import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import article4 from "@/assets/article-4.jpg";

const articles = [
  {
    id: 1,
    image: article1,
    category: "Veiledning",
    title: "Hvordan velge riktig gravstein",
    excerpt: "En guide til å finne den perfekte måten å hedre din kjære på.",
    slug: "velge-gravstein",
  },
  {
    id: 2,
    image: article2,
    category: "Bærekraft",
    title: "Miljøvennlige alternativer",
    excerpt: "Hvorfor trebaserte gravplater er et godt valg for naturen.",
    slug: "miljovennlig",
  },
  {
    id: 3,
    image: article3,
    category: "Symboler",
    title: "Betydningen av ulike symboler",
    excerpt: "Lær om tradisjoner og symbolikk i gravminnedesign.",
    slug: "symboler",
  },
  {
    id: 4,
    image: article4,
    category: "Vedlikehold",
    title: "Stell av treplater gjennom året",
    excerpt: "Tips for å bevare gravplatens skjønnhet i alle årstider.",
    slug: "vedlikehold",
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
                  <img
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
