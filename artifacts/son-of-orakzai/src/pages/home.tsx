import { Link } from 'wouter';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const GOLD = '#D4AF37';

/* ── Hero background slideshow — 3-second interval ── */
const heroSlides = [
  { src: '/hero-community.jpg', alt: 'Orakzai.org community outreach — education for children', label: 'Community Education' },
  { src: '/hero-education.jpg', alt: 'Orakzai.org leadership and business strategy', label: 'Strategic Leadership' },
  { src: '/hero-relief.jpg', alt: 'Orakzai.org humanitarian relief distribution', label: 'Humanitarian Relief' },
  { src: '/hero-youth.jpg', alt: 'Orakzai.org digital youth empowerment', label: 'Digital Empowerment' },
];

/* ── Impact counters ── */
const counters = [
  { end: 12000, label: 'Registered Members', suffix: '+', icon: PeopleIcon, desc: 'Across Pakistan & diaspora' },
  { end: 4800, label: 'Students Trained', suffix: '+', icon: CapIcon, desc: 'Education & skills programs' },
  { end: 9200, label: 'Health Cases Resolved', suffix: '+', icon: StethoscopeIcon, desc: 'Free medical assistance' },
  { end: 14, label: 'Countries Reached', suffix: '+', icon: GlobeIcon, desc: 'Diaspora chapters worldwide' },
  { end: 850, label: 'Active Volunteers', suffix: '+', icon: HandsIcon, desc: 'Serving communities on the ground' },
  { end: 22, label: 'Partner Organizations', suffix: '+', icon: HandshakeIcon, desc: 'NGOs, institutions & government bodies' },
];

/* ── Diaspora flag strip — illustrative, to be confirmed with real chapter data ── */
const diasporaFlags = [
  { flag: '🇵🇰', name: 'Pakistan' },
  { flag: '🇦🇫', name: 'Afghanistan' },
  { flag: '🇸🇦', name: 'Saudi Arabia' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇶🇦', name: 'Qatar' },
  { flag: '🇴🇲', name: 'Oman' },
  { flag: '🇧🇭', name: 'Bahrain' },
  { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇺🇸', name: 'United States' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇲🇾', name: 'Malaysia' },
  { flag: '🇦🇺', name: 'Australia' },
];

/* ── Countries where the Orakzai community lives — demo pins, replace with verified locations ── */
const globalNodes = [
  { city: 'Ghaljo', country: 'Pakistan', flag: '🇵🇰', x: 63, y: 40, tag: 'Primary Homeland' },
  { city: 'Kabul', country: 'Afghanistan', flag: '🇦🇫', x: 60, y: 37, tag: 'Historical Homeland' },
  { city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦', x: 59, y: 44, tag: 'Community' },
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', x: 61, y: 46, tag: 'Community' },
  { city: 'Doha', country: 'Qatar', flag: '🇶🇦', x: 60, y: 47, tag: 'Community' },
  { city: 'Muscat', country: 'Oman', flag: '🇴🇲', x: 62, y: 48, tag: 'Community' },
  { city: 'Manama', country: 'Bahrain', flag: '🇧🇭', x: 59, y: 45, tag: 'Community' },
  { city: 'London', country: 'UK', flag: '🇬🇧', x: 47, y: 27, tag: 'Community' },
  { city: 'New York', country: 'USA', flag: '🇺🇸', x: 22, y: 33, tag: 'Community' },
  { city: 'Toronto', country: 'Canada', flag: '🇨🇦', x: 20, y: 26, tag: 'Community' },
  { city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', x: 78, y: 58, tag: 'Community' },
  { city: 'Sydney', country: 'Australia', flag: '🇦🇺', x: 85, y: 74, tag: 'Community' },
];

/* ── Partner / featured logos — placeholder names until real partner list is confirmed ── */
const partnerLogos = [
  'Global Diaspora Council', 'KP Welfare Trust', 'Crescent Relief Network', 'UnityEd Foundation', 'Frontier Health Alliance', 'Orakzai Chamber of Commerce',
];

/* ── Diaspora voices — placeholder testimonials, to be replaced with real member quotes ── */
const testimonials = [
  { quote: 'Orakzai.org gave our community in the Gulf a real voice — from scholarships to staying connected with home.', name: 'Sample Member', place: 'Dubai, UAE', flag: '🇦🇪' },
  { quote: 'Even from London, I feel part of every initiative back home. The diaspora network is the reason I stay involved.', name: 'Sample Member', place: 'London, UK', flag: '🇬🇧' },
  { quote: 'The scholarship program changed my daughter’s future. This is what a global homeland should feel like.', name: 'Sample Member', place: 'Toronto, Canada', flag: '🇨🇦' },
];

/* ── SVG Icons ── */
function PeopleIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none">
      <circle cx="18" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="30" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 40c0-8 5.4-13 12-13h12c6.6 0 12 5 12 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function CapIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none">
      <path d="M24 10L46 20 24 30 2 20 24 10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 25v10c0 4 5.4 7 12 7s12-3 12-7V25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="46" y1="20" x2="46" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function StethoscopeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none">
      <path d="M10 8h4a2 2 0 012 2v14a10 10 0 0020 0V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="14" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="36" cy="14" r="1.5" fill="currentColor" />
      <line x1="10" y1="8" x2="10" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function GlobeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
function HandsIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none">
      <path d="M8 26l6-10a3 3 0 015 3l-4 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 26l-6-10a3 3 0 00-5 3l4 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 26h20l-2 10a4 4 0 01-4 3h-8a4 4 0 01-4-3l-2-10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
function HandshakeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none">
      <path d="M4 22l8-8 8 6 6-6 8 4-6 10-8-4-8 6-8-8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M14 30l4 6M34 30l-4 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Animated counter hook ── */
function useCounter(end: number, inView: boolean, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const step = (end / duration) * 16;
    let current = start;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return count;
}

/* ── Hero Slideshow ── */
function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[index].src}
            alt={heroSlides[index].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,20,10,0.96) 0%, rgba(1,26,16,0.84) 40%, rgba(1,26,16,0.52) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,8,4,0.90) 0%, transparent 50%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 55% at 28% 42%, rgba(6,78,59,0.25) 0%, transparent 68%)' }} />

      {/* Slide label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${index}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 -translate-y-1/2 right-8 md:right-14 hidden md:flex flex-col items-end gap-2 z-10"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: GOLD }}>{heroSlides[index].label}</span>
          <div className="h-[1px] w-20" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: i === index ? '32px' : '8px',
              height: '4px',
              background: i === index ? GOLD : 'rgba(255,255,255,0.25)',
              boxShadow: i === index ? `0 0 12px rgba(212,175,55,0.7)` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STRATEGIC PILLARS — Sovereign Luxury 6-Card Grid
   ══════════════════════════════════════════════════ */

const pillars = [
  {
    id: 1,
    title: 'Rights & Representation',
    desc: 'Legal advocacy and institutional representation dedicated to protecting the rights, interests, and collective voice of Orakzai communities worldwide.',
    stat: '120+ cases represented',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="24" y1="6" x2="24" y2="42" />
        <line x1="10" y1="10" x2="38" y2="10" />
        <path d="M10 10 L4 22 Q4 30 10 30 Q16 30 16 22 Z" />
        <path d="M38 10 L44 22 Q44 30 38 30 Q32 30 32 22 Z" />
        <line x1="16" y1="42" x2="32" y2="42" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Education & Global Scholarships',
    desc: 'Scholarships, mentorship, leadership development, and international educational pathways that empower the next generation of Orakzai students.',
    stat: '4,800+ students in 12 cities',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20 L24 10 L42 20 L24 30 Z" />
        <path d="M14 24.5 V35 Q24 42 34 35 V24.5" />
        <path d="M42 20 V30" />
        <circle cx="42" cy="32" r="2.5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Social Welfare & Crisis Relief',
    desc: 'Humanitarian assistance, poverty alleviation, emergency response initiatives, and sustainable support systems for vulnerable families.',
    stat: '3,100+ families supported',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 40 C24 40 8 29 8 18 A9 9 0 0 1 24 13.5 A9 9 0 0 1 40 18 C40 29 24 40 24 40Z" />
        <path d="M18 26 Q18 20 24 17 Q30 20 30 26" strokeOpacity="0.6" />
        <line x1="24" y1="17" x2="24" y2="10" strokeOpacity="0.5" />
        <path d="M20 10 Q24 6 28 10" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Economic Innovation & Grants',
    desc: 'Interest-free business grants, entrepreneurship support, digital innovation, and local economic development designed to strengthen community prosperity.',
    stat: '340+ grants disbursed',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6,36 16,22 24,28 34,14 42,18" />
        <polyline points="34,14 42,14 42,22" />
        <line x1="6" y1="42" x2="42" y2="42" />
        <line x1="6" y1="6" x2="6" y2="42" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Global Diaspora Network',
    desc: 'Connecting Orakzai professionals, families, entrepreneurs, and organizations across Pakistan, the Gulf, Europe, North America, and beyond.',
    stat: '14+ countries, 8 active chapters',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <ellipse cx="24" cy="24" rx="8" ry="18" />
        <line x1="6" y1="24" x2="42" y2="24" />
        <line x1="8" y1="15" x2="40" y2="15" />
        <line x1="8" y1="33" x2="40" y2="33" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Healthcare Infrastructure & Access',
    desc: 'Supporting modern healthcare initiatives through mobile clinics, clean water projects, preventive care, and improved medical accessibility in underserved regions.',
    stat: '9,200+ health cases resolved',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8 L28 18 L40 18 L30 25 L34 36 L24 29 L14 36 L18 25 L8 18 L20 18 Z" />
        <circle cx="24" cy="24" r="6" strokeOpacity="0.35" />
      </svg>
    ),
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      {/* Glow layer — sits behind the card */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.18) 0%, transparent 70%)`,
          filter: 'blur(1px)',
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500 ease-out
          group-hover:-translate-y-2 group-hover:scale-[1.025]"
        style={{
          background: 'rgba(0,18,11,0.65)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(212,175,55,0.18)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.38), 0 1px 0 rgba(212,175,55,0.06) inset',
          willChange: 'transform',
        }}
      >
        {/* Hover: border brightens */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ border: '1px solid rgba(212,175,55,0.48)', borderRadius: 'inherit' }}
        />

        {/* Hover: gold shadow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: '0 0 40px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.30)' }}
        />

        {/* Icon badge */}
        <div className="flex-shrink-0">
          <div
            className="w-[70px] h-[70px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: 'rgba(0,12,7,0.80)',
              border: '1px solid rgba(212,175,55,0.30)',
              boxShadow: '0 0 24px rgba(212,175,55,0.08)',
            }}
          >
            {pillar.icon}
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Pillar number */}
          <span
            className="text-[10px] font-bold tracking-[0.35em] uppercase"
            style={{ color: 'rgba(212,175,55,0.55)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3
            className="text-xl font-bold leading-snug transition-colors duration-500 group-hover:text-[#F3E5AB]"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              color: 'rgba(255,255,255,0.95)',
              letterSpacing: '-0.01em',
            }}
          >
            {pillar.title}
          </h3>

          {/* Divider */}
          <div
            className="h-[1px] w-10 transition-all duration-500 group-hover:w-16"
            style={{ background: `linear-gradient(90deg, #D4AF37, transparent)` }}
          />

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.01em',
            }}
          >
            {pillar.desc}
          </p>

          {/* Stat line */}
          {pillar.stat && (
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
              <span
                className="text-xs font-bold tracking-wide"
                style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}
              >
                {pillar.stat}
              </span>
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div
          className="h-[1px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }}
        />
      </div>
    </motion.div>
  );
}

function StrategicPillars() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: '#00120B' }}
    >
      {/* ── Background layer: radial ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,78,59,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* Top separator line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)' }}
        />
        {/* Bottom separator line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.20), transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Section header ── */}
        <FadeIn direction="up" className="text-center mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12" style={{ background: `linear-gradient(90deg, transparent, #D4AF37)` }} />
            <span
              className="text-[10px] font-black tracking-[0.45em] uppercase"
              style={{ color: '#D4AF37', letterSpacing: '0.42em' }}
            >
              Our Strategic Pillars
            </span>
            <div className="h-[1px] w-12" style={{ background: `linear-gradient(90deg, #D4AF37, transparent)` }} />
          </div>

          {/* Main heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Building a Stronger
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #b8860b 0%, #D4AF37 40%, #F3E5AB 70%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Global Orakzai Community
            </span>
          </h2>

          {/* Gold rule */}
          <div
            className="h-[1px] w-28 mx-auto mb-7"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />

          {/* Intro paragraph */}
          <p
            className="text-base leading-relaxed max-w-2xl mx-auto"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.015em',
            }}
          >
            Orakzai.org operates through six strategic pillars — each one a dedicated institution 
            in itself — spanning rights advocacy, global education, humanitarian relief, economic 
            innovation, diaspora connectivity, and frontline healthcare access.
          </p>
        </FadeIn>

        {/* ── 6-card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <FadeIn direction="up" delay={0.3}>
          <div
            className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-2xl"
            style={{
              background: 'rgba(0,18,11,0.70)',
              border: '1px solid rgba(212,175,55,0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div>
              <p
                className="text-lg font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Committed to every pillar. Accountable to every member.
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
                Read our full institutional charter and annual impact report.
              </p>
            </div>
            <Link
              href="/about"
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #b8860b 0%, #D4AF37 50%, #F3E5AB 100%)',
                color: '#00120B',
                boxShadow: '0 4px 20px rgba(212,175,55,0.30)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.08em',
              }}
            >
              Our Full Charter
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   GLOBAL PRESENCE — decorative world map with pins
   ══════════════════════════════════════════════════ */
function WorldMapDots() {
  const dots: { x: number; y: number }[] = [];
  for (let y = 6; y < 96; y += 4.2) {
    for (let x = 4; x < 98; x += 3.4) {
      const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const n = seed - Math.floor(seed);
      if (n > 0.63) dots.push({ x, y });
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.45" fill="rgba(212,175,55,0.28)" />
      ))}
    </svg>
  );
}

function GlobalPresence() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #00120a 0%, #011a10 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}45, transparent)` }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(6,78,59,0.14) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Global Presence</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            One Nation, Everywhere We Stand
          </h2>
          <div className="h-[1px] w-24 mx-auto mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
            An active Orakzai community across {globalNodes.length} countries and growing —
            connecting the Orakzai nation from Pakistan and Afghanistan to the Gulf, Europe, North America, and beyond.
            <span className="block text-[11px] text-white/25 mt-2 uppercase tracking-widest">Illustrative map — community locations to be confirmed with verified data</span>
          </p>
        </FadeIn>

        <FadeIn direction="scale" delay={0.15}>
          <div
            className="relative rounded-3xl overflow-hidden mx-auto"
            style={{
              aspectRatio: '16/8',
              background: 'rgba(0,18,11,0.6)',
              border: '1px solid rgba(212,175,55,0.16)',
              boxShadow: '0 8px 50px rgba(0,0,0,0.4)',
            }}
          >
            <WorldMapDots />
            {globalNodes.map((node, i) => (
              <div
                key={node.city}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(212,175,55,0.4)', width: 10, height: 10 }} />
                <span className="relative block rounded-full" style={{ width: 10, height: 10, background: GOLD, boxShadow: '0 0 10px rgba(212,175,55,0.8)' }} />
                {active === i && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg whitespace-nowrap text-xs z-20"
                    style={{ background: 'rgba(1,20,12,0.97)', border: '1px solid rgba(212,175,55,0.3)', color: '#fff' }}
                  >
                    <span className="mr-1">{node.flag}</span>
                    <span className="font-semibold">{node.city}</span>
                    <span className="text-white/40"> — {node.tag}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Flag strip */}
        <FadeIn direction="up" delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {diasporaFlags.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.16)', color: 'rgba(255,255,255,0.7)' }}
              >
                <span className="text-base">{d.flag}</span>
                {d.name}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SOCIAL PROOF — partner / featured logos strip
   ══════════════════════════════════════════════════ */
function SocialProofStrip() {
  return (
    <section className="relative py-16" style={{ background: '#011a10' }}>
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <p className="text-center text-[11px] font-bold tracking-[0.35em] uppercase mb-8" style={{ color: 'rgba(212,175,55,0.55)' }}>
          Trusted alongside
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partnerLogos.map((name) => (
            <span
              key={name}
              className="text-sm md:text-base font-semibold tracking-wide text-white/30 hover:text-white/60 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {name}
            </span>
          ))}
        </div>
        <p className="text-center text-[10px] text-white/20 mt-6 uppercase tracking-widest">Partner list pending final confirmation</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   TESTIMONIALS — diaspora voices
   ══════════════════════════════════════════════════ */
function Testimonials() {
  return (
    <section className="relative py-28" style={{ background: 'linear-gradient(180deg, #011a10 0%, #00120a 100%)' }}>
      <div className="absolute inset-0 orakzai-pattern opacity-20 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Voices of the Diaspora</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Heard From Every Continent
          </h2>
          <div className="h-[1px] w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.12}>
              <div
                className="h-full rounded-2xl p-8 flex flex-col gap-5"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(212,175,55,0.16)', backdropFilter: 'blur(14px)' }}
              >
                <span className="text-4xl" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>&ldquo;</span>
                <p className="text-white/70 text-sm leading-relaxed flex-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                  <span className="text-lg">{t.flag}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/35 text-xs">{t.place}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="text-center text-[10px] text-white/20 mt-10 uppercase tracking-widest">Sample quotes for demonstration — to be replaced with verified member testimonials</p>
      </div>
    </section>
  );
}

/* ── Gold decorative corner for leadership cards ── */
function GoldCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: 'rotate(0)',
    tr: 'rotate(90deg)',
    br: 'rotate(180deg)',
    bl: 'rotate(270deg)',
  };
  const positions: Record<string, string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  };
  return (
    <div className={`absolute ${positions[position]} w-10 h-10`} style={{ transform: transforms[position] }}>
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M2 38 L2 2 L38 2" stroke={GOLD} strokeWidth="2" opacity="0.7" />
        <path d="M2 22 L2 2 L22 2" stroke={GOLD} strokeWidth="1" opacity="0.4" />
        <circle cx="2" cy="2" r="3" fill={GOLD} opacity="0.6" />
        <path d="M8 2 L8 8 M2 8 L8 8" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      </svg>
    </div>
  );
}

/* ── Section wrapper with cinematic entrance ── */
function FadeIn({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 45 : 0,
        x: direction === 'left' ? -55 : direction === 'right' ? 55 : 0,
        scale: direction === 'scale' ? 0.93 : 1,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Impact counter card ── */
function ImpactCard({
  end,
  suffix,
  label,
  desc,
  icon: Icon,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  desc: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCounter(end, inView);
  const progress = inView ? 100 : 0;

  return (
    <FadeIn direction="scale" delay={delay}>
      <div
        ref={ref}
        className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group"
        style={{
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212,175,55,0.18)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.30), 0 1px 0 rgba(212,175,55,0.08) inset',
        }}
      >
        {/* Radial glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
        />

        {/* Top gold line */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

        <div className="p-8">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform group-hover:scale-110 duration-300"
            style={{
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.22)',
              boxShadow: '0 4px 20px rgba(212,175,55,0.12)',
            }}
          >
            <Icon className="w-8 h-8" style={{ color: GOLD }} />
          </div>

          {/* Count */}
          <div className="text-center mb-2">
            <span
              className="text-5xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: `0 0 30px rgba(212,175,55,0.3)` }}
            >
              {count.toLocaleString()}
            </span>
            <span className="text-3xl font-black" style={{ color: GOLD }}>{suffix}</span>
          </div>

          <h3
            className="text-center font-bold text-white text-lg mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {label}
          </h3>
          <p className="text-center text-white/40 text-xs tracking-wide mb-6">{desc}</p>

          {/* Animated gold progress bar */}
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, #b8860b, ${GOLD}, #f5e07a)`,
                boxShadow: `0 0 10px rgba(212,175,55,0.5)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: inView ? `${progress}%` : 0 }}
              transition={{ duration: 2.2, delay: delay + 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Scrolling ticker ── */
const tickerItems = [
  '✦ MUTAHID — BA-IKHTIYAR — TARAQI-YAFTA',
  '✦ UNITY — EMPOWERMENT — PROGRESS',
  '✦ APNI MATTI — APNE LOG',
  '✦ DIGITAL EMBASSY OF ORAKZAI NATION',
  '✦ BUILDING BRIDGES BETWEEN TRADITION AND MODERNITY',
];

function Ticker() {
  return (
    <div
      className="overflow-hidden py-3 relative"
      style={{ background: `linear-gradient(90deg, #0a2e18, #012415, #0a2e18)`, borderTop: `1px solid rgba(212,175,55,0.2)`, borderBottom: `1px solid rgba(212,175,55,0.2)` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(90deg, #012415, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(270deg, #012415, transparent)' }} />
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: [0, -1800] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="text-xs font-bold tracking-[0.25em] uppercase flex-shrink-0"
            style={{ color: GOLD, opacity: 0.8 }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <MainLayout>

      {/* ═══════════════════════════════
          HERO SECTION
      ═══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlideshow />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-14 pt-28 pb-24">
          <div className="max-w-3xl">

            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-[1px] w-6 flex-shrink-0" style={{ background: GOLD }} />
              <span
                className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase whitespace-nowrap"
                style={{ color: GOLD }}
              >
                Orakzai.org — Digital Embassy
              </span>
              <div className="h-[1px] w-6 flex-shrink-0" style={{ background: GOLD }} />
            </motion.div>

            {/* Global reach line */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)' }}
              >
                <GlobeIcon className="w-3.5 h-3.5" style={{ color: GOLD }} />
                <span className="text-[11px] font-semibold tracking-wide text-white/70">
                  Orakzai Community in {globalNodes.length} Countries
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1
                className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.1]"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 60px rgba(0,0,0,0.6)' }}
              >
                <span className="block">Mutahid,</span>
                <span className="block" style={{ color: GOLD }}>Ba-Ikhtiyar,</span>
                <span className="block text-white">Taraqi-Yafta</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
                <h2
                  className="text-sm md:text-base font-bold tracking-[0.4em] uppercase"
                  style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}
                >
                  SADA-E-ORAKZAI
                </h2>
                <div className="h-[1px] flex-1 max-w-[80px]" style={{ background: `linear-gradient(270deg, ${GOLD}, transparent)` }} />
              </div>

              <p
                className="text-white/65 text-lg md:text-xl leading-relaxed max-w-xl mb-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}
              >
                A digital homeland where tradition meets modernity. Uniting the Orakzai nation across borders — empowering every family, every student, every leader.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/join"
                className="relative overflow-hidden px-8 py-3.5 rounded-full font-bold text-base transition-all hover:-translate-y-1 active:scale-95 group inline-block text-center"
                style={{
                  background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 40%, #f5e07a 70%, ${GOLD} 100%)`,
                  color: '#011a10',
                  boxShadow: `0 8px 32px rgba(212,175,55,0.45), 0 2px 8px rgba(212,175,55,0.3)`,
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.05em',
                }}
              >
                <span className="relative z-10">Join the Movement</span>
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-full font-semibold text-base text-white transition-all hover:-translate-y-1 hover:bg-white/10 active:scale-95 inline-block text-center"
                style={{
                  border: `1.5px solid rgba(212,175,55,0.55)`,
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(212,175,55,0.06)',
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.05em',
                }}
              >
                Our Story
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-16 flex gap-8 md:gap-12"
            >
              {[
                { val: '12K+', label: 'Members' },
                { val: '4.8K+', label: 'Students' },
                { val: '9.2K+', label: 'Health Cases' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-black" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>{s.val}</span>
                  <span className="text-xs text-white/45 tracking-widest uppercase">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(to top, #011a10, transparent)' }} />
      </section>

      {/* ═══════════════ TICKER ═══════════════ */}
      <Ticker />

      {/* ═══════════════════════════════════════════════
          STRATEGIC PILLARS — 6-CARD SOVEREIGN GRID
      ═══════════════════════════════════════════════ */}
      <StrategicPillars />

      {/* ═══════════════════════════════
          IMPACT COUNTERS
      ═══════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#00120a' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,78,59,0.10) 0%, transparent 70%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}35, transparent)` }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">
          <FadeIn direction="up" className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Measured Progress</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Numbers That Matter
            </h2>
            <div className="h-[1px] w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {counters.map((c, i) => (
              <ImpactCard key={i} {...c} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          GLOBAL PRESENCE
      ═══════════════════════════════ */}
      <GlobalPresence />

      {/* ═══════════════════════════════
          SOCIAL PROOF
      ═══════════════════════════════ */}
      <SocialProofStrip />

      {/* ═══════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════ */}
      <Testimonials />

      {/* ═══════════════════════════════
          MISSION STATEMENT STRIP
      ═══════════════════════════════ */}
      <section className="py-16 relative" style={{ background: '#011a10' }}>
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <FadeIn direction="scale">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 16px rgba(212,175,55,0.3)` }}>
                  <img src="/orakzai-org-logo.png" alt="Orakzai Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color: GOLD }}>Our Mission</p>
                  <p className="text-white text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    To uplift every Orakzai family — through dignity, education, and unity.
                  </p>
                </div>
              </div>
              <Link
                href="/about"
                className="flex-shrink-0 px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all hover:-translate-y-0.5 inline-block"
                style={{ border: `1.5px solid rgba(212,175,55,0.45)`, color: GOLD, background: 'rgba(212,175,55,0.05)' }}
              >
                Learn More
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════
          CTA BANNER
      ═══════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #011a10 0%, #000d08 100%)' }}>
        <div className="absolute inset-0 orakzai-pattern opacity-40 pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(6,78,59,0.18) 0%, transparent 72%)' }}
        />

        {/* Decorative rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(212,175,55,0.06)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(212,175,55,0.04)' }}
        />

        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}45, transparent)` }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10 text-center">
          <FadeIn direction="scale" delay={0}>
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>Join the Movement</p>
              <h2
                className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 50px rgba(0,0,0,0.5)' }}
              >
                Apni Matti,
              </h2>
              <h2
                className="text-5xl md:text-7xl font-black mb-2 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: `linear-gradient(135deg, #b8860b, ${GOLD}, #f5e07a, ${GOLD})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Apne Log
              </h2>
              <div className="text-xl text-white/30 mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>— Orakzai.org</div>
              <div className="h-[1px] w-32 mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
              <p className="text-white/55 text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}>
                Join thousands of Orakzai members who have pledged to build a stronger, educated, and prosperous community for every generation that follows.
              </p>

              {/* Glowing CTA button */}
              <div className="relative inline-block">
                {/* Glow rings */}
                <div
                  className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                  style={{ boxShadow: `0 0 60px rgba(212,175,55,0.35), 0 0 100px rgba(212,175,55,0.18)`, transform: 'scale(1.15)' }}
                />
                <Link
                  href="/join"
                  className="relative overflow-hidden px-14 py-5 rounded-full font-black text-xl transition-all hover:-translate-y-1.5 hover:shadow-2xl active:scale-95 inline-block"
                  style={{
                    background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 40%, #f5e07a 70%, ${GOLD} 100%)`,
                    backgroundSize: '200% auto',
                    color: '#011a10',
                    boxShadow: `0 12px 50px rgba(212,175,55,0.50), 0 4px 16px rgba(212,175,55,0.35)`,
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '0.06em',
                  }}
                >
                  Become a Member Today
                </Link>
              </div>

              <p className="text-white/25 text-xs mt-6 tracking-widest uppercase">Free — Takes less than 2 minutes</p>
            </div>
          </FadeIn>
        </div>
      </section>

    </MainLayout>
  );
}
