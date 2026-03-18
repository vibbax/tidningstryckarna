import PageLayout from "@/components/PageLayout";

const OmOss = () => {
  return (
    <PageLayout>
      {/* Page header */}
      <div className="container pt-8 md:pt-12">
        <div className="border-b-[3px] border-double border-foreground pb-6 mb-10">
          <span className="dateline">Tidningstryckarna på Åland AB</span>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95] tracking-tight mt-3">
            Om <span className="italic">oss</span>
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container pb-16">
        <div className="grid md:grid-cols-12 gap-6 md:gap-0">
          {/* Left column — intro text */}
          <div className="md:col-span-5 md:pr-8">
            <div className="rule-top mb-4">
              <span className="dateline">Vårt team</span>
            </div>
            <p className="drop-cap font-body text-sm text-foreground leading-[1.8]">
              TidningsTryckarna på Åland Ab är ett helägt dotterbolag inom ÅTT-koncernen med tryckeriverksamhet i Mariehamn. Vi är ett tight team med kompetens inom många olika områden i branschen.
            </p>
            <p className="font-body text-sm text-ink-mid leading-[1.8] mt-4">
              De flesta av oss har jobbat tillsammans i över 15 år vilket har skapat ett effektivt arbetsflöde.
            </p>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="rule-top mb-4">
                <span className="dateline">Utrustning</span>
              </div>
              <p className="font-body text-sm text-ink-mid leading-[1.8]">
                Teamet i kombination med vår tryckpress av märket <strong className="text-foreground">Goss Community</strong> ser till att vi kan erbjuda våra kunder bra kapacitet och hög tidningskvalitet året runt. Vi har dessutom öppet 6 dagar i veckan.
              </p>
            </div>
          </div>

          {/* Right column — facts + details */}
          <div className="md:col-span-7 col-divider md:pl-8">
            <div className="rule-top mb-6">
              <span className="dateline">Fakta</span>
            </div>

            <div className="space-y-0">
              {[
                { label: "Bolag", value: "TidningsTryckarna på Åland AB" },
                { label: "Del av", value: "ÅTT-koncernen" },
                { label: "Plats", value: "Vikingagränd 2A, Mariehamn" },
                { label: "Drift", value: "6 dagar/vecka, 365 dagar/år" },
                { label: "Press", value: "Goss Community" },
                { label: "Format", value: "Tabloid (eurostandardformat)" },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between py-4 border-b border-border">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{fact.label}</span>
                  <span className="font-body text-sm text-foreground font-medium">{fact.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="rule-top mb-4">
                <span className="dateline">Koncernlänkar</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {[
                  { name: "Ålandstidningen", url: "http://www.alandstidningen.ax/" },
                  { name: "Vibb.ax", url: "http://www.vibb.ax/" },
                  { name: "M-Tryck", url: "https://www.mtryck.ax/" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs font-medium tracking-wider uppercase text-foreground hover:text-red-ink transition-colors underline underline-offset-4 decoration-border hover:decoration-red-ink"
                  >
                    {link.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OmOss;
