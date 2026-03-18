import envImg from "@/assets/environment.jpg";
import { useEditable } from "@/hooks/useEditable";

const EnvironmentSection = () => {
  const t = useEditable("home");

  const imageUrl = t("environment", "image", "") || envImg;

  return (
    <section id="miljo" className="container py-12 md:py-20">
      <div className="grid md:grid-cols-12 gap-6 md:gap-0">
        <div className="md:col-span-7 md:pr-8">
          <img
            src={imageUrl}
            alt="Miljömedveten produktion"
            className="w-full aspect-[16/10] object-cover"
          />
        </div>

        <div className="md:col-span-5 col-divider md:pl-8 flex flex-col justify-center">
          <div className="rule-top mb-4">
            <span className="dateline">{t("environment", "dateline", "Hållbarhet")}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] mb-5">
            {t("environment", "title", "Miljömedveten produktion")}
          </h2>
          <p className="font-body text-sm text-ink-mid leading-[1.8] mb-4">
            {t("environment", "text1", "Vi jobbar aktivt med att vara miljömedvetna och minska vår miljöbelastning. Vi har en policy att återanvända när det är möjligt för att minska på onödigt spill.")}
          </p>
          <p className="font-body text-sm text-ink-mid leading-[1.8]">
            {t("environment", "text2", "När vi behöver anlita experter utanför tryckeriet vänder vi oss i första hand till våra lokala leverantörer på Åland — vi stödjer åländsk arbetskraft.")}
          </p>
        </div>
      </div>

      <div className="border-b border-border mt-10 md:mt-16" />
    </section>
  );
};

export default EnvironmentSection;
