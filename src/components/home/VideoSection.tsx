import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

export function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const vimeoId = "1151281409";

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

        <div 
          className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          {/* Unmuted preview video */}
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&background=0&muted=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Produksjonsvideo"
          />
          
          {/* Overlay with play button for fullscreen */}
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="text-center text-primary-foreground">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Klikk for fullskjerm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen dialog with sound */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-auto p-0 bg-black border-none">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="aspect-video w-full">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=0`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Produksjonsvideo fullskjerm"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
