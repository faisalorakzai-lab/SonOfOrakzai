import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-anon-key";

export const supabase = createClient(
  supabaseUrl || PLACEHOLDER_URL,
  supabaseAnonKey || PLACEHOLDER_KEY
);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export type Member = {
  id: number;
  name: string;
  father_name: string;
  cnic: string;
  phone: string;
  email: string;
  location: string;
  profession: string;
  skills: string;
  interest: string;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
};
