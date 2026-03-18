import { Newspaper, Layers, Settings } from "lucide-react";

const services = [
  {
    icon: Newspaper,
    title: "Tidningstryck",
    description: "Vi trycker huvudsakligen tidningar i eurostandardformat, men erbjuder även mindre format vid behov. Tabloid, bilagor och tidsskrifter.",
  },
  {
    icon: Layers,
    title: "Hög kapacitet",
    description: "Med vår högteknologiska maskinpark levererar vi stora upplagor snabbt och effektivt. Tryckeriet är öppet sex dagar i veckan.",
  },
  {
    icon: Settings,
    title: "Prepress & support",
    description: "Vi erbjuder komplett prepress-stöd för att säkerställa bästa möjliga tryckresultat. Kontakta oss för specifikationer och annonsformat.",
  },
];

const ServicesSection = () => {
  return (
    <section id="tjanster" className="py-20 md:py-28 bg-paper">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-amber font-semibold mb-3">Tjänster</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Vad vi erbjuder
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-shadow group"
            >
              <div className="w-12 h-12 rounded bg-navy/10 flex items-center justify-center mb-5 group-hover:bg-navy transition-colors">
                <service.icon className="w-6 h-6 text-navy group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
