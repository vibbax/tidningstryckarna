import newspapersImg from "@/assets/newspapers.jpg";

const AboutSection = () => {
  return (
    <section id="om-oss" className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <img
              src={newspapersImg}
              alt="Tryckta tidningar"
              className="rounded shadow-elevated w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber/20 rounded -z-10" />
          </div>

          <div>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-amber font-semibold mb-3">Om oss</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Ett helägt dotterbolag inom ÅTT-koncernen
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              TidningsTryckarna är ett modernt tabloidtryckeri på Åland med fokus på nöjda kunder och hög tidningskvalitet. Vi arbetar hårt för att minska miljöbelastningen i all vår produktion.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Vi trycker de åländska lokaltidningarna Ålandstidningen och Nya Åland samt diverse andra tidningar, bilagor och tidsskrifter. Vi erbjuder hög kapacitet och flexibilitet.
            </p>
            <div className="flex gap-12">
              <div>
                <span className="font-display text-3xl font-bold text-navy">6</span>
                <p className="font-body text-sm text-muted-foreground mt-1">dagar / vecka</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-navy">365</span>
                <p className="font-body text-sm text-muted-foreground mt-1">dagar / år</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
