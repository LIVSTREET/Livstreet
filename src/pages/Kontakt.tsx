import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Takk for din henvendelse! Vi svarer deg så snart som mulig.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Kontakt oss
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Vi er her for å hjelpe deg. Ta kontakt via skjema, telefon eller e-post.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">Send oss en melding</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Navn *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+47 123 45 678"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="din@epost.no"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Melding *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hvordan kan vi hjelpe deg?"
                  />
                </div>
                <Button variant="hero" size="lg" type="submit">
                  Send melding
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold mb-6">Kontaktinformasjon</h2>
              
              <div className="space-y-6">
                <a
                  href="mailto:livstreet.store@gmail.com"
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-post</h3>
                    <p className="text-muted-foreground">livstreet.store@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+4745251280"
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground">+47 452 51 280</p>
                    <p className="text-sm text-muted-foreground">Man-fre 09:00-16:00</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-6 bg-muted rounded-xl">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
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
