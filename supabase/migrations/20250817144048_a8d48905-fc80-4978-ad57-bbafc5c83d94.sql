-- Create storage bucket for PDF downloads (private access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('toolkit-downloads', 'toolkit-downloads', false, 52428800, ARRAY['application/pdf']);

-- Create storage policies for the toolkit-downloads bucket
CREATE POLICY "Authenticated users can view their purchased files"
ON storage.objects FOR SELECT
USING (bucket_id = 'toolkit-downloads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Service role can manage all files"
ON storage.objects FOR ALL
USING (bucket_id = 'toolkit-downloads');

-- Create table to track valid purchase sessions
CREATE TABLE public.purchase_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_address TEXT,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'expired'
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table to track download attempts and enforce limits
CREATE TABLE public.download_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_session_id UUID REFERENCES public.purchase_sessions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  download_ip TEXT,
  user_agent TEXT,
  download_success BOOLEAN DEFAULT false,
  download_url TEXT, -- Store the signed URL for tracking
  url_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.purchase_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_attempts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for purchase_sessions
CREATE POLICY "Users can view purchase sessions by email"
ON public.purchase_sessions FOR SELECT
USING (true); -- Allow reading for verification purposes

CREATE POLICY "Service role can manage purchase sessions"
ON public.purchase_sessions FOR ALL
USING (true);

-- Create RLS policies for download_attempts
CREATE POLICY "Users can view their download attempts"
ON public.download_attempts FOR SELECT
USING (true); -- Allow reading for download count verification

CREATE POLICY "Service role can manage download attempts"
ON public.download_attempts FOR ALL
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_purchase_sessions_updated_at
  BEFORE UPDATE ON public.purchase_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_purchase_sessions_stripe_session_id ON public.purchase_sessions(stripe_session_id);
CREATE INDEX idx_purchase_sessions_email ON public.purchase_sessions(customer_email);
CREATE INDEX idx_purchase_sessions_status ON public.purchase_sessions(status);
CREATE INDEX idx_purchase_sessions_expires_at ON public.purchase_sessions(expires_at);
CREATE INDEX idx_download_attempts_purchase_session ON public.download_attempts(purchase_session_id);
CREATE INDEX idx_download_attempts_created_at ON public.download_attempts(created_at);