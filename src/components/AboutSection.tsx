import newspapersImg from "@/assets/newspapers.jpg";

const AboutSection = () => {
  return (
    <section id="om-oss" className="container py-10 md:py-16">
      <div className="grid md:grid-cols-12 gap-6 md:gap-0">
        {/* Left column — narrow intro */}
        <div className="md:col-span-4 md:pr-8">
          <div className="rule-top mb-4">
            <span className="dateline">Om tryckeriet</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] mb-4">
            En del av ÅTT-koncernen
          </h2>
          <div className="flex gap-8 mt-6 pt-4 border-t border-border">
            <div>
              <span className="font-display text-4xl text-red-ink">6</span>
              <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-1">dagar/vecka</p>
            </div>
            <div>
              <span className="font-display text-4xl text-red-ink">365</span>
              <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-1">dagar/år</p>
            </div>
          </div>
        </div>

        {/* Middle column — body text */}
        <div className="md:col-span-4 col-divider md:px-8">
          <p className="drop-cap font-body text-sm text-foreground leading-[1.8]">
            TidningsTryckarna är ett modernt tabloidtryckeri på Åland med fokus på nöjda kunder och hög tidningskvalitet. Vi arbetar hårt för att minska miljöbelastningen i all vår produktion.
          </p>
          <p className="font-body text-sm text-ink-mid leading-[1.8] mt-4">
            Vi trycker de åländska lokaltidningarna Ålandstidningen och Nya Åland samt diverse andra tidningar, bilagor och tidsskrifter. Tryckeriet erbjuder hög kapacitet och flexibilitet.
          </p>
        </div>

        {/* Right column — image */}
        <div className="md:col-span-4 col-divider md:pl-8">
          <img
            src={newspapersImg}
            alt="Tryckta tidningar"
            className="w-full aspect-[4/5] object-cover"
          />
          <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-2">
            Åländska tidningar färdiga från pressen
          </p>
        </div>
      </div>

      <div className="border-b-[3px] border-double border-foreground mt-10 md:mt-16" />
    </section>
  );
};

export default AboutSection;
