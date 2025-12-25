import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Vi er her for deg
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Har du spørsmål eller trenger veiledning? Ta kontakt med oss – vi hjelper deg gjerne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <a
              href="mailto:post@livstreet.no"
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">E-post</h3>
              <p className="text-muted-foreground mb-4">
                Send oss en melding når som helst
              </p>
              <span className="text-primary font-medium">post@livstreet.no</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+4712345678"
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-muted-foreground mb-4">
                Man-fre 09:00-16:00
              </p>
              <span className="text-primary font-medium">+47 123 45 678</span>
            </a>

            {/* Live Chat */}
            <button
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center w-full"
              onClick={() => alert("Live chat kommer snart!")}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">
                Chat med oss nå
              </p>
              <span className="text-accent font-medium">Start samtale</span>
            </button>
          </div>

          {/* Location */}
          <div className="mt-8 p-6 bg-muted rounded-xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <MapPin className="h-6 w-6 text-primary shrink-0" />
            <p className="text-muted-foreground">
              <strong className="text-foreground">Livstreet AS</strong> · Verkstedveien 1, 0150 Oslo, Norge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
