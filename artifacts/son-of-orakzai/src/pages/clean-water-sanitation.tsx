import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Droplet, Filter, Waves, Wind, Sun, Upload,
  CheckCircle2, Lock, BadgeCheck, MapPin, Mail,
  Phone, User, ArrowRight, ShieldCheck, Users,
  Building2, Wrench, FlaskConical, Gauge, Leaf,
  Zap, Globe2, Activity, HandHeart, Layers,
  Triangle, Circle, BarChart3, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GOLD = "#D4AF37";
const EMERALD_DEEP = "#00120B";
const WATER_BLUE = "#4db8ff";

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
    const duration = 2400; const step = 16;
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

function generateWaterHash(): string {
  return `O-WATER-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ background: EMERALD_DEEP }}>

      {/* Layered radial glows — cool blue tinge for water theme */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(77,184,255,0.05) 0%, transparent 65%)," +
          "radial-gradient(ellipse 45% 55% at 5% 75%, rgba(0,100,60,0.1) 0%, transparent 55%)," +
          "radial-gradient(ellipse 45% 55% at 95% 75%, rgba(0,100,60,0.1) 0%, transparent 55%)," +
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
      }} />

      {/* Ripple / wave grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 15% at 50% 30%, rgba(77,184,255,1) 0%, transparent 100%)," +
            "radial-gradient(ellipse 80% 15% at 50% 60%, rgba(77,184,255,1) 0%, transparent 100%)," +
            "radial-gradient(ellipse 80% 15% at 50% 90%, rgba(77,184,255,1) 0%, transparent 100%)",
        }} />

      {/* Floating water/infra icons */}
      {[
        { Icon: Droplet,      x: "9%",  y: "18%", size: 17 },
        { Icon: Filter,       x: "85%", y: "14%", size: 15 },
        { Icon: Sun,          x: "7%",  y: "64%", size: 14 },
        { Icon: Waves,        x: "88%", y: "62%", size: 15 },
        { Icon: FlaskConical, x: "50%", y: "86%", size: 13 },
        { Icon: Zap,          x: "28%", y: "10%", size: 11 },
      ].map(({ Icon, x, y, size }, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ left: x, top: y }}
          animate={{ y: [-8, 8, -8], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 4.5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
          <Icon style={{ width: size, height: size, color: WATER_BLUE }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{ background: "rgba(77,184,255,0.08)", border: "1px solid rgba(77,184,255,0.25)" }}>
          <Droplet className="w-3.5 h-3.5" style={{ color: WATER_BLUE }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: WATER_BLUE }}>
            Clean Water & Sanitation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
          Sustaining Life,{" "}
          <span style={{
            background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Securing Sanitation
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}>
          Orakzai.org's Clean Water & Sanitation programme engineers sustainable water access,
          installs advanced RO filtration networks, deploys solar-powered extraction systems in
          hyper-arid zones, and constructs modern sanitation infrastructure for communities where
          clean water and dignified hygiene remain out of reach.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#water-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
            <Droplet className="w-4 h-4" />
            Submit a Project Request
          </a>
          <a href="#water-verticals"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
            <ArrowRight className="w-4 h-4" />
            Our Infrastructure
          </a>
        </motion.div>

        {/* Metric strip */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "250+",    label: "Clean Water Points Built" },
            { value: "45,000+", label: "Lives Daily Impacted" },
            { value: "100%",    label: "Free Public Access" },
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
   THREE WATER VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: Filter, tag: "Vertical I", title: "Clean Water Filtration Plants",
    color: "rgba(77,184,255,0.07)", borderColor: "rgba(77,184,255,0.22)",
    iconBg: "rgba(77,184,255,0.1)", iconColor: WATER_BLUE, badge: "RO Systems",
    description:
      "Deployment blueprints, structural planning, and project tracking for community-level high-capacity reverse osmosis and advanced filtration water networks — engineering clean drinking water access where contamination and infrastructure failure have made it impossible.",
    pillars: [
      { icon: Filter,       label: "RO & Multi-Stage Filtration", desc: "Industrial-grade reverse osmosis plants sized for community throughput, removing heavy metals, bacteria, and contaminants" },
      { icon: Gauge,        label: "Capacity & Flow Monitoring",  desc: "Live sensor networks tracking output volume, filter saturation, and maintenance triggers for uninterrupted supply" },
      { icon: Wrench,       label: "Maintenance & Servicing Grid", desc: "Scheduled filter replacements, pump servicing, and on-call technical support for all installed plant infrastructure" },
    ],
    tags: ["RO Plants", "Filtration", "Monitoring", "Maintenance"],
  },
  {
    icon: Droplet, tag: "Vertical II", title: "Water Well & Borehole Construction",
    color: "rgba(212,175,55,0.07)", borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)", iconColor: GOLD, badge: "Deep Wells",
    description:
      "Sustainable deep-well drilling programmes and solar-powered extraction pump deployments in hyper-arid, drought-prone, or water-scarce zones — providing communities with autonomous, off-grid water access that does not depend on municipal supply chains.",
    pillars: [
      { icon: Layers,       label: "Deep Borehole Drilling",       desc: "Geological survey, site selection, and precision drilling to depths reaching the permanent water table" },
      { icon: Sun,          label: "Solar Pump Integration",        desc: "Off-grid solar-powered submersible pumps eliminating fuel dependency and enabling 24/7 extraction without external power" },
      { icon: ShieldCheck,  label: "Water Quality Certification",   desc: "On-site TDS testing, microbiological analysis, and WHO-standard quality certification for each commissioned well" },
    ],
    tags: ["Boreholes", "Solar Pumps", "Off-Grid", "Quality Testing"],
  },
  {
    icon: Building2, tag: "Vertical III", title: "Hygiene & Sanitation Systems",
    color: "rgba(80,200,120,0.07)", borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)", iconColor: "#50c878", badge: "WASH",
    description:
      "Constructing modern, gender-segregated, and hygienic public sanitation facilities alongside community hygiene resource kit distribution — addressing the full Water, Sanitation, and Hygiene (WASH) spectrum in under-served communities.",
    pillars: [
      { icon: Building2,    label: "Sanitation Block Construction", desc: "Gender-segregated, ventilated, and disability-accessible sanitation units built to WHO WASH design standards" },
      { icon: HandHeart,    label: "Hygiene Resource Kit Distribution", desc: "Soap, water purification tablets, menstrual health supplies, and ORS packets distributed to registered households" },
      { icon: Leaf,         label: "Community Hygiene Education",   desc: "Structured hygiene awareness campaigns covering handwashing, water storage, and disease prevention protocols" },
    ],
    tags: ["Sanitation Units", "Hygiene Kits", "WASH Standards", "Education"],
  },
];

function WaterVerticals() {
  return (
    <section id="water-verticals" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Infrastructure Architecture"
          title="Three Pillars of WASH Delivery"
          subtitle="From industrial filtration plants to borehole wells and sanitation blocks — our three-vertical model covers every dimension of clean water and hygiene access, engineered for the communities that need it most urgently."
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
   LIVE INFRASTRUCTURE METRICS
══════════════════════════════════════════════ */
const METRICS = [
  { value: 250,   suffix: "+",  label: "Clean Water Points Built",   sub: "Wells, filters & treatment plants",    icon: Droplet },
  { value: 45000, suffix: "+",  label: "Lives Daily Impacted",        sub: "Direct daily beneficiaries",           icon: Users },
  { value: 100,   suffix: "%",  label: "Free Public Access",          sub: "Zero-cost water for all communities",  icon: ShieldCheck },
  { value: 32,    suffix: "+",  label: "Active Project Zones",        sub: "Operational WASH sites worldwide",     icon: Globe2 },
];

function LiveMetrics() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(77,184,255,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Programme Impact"
          title="Infrastructure Built, Lives Changed"
          subtitle="Behind every water point is a family that no longer walks miles for unsafe water. Behind every sanitation unit is a community that has regained its dignity. These numbers represent that reality at scale."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeIn key={m.label} delay={i * 0.1}>
                <div className="rounded-2xl p-6 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(12px)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(77,184,255,0.1)" }}>
                    <Icon className="w-4 h-4" style={{ color: WATER_BLUE }} />
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
            style={{ background: "rgba(77,184,255,0.04)", border: "1px solid rgba(77,184,255,0.15)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(77,184,255,0.1)" }}>
              <Leaf className="w-6 h-6" style={{ color: WATER_BLUE }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">
                WHO WASH Standards · Solar-Powered · Zero Dependency on Municipal Grids
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every water infrastructure project commissioned by Orakzai.org is designed to
                WHO WASH compliance standards, engineered for long-term sustainability without
                reliance on fragile municipal supply chains, and transferred into full community
                ownership upon handover — because water access should never have an expiry date.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   WATER PROJECT STATUS CARD
══════════════════════════════════════════════ */
const PROJECT_STAGES = [
  { id: "logged",     label: "Request Logged",           icon: Droplet },
  { id: "vetting",   label: "Geological / Site Vetting", icon: FlaskConical },
  { id: "resources", label: "Resource Mobilisation",     icon: Wrench },
  { id: "handover",  label: "Implementation & Handover", icon: CheckCircle2 },
];

function WaterProjectCard({ waterHash }: { waterHash: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [syncPct, setSyncPct] = useState(0);

  useEffect(() => {
    let stage = 0;
    const st = setInterval(() => {
      stage += 1; setActiveStage(stage);
      if (stage >= PROJECT_STAGES.length - 1) clearInterval(st);
    }, 900);
    let pct = 0;
    const pt = setInterval(() => {
      pct += 2; setSyncPct(Math.min(pct, 100));
      if (pct >= 100) clearInterval(pt);
    }, 38);
    return () => { clearInterval(st); clearInterval(pt); };
  }, [waterHash]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-7"
      style={{
        background: "linear-gradient(135deg, rgba(0,18,11,0.92) 0%, rgba(0,28,20,0.88) 100%)",
        border: "1px solid rgba(77,184,255,0.25)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 0 60px rgba(77,184,255,0.06), inset 0 1px 0 rgba(77,184,255,0.1)",
      }}>

      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(77,184,255,0.08)", border: "1px solid rgba(77,184,255,0.25)" }}>
          <Droplet className="w-3 h-3" style={{ color: WATER_BLUE }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: WATER_BLUE }}>
            Water Project Hash Issued
          </span>
        </div>
        <div className="text-xl md:text-2xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}>
          {waterHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Quote this reference to our infrastructure field coordination team
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}>Project Processing</span>
          <span className="text-[10px] font-bold" style={{ color: GOLD }}>{syncPct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, #1a8bcc, ${WATER_BLUE})` }}
            initial={{ width: "0%" }} animate={{ width: `${syncPct}%` }}
            transition={{ duration: 0.1 }} />
        </div>
      </div>

      {/* 4-stage tracker */}
      <div className="relative mb-6">
        <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px"
          style={{ background: "rgba(77,184,255,0.15)" }} />
        <motion.div className="absolute top-5 left-[calc(12.5%)] h-px"
          style={{ background: `linear-gradient(to right, #1a8bcc, ${WATER_BLUE})` }}
          initial={{ width: "0%" }}
          animate={{ width: activeStage >= PROJECT_STAGES.length - 1 ? "75%" : `${(activeStage / (PROJECT_STAGES.length - 1)) * 75}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }} />
        <div className="relative grid grid-cols-4 gap-2">
          {PROJECT_STAGES.map((stage, i) => {
            const SIcon = stage.icon;
            const isActive = i <= activeStage;
            const isCurrent = i === activeStage;
            return (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <motion.div className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                    animate={{
                      background: isActive ? `linear-gradient(135deg, #1a8bcc, ${WATER_BLUE})` : "rgba(255,255,255,0.05)",
                      borderColor: isActive ? WATER_BLUE : "rgba(255,255,255,0.1)",
                    }}
                    style={{ border: "2px solid" }} transition={{ duration: 0.4 }}>
                    <SIcon className="w-4 h-4" style={{ color: isActive ? "#00120B" : "rgba(255,255,255,0.3)" }} />
                  </motion.div>
                  {isCurrent && (
                    <motion.div className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${WATER_BLUE}` }}
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
          style={{ background: "rgba(77,184,255,0.05)", border: "1px solid rgba(77,184,255,0.15)" }}>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {activeStage === 0 && "✦ Your project request has been securely logged. Our infrastructure team will acknowledge within 72 hours."}
            {activeStage === 1 && "✦ Our field engineers are conducting geological survey and site assessment for your target location."}
            {activeStage === 2 && "✦ Equipment, drilling teams, and materials are being mobilised and dispatched to site."}
            {activeStage === 3 && "✦ Project implementation underway. Upon completion, the water point will be handed over to community stewardship."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   WATER PROJECT INTAKE FORM
══════════════════════════════════════════════ */
const REQUEST_TYPES = [
  { value: "well",        label: "Community Water Well",  icon: Droplet },
  { value: "filtration",  label: "Filtration Plant",      icon: Filter },
  { value: "sanitation",  label: "Sanitation Unit",       icon: Building2 },
  { value: "maintenance", label: "Emergency Maintenance", icon: Wrench },
];

function WaterForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [waterHash, setWaterHash] = useState("");
  const [form, setForm] = useState({
    name: "", requestType: "", location: "", population: "", email: "", phone: "", notes: "",
  });
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.requestType || !form.location || !form.email) {
      toast({ title: "Incomplete Form", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    const hash = generateWaterHash();
    setWaterHash(hash);
    setSubmitted(true);
    toast({ title: "Water Project Hash Issued", description: `Your reference: ${hash}` });
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", requestType: "", location: "", population: "", email: "", phone: "", notes: "" });
    setFileName("");
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <WaterProjectCard waterHash={waterHash} />
        <div className="mt-6 text-center">
          <button onClick={reset} className="text-sm font-medium underline"
            style={{ color: "rgba(212,175,55,0.6)" }}>Submit another request</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="rounded-2xl p-7 md:p-10 space-y-5"
        style={{
          background: "linear-gradient(135deg, rgba(0,18,11,0.85) 0%, rgba(0,25,15,0.80) 100%)",
          border: "1px solid rgba(77,184,255,0.18)", backdropFilter: "blur(16px)",
          boxShadow: "inset 0 1px 0 rgba(77,184,255,0.07)",
        }}>

        {/* Notice */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(77,184,255,0.06)", border: "1px solid rgba(77,184,255,0.15)" }}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: WATER_BLUE }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            All submissions are reviewed by our infrastructure field team within 72 hours.
          </p>
        </div>

        {/* Applicant Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Applicant Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(77,184,255,0.5)" }} />
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name or community representative name"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(77,184,255,0.15)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Request Type */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Request Type <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {REQUEST_TYPES.map((rt) => {
              const RIcon = rt.icon;
              return (
                <button key={rt.value} type="button"
                  onClick={() => setForm({ ...form, requestType: rt.value })}
                  className="px-3 py-3 rounded-xl text-left text-xs font-medium transition-all flex items-center gap-2.5"
                  style={{
                    background: form.requestType === rt.value ? "rgba(77,184,255,0.12)" : "rgba(0,0,0,0.3)",
                    border: form.requestType === rt.value ? `1px solid ${WATER_BLUE}` : "1px solid rgba(77,184,255,0.12)",
                    color: form.requestType === rt.value ? WATER_BLUE : "rgba(255,255,255,0.55)",
                  }}>
                  <RIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  {rt.label}
                  {form.requestType === rt.value && <CheckCircle2 className="w-3.5 h-3.5 ml-auto" style={{ color: WATER_BLUE }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Location */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Exact Target Location / Region <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(77,184,255,0.5)" }} />
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Village, District, Province, Country"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(77,184,255,0.15)", color: "rgba(255,255,255,0.9)" }} />
          </div>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Be as specific as possible — GPS coordinates welcome if available
          </p>
        </div>

        {/* Estimated Population */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Estimated Population Impacted{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(77,184,255,0.5)" }} />
            <Input value={form.population} onChange={(e) => setForm({ ...form, population: e.target.value })}
              placeholder="e.g. 500 households, approx. 3,000 people"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(77,184,255,0.15)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Email <span style={{ color: GOLD }}>*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(77,184,255,0.5)" }} />
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(77,184,255,0.15)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Phone <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(77,184,255,0.5)" }} />
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+92 300 000 0000" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(77,184,255,0.15)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
        </div>

        {/* Site Image Upload */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Site Image / Proof Upload{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px dashed rgba(77,184,255,0.2)" }}>
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(77,184,255,0.1)" }}>
              <Upload className="w-3.5 h-3.5" style={{ color: WATER_BLUE }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: fileName ? WATER_BLUE : "rgba(255,255,255,0.5)" }}>
                {fileName || "Upload site photos or location proof"}
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>JPG, PNG, WEBP, PDF — max 10MB</p>
            </div>
            {fileName && <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: WATER_BLUE }} />}
          </label>
        </div>

        {/* Additional notes */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Additional Context{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Describe the current water situation, urgency level, existing infrastructure, and any access challenges for field teams..."
            rows={3}
            className="w-full rounded-xl p-3.5 text-sm resize-none"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(77,184,255,0.15)", color: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "inherit" }} />
        </div>

        <Button type="submit"
          className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}>
          <Droplet className="w-4 h-4" />
          Submit Water Project Request
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DEPLOYMENT ZONES
══════════════════════════════════════════════ */
const ZONES = [
  { region: "Khyber Pakhtunkhwa",      detail: "RO plants · borehole wells · rural sanitation blocks" },
  { region: "FATA & Tribal Regions",   detail: "Solar pump wells · emergency water trucking · hygiene kits" },
  { region: "Balochistan",             detail: "Hyper-arid borehole drilling · filtration units · WASH education" },
  { region: "Sindh & Punjab Flood Zones", detail: "Flood-resilient platforms · water purification tablets · reconstruction" },
  { region: "Afghanistan Border Zones", detail: "Emergency water trucking · portable RO units · sanitation tents" },
  { region: "Sub-Saharan Africa",      detail: "Hand-pump boreholes · community hygiene campaigns · school WASH" },
];

function DeploymentZones() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Field Presence" title="Active Deployment Zones"
          subtitle="Our WASH infrastructure teams operate across the most water-stressed regions globally — from the arid highlands of Balochistan to sub-Saharan flood zones, every deployment is tailored to the hydrology and community needs of the specific terrain." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ZONES.map((z, i) => (
            <FadeIn key={z.region} delay={i * 0.08}>
              <div className="rounded-xl p-5"
                style={{ background: "rgba(0,18,11,0.7)", border: "1px solid rgba(77,184,255,0.12)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: WATER_BLUE }} />
                  <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{z.region}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{z.detail}</p>
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
        style={{ background: EMERALD_DEEP, borderTop: "1px solid rgba(77,184,255,0.08)" }}>
        <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(77,184,255,0.05) 0%, rgba(0,40,22,0.6) 50%, rgba(212,175,55,0.04) 100%)",
            border: "1px solid rgba(212,175,55,0.2)", backdropFilter: "blur(16px)",
          }}>
          <div className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(77,184,255,0.04) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <Waves className="w-10 h-10 mx-auto mb-5" style={{ color: WATER_BLUE }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
              Clean Water Is Not a Luxury — It Is a Right
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              If your community lacks safe drinking water, functional sanitation, or access to
              basic hygiene infrastructure — submit a project request. Our field engineering teams
              will assess, plan, and deploy within the shortest possible timeframe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#water-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
                <Droplet className="w-4 h-4" />
                Request a Water Project
              </a>
              <a href="/social-welfare-relief"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                <HandHeart className="w-4 h-4" style={{ color: GOLD }} />
                Emergency Relief
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
export default function CleanWaterSanitation() {
  return (
    <MainLayout>
      <Hero />
      <WaterVerticals />
      <LiveMetrics />
      <DeploymentZones />

      <section id="water-form" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Project Request Portal"
            title="Submit a Water or Sanitation Project"
            subtitle="Tell us where the need is and what type of infrastructure is required. Our field engineering team will conduct an assessment, plan the deployment, and keep you updated at every stage."
          />
          <WaterForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
