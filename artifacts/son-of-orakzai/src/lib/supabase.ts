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

export type StorySubmission = {
  id: string;
  name: string;
  email: string | null;
  story: string;
  consent: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  reviewed_at: string | null;
};

export type MigrantApplication = {
  id: string;
  application_number: string;
  tracking_token: string;
  full_name: string;
  parent_name: string;
  dob: string;
  gender: string;
  nationality: string;
  identity_number: string | null;
  current_country: string;
  current_city: string;
  origin_district: string;
  employment_status: string;
  occupation: string;
  emergency_contact: string;
  family_info: string | null;
  package_id: string;
  payment_method: string;
  transaction_reference: string;
  profile_photo_path: string | null;
  receipt_path: string | null;
  status: "submitted" | "under_review" | "payment_verification" | "approved" | "rejected";
  payment_status: "not_submitted" | "verification_pending" | "verified" | "rejected";
  internal_notes: string | null;
  requested_documents: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
};
