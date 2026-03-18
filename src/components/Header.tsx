import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Hem", href: "#" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Tjänster", href: "#tjanster" },
  { label: "Miljö", href: "#miljo" },
  { label: "Kontakt", href: "#kontakt" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Top thin rule */}
      <div className="h-[3px] bg-foreground" />
      
      <div className="container">
        {/* Masthead */}
        <div className="flex items-center justify-between py-4 md:py-6 border-b border-foreground">
          <div className="flex items-baseline gap-2">
            <a href="#" className="font-display text-3xl md:text-5xl text-foreground leading-none tracking-tight">
              TidningsTryckarna
            </a>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Tidningstryckarna på Åland AB
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground mt-0.5">
              Mariehamn · Est. sedan generationer
            </p>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
            aria-label="Meny"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Nav bar */}
        <nav className="hidden md:flex items-center justify-center gap-10 py-2.5 border-b border-border">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-xs font-medium tracking-[0.15em] uppercase text-foreground hover:text-red-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-background border-b border-foreground">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 font-body text-xs font-medium tracking-[0.15em] uppercase text-foreground hover:text-red-ink transition-colors border-b border-border last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
