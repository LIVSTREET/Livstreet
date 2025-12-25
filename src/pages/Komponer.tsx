import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, TreeDeciduous, Cross, Heart, Bird, Sun, Anchor, Flower, Loader2 } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import templateMellom1 from "@/assets/template-mellom-1.jpg";
import templateStor1 from "@/assets/template-stor-1.jpg";

const symbols = [
  { id: "tree", name: "Livets tre", icon: TreeDeciduous },
  { id: "cross", name: "Kors", icon: Cross },
  { id: "heart", name: "Hjerte", icon: Heart },
  { id: "dove", name: "Due", icon: Bird },
  { id: "sun", name: "Sol", icon: Sun },
  { id: "anchor", name: "Anker", icon: Anchor },
  { id: "flower", name: "Blomst", icon: Flower },
];

const getTemplateImage = (size: string) => {
  return size === "Stor" ? templateStor1 : templateMellom1;
};

export default function Komponer() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("Mellom");
  const [selectedNameCount, setSelectedNameCount] = useState("1");
  const [name1, setName1] = useState("");
  const [dates1, setDates1] = useState("");
  const [name2, setName2] = useState("");
  const [dates2, setDates2] = useState("");
  const [etterskrift, setEtterskrift] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("tree");
  
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

  const product = products[0]; // We only have one product

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

  const SymbolIcon = symbols.find(s => s.id === selectedSymbol)?.icon || TreeDeciduous;

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
      <section className="py-12 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Komponer din gravplate
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Design din personlige minneplate med vårt enkle verktøy. Se forhåndsvisning i sanntid.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Preview */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-24">
                <h2 className="font-display text-2xl font-semibold mb-6">Forhåndsvisning</h2>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border aspect-[4/3] max-w-lg mx-auto">
                  <img
                    src={getTemplateImage(selectedSize)}
                    alt="Gravplate mal"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {/* Symbol */}
                    <div className="mb-4 text-foreground/80">
                      <SymbolIcon className="h-10 w-10 mx-auto" strokeWidth={1} />
                    </div>

                    {/* Names */}
                    <div className="space-y-2">
                      <div>
                        <p className="font-script text-2xl md:text-3xl text-foreground">
                          {name1 || "Karen Marie Hansen"}
                        </p>
                        <p className="text-foreground/80 text-sm mt-1">
                          ★ {dates1 || "12. 07. 1940"} ✝ 2024
                        </p>
                      </div>

                      {selectedNameCount === "2" && (
                        <div className="pt-2">
                          <p className="font-script text-2xl md:text-3xl text-foreground">
                            {name2 || "Søren Peter Hansen"}
                          </p>
                          <p className="text-foreground/80 text-sm mt-1">
                            ★ {dates2 || "14. 09. 1942"} ✝ 2024
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Etterskrift */}
                    <p className="mt-4 text-foreground/70 font-script text-lg max-w-[80%]">
                      {etterskrift || "Skriv etterskrift her"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Size */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Størrelse</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-2 gap-4">
                  {sizeOptions.map((size) => {
                    const variant = product.node.variants.edges.find(v => 
                      v.node.selectedOptions.some(o => o.name === "Størrelse" && o.value === size) &&
                      v.node.selectedOptions.some(o => o.name === "Antall navn" && o.value === "1")
                    )?.node;
                    const variantPrice = variant ? parseFloat(variant.price.amount) : 0;
                    
                    return (
                      <label
                        key={size}
                        className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <RadioGroupItem value={size} className="sr-only" />
                        <span className="font-semibold">{size}</span>
                        <span className="text-muted-foreground text-sm mt-1">
                          fra {formatPrice(variantPrice)}
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Name Count */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Antall navn</Label>
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

              {/* Person 1 */}
              <div className="space-y-4 p-6 bg-muted rounded-xl">
                <h3 className="font-semibold">Person 1</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name1">Navn</Label>
                    <Input
                      id="name1"
                      placeholder="Fornavn Etternavn"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dates1">Datoer</Label>
                    <Input
                      id="dates1"
                      placeholder="f.eks. 01.01.1940 - 31.12.2024"
                      value={dates1}
                      onChange={(e) => setDates1(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Person 2 */}
              {selectedNameCount === "2" && (
                <div className="space-y-4 p-6 bg-muted rounded-xl">
                  <h3 className="font-semibold">Person 2</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name2">Navn</Label>
                      <Input
                        id="name2"
                        placeholder="Fornavn Etternavn"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dates2">Datoer</Label>
                      <Input
                        id="dates2"
                        placeholder="f.eks. 01.01.1942 - 31.12.2024"
                        value={dates2}
                        onChange={(e) => setDates2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Etterskrift */}
              <div className="space-y-4">
                <Label htmlFor="etterskrift" className="text-lg font-semibold">
                  Etterskrift (valgfritt)
                </Label>
                <Textarea
                  id="etterskrift"
                  placeholder="I kjærlig minne, Alltid i våre hjerter..."
                  value={etterskrift}
                  onChange={(e) => setEtterskrift(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Symbol */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Velg symbol</Label>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                  {symbols.map((symbol) => {
                    const Icon = symbol.icon;
                    return (
                      <button
                        key={symbol.id}
                        onClick={() => setSelectedSymbol(symbol.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          selectedSymbol === symbol.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                        title={symbol.name}
                      >
                        <Icon className="h-8 w-8" strokeWidth={1.5} />
                        <span className="text-xs mt-2 truncate w-full text-center">
                          {symbol.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="sticky bottom-0 bg-background pt-6 pb-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Totalpris:</span>
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(price)}
                  </span>
                </div>
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Legg i handlekurv
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
