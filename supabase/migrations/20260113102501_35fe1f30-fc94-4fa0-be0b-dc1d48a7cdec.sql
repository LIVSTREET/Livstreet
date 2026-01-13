-- Drop existing SELECT policy that only allows published
DROP POLICY IF EXISTS "Anyone can read published symbols" ON public.symbols;

-- Create a policy that allows reading ALL symbols (for admin access in v1)
CREATE POLICY "Anyone can read all symbols"
  ON public.symbols FOR SELECT
  USING (true);