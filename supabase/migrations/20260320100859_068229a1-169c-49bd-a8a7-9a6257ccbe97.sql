
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  menu_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Anyone can read visible pages
CREATE POLICY "Anyone can read pages" ON public.pages
  FOR SELECT TO public USING (true);

-- Admins can manage pages
CREATE POLICY "Admins can insert pages" ON public.pages
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update pages" ON public.pages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete pages" ON public.pages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed the existing pages
INSERT INTO public.pages (slug, title, menu_order) VALUES
  ('home', 'Hem', 0),
  ('om-oss', 'Om oss', 1),
  ('prepress', 'Prepress', 2),
  ('miljo', 'Miljö', 3),
  ('kontakt', 'Kontakt', 4);
