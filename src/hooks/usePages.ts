import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageDef {
  id: string;
  slug: string;
  title: string;
  menu_order: number;
  visible: boolean;
}

export const usePages = () => {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("menu_order", { ascending: true });
      if (error) throw error;
      return data as PageDef[];
    },
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, title, menu_order }: { slug: string; title: string; menu_order: number }) => {
      const { error } = await supabase.from("pages").insert({ slug, title, menu_order });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.from("pages").delete().eq("slug", slug);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PageDef> & { id: string }) => {
      const { error } = await supabase.from("pages").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
};
