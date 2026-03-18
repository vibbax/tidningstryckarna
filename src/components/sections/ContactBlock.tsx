interface ContactField {
  label: string;
  value: string;
  href?: string;
  note?: string;
  external?: boolean;
}

interface ContactBlockProps {
  dateline?: string;
  title: string;
  intro?: string;
  fields: ContactField[];
}

const ContactBlock = ({ dateline, title, intro, fields }: ContactBlockProps) => {
  return (
    <section className="container py-12 md:py-20">
      <div className="grid md:grid-cols-12 gap-8 md:gap-0">
        <div className="md:col-span-5 md:pr-8">
          {dateline && (
            <div className="rule-double mb-4">
              <span className="dateline">{dateline}</span>
            </div>
          )}
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-[1] mb-4">
            {title}
          </h2>
          {intro && (
            <p className="font-body text-sm text-ink-mid leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        <div className="md:col-span-7 col-divider md:pl-8">
          <div className="space-y-0">
            {fields.map((field, i) => (
              <div
                key={i}
                className={`py-6 ${i < fields.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                  {field.label}
                </span>
                {field.href ? (
                  <a
                    href={field.href}
                    target={field.external ? "_blank" : undefined}
                    rel={field.external ? "noopener noreferrer" : undefined}
                    className="font-display text-xl md:text-2xl text-foreground hover:text-red-ink transition-colors"
                  >
                    {field.value}
                  </a>
                ) : (
                  <span className="font-display text-xl md:text-2xl text-foreground">
                    {field.value}
                  </span>
                )}
                {field.note && (
                  <span className="font-body text-xs text-muted-foreground ml-2">
                    {field.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBlock;
