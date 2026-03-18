import PageLayout from "@/components/PageLayout";

const specs = [
  { label: "PDF", value: "Högupplöst tryckbar PDF" },
  { label: "Format", value: "280×400 mm (InDesign-mall tillgänglig)" },
  { label: "Upplösning", value: "Tabloidtryck 85 l/tum" },
  { label: "Färghantering", value: "Enbart CMYK-färger som produkten ska tryckas i" },
  { label: "Bildformat", value: "TIF, EPS eller JPG" },
  { label: "Färgbilder", value: "Spara i CMYK" },
  { label: "Bildupplösning", value: "170 dpi vid tabloidtryck (2× rastertätheten)" },
];

const Prepress = () => {
  return (
    <PageLayout>
      {/* Page header */}
      <div className="container pt-8 md:pt-12">
        <div className="border-b-[3px] border-double border-foreground pb-6 mb-10">
          <span className="dateline">Tekniska riktlinjer</span>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95] tracking-tight mt-3">
            Pre<span className="italic">press</span>
          </h1>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid md:grid-cols-12 gap-6 md:gap-0">
          {/* Left — intro */}
          <div className="md:col-span-5 md:pr-8">
            <div className="rule-top mb-4">
              <span className="dateline">Inlämning</span>
            </div>
            <p className="drop-cap font-body text-sm text-foreground leading-[1.8]">
              Vi vill att du ska vara nöjd med produkterna vi levererar. Därför har vi vissa önskemål på materialet du lämnar in.
            </p>
            <p className="font-body text-sm text-ink-mid leading-[1.8] mt-4">
              Vi tar emot ditt material per e-post. Mejla till{" "}
              <a href="mailto:tidningstryckarna@tryckarna.com" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-red-ink hover:text-red-ink transition-colors">
                tidningstryckarna@tryckarna.com
              </a>
            </p>
            <p className="font-body text-sm text-ink-mid leading-[1.8] mt-4">
              Tänk på att skicka in allt material i <strong className="text-foreground">en och samma fil</strong> samt <strong className="text-foreground">sida för sida</strong> (ej uppslag).
            </p>

            <div className="mt-8 p-5 bg-card border border-border">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Tips</span>
              <p className="font-body text-xs text-ink-mid leading-relaxed">
                Vi kan maila dig en InDesign-mall. Kontakta oss om du är osäker på rastertäthet eller andra inställningar.
              </p>
            </div>
          </div>

          {/* Right — specs table */}
          <div className="md:col-span-7 col-divider md:pl-8">
            <div className="rule-top mb-6">
              <span className="dateline">Tekniska specifikationer</span>
            </div>

            <div className="space-y-0">
              {specs.map((spec, i) => (
                <div key={spec.label} className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-red-ink font-medium">
                    {spec.label}
                  </span>
                  <span className="col-span-2 font-body text-sm text-foreground leading-relaxed">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Prepress;
