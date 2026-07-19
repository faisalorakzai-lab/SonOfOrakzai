import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart, Stethoscope, Pill, Building2, Wifi, ShieldCheck,
  MapPin, FileText, Upload, CheckCircle2, ClipboardList,
  ArrowRight, Lock, BadgeCheck, Phone, Mail, User,
  Activity, Microscope, Ambulance, Cross, FlaskConical,
  MonitorSmartphone, Syringe, Thermometer, BarChart3,
  HeartPulse, BriefcaseMedical, Globe2, ChevronRight,
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

function AnimatedCounter({ target, prefix = "", suffix = "" }:
  { target: number; prefix?: string; suffix?: string }) {
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
      <span className="text-[10px] font-black tracking-[0.35em] uppercase block mb-3"
        style={{ color: GOLD }}>
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

function generateMedHash(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `O-MED-${num}`;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ background: EMERALD_DEEP }}>
      {/* Radial glows — red-tinted for medical urgency, constrained to gold palette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse 65% 50% at 50% 20%, rgba(212,175,55,0.06) 0%, transparent 65%)," +
          "radial-gradient(ellipse 45% 55% at 10% 80%, rgba(0,90,50,0.12) 0%, transparent 55%)," +
          "radial-gradient(ellipse 45% 55% at 90% 80%, rgba(0,90,50,0.12) 0%, transparent 55%)",
      }} />

      {/* Subtle cross / plus grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Floating medical icons */}
      {[
        { Icon: HeartPulse, x: "12%", y: "22%", size: 18 },
        { Icon: Stethoscope, x: "82%", y: "18%", size: 16 },
        { Icon: Pill, x: "8%", y: "68%", size: 14 },
        { Icon: Microscope, x: "88%", y: "62%", size: 15 },
        { Icon: Syringe, x: "50%", y: "88%", size: 13 },
      ].map(({ Icon, x, y, size }, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          animate={{ y: [-8, 8, -8], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 4 + i * 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}>
          <Icon style={{ width: size, height: size, color: GOLD }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Heart className="w-3.5 h-3.5" style={{ color: GOLD }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Healthcare Infrastructure & Access
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
          Preserving Health,{" "}
          <span style={{
            background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Advancing Care
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}>
          Orakzai.org's Healthcare Infrastructure & Access programme builds resilient medical
          networks, subsidizes critical treatments for those who cannot afford them, and deploys
          accessible clinical infrastructure directly into underserved communities — because health
          is not a privilege; it is an institutional obligation.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#healthcare-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
            <BriefcaseMedical className="w-4 h-4" />
            Submit a Medical Case
          </a>
          <a href="#health-verticals"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
            <ArrowRight className="w-4 h-4" />
            Our Programmes
          </a>
        </motion.div>

        {/* Metric strip */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "120+", label: "Active Cases Managed" },
            { value: "35+", label: "Verified Medical Experts" },
            { value: "100%", label: "Confidential Care" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                {m.value}
              </div>
              <div className="text-[11px] font-medium tracking-wide"
                style={{ color: "rgba(255,255,255,0.45)" }}>
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
   THREE HEALTHCARE VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: MonitorSmartphone, tag: "Vertical I", title: "Digital Telehealth Network",
    color: "rgba(212,175,55,0.07)", borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)", iconColor: GOLD,
    badge: "Live Portal",
    description:
      "A live integration portal connecting remote and marginalized patients with board-certified medical practitioners and specialists for free virtual consultations — removing geography as a barrier to quality healthcare.",
    pillars: [
      { icon: Wifi, label: "Virtual Consultation Gateway", desc: "Secure encrypted video and messaging consultations with verified specialists" },
      { icon: Stethoscope, label: "Specialist Referral Network", desc: "Triage and direct referral pathways to cardiologists, oncologists, surgeons, and general practitioners" },
      { icon: ClipboardList, label: "Digital Patient Records", desc: "Secure, portable case files maintained across all consultations for continuity of care" },
    ],
    tags: ["Telehealth", "Specialist Access", "Free Consultations", "Digital Records"],
  },
  {
    icon: Pill, tag: "Vertical II", title: "Critical Medical Subsidies",
    color: "rgba(100,180,255,0.07)", borderColor: "rgba(100,180,255,0.2)",
    iconBg: "rgba(100,180,255,0.1)", iconColor: "#6ab4ff",
    badge: "Financial Aid",
    description:
      "A dedicated financial assistance programme covering the cost of high-value surgeries, chronic illness medication programmes, emergency diagnostic tests, and life-sustaining treatments for patients unable to bear the burden of critical care costs.",
    pillars: [
      { icon: BriefcaseMedical, label: "Surgical Cost Coverage", desc: "Full or partial subsidy for high-cost operations including cardiac, orthopaedic, and oncological procedures" },
      { icon: FlaskConical, label: "Chronic Illness Medication", desc: "Sustained supply of life-critical medications for diabetes, hypertension, TB, and cancer patients" },
      { icon: Microscope, label: "Emergency Diagnostics", desc: "Subsidised MRI, CT scan, biopsy, and pathology tests for cases requiring urgent investigation" },
    ],
    tags: ["Surgery Aid", "Medication Supply", "Diagnostics", "Chronic Care"],
  },
  {
    icon: Building2, tag: "Vertical III", title: "Rural & Grassroots Clinics",
    color: "rgba(80,200,120,0.07)", borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)", iconColor: "#50c878",
    badge: "Field Deployment",
    description:
      "Physical development frameworks, medical equipment provisioning, and logistics coordination for deploying mobile health units and community clinics in isolated, conflict-affected, or infrastructure-deficient zones.",
    pillars: [
      { icon: Ambulance, label: "Mobile Health Unit Deployment", desc: "Equipped medical vehicles staffed by registered practitioners for field-based healthcare delivery" },
      { icon: Cross, label: "Community Clinic Construction", desc: "Physical clinic infrastructure development in rural areas lacking formal medical facilities" },
      { icon: Thermometer, label: "Preventive Health Campaigns", desc: "Vaccination drives, maternal health programmes, and screening camps at community level" },
    ],
    tags: ["Mobile Units", "Rural Clinics", "Preventive Care", "Equipment Aid"],
  },
];

function HealthVerticals() {
  return (
    <section id="health-verticals" className="py-24 px-4 sm:px-6"
      style={{ background: "#010f09" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Programme Architecture"
          title="Three Pillars of Healthcare Delivery"
          subtitle="The Healthcare Infrastructure & Access programme operates across three interconnected streams — digital access, financial assistance, and physical infrastructure — each designed to remove a distinct barrier between patients and the care they deserve."
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
   LIVE HEALTHCARE METRICS
══════════════════════════════════════════════ */
const METRICS = [
  { value: 120, prefix: "", suffix: "+", label: "Active Cases Managed", sub: "Ongoing patient support cases", icon: Activity },
  { value: 35, prefix: "", suffix: "+", label: "Verified Medical Experts", sub: "Registered specialists & practitioners", icon: Stethoscope },
  { value: 100, prefix: "", suffix: "%", label: "Confidential Patient Care", sub: "Full HIPAA-grade data privacy", icon: ShieldCheck },
  { value: 18, prefix: "", suffix: "+", label: "Partner Medical Facilities", sub: "Hospitals, labs, and clinics", icon: Building2 },
];

function HealthMetrics() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Programme Impact"
          title="Measurable Healthcare Outcomes"
          subtitle="Every case managed, every surgery subsidised, and every clinic deployed represents a life changed. Our metrics reflect the scale of our institutional commitment to universal healthcare access."
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

        {/* Privacy assurance strip */}
        <FadeIn delay={0.4} className="mt-12">
          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
            style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.18)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}>
              <Lock className="w-6 h-6" style={{ color: GOLD }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">
                Medical-Grade Privacy · Case Confidentiality · Ethical Patient Protocols
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every patient case submitted to Orakzai.org's Healthcare Programme is handled under strict
                medical confidentiality protocols. Patient data is never disclosed to third parties, never
                monetised, and is permanently destroyed upon case closure — because trust is the first
                medicine we prescribe.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   MEDICAL CASE STATUS CARD
══════════════════════════════════════════════ */
const CASE_STAGES = [
  { id: "registered", label: "Case Registered", icon: ClipboardList },
  { id: "evaluation", label: "Clinical Evaluation", icon: Stethoscope },
  { id: "approval", label: "Subsidy Approval", icon: BadgeCheck },
  { id: "disbursal", label: "Disbursal / Appointment", icon: HeartPulse },
];

function MedCaseCard({ caseHash }: { caseHash: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [syncPct, setSyncPct] = useState(0);

  useEffect(() => {
    let stage = 0;
    const stageTimer = setInterval(() => {
      stage += 1;
      setActiveStage(stage);
      if (stage >= CASE_STAGES.length - 1) clearInterval(stageTimer);
    }, 950);
    let pct = 0;
    const pctTimer = setInterval(() => {
      pct += 2;
      setSyncPct(Math.min(pct, 100));
      if (pct >= 100) clearInterval(pctTimer);
    }, 38);
    return () => { clearInterval(stageTimer); clearInterval(pctTimer); };
  }, [caseHash]);

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

      {/* Header */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Heart className="w-3 h-3" style={{ color: GOLD }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Medical Case Reference Issued
          </span>
        </div>
        <div className="text-xl md:text-2xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}>
          {caseHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Quote this reference when contacting our medical coordination team
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Case Processing
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
          animate={{ width: activeStage >= CASE_STAGES.length - 1 ? "75%" : `${(activeStage / (CASE_STAGES.length - 1)) * 75}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }} />

        <div className="relative grid grid-cols-4 gap-2">
          {CASE_STAGES.map((stage, i) => {
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

      {/* Live status message */}
      <AnimatePresence mode="wait">
        <motion.div key={activeStage}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {activeStage === 0 && "✦ Your case has been securely registered. Our medical intake team will review your submission within 24 hours."}
            {activeStage === 1 && "✦ A verified clinical specialist is evaluating your case and medical documentation."}
            {activeStage === 2 && "✦ Subsidy eligibility is being assessed by our healthcare funding board."}
            {activeStage === 3 && "✦ Care pathway confirmed. Your appointment or assistance disbursal has been scheduled — check your contact details for confirmation."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   HEALTHCARE INTAKE FORM
══════════════════════════════════════════════ */
const ASSISTANCE_TYPES = [
  { value: "consultation", label: "Virtual Consultation", icon: MonitorSmartphone },
  { value: "treatment", label: "Treatment Subsidy", icon: Pill },
  { value: "medicine", label: "Medicine Supply", icon: FlaskConical },
  { value: "diagnostic", label: "Diagnostic Test", icon: Microscope },
  { value: "surgery", label: "Surgical Support", icon: Syringe },
  { value: "clinic", label: "Rural Clinic Access", icon: Building2 },
];

function HealthcareForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [caseHash, setCaseHash] = useState("");
  const [form, setForm] = useState({
    name: "", condition: "", assistanceType: "", location: "", email: "", phone: "", notes: "",
  });
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.condition || !form.assistanceType || !form.location || !form.email) {
      toast({ title: "Incomplete Form", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    const hash = generateMedHash();
    setCaseHash(hash);
    setSubmitted(true);
    toast({ title: "Medical Case Registered", description: `Your reference is ${hash}` });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <MedCaseCard caseHash={caseHash} />
        <div className="mt-6 text-center">
          <button onClick={() => { setSubmitted(false); setForm({ name: "", condition: "", assistanceType: "", location: "", email: "", phone: "", notes: "" }); setFileName(""); }}
            className="text-sm font-medium underline" style={{ color: "rgba(212,175,55,0.6)" }}>
            Submit another case
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

        {/* Confidentiality notice */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            All patient information is handled under strict medical confidentiality — never shared, never sold.
          </p>
        </div>

        {/* Patient Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Patient Full Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full legal name of the patient"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Medical Condition */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Nature of Medical Condition / Urgency <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <HeartPulse className="absolute left-3.5 top-3.5 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <textarea value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}
              placeholder="Describe the medical condition, symptoms, diagnosis (if known), and level of urgency..."
              rows={3}
              className="w-full rounded-xl p-3.5 pl-10 text-sm resize-none"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "inherit" }} />
          </div>
        </div>

        {/* Assistance Type */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Required Assistance Type <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ASSISTANCE_TYPES.map((at) => {
              const AIcon = at.icon;
              return (
                <button key={at.value} type="button"
                  onClick={() => setForm({ ...form, assistanceType: at.value })}
                  className="px-3 py-3 rounded-xl text-left text-xs font-medium transition-all flex items-center gap-2"
                  style={{
                    background: form.assistanceType === at.value ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.3)",
                    border: form.assistanceType === at.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                    color: form.assistanceType === at.value ? GOLD : "rgba(255,255,255,0.55)",
                  }}>
                  <AIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  {at.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Location <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="City, Country — or describe area if rural"
              className="h-11 rounded-xl text-sm pl-10"
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
                placeholder="contact@email.com" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Phone{" "}
              <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 555 000 0000" className="h-11 rounded-xl text-sm pl-10"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
        </div>

        {/* Medical Report Upload */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Medical Report / Prescription Upload{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px dashed rgba(212,175,55,0.25)" }}>
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.1)" }}>
              <Upload className="w-3.5 h-3.5" style={{ color: GOLD }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: fileName ? GOLD : "rgba(255,255,255,0.5)" }}>
                {fileName || "Click to upload document"}
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                PDF, JPG, PNG, DOC accepted — max 10MB
              </p>
            </div>
            {fileName && <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: GOLD }} />}
          </label>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Additional Notes{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Any additional context — family circumstances, prior treatment attempts, specialist referrals..."
            rows={2}
            className="w-full rounded-xl p-3.5 text-sm resize-none"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "inherit" }} />
        </div>

        {/* Submit */}
        <Button type="submit"
          className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}>
          <HeartPulse className="w-4 h-4" />
          Register Medical Case
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PARTNER NETWORK
══════════════════════════════════════════════ */
const PARTNERS = [
  { region: "Pakistan & Afghanistan", detail: "Rural mobile units · district hospital referral networks · field clinics" },
  { region: "Gulf States", detail: "Expat health coordination · consular medical liaison · subsidy portal" },
  { region: "Sub-Saharan Africa", detail: "Community clinic construction · mobile vaccination campaigns" },
  { region: "South & Southeast Asia", detail: "Telehealth integration · chronic illness medication programmes" },
  { region: "United Kingdom & Europe", detail: "Diaspora healthcare support · specialist referral linkages" },
  { region: "North America", detail: "Remote consultation services · cross-border care coordination" },
];

function PartnerNetwork() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Operational Coverage" title="Healthcare Reach Across Six Regions"
          subtitle="Our healthcare infrastructure operates across a global network of partner facilities, mobile units, and digital consultancy platforms — from urban hospitals to rural field clinics." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PARTNERS.map((p, i) => (
            <FadeIn key={p.region} delay={i * 0.08}>
              <div className="rounded-xl p-5"
                style={{ background: "rgba(0,18,11,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                  <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{p.region}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{p.detail}</p>
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
            <Heart className="w-10 h-10 mx-auto mb-5" style={{ color: GOLD }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
              No One Should Suffer Alone
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Whether you need a virtual consultation, financial support for a critical procedure, or
              access to a clinic in a remote area — Orakzai.org's Healthcare Infrastructure programme
              stands between every community member and the care they need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#healthcare-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
                <BriefcaseMedical className="w-4 h-4" />
                Submit a Case Now
              </a>
              <a href="/emergency-ambulance"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                <Ambulance className="w-4 h-4" style={{ color: GOLD }} />
                Emergency Ambulance
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
export default function HealthcareInfrastructure() {
  return (
    <MainLayout>
      <Hero />
      <HealthVerticals />
      <HealthMetrics />
      <PartnerNetwork />

      {/* Intake Portal */}
      <section id="healthcare-form" className="py-24 px-4 sm:px-6"
        style={{ background: "#010f09" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Healthcare Assistance Portal"
            title="Submit Your Medical Case"
            subtitle="Register your case with our clinical coordination team. Every submission is reviewed by a verified medical specialist within 24 hours — confidentially, compassionately, and at zero cost to the patient."
          />
          <HealthcareForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
