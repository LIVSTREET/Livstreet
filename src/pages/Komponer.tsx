import { useState, useEffect, useMemo, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Type, Loader2, TreeDeciduous, Cross, Heart, Bird, Sun, Anchor, Flower, LucideIcon, Square } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import platePreview from "@/assets/plate-preview.jpg";
import frameOrnamental from "@/assets/frame-ornamental.png";
import frameSimple from "@/assets/frame-simple.png";
import frameRoses from "@/assets/frame-roses.png";

const symbols: { id: string; name: string; icon: LucideIcon | null; image?: string }[] = [
  { id: "none", name: "Ingen symbol", icon: null },
  { id: "tree", name: "Livets tre", icon: TreeDeciduous },
  { id: "cross", name: "Kors", icon: Cross },
  { id: "heart", name: "Hjerte", icon: Heart },
  { id: "dove", name: "Due", icon: Bird },
  { id: "sun", name: "Sol", icon: Sun },
  { id: "anchor", name: "Anker", icon: Anchor },
  { id: "flower", name: "Blomst", icon: Flower },
  { id: "roses", name: "Roseramme", icon: null, image: frameRoses },
];

const frames = [
  { id: "ornamental", label: "Ornamental", image: frameOrnamental },
  { id: "simple", label: "Enkel buet", image: frameSimple },
  { id: "none", label: "Ingen ramme", image: null },
] as const;

type FrameType = typeof frames[number]["id"];

const fonts = [
  { id: "great-vibes", label: "Great Vibes", className: "font-great-vibes" },
  { id: "alex-brush", label: "Alex Brush", className: "font-alex-brush" },
  { id: "allura", label: "Allura", className: "font-allura" },
  { id: "edwardian", label: "Edwardian Script", className: "font-edwardian" },
] as const;

type FontType = typeof fonts[number]["id"];

export default function Komponer() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("Mellom");
  const [selectedNameCount, setSelectedNameCount] = useState("1");
  const [name1, setName1] = useState("Karen Marie Hansen");
  const [birthDate1, setBirthDate1] = useState("12.07 1932");
  const [deathDate1, setDeathDate1] = useState("04.10 2024");
  const [name2, setName2] = useState("Søren Peter Hansen");
  const [birthDate2, setBirthDate2] = useState("14.09 1942");
  const [deathDate2, setDeathDate2] = useState("01.01 2024");
  const [etterskrift, setEtterskrift] = useState("Altid elsket, altid savnet");
  const [selectedSymbol, setSelectedSymbol] = useState("tree");
  const [selectedFrame, setSelectedFrame] = useState<FrameType>("ornamental");
  const [selectedFont, setSelectedFont] = useState<FontType>("great-vibes");
  
  // Text sizes (as percentage of base)
  const [symbolSize, setSymbolSize] = useState(100);
  const [name1Size, setName1Size] = useState(100);
  const [dates1Size, setDates1Size] = useState(100);
  const [name2Size, setName2Size] = useState(100);
  const [dates2Size, setDates2Size] = useState(100);
  const [etterskriftSize, setEtterskriftSize] = useState(100);
  
  // Positions (as {x, y} percentage)
  const [symbolPos, setSymbolPos] = useState({ x: 50, y: 15 });
  const [name1Pos, setName1Pos] = useState({ x: 50, y: 35 });
  const [dates1Pos, setDates1Pos] = useState({ x: 50, y: 42 });
  const [name2Pos, setName2Pos] = useState({ x: 50, y: 52 });
  const [dates2Pos, setDates2Pos] = useState({ x: 50, y: 59 });
  const [etterskriftPos, setEtterskriftPos] = useState({ x: 50, y: 75 });
  
  // Drag state
  const [dragging, setDragging] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(10);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const product = products[0];

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    
    return product.node.variants.edges.find(v => {
      const sizeOption = v.node.selectedOptions.find(o => o.name === "Størrelse");
      const nameCountOption = v.node.selectedOptions.find(o => o.name === "Antall navn");
      return sizeOption?.value === selectedSize && nameCountOption?.value === selectedNameCount;
    })?.node;
  }, [product, selectedSize, selectedNameCount]);

  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 3990;
  const currencyCode = selectedVariant?.price.currencyCode || "NOK";

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Drag handlers
  const handleMouseDown = (element: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDragging(element);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !previewRef.current) return;
    
    const rect = previewRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    // Clamp to bounds (5% - 95%)
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));
    
    switch (dragging) {
      case "symbol":
        setSymbolPos({ x: clampedX, y: clampedY });
        break;
      case "name1":
        setName1Pos({ x: clampedX, y: clampedY });
        break;
      case "dates1":
        setDates1Pos({ x: clampedX, y: clampedY });
        break;
      case "name2":
        setName2Pos({ x: clampedX, y: clampedY });
        break;
      case "dates2":
        setDates2Pos({ x: clampedX, y: clampedY });
        break;
      case "etterskrift":
        setEtterskriftPos({ x: clampedX, y: clampedY });
        break;
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast.error("Kunne ikke legge til i handlekurv");
      return;
    }

    const designData = {
      frame: selectedFrame,
      symbol: selectedSymbol,
      elements: {
        symbol: { pos: symbolPos, size: symbolSize },
        name1: { text: name1, pos: name1Pos, size: name1Size },
        dates1: { text: `★${birthDate1} †${deathDate1}`, pos: dates1Pos, size: dates1Size },
        name2: { text: name2, pos: name2Pos, size: name2Size },
        dates2: { text: `★${birthDate2} †${deathDate2}`, pos: dates2Pos, size: dates2Size },
        etterskrift: { text: etterskrift, pos: etterskriftPos, size: etterskriftSize },
      }
    };

    const lineItemProperties: Record<string, string> = {
      "Navn 1": name1 || "Ikke angitt",
      "Fødselsdato 1": birthDate1 || "Ikke angitt",
      "Dødsdato 1": deathDate1 || "Ikke angitt",
      "Symbol": symbols.find(s => s.id === selectedSymbol)?.name || "Ingen",
      "Ramme": frames.find(f => f.id === selectedFrame)?.label || "Ornamental",
      "Design Data": JSON.stringify(designData),
    };

    if (etterskrift) {
      lineItemProperties["Etterskrift"] = etterskrift;
    }

    if (selectedNameCount === "2") {
      lineItemProperties["Navn 2"] = name2 || "Ikke angitt";
      lineItemProperties["Fødselsdato 2"] = birthDate2 || "Ikke angitt";
      lineItemProperties["Dødsdato 2"] = deathDate2 || "Ikke angitt";
    }

    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
      lineItemProperties,
    });

    toast.success("Lagt i handlekurv!", {
      description: `${product.node.title} - ${selectedVariant.title}`,
    });
  };

  const selectedSymbolData = symbols.find(s => s.id === selectedSymbol);
  const SymbolIcon = selectedSymbolData?.icon || null;
  const selectedFrameImage = frames.find(f => f.id === selectedFrame)?.image;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Ingen produkter funnet</h2>
            <p className="text-muted-foreground">Produkter lastes inn...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const sizeOptions = product.node.options.find(o => o.name === "Størrelse")?.values || ["Mellom", "Stor"];
  const nameCountOptions = product.node.options.find(o => o.name === "Antall navn")?.values || ["1", "2"];

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Komponer din gravplate
            </h1>
            <p className="text-muted-foreground">
              Dra elementene for å plassere dem - dette er kun veiledende
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-4">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">Forhåndsvisning</h2>
                <div 
                  ref={previewRef}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-border aspect-[4/3] max-w-lg mx-auto cursor-move select-none"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchMove={handleMouseMove}
                  onTouchEnd={handleMouseUp}
                >
                  <img
                    src={platePreview}
                    alt="Gravplate mal"
                    className="w-full h-full object-contain bg-card pointer-events-none"
                    draggable={false}
                  />
                  
                  {/* Frame overlay */}
                  {selectedFrame !== "none" && selectedFrameImage && (
                    <img
                      src={selectedFrameImage}
                      alt="Ramme"
                      className="absolute pointer-events-none z-10"
                      style={{ 
                        top: '54%',
                        left: '50%',
                        width: '135%',
                        height: '110%',
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'fill',
                      }}
                      draggable={false}
                    />
                  )}
                  
                  {/* Symbol */}
                  {selectedSymbol !== "none" && (
                    <div 
                      className={`absolute transition-transform text-foreground/80 cursor-grab active:cursor-grabbing hover:scale-110 ${dragging === 'symbol' ? 'scale-110 z-20' : 'z-15'}`}
                      style={{ 
                        left: `${symbolPos.x}%`, 
                        top: `${symbolPos.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseDown={(e) => handleMouseDown("symbol", e)}
                      onTouchStart={(e) => handleMouseDown("symbol", e)}
                    >
                      {selectedSymbolData?.image ? (
                        <img 
                          src={selectedSymbolData.image} 
                          alt={selectedSymbolData.name}
                          style={{ 
                            width: `${symbolSize * 0.6}px`, 
                            height: `${symbolSize * 0.45}px`,
                            objectFit: 'contain',
                            filter: 'brightness(0)',
                          }} 
                          draggable={false}
                        />
                      ) : SymbolIcon ? (
                        <SymbolIcon 
                          style={{ width: `${symbolSize * 0.4}px`, height: `${symbolSize * 0.4}px` }} 
                          strokeWidth={1} 
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Name 1 */}
                  <div 
                    className={`absolute px-4 text-center cursor-grab active:cursor-grabbing hover:scale-105 ${dragging === 'name1' ? 'scale-105 z-10' : ''}`}
                    style={{ 
                      left: `${name1Pos.x}%`, 
                      top: `${name1Pos.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseDown={(e) => handleMouseDown("name1", e)}
                    onTouchStart={(e) => handleMouseDown("name1", e)}
                  >
                    <p 
                      className={`${fonts.find(f => f.id === selectedFont)?.className} font-bold text-foreground whitespace-nowrap`}
                      style={{ 
                        fontSize: `${name1Size * 0.24}px`,
                        textRendering: 'geometricPrecision',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    >
                      {name1 || "Navn"}
                    </p>
                  </div>

                  {/* Dates 1 */}
                  <div 
                    className={`absolute px-4 text-center cursor-grab active:cursor-grabbing hover:scale-105 ${dragging === 'dates1' ? 'scale-105 z-10' : ''}`}
                    style={{ 
                      left: `${dates1Pos.x}%`, 
                      top: `${dates1Pos.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseDown={(e) => handleMouseDown("dates1", e)}
                    onTouchStart={(e) => handleMouseDown("dates1", e)}
                  >
                    <p 
                      className="font-cinzel text-foreground whitespace-nowrap"
                      style={{ 
                        fontSize: `${dates1Size * 0.16}px`,
                        textRendering: 'geometricPrecision',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    >
                      ★{birthDate1 || "00.00 0000"} †{deathDate1 || "00.00 0000"}
                    </p>
                  </div>

                  {/* Name 2 */}
                  {selectedNameCount === "2" && (
                    <>
                      <div 
                        className={`absolute px-4 text-center cursor-grab active:cursor-grabbing hover:scale-105 ${dragging === 'name2' ? 'scale-105 z-10' : ''}`}
                        style={{ 
                          left: `${name2Pos.x}%`, 
                          top: `${name2Pos.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onMouseDown={(e) => handleMouseDown("name2", e)}
                        onTouchStart={(e) => handleMouseDown("name2", e)}
                      >
                        <p 
                          className={`${fonts.find(f => f.id === selectedFont)?.className} font-bold text-foreground whitespace-nowrap`}
                          style={{ 
                            fontSize: `${name2Size * 0.24}px`,
                            textRendering: 'geometricPrecision',
                            WebkitFontSmoothing: 'antialiased',
                          }}
                        >
                          {name2 || "Navn"}
                        </p>
                      </div>
                      <div 
                        className={`absolute px-4 text-center cursor-grab active:cursor-grabbing hover:scale-105 ${dragging === 'dates2' ? 'scale-105 z-10' : ''}`}
                        style={{ 
                          left: `${dates2Pos.x}%`, 
                          top: `${dates2Pos.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onMouseDown={(e) => handleMouseDown("dates2", e)}
                        onTouchStart={(e) => handleMouseDown("dates2", e)}
                      >
                        <p 
                          className="font-cinzel text-foreground whitespace-nowrap"
                          style={{ 
                            fontSize: `${dates2Size * 0.16}px`,
                            textRendering: 'geometricPrecision',
                            WebkitFontSmoothing: 'antialiased',
                          }}
                        >
                          ★{birthDate2 || "00.00 0000"} †{deathDate2 || "00.00 0000"}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Etterskrift */}
                  {etterskrift && (
                    <div 
                      className={`absolute px-8 text-center cursor-grab active:cursor-grabbing hover:scale-105 ${dragging === 'etterskrift' ? 'scale-105 z-10' : ''}`}
                      style={{ 
                        left: `${etterskriftPos.x}%`, 
                        top: `${etterskriftPos.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseDown={(e) => handleMouseDown("etterskrift", e)}
                      onTouchStart={(e) => handleMouseDown("etterskrift", e)}
                    >
                      <p 
                        className={`${fonts.find(f => f.id === selectedFont)?.className} italic text-foreground/80 whitespace-nowrap`}
                        style={{ fontSize: `${etterskriftSize * 0.18}px` }}
                      >
                        {etterskrift}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground text-center mt-3">
                  💡 Tips: Klikk og dra elementene for å flytte dem
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Size Selection */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Størrelse
                </Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-2 gap-3">
                  {sizeOptions.map((size) => {
                    const variant = product.node.variants.edges.find(v => 
                      v.node.selectedOptions.some(o => o.name === "Størrelse" && o.value === size) &&
                      v.node.selectedOptions.some(o => o.name === "Antall navn" && o.value === "1")
                    )?.node;
                    const variantPrice = variant ? parseFloat(variant.price.amount) : 0;
                    
                    return (
                      <label
                        key={size}
                        className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={size} className="sr-only" />
                        <span className="font-semibold text-foreground">{size}</span>
                        <span className="text-sm text-muted-foreground">
                          fra {formatPrice(variantPrice)}
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Name Count */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Antall navn
                </Label>
                <Select value={selectedNameCount} onValueChange={setSelectedNameCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {nameCountOptions.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count} {parseInt(count) === 1 ? "person" : "personer"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Frame Selection */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Velg ramme
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {frames.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                        selectedFrame === frame.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {frame.image ? (
                        <img src={frame.image} alt={frame.label} className="w-16 h-12 object-contain" />
                      ) : (
                        <div className="w-16 h-12 flex items-center justify-center bg-muted rounded">
                          <Square className="w-6 h-6 text-muted-foreground" strokeWidth={1} />
                        </div>
                      )}
                      <span className="text-sm font-medium text-foreground">{frame.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Velg skrifttype
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedFont === font.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className={`${font.className} text-lg text-foreground`}>{font.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Velg symbol
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {symbols.map((symbol) => {
                    const Icon = symbol.icon;
                    return (
                      <button
                        key={symbol.id}
                        onClick={() => setSelectedSymbol(symbol.id)}
                        className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                          selectedSymbol === symbol.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        title={symbol.name}
                      >
                        {symbol.image ? (
                          <img src={symbol.image} alt={symbol.name} className="h-8 w-8 object-contain" style={{ filter: 'brightness(0)' }} />
                        ) : Icon ? (
                          <Icon className="h-8 w-8" strokeWidth={1.5} />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Størrelse: {symbolSize}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={symbolSize}
                    onChange={(e) => setSymbolSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              {/* Person 1 */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <h3 className="font-semibold text-foreground mb-4">Person 1</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1">Navn</Label>
                    <Input
                      type="text"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="Fornavn Etternavn"
                    />
                    <div className="mt-3">
                      <label className="text-xs text-muted-foreground">Størrelse: {name1Size}%</label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={name1Size}
                        onChange={(e) => setName1Size(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1">Fødselsdato</Label>
                    <Input
                      type="text"
                      value={birthDate1}
                      onChange={(e) => setBirthDate1(e.target.value)}
                      placeholder="dd.mm åååå"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1">Dødsdato</Label>
                    <Input
                      type="text"
                      value={deathDate1}
                      onChange={(e) => setDeathDate1(e.target.value)}
                      placeholder="dd.mm åååå"
                    />
                    <div className="mt-3">
                      <label className="text-xs text-muted-foreground">Dato-størrelse: {dates1Size}%</label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={dates1Size}
                        onChange={(e) => setDates1Size(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Person 2 */}
              {selectedNameCount === "2" && (
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Person 2</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1">Navn</Label>
                      <Input
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="Fornavn Etternavn"
                      />
                      <div className="mt-3">
                        <label className="text-xs text-muted-foreground">Størrelse: {name2Size}%</label>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={name2Size}
                          onChange={(e) => setName2Size(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1">Fødselsdato</Label>
                      <Input
                        type="text"
                        value={birthDate2}
                        onChange={(e) => setBirthDate2(e.target.value)}
                        placeholder="dd.mm åååå"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1">Dødsdato</Label>
                      <Input
                        type="text"
                        value={deathDate2}
                        onChange={(e) => setDeathDate2(e.target.value)}
                        placeholder="dd.mm åååå"
                      />
                      <div className="mt-3">
                        <label className="text-xs text-muted-foreground">Dato-størrelse: {dates2Size}%</label>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={dates2Size}
                          onChange={(e) => setDates2Size(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Etterskrift */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-2">
                  Etterskrift (valgfritt)
                </Label>
                <Textarea
                  value={etterskrift}
                  onChange={(e) => setEtterskrift(e.target.value)}
                  rows={2}
                  placeholder="I kjærlig minne..."
                />
                <div className="mt-3">
                  <label className="text-xs text-muted-foreground">Størrelse: {etterskriftSize}%</label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={etterskriftSize}
                    onChange={(e) => setEtterskriftSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              {/* Price & Submit */}
              <div className="bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Totalpris:</span>
                  <span className="text-3xl font-bold">{formatPrice(price)}</span>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  variant="secondary"
                  className="w-full py-6 text-lg font-semibold"
                  disabled={!selectedVariant}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Legg i handlekurv
                </Button>
                <p className="text-xs text-primary-foreground/70 mt-3 text-center">
                  Endelig design tilpasses av oss før produksjon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
