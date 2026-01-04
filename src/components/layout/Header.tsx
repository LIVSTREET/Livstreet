import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/livstreet-logo.png";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/gravsteiner", label: "Gravsteiner" },
  { href: "/komponer", label: "Komponer" },
  { href: "/informasjon", label: "Nyttig informasjon" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt oss" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Livstreet - Bæredyktig Minne" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary ${
                  location.pathname === link.href
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
              {link.href === "/om-oss" && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <p className="text-xs text-muted-foreground text-center">
                    Bæredyktige gravplater i tre – et vakkert og miljøvennlig alternativ for å hedre dine kjære.
                  </p>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/komponer">Send forespørsel</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="hero" size="lg" className="mt-4" asChild>
              <Link to="/komponer" onClick={() => setMobileMenuOpen(false)}>
                Send forespørsel
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
