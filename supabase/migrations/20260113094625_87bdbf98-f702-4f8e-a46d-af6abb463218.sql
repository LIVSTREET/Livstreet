-- Create symbols table
CREATE TABLE IF NOT EXISTS public.symbols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  file_type TEXT NOT NULL DEFAULT 'png' CHECK (file_type IN ('png', 'svg')),
  stroke_only BOOLEAN DEFAULT false,
  preview_url TEXT,
  source_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_symbols_status ON public.symbols(status);
CREATE INDEX IF NOT EXISTS idx_symbols_category ON public.symbols(category);
CREATE INDEX IF NOT EXISTS idx_symbols_tags ON public.symbols USING GIN(tags);

-- Enable RLS
ALTER TABLE public.symbols ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published symbols
CREATE POLICY "Anyone can read published symbols"
  ON public.symbols FOR SELECT
  USING (status = 'published');

-- Policy: Allow all operations for now (v1 - no auth yet)
CREATE POLICY "Allow all operations for insert"
  ON public.symbols FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all operations for update"
  ON public.symbols FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for delete"
  ON public.symbols FOR DELETE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_symbols_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_symbols_updated_at 
  BEFORE UPDATE ON public.symbols
  FOR EACH ROW EXECUTE FUNCTION public.update_symbols_updated_at_column();

-- Create storage bucket for symbols
INSERT INTO storage.buckets (id, name, public)
VALUES ('symbols', 'symbols', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for symbols bucket
CREATE POLICY "Anyone can view symbol files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'symbols');

CREATE POLICY "Anyone can upload symbol files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'symbols');

CREATE POLICY "Anyone can update symbol files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'symbols');

CREATE POLICY "Anyone can delete symbol files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'symbols');