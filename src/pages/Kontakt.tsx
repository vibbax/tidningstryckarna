import PageLayout from "@/components/PageLayout";

const contacts = [
  {
    role: "VD/CEO",
    name: "Michael Terry",
    phone: "+358 18 26675",
    mobile: "+358 457 002 6675",
    email: "michaelt@tryckarna.com",
  },
  {
    role: "Prepress",
    name: null,
    phone: "+358 18 26669",
    mobile: null,
    email: "tidningstryckarna@tryckarna.com",
  },
  {
    role: "IT/Data/Distribution",
    name: "Tommy Ericsson",
    phone: "+358 457 343 4720",
    mobile: null,
    email: "tommye@tryckarna.com",
  },
  {
    role: "Press",
    name: "Jarkko Ritjärvi",
    phone: "+358 400 358 024",
    mobile: null,
    email: "tidningstryckarna@tryckarna.com",
  },
  {
    role: "Grafisk support",
    name: "Rebecka Thyrén",
    phone: null,
    mobile: null,
    email: "rebeckat@tryckarna.com",
  },
];

const Kontakt = () => {
  return (
    <PageLayout>
      {/* Page header */}
      <div className="container pt-8 md:pt-12">
        <div className="border-b-[3px] border-double border-foreground pb-6 mb-10">
          <span className="dateline">Vi finns här</span>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95] tracking-tight mt-3">
            Kontakta <span className="italic">oss</span>
          </h1>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-0">
          {/* Left — address + company info */}
          <div className="md:col-span-4 md:pr-8">
            <div className="rule-top mb-4">
              <span className="dateline">Adress</span>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground block mb-1">Besöksadress</span>
                <p className="font-body text-sm text-foreground">Vikingagränd 2A, Mariehamn</p>
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground block mb-1">Postadress</span>
                <p className="font-body text-sm text-foreground">TidningsTryckarna på Åland Ab</p>
                <p className="font-body text-sm text-foreground">PB 50</p>
                <p className="font-body text-sm text-foreground">AX-22101 Mariehamn, Åland</p>
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground block mb-1">Växel</span>
                <a href="tel:+35818260260" className="font-body text-sm text-foreground hover:text-red-ink transition-colors">
                  +358 18 26026
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="rule-top mb-4">
                <span className="dateline">Bank & FO-nummer</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "IBAN", value: "FI06 6601 0001 1033 24" },
                  { label: "BIC", value: "AABAFI22" },
                  { label: "FO-nummer", value: "0682615-3" },
                  { label: "VAT", value: "FI06826153" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{item.label}</span>
                    <span className="font-mono text-xs text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — contact persons */}
          <div className="md:col-span-8 col-divider md:pl-8">
            <div className="rule-top mb-6">
              <span className="dateline">Kontaktpersoner</span>
            </div>

            <div className="space-y-0">
              {contacts.map((c) => (
                <div key={c.role} className="grid md:grid-cols-3 gap-2 md:gap-4 py-5 border-b border-border">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-red-ink font-medium">{c.role}</span>
                    {c.name && <p className="font-display text-lg text-foreground mt-1">{c.name}</p>}
                  </div>
                  <div className="flex flex-col justify-center">
                    {c.phone && (
                      <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="font-body text-sm text-ink-mid hover:text-red-ink transition-colors">
                        {c.phone}
                      </a>
                    )}
                    {c.mobile && (
                      <a href={`tel:${c.mobile.replace(/\s/g, '')}`} className="font-body text-xs text-muted-foreground hover:text-red-ink transition-colors mt-0.5">
                        Mobil: {c.mobile}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center">
                    <a href={`mailto:${c.email}`} className="font-body text-sm text-ink-mid hover:text-red-ink transition-colors break-all">
                      {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Map link */}
            <div className="mt-8">
              <a
                href="https://goo.gl/maps/RZqWc1zXuBhg8gYg8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-background font-body text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-red-ink transition-colors"
              >
                Visa på karta
                <span className="text-lg leading-none">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Kontakt;
