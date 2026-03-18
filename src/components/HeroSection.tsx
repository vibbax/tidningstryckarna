import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-printing.jpg";
import { useEditable } from "@/hooks/useEditable";

const HeroSection = () => {
  const t = useEditable("home");

  return (
    <section className="container py-8 md:py-12">
      <div className="grid md:grid-cols-12 gap-6 md:gap-0">
        <div className="md:col-span-7 md:pr-8">
          <div className="rule-double mb-6">
            <span className="dateline">{t("hero", "dateline", "Modernt tryckeri · Åland, Finland")}</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[0.95] tracking-tight mb-6">
            {t("hero", "title_line1", "Tryckt ord,")}<br />
            <span className="italic text-red-ink">{t("hero", "title_line2", "levererat")}</span> {t("hero", "title_line3", "med precision")}
          </h1>

          <p className="font-body text-base md:text-lg text-ink-mid leading-relaxed max-w-lg mb-8">
            {t("hero", "subtitle", "Hög kapacitet och flexibilitet i tabloidformat — sex dagar i veckan, året runt. Vi trycker Ålands lokaltidningar och mycket mer.")}
          </p>

          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-foreground text-background font-body text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-red-ink transition-colors"
          >
            {t("hero", "cta", "Kontakta oss")}
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        <div className="md:col-span-5 col-divider md:pl-8">
          <img
            src={heroBg}
            alt="Tryckpress i full drift"
            className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-2">
            {t("hero", "image_caption", "Foto: Tidningstryckarnas tryckpress i drift")}
          </p>
        </div>
      </div>

      <div className="h-[2px] bg-foreground mt-8 md:mt-12" />
    </section>
  );
};

export default HeroSection;
