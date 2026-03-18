import { useEditable } from "@/hooks/useEditable";

const ServicesSection = () => {
  const t = useEditable("home");

  const services = [
    {
      number: "01",
      title: t("services", "service1_title", "Tidningstryck"),
      description: t("services", "service1_desc", "Vi trycker huvudsakligen tidningar i eurostandardformat, men erbjuder även mindre format vid behov."),
    },
    {
      number: "02",
      title: t("services", "service2_title", "Hög kapacitet"),
      description: t("services", "service2_desc", "Vår högteknologiska maskinpark levererar stora upplagor snabbt. Tabloid, bilagor och tidsskrifter."),
    },
    {
      number: "03",
      title: t("services", "service3_title", "Prepress"),
      description: t("services", "service3_desc", "Komplett prepress-stöd för bästa möjliga tryckresultat. Kontakta oss för specifikationer."),
    },
  ];

  return (
    <section id="tjanster" className="bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-20">
        <div className="grid md:grid-cols-12 gap-6 md:gap-0 mb-12">
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50">
              {t("services", "dateline", "Våra tjänster")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground leading-[1] mt-3">
              {t("services", "title", "Vad vi erbjuder")}
            </h2>
          </div>
          <div className="md:col-span-7 md:flex md:items-end">
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-md">
              {t("services", "intro", "Med decenniers erfarenhet och modern teknik levererar vi tryck av högsta kvalitet till tidningar och publikationer i Norden.")}
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20">
          {services.map((service) => (
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
