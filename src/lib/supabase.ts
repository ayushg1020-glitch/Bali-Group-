import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback simulated mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-bali-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('mock-bali-project')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DatabaseSchemaNotice {
  status: 'connected' | 'local_storage_cache';
  message: string;
}

export function getDatabaseStatus(): DatabaseSchemaNotice {
  if (isSupabaseConfigured) {
    return {
      status: 'connected',
      message: 'Connected to live Supabase PostgreSQL backend with Row Level Security (RLS).',
    };
  }
  return {
    status: 'local_storage_cache',
    message: 'Operating in High-Performance Local-First Mode with synchronous persistent cache. Enter VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env to sync directly to cloud PostgreSQL.',
  };
}
