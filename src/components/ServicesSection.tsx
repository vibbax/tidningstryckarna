import { useEditable } from "@/hooks/useEditable";
import NumberedListBlock from "@/components/sections/NumberedListBlock";

const ServicesSection = () => {
  const t = useEditable("home");

  return (
    <NumberedListBlock
      dateline={t("services", "dateline", "Våra tjänster")}
      title={t("services", "title", "Vad vi erbjuder")}
      intro={t("services", "intro", "Med decenniers erfarenhet och modern teknik levererar vi tryck av högsta kvalitet till tidningar och publikationer i Norden.")}
      items={[
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
      ]}
    />
  );
};

export default ServicesSection;
