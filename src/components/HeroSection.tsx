import heroBg from "@/assets/hero-printing.jpg";
import { useEditable } from "@/hooks/useEditable";
import HeroBlock from "@/components/sections/HeroBlock";

const HeroSection = () => {
  const t = useEditable("home");

  const imageUrl = t("hero", "image", "") || heroBg;

  return (
    <HeroBlock
      dateline={t("hero", "dateline", "Modernt tryckeri · Åland, Finland")}
      titleLine1={t("hero", "title_line1", "Tryckt ord,")}
      titleLine2={t("hero", "title_line2", "levererat")}
      titleLine3={t("hero", "title_line3", "med precision")}
      subtitle={t("hero", "subtitle", "Hög kapacitet och flexibilitet i tabloidformat — sex dagar i veckan, året runt. Vi trycker Ålands lokaltidningar och mycket mer.")}
      ctaText={t("hero", "cta", "Kontakta oss")}
      ctaLink={t("hero", "cta_link", "/kontakt")}
      imageUrl={imageUrl}
      imageAlt="Tryckpress i full drift"
      imageCaption={t("hero", "image_caption", "Foto: Tidningstryckarnas tryckpress i drift")}
    />
  );
};

export default HeroSection;
