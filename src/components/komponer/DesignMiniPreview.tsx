import platePreview from "@/assets/plate-preview.jpg";
import frameOrnamental from "@/assets/frame-ornamental.png";
import frameSimple from "@/assets/frame-simple.png";
import frameSimpleOrnamental from "@/assets/frame-simple-ornamental.png";

interface PlacedSymbol {
  id: string;
  symbolId: string;
  categoryId: string;
  pos: { x: number; y: number };
  size: number;
}

interface DesignData {
  frame: string;
  font?: string;
  placedSymbols?: PlacedSymbol[];
  elements?: {
    name1?: { text: string; pos: { x: number; y: number }; size: number };
    dates1?: { text: string; pos: { x: number; y: number }; size: number };
    name2?: { text: string; pos: { x: number; y: number }; size: number };
    dates2?: { text: string; pos: { x: number; y: number }; size: number };
    etterskrift?: { text: string; pos: { x: number; y: number }; size: number };
  };
  symbolImages?: Record<string, string>; // Map of symbolId to image URL
}

interface DesignMiniPreviewProps {
  designData: DesignData;
}

const frames: Record<string, string | null> = {
  ornamental: frameOrnamental,
  simple: frameSimple,
  "simple-ornamental": frameSimpleOrnamental,
  none: null,
};

const fontClasses: Record<string, string> = {
  "great-vibes": "font-great-vibes",
  "alex-brush": "font-alex-brush",
  "allura": "font-allura",
  "edwardian": "font-edwardian",
  "monotype-corsiva": "font-monotype-corsiva",
  "blackadder": "font-blackadder",
  "old-english": "font-old-english",
};

export function DesignMiniPreview({ designData }: DesignMiniPreviewProps) {
  const frameImage = frames[designData.frame] || null;
  const elements = designData.elements;
  const fontClass = fontClasses[designData.font || "great-vibes"] || "font-great-vibes";

  // Base font sizes (in px) for the mini preview
  const baseSizes = {
    name: 14,
    dates: 10,
    etterskrift: 9,
    symbol: 28,
  };

  // Helper to render text element
  const renderTextElement = (
    element: { text: string; pos: { x: number; y: number }; size: number } | undefined,
    baseSize: number
  ) => {
    if (!element?.text) return null;
    const fontSize = Math.max(6, (element.size / 100) * baseSize);
    
    return (
      <div
        className={`absolute text-center whitespace-nowrap pointer-events-none ${fontClass}`}
        style={{
          left: `${element.pos.x}%`,
          top: `${element.pos.y}%`,
          transform: "translate(-50%, -50%)",
          fontSize: `${fontSize}px`,
          color: "#1a1a1a",
          textShadow: "0 0 1px rgba(255,255,255,0.5)",
        }}
      >
        {element.text}
      </div>
    );
  };

  // Render placed symbols
  const renderSymbols = () => {
    if (!designData.placedSymbols?.length || !designData.symbolImages) return null;

    return designData.placedSymbols.map((symbol) => {
      const imageUrl = designData.symbolImages?.[symbol.symbolId];
      if (!imageUrl) return null;

      const symbolSize = Math.max(16, (symbol.size / 100) * baseSizes.symbol);

      return (
        <img
          key={symbol.id}
          src={imageUrl}
          alt=""
          className="absolute pointer-events-none"
          style={{
            left: `${symbol.pos.x}%`,
            top: `${symbol.pos.y}%`,
            transform: "translate(-50%, -50%)",
            width: `${symbolSize}px`,
            height: `${symbolSize}px`,
            objectFit: "contain",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
          }}
        />
      );
    });
  };

  return (
    <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden border border-border">
      {/* Background plate */}
      <img
        src={platePreview}
        alt="Gravplate"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Frame overlay */}
      {frameImage && (
        <img
          src={frameImage}
          alt="Ramme"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      )}
      
      {/* Symbols */}
      {renderSymbols()}
      
      {/* Text elements */}
      {renderTextElement(elements?.name1, baseSizes.name)}
      {renderTextElement(elements?.dates1, baseSizes.dates)}
      {renderTextElement(elements?.name2, baseSizes.name)}
      {renderTextElement(elements?.dates2, baseSizes.dates)}
      {renderTextElement(elements?.etterskrift, baseSizes.etterskrift)}
    </div>
  );
}
