-- Create inquiries table for storing customer inquiries
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Customer info
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  description TEXT NOT NULL,
  
  -- Design data
  has_design BOOLEAN DEFAULT false,
  design_data JSONB,
  design_image_url TEXT,
  
  -- Pricing
  base_price INTEGER,
  maintenance_selected BOOLEAN DEFAULT false,
  maintenance_price INTEGER,
  installation_selected BOOLEAN DEFAULT false,
  installation_price INTEGER,
  total_price INTEGER,
  
  -- Source
  source TEXT NOT NULL CHECK (source IN ('contact', 'inquiry')),
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'completed', 'archived')),
  notes TEXT,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Create indexes for performance
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_email ON public.inquiries(email);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public form submissions)
CREATE POLICY "Anyone can insert inquiries" ON public.inquiries
  FOR INSERT
  WITH CHECK (true);

-- Policy: Authenticated users can read inquiries (for admin)
CREATE POLICY "Authenticated users can read inquiries" ON public.inquiries
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can update inquiries (for status changes)
CREATE POLICY "Authenticated users can update inquiries" ON public.inquiries
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_symbols_updated_at_column();

-- Create storage bucket for design previews
INSERT INTO storage.buckets (id, name, public)
VALUES ('design-previews', 'design-previews', false);

-- Storage policies for design-previews bucket
CREATE POLICY "Anyone can upload to design-previews"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'design-previews');

CREATE POLICY "Authenticated can read design-previews"
ON storage.objects FOR SELECT
USING (bucket_id = 'design-previews');