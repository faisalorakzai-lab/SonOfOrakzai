import { Link } from 'wouter';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const founderPath = '/malak-speen-gul.jpg';
const chairmanPath = '/faisal-orakzai.png';
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
              <div className="h-[1px] w-8" style={{ background: GOLD }} />
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase"
                style={{ color: GOLD }}
              >
                Orakzai.org — Digital Embassy
              </span>
              <div className="h-[1px] w-8" style={{ background: GOLD }} />
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.07]"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 60px rgba(0,0,0,0.6)' }}
              >
                Mutahid,{' '}
                <span style={{ color: GOLD }}>Ba-Ikhtiyar,</span>
                <br />Taraqi-Yafta
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
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/join"
                className="relative overflow-hidden px-10 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-1 active:scale-95 group inline-block"
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
                className="px-10 py-4 rounded-full font-semibold text-base text-white transition-all hover:-translate-y-1 hover:bg-white/10 active:scale-95 inline-block"
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

      {/* ═══════════════════════════════
          ABOUT STRIP
      ═══════════════════════════════ */}
      <section className="py-20 relative" style={{ background: '#011a10' }}>
        <div className="absolute inset-0 orakzai-pattern opacity-20 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚖️',
                title: 'Rights & Representation',
                desc: 'Legal advocacy and political representation for every member of the Orakzai nation.',
              },
              {
                icon: '🎓',
                title: 'Education & Scholarships',
                desc: 'Funding, mentoring, and training programs that open global doors for Orakzai youth.',
              },
              {
                icon: '🌍',
                title: 'Global Diaspora Network',
                desc: 'Connecting Orakzai families across Pakistan, the Gulf, Europe, and North America.',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15} direction="up">
                <div
                  className="rounded-2xl p-7 transition-all duration-400 hover:-translate-y-1 group"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(212,175,55,0.14)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                  <div className="h-[1px] w-10 mb-3" style={{ background: GOLD, opacity: 0.5 }} />
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
