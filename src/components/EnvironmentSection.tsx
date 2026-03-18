import envImg from "@/assets/environment.jpg";
import { useEditable } from "@/hooks/useEditable";
import TextWithImageBlock from "@/components/sections/TextWithImageBlock";

const EnvironmentSection = () => {
  const t = useEditable("home");

  const imageUrl = t("environment", "image", "") || envImg;

  return (
    <TextWithImageBlock
      dateline={t("environment", "dateline", "Hållbarhet")}
      title={t("environment", "title", "Miljömedveten produktion")}
      texts={[
        t("environment", "text1", "Vi jobbar aktivt med att vara miljömedvetna och minska vår miljöbelastning. Vi har en policy att återanvända när det är möjligt för att minska på onödigt spill."),
        t("environment", "text2", "När vi behöver anlita experter utanför tryckeriet vänder vi oss i första hand till våra lokala leverantörer på Åland — vi stödjer åländsk arbetskraft."),
      ]}
      imageUrl={imageUrl}
      imageAlt="Miljömedveten produktion"
      imagePosition="left"
      imageAspect="aspect-[16/10]"
      dividerStyle="single"
    />
  );
};

export default EnvironmentSection;
