import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cturiwpzxiwxdmetanzp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXJpd3B6eGl3eGRtZXRhbnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDg4NTYsImV4cCI6MjA4NDY4NDg1Nn0.YCohUU28eQ1RaLBYMNKuH3plXeZyPyS_QAXRtDdLi9U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
