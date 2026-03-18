
-- Create table for editable page content
CREATE TABLE public.page_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (page_slug, section_key)
);

-- Enable RLS
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- Everyone can read page content
CREATE POLICY "Anyone can read page content"
  ON public.page_contents FOR SELECT USING (true);

-- Create user roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Only admins can modify page content
CREATE POLICY "Admins can insert page content"
  ON public.page_contents FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update page content"
  ON public.page_contents FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete page content"
  ON public.page_contents FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can read roles
CREATE POLICY "Admins can read roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_page_contents_updated_at
  BEFORE UPDATE ON public.page_contents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
