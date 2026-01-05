import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Plus, Minus, X } from "lucide-react";

export type EditableElement = 
  | "name1" 
  | "dates1" 
  | "name2" 
  | "dates2" 
  | "etterskrift" 
  | `symbol-${string}`;

interface ElementEditorProps {
  selectedElement: EditableElement | null;
  onClose: () => void;
  onMove: (direction: "up" | "down" | "left" | "right") => void;
  onResize: (delta: number) => void;
  elementLabel: string;
  currentSize?: number;
}

export function ElementEditor({ 
  selectedElement, 
  onClose, 
  onMove, 
  onResize,
  elementLabel,
  currentSize 
}: ElementEditorProps) {
  if (!selectedElement) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom duration-200">
      <div className="container max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-medium text-foreground">{elementLabel}</span>
            {currentSize !== undefined && (
              <span className="text-xs text-muted-foreground ml-2">({currentSize}%)</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Position controls */}
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-2 text-center">Posisjon</p>
            <div className="grid grid-cols-3 gap-1 max-w-[120px] mx-auto">
              <div /> {/* Empty cell */}
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => onMove("up")}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
              <div /> {/* Empty cell */}
              
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => onMove("left")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="h-10 w-10 rounded border border-dashed border-border flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => onMove("right")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              <div /> {/* Empty cell */}
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => onMove("down")}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
              <div /> {/* Empty cell */}
            </div>
          </div>
          
          {/* Size controls */}
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-2 text-center">Størrelse</p>
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-20"
                onClick={() => onResize(10)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Større
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-20"
                onClick={() => onResize(-10)}
              >
                <Minus className="h-4 w-4 mr-1" />
                Mindre
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          Trykk på et annet element for å redigere det
        </p>
      </div>
    </div>
  );
}
