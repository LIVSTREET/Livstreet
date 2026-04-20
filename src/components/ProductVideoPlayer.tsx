import { useCallback, useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { RotateCcw, Volume2 } from "lucide-react";

interface ProductVideoPlayerProps {
  src: string;
  title: string;
  /**
   * Auto-play with sound when scrolled into view, pause when out of view.
   * Browsers block unmuted autoplay without user gesture, so we show a
   * subtle "tap for sound" overlay as fallback when that happens.
   */
  autoPlayInView?: boolean;
  /**
   * Show Vimeo's native player controls (play/pause, scrubber, duration).
   * Off by default for short product clips; turn on for longer story videos
   * where users may want to seek/pause.
   */
  showControls?: boolean;
}

export function ProductVideoPlayer({
  src,
  title,
  autoPlayInView = true,
  showControls = false,
}: ProductVideoPlayerProps) {
  // Force controls visibility via URL flag so it overrides whatever the caller passed.
  const finalSrc = (() => {
    try {
      const url = new URL(src);
      url.searchParams.set("controls", showControls ? "1" : "0");
      return url.toString();
    } catch {
      const sep = src.includes("?") ? "&" : "?";
      return `${src}${sep}controls=${showControls ? "1" : "0"}`;
    }
  })();
  const playerRef = useRef<Player | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ended, setEnded] = useState(false);
  const [needsTapForSound, setNeedsTapForSound] = useState(false);
  const inViewRef = useRef(false);

  const setIframeRef = useCallback((node: HTMLIFrameElement | null) => {
    if (!node) {
      playerRef.current = null;
      return;
    }
    const player = new Player(node);
    playerRef.current = player;
    player.on("ended", () => setEnded(true));
    player.on("play", () => setEnded(false));
    player.on("volumechange", async () => {
      try {
        const muted = await player.getMuted();
        if (!muted) setNeedsTapForSound(false);
      } catch {
        /* noop */
      }
    });
  }, []);

  // Auto play/pause based on viewport visibility
  useEffect(() => {
    if (!autoPlayInView) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const player = playerRef.current;
        if (!player) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          inViewRef.current = true;
          try {
            await player.setMuted(false);
            await player.setVolume(1);
            await player.play();
            setNeedsTapForSound(false);
          } catch {
            // Autoplay with sound was blocked – fall back to muted autoplay
            try {
              await player.setMuted(true);
              await player.play();
              setNeedsTapForSound(true);
            } catch {
              /* noop */
            }
          }
        } else {
          inViewRef.current = false;
          try {
            await player.pause();
          } catch {
            /* noop */
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoPlayInView]);

  const handleReplay = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      await player.setCurrentTime(0);
      await player.setMuted(false);
      await player.setVolume(1);
      await player.play();
      setEnded(false);
      setNeedsTapForSound(false);
    } catch {
      /* noop */
    }
  };

  const handleEnableSound = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      await player.setMuted(false);
      await player.setVolume(1);
      await player.play();
      setNeedsTapForSound(false);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl ring-2 ring-primary/30 bg-muted animate-scale-in"
    >
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

      {needsTapForSound && !ended && (
        <button
          type="button"
          onClick={handleEnableSound}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur px-3 py-2 md:px-4 md:py-2.5 text-foreground shadow-lg hover:bg-background transition-all animate-fade-in"
          aria-label="Slå på lyd"
        >
          <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium">Trykk for lyd</span>
        </button>
      )}

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
