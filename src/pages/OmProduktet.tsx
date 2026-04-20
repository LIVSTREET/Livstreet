import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  ArrowLeft,
  ArrowRight,
  TreePine,
  Sun,
  PenTool,
  Clock,
  Droplets,
  Heart,
} from "lucide-react";
import { SeoHead } from "@/seo/SeoHead";
import { ROUTE_META } from "@/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/seo/jsonLd";
import { ProductVideoPlayer } from "@/components/ProductVideoPlayer";
import monteringImg from "@/assets/montering-vedlikehold.png";
import baerekraftImg from "@/assets/baerekraft-hero.png";
import symbolerImg from "@/assets/article-3.jpg";
import hvaSkjerImg from "@/assets/hva-skjer-etterpa.png";

const PRODUCT_VIMEO_ID = "1184743331";
const STORY_VIMEO_ID = "1184891710";
// dnt=1 + endscreen=0 hides "more from author" recommendations after playback.
// Combined with our custom replay button this lets the user restart from start.
const PRODUCT_VIDEO_SRC = `https://player.vimeo.com/video/${PRODUCT_VIMEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&endscreen=0`;
const STORY_VIDEO_SRC = `https://player.vimeo.com/video/${STORY_VIMEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&endscreen=0`;

const facts = [
  {
    icon: TreePine,
    title: "Heltre eik",
    desc: "Massiv, nordisk eik med naturlig styrke og varm tone.",
  },
  {
    icon: Sun,
    title: "Utendørs behandling",
    desc: "UV-bestandig båtlakk beskytter mot sol, regn og vind.",
  },
  {
    icon: Droplets,
    title: "Vedlikehold",
    desc: "Sjeldent og overkommelig – et lett strøk lakk ved behov.",
  },
  {
    icon: Clock,
    title: "Levetid",
    desc: "Med enkelt vedlikehold står platen vakkert i mange år.",
  },
  {
    icon: PenTool,
    title: "Personlig gravering",
    desc: "Navn, datoer og symboler graveres med presisjon i treet.",
  },
];

const articles = [
  {
    image: monteringImg,
    category: "Vedlikehold",
    title: "Montering og vedlikehold",
    excerpt: "Enkelt å ta vare på – et trygt og varig valg.",
    slug: "montering-vedlikehold",
  },
  {
    image: baerekraftImg,
    category: "Bærekraft",
    title: "Miljøvennlige alternativer",
    excerpt: "Hvorfor trebaserte gravplater er et godt valg for naturen.",
    slug: "miljovennlig",
  },
  {
    image: symbolerImg,
    category: "Symboler",
    title: "Betydningen av ulike symboler",
    excerpt: "Lær om tradisjoner og symbolikk i gravminnedesign.",
    slug: "symboler",
  },
  {
    image: hvaSkjerImg,
    category: "Prosess",
    title: "Hva skjer etter bestilling?",
    excerpt: "En trygg prosess – steg for steg.",
    slug: "hva-skjer-etterpa",
  },
];

export default function OmProduktet() {
  const meta = ROUTE_META["/om-produktet"];
  return (
    <Layout>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: "Hjem", path: "/" },
            { name: "Om produktet", path: "/om-produktet" },
          ]),
        ]}
      />

      {/* Intro */}
      <section className="relative py-8 md:py-14 bg-gradient-to-b from-secondary to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container px-4 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 md:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tilbake til forsiden
          </Link>
          <h1 className="font-display text-3xl md:text-6xl font-bold max-w-4xl animate-fade-in leading-tight">
            Om produktet
          </h1>
          <p className="text-base md:text-2xl text-muted-foreground mt-4 md:mt-6 max-w-2xl animate-fade-in font-light leading-relaxed">
            Her kan du lære mer om materialet, uttrykket og hvordan gravplaten er
            laget for å vare ute over tid.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="bg-background py-8 md:py-12">
        <div className="container px-4">
          <div className="max-w-sm md:max-w-md mx-auto">
            <ProductVideoPlayer src={PRODUCT_VIDEO_SRC} title="Om produktet – Livstreet" />
          </div>
        </div>
      </section>

      {/* Fakta */}
      <section className="py-12 md:py-20 bg-secondary/40">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                Materialet og kvaliteten
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
                Hver plate er laget med omtanke for materiale, holdbarhet og uttrykk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              {facts.map((fact, i) => (
                <div
                  key={fact.title}
                  className="group flex sm:flex-col items-center sm:text-center gap-3 sm:gap-3 p-4 md:p-5 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <fact.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm md:text-base font-semibold mb-0.5 md:mb-1">
                      {fact.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                      {fact.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Klar til å lage din egen?
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
              Design en personlig gravplate i eik – eller ta kontakt om du ønsker hjelp på veien.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/komponer">Lag din gravplate</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/kontakt">Kontakt oss</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Historien bak Livstreet */}
      <section className="py-12 md:py-20 bg-secondary/40">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <span className="text-xs md:text-sm font-medium text-accent uppercase tracking-wider">
                Vår historie
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold mt-2 mb-2 md:mb-4">
                Historien bak Livstreet
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
                Et kort innblikk i hvorfor vi lager gravplater i tre – og hva som driver oss.
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-xl ring-1 ring-border bg-muted animate-scale-in">
              <iframe
                src={STORY_VIDEO_SRC}
                title="Historien bak Livstreet"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nyttig informasjon */}
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
                key={article.slug}
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
    </Layout>
  );
}
