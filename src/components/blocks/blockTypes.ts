export interface BlockDef {
  id: string;
  type: BlockType;
  section_key: string;
}

export type BlockType = "hero" | "text_with_image" | "numbered_list" | "contact" | "gallery";

export interface BlockFieldDef {
  key: string;
  label: string;
  type?: "text" | "multiline" | "image" | "link" | "select" | "images";
  options?: { value: string; label: string }[];
}

export interface BlockTypeMeta {
  label: string;
  icon: string;
  fields: BlockFieldDef[];
}

export const BLOCK_TYPE_META: Record<BlockType, BlockTypeMeta> = {
  hero: {
    label: "Hero",
    icon: "📰",
    fields: [
      { key: "dateline", label: "Dateline" },
      { key: "title_line1", label: "Rubrik rad 1" },
      { key: "title_line2", label: "Rubrik rad 2 (kursiv)" },
      { key: "title_line3", label: "Rubrik rad 3" },
      { key: "subtitle", label: "Underrubrik", type: "multiline" },
      { key: "cta", label: "Knapptext" },
      { key: "cta_link", label: "Knapplänk", type: "link" },
      { key: "image", label: "Herobild", type: "image" },
      { key: "image_caption", label: "Bildtext" },
    ],
  },
  text_with_image: {
    label: "Text med bild",
    icon: "🖼️",
    fields: [
      { key: "dateline", label: "Dateline" },
      { key: "title", label: "Rubrik" },
      { key: "text1", label: "Brödtext stycke 1", type: "multiline" },
      { key: "text2", label: "Brödtext stycke 2", type: "multiline" },
      { key: "image", label: "Bild", type: "image" },
      { key: "image_caption", label: "Bildtext" },
      { key: "image_position", label: "Bildposition", type: "select", options: [{ value: "left", label: "Vänster" }, { value: "right", label: "Höger" }] },
      { key: "stat1_number", label: "Statistik 1 siffra" },
      { key: "stat1_label", label: "Statistik 1 etikett" },
      { key: "stat2_number", label: "Statistik 2 siffra" },
      { key: "stat2_label", label: "Statistik 2 etikett" },
    ],
  },
  numbered_list: {
    label: "Tjänster / lista",
    icon: "📋",
    fields: [
      { key: "dateline", label: "Dateline" },
      { key: "title", label: "Rubrik" },
      { key: "intro", label: "Intro", type: "multiline" },
      { key: "item1_title", label: "Punkt 1 titel" },
      { key: "item1_desc", label: "Punkt 1 beskrivning", type: "multiline" },
      { key: "item2_title", label: "Punkt 2 titel" },
      { key: "item2_desc", label: "Punkt 2 beskrivning", type: "multiline" },
      { key: "item3_title", label: "Punkt 3 titel" },
      { key: "item3_desc", label: "Punkt 3 beskrivning", type: "multiline" },
      { key: "item4_title", label: "Punkt 4 titel" },
      { key: "item4_desc", label: "Punkt 4 beskrivning", type: "multiline" },
      { key: "invert_colors", label: "Inverterade färger (ja/nej)" },
    ],
  },
  contact: {
    label: "Kontakt",
    icon: "✉️",
    fields: [
      { key: "dateline", label: "Dateline" },
      { key: "title", label: "Rubrik" },
      { key: "intro", label: "Intro" },
      { key: "email", label: "E-post" },
      { key: "phone", label: "Telefon" },
      { key: "phone_note", label: "Telefon-anteckning" },
      { key: "address", label: "Besöksadress" },
      { key: "map_link", label: "Kartlänk", type: "link" },
    ],
  },
  gallery: {
    label: "Bildgalleri",
    icon: "🖼️",
    fields: [
      { key: "dateline", label: "Dateline" },
      { key: "title", label: "Rubrik" },
      { key: "intro", label: "Intro", type: "multiline" },
      { key: "columns", label: "Kolumner", type: "select", options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }] },
      { key: "image1", label: "Bild 1", type: "image" },
      { key: "image1_caption", label: "Bildtext 1" },
      { key: "image2", label: "Bild 2", type: "image" },
      { key: "image2_caption", label: "Bildtext 2" },
      { key: "image3", label: "Bild 3", type: "image" },
      { key: "image3_caption", label: "Bildtext 3" },
      { key: "image4", label: "Bild 4", type: "image" },
      { key: "image4_caption", label: "Bildtext 4" },
      { key: "image5", label: "Bild 5", type: "image" },
      { key: "image5_caption", label: "Bildtext 5" },
      { key: "image6", label: "Bild 6", type: "image" },
      { key: "image6_caption", label: "Bildtext 6" },
    ],
  },
};

export const DEFAULT_LAYOUTS: Record<string, BlockDef[]> = {
  home: [
    { id: "hero-1", type: "hero", section_key: "hero" },
    { id: "about-1", type: "text_with_image", section_key: "about" },
    { id: "services-1", type: "numbered_list", section_key: "services" },
    { id: "environment-1", type: "text_with_image", section_key: "environment" },
    { id: "contact-1", type: "contact", section_key: "contact" },
  ],
};

export const generateBlockId = (type: BlockType): string =>
  `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
