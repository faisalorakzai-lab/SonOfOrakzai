import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Dumbbell, Trophy, Users, Building2, Zap, Star,
  Target, Globe2, Medal, Flame, ArrowRight, Lock,
  BadgeCheck, MapPin, Mail, Phone, User, Link2,
  Rocket, BookOpen, ShieldCheck, CheckCircle2,
  Cpu, Landmark, Bike, Swords, Timer, Crown,
  TrendingUp, BarChart3, GraduationCap, Heart,
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
function FadeIn({ children, delay = 0, className = "" }:
  { children: React.ReactNode; delay?: number; className?: string }) {
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

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2200; const step = 16;
    const inc = target / (duration / step); let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, step);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
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

function generateYouthHash(): string {
  return `O-YOUTH-${Math.floor(1000 + Math.random() * 9000)}`;
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
          "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(212,175,55,0.07) 0%, transparent 65%)," +
          "radial-gradient(ellipse 40% 55% at 5% 70%, rgba(0,110,60,0.1) 0%, transparent 55%)," +
          "radial-gradient(ellipse 40% 55% at 95% 70%, rgba(0,110,60,0.1) 0%, transparent 55%)",
      }} />

      {/* Dynamic grid lines — stadium / court feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }} />

      {/* Floating sport/youth icons */}
      {[
        { Icon: Trophy,      x: "9%",  y: "18%", size: 17 },
        { Icon: Dumbbell,    x: "85%", y: "15%", size: 15 },
        { Icon: Star,        x: "7%",  y: "65%", size: 13 },
        { Icon: Rocket,      x: "88%", y: "62%", size: 15 },
        { Icon: Medal,       x: "50%", y: "86%", size: 14 },
        { Icon: Zap,         x: "28%", y: "10%", size: 11 },
      ].map(({ Icon, x, y, size }, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ left: x, top: y }}
          animate={{ y: [-8, 8, -8], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 4.2 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
          <Icon style={{ width: size, height: size, color: GOLD }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Dumbbell className="w-3.5 h-3.5" style={{ color: GOLD }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Youth & Sports Development
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
          Empowering Youth,{" "}
          <span style={{
            background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Championing Leadership
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}>
          Orakzai.org's Youth & Sports Development programme nurtures young global talent through
          elite academic and athletic pathways, constructs premium grassroots sports infrastructure
          in underserved communities, and develops the next generation of leaders capable of carrying
          their communities — and their nations — forward.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#youth-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
            <Rocket className="w-4 h-4" />
            Register Your Profile
          </a>
          <a href="#youth-verticals"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
            <ArrowRight className="w-4 h-4" />
            Explore Programmes
          </a>
        </motion.div>

        {/* Metric strip */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "2,400+", label: "Young Leaders Mentored" },
            { value: "30+",    label: "Sports Facilities Funded" },
            { value: "150+",   label: "Professional Athletes Supported" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>{m.value}</div>
              <div className="text-[11px] font-medium tracking-wide"
                style={{ color: "rgba(255,255,255,0.45)" }}>{m.label}</div>
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
   THREE YOUTH VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: GraduationCap, tag: "Vertical I", title: "Youth Leadership Academy",
    color: "rgba(212,175,55,0.07)", borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)", iconColor: GOLD, badge: "Leadership",
    description:
      "Structured bootcamps, civic cohort programmes, and global mentorship networks that develop young people in governance, civic responsibility, and technology ethics — building the institutional leaders communities need for the next century.",
    pillars: [
      { icon: Landmark, label: "Governance & Civic Bootcamps", desc: "Intensive residential programmes covering public administration, policy design, and community leadership frameworks" },
      { icon: Globe2,   label: "Global Mentorship Network",   desc: "1-to-1 mentorship pairings with senior diaspora leaders, politicians, academics, and sector heads" },
      { icon: Cpu,      label: "Tech Ethics & Innovation",    desc: "Curriculum modules in digital governance, AI ethics, cybersecurity awareness, and civic tech application" },
    ],
    tags: ["Leadership", "Governance", "Mentorship", "Tech Ethics"],
  },
  {
    icon: Trophy, tag: "Vertical II", title: "Elite Sports Grants & Scouting",
    color: "rgba(255,200,80,0.07)", borderColor: "rgba(255,200,80,0.2)",
    iconBg: "rgba(255,200,80,0.1)", iconColor: "#ffc850", badge: "Talent Pipeline",
    description:
      "High-impact funding packages for young athletes covering standard-grade equipment, competition entry fees, international tournament travel grants, and a structured talent tracking and scouting pipeline connecting gifted players to professional pathways.",
    pillars: [
      { icon: Medal,    label: "Equipment & Gear Provision",      desc: "Full kit, footwear, protective equipment, and training tools supplied to registered athletes" },
      { icon: Globe2,   label: "International Tournament Grants", desc: "Covered travel, accommodation, and registration costs for qualifying athletes attending overseas competitions" },
      { icon: Target,   label: "Talent Scouting Pipeline",        desc: "Structured scouting protocol connecting top performers with regional, national, and international academies" },
    ],
    tags: ["Sports Grants", "Equipment", "Int'l Travel", "Scouting"],
  },
  {
    icon: Building2, tag: "Vertical III", title: "Community Sports Arenas",
    color: "rgba(80,200,120,0.07)", borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)", iconColor: "#50c878", badge: "Infrastructure",
    description:
      "Engineering frameworks, structural resource allocation, and community mobilisation programmes to build, upgrade, and maintain high-grade sports fields, courts, and recreational complexes in underserved zones — giving youth a professional environment to train in.",
    pillars: [
      { icon: Building2, label: "Sports Field Construction",       desc: "Full build-out of football pitches, cricket grounds, basketball courts, and athletics tracks in target communities" },
      { icon: Dumbbell,  label: "Gym & Training Facility Fit-Out", desc: "Equipment installation, flooring, ventilation, and safety systems for indoor training centres" },
      { icon: ShieldCheck, label: "Maintenance & Operations Support", desc: "Ongoing operational grants covering ground staff, equipment maintenance, and facility management costs" },
    ],
    tags: ["Construction", "Facilities", "Gyms", "Operations"],
  },
];

function YouthVerticals() {
  return (
    <section id="youth-verticals" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Programme Architecture"
          title="Three Pillars of Youth Development"
          subtitle="From grassroots talent identification to elite athletic pathways and civic leadership — our three-vertical model ensures that no promising young person is left without a structured route to their full potential."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {VERTICALS.map((v, i) => {
            const Icon = v.icon;
            return (
              <FadeIn key={v.tag} delay={i * 0.12}>
                <div className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: v.color, border: `1px solid ${v.borderColor}`, backdropFilter: "blur(12px)" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-black tracking-[0.35em] uppercase px-3 py-1 rounded-full w-fit"
                        style={{ color: v.iconColor, background: v.iconBg, border: `1px solid ${v.borderColor}` }}>
                        {v.tag}
                      </span>
                      <span className="text-[9px] font-bold px-3 py-1 rounded-full w-fit"
                        style={{ color: v.iconColor, background: v.iconBg }}>{v.badge}</span>
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
                  <div className="flex flex-wrap gap-2 mt-auto pt-5"
                    style={{ borderTop: `1px solid ${v.borderColor}` }}>
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
   LIVE METRICS
══════════════════════════════════════════════ */
const METRICS = [
  { value: 2400, suffix: "+", label: "Young Leaders Mentored",       sub: "Active programme graduates",              icon: Users },
  { value: 30,   suffix: "+", label: "Sports Facilities Funded",      sub: "Fields, courts & gyms built or upgraded", icon: Building2 },
  { value: 150,  suffix: "+", label: "Professional Athletes Supported",sub: "Across 12+ sports disciplines",           icon: Trophy },
  { value: 48,   suffix: "+", label: "Countries Represented",         sub: "Youth members across the globe",          icon: Globe2 },
];

function LiveMetrics() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Programme Impact"
          title="Numbers That Represent Real Futures"
          subtitle="Every mentored leader, every funded facility, and every athlete supported is a direct investment in the human capital that will define the next chapter of our communities."
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
                    <AnimatedCounter target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>{m.label}</div>
                  <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>{m.sub}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Commitment strip */}
        <FadeIn delay={0.4} className="mt-12">
          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
            style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.18)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}>
              <Flame className="w-6 h-6" style={{ color: GOLD }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">
                Talent-First · Merit-Driven · Community-Anchored
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every programme slot, grant, and facility investment is allocated on the basis of
                talent, need, and community impact — not connections or wealth. Orakzai.org's Youth
                & Sports Development programme is the institutional meritocracy our communities
                were never given, until now.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   YOUTH PROFILE STATUS CARD
══════════════════════════════════════════════ */
const EVAL_STAGES = [
  { id: "logged",    label: "Profile Registered", icon: User },
  { id: "screening", label: "Talent Screening",   icon: Target },
  { id: "review",   label: "Programme Review",    icon: BadgeCheck },
  { id: "active",   label: "Pathway Activated",   icon: Rocket },
];

function YouthProfileCard({ youthHash }: { youthHash: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [syncPct, setSyncPct] = useState(0);

  useEffect(() => {
    let stage = 0;
    const st = setInterval(() => {
      stage += 1; setActiveStage(stage);
      if (stage >= EVAL_STAGES.length - 1) clearInterval(st);
    }, 900);
    let pct = 0;
    const pt = setInterval(() => {
      pct += 2; setSyncPct(Math.min(pct, 100));
      if (pct >= 100) clearInterval(pt);
    }, 38);
    return () => { clearInterval(st); clearInterval(pt); };
  }, [youthHash]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-7"
      style={{
        background: "linear-gradient(135deg, rgba(0,18,11,0.92) 0%, rgba(0,30,18,0.88) 100%)",
        border: "1px solid rgba(212,175,55,0.35)", backdropFilter: "blur(24px)",
        boxShadow: "0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.15)",
      }}>

      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Trophy className="w-3 h-3" style={{ color: GOLD }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Youth Profile Hash Issued
          </span>
        </div>
        <div className="text-xl md:text-2xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}>
          {youthHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Present this reference to any Orakzai.org youth programme coordinator
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}>Evaluation Progress</span>
          <span className="text-[10px] font-bold" style={{ color: GOLD }}>{syncPct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, #b8860b, ${GOLD})` }}
            initial={{ width: "0%" }} animate={{ width: `${syncPct}%` }}
            transition={{ duration: 0.1 }} />
        </div>
      </div>

      {/* 4-stage tracker */}
      <div className="relative mb-6">
        <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px"
          style={{ background: "rgba(212,175,55,0.15)" }} />
        <motion.div className="absolute top-5 left-[calc(12.5%)] h-px"
          style={{ background: `linear-gradient(to right, ${GOLD}, rgba(212,175,55,0.4))` }}
          initial={{ width: "0%" }}
          animate={{ width: activeStage >= EVAL_STAGES.length - 1 ? "75%" : `${(activeStage / (EVAL_STAGES.length - 1)) * 75}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }} />
        <div className="relative grid grid-cols-4 gap-2">
          {EVAL_STAGES.map((stage, i) => {
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
                    <motion.div className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${GOLD}` }}
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

      <AnimatePresence mode="wait">
        <motion.div key={activeStage}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {activeStage === 0 && "✦ Your youth profile has been securely registered. Our programme team will review your submission within 48 hours."}
            {activeStage === 1 && "✦ Our scouts and programme leads are assessing your talent profile, specialisation, and development potential."}
            {activeStage === 2 && "✦ Your profile is being matched against available grants, academy slots, and mentorship cohorts."}
            {activeStage === 3 && "✦ Pathway activated. Welcome to the Orakzai.org Youth & Sports Development network — your coordinator will be in touch shortly."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   YOUTH INTAKE FORM
══════════════════════════════════════════════ */
const CATEGORY_FOCUS = [
  { value: "athletics", label: "Athletics / Sports", icon: Trophy },
  { value: "leadership", label: "Leadership / Civic", icon: Landmark },
  { value: "tech", label: "Tech / Innovation", icon: Cpu },
];

const SPORT_TYPES = [
  { value: "football",  label: "Football" },
  { value: "cricket",   label: "Cricket" },
  { value: "athletics", label: "Athletics" },
  { value: "boxing",    label: "Boxing / Martial Arts" },
  { value: "basketball",label: "Basketball" },
  { value: "swimming",  label: "Swimming" },
  { value: "cycling",   label: "Cycling / Endurance" },
  { value: "other",     label: "Other Sport / Discipline" },
];

function YouthForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [youthHash, setYouthHash] = useState("");
  const [form, setForm] = useState({
    name: "", age: "", category: "", specialization: "", location: "", email: "", phone: "", portfolio: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.category || !form.location || !form.email) {
      toast({ title: "Incomplete Form", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    const hash = generateYouthHash();
    setYouthHash(hash);
    setSubmitted(true);
    toast({ title: "Youth Profile Hash Issued", description: `Your reference: ${hash}` });
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", age: "", category: "", specialization: "", location: "", email: "", phone: "", portfolio: "" });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <YouthProfileCard youthHash={youthHash} />
        <div className="mt-6 text-center">
          <button onClick={reset} className="text-sm font-medium underline"
            style={{ color: "rgba(212,175,55,0.6)" }}>Register another profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="rounded-2xl p-7 md:p-10 space-y-5"
        style={{
          background: "linear-gradient(135deg, rgba(0,18,11,0.85) 0%, rgba(0,25,15,0.80) 100%)",
          border: "1px solid rgba(212,175,55,0.2)", backdropFilter: "blur(16px)",
          boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)",
        }}>

        {/* Notice */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            All profiles are confidential and reviewed only by verified programme coordinators.
          </p>
        </div>

        {/* Name + Age */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Full Name <span style={{ color: GOLD }}>*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Age <span style={{ color: GOLD }}>*</span>
            </Label>
            <Input type="number" min="10" max="35" value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              placeholder="e.g. 19" className="h-11 rounded-xl text-sm"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Category Focus */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Category Focus <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORY_FOCUS.map((c) => {
              const CIcon = c.icon;
              return (
                <button key={c.value} type="button"
                  onClick={() => setForm({ ...form, category: c.value, specialization: "" })}
                  className="px-3 py-3.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-2 transition-all"
                  style={{
                    background: form.category === c.value ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.3)",
                    border: form.category === c.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                    color: form.category === c.value ? GOLD : "rgba(255,255,255,0.5)",
                  }}>
                  <CIcon className="w-4 h-4" />
                  <span className="text-center leading-tight">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sport / Specialization — shown only for athletics category */}
        {form.category === "athletics" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            className="space-y-2 overflow-hidden">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Sport / Specialization
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {SPORT_TYPES.map((s) => (
                <button key={s.value} type="button"
                  onClick={() => setForm({ ...form, specialization: s.value })}
                  className="px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all"
                  style={{
                    background: form.specialization === s.value ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.3)",
                    border: form.specialization === s.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                    color: form.specialization === s.value ? GOLD : "rgba(255,255,255,0.5)",
                  }}>
                  {form.specialization === s.value && <CheckCircle2 className="w-3 h-3 inline mr-1.5" style={{ color: GOLD }} />}
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Leadership / Tech specialization */}
        {(form.category === "leadership" || form.category === "tech") && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            className="space-y-2 overflow-hidden">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Area of Specialization
            </Label>
            <Input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })}
              placeholder={form.category === "leadership" ? "e.g. Public Policy, Community Organizing" : "e.g. AI, Cybersecurity, App Development"}
              className="h-11 rounded-xl text-sm"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </motion.div>
        )}

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Location <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="City, Country" className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Contact */}
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
                placeholder="+92 300 000 0000" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
        </div>

        {/* Portfolio Link */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Achievement / Video Portfolio Link{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <div className="relative">
            <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
              placeholder="YouTube highlight reel, LinkedIn, GitHub, or personal site URL"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Athletes: link a match highlight or training video · Leaders: LinkedIn or project profile
          </p>
        </div>

        <Button type="submit"
          className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}>
          <Rocket className="w-4 h-4" />
          Submit Youth Profile
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SPORTS ZONES
══════════════════════════════════════════════ */
const ZONES = [
  { region: "Khyber Pakhtunkhwa",    sports: "Football · Cricket · Boxing · Athletics" },
  { region: "FATA & Tribal Districts", sports: "Traditional Wrestling · Football · Volleyball" },
  { region: "Gilgit-Baltistan",      sports: "Polo · Mountain Athletics · Football" },
  { region: "Urban Pakistan (Diaspora)", sports: "Cricket · Football · Basketball · Martial Arts" },
  { region: "Gulf Countries",        sports: "Multi-discipline youth academies · Indoor arenas" },
  { region: "United Kingdom & Europe", sports: "Football academies · Athletics clubs · Leadership hubs" },
];

function SportsZones() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Facility Coverage" title="Active Sports Zones by Region"
          subtitle="Our infrastructure programme targets communities where youth have talent but no arena to develop it in — each zone receives tailored sports facility investment aligned with its indigenous sporting traditions." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ZONES.map((z, i) => (
            <FadeIn key={z.region} delay={i * 0.08}>
              <div className="rounded-xl p-5"
                style={{ background: "rgba(0,18,11,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                  <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{z.region}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{z.sports}</p>
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
            border: "1px solid rgba(212,175,55,0.2)", backdropFilter: "blur(16px)",
          }}>
          <div className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <Trophy className="w-10 h-10 mx-auto mb-5" style={{ color: GOLD }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
              Your Potential Deserves a Platform
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Whether you're a young athlete, a civic leader in the making, or a tech innovator
              without resources — Orakzai.org's Youth & Sports Development programme is your
              institutional gateway to the world stage. Register today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#youth-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
                <Rocket className="w-4 h-4" />
                Register Your Profile
              </a>
              <a href="/economic-innovation-grants"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                <Dumbbell className="w-4 h-4" style={{ color: GOLD }} />
                Explore Grants
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
export default function YouthSportsDevelopment() {
  return (
    <MainLayout>
      <Hero />
      <YouthVerticals />
      <LiveMetrics />
      <SportsZones />

      <section id="youth-form" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Talent Registration Portal"
            title="Submit Your Youth Profile"
            subtitle="Register your talent, ambition, and location — our programme coordinators will match you with the right academy cohort, sports grant, or leadership pathway within 48 hours."
          />
          <YouthForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
