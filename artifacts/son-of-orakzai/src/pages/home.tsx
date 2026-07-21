import { Link } from 'wouter';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const GOLD = '#D4AF37';
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

/* ── Floating ambient orb ── */
function AmbientOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: 'blur(60px)' }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.75, 0.45] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Animated counter hook ── */
function useCounter(end: number, inView: boolean, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const step = (end / duration) * 16;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return count;
}

/* ── Impact counters ── */
const counters = [
  { end: 2850, label: 'Registered Members', suffix: '+', icon: PeopleIcon, desc: 'Across Pakistan & diaspora' },
  { end: 360, label: 'Students Trained', suffix: '+', icon: CapIcon, desc: 'Education & skills programs' },
  { end: 120, label: 'Health Cases Resolved', suffix: '+', icon: StethoscopeIcon, desc: 'Free medical assistance' },
  { end: 8, label: 'Districts Reached', suffix: '+', icon: GlobeIcon, desc: 'Across Khyber Pakhtunkhwa & beyond' },
  { end: 860, label: 'Active Volunteers', suffix: '+', icon: HandsIcon, desc: 'Serving communities on the ground' },
  { end: 18, label: 'Projects Completed', suffix: '+', icon: HandshakeIcon, desc: 'Welfare, education & infrastructure initiatives' },
];

/* ── Diaspora flag strip ── */
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

/* ── Global Orakzai community nodes ── */
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

/* ── Partner / featured logos ── */
const partnerLogos = [
  'Global Diaspora Council', 'KP Welfare Trust', 'Crescent Relief Network', 'UnityEd Foundation', 'Frontier Health Alliance', 'Orakzai Chamber of Commerce',
];

/* ── Diaspora voices — global international partners ── */
const testimonials = [
  { quote: 'Orakzai.org operates with the precision and principled mandate of a genuine humanitarian institution. Their commitment to documentation, rights advocacy, and diaspora protection is a model we reference in Geneva.', name: 'Dr. Elena Rostova', role: 'International Human Rights Observer', place: 'Geneva, Switzerland', flag: '🇨🇭' },
  { quote: 'Rarely do we encounter a diaspora-led network that bridges grassroots field operations with coherent international policy framing. Orakzai.org is one of the few that truly does.', name: 'Marcus Vance', role: 'Global Migration Policy Director', place: 'London, United Kingdom', flag: '🇬🇧' },
  { quote: 'The infrastructure programs in Peshawar and Orakzai District have delivered tangible, measurable outcomes — clean water access, community halls, and school upgrades. Solid engineering meets real human need.', name: 'Engineer Tariq Orakzai', role: 'Community Infrastructure Lead', place: 'Peshawar, Pakistan', flag: '🇵🇰' },
  { quote: 'From Dubai, coordinating relief across borders is complex. Orakzai.org has built the trust networks and compliance systems that make rapid diaspora-funded relief actually reach the ground.', name: 'Sarah Al-Hassan', role: 'Diaspora Relief Coordinator', place: 'Dubai, UAE', flag: '🇦🇪' },
  { quote: 'I have reviewed their institutional governance frameworks pro-bono, and I can confirm — the legal architecture underpinning their membership, relief disbursement, and advocacy is sound and transparent.', name: 'Jean-Luc Dubois', role: 'Pro-Bono Legal Counsel', place: 'Paris, France', flag: '🇫🇷' },
  { quote: 'Building scalable civic infrastructure for diaspora communities from Houston is uniquely challenging. Orakzai.org has created the digital backbone that makes it possible — and sustainable.', name: 'Zahir Shah Orakzai', role: 'Systems Architect', place: 'Houston, USA', flag: '🇺🇸' },
  { quote: 'Healthcare access partnerships are only as strong as the trust between institutions. Orakzai.org has earned that trust — in Doha, in Peshawar, and across every community they serve.', name: 'Dr. Amina Al-Mansoor', role: 'Healthcare Access Partner', place: 'Doha, Qatar', flag: '🇶🇦' },
];



/* ── Hero background with cinematic video loop ── */
function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: 'linear-gradient(140deg, #02180e 0%, #011409 45%, #02180e 75%, #010d06 100%)' }}>
      {/* Fallback base gradient (shown while video loads) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(140deg, #000c06 0%, #001009 45%, #00140c 75%, #000a05 100%)' }} />

      {/* Cinematic background video loop */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        style={{ opacity: 0.55 }}
      />

      {/* Dark overlay — black tint for base contrast */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.65)' }} />

      {/* Dark emerald gradient overlay — top-to-bottom for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(2,24,14,0.80) 0%, transparent 45%, rgba(2,24,14,1) 100%)',
        }}
      />

      {/* Left depth glow — static */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 68% 62% at 8% 45%, rgba(4,58,38,0.42) 0%, transparent 62%)' }} />
      {/* Fine gold lattice — left area only */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(212,175,55,0.038) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(212,175,55,0.038) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 52% 60% at 16% 50%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 52% 60% at 16% 50%, black 0%, transparent 70%)',
      }} />
      {/* Text legibility — left-to-right fade */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,7,3,0.92) 0%, rgba(0,11,6,0.72) 36%, rgba(0,18,11,0.30) 64%, transparent 100%)' }} />
      {/* Bottom vignette */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,6,3,0.98) 0%, rgba(0,10,6,0.55) 16%, transparent 38%)' }} />
    </div>
  );
}

/* ── Globe emblem — single slow rotation, no blinking ── */
function GlobeEmblem() {
  return (
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
      style={{ width: 520, height: 520, right: '-36px' }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 520 520"
        fill="none"
        className="w-full h-full"
        aria-hidden
        style={{ transformOrigin: '260px 260px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="gGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#053d2e" stopOpacity="0.48" />
            <stop offset="58%"  stopColor="#021f18" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#011208" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="gSheen" cx="32%" cy="28%" r="50%">
            <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="gEdge" cx="50%" cy="50%" r="50%">
            <stop offset="82%"  stopColor="transparent"  stopOpacity="0"    />
            <stop offset="100%" stopColor="#D4AF37"       stopOpacity="0.10" />
          </radialGradient>
        </defs>

        {/* Atmospheric fill */}
        <circle cx="260" cy="260" r="240" fill="url(#gGlow)"  />
        <circle cx="260" cy="260" r="240" fill="url(#gSheen)" />
        <circle cx="260" cy="260" r="240" fill="url(#gEdge)"  />

        {/* Outer rim */}
        <circle cx="260" cy="260" r="238" stroke="rgba(212,175,55,0.30)" strokeWidth="1.2" />
        <circle cx="260" cy="260" r="220" stroke="rgba(212,175,55,0.05)" strokeWidth="0.5" />

        {/* Latitude ellipses */}
        <ellipse cx="260" cy="260" rx="238" ry="32"  stroke="rgba(212,175,55,0.13)" strokeWidth="0.65" fill="none" />
        <ellipse cx="260" cy="260" rx="238" ry="82"  stroke="rgba(212,175,55,0.09)" strokeWidth="0.55" fill="none" />
        <ellipse cx="260" cy="260" rx="238" ry="136" stroke="rgba(212,175,55,0.13)" strokeWidth="0.65" fill="none" />
        <ellipse cx="260" cy="260" rx="238" ry="186" stroke="rgba(212,175,55,0.09)" strokeWidth="0.55" fill="none" />
        <ellipse cx="260" cy="260" rx="238" ry="224" stroke="rgba(212,175,55,0.11)" strokeWidth="0.60" fill="none" />

        {/* Longitude meridians */}
        <ellipse cx="260" cy="260" rx="16"  ry="238" stroke="rgba(212,175,55,0.11)" strokeWidth="0.65" fill="none" />
        <ellipse cx="260" cy="260" rx="70"  ry="238" stroke="rgba(212,175,55,0.08)" strokeWidth="0.55" fill="none" />
        <ellipse cx="260" cy="260" rx="128" ry="238" stroke="rgba(212,175,55,0.13)" strokeWidth="0.65" fill="none" />
        <ellipse cx="260" cy="260" rx="182" ry="238" stroke="rgba(212,175,55,0.08)" strokeWidth="0.55" fill="none" />
        <ellipse cx="260" cy="260" rx="222" ry="238" stroke="rgba(212,175,55,0.11)" strokeWidth="0.60" fill="none" />

        {/* Diagonal accent meridians */}
        <ellipse cx="260" cy="260" rx="108" ry="238" stroke="rgba(212,175,55,0.06)" strokeWidth="0.45" fill="none" transform="rotate(45 260 260)"  />
        <ellipse cx="260" cy="260" rx="155" ry="238" stroke="rgba(212,175,55,0.05)" strokeWidth="0.40" fill="none" transform="rotate(90 260 260)"  />
        <ellipse cx="260" cy="260" rx="108" ry="238" stroke="rgba(212,175,55,0.05)" strokeWidth="0.40" fill="none" transform="rotate(135 260 260)" />

        {/* Bright primary meridian — gold */}
        <ellipse cx="260" cy="260" rx="0" ry="238" stroke="rgba(212,175,55,0.55)" strokeWidth="1.6" fill="none" />

        {/* Static network nodes */}
        {([
          [175,165],[295,138],[345,208],[198,282],
          [315,302],[375,258],[148,322],[322,180],[242,345],[282,195],
        ] as [number,number][]).map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="#D4AF37" opacity="0.55" />
        ))}

        {/* Static connection lines */}
        {([
          [175,165,295,138],[295,138,345,208],[345,208,315,302],
          [375,258,345,208],[322,180,295,138],[282,195,295,138],[242,345,315,302],
        ] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212,175,55,0.22)" strokeWidth="0.85" />
        ))}

        {/* Centre crosshair */}
        <line x1="246" y1="260" x2="274" y2="260" stroke="#D4AF37" strokeWidth="1.0" opacity="0.32" />
        <line x1="260" y1="246" x2="260" y2="274" stroke="#D4AF37" strokeWidth="1.0" opacity="0.32" />
        <circle cx="260" cy="260" r="5.5" stroke="#D4AF37" strokeWidth="1.2" fill="none" opacity="0.38" />
        <circle cx="260" cy="260" r="2.2" fill="#D4AF37" opacity="0.48" />
      </motion.svg>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   STRATEGIC PILLARS — Sovereign Luxury 6-Card Grid
   ══════════════════════════════════════════════════ */

const pillars = [
  {
    id: 1,
    title: 'Migrant Welfare & Diaspora Protection Fund',
    desc: 'A dedicated premium community membership program for Orakzai migrants globally and domestically, providing complete healthcare coverage, repatriation services, and family security systems.',
    stat: '100% comprehensive coverage',
    href: '/migrant-welfare',
    icon: (
      <img
        src="/migrant-welfare-diaspora.jpg"
        alt="Migrant Welfare & Diaspora Protection Fund"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 2,
    title: 'Rights & Representation',
    desc: 'Legal advocacy and institutional representation dedicated to protecting the rights, interests, and collective voice of Orakzai communities worldwide.',
    stat: '120+ cases represented',
    href: '/rights-representation',
    icon: (
      <img
        src="/rights-representation.jpg"
        alt="Rights & Representation — raised fists"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 3,
    title: 'Education & Global Scholarships',
    desc: 'Scholarships, mentorship, leadership development, and international educational pathways that empower the next generation of Orakzai students.',
    stat: '360+ students in 12 cities',
    href: '/education-scholarships',
    icon: (
      <img
        src="/education-scholarships.jpg"
        alt="Education & Global Scholarships"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 4,
    title: 'Social Welfare & Crisis Relief',
    desc: 'Humanitarian assistance, poverty alleviation, emergency response initiatives, and sustainable support systems for vulnerable families.',
    stat: '3,100+ families supported',
    href: '/social-welfare-relief',
    icon: (
      <img
        src="/social-welfare.jpg"
        alt="Social Welfare & Crisis Relief"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 5,
    title: 'Economic Innovation & Grants',
    desc: 'Interest-free business grants, entrepreneurship support, digital innovation, and local economic development designed to strengthen community prosperity.',
    stat: '340+ grants disbursed',
    href: '/economic-innovation-grants',
    icon: (
      <img
        src="/economic-innovation.jpg"
        alt="Economic Innovation & Grants"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 6,
    title: 'Global Diaspora Network',
    desc: 'Connecting Orakzai professionals, families, entrepreneurs, and organizations across Pakistan, the Gulf, Europe, North America, and beyond.',
    stat: '14+ countries, 8 active chapters',
    href: '/global-diaspora-network',
    icon: (
      <img
        src="/global-diaspora.jpg"
        alt="Global Diaspora Network"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 7,
    title: 'Healthcare Infrastructure & Access',
    desc: 'Supporting modern healthcare initiatives through mobile clinics, clean water projects, preventive care, and improved medical accessibility in underserved regions.',
    stat: '120+ health cases resolved',
    href: '/healthcare-infrastructure',
    icon: (
      <img
        src="/healthcare-infrastructure.jpg"
        alt="Healthcare Infrastructure & Access"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 8,
    title: 'Women Empowerment & Skilled Artisans Support',
    desc: 'Launching dedicated vocational training centers, healthcare programs, and marketplace infrastructure to empower women and support local small-scale artisans.',
    stat: '450+ beneficiaries enrolled',
    href: '/women-empowerment-artisans',
    icon: (
      <img
        src="/women-empowerment.jpg"
        alt="Women Empowerment & Skilled Artisans Support"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 9,
    title: 'Youth Development & Sports Infrastructure',
    desc: 'Establishing local sports academies, youth mentorship programs, and constructive recreational facilities to engage the younger generation and promote healthy community development.',
    stat: '15+ sports facilities supported',
    href: '/youth-sports-development',
    icon: (
      <img
        src="/youth-sports.jpg"
        alt="Youth Development & Sports Infrastructure"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 10,
    title: 'Clean Water & Sanitation (WASH)',
    desc: 'Installing solar-powered water filtration plants and modern tube wells in remote areas to ensure access to safe, clean drinking water and hygienic sanitation systems.',
    stat: '80+ clean water points installed',
    href: '/clean-water-sanitation',
    icon: (
      <img
        src="/clean-water-sanitation.jpg"
        alt="Clean Water & Sanitation"
        className="w-full h-full object-cover rounded-full"
        style={{ borderRadius: '50%' }}
      />
    ),
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const href = (pillar as any).href ?? '/services';

  return (
    <Link href={href} className="block h-full">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full cursor-pointer"
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
    </Link>
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
            Orakzai.org operates through ten strategic pillars — each one a dedicated institution 
            in itself — spanning migrant welfare protection, rights advocacy, global education, 
            humanitarian relief, economic innovation, diaspora connectivity, frontline healthcare 
            access, women's empowerment, youth & sports development, and clean water access.
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
   TESTIMONIALS — global voices continuous marquee
   ══════════════════════════════════════════════════ */
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-8 flex flex-col gap-5"
      style={{
        width: 380,
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(212,175,55,0.16)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <span className="text-4xl" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>&ldquo;</span>
      <p className="text-white/70 text-sm leading-relaxed flex-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.02rem' }}>
        {t.quote}
      </p>
      <div className="flex items-start gap-3 pt-3" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <span className="text-2xl mt-0.5">{t.flag}</span>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{t.name}</p>
          <p className="text-[11px] mt-0.5 font-medium" style={{ color: GOLD, opacity: 0.9 }}>{(t as any).role}</p>
          <p className="text-white/35 text-xs mt-0.5">{t.place}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #011a10 0%, #00120a 100%)' }}>
      <div className="absolute inset-0 orakzai-pattern opacity-20 pointer-events-none" />

      <FadeIn direction="up" className="text-center mb-14 relative z-10 px-6">
        <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Global Voices</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Trusted Across Every Continent
        </h2>
        <div className="h-[1px] w-24 mx-auto mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <p className="text-white/45 text-sm max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
          International humanitarians, legal advisors, healthcare partners, and diaspora leaders from seven countries — speaking on Orakzai.org's global mandate.
        </p>
      </FadeIn>

      {/* Continuous right-to-left sliding marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #011a10, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, #011a10, transparent)' }} />
        <motion.div
          className="flex gap-6 px-6"
          style={{ width: 'max-content' }}
          animate={{ x: [0, -((380 + 24) * testimonials.length)] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Country flag strip */}
      <FadeIn direction="up" delay={0.2} className="relative z-10 mt-14 px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { flag: '🇨🇭', country: 'Switzerland' },
            { flag: '🇬🇧', country: 'United Kingdom' },
            { flag: '🇵🇰', country: 'Pakistan' },
            { flag: '🇦🇪', country: 'UAE' },
            { flag: '🇫🇷', country: 'France' },
            { flag: '🇺🇸', country: 'USA' },
            { flag: '🇶🇦', country: 'Qatar' },
          ].map((d) => (
            <div
              key={d.country}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.20)', color: 'rgba(255,255,255,0.75)' }}
            >
              <span className="text-base">{d.flag}</span>
              {d.country}
            </div>
          ))}
        </div>
      </FadeIn>
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

/* ── Scrolling ticker with global partner flags ── */
const tickerItems = [
  '🇨🇭 GENEVA — HUMAN RIGHTS OBSERVER',
  '✦ MUTAHID — BA-IKHTIYAR — TARAQI-YAFTA',
  '🇬🇧 LONDON — MIGRATION POLICY',
  '✦ UNITY — EMPOWERMENT — PROGRESS',
  '🇦🇪 DUBAI — DIASPORA RELIEF',
  '✦ DIGITAL EMBASSY OF ORAKZAI NATION',
  '🇫🇷 PARIS — PRO-BONO LEGAL COUNSEL',
  '✦ APNI MATTI — APNE LOG',
  '🇺🇸 HOUSTON — SYSTEMS ARCHITECTURE',
  '✦ BUILDING BRIDGES BETWEEN TRADITION AND MODERNITY',
  '🇶🇦 DOHA — HEALTHCARE ACCESS',
  '✦ ORAKZAI.ORG — GLOBAL HUMANITARIAN EMBASSY',
  '🇵🇰 PESHAWAR — COMMUNITY INFRASTRUCTURE',
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
        animate={{ x: [0, -4200] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
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
        <HeroBg />

        {/* Decorative globe emblem — right side, desktop only */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <GlobeEmblem />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-36 pb-32">
          <div className="max-w-2xl">

            {/* Eyebrow tag — institution credential bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-10"
            >
              <div className="h-px w-8 flex-shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
              <span
                className="text-[9px] sm:text-[11px] font-black tracking-[0.35em] uppercase"
                style={{ color: GOLD, letterSpacing: '0.32em' }}
              >
                ORAKZAI.ORG — GLOBAL HUMANITARIAN EMBASSY
              </span>
              <div className="h-px w-8 flex-shrink-0" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            </motion.div>

            {/* Pill badge — global reach */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.30)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px rgba(212,175,55,0.06)',
                }}
              >
                <GlobeIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                <span className="text-[11px] font-semibold tracking-wider" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Empowering Lives Across 12+ Countries
                </span>
              </div>
              {/* Live indicator */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)' }}>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#10b981' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(16,185,129,0.9)' }}>Active</span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="font-black text-white leading-[1.05] mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.6rem, 7vw, 5rem)',
                  textShadow: '0 4px 80px rgba(0,0,0,0.7), 0 0 120px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.01em',
                }}
              >
                <span className="block">Mutahid,</span>
                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 45%, #f5e07a 75%, ${GOLD} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.45))',
                  }}
                >
                  Ba-Ikhtiyar,
                </span>
                <span className="block text-white">Taraqi-Yafta</span>
              </h1>
            </motion.div>

            {/* Subtitle — SADA-E-INSANIYAT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
                <h2
                  className="text-xs md:text-sm font-black tracking-[0.45em] uppercase"
                  style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.42em' }}
                >
                  S A D A - E - I N S A N I Y A T
                </h2>
                <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(270deg, ${GOLD}, transparent)` }} />
              </div>

              <p
                className="leading-[1.8] mb-14"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  color: 'rgba(255,255,255,0.68)',
                  maxWidth: '520px',
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                }}
              >
                A digital sanctuary where heritage fuels global progress. Uniting underprivileged communities across all borders — empowering every family, elevating every student, and protecting every life.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA — gold gradient glassmorphism with shimmer */}
              <Link
                href="/join"
                className="relative overflow-hidden px-10 py-4 rounded-full font-bold text-base inline-block text-center"
                style={{
                  background: `linear-gradient(135deg, #a0740a 0%, ${GOLD} 40%, #f5e07a 72%, ${GOLD} 100%)`,
                  backgroundSize: '200% auto',
                  color: '#021a0c',
                  boxShadow: `0 6px 32px rgba(212,175,55,0.45), 0 2px 8px rgba(212,175,55,0.25), inset 0 1px 0 rgba(255,255,255,0.22)`,
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease, background-position 0.5s ease',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(-4px) scale(1.02)';
                  el.style.boxShadow = `0 14px 48px rgba(212,175,55,0.60), 0 4px 16px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.25)`;
                  el.style.backgroundPosition = 'right center';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(0) scale(1)';
                  el.style.boxShadow = `0 6px 32px rgba(212,175,55,0.45), 0 2px 8px rgba(212,175,55,0.25), inset 0 1px 0 rgba(255,255,255,0.22)`;
                  el.style.backgroundPosition = 'left center';
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)' }}
                  animate={{ x: ['-100%', '160%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6.5" /><path d="M8 5v3l2 1.2" />
                  </svg>
                  Become a Member
                </span>
              </Link>

              {/* Secondary CTA — glass border */}
              <Link
                href="/about"
                className="relative overflow-hidden px-9 py-4 rounded-full font-semibold text-base inline-block text-center"
                style={{
                  background: 'rgba(212,175,55,0.07)',
                  border: '1.5px solid rgba(212,175,55,0.50)',
                  color: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  transition: 'background 0.32s ease, border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(212,175,55,0.16)';
                  el.style.borderColor = 'rgba(212,175,55,0.90)';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 10px 32px rgba(212,175,55,0.22), inset 0 1px 0 rgba(255,255,255,0.10)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(212,175,55,0.07)';
                  el.style.borderColor = 'rgba(212,175,55,0.50)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06)';
                }}
              >
                <span className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
                <span className="relative z-10">Our Story</span>
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-20 flex gap-8 md:gap-12"
            >
              {[
                { val: '2.85K+', label: 'Members' },
                { val: '360+', label: 'Students' },
                { val: '120+', label: 'Health Cases' },
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
