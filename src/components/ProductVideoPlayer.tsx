import { useCallback, useRef, useState } from "react";
import Player from "@vimeo/player";
import { RotateCcw } from "lucide-react";

interface ProductVideoPlayerProps {
  src: string;
  title: string;
}

/**
 * Vertical product video with a custom "play again from start" overlay
 * shown when the video ends. Uses Vimeo Player API to detect end + restart,
 * which avoids relying on Vimeo's own end-screen UI (which shows
 * "more videos from author" recommendations).
 */
export function ProductVideoPlayer({ src, title }: ProductVideoPlayerProps) {
  const playerRef = useRef<Player | null>(null);
  const [ended, setEnded] = useState(false);

  const setIframeRef = useCallback((node: HTMLIFrameElement | null) => {
    if (!node) {
      playerRef.current = null;
      return;
    }
    const player = new Player(node);
    playerRef.current = player;
    player.on("ended", () => setEnded(true));
    player.on("play", () => setEnded(false));
  }, []);

  const handleReplay = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      await player.setCurrentTime(0);
      await player.play();
      setEnded(false);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl ring-2 ring-primary/30 bg-muted animate-scale-in">
      <iframe
        ref={setIframeRef}
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />

      {ended && (
        <button
          type="button"
          onClick={handleReplay}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/70 backdrop-blur-sm text-primary-foreground transition-opacity animate-fade-in"
          aria-label="Spill av videoen på nytt"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-background/20 border border-primary-foreground/40 flex items-center justify-center">
            <RotateCcw className="w-7 h-7 md:w-8 md:h-8" />
          </div>
          <span className="font-display text-base md:text-lg font-medium">
            Spill av på nytt
          </span>
        </button>
      )}
    </div>
  );
}
