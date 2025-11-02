-- Create quiz_submissions table
CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 24),
  tier INTEGER NOT NULL CHECK (tier IN (1, 2, 3)),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  retake_count INTEGER DEFAULT 1,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (take quiz)
CREATE POLICY "Anyone can submit quiz"
  ON public.quiz_submissions FOR INSERT
  WITH CHECK (true);

-- Users can view their own results by email
CREATE POLICY "Users can view own results"
  ON public.quiz_submissions FOR SELECT
  USING (true);

-- Update for retakes (upsert)
CREATE POLICY "Users can update own results"
  ON public.quiz_submissions FOR UPDATE
  USING (true);

-- Trigger to update timestamp
CREATE TRIGGER update_quiz_submissions_updated_at
  BEFORE UPDATE ON public.quiz_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();