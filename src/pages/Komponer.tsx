import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Type, MoveVertical, Loader2 } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import platePreview from "@/assets/plate-preview.png";

const symbols = [
  { id: "tree", name: "Livets tre", symbol: "🌳" },
  { id: "cross", name: "Kors", symbol: "✝" },
  { id: "heart", name: "Hjerte", symbol: "❤" },
  { id: "dove", name: "Due", symbol: "🕊" },
  { id: "sun", name: "Sol", symbol: "☀" },
  { id: "anchor", name: "Anker", symbol: "⚓" },
  { id: "flower", name: "Blomst", symbol: "🌸" },
];

export default function Komponer() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("Mellom");
  const [selectedNameCount, setSelectedNameCount] = useState("1");
  const [name1, setName1] = useState("Karen Marie Hansen");
  const [dates1, setDates1] = useState("12.07.1940");
  const [name2, setName2] = useState("Søren Peter Hansen");
  const [dates2, setDates2] = useState("14.09.1942");
  const [etterskrift, setEtterskrift] = useState("I kjærlig minne");
  const [selectedSymbol, setSelectedSymbol] = useState("tree");
  
  // Text sizes (as percentage of base)
  const [symbolSize, setSymbolSize] = useState(100);
  const [name1Size, setName1Size] = useState(100);
  const [dates1Size, setDates1Size] = useState(100);
  const [name2Size, setName2Size] = useState(100);
  const [dates2Size, setDates2Size] = useState(100);
  const [etterskriftSize, setEtterskriftSize] = useState(100);
  
  // Positions (as percentage from top)
  const [symbolPos, setSymbolPos] = useState(15);
  const [name1Pos, setName1Pos] = useState(35);
  const [dates1Pos, setDates1Pos] = useState(42);
  const [name2Pos, setName2Pos] = useState(52);
  const [dates2Pos, setDates2Pos] = useState(59);
  const [etterskriftPos, setEtterskriftPos] = useState(75);
  
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

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast.error("Kunne ikke legge til i handlekurv");
      return;
    }

    const lineItemProperties: Record<string, string> = {
      "Navn 1": name1 || "Ikke angitt",
      "Datoer 1": dates1 || "Ikke angitt",
      "Symbol": symbols.find(s => s.id === selectedSymbol)?.name || "Livets tre",
    };

    if (etterskrift) {
      lineItemProperties["Etterskrift"] = etterskrift;
    }

    if (selectedNameCount === "2") {
      lineItemProperties["Navn 2"] = name2 || "Ikke angitt";
      lineItemProperties["Datoer 2"] = dates2 || "Ikke angitt";
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

  const currentSymbol = symbols.find(s => s.id === selectedSymbol)?.symbol || "🌳";

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
              Juster tekststørrelse og plassering - dette er kun veiledende
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-4">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">Forhåndsvisning</h2>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border aspect-[4/3] max-w-lg mx-auto">
                  <img
                    src={platePreview}
                    alt="Gravplate mal"
                    className="w-full h-full object-contain bg-card"
                  />
                  
                  {/* Symbol */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 transition-transform"
                    style={{ 
                      top: `${symbolPos}%`,
                      fontSize: `${symbolSize * 0.4}px`
                    }}
                  >
                    <span className="text-foreground/80 select-none">{currentSymbol}</span>
                  </div>

                  {/* Name 1 */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 w-full px-4 text-center"
                    style={{ top: `${name1Pos}%` }}
                  >
                    <p 
                      className="font-gravminne font-bold text-foreground select-none"
                      style={{ fontSize: `${name1Size * 0.24}px` }}
                    >
                      {name1 || "Navn"}
                    </p>
                  </div>

                  {/* Dates 1 */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 w-full px-4 text-center"
                    style={{ top: `${dates1Pos}%` }}
                  >
                    <p 
                      className="font-cinzel text-foreground/80 select-none"
                      style={{ fontSize: `${dates1Size * 0.14}px` }}
                    >
                      ★ {dates1 || "Dato"} ✝
                    </p>
                  </div>

                  {/* Name 2 */}
                  {selectedNameCount === "2" && (
                    <>
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-full px-4 text-center"
                        style={{ top: `${name2Pos}%` }}
                      >
                        <p 
                          className="font-gravminne font-bold text-foreground select-none"
                          style={{ fontSize: `${name2Size * 0.24}px` }}
                        >
                          {name2 || "Navn"}
                        </p>
                      </div>
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-full px-4 text-center"
                        style={{ top: `${dates2Pos}%` }}
                      >
                        <p 
                          className="font-cinzel text-foreground/80 select-none"
                          style={{ fontSize: `${dates2Size * 0.14}px` }}
                        >
                          ★ {dates2 || "Dato"} ✝
                        </p>
                      </div>
                    </>
                  )}

                  {/* Etterskrift */}
                  {etterskrift && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 w-full px-8 text-center"
                      style={{ top: `${etterskriftPos}%` }}
                    >
                      <p 
                        className="font-script text-foreground/80 select-none"
                        style={{ fontSize: `${etterskriftSize * 0.18}px` }}
                      >
                        {etterskrift}
                      </p>
                    </div>
                  )}
                </div>
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

              {/* Symbol Selection */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Velg symbol
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {symbols.map((symbol) => (
                    <button
                      key={symbol.id}
                      onClick={() => setSelectedSymbol(symbol.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSymbol === symbol.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      title={symbol.name}
                    >
                      <div className="text-3xl">{symbol.symbol}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <div>
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
                  <div>
                    <label className="text-xs text-muted-foreground flex items-center gap-2">
                      <MoveVertical className="w-4 h-4" />
                      Plassering: {symbolPos}%
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={symbolPos}
                      onChange={(e) => setSymbolPos(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
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
                    <div className="mt-3 space-y-2">
                      <label className="text-xs text-muted-foreground">Størrelse: {name1Size}%</label>
                      <input
                        type="range"
                        min="60"
                        max="140"
                        value={name1Size}
                        onChange={(e) => setName1Size(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <label className="text-xs text-muted-foreground">Plassering: {name1Pos}%</label>
                      <input
                        type="range"
                        min="25"
                        max="45"
                        value={name1Pos}
                        onChange={(e) => setName1Pos(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1">Fødselsdato</Label>
                    <Input
                      type="text"
                      value={dates1}
                      onChange={(e) => setDates1(e.target.value)}
                      placeholder="dd.mm.åååå"
                    />
                    <div className="mt-3 space-y-2">
                      <label className="text-xs text-muted-foreground">Størrelse: {dates1Size}%</label>
                      <input
                        type="range"
                        min="50"
                        max="120"
                        value={dates1Size}
                        onChange={(e) => setDates1Size(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <label className="text-xs text-muted-foreground">Plassering: {dates1Pos}%</label>
                      <input
                        type="range"
                        min="35"
                        max="50"
                        value={dates1Pos}
                        onChange={(e) => setDates1Pos(Number(e.target.value))}
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
                      <div className="mt-3 space-y-2">
                        <label className="text-xs text-muted-foreground">Størrelse: {name2Size}%</label>
                        <input
                          type="range"
                          min="60"
                          max="140"
                          value={name2Size}
                          onChange={(e) => setName2Size(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                        <label className="text-xs text-muted-foreground">Plassering: {name2Pos}%</label>
                        <input
                          type="range"
                          min="48"
                          max="65"
                          value={name2Pos}
                          onChange={(e) => setName2Pos(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1">Fødselsdato</Label>
                      <Input
                        type="text"
                        value={dates2}
                        onChange={(e) => setDates2(e.target.value)}
                        placeholder="dd.mm.åååå"
                      />
                      <div className="mt-3 space-y-2">
                        <label className="text-xs text-muted-foreground">Størrelse: {dates2Size}%</label>
                        <input
                          type="range"
                          min="50"
                          max="120"
                          value={dates2Size}
                          onChange={(e) => setDates2Size(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                        <label className="text-xs text-muted-foreground">Plassering: {dates2Pos}%</label>
                        <input
                          type="range"
                          min="55"
                          max="70"
                          value={dates2Pos}
                          onChange={(e) => setDates2Pos(Number(e.target.value))}
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
                <div className="mt-3 space-y-2">
                  <label className="text-xs text-muted-foreground">Størrelse: {etterskriftSize}%</label>
                  <input
                    type="range"
                    min="50"
                    max="120"
                    value={etterskriftSize}
                    onChange={(e) => setEtterskriftSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <label className="text-xs text-muted-foreground">Plassering: {etterskriftPos}%</label>
                  <input
                    type="range"
                    min="70"
                    max="90"
                    value={etterskriftPos}
                    onChange={(e) => setEtterskriftPos(Number(e.target.value))}
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
