import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlockDef, DEFAULT_LAYOUTS } from "@/components/blocks/blockTypes";
import type { Json } from "@/integrations/supabase/types";

export const usePageLayout = (pageSlug: string) => {
  return useQuery({
    queryKey: ["page_layout", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_contents")
        .select("content")
        .eq("page_slug", pageSlug)
        .eq("section_key", "_layout")
        .maybeSingle();

      if (error) throw error;

      if (data?.content) {
        return (data.content as unknown as { blocks: BlockDef[] }).blocks || [];
      }

      // Return default layout if none stored
      return DEFAULT_LAYOUTS[pageSlug] || [];
    },
  });
};

export const useUpdatePageLayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ page_slug, blocks }: { page_slug: string; blocks: BlockDef[] }) => {
      const { error } = await supabase
        .from("page_contents")
        .upsert(
          {
            page_slug,
            section_key: "_layout",
            content: { blocks } as unknown as Json,
          },
          { onConflict: "page_slug,section_key" }
        );
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["page_layout", variables.page_slug] });
    },
  });
};
