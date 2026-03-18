import { ReactNode } from "react";

interface StatItem {
  value: string;
  label: string;
}

interface TextWithImageBlockProps {
  dateline?: string;
  title: string;
  texts: string[];
  imageUrl: string;
  imageAlt?: string;
  imageCaption?: string;
  imagePosition?: "left" | "right";
  imageAspect?: string;
  stats?: StatItem[];
  dropCap?: boolean;
  dividerStyle?: "single" | "double" | "none";
  children?: ReactNode;
}

const TextWithImageBlock = ({
  dateline,
  title,
  texts,
  imageUrl,
  imageAlt = "",
  imageCaption,
  imagePosition = "right",
  imageAspect = "aspect-[4/5]",
  stats,
  dropCap = false,
  dividerStyle = "single",
  children,
}: TextWithImageBlockProps) => {
  const imageBlock = (
    <div className={imagePosition === "right" ? "md:col-span-4 col-divider md:pl-8" : "md:col-span-7 md:pr-8"}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className={`w-full ${imageAspect} object-cover`}
      />
      {imageCaption && (
        <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-2">
          {imageCaption}
        </p>
      )}
    </div>
  );

  const textBlock = (
    <>
      <div className={imagePosition === "right" ? "md:col-span-4 md:pr-8" : "md:col-span-5 col-divider md:pl-8 flex flex-col justify-center"}>
        {dateline && (
          <div className="rule-top mb-4">
            <span className="dateline">{dateline}</span>
          </div>
        )}
        <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] mb-4">
          {title}
        </h2>

        {imagePosition === "right" && stats && stats.length > 0 && (
          <div className="flex gap-8 mt-6 pt-4 border-t border-border">
            {stats.map((stat, i) => (
              <div key={i}>
                <span className="font-display text-4xl text-red-ink">{stat.value}</span>
                <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {imagePosition === "left" && texts.map((text, i) => (
          <p
            key={i}
            className={`font-body text-sm ${i === 0 ? "text-foreground" : "text-ink-mid"} leading-[1.8] ${i > 0 ? "mt-4" : "mb-4"}`}
          >
            {text}
          </p>
        ))}

        {children}
      </div>

      {imagePosition === "right" && (
        <div className="md:col-span-4 col-divider md:px-8">
          {texts.map((text, i) => (
            <p
              key={i}
              className={`${i === 0 && dropCap ? "drop-cap " : ""}font-body text-sm ${i === 0 ? "text-foreground" : "text-ink-mid"} leading-[1.8] ${i > 0 ? "mt-4" : ""}`}
            >
              {text}
            </p>
          ))}
        </div>
      )}
    </>
  );

  const divider =
    dividerStyle === "double" ? (
      <div className="border-b-[3px] border-double border-foreground mt-10 md:mt-16" />
    ) : dividerStyle === "single" ? (
      <div className="border-b border-border mt-10 md:mt-16" />
    ) : null;

  return (
    <section className="container py-10 md:py-16">
      <div className="grid md:grid-cols-12 gap-6 md:gap-0">
        {imagePosition === "left" ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
      {divider}
    </section>
  );
};

export default TextWithImageBlock;
