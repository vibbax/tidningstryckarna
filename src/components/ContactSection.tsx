import { useEditable } from "@/hooks/useEditable";

const ContactSection = () => {
  const t = useEditable("home");

  const email = t("contact", "email", "tidningstryckarna@tryckarna.com");
  const phone = t("contact", "phone", "+358 18 26669");
  const address = t("contact", "address", "Vikingagränd 2A, Mariehamn");

  return (
    <section id="kontakt" className="container py-12 md:py-20">
      <div className="grid md:grid-cols-12 gap-8 md:gap-0">
        <div className="md:col-span-5 md:pr-8">
          <div className="rule-double mb-4">
            <span className="dateline">{t("contact", "dateline", "Kontakt")}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-[1] mb-4">
            {t("contact", "title", "Hör av dig till oss")}
          </h2>
          <p className="font-body text-sm text-ink-mid leading-relaxed">
            {t("contact", "intro", "Vi välkomnar förfrågningar om tryck, samarbeten eller besök i tryckeriet.")}
          </p>
        </div>

        <div className="md:col-span-7 col-divider md:pl-8">
          <div className="space-y-0">
            <div className="py-6 border-b border-border">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">E-post</span>
              <a href={`mailto:${email}`} className="font-display text-xl md:text-2xl text-foreground hover:text-red-ink transition-colors">
                {email}
              </a>
            </div>

            <div className="py-6 border-b border-border">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Telefon</span>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-display text-xl md:text-2xl text-foreground hover:text-red-ink transition-colors">
                {phone}
              </a>
              <span className="font-body text-xs text-muted-foreground ml-2">{t("contact", "phone_note", "(efter kl. 18)")}</span>
            </div>

            <div className="py-6">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Besöksadress</span>
              <a
                href="https://goo.gl/maps/RZqWc1zXuBhg8gYg8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl md:text-2xl text-foreground hover:text-red-ink transition-colors"
              >
                {address}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
