import newspapersImg from "@/assets/newspapers.jpg";
import { useEditable } from "@/hooks/useEditable";

const AboutSection = () => {
  const t = useEditable("home");

  const imageUrl = t("about", "image", "") || newspapersImg;

  return (
    <section id="om-oss" className="container py-10 md:py-16">
      <div className="grid md:grid-cols-12 gap-6 md:gap-0">
        <div className="md:col-span-4 md:pr-8">
          <div className="rule-top mb-4">
            <span className="dateline">{t("about", "dateline", "Om tryckeriet")}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] mb-4">
            {t("about", "title", "En del av ÅTT-koncernen")}
          </h2>
          <div className="flex gap-8 mt-6 pt-4 border-t border-border">
            <div>
              <span className="font-display text-4xl text-red-ink">{t("about", "stat1_number", "6")}</span>
              <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-1">{t("about", "stat1_label", "dagar/vecka")}</p>
            </div>
            <div>
              <span className="font-display text-4xl text-red-ink">{t("about", "stat2_number", "365")}</span>
              <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-1">{t("about", "stat2_label", "dagar/år")}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 col-divider md:px-8">
          <p className="drop-cap font-body text-sm text-foreground leading-[1.8]">
            {t("about", "text1", "TidningsTryckarna är ett modernt tabloidtryckeri på Åland med fokus på nöjda kunder och hög tidningskvalitet. Vi arbetar hårt för att minska miljöbelastningen i all vår produktion.")}
          </p>
          <p className="font-body text-sm text-ink-mid leading-[1.8] mt-4">
            {t("about", "text2", "Vi trycker de åländska lokaltidningarna Ålandstidningen och Nya Åland samt diverse andra tidningar, bilagor och tidsskrifter. Tryckeriet erbjuder hög kapacitet och flexibilitet.")}
          </p>
        </div>

        <div className="md:col-span-4 col-divider md:pl-8">
          <img
            src={imageUrl}
            alt="Tryckta tidningar"
            className="w-full aspect-[4/5] object-cover"
          />
          <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-2">
            {t("about", "image_caption", "Åländska tidningar färdiga från pressen")}
          </p>
        </div>
      </div>

      <div className="border-b-[3px] border-double border-foreground mt-10 md:mt-16" />
    </section>
  );
};

export default AboutSection;
