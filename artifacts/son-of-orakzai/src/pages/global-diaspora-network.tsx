import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe, Users, Briefcase, ShieldCheck, MapPin, Link2,
  GraduationCap, MessageSquare, ArrowRight, BadgeCheck,
  Lock, Send, CheckCircle2, Wifi, Network, Star,
  Building2, Handshake, BookOpen, Phone, Mail,
  UserCheck, ChevronRight, Linkedin, Zap, Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GOLD = "#D4AF37";
const EMERALD_DEEP = "#00120B";

/* ══════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════ */
function FadeIn({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2200; const step = 16;
    const increment = target / (duration / step); let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function SectionHeader({ eyebrow, title, subtitle, center = true }:
  { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <FadeIn className={`mb-14 ${center ? "text-center max-w-2xl mx-auto" : "max-w-xl"}`}>
      <span className="text-[10px] font-black tracking-[0.35em] uppercase block mb-3" style={{ color: GOLD }}>
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{subtitle}</p>
      )}
    </FadeIn>
  );
}

function generateDiasporaHash(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `O-DIASPORA-${num}`;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ background: EMERALD_DEEP }}>
      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(212,175,55,0.07) 0%, transparent 65%), " +
          "radial-gradient(ellipse 40% 60% at 15% 70%, rgba(0,100,60,0.1) 0%, transparent 55%), " +
          "radial-gradient(ellipse 40% 60% at 85% 70%, rgba(0,100,60,0.1) 0%, transparent 55%)",
      }} />

      {/* Globe grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      {/* Orbiting dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 5 + i * 2, height: 5 + i * 2,
            background: `rgba(212,175,55,${0.1 + i * 0.04})`,
            border: "1px solid rgba(212,175,55,0.25)",
            left: `${18 + i * 16}%`, top: `${25 + (i % 3) * 18}%`,
          }}
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Globe className="w-3.5 h-3.5" style={{ color: GOLD }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Global Diaspora Network
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
          Bridging Borders,{" "}
          <span style={{
            background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Uniting Communities
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}>
          Orakzai.org's Global Diaspora Network is a sovereign institutional infrastructure connecting
          overseas professionals, expatriates, and migrant laborers across six continents into a single
          collaborative ecosystem — enabling internal trade, mutual mentorship, legal coordination,
          and collective representation on the world stage.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#diaspora-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
            <UserCheck className="w-4 h-4" />
            Join the Network
          </a>
          <a href="#network-verticals"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
            <ArrowRight className="w-4 h-4" />
            Explore Programs
          </a>
        </motion.div>

        {/* Metric strip */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "4,500+", label: "Registered Expats" },
            { value: "24+", label: "Global Strategic Hubs" },
            { value: "100%", label: "Secure Directory" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                {m.value}
              </div>
              <div className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #00120B)" }} />
    </section>
  );
}

/* ══════════════════════════════════════════════
   THREE NETWORK VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: Network, tag: "Vertical I", title: "Global Member Directory",
    color: "rgba(212,175,55,0.07)", borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)", iconColor: GOLD,
    badge: "Live Database",
    description:
      "A unified, cryptographically secured directory mapping every registered professional, business owner, and diaspora leader by country, industry, and skill set — enabling internal trade pipelines and collaborative ventures across borders.",
    pillars: [
      { icon: MapPin, label: "Country & Region Mapping", desc: "Searchable profiles organized by current country of residence and region of origin" },
      { icon: Briefcase, label: "Industry & Skill Index", desc: "Sector-tagged profiles enabling B2B discovery and cross-border talent sourcing" },
      { icon: Handshake, label: "Internal Trade Facilitation", desc: "Dedicated matchmaking pathways connecting diaspora buyers and sellers globally" },
    ],
    tags: ["Directory", "Trade Links", "Skill Index", "B2B Matching"],
  },
  {
    icon: GraduationCap, tag: "Vertical II", title: "Professional Skill-Sharing",
    color: "rgba(100,180,255,0.07)", borderColor: "rgba(100,180,255,0.2)",
    iconBg: "rgba(100,180,255,0.1)", iconColor: "#6ab4ff",
    badge: "Mentorship",
    description:
      "Structured mentorship pathways, remote consulting bridges, and collaborative knowledge transfer programs that connect senior overseas experts with grassroots local talent — accelerating capability development across underserved regions.",
    pillars: [
      { icon: Link2, label: "Mentorship Pathway Program", desc: "1-to-1 mentorship matching between senior diaspora professionals and rising local talent" },
      { icon: Radio, label: "Remote Consulting Links", desc: "Virtual consulting sessions enabling skills transfer without geographic barriers" },
      { icon: BookOpen, label: "Knowledge Transfer Archives", desc: "Curated professional resources, guides, and case studies shared across the network" },
    ],
    tags: ["Mentorship", "Remote Consulting", "Knowledge Sharing", "Upskilling"],
  },
  {
    icon: ShieldCheck, tag: "Vertical III", title: "Diaspora Sovereign Support Desk",
    color: "rgba(80,200,120,0.07)", borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)", iconColor: "#50c878",
    badge: "24/7 Support",
    description:
      "Immediate operational coordination for legal crises, labor disputes, passport emergencies, and logistical challenges faced by members abroad — a single point of institutional authority standing behind every member in their hour of need.",
    pillars: [
      { icon: ShieldCheck, label: "Legal & Labor Coordination", desc: "Rapid response channels for workplace rights, contract disputes, and legal aid" },
      { icon: Building2, label: "Passport & Document Support", desc: "Expedited consular coordination and documentation assistance for members abroad" },
      { icon: MessageSquare, label: "Crisis Communication Line", desc: "Direct WhatsApp and secure messaging support for members in urgent situations" },
    ],
    tags: ["Legal Aid", "Document Support", "Labor Rights", "Crisis Line"],
  },
];

function NetworkVerticals() {
  return (
    <section id="network-verticals" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Network Architecture"
          title="Three Pillars of Global Connectivity"
          subtitle="The Global Diaspora Network operates across three interconnected verticals — each designed to address a distinct dimension of the overseas experience, from professional advancement to emergency support."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {VERTICALS.map((v, i) => {
            const Icon = v.icon;
            return (
              <FadeIn key={v.tag} delay={i * 0.12}>
                <div className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: v.color, border: `1px solid ${v.borderColor}`, backdropFilter: "blur(12px)" }}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-black tracking-[0.35em] uppercase px-3 py-1 rounded-full w-fit"
                        style={{ color: v.iconColor, background: v.iconBg, border: `1px solid ${v.borderColor}` }}>
                        {v.tag}
                      </span>
                      <span className="text-[9px] font-bold px-3 py-1 rounded-full w-fit"
                        style={{ color: v.iconColor, background: v.iconBg }}>
                        {v.badge}
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: v.iconBg }}>
                      <Icon className="w-5 h-5" style={{ color: v.iconColor }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.95)" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {v.description}
                  </p>

                  <div className="space-y-4 mb-6 flex-grow">
                    {v.pillars.map((p) => {
                      const PIcon = p.icon;
                      return (
                        <div key={p.label} className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: v.iconBg }}>
                            <PIcon className="w-3.5 h-3.5" style={{ color: v.iconColor }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{p.label}</p>
                            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{p.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-5" style={{ borderTop: `1px solid ${v.borderColor}` }}>
                    {v.tags.map((t) => (
                      <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: v.iconColor, background: v.iconBg }}>{t}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   LIVE NETWORK METRICS
══════════════════════════════════════════════ */
const METRICS = [
  { value: 4500, prefix: "", suffix: "+", label: "Registered Expats", sub: "Active network members globally", icon: Users },
  { value: 24, prefix: "", suffix: "+", label: "Strategic Hubs", sub: "Operational hubs across continents", icon: Globe },
  { value: 100, prefix: "", suffix: "%", label: "Secure Directory", sub: "Cryptographic data protection", icon: ShieldCheck },
  { value: 60, prefix: "", suffix: "+", label: "Countries Covered", sub: "From GCC to Europe to Americas", icon: MapPin },
];

function NetworkMetrics() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Network Statistics"
          title="A Living, Growing Global Ecosystem"
          subtitle="Every registration expands the network's reach. Every connection made through the directory creates economic and social value that compounds across generations of the diaspora."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeIn key={m.label} delay={i * 0.1}>
                <div className="rounded-2xl p-6 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(12px)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(212,175,55,0.1)" }}>
                    <Icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                    <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{m.label}</div>
                  <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>{m.sub}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Security assurance strip */}
        <FadeIn delay={0.4} className="mt-12">
          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
            style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.18)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}>
              <BadgeCheck className="w-6 h-6" style={{ color: GOLD }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">
                Cryptographically Secured · Privacy-First · Member-Controlled Data
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every member profile in the Global Diaspora Network is protected by cryptographic access controls.
                Your data is never sold, never shared without consent, and always under your sovereign control —
                because trust is the foundation every diaspora institution must be built on.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   DIASPORA PASS ONBOARDING FORM + STATUS CARD
══════════════════════════════════════════════ */
const INDUSTRIES = [
  { value: "technology", label: "Technology & IT" },
  { value: "healthcare", label: "Healthcare & Medicine" },
  { value: "finance", label: "Finance & Banking" },
  { value: "engineering", label: "Engineering & Construction" },
  { value: "education", label: "Education & Academia" },
  { value: "trade", label: "Trade & Commerce" },
  { value: "legal", label: "Legal & Advocacy" },
  { value: "other", label: "Other / Diverse" },
];

const SYNC_STAGES = [
  { id: "registered", label: "Profile Registered", icon: UserCheck },
  { id: "verified", label: "Identity Verified", icon: BadgeCheck },
  { id: "indexed", label: "Directory Indexed", icon: Network },
  { id: "active", label: "Pass Activated", icon: Wifi },
];

function DiasporaPassCard({ passHash }: { passHash: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [syncPct, setSyncPct] = useState(0);

  useEffect(() => {
    let stage = 0;
    const stageTimer = setInterval(() => {
      stage += 1;
      setActiveStage(stage);
      if (stage >= SYNC_STAGES.length - 1) clearInterval(stageTimer);
    }, 950);
    // Smooth sync percentage
    let pct = 0;
    const pctTimer = setInterval(() => {
      pct += 2;
      setSyncPct(Math.min(pct, 100));
      if (pct >= 100) clearInterval(pctTimer);
    }, 38);
    return () => { clearInterval(stageTimer); clearInterval(pctTimer); };
  }, [passHash]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-7"
      style={{
        background: "linear-gradient(135deg, rgba(0,18,11,0.92) 0%, rgba(0,30,18,0.88) 100%)",
        border: "1px solid rgba(212,175,55,0.35)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.15)",
      }}>

      {/* Pass header */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Lock className="w-3 h-3" style={{ color: GOLD }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Diaspora Pass Issued
          </span>
        </div>
        <div className="text-xl md:text-2xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}>
          {passHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Your secure member reference — present this to any Orakzai.org hub worldwide
        </p>
      </div>

      {/* Sync progress bar */}
      <div className="mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
            Network Synchronization
          </span>
          <span className="text-[10px] font-bold" style={{ color: GOLD }}>{syncPct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, #b8860b, ${GOLD})` }}
            initial={{ width: "0%" }}
            animate={{ width: `${syncPct}%` }}
            transition={{ duration: 0.1 }} />
        </div>
      </div>

      {/* Stage nodes */}
      <div className="relative mb-6">
        <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px"
          style={{ background: "rgba(212,175,55,0.15)" }} />
        <motion.div className="absolute top-5 left-[calc(12.5%)] h-px"
          style={{ background: `linear-gradient(to right, ${GOLD}, rgba(212,175,55,0.4))` }}
          initial={{ width: "0%" }}
          animate={{ width: activeStage >= SYNC_STAGES.length - 1 ? "75%" : `${(activeStage / (SYNC_STAGES.length - 1)) * 75}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }} />

        <div className="relative grid grid-cols-4 gap-2">
          {SYNC_STAGES.map((stage, i) => {
            const SIcon = stage.icon;
            const isActive = i <= activeStage;
            const isCurrent = i === activeStage;
            return (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <motion.div className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                    animate={{
                      background: isActive ? `linear-gradient(135deg, #b8860b, ${GOLD})` : "rgba(255,255,255,0.05)",
                      borderColor: isActive ? GOLD : "rgba(255,255,255,0.1)",
                    }}
                    style={{ border: "2px solid" }} transition={{ duration: 0.4 }}>
                    <SIcon className="w-4 h-4" style={{ color: isActive ? "#011a10" : "rgba(255,255,255,0.3)" }} />
                  </motion.div>
                  {isCurrent && (
                    <motion.div className="absolute inset-0 rounded-full" style={{ border: `2px solid ${GOLD}` }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }} />
                  )}
                </div>
                <span className="text-[9px] font-semibold text-center leading-tight"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live status */}
      <AnimatePresence mode="wait">
        <motion.div key={activeStage}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {activeStage === 0 && "✦ Your profile has been securely registered in the Diaspora Network intake queue."}
            {activeStage === 1 && "✦ Our team is verifying your credentials and professional affiliation."}
            {activeStage === 2 && "✦ Your profile is being indexed into the Global Member Directory — searchable by verified members."}
            {activeStage === 3 && "✦ Diaspora Pass activated. Welcome to the Global Orakzai.org Network."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function DiasporaForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [passHash, setPassHash] = useState("");
  const [form, setForm] = useState({
    name: "", country: "", industry: "", title: "", email: "", phone: "", bio: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.industry || !form.title || !form.email) {
      toast({ title: "Incomplete Form", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    const hash = generateDiasporaHash();
    setPassHash(hash);
    setSubmitted(true);
    toast({ title: "Diaspora Pass Issued", description: `Welcome to the network — your pass is ${hash}` });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <DiasporaPassCard passHash={passHash} />
        <div className="mt-6 text-center">
          <button onClick={() => { setSubmitted(false); setForm({ name: "", country: "", industry: "", title: "", email: "", phone: "", bio: "" }); }}
            className="text-sm font-medium underline" style={{ color: "rgba(212,175,55,0.6)" }}>
            Register another member
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="rounded-2xl p-7 md:p-10 space-y-5"
        style={{
          background: "linear-gradient(135deg, rgba(0,18,11,0.85) 0%, rgba(0,25,15,0.80) 100%)",
          border: "1px solid rgba(212,175,55,0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)",
        }}>

        {/* Security notice */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            All registrations are encrypted and verified. Your data is never shared without consent.
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Full Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full legal name" className="h-11 rounded-xl text-sm"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
        </div>

        {/* Country of Residence */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Current Country of Residence <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="e.g. United Arab Emirates, United Kingdom, USA"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Profession / Industry <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {INDUSTRIES.map((ind) => (
              <button key={ind.value} type="button" onClick={() => setForm({ ...form, industry: ind.value })}
                className="px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all"
                style={{
                  background: form.industry === ind.value ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.3)",
                  border: form.industry === ind.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                  color: form.industry === ind.value ? GOLD : "rgba(255,255,255,0.55)",
                }}>
                {form.industry === ind.value && <CheckCircle2 className="w-3 h-3 inline mr-1.5" style={{ color: GOLD }} />}
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corporate Title */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Corporate Title / Affiliation <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Senior Engineer at Aramco, CEO at XYZ Ltd"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Contact: Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Email <span style={{ color: GOLD }}>*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Phone <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 555 000 0000" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
        </div>

        {/* Bio / LinkedIn */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Professional Bio / LinkedIn URL{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <div className="relative">
            <Linkedin className="absolute left-3.5 top-3.5 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Paste your LinkedIn URL or write a short professional bio — helps the directory surface you to relevant members..."
              rows={3}
              className="w-full rounded-xl p-3.5 pl-10 text-sm resize-none"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "inherit" }} />
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}>
          <UserCheck className="w-4 h-4" />
          Issue My Diaspora Pass
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HUB LOCATIONS STRIP
══════════════════════════════════════════════ */
const HUBS = [
  { region: "Gulf Region", countries: "UAE · Saudi Arabia · Qatar · Kuwait · Bahrain · Oman" },
  { region: "Europe", countries: "United Kingdom · Germany · Sweden · Netherlands · France" },
  { region: "North America", countries: "United States · Canada · Mexico" },
  { region: "South Asia", countries: "Pakistan · India · Bangladesh · Sri Lanka" },
  { region: "East Africa", countries: "Kenya · Uganda · Tanzania · Ethiopia" },
  { region: "Australia & Pacific", countries: "Australia · New Zealand · Papua New Guinea" },
];

function HubLocations() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Global Presence" title="Strategic Hubs Across Six Continents"
          subtitle="Orakzai.org maintains active coordination hubs in diaspora-dense regions worldwide — each hub functions as a physical and digital gateway into the global member network." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {HUBS.map((hub, i) => (
            <FadeIn key={hub.region} delay={i * 0.08}>
              <div className="rounded-xl p-5"
                style={{ background: "rgba(0,18,11,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                  <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{hub.region}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{hub.countries}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CTA BAND
══════════════════════════════════════════════ */
function CtaBand() {
  return (
    <FadeIn>
      <section className="py-20 px-4 sm:px-6"
        style={{ background: EMERALD_DEEP, borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(0,40,22,0.6) 50%, rgba(212,175,55,0.04) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            backdropFilter: "blur(16px)",
          }}>
          <div className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <Globe className="w-10 h-10 mx-auto mb-5" style={{ color: GOLD }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
              Your Network Is Waiting
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Whether you're a professional in Dubai, a student in London, or a laborer in Riyadh —
              the Global Diaspora Network is your institutional home abroad. Register today and access
              support, connections, and resources that no diaspora member should be without.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#diaspora-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
                <UserCheck className="w-4 h-4" />
                Join the Network
              </a>
              <a href="/migrant-welfare"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                <ShieldCheck className="w-4 h-4" style={{ color: GOLD }} />
                Migrant Protection Fund
              </a>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════ */
export default function GlobalDiasporaNetwork() {
  return (
    <MainLayout>
      <Hero />
      <NetworkVerticals />
      <NetworkMetrics />
      <HubLocations />

      {/* Diaspora Onboarding Portal */}
      <section id="diaspora-form" className="py-24 px-4 sm:px-6"
        style={{ background: "#010f09" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Network Enrollment"
            title="Register for Your Diaspora Pass"
            subtitle="Join 4,500+ members across the global network. Your Diaspora Pass unlocks access to the member directory, support desk, mentorship pathways, and all 24 strategic hubs worldwide."
          />
          <DiasporaForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
