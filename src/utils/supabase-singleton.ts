import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Hardcoded values to ensure consistency
const SUPABASE_URL = "https://prchqgbqfpqittpmxsdn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByY2hxZ2JxZnBxaXR0cG14c2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNjM3NDgsImV4cCI6MjA2NzkzOTc0OH0.B-03iEzphKoRk6V-hRZYPTh3t13RmPHJGPrSh0fD7dQ";

// Create a singleton instance
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    console.log('Creating new Supabase client instance with URL:', SUPABASE_URL);
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } else {
    console.log('Using existing Supabase client instance');
  }
  
  return supabaseInstance;
};

// Export the singleton instance
export const supabase = getSupabaseClient();