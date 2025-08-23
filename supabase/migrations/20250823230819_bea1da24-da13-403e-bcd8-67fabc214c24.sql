-- Fix security issue: Remove overly permissive RLS policy on purchase_sessions table
-- The "Service role can manage purchase sessions" policy with "true" condition allows ANY authenticated user
-- to INSERT, UPDATE, DELETE any row. Service role doesn't need RLS policies as it bypasses them entirely.

-- Drop the dangerous policy that allows anyone to modify purchase sessions
DROP POLICY IF EXISTS "Service role can manage purchase sessions" ON public.purchase_sessions;

-- Keep the existing SELECT policy for users to view their own sessions (this one is correct)
-- Policy "Users can view their own purchase sessions" already exists and is properly configured

-- Now let's ensure only the customer who owns the session can access their data
-- and all modifications happen through secure edge functions using service role

-- Add a policy to prevent any direct INSERT operations from clients
CREATE POLICY "No direct inserts allowed" ON public.purchase_sessions
FOR INSERT
WITH CHECK (false);

-- Add a policy to prevent any direct UPDATE operations from clients  
CREATE POLICY "No direct updates allowed" ON public.purchase_sessions
FOR UPDATE
USING (false);

-- Add a policy to prevent any direct DELETE operations from clients
CREATE POLICY "No direct deletes allowed" ON public.purchase_sessions
FOR DELETE
USING (false);

-- Let's also apply the same security fix to the download_attempts table
DROP POLICY IF EXISTS "Service role can manage download attempts" ON public.download_attempts;

-- Add policies to prevent direct modifications to download_attempts
CREATE POLICY "No direct inserts to download attempts" ON public.download_attempts
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No direct updates to download attempts" ON public.download_attempts
FOR UPDATE
USING (false);

CREATE POLICY "No direct deletes from download attempts" ON public.download_attempts
FOR DELETE
USING (false);

-- Add an index on customer_email for better performance of the SELECT policy
CREATE INDEX IF NOT EXISTS idx_purchase_sessions_customer_email ON public.purchase_sessions(customer_email);

-- Add an index on stripe_session_id for faster lookups by edge functions
CREATE INDEX IF NOT EXISTS idx_purchase_sessions_stripe_session_id ON public.purchase_sessions(stripe_session_id);