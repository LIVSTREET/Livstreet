import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/livstreet-logo.png";
export function Footer() {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container py-8 md:py-16 px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-3 md:space-y-4">
            <img src={logo} alt="Livstreet" className="h-10 md:h-12 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/80 text-xs md:text-sm leading-relaxed">
              Bærekraftige gravplater i tre – et vakkert og miljøvennlig alternativ for å hedre dine kjære.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 md:space-y-4">
            <h4 className="font-display text-sm md:text-lg font-semibold">Sider</h4>
            <nav className="flex flex-col gap-1.5 md:gap-2">
              <Link to="/komponer" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Lag din plate
              </Link>
              <Link to="/informasjon" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Nyttig informasjon
              </Link>
              <Link to="/om-oss" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Om oss
              </Link>
              <Link to="/kontakt" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Kontakt oss
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-2 md:space-y-4">
            <h4 className="font-display text-sm md:text-lg font-semibold">Mer</h4>
            <nav className="flex flex-col gap-1.5 md:gap-2">
              <Link to="/personvern" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Personvernerklæring
              </Link>
              <Link to="/kjopsvilkar" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Kjøpsvilkår
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-2 md:space-y-4">
            <h4 className="font-display text-sm md:text-lg font-semibold">Kontakt oss</h4>
            <div className="space-y-2 md:space-y-3">
              <a href="mailto:livstreet.store@gmail.com" className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                <span className="break-all">livstreet.store@gmail.com</span>
              </a>
              <a href="tel:+4745251280" className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                +47 452 51 280
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="https://www.facebook.com/profile.php?id=61586135337128" target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a href="https://www.instagram.com/livstreetgravplate/" target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 md:py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <p className="text-xs md:text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Livstreet. Alle rettigheter reservert.
          </p>
          <p className="text-xs md:text-sm text-primary-foreground/60">
            Formidlet i Norge 🇳🇴 – Design og produksjon i Danmark 🇩🇰
          </p>
        </div>
      </div>
    </footer>;
}