import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Player from "@vimeo/player";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Volume2, ArrowRight } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const VIMEO_ID = "1151281409";

const PREVIEW_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1&playsinline=1&controls=0&title=0&byline=0&portrait=0`;

const SOUND_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=0&playsinline=1&controls=1`;

export function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

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
    <section className="py-10 md:py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Håndverk med sjel
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Se hvordan vi skaper hver gravplate med presisjon og omsorg i vårt verksted.
          </p>
        </div>

        {/* Card */}
        <div
          ref={containerRef}
          className="relative aspect-video max-w-5xl mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl ring-2 ring-primary/50 focus-within:ring-primary bg-muted"
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
              <p className="text-lg font-medium">Klikk for lyd</p>
            </div>
          </button>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link
            to="/bilder"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Se flere bilder
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Fullscreen */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-[95vw] md:max-w-[90vw] w-full h-auto aspect-video p-0 gap-0 border-2 border-primary/50 overflow-hidden rounded-xl bg-background"
        >
          <VisuallyHidden><DialogTitle>Produksjonsvideo</DialogTitle></VisuallyHidden>
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
