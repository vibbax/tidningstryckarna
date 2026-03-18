import { useEditable } from "@/hooks/useEditable";
import { usePageLayout } from "@/hooks/usePageLayout";
import { BlockDef, DEFAULT_LAYOUTS } from "./blockTypes";
import HeroBlock from "@/components/sections/HeroBlock";
import TextWithImageBlock from "@/components/sections/TextWithImageBlock";
import NumberedListBlock from "@/components/sections/NumberedListBlock";
import ContactBlock from "@/components/sections/ContactBlock";

const HeroRenderer = ({ pageSlug, sectionKey }: { pageSlug: string; sectionKey: string }) => {
  const t = useEditable(pageSlug);
  const s = (field: string, fallback: string) => t(sectionKey, field, fallback);

  return (
    <HeroBlock
      dateline={s("dateline", "")}
      titleLine1={s("title_line1", "Rubrik")}
      titleLine2={s("title_line2", "")}
      titleLine3={s("title_line3", "")}
      subtitle={s("subtitle", "")}
      ctaText={s("cta", "")}
      ctaLink={s("cta_link", "")}
      imageUrl={s("image", "")}
      imageAlt="Hero"
      imageCaption={s("image_caption", "")}
    />
  );
};

const TextWithImageRenderer = ({ pageSlug, sectionKey }: { pageSlug: string; sectionKey: string }) => {
  const t = useEditable(pageSlug);
  const s = (field: string, fallback: string) => t(sectionKey, field, fallback);

  const texts = [s("text1", ""), s("text2", "")].filter(Boolean);
  const imagePosition = (s("image_position", "right") as "left" | "right") || "right";
  const stats = [];
  if (s("stat1_number", "")) {
    stats.push({ value: s("stat1_number", ""), label: s("stat1_label", "") });
  }
  if (s("stat2_number", "")) {
    stats.push({ value: s("stat2_number", ""), label: s("stat2_label", "") });
  }

  return (
    <TextWithImageBlock
      dateline={s("dateline", "")}
      title={s("title", "Rubrik")}
      texts={texts.length > 0 ? texts : ["Lägg till text..."]}
      imageUrl={s("image", "")}
      imageAlt={s("title", "")}
      imageCaption={s("image_caption", "")}
      imagePosition={imagePosition}
      stats={stats.length > 0 ? stats : undefined}
      dropCap={imagePosition === "right"}
      dividerStyle="single"
    />
  );
};

const NumberedListRenderer = ({ pageSlug, sectionKey }: { pageSlug: string; sectionKey: string }) => {
  const t = useEditable(pageSlug);
  const s = (field: string, fallback: string) => t(sectionKey, field, fallback);

  const items = [];
  for (let i = 1; i <= 4; i++) {
    const title = s(`item${i}_title`, "");
    if (title) {
      items.push({
        number: String(i).padStart(2, "0"),
        title,
        description: s(`item${i}_desc`, ""),
      });
    }
  }

  const invertColors = s("invert_colors", "ja").toLowerCase() !== "nej";

  return (
    <NumberedListBlock
      dateline={s("dateline", "")}
      title={s("title", "Rubrik")}
      intro={s("intro", "")}
      items={items.length > 0 ? items : [{ number: "01", title: "Punkt 1", description: "Beskrivning" }]}
      invertColors={invertColors}
    />
  );
};

const ContactRenderer = ({ pageSlug, sectionKey }: { pageSlug: string; sectionKey: string }) => {
  const t = useEditable(pageSlug);
  const s = (field: string, fallback: string) => t(sectionKey, field, fallback);

  const email = s("email", "");
  const phone = s("phone", "");
  const address = s("address", "");
  const mapLink = s("map_link", "");

  const fields = [];
  if (email) fields.push({ label: "E-post", value: email, href: `mailto:${email}` });
  if (phone) fields.push({ label: "Telefon", value: phone, href: `tel:${phone.replace(/\s/g, "")}`, note: s("phone_note", "") });
  if (address) fields.push({ label: "Besöksadress", value: address, href: mapLink || undefined, external: true });

  return (
    <ContactBlock
      dateline={s("dateline", "")}
      title={s("title", "Kontakt")}
      intro={s("intro", "")}
      fields={fields.length > 0 ? fields : [{ label: "E-post", value: "info@example.com", href: "mailto:info@example.com" }]}
    />
  );
};

const RENDERERS: Record<string, React.FC<{ pageSlug: string; sectionKey: string }>> = {
  hero: HeroRenderer,
  text_with_image: TextWithImageRenderer,
  numbered_list: NumberedListRenderer,
  contact: ContactRenderer,
};

interface BlockRendererProps {
  pageSlug: string;
  fallbackBlocks?: BlockDef[];
}

const BlockRenderer = ({ pageSlug, fallbackBlocks }: BlockRendererProps) => {
  const { data: blocks, isLoading } = usePageLayout(pageSlug);

  const activeBlocks = blocks && blocks.length > 0
    ? blocks
    : fallbackBlocks || DEFAULT_LAYOUTS[pageSlug] || [];

  if (isLoading) return null;

  return (
    <>
      {activeBlocks.map((block) => {
        const Renderer = RENDERERS[block.type];
        if (!Renderer) return null;
        return <Renderer key={block.id} pageSlug={pageSlug} sectionKey={block.section_key} />;
      })}
    </>
  );
};

export default BlockRenderer;
