import newspapersImg from "@/assets/newspapers.jpg";
import { useEditable } from "@/hooks/useEditable";
import TextWithImageBlock from "@/components/sections/TextWithImageBlock";

const AboutSection = () => {
  const t = useEditable("home");

  const imageUrl = t("about", "image", "") || newspapersImg;

  return (
    <TextWithImageBlock
      dateline={t("about", "dateline", "Om tryckeriet")}
      title={t("about", "title", "En del av ÅTT-koncernen")}
      texts={[
        t("about", "text1", "TidningsTryckarna är ett modernt tabloidtryckeri på Åland med fokus på nöjda kunder och hög tidningskvalitet. Vi arbetar hårt för att minska miljöbelastningen i all vår produktion."),
        t("about", "text2", "Vi trycker de åländska lokaltidningarna Ålandstidningen och Nya Åland samt diverse andra tidningar, bilagor och tidsskrifter. Tryckeriet erbjuder hög kapacitet och flexibilitet."),
      ]}
      imageUrl={imageUrl}
      imageAlt="Tryckta tidningar"
      imageCaption={t("about", "image_caption", "Åländska tidningar färdiga från pressen")}
      imagePosition="right"
      stats={[
        { value: t("about", "stat1_number", "6"), label: t("about", "stat1_label", "dagar/vecka") },
        { value: t("about", "stat2_number", "365"), label: t("about", "stat2_label", "dagar/år") },
      ]}
      dropCap
      dividerStyle="double"
    />
  );
};

export default AboutSection;
