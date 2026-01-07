import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import monteringImg from "@/assets/montering-vedlikehold.png";
import article2 from "@/assets/baerekraft-hero.png";
import article3 from "@/assets/article-3.jpg";
import article4 from "@/assets/article-4.jpg";

const articles = [
  {
    id: 1,
    image: monteringImg,
    category: "Vedlikehold",
    title: "Montering og vedlikehold av gravplate i tre",
    excerpt: "Et levende minne – enkelt å ta vare på. Med enkel montering og sjeldent vedlikehold er en gravplate i tre et trygt og varig valg.",
    date: "7. januar 2025",
    slug: "montering-vedlikehold",
  },
  {
    id: 2,
    image: article2,
    category: "Bærekraft",
    title: "Miljøvennlige alternativer til tradisjonelle gravsteiner",
    excerpt: "Hvorfor trebaserte gravplater er et godt valg for naturen og fremtidige generasjoner.",
    date: "10. desember 2024",
    slug: "miljovennlig",
  },
  {
    id: 3,
    image: article3,
    category: "Symboler",
    title: "Betydningen av ulike symboler på gravminner",
    excerpt: "Lær om tradisjoner og symbolikk i gravminnedesign – fra livets tre til kristne symboler.",
    date: "5. desember 2024",
    slug: "symboler",
  },
  {
    id: 4,
    image: article4,
    category: "Vedlikehold",
    title: "Stell av treplater gjennom året",
    excerpt: "Tips for å bevare gravplatens skjønnhet i alle årstider, fra vinter til sommer.",
    date: "1. desember 2024",
    slug: "vedlikehold",
  },
];

export default function Informasjon() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-10 md:py-20 bg-secondary">
        <div className="container text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            Nyttig informasjon
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Artikler, veiledninger og tips for å hjelpe deg med valg og vedlikehold av gravminner.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/informasjon/${article.slug}`}
                className="group"
              >
                <article className="bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border group-hover:border-primary/20">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 md:p-8">
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                      <span className="text-xs font-medium text-accent uppercase tracking-wider px-2 py-0.5 md:px-3 md:py-1 bg-accent/10 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground">{article.date}</span>
                    </div>
                    <h2 className="font-display text-lg md:text-2xl font-semibold mb-1 md:mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
