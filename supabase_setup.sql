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
