interface ListItem {
  number: string;
  title: string;
  description: string;
}

interface NumberedListBlockProps {
  dateline?: string;
  title: string;
  intro?: string;
  items: ListItem[];
  invertColors?: boolean;
}

const NumberedListBlock = ({
  dateline,
  title,
  intro,
  items,
  invertColors = true,
}: NumberedListBlockProps) => {
  const bg = invertColors ? "bg-foreground" : "";
  const text = invertColors ? "text-primary-foreground" : "text-foreground";
  const textMuted = invertColors ? "text-primary-foreground/50" : "text-muted-foreground";
  const textBody = invertColors ? "text-primary-foreground/60" : "text-ink-mid";
  const borderColor = invertColors ? "border-primary-foreground/20" : "border-border";
  const borderItemColor = invertColors ? "border-primary-foreground/10" : "border-border";
  const hoverBg = invertColors ? "hover:bg-primary-foreground/[0.03]" : "hover:bg-muted/50";

  return (
    <section className={bg}>
      <div className={`container py-12 md:py-20 ${text}`}>
        <div className="grid md:grid-cols-12 gap-6 md:gap-0 mb-12">
          <div className="md:col-span-5">
            {dateline && (
              <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${textMuted}`}>
                {dateline}
              </span>
            )}
            <h2 className={`font-display text-4xl md:text-5xl ${text} leading-[1] mt-3`}>
              {title}
            </h2>
          </div>
          {intro && (
            <div className="md:col-span-7 md:flex md:items-end">
              <p className={`font-body text-sm ${textBody} leading-relaxed max-w-md`}>
                {intro}
              </p>
            </div>
          )}
        </div>

        <div className={`border-t ${borderColor}`}>
          {items.map((item) => (
            <div
              key={item.number}
              className={`grid md:grid-cols-12 gap-4 md:gap-0 py-8 border-b ${borderItemColor} group ${hoverBg} transition-colors px-2 -mx-2`}
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-red-ink">{item.number}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className={`font-display text-2xl md:text-3xl ${text} group-hover:text-red-ink transition-colors`}>
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className={`font-body text-sm ${textBody} leading-relaxed`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumberedListBlock;
