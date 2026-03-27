
CREATE TABLE IF NOT EXISTS public.partnership_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  organization TEXT,
  title TEXT,
  type TEXT,
  phone TEXT,
  email TEXT,
  contacted BOOLEAN NOT NULL DEFAULT false,
  contact_method TEXT CHECK (contact_method IN ('email', 'phone', 'meeting')),
  status TEXT NOT NULL DEFAULT 'cold' CHECK (status IN ('cold', 'pending', 'warm')),
  last_contact_date TIMESTAMPTZ,
  follow_up_date TIMESTAMPTZ,
  next_step TEXT,
  archived BOOLEAN NOT NULL DEFAULT false,
  topic_price BOOLEAN NOT NULL DEFAULT false,
  topic_existing_supplier BOOLEAN NOT NULL DEFAULT false,
  topic_quality BOOLEAN NOT NULL DEFAULT false,
  topic_customization BOOLEAN NOT NULL DEFAULT false,
  topic_delivery BOOLEAN NOT NULL DEFAULT false,
  topic_commission BOOLEAN NOT NULL DEFAULT false,
  topic_exclusivity BOOLEAN NOT NULL DEFAULT false,
  topic_demo_interest BOOLEAN NOT NULL DEFAULT false,
  topic_wants_followup BOOLEAN NOT NULL DEFAULT false,
  their_needs TEXT,
  our_offer TEXT,
  notes TEXT
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS partnership_contacts_updated_at ON public.partnership_contacts;
CREATE TRIGGER partnership_contacts_updated_at
  BEFORE UPDATE ON public.partnership_contacts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.partnership_contacts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partnership_contacts' AND policyname = 'Admins can read partnership contacts') THEN
    CREATE POLICY "Admins can read partnership contacts" ON public.partnership_contacts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partnership_contacts' AND policyname = 'Admins can insert partnership contacts') THEN
    CREATE POLICY "Admins can insert partnership contacts" ON public.partnership_contacts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partnership_contacts' AND policyname = 'Admins can update partnership contacts') THEN
    CREATE POLICY "Admins can update partnership contacts" ON public.partnership_contacts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partnership_contacts' AND policyname = 'Admins can delete partnership contacts') THEN
    CREATE POLICY "Admins can delete partnership contacts" ON public.partnership_contacts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
