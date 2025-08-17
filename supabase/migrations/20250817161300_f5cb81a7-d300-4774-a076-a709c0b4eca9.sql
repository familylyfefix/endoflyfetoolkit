-- Fix the critical security vulnerability in purchase_sessions table
-- The current policy allows unrestricted access (condition: true)
-- We need to restrict access so users can only see their own purchase sessions

-- Drop the existing insecure policy
DROP POLICY IF EXISTS "Users can view purchase sessions by email" ON public.purchase_sessions;

-- Create a secure policy that only allows users to view their own purchase sessions
-- Users can only see purchase sessions where the customer_email matches their authenticated email
CREATE POLICY "Users can view their own purchase sessions" 
ON public.purchase_sessions 
FOR SELECT 
USING (
  auth.email() = customer_email
);

-- Keep the service role policy for administrative functions
-- (This policy already exists and should remain unchanged)