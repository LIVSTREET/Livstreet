import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-10 md:py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              Vi er her for deg
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              Har du spørsmål eller trenger veiledning? Ta kontakt med oss – vi hjelper deg gjerne.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 md:gap-6">
            {/* Email */}
            <a
              href="mailto:livstreet.store@gmail.com"
              className="group p-4 md:p-8 bg-card rounded-xl md:rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-semibold mb-1 md:mb-2">E-post</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-2 md:mb-4 hidden md:block">
                Send oss en melding når som helst
              </p>
              <span className="text-primary font-medium text-sm md:text-base">livstreet.store@gmail.com</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+4745251280"
              className="group p-4 md:p-8 bg-card rounded-xl md:rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-semibold mb-1 md:mb-2">Telefon</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-2 md:mb-4 hidden md:block">
                Man-fre 09:00-16:00
              </p>
              <span className="text-primary font-medium text-sm md:text-base">+47 452 51 280</span>
            </a>
          </div>

          {/* Location */}
          <div className="mt-4 md:mt-8 p-4 md:p-6 bg-muted rounded-lg md:rounded-xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center md:text-left">
            <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
            <p className="text-muted-foreground text-sm md:text-base">
              <strong className="text-foreground">Livstreet AS</strong> · Verkstedveien 1, 0150 Oslo, Norge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
