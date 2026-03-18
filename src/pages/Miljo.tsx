import PageLayout from "@/components/PageLayout";
import envImg from "@/assets/environment.jpg";
import { useEditable } from "@/hooks/useEditable";

const Miljo = () => {
  const t = useEditable("miljo");

  return (
    <PageLayout>
      <div className="container pt-8 md:pt-12">
        <div className="border-b-[3px] border-double border-foreground pb-6 mb-10">
          <span className="dateline">{t("header", "dateline", "Hållbarhet & ansvar")}</span>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95] tracking-tight mt-3">
            {t("header", "title", "Miljömedvetenhet")}
          </h1>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid md:grid-cols-12 gap-6 md:gap-0">
          <div className="md:col-span-7 md:pr-8">
            <div className="rule-top mb-4">
              <span className="dateline">{t("policy", "dateline", "Vår policy")}</span>
            </div>
            <p className="drop-cap font-body text-sm text-foreground leading-[1.8] mb-4">
              {t("policy", "text1", "Vårda och var rädd om din miljö, tänk på vilken miljöpåverkan ditt val av trycksaksleverantör har. Vi har alla möjlighet att bidra och påverka!")}
            </p>
            <p className="font-body text-sm text-ink-mid leading-[1.8] mb-4">
              {t("policy", "text2", "Vi jobbar hårt för att minska miljöbelastningen i all vår produktion. Tack vare vår kemikaliefria plåtframställning är vi ett av landets miljövänligaste tryckerier. Vi jobbar alltid miljömedvetet och följer en strikt miljöpolicy.")}
            </p>

            <img
              src={envImg}
              alt="Miljömedveten produktion"
              className="w-full aspect-[16/9] object-cover mt-6"
            />

            <div className="mt-10">
              <div className="rule-top mb-4">
                <span className="dateline">{t("reuse", "dateline", "Återbruk av pappersrullar")}</span>
              </div>
              <p className="font-body text-sm text-ink-mid leading-[1.8] mb-4">
                {t("reuse", "text1", "Vi vill gärna återanvända när det är möjligt för att minska på onödigt spill. Därför är du välkommen att hämta restrullar med papper i mindre mängd från tryckeriet. Pappersrullarna är särskilt populära bland dagis och skolor som använder dem när de ritar och tecknar.")}
              </p>
              <p className="font-body text-sm text-ink-mid leading-[1.8]">
                {t("reuse", "text2", "Pappret fungerar också som skydd vid olika projekt i hemmet och trädgården.")}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 col-divider md:pl-8">
            <div className="rule-top mb-6">
              <span className="dateline">{t("free_rolls", "dateline", "Gratisrullar")}</span>
            </div>
            <p className="font-body text-sm text-ink-mid leading-[1.8] mb-4">
              {t("free_rolls", "text", "Privatpersoner är välkomna att hämta gratisrullar från tryckeriet. Perfekt som ritpapper eller som skydd vid till exempel målning. Vissa använder också pappret för att hålla ogräs borta i trädgården.")}
            </p>

            <div className="p-5 bg-card border border-border mt-6">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-red-ink block mb-2">{t("order", "dateline", "Beställ papper")}</span>
              <p className="font-body text-xs text-ink-mid leading-relaxed mb-3">
                {t("order", "text", "Privatpersoner, dagis, skolor och småföretag som önskar mindre mängder papper mejlar sin beställning till oss. Uppge ditt namn, antal rullar samt önskad bredd.")}
              </p>
              <a
                href="mailto:tidningstryckarna@tryckarna.com"
                className="font-body text-xs font-semibold tracking-wider uppercase text-foreground hover:text-red-ink transition-colors underline underline-offset-4"
              >
                tidningstryckarna@tryckarna.com
              </a>
            </div>

            <div className="mt-8 p-5 bg-card border border-border">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Företag</span>
              <p className="font-body text-xs text-ink-mid leading-relaxed mb-2">
                {t("business", "text", "Företag i behov av större mängder papper kan kontakta oss för kilopris.")}
              </p>
              <p className="font-body text-xs text-foreground font-medium">
                Tel: {t("business", "phone", "+358 457 002 6675")}
              </p>
            </div>

            <div className="mt-8 p-5 bg-card border border-border">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Avhämtning</span>
              <p className="font-body text-xs text-ink-mid leading-relaxed">
                {t("pickup", "text", "Vi meddelar dig när du kan komma och hämta ditt papper. Vi ställer ut rullarna på lastkajen på tryckeriets östra sida, vid den stora blå garageporten. Rullarna är markerade med ditt namn.")}
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://www.regeringen.ax/landskapsregeringens-organisation/social-miljoavdelningen/miljobyran"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs font-medium tracking-wider uppercase text-foreground hover:text-red-ink transition-colors underline underline-offset-4 decoration-border hover:decoration-red-ink"
              >
                Åländskt miljöskydd ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Miljo;
