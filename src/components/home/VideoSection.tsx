import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Player from "@vimeo/player";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Volume2, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionDivider } from "./SectionDivider";
import benefitsBg from "@/assets/benefits-oak-bg.jpg";

const VIMEO_ID = "1151281409";

const PREVIEW_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1&playsinline=1&controls=0&title=0&byline=0&portrait=0`;

const SOUND_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=0&playsinline=1&controls=1`;

export function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const { ref: revealRef, inView: revealInView } = useInView<HTMLDivElement>();
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>();

  // Lazy-load Vimeo iframe only when near viewport (CWV optimization)
  useEffect(() => {
    if (shouldLoadIframe || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadIframe]);

  const setIframeRef = useCallback((node: HTMLIFrameElement | null) => {
    if (!node) {
      playerRef.current = null;
      return;
    }

    const player = new Player(node);
    playerRef.current = player;

    void player.ready().then(() => {
      void player.setMuted(false);
      void player.setVolume(1);
      void player.setLoop(true);
      void player.play();
    });
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open && playerRef.current) {
      void playerRef.current.pause();
      playerRef.current = null;
    }
    setIsOpen(open);
  };

  return (
    <section className="relative py-12 md:py-20 bg-background overflow-hidden">
      {/* Subtle warm accent glow for visual flow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 rounded-full bg-wood/10 blur-3xl"
      />

      <div className="container relative px-4">
        <div
          ref={headingRef}
          className={`text-center max-w-3xl mx-auto mb-8 md:mb-12 opacity-0 ${
            headingInView ? "animate-reveal-up" : ""
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Håndverk med sjel
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Se hvordan vi skaper hver gravplate med presisjon og omsorg i vårt verksted.
          </p>
          <SectionDivider className="mt-5" />
        </div>

        {/* Card with reveal + accent frame */}
        <div
          ref={revealRef}
          className={`relative max-w-5xl mx-auto opacity-0 ${
            revealInView ? "animate-reveal-zoom" : ""
          }`}
        >
          <span
            aria-hidden
            className="absolute -inset-2 md:-inset-3 rounded-3xl bg-gradient-to-br from-accent/25 via-wood/15 to-transparent blur-lg"
          />
          <div
            ref={containerRef}
            className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl ring-2 ring-primary/40 focus-within:ring-primary bg-muted"
          >
            {shouldLoadIframe && (
              <iframe
                src={PREVIEW_SRC}
                className="w-full h-full pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="Produksjonsvideo (forhåndsvisning)"
                loading="lazy"
              />
            )}

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity"
              aria-label="Spill av produksjonsvideo med lyd"
            >
              <div className="text-center text-primary-foreground">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
                  <Volume2 className="w-8 h-8" />
                </div>
                <p className="text-lg md:text-xl font-medium">Klikk for lyd</p>
              </div>
            </button>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/bilder"
            className="inline-flex items-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg md:text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Se flere bilder
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Fullscreen */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-[95vw] md:max-w-[90vw] w-full h-auto aspect-video p-0 gap-0 border-2 border-primary/50 overflow-hidden rounded-xl bg-background"
        >
          <DialogTitle className="sr-only">Produksjonsvideo</DialogTitle>
          {isOpen && (
            <iframe
              ref={setIframeRef}
              src={SOUND_SRC}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title="Produksjonsvideo (med lyd)"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
