import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/livstreet-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Livstreet" className="h-12 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Bæredyktige gravplater i tre – et vakkert og miljøvennlig alternativ for å hedre dine kjære.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Sider</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/gravsteiner" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Gravsteiner
              </Link>
              <Link to="/komponer" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Komponer din plate
              </Link>
              <Link to="/informasjon" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Nyttig informasjon
              </Link>
              <Link to="/om-oss" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Om oss
              </Link>
            </nav>
          </div>

          {/* Legal & Account */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Mer</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/logg-inn" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Logg inn
              </Link>
              <Link to="/partner" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Partner
              </Link>
              <Link to="/personvern" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Personvernerklæring
              </Link>
              <Link to="/vilkar" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Kjøpsvilkår
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Kontakt oss</h4>
            <div className="space-y-3">
              <a href="mailto:post@livstreet.no" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
                post@livstreet.no
              </a>
              <a href="tel:+4712345678" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" />
                +47 123 45 678
              </a>
              <button className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
                Start live chat
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Livstreet. Alle rettigheter reservert.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Laget med kjærlighet i Norge 🇳🇴
          </p>
        </div>
      </div>
    </footer>
  );
}
