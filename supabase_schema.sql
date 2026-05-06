-- Community Feed Schema for Son of Orakzai

-- 1. Profiles (Linking to existing members or creating a base for community users)
-- Assuming members table already exists from the current code analysis.
-- We might need to add a 'is_verified' and 'role' column if not present.
ALTER TABLE members ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE members ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member'; -- 'leadership', 'admin', 'member'
ALTER TABLE members ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Posts Table
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Likes Table
CREATE TABLE IF NOT EXISTS community_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- 4. Comments Table
CREATE TABLE IF NOT EXISTS community_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE community_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE community_comments;

-- RLS (Row Level Security) - Basic setup
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for now, assuming authenticated users can post/like/comment)
CREATE POLICY "Public can view posts" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Members can create posts" ON community_posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view likes" ON community_likes FOR SELECT USING (true);
CREATE POLICY "Members can toggle likes" ON community_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Members can remove their likes" ON community_likes FOR DELETE USING (true);

CREATE POLICY "Public can view comments" ON community_comments FOR SELECT USING (true);
CREATE POLICY "Members can create comments" ON community_comments FOR INSERT WITH CHECK (true);
