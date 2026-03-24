interface GalleryImage {
  url: string;
  caption?: string;
}

interface GalleryBlockProps {
  dateline?: string;
  title: string;
  intro?: string;
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

const GalleryBlock = ({
  dateline,
  title,
  intro,
  images,
  columns = 3,
}: GalleryBlockProps) => {
  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-2 md:grid-cols-3";

  return (
    <section className="container py-10 md:py-16">
      {dateline && (
        <div className="rule-top mb-4">
          <span className="dateline">{dateline}</span>
        </div>
      )}

      <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.1] mb-4">
        {title}
      </h2>

      {intro && (
        <p className="font-body text-sm text-ink-mid leading-[1.8] max-w-2xl mb-8">
          {intro}
        </p>
      )}

      <div className={`grid ${colClass} gap-4`}>
        {images.map((img, i) => (
          <div key={i} className="group">
            <div className="overflow-hidden">
              <img
                src={img.url}
                alt={img.caption || `Bild ${i + 1}`}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {img.caption && (
              <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-2">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-b border-border mt-10 md:mt-16" />
    </section>
  );
};

export default GalleryBlock;
