const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-display text-2xl tracking-tight">TidningsTryckarna</span>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-primary-foreground/40 mt-1">
              Tidningstryckarna på Åland AB
            </p>
          </div>
          <p className="font-mono text-[9px] tracking-[0.15em] text-primary-foreground/30">
            © {new Date().getFullYear()} Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
