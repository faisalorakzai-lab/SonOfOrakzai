import { Link } from 'wouter';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const founderPath = '/malak-speen-gul.jpg';
const chairmanPath = '/faisal-orakzai.png';
const GOLD = '#D4AF37';
const SOFT_GOLD = '#F3E5AB';
const BG_DEEP = '#00120B';

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
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
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
   PRESTIGE HERO — Digital Embassy of the Orakzai Nation
   ══════════════════════════════════════════════════ */

const headlineLines = ['Mutahid.', 'Ba-Ikhtiyar.', 'Taraqi-Yafta.'];

const trustBar = [
  { label: 'Community Driven' },
  { label: 'Non-Profit Initiative' },
  { label: 'Global Network' },
  { label: 'Future Ready' },
];

function GoldCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="none">
      <circle cx="10" cy="10" r="9" stroke={GOLD} strokeWidth="1.2" opacity="0.55" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Cinematic layered background: gradient wash, radial glow, drifting particles, vignette */
function PrestigeBackdrop() {
  const reduceMotion = useReducedMotion();
  const [particles] = useState(() =>
    Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.2,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * 10,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: BG_DEEP }}>
      {/* Base emerald layered wash */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #00120B 0%, #011a10 45%, #00120B 100%)' }}
      />

      {/* Radial light behind subject (right side) */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 65% at 82% 45%, rgba(212,175,55,0.16) 0%, transparent 62%)' }}
        animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary emerald glow behind text */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 20% 55%, rgba(6,78,59,0.35) 0%, transparent 65%)' }}
        animate={reduceMotion ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Faint world-map / grid texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v${i}`} x1={(i * 1400) / 14} y1="0" x2={(i * 1400) / 14} y2="900" stroke={GOLD} strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={(i * 900) / 9} x2="1400" y2={(i * 900) / 9} stroke={GOLD} strokeWidth="0.5" />
        ))}
        {[
          [180, 160], [340, 300], [520, 180], [760, 260], [980, 160], [1180, 300], [260, 520], [640, 560], [1020, 540], [1240, 460],
        ].map(([cx, cy], i) => (
          <circle key={`n${i}`} cx={cx} cy={cy} r="2.4" fill={GOLD} />
        ))}
        {[
          [180, 160, 340, 300], [340, 300, 520, 180], [520, 180, 760, 260], [760, 260, 980, 160], [980, 160, 1180, 300],
          [260, 520, 640, 560], [640, 560, 1020, 540], [1020, 540, 1240, 460], [180, 160, 260, 520], [980, 160, 1020, 540],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth="0.6" />
        ))}
      </svg>

      {/* Drifting gold particles */}
      {!reduceMotion &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: SOFT_GOLD,
              boxShadow: `0 0 6px rgba(212,175,55,0.6)`,
            }}
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      {/* Luxury vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(0,18,11,0.65) 100%)' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,8,4,0.85) 0%, transparent 35%)' }} />
    </div>
  );
}

function SovereignBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-9"
      style={{
        background: 'rgba(0,18,11,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(212,175,55,0.45)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '13px' }}>🌍</span>
      <span
        className="text-[11px] font-bold uppercase"
        style={{ color: GOLD, letterSpacing: '0.28em' }}
      >
        Digital Embassy of the Orakzai Nation
      </span>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-semibold uppercase text-white/50" style={{ letterSpacing: '0.3em' }}>
        Discover More
      </span>
      <div
        className="w-[22px] h-[36px] rounded-full flex justify-center pt-2"
        style={{ border: '1.5px solid rgba(212,175,55,0.55)' }}
      >
        <motion.span
          className="w-[3px] h-[7px] rounded-full"
          style={{ background: GOLD }}
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

function ExecutivePortrait() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[420px] mx-auto lg:mx-0"
    >
      {/* Floating ambient glow */}
      <motion.div
        className="absolute -inset-8 rounded-[2.5rem] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 40%, rgba(212,175,55,0.30) 0%, transparent 70%)', filter: 'blur(18px)' }}
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Thin gold geometric corner lines */}
      <div className="absolute -top-5 -left-5 w-14 h-14 border-t border-l pointer-events-none" style={{ borderColor: 'rgba(212,175,55,0.6)' }} />
      <div className="absolute -bottom-5 -right-5 w-14 h-14 border-b border-r pointer-events-none" style={{ borderColor: 'rgba(212,175,55,0.6)' }} />

      <motion.div
        className="relative rounded-[2rem] overflow-hidden"
        style={{
          border: '1px solid rgba(212,175,55,0.55)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.12)',
        }}
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={chairmanPath}
          alt="Chairman of Orakzai.org — sovereign leadership for the Orakzai Nation"
          loading="lazy"
          className="w-full aspect-[4/5] object-cover"
        />
        {/* Glass overlay for cohesion with palette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,18,11,0) 55%, rgba(0,18,11,0.75) 100%)' }} />
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 60px rgba(212,175,55,0.10)' }} />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs font-bold uppercase" style={{ color: GOLD, letterSpacing: '0.25em' }}>Chairman</p>
          <p className="text-white text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Faisal Orakzai</p>
        </div>
      </motion.div>

      {/* Soft glowing accent circle */}
      <div
        className="absolute -z-10 -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)' }}
      />
    </motion.div>
  );
}

function PrestigeHero() {
  return (
    <section className="relative h-screen min-h-[720px] flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
      <PrestigeBackdrop />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-14 lg:gap-10 items-center">
          {/* Left — text */}
          <div>
            <SovereignBadge />

            <h1
              className="font-black text-white mb-7"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.75rem, 6vw, 5.25rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                textShadow: '0 4px 60px rgba(0,0,0,0.6)',
              }}
            >
              {headlineLines.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.5 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                  style={i === 1 ? { color: GOLD } : undefined}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.3 }}
              className="text-white/70 leading-relaxed mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', maxWidth: '650px' }}
            >
              A global digital homeland preserving heritage, empowering future generations, and connecting Orakzai communities across every continent through education, innovation, humanitarian action, and collective progress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.55 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/join"
                className="group relative overflow-hidden px-10 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-1 active:scale-95 inline-block"
                style={{
                  background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 40%, #f5e07a 70%, ${GOLD} 100%)`,
                  color: '#011a10',
                  boxShadow: `0 8px 32px rgba(212,175,55,0.45), 0 2px 8px rgba(212,175,55,0.3)`,
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.05em',
                }}
              >
                <span className="relative z-10">Join the Movement</span>
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                  style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)' }}
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/about"
                className="px-10 py-4 rounded-full font-semibold text-base text-white transition-all hover:-translate-y-1 hover:border-[#D4AF37] hover:backdrop-blur-xl active:scale-95 inline-block"
                style={{
                  border: '1.5px solid rgba(212,175,55,0.5)',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(212,175,55,0.06)',
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.05em',
                }}
              >
                Explore Our Mission
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.8 }}
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {trustBar.map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <GoldCheckIcon />
                  <span className="text-white/60 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {t.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — executive portrait */}
          <div className="hidden lg:block">
            <ExecutivePortrait />
          </div>
          <div className="lg:hidden flex justify-center">
            <ExecutivePortrait />
          </div>
        </div>
      </div>

      <ScrollIndicator />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #011a10, transparent)' }} />
    </section>
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

/* ── Leadership card ── */
function LeaderCard({
  imgSrc,
  altText,
  title,
  name,
  bio,
  direction,
}: {
  imgSrc: string;
  altText: string;
  title: string;
  name: string;
  bio: string;
  direction: 'left' | 'right';
}) {
  return (
    <FadeIn direction={direction}>
      <div
        className="relative group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(212,175,55,0.18)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        }}
      >
        {/* Gold patterned corners */}
        <GoldCorner position="tl" />
        <GoldCorner position="tr" />
        <GoldCorner position="bl" />
        <GoldCorner position="br" />

        {/* Top gold accent */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD}, ${GOLD}80, transparent)` }} />

        <div className="p-8">
          {/* Profile image */}
          <div className="relative mx-auto mb-6 w-36 h-36">
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ background: `radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)`, transform: 'scale(1.3)' }}
            />
            <div
              className="w-full h-full rounded-full overflow-hidden relative z-10"
              style={{
                border: `3px solid ${GOLD}`,
                boxShadow: `0 0 0 6px rgba(212,175,55,0.08), 0 8px 32px rgba(212,175,55,0.25)`,
              }}
            >
              <img src={imgSrc} alt={altText} className="w-full h-full object-cover" />
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap"
              style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: '#011a10' }}
            >
              Verified
            </div>
          </div>

          {/* Title badge */}
          <div className="text-center mb-4">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: GOLD }}
            >
              {title}
            </span>
            <h3
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {name}
            </h3>
            <div className="h-[1px] w-16 mx-auto my-3" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </div>

          <p className="text-white/55 text-sm leading-relaxed text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
            {bio}
          </p>

          {/* Hover reveal */}
          <div
            className="mt-6 pt-5 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}
          >
            <Link
              href="/team"
              className="px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all hover:-translate-y-0.5 inline-block"
              style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: '#011a10' }}
            >
              Full Profile
            </Link>
          </div>
        </div>
        {/* Bottom gold trim */}
        <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />
      </div>
    </FadeIn>
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
      <PrestigeHero />

      {/* ═══════════════ TICKER ═══════════════ */}
      <Ticker />

      {/* ═══════════════════════════════════════════════
          STRATEGIC PILLARS — 6-CARD SOVEREIGN GRID
      ═══════════════════════════════════════════════ */}
      <StrategicPillars />

      {/* ═══════════════════════════════
          LEADERSHIP VISIONARIES
      ═══════════════════════════════ */}
      <section className="py-28 relative" style={{ background: 'linear-gradient(180deg, #011a10 0%, #00120a 100%)' }}>
        <div className="absolute inset-0 orakzai-pattern opacity-25 pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(6,78,59,0.12) 0%, transparent 70%)' }}
        />

        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">
          <FadeIn direction="up" className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Institutional Leadership</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
            >
              Our Visionaries
            </h2>
            <div className="h-[1px] w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <p className="text-white/45 mt-5 max-w-xl mx-auto text-sm leading-relaxed">
              Guided by conviction and a lifelong commitment to the Orakzai people — these leaders bridge history with a bold future.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <LeaderCard
              imgSrc={founderPath}
              altText="Malak Speen Gul Orakzai"
              title="Founder & Former MNA"
              name="Malak Speen Gul Orakzai"
              bio="A lifelong advocate for the rights and development of the Orakzai district, building bridges between tradition and modernity with unwavering dignity."
              direction="left"
            />
            <LeaderCard
              imgSrc={chairmanPath}
              altText="Faisal Orakzai"
              title="Chairman"
              name="Faisal Orakzai"
              bio="Spearheading digital initiatives and youth empowerment programs to prepare the next generation for global opportunities and national leadership."
              direction="right"
            />
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counters.map((c, i) => (
              <ImpactCard key={i} {...c} delay={i * 0.18} />
            ))}
          </div>
        </div>
      </section>

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
