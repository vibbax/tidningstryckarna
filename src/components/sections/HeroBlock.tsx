import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface HeroBlockProps {
  dateline?: string;
  titleLine1: string;
  titleLine2?: string;
  titleLine3?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  children?: ReactNode;
}

const HeroBlock = ({
  dateline,
  titleLine1,
  titleLine2,
  titleLine3,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
  imageAlt = "",
  imageCaption,
  children,
}: HeroBlockProps) => {
  const renderCta = () => {
    if (!ctaText || !ctaLink) return null;

    const className =
      "inline-flex items-center gap-3 bg-foreground text-background font-body text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-red-ink transition-colors";

    if (ctaLink.startsWith("http")) {
      return (
        <a href={ctaLink} target="_blank" rel="noopener noreferrer" className={className}>
          {ctaText}
          <span className="text-lg leading-none">→</span>
        </a>
      );
    }

    return (
      <Link to={ctaLink} className={className}>
        {ctaText}
        <span className="text-lg leading-none">→</span>
      </Link>
    );
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="grid md:grid-cols-12 gap-6 md:gap-0">
        <div className="md:col-span-7 md:pr-8">
          {dateline && (
            <div className="rule-double mb-6">
              <span className="dateline">{dateline}</span>
            </div>
          )}

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[0.95] tracking-tight mb-6">
            {titleLine1}
            {titleLine2 && (
              <>
                {" "}
                <span className="italic text-red-ink">{titleLine2}</span>
              </>
            )}
            {titleLine3 && <> {titleLine3}</>}
          </h1>

          {subtitle && (
            <p className="font-body text-base md:text-lg text-ink-mid leading-relaxed max-w-lg mb-8">
              {subtitle}
            </p>
          )}

          {renderCta()}
          {children}
        </div>

        {imageUrl && (
          <div className="md:col-span-5 col-divider md:pl-8">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {imageCaption && (
              <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-2">
                {imageCaption}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="h-[2px] bg-foreground mt-8 md:mt-12" />
    </section>
  );
};

export default HeroBlock;
