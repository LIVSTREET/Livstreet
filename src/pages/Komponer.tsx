import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, TreeDeciduous, Cross, Heart, Bird, Sun, Anchor, Flower } from "lucide-react";
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

const sizeOptions = [
  { value: "mellom", label: "Mellom (30x40 cm)", price: 3990 },
  { value: "stor", label: "Stor (40x50 cm)", price: 5490 },
];

const nameCountOptions = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 personer" },
];

// Template images based on size and name count
const getTemplateImage = (size: string) => {
  return size === "stor" ? templateStor1 : templateMellom1;
};

export default function Komponer() {
  const [size, setSize] = useState("mellom");
  const [nameCount, setNameCount] = useState("1");
  const [name1, setName1] = useState("");
  const [dates1, setDates1] = useState("");
  const [name2, setName2] = useState("");
  const [dates2, setDates2] = useState("");
  const [etterskrift, setEtterskrift] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("tree");

  const price = useMemo(() => {
    const basePrice = sizeOptions.find(s => s.value === size)?.price || 3990;
    const extraName = nameCount === "2" ? 500 : 0;
    return basePrice + extraName;
  }, [size, nameCount]);

  const handleAddToCart = () => {
    const lineItems = {
      size: sizeOptions.find(s => s.value === size)?.label,
      nameCount,
      name1,
      dates1,
      ...(nameCount === "2" && { name2, dates2 }),
      etterskrift,
      symbol: symbols.find(s => s.id === selectedSymbol)?.name,
    };
    console.log("Adding to cart:", lineItems);
    alert("Produkt lagt i handlekurv! (Shopify-integrasjon kommer snart)");
  };

  const SymbolIcon = symbols.find(s => s.id === selectedSymbol)?.icon || TreeDeciduous;

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
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border aspect-[3/4] max-w-md mx-auto">
                  <img
                    src={getTemplateImage(size)}
                    alt="Gravplate mal"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    {/* Symbol */}
                    <div className="mb-6 text-primary/70">
                      <SymbolIcon className="h-16 w-16 mx-auto" strokeWidth={1} />
                    </div>

                    {/* Names */}
                    <div className="space-y-4">
                      <div>
                        <p className="font-display text-2xl md:text-3xl text-primary font-semibold">
                          {name1 || "Navn Navnesen"}
                        </p>
                        <p className="text-primary/70 text-lg mt-1">
                          {dates1 || "1940 - 2024"}
                        </p>
                      </div>

                      {nameCount === "2" && (
                        <div className="pt-4 border-t border-primary/20">
                          <p className="font-display text-2xl md:text-3xl text-primary font-semibold">
                            {name2 || "Navn Navnesen"}
                          </p>
                          <p className="text-primary/70 text-lg mt-1">
                            {dates2 || "1942 - 2024"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Etterskrift */}
                    {(etterskrift || true) && (
                      <p className="mt-8 text-primary/60 italic text-sm max-w-[80%]">
                        "{etterskrift || "I kjærlig minne"}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Size */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Størrelse</Label>
                <RadioGroup value={size} onValueChange={setSize} className="grid grid-cols-2 gap-4">
                  {sizeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        size === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <span className="font-semibold">{option.label}</span>
                      <span className="text-muted-foreground text-sm mt-1">
                        {option.price.toLocaleString("nb-NO")} kr
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Name Count */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Antall navn</Label>
                <Select value={nameCount} onValueChange={setNameCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {nameCountOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {nameCount === "2" && (
                  <p className="text-sm text-muted-foreground">+500 kr for ekstra navn</p>
                )}
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
              {nameCount === "2" && (
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
                    {price.toLocaleString("nb-NO")} kr
                  </span>
                </div>
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full"
                  onClick={handleAddToCart}
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
