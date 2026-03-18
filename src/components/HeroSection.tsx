import heroBg from "@/assets/hero-printing.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Tryckpress i drift"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />

      <div className="relative z-10 container text-center px-4">
        <p className="font-body text-sm md:text-base uppercase tracking-[0.3em] text-amber mb-4 animate-fade-in-up">
          Tidningstryckarna på Åland AB
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          Modernt tabloidtryckeri<br className="hidden md:block" /> med tradition
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Hög kvalitet, nöjda kunder och miljömedveten produktion — sex dagar i veckan, året runt.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <a
            href="#kontakt"
            className="inline-block bg-amber hover:bg-amber-light text-accent-foreground font-body font-semibold px-8 py-3.5 rounded text-sm uppercase tracking-wider transition-colors"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
