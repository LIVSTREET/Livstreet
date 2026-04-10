
-- Create plate_gallery_images table
CREATE TABLE public.plate_gallery_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text,
  alt_text text NOT NULL,
  image_url text NOT NULL,
  storage_path text NOT NULL,
  width integer,
  height integer,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.plate_gallery_images ENABLE ROW LEVEL SECURITY;

-- Public can read published images
CREATE POLICY "Anyone can view published gallery images"
ON public.plate_gallery_images
FOR SELECT
USING (is_published = true);

-- Admins full CRUD
CREATE POLICY "Admins can view all gallery images"
ON public.plate_gallery_images
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert gallery images"
ON public.plate_gallery_images
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
ON public.plate_gallery_images
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON public.plate_gallery_images
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_plate_gallery_images_updated_at
BEFORE UPDATE ON public.plate_gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Create public storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('plate-gallery', 'plate-gallery', true);

-- Storage policies
CREATE POLICY "Anyone can view gallery files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'plate-gallery');

CREATE POLICY "Admins can upload gallery files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'plate-gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'plate-gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'plate-gallery' AND public.has_role(auth.uid(), 'admin'));
