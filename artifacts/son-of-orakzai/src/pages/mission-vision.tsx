import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Link } from "wouter";
import {
  Target, Eye, ShieldCheck, Coins, Landmark, Zap,
  ArrowRight, CheckCircle2, Globe, BookOpen, HeartHandshake,
} from "lucide-react";

/* ─────────────────────── Design tokens ─────────────────────── */
const GOLD = "#D4AF37";
const DARK_BG = "#011a10";
const CARD_BG = "rgba(5,26,16,0.92)";
const BORDER = "rgba(212,175,55,0.22)";
const BLUR = "blur(20px)";

/* ─────────────────────── Fade-in wrapper ───────────────────── */
function Reveal({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── Gold divider ─────────────────────── */
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-24 mx-auto ${className}`}
      style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
    />
  );
}

/* ─────────────────────── Section label pill ───────────────── */
function Pill({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
      style={{ background: "rgba(212,175,55,0.09)", border: `1px solid ${GOLD}55`, color: GOLD }}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MANDATE CARDS — Mission + Vision 2030
═══════════════════════════════════════════════════════════════ */
const MANDATES = [
  {
    id: "mission",
    icon: Target,
    label: "Our Mission",
    headline: "What We Do",
    accent: "#34d399",
    body: "To establish a sovereign digital sanctuary and global humanitarian platform that protects vulnerable individuals, funds higher education, delivers pro-bono legal aid, and provides interest-free economic grants across borders.",
    bullets: [
      "Pro-bono legal protection for the displaced",
      "Interest-free micro-grants & economic uplift",
      "Fully funded higher-education scholarships",
      "Cross-border humanitarian relief operations",
    ],
  },
  {
    id: "vision",
    icon: Eye,
    label: "Our Vision 2030",
    headline: "Where We're Going",
    accent: GOLD,
    body: "To build a fully interconnected, self-sustaining global diaspora ecosystem where every family has access to justice, healthcare, quality education, and clean infrastructure — regardless of geographic location.",
    bullets: [
      "Universal access to justice & legal counsel",
      "Integrated healthcare across 12+ nations",
      "Quality education pipelines for every child",
      "Clean water & sustainable infrastructure",
    ],
  },
];

function MandateCard({
  card, index,
}: { card: typeof MANDATES[number]; index: number }) {
  const Icon = card.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-[24px] p-8 md:p-10 flex flex-col h-full"
      style={{
        background: CARD_BG,
        backdropFilter: BLUR,
        WebkitBackdropFilter: BLUR,
        border: `1px solid ${BORDER}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px]"
        style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`, opacity: 0.7 }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none blur-3xl"
        style={{ background: card.accent, opacity: 0.08 }}
      />

      {/* Inner frame */}
      <div
        className="absolute inset-3 rounded-[18px] pointer-events-none"
        style={{ border: "1px solid rgba(212,175,55,0.1)" }}
      />

      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: `linear-gradient(155deg, ${card.accent}20, ${card.accent}06)`,
          border: `1px solid ${card.accent}50`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <Icon className="w-6 h-6" style={{ color: card.accent }} />
      </div>

      {/* Label pill */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-[0.2em] mb-3 self-start"
        style={{
          background: `linear-gradient(135deg, ${GOLD}, #a9822f)`,
          color: "#0a1f14",
          boxShadow: "0 2px 10px rgba(212,175,55,0.3)",
        }}
      >
        {card.label}
      </div>

      {/* Headline */}
      <h3
        className="text-2xl md:text-[26px] font-bold text-white mb-4 tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {card.headline}
      </h3>

      {/* Divider */}
      <div className="h-px mb-5 self-stretch" style={{ background: `linear-gradient(90deg, ${card.accent}40, transparent)` }} />

      {/* Body text */}
      <p className="text-white/68 leading-relaxed text-sm md:text-base mb-7 flex-1">
        {card.body}
      </p>

      {/* Bullets */}
      <ul className="space-y-2.5">
        {card.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-emerald-100/72">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: card.accent }} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOUR CORE PILLARS / VALUES
═══════════════════════════════════════════════════════════════ */
const PILLARS = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Sovereign Integrity",
    color: "#34d399",
    description:
      "Uncompromising transparency, equity, and protection of community rights — every decision anchored in institutional accountability and zero tolerance for corruption.",
    tags: ["Transparency", "Equity", "Rights"],
  },
  {
    icon: Coins,
    number: "02",
    title: "Economic Self-Reliance",
    color: GOLD,
    description:
      "Riba-free micro-grants and innovation pathways to eradicate poverty — empowering families with the capital and skills to build lasting financial independence.",
    tags: ["Interest-Free Grants", "Innovation", "Poverty Eradication"],
  },
  {
    icon: Landmark,
    number: "03",
    title: "Cultural Preservation",
    color: "#818cf8",
    description:
      "Honoring ancestral heritage, unity, and tribal honor on the world stage — ensuring that identity, language, and tradition survive across generations and borders.",
    tags: ["Heritage", "Unity", "Identity"],
  },
  {
    icon: Zap,
    number: "04",
    title: "Rapid Crisis Intervention",
    color: "#f97316",
    description:
      "Unwavering commitment to emergency relief and human safety — a standing rapid-response framework that deploys within hours when communities face displacement or disaster.",
    tags: ["Emergency Relief", "Rapid Response", "Human Safety"],
  },
];

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[number]; index: number }) {
  const Icon = pillar.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-[20px] p-7 flex flex-col overflow-hidden"
      style={{
        background: CARD_BG,
        backdropFilter: BLUR,
        WebkitBackdropFilter: BLUR,
        border: `1px solid ${BORDER}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = pillar.color + "70";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 0 32px ${pillar.color}18, 0 16px 40px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = BORDER;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.3)";
      }}
    >
      {/* Top color hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px] opacity-60 group-hover:opacity-100 transition-opacity duration-350"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)` }}
      />

      {/* Ambient glow (top-right) */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-400"
        style={{ background: pillar.color }}
      />

      {/* Ordinal */}
      <span
        className="absolute top-6 right-6 text-[11px] font-bold tracking-[0.25em] opacity-25 group-hover:opacity-55 transition-opacity duration-350"
        style={{ color: pillar.color, fontFamily: "'Playfair Display', serif" }}
      >
        {pillar.number}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-350 group-hover:scale-110 group-hover:-rotate-3"
        style={{
          background: `linear-gradient(155deg, ${pillar.color}1A, ${pillar.color}06)`,
          border: `1px solid ${pillar.color}44`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: pillar.color }} />
      </div>

      {/* Title */}
      <h4
        className="text-lg font-bold text-white mb-3 tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {pillar.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-emerald-100/60 leading-relaxed flex-1 mb-5">
        {pillar.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {pillar.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
            style={{
              background: `${pillar.color}12`,
              border: `1px solid ${pillar.color}35`,
              color: pillar.color,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IMPACT STATS BAR
═══════════════════════════════════════════════════════════════ */
const STATS = [
  { icon: Globe, value: "12+", label: "Countries Reached" },
  { icon: BookOpen, value: "500+", label: "Scholarships Granted" },
  { icon: HeartHandshake, value: "10,000+", label: "Families Supported" },
  { icon: Coins, value: "PKR 50M+", label: "Grants Disbursed" },
];

function StatBar() {
  return (
    <div
      className="rounded-[20px] p-7 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x"
      style={{
        background: CARD_BG,
        backdropFilter: BLUR,
        WebkitBackdropFilter: BLUR,
        border: `1px solid ${BORDER}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)",
        divideColor: "rgba(212,175,55,0.15)",
      }}
    >
      {STATS.map((s, i) => {
        const Icon = s.icon;
        return (
          <Reveal key={s.label} delay={i * 0.1} className="flex flex-col items-center text-center md:px-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}35` }}
            >
              <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" style={{ color: GOLD }} />
            </div>
            <span
              className="text-2xl md:text-3xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {s.value}
            </span>
            <span className="text-[11px] text-emerald-100/50 uppercase tracking-[0.15em] font-semibold">{s.label}</span>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMMITMENT TIMELINE  — milestones toward Vision 2030
═══════════════════════════════════════════════════════════════ */
const MILESTONES = [
  { year: "2022", label: "Platform Founded", detail: "Digital sanctuary launched; first diaspora network activated." },
  { year: "2024", label: "Legal Aid Wing", detail: "Pro-bono legal framework operational across 5 jurisdictions." },
  { year: "2026", label: "Education Fund", detail: "100+ scholarships disbursed; mentorship pipeline established." },
  { year: "2028", label: "Healthcare Corridors", detail: "Mobile clinic networks across Orakzai district and diaspora hubs." },
  { year: "2030", label: "Vision Complete", detail: "Fully self-sustaining global diaspora ecosystem — no family left behind." },
];

function MilestoneRow({ m, index, total }: { m: typeof MILESTONES[number]; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-start gap-5"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0"
          style={{
            background: isLast ? `linear-gradient(135deg, ${GOLD}, #a9822f)` : "rgba(212,175,55,0.1)",
            border: `2px solid ${isLast ? GOLD : "rgba(212,175,55,0.35)"}`,
            boxShadow: isLast ? "0 0 24px rgba(212,175,55,0.4)" : "none",
          }}
        >
          {isLast ? (
            <Eye className="w-4 h-4 text-emerald-950" />
          ) : (
            <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
          )}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-1 min-h-[48px]" style={{ background: "rgba(212,175,55,0.2)" }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-1">
          <span
            className="text-xs font-extrabold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full"
            style={{
              background: isLast ? `linear-gradient(135deg, ${GOLD}, #a9822f)` : "rgba(212,175,55,0.1)",
              color: isLast ? "#0a1f14" : GOLD,
              border: isLast ? "none" : `1px solid ${GOLD}40`,
            }}
          >
            {m.year}
          </span>
          <h5
            className="text-base font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {m.label}
          </h5>
        </div>
        <p className="text-sm text-emerald-100/55 leading-relaxed">{m.detail}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function MissionVision() {
  useEffect(() => {
    document.title = "Mission & Vision | Orakzai.org — Digital Embassy";
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const desc =
      "Orakzai.org's Mission & Vision — building a sovereign digital sanctuary, funding higher education, delivering pro-bono legal aid, and forging a self-sustaining global diaspora ecosystem by 2030.";
    setMeta("description", desc);
    setMeta("og:title", "Mission & Vision | Orakzai.org", true);
    setMeta("og:description", desc, true);
    return () => { document.title = "Orakzai.org — Digital Embassy"; };
  }, []);

  return (
    <MainLayout>
      <div
        className="min-h-screen"
        style={{ background: `linear-gradient(135deg, ${DARK_BG} 0%, #022c22 50%, ${DARK_BG} 100%)` }}
      >
        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <div className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 text-center px-4">
          {/* Background texture blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
              style={{ background: GOLD }}
            />
            <div
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
              style={{ background: "#34d399" }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-[0.05]"
              style={{ background: GOLD }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.4em] mb-5"
            style={{ color: GOLD, letterSpacing: "0.4em" }}
          >
            P U R P O S E &nbsp;•&nbsp; D I R E C T I O N &nbsp;•&nbsp; I M P A C T
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
          >
            Our Mission &<br className="hidden sm:block" /> Vision
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.5 }}
          >
            <GoldDivider className="mb-6" />
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65 }}
            className="text-white/68 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Guiding our global community towards systemic dignity, economic self-reliance, and borderless solidarity.
          </motion.p>

          {/* Breadcrumb pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-xs text-white/35"
          >
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>Mission &amp; Vision</span>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════
            CONTENT
        ════════════════════════════════════════ */}
        <div className="container mx-auto px-4 md:px-8 pb-28 max-w-6xl space-y-24">

          {/* ── 1. MANDATE CARDS ── */}
          <section>
            <Reveal className="text-center mb-10">
              <Pill icon={Target} label="Core Mandate" />
              <h2
                className="text-3xl md:text-4xl font-bold text-white mt-5 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Dual Mandate
              </h2>
              <GoldDivider className="mb-4" />
              <p className="text-white/52 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Two declarations — one of present action, one of future horizon — that together define every decision Orakzai.org makes.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
              {MANDATES.map((card, i) => (
                <MandateCard key={card.id} card={card} index={i} />
              ))}
            </div>
          </section>

          {/* ── 2. IMPACT STATS ── */}
          <section>
            <Reveal className="text-center mb-8">
              <Pill icon={Globe} label="Real-World Impact" />
            </Reveal>
            <Reveal delay={0.1}>
              <StatBar />
            </Reveal>
          </section>

          {/* ── 3. FOUR CORE PILLARS ── */}
          <section>
            <Reveal className="text-center mb-10">
              <Pill icon={ShieldCheck} label="Core Institutional Values" />
              <h2
                className="text-3xl md:text-4xl font-bold text-white mt-5 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Four Pillars of Conduct
              </h2>
              <GoldDivider className="mb-4" />
              <p className="text-white/52 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                The values that govern how we act — non-negotiable commitments that underpin every program, decision, and partnership.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {PILLARS.map((p, i) => (
                <PillarCard key={p.title} pillar={p} index={i} />
              ))}
            </div>
          </section>

          {/* ── 4. ROADMAP TO 2030 ── */}
          <section>
            <Reveal className="text-center mb-10">
              <Pill icon={Eye} label="Vision 2030 Roadmap" />
              <h2
                className="text-3xl md:text-4xl font-bold text-white mt-5 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Path Forward
              </h2>
              <GoldDivider className="mb-4" />
              <p className="text-white/52 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Concrete milestones on the journey from today's platform to a fully self-sustaining global diaspora ecosystem.
              </p>
            </Reveal>

            <div
              className="rounded-[24px] p-8 md:p-10 max-w-2xl mx-auto"
              style={{
                background: CARD_BG,
                backdropFilter: BLUR,
                WebkitBackdropFilter: BLUR,
                border: `1px solid ${BORDER}`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.35)",
              }}
            >
              {/* Top accent */}
              <div
                className="h-[2px] w-full rounded-full mb-8"
                style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
              />
              {MILESTONES.map((m, i) => (
                <MilestoneRow key={m.year} m={m} index={i} total={MILESTONES.length} />
              ))}
            </div>
          </section>

          {/* ── 5. CLOSING COMMITMENT BLOCK ── */}
          <section>
            <Reveal>
              <div
                className="relative rounded-[24px] p-10 md:p-14 text-center overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, rgba(6,55,36,0.88) 0%, rgba(2,20,13,0.94) 100%)",
                  backdropFilter: BLUR,
                  WebkitBackdropFilter: BLUR,
                  border: `1px solid ${GOLD}40`,
                  boxShadow: `0 0 80px rgba(212,175,55,0.08), 0 24px 64px rgba(0,0,0,0.45)`,
                }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center top, rgba(212,175,55,0.08) 0%, transparent 65%)" }}
                />
                {/* Inner frame */}
                <div
                  className="absolute inset-4 rounded-[18px] pointer-events-none"
                  style={{ border: "1px solid rgba(212,175,55,0.1)" }}
                />

                <div className="relative">
                  {/* Quote mark */}
                  <div
                    className="text-7xl font-bold opacity-15 leading-none mb-4 select-none"
                    style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
                  >
                    "
                  </div>

                  <p
                    className="text-xl md:text-2xl font-bold text-white mb-4 max-w-2xl mx-auto leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    If the mountains could no longer hold us together,<br className="hidden md:block" />
                    we would build something that could.
                  </p>

                  <GoldDivider className="mb-4" />

                  <p className="text-sm text-white/50 mb-10 tracking-widest uppercase">
                    — Founding Principle, Orakzai.org
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/join">
                      <span
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.14em] cursor-pointer transition-all hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${GOLD}, #a9822f)`,
                          color: "#04140e",
                          boxShadow: "0 6px 22px rgba(212,175,55,0.4)",
                        }}
                      >
                        Become a Member
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <Link href="/donate">
                      <span
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.14em] cursor-pointer transition-all hover:scale-105"
                        style={{
                          background: "rgba(212,175,55,0.07)",
                          border: `1px solid ${GOLD}55`,
                          color: GOLD,
                        }}
                      >
                        Support the Mission
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
