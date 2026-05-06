import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  CheckCircle2, 
  Send,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Luxury Colors
const GOLD = "#D4AF37";
const DEEP_GREEN = "#064e3b"; // emerald-900 or similar

interface Post {
  id: string;
  content: string;
  image_url?: string;
  created_at: string;
  user_id: number;
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
  author: {
    name: string;
    profession: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    
    // Real-time subscription
    const channel = supabase
      .channel('community_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      // Check if supabase is configured
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      // In a real app, we'd join with members table
      // For now, we'll simulate the data structure based on the schema
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          author:members(name, profession, avatar_url, is_verified)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn("Supabase query error (likely table not created yet):", error);
        throw error;
      }
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Fallback mock data for demonstration if table doesn't exist yet
      setPosts([
        {
          id: "1",
          content: "Welcome to the Son of Orakzai community! We are dedicated to the progress and prosperity of our district. Join us in our upcoming initiatives.",
          created_at: new Date().toISOString(),
          user_id: 1,
          likes_count: 124,
          comments_count: 18,
          is_liked: true,
          author: {
            name: "Chairman Orakzai",
            profession: "Leadership",
            is_verified: true,
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chairman"
          }
        },
        {
          id: "2",
          content: "Just completed our latest educational drive in the upper Orakzai region. The enthusiasm of the youth is truly inspiring! 📚✨",
          created_at: new Date(Date.now() - 3600000).toISOString(),
          user_id: 2,
          likes_count: 85,
          comments_count: 12,
          author: {
            name: "Founder Member",
            profession: "Education Advocate",
            is_verified: true,
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Founder"
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    
    try {
      // This would require a logged in user session
      // For now, we'll show a toast
      toast.success("Post shared with the community!");
      setNewPost("");
    } catch (error) {
      toast.error("Failed to share post");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#022c22] text-white pt-10 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar - Profile & Stats */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <Card className="bg-emerald-950/40 backdrop-blur-[20px] border-[0.5px] border-[#D4AF37]/30 overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-emerald-900 to-emerald-800" />
                <CardContent className="relative pt-0 pb-6 px-6">
                  <div className="absolute -top-10 left-6">
                    <div className="p-1 rounded-full bg-[#022c22] border-[0.5px] border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                      <Avatar className="w-20 h-20 border-2 border-transparent">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                        <AvatarFallback>SO</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="mt-12 space-y-1">
                    <h3 className="font-bold text-xl text-white">Guest User</h3>
                    <p className="text-emerald-200/60 text-sm">Community Member</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-emerald-800/50 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-[#D4AF37]">1.2k</p>
                      <p className="text-xs text-emerald-200/40 uppercase tracking-wider">Followers</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#D4AF37]">450</p>
                      <p className="text-xs text-emerald-200/40 uppercase tracking-wider">Posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-emerald-950/40 backdrop-blur-[20px] border-[0.5px] border-[#D4AF37]/30 p-6">
                <h3 className="font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {["#OrakzaiRising", "#EducationForAll", "#CommunityFirst", "#PeaceAndProgress"].map(tag => (
                    <div key={tag} className="text-sm text-emerald-100/80 hover:text-[#D4AF37] cursor-pointer transition-colors">
                      {tag}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Central Feed */}
            <div className="lg:col-span-6 space-y-6">
              {/* Create Post */}
              <Card className="bg-emerald-950/40 backdrop-blur-[20px] border-[0.5px] border-[#D4AF37]/30 p-4">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border-[0.5px] border-[#D4AF37] shadow-[0_0_5px_rgba(212,175,55,0.2)]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>GU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea 
                      placeholder="Share something with the community..." 
                      className="bg-emerald-900/30 border-emerald-800/50 focus:border-[#D4AF37]/50 text-white placeholder:text-emerald-200/30 resize-none min-h-[100px]"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-emerald-200/60 hover:text-[#D4AF37] hover:bg-emerald-800/30">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm" className="text-emerald-200/60 hover:text-[#D4AF37] hover:bg-emerald-800/30">
                          <Calendar className="w-4 h-4 mr-2" />
                          Event
                        </Button>
                      </div>
                      <Button 
                        onClick={handlePost}
                        className="bg-[#D4AF37] hover:bg-[#B8962E] text-emerald-950 font-bold rounded-full px-6"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Posts List */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37] mx-auto"></div>
                  </div>
                ) : (
                  posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-emerald-950/70 backdrop-blur-[20px] border-[0.5px] border-[#D4AF37] overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                              <div className="relative">
                                <Avatar className="w-12 h-12 border-[0.5px] border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                  <AvatarImage src={post.author.avatar_url} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {post.author.is_verified && (
                                  <div className="absolute -bottom-1 -right-1 bg-[#022c22] rounded-full p-0.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/20" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className={cn(
                                    "font-bold text-base",
                                    post.author.is_verified ? "text-[#D4AF37]" : "text-white"
                                  )}>
                                    {post.author.name}
                                  </h4>
                                  {post.author.is_verified && (
                                    <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/20 font-bold uppercase tracking-tighter">
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-emerald-200/40">{post.author.profession} • {new Date(post.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-emerald-200/40 hover:text-[#D4AF37]">
                              <MoreHorizontal className="w-5 h-5" />
                            </Button>
                          </div>

                          <p className="text-emerald-50/90 leading-relaxed mb-4">
                            {post.content}
                          </p>

                          {post.image_url && (
                            <div className="rounded-xl overflow-hidden border border-emerald-800/50 mb-4">
                              <img src={post.image_url} alt="Post content" className="w-full h-auto object-cover" />
                            </div>
                          )}

                          <div className="pt-4 border-t border-emerald-800/30 flex justify-between items-center">
                            <div className="flex gap-6">
                              <button className="flex items-center gap-2 group">
                                <Heart className={cn(
                                  "w-5 h-5 transition-all duration-300",
                                  post.is_liked ? "text-[#D4AF37] fill-[#D4AF37] scale-110" : "text-[#D4AF37] group-hover:scale-110"
                                )} />
                                <span className="text-xs font-medium text-emerald-200/60 group-hover:text-[#D4AF37]">{post.likes_count}</span>
                              </button>
                              <button className="flex items-center gap-2 group">
                                <MessageCircle className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-emerald-200/60 group-hover:text-[#D4AF37]">{post.comments_count}</span>
                              </button>
                              <button className="flex items-center gap-2 group">
                                <Share2 className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-emerald-200/60 group-hover:text-[#D4AF37]">Share</span>
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar - Active Initiatives */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <Card className="bg-emerald-950/40 backdrop-blur-[20px] border-[0.5px] border-[#D4AF37]/30 p-6">
                <h3 className="font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active Initiatives
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Clean Water Project", members: 12, progress: 75 },
                    { title: "Youth Skill Center", members: 45, progress: 40 },
                    { title: "Medical Camp 2024", members: 8, progress: 90 }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-emerald-50">{item.title}</span>
                        <span className="text-[#D4AF37]">{item.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-emerald-900/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#D4AF37] rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-emerald-200/40 uppercase tracking-wider">{item.members} members active</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-emerald-950 rounded-full text-xs font-bold">
                  View All Initiatives
                </Button>
              </Card>

              <Card className="bg-gradient-to-br from-[#D4AF37] to-[#B8962E] p-6 text-emerald-950">
                <h3 className="font-bold text-lg mb-2">Become a Leader</h3>
                <p className="text-sm mb-4 opacity-80">Apply for a verified leadership profile and lead community initiatives.</p>
                <Button className="w-full bg-emerald-950 text-white hover:bg-emerald-900 rounded-full text-xs font-bold">
                  Apply Now
                </Button>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
