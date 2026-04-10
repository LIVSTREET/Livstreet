import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { getPublishedPlateGalleryImages } from "@/lib/plateGallery";
import { Skeleton } from "@/components/ui/skeleton";

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
            Her ser du et utvalg av våre gravplater i realistiske omgivelser. Bildene vises i høy kvalitet for å gi et godt inntrykk av uttrykk, materialer og detaljer.
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
    </Layout>
  );
}
