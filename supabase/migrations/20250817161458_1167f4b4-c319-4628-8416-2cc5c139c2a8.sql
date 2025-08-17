-- Fix the security vulnerability in download_attempts table
-- Current policy allows all users to view all download attempts (condition: true)
-- We need to restrict access so users can only see their own download attempts

-- Drop the existing insecure policy
DROP POLICY IF EXISTS "Users can view their download attempts" ON public.download_attempts;

-- Create a secure policy that only allows users to view download attempts for their own purchases
-- Users can only see download attempts linked to their own purchase sessions
CREATE POLICY "Users can view their own download attempts" 
ON public.download_attempts 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.purchase_sessions 
    WHERE purchase_sessions.id = download_attempts.purchase_session_id 
    AND purchase_sessions.customer_email = auth.email()
  )
);

-- Keep the service role policy for administrative functions unchanged
-- (This policy already exists and should remain for backend operations)