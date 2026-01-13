import platePreview from "@/assets/plate-preview.jpg";
import frameOrnamental from "@/assets/frame-ornamental.png";
import frameSimple from "@/assets/frame-simple.png";
import frameSimpleOrnamental from "@/assets/frame-simple-ornamental.png";

interface DesignData {
  frame: string;
  placedSymbols?: Array<{
    id: string;
    symbolId: string;
    categoryId: string;
    pos: { x: number; y: number };
    size: number;
  }>;
  elements?: {
    name1?: { text: string; pos: { x: number; y: number }; size: number };
    dates1?: { text: string; pos: { x: number; y: number }; size: number };
    name2?: { text: string; pos: { x: number; y: number }; size: number };
    dates2?: { text: string; pos: { x: number; y: number }; size: number };
    etterskrift?: { text: string; pos: { x: number; y: number }; size: number };
  };
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

export function DesignMiniPreview({ designData }: DesignMiniPreviewProps) {
  const frameImage = frames[designData.frame] || null;
  const elements = designData.elements;

  // Helper to render text element
  const renderTextElement = (
    element: { text: string; pos: { x: number; y: number }; size: number } | undefined,
    defaultSize: number = 14
  ) => {
    if (!element?.text) return null;
    const fontSize = Math.max(8, (element.size / 100) * defaultSize);
    
    return (
      <div
        className="absolute text-center whitespace-nowrap font-display pointer-events-none"
        style={{
          left: `${element.pos.x}%`,
          top: `${element.pos.y}%`,
          transform: "translate(-50%, -50%)",
          fontSize: `${fontSize}px`,
          color: "#1a1a1a",
        }}
      >
        {element.text}
      </div>
    );
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
      
      {/* Text elements */}
      {renderTextElement(elements?.name1, 16)}
      {renderTextElement(elements?.dates1, 12)}
      {renderTextElement(elements?.name2, 16)}
      {renderTextElement(elements?.dates2, 12)}
      {renderTextElement(elements?.etterskrift, 10)}
      
      {/* Symbol count indicator */}
      {(designData.placedSymbols?.length ?? 0) > 0 && (
        <div className="absolute bottom-1 right-1 bg-primary/80 text-primary-foreground text-xs px-1.5 py-0.5 rounded">
          {designData.placedSymbols?.length} symbol{(designData.placedSymbols?.length ?? 0) > 1 ? 'er' : ''}
        </div>
      )}
    </div>
  );
}
