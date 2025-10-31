-- Create waitlist table for email collection
CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  referral_source text,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert their email (public signup)
CREATE POLICY "Anyone can sign up for waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anyone to read (for duplicate checking)
CREATE POLICY "Anyone can read waitlist"
  ON public.waitlist
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- Add comment
COMMENT ON TABLE public.waitlist IS 'Stores email addresses for End-Of-Lyfe Playbook launch waitlist';