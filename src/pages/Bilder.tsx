import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getPublishedPlateGalleryImages } from "@/lib/plateGallery";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SeoHead } from "@/seo/SeoHead";
import { ROUTE_META } from "@/seo/metadata";

export default function Bilder() {
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["plate-gallery-public"],
    queryFn: getPublishedPlateGalleryImages,
  });

  return (
    <Layout>
      <section className="py-10 md:py-20 bg-primary">
        <div className="container text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-2 md:mb-4">
            Bilder av våre gravplater
          </h1>
          <p className="text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Her ser du vår gravplate i naturlige omgivelser.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-[480px] rounded-xl" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">
              Ingen bilder tilgjengelig ennå.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {images.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    loading="lazy"
                    className="w-full h-[480px] md:h-[560px] lg:h-[620px] object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {img.title && (
                    <div className="p-4 bg-card">
                      <p className="font-display font-semibold text-foreground">{img.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Klar for å lage din egen gravplate?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-6 md:mb-8">
            Bruk vår designer til å designe en unik og personlig gravplate – enkelt og raskt.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/komponer">Lag din gravplate</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
