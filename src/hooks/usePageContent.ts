import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface PageSection {
  page_slug: string;
  section_key: string;
  content: Record<string, string>;
}

export const usePageContent = (pageSlug: string) => {
  return useQuery({
    queryKey: ["page_contents", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_contents")
        .select("*")
        .eq("page_slug", pageSlug);
      if (error) throw error;
      const map: Record<string, Record<string, string>> = {};
      data?.forEach((row) => {
        map[row.section_key] = row.content as Record<string, string>;
      });
      return map;
    },
  });
};

export const useUpdatePageContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ page_slug, section_key, content }: PageSection) => {
      const { error } = await supabase
        .from("page_contents")
        .upsert(
          { page_slug, section_key, content: content as unknown as Json },
          { onConflict: "page_slug,section_key" }
        );
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["page_contents", variables.page_slug] });
    },
  });
};
