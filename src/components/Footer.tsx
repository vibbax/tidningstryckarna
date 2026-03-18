const Footer = () => {
  return (
    <footer className="bg-ink py-8">
      <div className="container px-4 text-center">
        <p className="font-display text-lg font-bold tracking-wide text-primary-foreground/90 mb-2">
          TIDNINGS<span className="text-amber">TRYCKARNA</span>
        </p>
        <p className="font-body text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Tidningstryckarna på Åland AB. Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
