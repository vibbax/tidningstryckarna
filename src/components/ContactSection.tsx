import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-20 md:py-28 bg-navy text-primary-foreground">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-amber font-semibold mb-3">Kontakt</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Hör av dig till oss
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <a
            href="mailto:tidningstryckarna@tryckarna.com"
            className="flex flex-col items-center text-center p-8 rounded-lg bg-navy-light/30 hover:bg-navy-light/50 transition-colors group"
          >
            <Mail className="w-8 h-8 text-amber mb-4" />
            <h3 className="font-display text-lg font-bold mb-2">E-post</h3>
            <p className="font-body text-sm text-primary-foreground/70 break-all">
              tidningstryckarna@tryckarna.com
            </p>
          </a>

          <a
            href="tel:+35818266690"
            className="flex flex-col items-center text-center p-8 rounded-lg bg-navy-light/30 hover:bg-navy-light/50 transition-colors group"
          >
            <Phone className="w-8 h-8 text-amber mb-4" />
            <h3 className="font-display text-lg font-bold mb-2">Telefon</h3>
            <p className="font-body text-sm text-primary-foreground/70">+358 18 26669</p>
            <p className="font-body text-xs text-primary-foreground/50 mt-1">(efter kl. 18)</p>
          </a>

          <a
            href="https://goo.gl/maps/RZqWc1zXuBhg8gYg8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-8 rounded-lg bg-navy-light/30 hover:bg-navy-light/50 transition-colors group"
          >
            <MapPin className="w-8 h-8 text-amber mb-4" />
            <h3 className="font-display text-lg font-bold mb-2">Besök oss</h3>
            <p className="font-body text-sm text-primary-foreground/70">Vikingagränd 2A</p>
            <p className="font-body text-sm text-primary-foreground/70">Mariehamn, Åland</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
