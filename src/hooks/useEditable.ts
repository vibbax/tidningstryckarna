import { usePageContent } from "./usePageContent";

/**
 * Returns a getter function that reads from DB content with static fallback.
 * Usage: const t = useEditable("home"); t("hero", "title", "Fallback text")
 */
export const useEditable = (pageSlug: string) => {
  const { data: content } = usePageContent(pageSlug);

  return (sectionKey: string, fieldKey: string, fallback: string): string => {
    return content?.[sectionKey]?.[fieldKey] || fallback;
  };
};
