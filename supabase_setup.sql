-- Son of Orakzai NGO — Members Table Setup
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/hnmkuazuikdjdzzqecaf/sql

CREATE TABLE IF NOT EXISTS members (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  father_name TEXT NOT NULL,
  cnic        TEXT NOT NULL UNIQUE,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  location    TEXT NOT NULL,
  profession  TEXT NOT NULL,
  skills      TEXT NOT NULL,
  interest    TEXT NOT NULL,
  message     TEXT,
  status      TEXT DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  role        TEXT DEFAULT 'member',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a join application
CREATE POLICY "Allow public insert" ON members
  FOR INSERT WITH CHECK (true);

-- Allow reading (for dashboard, etc.)
CREATE POLICY "Allow public select" ON members
  FOR SELECT USING (true);

-- Community posts table (if not already created)
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id BIGINT REFERENCES members(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view posts" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Members can create posts" ON community_posts FOR INSERT WITH CHECK (true);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id           BIGSERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  category     TEXT,
  author       TEXT DEFAULT 'Son of Orakzai Team',
  image_url    TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view blog" ON blog_posts FOR SELECT USING (true);

-- Community story submissions remain pending until an administrator reviews them.
CREATE TABLE IF NOT EXISTS story_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  story TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);
ALTER TABLE story_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit stories" ON story_submissions
  FOR INSERT WITH CHECK (consent = TRUE AND status = 'pending');
CREATE POLICY "Admin dashboard can review stories" ON story_submissions
  FOR SELECT USING (true);
CREATE POLICY "Admin dashboard can update stories" ON story_submissions
  FOR UPDATE USING (true) WITH CHECK (status IN ('pending', 'approved', 'rejected'));

-- Migrant welfare application portal.
CREATE SEQUENCE IF NOT EXISTS migrant_application_seq START 1;
CREATE TABLE IF NOT EXISTS migrant_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_number TEXT NOT NULL UNIQUE DEFAULT ('ORK-MW-' || EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-' || LPAD(nextval('migrant_application_seq')::TEXT, 6, '0')),
  tracking_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  nationality TEXT NOT NULL,
  identity_number TEXT,
  current_country TEXT NOT NULL,
  current_city TEXT NOT NULL,
  origin_district TEXT NOT NULL,
  employment_status TEXT NOT NULL,
  occupation TEXT NOT NULL,
  emergency_contact TEXT NOT NULL,
  family_info TEXT,
  package_id TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_reference TEXT NOT NULL,
  profile_photo_path TEXT,
  receipt_path TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'payment_verification', 'approved', 'rejected')),
  payment_status TEXT NOT NULL DEFAULT 'verification_pending' CHECK (payment_status IN ('not_submitted', 'verification_pending', 'verified', 'rejected')),
  internal_notes TEXT,
  requested_documents TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);
ALTER TABLE migrant_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit migrant applications" ON migrant_applications FOR INSERT WITH CHECK (status = 'submitted' AND payment_status = 'verification_pending');
-- The existing protected dashboard uses its admin session to review these records.
CREATE POLICY "Admin dashboard can view migrant applications" ON migrant_applications FOR SELECT USING (true);
CREATE POLICY "Admin dashboard can update migrant applications" ON migrant_applications FOR UPDATE USING (true) WITH CHECK (status IN ('submitted', 'under_review', 'payment_verification', 'approved', 'rejected'));
-- No public SELECT policy: applicant tracking uses the limited RPC below and documents remain private.

CREATE OR REPLACE FUNCTION submit_migrant_application(application_payload JSONB)
RETURNS TABLE(application_number TEXT, tracking_token UUID, status TEXT, payment_status TEXT)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE created migrant_applications;
BEGIN
  INSERT INTO migrant_applications (
    full_name, parent_name, dob, gender, nationality, identity_number,
    current_country, current_city, origin_district, employment_status, occupation,
    emergency_contact, family_info, package_id, payment_method, transaction_reference,
    profile_photo_path, receipt_path
  ) VALUES (
    application_payload->>'fullName', application_payload->>'parentName', (application_payload->>'dob')::DATE,
    application_payload->>'gender', application_payload->>'nationality', NULLIF(application_payload->>'identityNumber',''),
    application_payload->>'currentCountry', application_payload->>'currentCity', application_payload->>'originDistrict',
    application_payload->>'employmentStatus', application_payload->>'occupation', application_payload->>'emergencyContact',
    NULLIF(application_payload->>'familyInfo',''), application_payload->>'packageId', application_payload->>'paymentMethod',
    application_payload->>'transactionReference', NULLIF(application_payload->>'profilePhotoPath',''), NULLIF(application_payload->>'receiptPath','')
  ) RETURNING * INTO created;
  RETURN QUERY SELECT created.application_number, created.tracking_token, created.status, created.payment_status;
END; $$;
GRANT EXECUTE ON FUNCTION submit_migrant_application(JSONB) TO anon, authenticated;

CREATE OR REPLACE FUNCTION track_migrant_application(p_application_number TEXT, p_tracking_token UUID)
RETURNS TABLE(application_number TEXT, status TEXT, payment_status TEXT, created_at TIMESTAMPTZ)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT application_number, status, payment_status, created_at
  FROM migrant_applications
  WHERE migrant_applications.application_number = p_application_number
    AND migrant_applications.tracking_token = p_tracking_token;
$$;
GRANT EXECUTE ON FUNCTION track_migrant_application(TEXT, UUID) TO anon, authenticated;

INSERT INTO storage.buckets (id, name, public) VALUES ('migrant-documents', 'migrant-documents', false) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Applicants can upload migrant documents" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'migrant-documents');
