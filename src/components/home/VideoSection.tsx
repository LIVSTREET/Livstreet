import productionImg from "@/assets/production-1.jpg";

export function VideoSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Håndverk med sjel
          </h2>
          <p className="text-muted-foreground text-lg">
            Se hvordan vi skaper hver gravplate med presisjon og omsorg i vårt verksted.
          </p>
        </div>

        <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {/* Placeholder for video - using image as fallback */}
          <div className="relative w-full h-full">
            <img
              src={productionImg}
              alt="Produksjon av gravplater"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-primary-foreground/30 transition-colors">
                  <svg
                    className="w-8 h-8 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">Se produksjonsvideo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
