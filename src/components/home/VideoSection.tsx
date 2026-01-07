import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Volume2 } from "lucide-react";

const VIMEO_ID = "1151281409";

// Muted autoplay preview that loops and covers the card
const PREVIEW_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1&playsinline=1&controls=0&title=0&byline=0&portrait=0`;

// Dialog player starts muted + autoplay; we unmute on click via Vimeo Player API
const SOUND_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&playsinline=1&controls=1`;

export function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const soundIframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!soundIframeRef.current) return;

    const player = new Player(soundIframeRef.current);
    playerRef.current = player;

    void player.setLoop(true);
    void player.setMuted(true);

    return () => {
      playerRef.current = null;
      void player.destroy();
    };
  }, []);

  const openWithSound = () => {
    // Open fullscreen
    setIsOpen(true);

    // Unmute + play inside the same click gesture
    const p = playerRef.current;
    if (!p) return;

    void p.setMuted(false);
    void p.setVolume(1);
    void p.play();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      const p = playerRef.current;
      if (!p) return;
      void p.pause();
      void p.setMuted(true);
    }
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
        <div className="relative aspect-video max-w-5xl mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl ring-2 ring-primary/50 focus-within:ring-primary">
          <iframe
            src={PREVIEW_SRC}
            className="w-full h-full pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title="Produksjonsvideo (forhåndsvisning)"
          />

          <button
            type="button"
            onClick={openWithSound}
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
      </div>

      {/* Fullscreen */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          forceMount
          className="max-w-[95vw] md:max-w-[90vw] w-full h-auto aspect-video p-0 gap-0 border-2 border-primary/50 overflow-hidden rounded-xl bg-background"
        >
          <iframe
            ref={soundIframeRef}
            src={SOUND_SRC}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title="Produksjonsvideo (med lyd)"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
