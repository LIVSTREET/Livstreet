import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";

export default function Kontakt() {
  const setInquiryFormData = useCartStore(state => state.setInquiryFormData);
  const existingInquiryData = useCartStore(state => state.inquiryFormData);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Load existing data from store on mount
  useEffect(() => {
    if (existingInquiryData) {
      setFormData(prev => ({
        name: existingInquiryData.name || prev.name,
        email: existingInquiryData.email || prev.email,
        phone: existingInquiryData.phone || prev.phone,
        message: existingInquiryData.description || prev.message,
      }));
    }
  }, []);

  // Save to store on blur
  const handleBlur = () => {
    setInquiryFormData({
      name: formData.name || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      description: formData.message || undefined,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Takk for din henvendelse! Vi svarer deg så snart som mulig.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-10 md:py-20 bg-primary">
        <div className="container text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-2 md:mb-4">
            Kontakt oss
          </h1>
          <p className="text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Vi er her for å hjelpe deg. Ta kontakt via skjema, telefon eller e-post.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6">Send oss en melding</h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1 md:space-y-2">
                    <Label htmlFor="name">Navn *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onBlur={handleBlur}
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onBlur={handleBlur}
                      placeholder="+47 123 45 678"
                    />
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={handleBlur}
                    placeholder="din@epost.no"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="message">Melding *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onBlur={handleBlur}
                    placeholder="Hvordan kan vi hjelpe deg?"
                  />
                </div>
                <Button variant="hero" size="lg" type="submit">
                  Send melding
                </Button>
              </form>

              {/* Link to configurator */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ønsker du å inkludere et design i forespørselen? Vi hjelper deg gjerne med å komponere designet.
                    </p>
                    <Button 
                      variant="outline" 
                      asChild
                      onClick={() => {
                        // Save latest form data before navigating
                        setInquiryFormData({
                          name: formData.name || undefined,
                          email: formData.email || undefined,
                          phone: formData.phone || undefined,
                          description: formData.message || undefined,
                        });
                      }}
                    >
                      <Link to="/komponer">Lag din plate med design</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-8">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6">Kontaktinformasjon</h2>
              
              <div className="space-y-3 md:space-y-6">
                <a
                  href="mailto:livstreet.store@gmail.com"
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg md:rounded-xl border border-border hover:border-primary/30 transition-all"
                >
                  <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">E-post</h3>
                    <p className="text-muted-foreground text-sm md:text-base">livstreet.store@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+4745251280"
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg md:rounded-xl border border-border hover:border-primary/30 transition-all"
                >
                  <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Telefon</h3>
                    <p className="text-muted-foreground text-sm md:text-base">+47 452 51 280</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Man-fre 09:00-16:00</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-muted rounded-lg md:rounded-xl">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Adresse</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Livstreet AS<br />
                      Verkstedveien 1<br />
                      0150 Oslo, Norge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}