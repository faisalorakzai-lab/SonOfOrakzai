import { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Home,
  Smile,
  BookOpen,
  Zap,
  Star,
  Award,
  Flame,
  Send,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const GOLD = '#D4AF37';

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

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Ahmad Orakzai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad', text: 'Bohat acha mashwara hai, Orakzai ke liye bahut zaruri hai.', time: '2 ghante pehle' },
  { id: 'c2', author: 'Nadia Afridi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia', text: 'Allah khair kare, ye qaddam bohat umeed wala hai!', time: '1 ghante pehle' },
];

const STORIES = [
  { id: 1, name: 'Chairman', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chairman', isLive: true },
  { id: 2, name: 'Jirga News', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jirga', isLive: false },
  { id: 3, name: 'Skill Lab', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skill', isLive: false },
  { id: 4, name: 'Youth Wing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Youth', isLive: false },
  { id: 5, name: 'Elders', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elder', isLive: false },
  { id: 6, name: 'Women Org', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Women', isLive: false },
];

const TRENDING = [
  { tag: '#OrakzaiRising', count: '2.4k posts' },
  { tag: '#JirgaForum2025', count: '1.1k posts' },
  { tag: '#DigitalSkillLab', count: '890 posts' },
  { tag: '#PeaceAndProgress', count: '760 posts' },
  { tag: '#EducationForAll', count: '643 posts' },
];

const REACTIONS = [
  { icon: Heart, label: 'Love' },
  { icon: Zap, label: 'Insight' },
  { icon: Award, label: 'Celebrate' },
  { icon: Star, label: 'Inspire' },
];

function VerifiedBadge() {
  return (
    <span className='relative inline-flex'>
      <CheckCircle2 className='w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/20' />
      <span
        className='absolute inset-0 rounded-full animate-ping opacity-40 bg-[#D4AF37]'
        style={{ animationDuration: '2s' }}
      />
    </span>
  );
}

function ReactionBar({ onReact }: { onReact: (label: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className='absolute bottom-9 left-0 z-50 flex gap-2 bg-[#032d1e] border border-[#D4AF37]/40 rounded-full px-3 py-2 shadow-[0_4px_24px_rgba(212,175,55,0.25)]'
    >
      {REACTIONS.map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={() => onReact(label)}
          className='flex flex-col items-center gap-1 group'
        >
          <span className='w-9 h-9 flex items-center justify-center rounded-full bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/30 group-hover:scale-125 transition-all duration-200 border border-[#D4AF37]/30'>
            <Icon className='w-4 h-4 text-[#D4AF37]' />
          </span>
          <span className='text-[9px] text-[#D4AF37]/70 font-medium'>{label}</span>
        </button>
      ))}
    </motion.div>
  );
}

function PostCard({ post }: { post: Post }) {
  const [showReactions, setShowReactions] = useState(false);
  const [liked, setLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h > 24) return Math.floor(h / 24) + ' din pehle';
    if (h > 0) return h + ' ghante pehle';
    return (m || 1) + ' minute pehle';
  };

  const handleLikeEnter = () => {
    hoverTimer.current = setTimeout(() => setShowReactions(true), 500);
  };
  const handleLikeLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setTimeout(() => setShowReactions(false), 300);
  };
  const handleReact = (label: string) => {
    setLiked(true);
    setLikesCount((c) => c + 1);
    setShowReactions(false);
    toast.success(label + ' reaction add ho gayi!');
  };
  const handleLikeClick = () => {
    setLiked((l) => !l);
    setLikesCount((c) => (liked ? c - 1 : c + 1));
  };
  const handleComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now().toString(),
      author: 'Aap',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      text: newComment,
      time: 'abhi',
    }]);
    setNewComment('');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Orakzai Community:\n' + post.content.slice(0, 120) + '...');
    window.open('https://wa.me/?text=' + text, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className='bg-[#032d1e] border border-[#D4AF37]/20 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4),0_1px_0_rgba(212,175,55,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_1px_0_rgba(212,175,55,0.14)] transition-shadow duration-300'>
        <CardContent className='p-5'>
          <div className='flex justify-between items-start mb-4'>
            <div className='flex gap-3'>
              <div className='relative'>
                <Avatar className='w-12 h-12 border-2 border-[#D4AF37]/60 shadow-[0_0_10px_rgba(212,175,55,0.3)]'>
                  <AvatarImage src={post.author.avatar_url} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {post.author.is_verified && (
                  <div className='absolute -bottom-1 -right-1 bg-[#022c22] rounded-full p-0.5'>
                    <VerifiedBadge />
                  </div>
                )}
              </div>
              <div>
                <div className='flex items-center gap-2 flex-wrap'>
                  <h4 className={cn('font-bold text-base', post.author.is_verified ? 'text-[#D4AF37]' : 'text-white')}>
                    {post.author.name}
                  </h4>
                  {post.author.is_verified && (
                    <span className='text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 font-bold uppercase tracking-tighter'>
                      Verified
                    </span>
                  )}
                </div>
                <p className='text-[11px] text-emerald-200/35 mt-0.5'>
                  {post.author.profession} · <span className='italic'>{timeAgo(post.created_at)}</span>
                </p>
              </div>
            </div>
            <Button variant='ghost' size='icon' className='text-emerald-200/30 hover:text-[#D4AF37] w-8 h-8'>
              <MoreHorizontal className='w-4 h-4' />
            </Button>
          </div>

          <p className='text-emerald-50/90 leading-relaxed mb-4 text-[15px]'>{post.content}</p>

          {post.image_url && (
            <div className='rounded-xl overflow-hidden border border-emerald-800/50 mb-4'>
              <img src={post.image_url} alt='Post' className='w-full h-auto object-cover' />
            </div>
          )}

          <div className='pt-3 border-t border-emerald-800/20 flex items-center justify-between'>
            <div className='flex gap-1'>
              <div className='relative' onMouseEnter={handleLikeEnter} onMouseLeave={handleLikeLeave}>
                <button onClick={handleLikeClick} className='flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#D4AF37]/10 transition-colors group'>
                  <Heart className={cn('w-4 h-4 transition-all duration-200', liked ? 'text-[#D4AF37] fill-[#D4AF37] scale-110' : 'text-[#D4AF37] group-hover:scale-110')} />
                  <span className='text-xs font-medium text-emerald-200/60 group-hover:text-[#D4AF37]'>{likesCount}</span>
                </button>
                <AnimatePresence>{showReactions && <ReactionBar onReact={handleReact} />}</AnimatePresence>
              </div>
              <button onClick={() => setShowComments(s => !s)} className='flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#D4AF37]/10 transition-colors group'>
                <MessageCircle className='w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform' />
                <span className='text-xs font-medium text-emerald-200/60 group-hover:text-[#D4AF37]'>{post.comments_count + comments.length - 2}</span>
                <ChevronDown className={cn('w-3 h-3 text-emerald-200/40 transition-transform', showComments && 'rotate-180')} />
              </button>
              <button className='flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#D4AF37]/10 transition-colors group'>
                <Share2 className='w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform' />
                <span className='text-xs font-medium text-emerald-200/60 group-hover:text-[#D4AF37]'>Share</span>
              </button>
            </div>
            <button onClick={handleWhatsApp} className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors text-[#25D366] text-xs font-semibold'>
              <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
              </svg>
              WhatsApp
            </button>
          </div>

          {showComments && (
            <div className='mt-4 pt-4 border-t border-emerald-900/50 space-y-3'>
              {comments.map((c) => (
                <div key={c.id} className='flex gap-2.5'>
                  <Avatar className='w-8 h-8 border border-[#D4AF37]/30 flex-shrink-0'>
                    <AvatarImage src={c.avatar} />
                    <AvatarFallback>{c.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className='flex-1 bg-emerald-900/40 rounded-2xl px-3 py-2'>
                    <p className='text-xs font-bold text-[#D4AF37] mb-0.5'>{c.author}</p>
                    <p className='text-xs text-emerald-100/80'>{c.text}</p>
                    <p className='text-[10px] text-emerald-200/30 mt-1 italic'>{c.time}</p>
                  </div>
                </div>
              ))}
              <div className='flex gap-2.5 items-center pt-1'>
                <Avatar className='w-8 h-8 border border-[#D4AF37]/30 flex-shrink-0'>
                  <AvatarImage src='https://api.dicebear.com/7.x/avataaars/svg?seed=User' />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className='flex-1 flex items-center gap-2 bg-emerald-900/40 rounded-full pl-4 pr-2 py-1.5 border border-emerald-800/50 focus-within:border-[#D4AF37]/40 transition-colors'>
                  <input
                    type='text'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                    placeholder='Comment likhein...'
                    className='flex-1 bg-transparent text-xs text-white placeholder:text-emerald-200/30 outline-none'
                  />
                  <button onClick={handleComment} className='p-1.5 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 transition-colors'>
                    <Send className='w-3 h-3 text-[#D4AF37]' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel('community_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, () => { fetchPosts(); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*, author:members(name, profession, avatar_url, is_verified)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch {
      setPosts([
        {
          id: '1',
          content: 'Welcome to the Orakzai community! We are united in our mission for the progress and prosperity of our beloved district. Share your thoughts, ideas, and join our growing movement for a better tomorrow.',
          created_at: new Date().toISOString(),
          user_id: 1,
          likes_count: 124,
          comments_count: 18,
          is_liked: true,
          author: { name: 'Chairman Orakzai', profession: 'Community Leadership', is_verified: true, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chairman' },
        },
        {
          id: '2',
          content: 'Khush khabri! Hamara naya Digital Skill Lab upper Orakzai mein khulne wala hai. Nojawano ko computer, coding aur freelancing ki training di jaegi bilkul free. Ye hamara mustaqbil hai!',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          user_id: 2,
          likes_count: 85,
          comments_count: 12,
          author: { name: 'Founder Member', profession: 'Education Advocate', is_verified: true, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Founder' },
        },
        {
          id: '3',
          content: 'Jirga Forum ki agli meeting 15 May ko hogi. Tamam elders aur leaders se guzarish hai ke zaroor tahrif laaen. Agenda: pani ka masla, road construction project aur nojawano ki training.',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          user_id: 3,
          likes_count: 56,
          comments_count: 8,
          author: { name: 'Jirga Secretary', profession: 'Community Affairs', is_verified: false, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jirga2' },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    toast.success('Post community ke saath share ho gaya!');
    setNewPost('');
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'communities', icon: Users, label: 'Communities' },
    { id: 'jirga', icon: Flame, label: 'Jirga Forum' },
    { id: 'skilllab', icon: BookOpen, label: 'Digital Skill Lab' },
  ];

  return (
    <MainLayout>
      <div className='min-h-screen bg-[#022c22] text-white pt-6 pb-20'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>

            {/* LEFT SIDEBAR */}
            <div className='hidden lg:flex lg:col-span-3 flex-col gap-4'>
              <Card className='bg-[#032d1e] border border-[#D4AF37]/20 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'>
                <nav className='space-y-1'>
                  {navItems.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveNav(id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200',
                        activeNav === id
                          ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                          : 'text-emerald-100/60 hover:bg-emerald-800/20 hover:text-[#D4AF37]'
                      )}
                    >
                      <Icon className='w-5 h-5 flex-shrink-0' style={{ color: GOLD }} />
                      {label}
                    </button>
                  ))}
                </nav>
              </Card>

              <Card className='bg-[#032d1e] border border-[#D4AF37]/20 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'>
                <h3 className='font-bold text-[#D4AF37] mb-4 flex items-center gap-2 text-sm uppercase tracking-wide'>
                  <TrendingUp className='w-4 h-4' />
                  Active Initiatives
                </h3>
                <div className='space-y-4'>
                  {[
                    { title: 'Clean Water Project', members: 12, progress: 75 },
                    { title: 'Youth Skill Center', members: 45, progress: 40 },
                    { title: 'Medical Camp 2025', members: 8, progress: 90 },
                  ].map((item, i) => (
                    <div key={i} className='space-y-1.5'>
                      <div className='flex justify-between text-xs'>
                        <span className='font-medium text-emerald-50'>{item.title}</span>
                        <span className='text-[#D4AF37]'>{item.progress}%</span>
                      </div>
                      <div className='h-1.5 w-full bg-emerald-900/50 rounded-full overflow-hidden'>
                        <div className='h-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] rounded-full' style={{ width: item.progress + '%' }} />
                      </div>
                      <p className='text-[10px] text-emerald-200/30 uppercase tracking-wider'>{item.members} members active</p>
                    </div>
                  ))}
                </div>
                <Button className='w-full mt-5 bg-transparent border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-emerald-950 rounded-full text-xs font-bold'>
                  View All Initiatives
                </Button>
              </Card>
            </div>

            {/* CENTER FEED */}
            <div className='lg:col-span-6 space-y-5'>
              <div className='overflow-x-auto pb-1 -mx-1 px-1'>
                <div className='flex gap-3 min-w-max'>
                  {STORIES.map((story) => (
                    <button key={story.id} className='flex flex-col items-center gap-2 group'>
                      <div className='w-16 h-24 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)] bg-emerald-900/50 relative group-hover:shadow-[0_0_22px_rgba(212,175,55,0.5)] transition-shadow'>
                        <img src={story.avatar} alt={story.name} className='absolute inset-0 w-full h-full object-cover opacity-80' />
                        <div className='absolute inset-0 bg-gradient-to-t from-[#022c22]/80 to-transparent' />
                        {story.isLive && (
                          <span className='absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide z-10'>LIVE</span>
                        )}
                        <div className='absolute bottom-2 left-1/2 -translate-x-1/2 z-10'>
                          <Avatar className='w-7 h-7 border-2 border-[#D4AF37]'>
                            <AvatarImage src={story.avatar} />
                            <AvatarFallback>{story.name[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <span className='text-[10px] text-emerald-200/60 font-medium max-w-[64px] truncate'>{story.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Card className='bg-[#032d1e] border border-[#D4AF37]/20 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]'>
                <CardContent className='p-4'>
                  <div className='flex gap-3 items-center mb-3'>
                    <Avatar className='w-10 h-10 border-2 border-[#D4AF37]/50 flex-shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.2)]'>
                      <AvatarImage src='https://api.dicebear.com/7.x/avataaars/svg?seed=User' />
                      <AvatarFallback>GU</AvatarFallback>
                    </Avatar>
                    <div className='flex-1 bg-emerald-900/40 border border-emerald-800/50 rounded-full px-5 py-2.5 text-sm text-emerald-200/40 cursor-text' onClick={() => document.getElementById('post-textarea')?.focus()}>
                      Aap ke zehan mein kya hai?
                    </div>
                  </div>
                  <textarea
                    id='post-textarea'
                    className='w-full bg-emerald-900/30 border border-emerald-800/40 focus:border-[#D4AF37]/50 text-white placeholder:text-emerald-200/30 resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors'
                    placeholder='Apni baat likhein...'
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                  />
                  <div className='mt-3 pt-3 border-t border-emerald-800/30 flex items-center justify-between'>
                    <div className='flex gap-1'>
                      <Button variant='ghost' size='sm' className='text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full text-xs font-semibold gap-1.5'>
                        <ImageIcon className='w-4 h-4' />Photo/Video
                      </Button>
                      <Button variant='ghost' size='sm' className='text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full text-xs font-semibold gap-1.5'>
                        <Smile className='w-4 h-4' />Feeling/Activity
                      </Button>
                    </div>
                    <Button onClick={handlePost} className='bg-[#D4AF37] hover:bg-[#B8962E] text-emerald-950 font-bold rounded-full px-6 text-sm'>
                      Post Karen
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className='space-y-5'>
                {isLoading ? (
                  <div className='text-center py-12'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37] mx-auto' />
                  </div>
                ) : (
                  posts.map((post) => <PostCard key={post.id} post={post} />)
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className='hidden lg:flex lg:col-span-3 flex-col gap-4'>
              <Card className='bg-[#032d1e] border border-[#D4AF37]/20 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'>
                <h3 className='font-bold text-[#D4AF37] mb-4 flex items-center gap-2 text-sm uppercase tracking-wide'>
                  <TrendingUp className='w-4 h-4' />
                  Trending in Orakzai
                </h3>
                <div className='space-y-3'>
                  {TRENDING.map(({ tag, count }, i) => (
                    <div key={tag} className='flex items-center justify-between group cursor-pointer'>
                      <div>
                        <p className='text-[10px] text-emerald-200/30 font-medium'>#{i + 1} · Orakzai</p>
                        <p className='text-sm font-bold text-emerald-100 group-hover:text-[#D4AF37] transition-colors'>{tag}</p>
                        <p className='text-[10px] text-emerald-200/30'>{count}</p>
                      </div>
                      <MoreHorizontal className='w-4 h-4 text-emerald-200/20 group-hover:text-[#D4AF37]/50 transition-colors' />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className='bg-gradient-to-br from-[#D4AF37] to-[#B8962E] p-5 text-emerald-950 shadow-[0_4px_24px_rgba(212,175,55,0.2)]'>
                <h3 className='font-bold text-lg mb-1'>Leader Banein</h3>
                <p className='text-sm mb-4 opacity-75'>Verified leadership profile hasil karein aur community ko lead karein.</p>
                <Button className='w-full bg-[#022c22] text-white hover:bg-emerald-900 rounded-full text-xs font-bold'>
                  Abhi Apply Karein
                </Button>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
