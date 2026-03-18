const services = [
  {
    number: "01",
    title: "Tidningstryck",
    description: "Vi trycker huvudsakligen tidningar i eurostandardformat, men erbjuder även mindre format vid behov.",
  },
  {
    number: "02",
    title: "Hög kapacitet",
    description: "Vår högteknologiska maskinpark levererar stora upplagor snabbt. Tabloid, bilagor och tidsskrifter.",
  },
  {
    number: "03",
    title: "Prepress",
    description: "Komplett prepress-stöd för bästa möjliga tryckresultat. Kontakta oss för specifikationer.",
  },
];

const ServicesSection = () => {
  return (
    <section id="tjanster" className="bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-20">
        <div className="grid md:grid-cols-12 gap-6 md:gap-0 mb-12">
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50">
              Våra tjänster
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground leading-[1] mt-3">
              Vad vi<br /><span className="italic">erbjuder</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:flex md:items-end">
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-md">
              Med decenniers erfarenhet och modern teknik levererar vi tryck av högsta kvalitet till tidningar och publikationer i Norden.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20">
          {services.map((service, i) => (
            <div
              key={service.number}
              className="grid md:grid-cols-12 gap-4 md:gap-0 py-8 border-b border-primary-foreground/10 group hover:bg-primary-foreground/[0.03] transition-colors px-2 -mx-2"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-red-ink">{service.number}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl text-primary-foreground group-hover:text-red-ink transition-colors">
                  {service.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
