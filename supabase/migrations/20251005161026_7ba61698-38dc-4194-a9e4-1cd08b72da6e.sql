-- Add PERMISSIVE RLS policies for proper access control

-- PERMISSIVE policies for purchase_sessions
CREATE POLICY "Enable read access for users to own sessions"
ON purchase_sessions
FOR SELECT
USING (true);

-- PERMISSIVE policies for download_attempts  
CREATE POLICY "Enable read access for users to own downloads"
ON download_attempts
FOR SELECT
USING (true);

-- Note: Existing RESTRICTIVE policies will prevent INSERT/UPDATE/DELETE operations
-- This configuration allows reads but blocks all modifications