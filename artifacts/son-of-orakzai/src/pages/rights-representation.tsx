import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Scale, ShieldCheck, Globe, Gavel, BookOpen, FileText,
  Users, Lock, CheckCircle2, ArrowRight, AlertTriangle,
  Upload, ChevronRight, Sparkles, Clock, BadgeCheck,
  MessageSquare, Eye, Send, BarChart3, HeartHandshake,
  Landmark, Siren, Copy, CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GOLD = "#D4AF37";
const EMERALD_DEEP = "#00120B";

/* ── Reusable fade-in wrapper ── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Case ID generator ── */
function generateCaseId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `O-LAW-${num}`;
}

/* ── Copy field ── */
function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3 gap-3"
      style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.15)" }}
    >
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {label}
        </p>
        <p className="font-mono font-bold text-base break-all" style={{ color: GOLD, letterSpacing: "0.06em" }}>
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="shrink-0 transition-colors"
        style={{ color: copied ? "#4ade80" : "rgba(212,175,55,0.7)" }}
        title="Copy case ID"
      >
        {copied ? <CheckCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden" style={{ background: EMERALD_DEEP }}>
      {/* Decorative ambient layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Gold radial glow — top left */}
        <div
          className="absolute -top-20 -left-20 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 68%)",
            filter: "blur(60px)",
          }}
        />
        {/* Emerald deep glow — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,78,59,0.22) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Fine gold grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Decorative scales-of-justice SVG watermark */}
        <svg
          className="absolute right-8 bottom-8 opacity-[0.04] hidden lg:block"
          width="340"
          height="340"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="18" r="4" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="50" y1="22" x2="50" y2="82" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="18" y1="38" x2="82" y2="38" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M18 38 L8 60 Q13 68 18 68 Q23 68 28 60 Z" stroke="#D4AF37" strokeWidth="1.2" />
          <path d="M82 38 L72 60 Q77 68 82 68 Q87 68 92 60 Z" stroke="#D4AF37" strokeWidth="1.2" />
          <line x1="38" y1="82" x2="62" y2="82" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="50" y1="82" x2="50" y2="88" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
        <FadeIn>
          {/* Eyebrow credential */}
          <div
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full"
            style={{
              border: "1px solid rgba(212,175,55,0.35)",
              background: "rgba(212,175,55,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Scale className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
            <span
              className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase"
              style={{ color: GOLD }}
            >
              Pillar 02 · Rights &amp; Representation
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-black text-white leading-[1.05] mb-6"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              textShadow: "0 4px 80px rgba(0,0,0,0.7)",
            }}
          >
            Defending Rights,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 40%, #F3E5AB 70%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 28px rgba(212,175,55,0.4))",
              }}
            >
              Securing Representation
            </span>
          </h1>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-4 mb-7">
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }}
            />
            <Gavel className="w-4 h-4" style={{ color: GOLD, opacity: 0.7 }} />
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(270deg, transparent, ${GOLD})` }}
            />
          </div>

          {/* Description */}
          <p
            className="max-w-2xl mx-auto leading-[1.85]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.22rem)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Every individual — regardless of origin, status, or circumstance — is entitled to legal protection,
            structural voice, and dignified representation. Orakzai.org operates as a sovereign legal advocacy
            embassy: connecting vulnerable communities with pro-bono counsel, championing systemic reform before
            international forums, and deploying emergency protection frameworks when lives are threatened.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { icon: ShieldCheck, label: "Legal Aid Provided" },
              { icon: Globe, label: "International Forums" },
              { icon: Siren, label: "Emergency Response" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.07)",
                  border: "1px solid rgba(212,175,55,0.28)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <pill.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                <span
                  className="text-[11px] font-semibold tracking-wide"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {pill.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 2 — THREE PILLARS OF ADVOCACY
══════════════════════════════════════════════ */
const PILLARS = [
  {
    icon: Gavel,
    number: "01",
    title: "Free Legal Aid Clinic",
    subtitle: "Pro-Bono Counsel Network",
    accent: "#D4AF37",
    description:
      "Connecting vulnerable individuals and families with a curated network of pro-bono human rights lawyers and professional legal defense counselors. From unlawful dismissal and unjust imprisonment to asylum claims and civil rights violations — every case receives dignified, expert legal attention at zero cost.",
    services: [
      "Pro-bono human rights attorney matching within 48 hours",
      "Civil, criminal & asylum case representation",
      "Legal document preparation & court filing support",
      "Victim advocacy & witness protection coordination",
      "Post-verdict follow-up & appeals assistance",
    ],
  },
  {
    icon: Landmark,
    number: "02",
    title: "International Policy & Lobbying",
    subtitle: "Systemic Reform Before Global Forums",
    accent: "#5eead4",
    description:
      "Presenting community grievances, land disputes, and human rights violations directly before international bodies — the UN Human Rights Council, regional parliaments, and state institutions. Orakzai.org translates lived suffering into formal policy language that produces enforceable legislative outcomes.",
    services: [
      "UN Human Rights Council submissions & oral statements",
      "Parliamentary lobbying in 12+ countries",
      "Land rights & property dispute reports",
      "Minority rights documentation for state dossiers",
      "Cross-border coordination with international NGO partners",
    ],
  },
  {
    icon: Siren,
    number: "03",
    title: "Emergency Protection Taskforce",
    subtitle: "Rapid Response Intervention",
    accent: "#f87171",
    description:
      "An always-on emergency intervention framework for individuals facing unlawful detention, tribal discrimination, forced displacement, or active exploitation. When rights are violated in real time, the Taskforce mobilises legal observers, government liaisons, and media pressure within 24 hours.",
    services: [
      "24-hour emergency legal hotline & WhatsApp response",
      "Unlawful detention & wrongful arrest intervention",
      "Tribal discrimination & honour-crime protection protocol",
      "Forced displacement & eviction injunction filings",
      "Exploitation & trafficking emergency extraction support",
    ],
  },
];

function PillarCard({ pillar, index }: { pillar: (typeof PILLARS)[0]; index: number }) {
  const Icon = pillar.icon;
  return (
    <FadeIn delay={index * 0.13} className="h-full">
      <div
        className="relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-6 transition-all duration-500 group hover:-translate-y-1"
        style={{
          background:
            "linear-gradient(160deg, rgba(6,55,36,0.6) 0%, rgba(1,18,11,0.85) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${pillar.accent}80, transparent)`,
          }}
        />

        {/* Number + icon row */}
        <div className="flex items-start justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: `rgba(212,175,55,0.09)`,
              border: `1px solid rgba(212,175,55,0.25)`,
              boxShadow: `0 0 24px ${pillar.accent}18`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: GOLD }} />
          </div>
          <span
            className="text-5xl font-black leading-none select-none"
            style={{
              color: "rgba(212,175,55,0.08)",
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.02em",
            }}
          >
            {pillar.number}
          </span>
        </div>

        {/* Title */}
        <div>
          <p
            className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            {pillar.subtitle}
          </p>
          <h3
            className="text-2xl font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "rgba(255,255,255,0.96)",
            }}
          >
            {pillar.title}
          </h3>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)",
          }}
        />

        {/* Description */}
        <p className="text-sm leading-[1.8]" style={{ color: "rgba(255,255,255,0.6)" }}>
          {pillar.description}
        </p>

        {/* Services list */}
        <ul className="space-y-3 flex-1">
          {pillar.services.map((service, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: GOLD, opacity: 0.8 }}
              />
              <span className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                {service}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3"
          style={{ color: GOLD }}
          onClick={() => document.getElementById("reporting-portal")?.scrollIntoView({ behavior: "smooth" })}
        >
          Report a Case <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </FadeIn>
  );
}

function PillarsSection() {
  return (
    <section
      className="relative py-20"
      style={{
        background: "linear-gradient(180deg, #00120B 0%, #010e07 50%, #00120B 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-14">
          <div
            className="inline-flex items-center gap-3 mb-5 px-5 py-2 rounded-full"
            style={{
              border: "1px solid rgba(212,175,55,0.28)",
              background: "rgba(212,175,55,0.05)",
            }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span
              className="text-[10px] font-black tracking-[0.35em] uppercase"
              style={{ color: GOLD }}
            >
              Three Pillars of Advocacy
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Comprehensive Legal{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 45%, #F3E5AB 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Protection Matrix
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
          >
            From individual courtrooms to international chambers — our three-pillar framework ensures no rights
            violation goes unaddressed.
          </p>
        </FadeIn>

        {/* Pillar cards grid */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 3 — IMPACT COUNTERS
══════════════════════════════════════════════ */
const METRICS = [
  {
    icon: BarChart3,
    value: 120,
    suffix: "+",
    label: "Active Cases Represented",
    sub: "Across 12+ countries globally",
  },
  {
    icon: HeartHandshake,
    value: 45,
    suffix: "+",
    label: "Pro-Bono Legal Experts",
    sub: "Human rights attorneys & counselors",
  },
  {
    icon: Lock,
    value: 100,
    suffix: "%",
    label: "Secure & Confidential",
    sub: "End-to-end encrypted case handling",
  },
  {
    icon: BadgeCheck,
    value: 98,
    suffix: "%",
    label: "Case Resolution Rate",
    sub: "Tracked & reported transparently",
  },
];

function ImpactCounters() {
  return (
    <section
      className="relative py-16"
      style={{ background: "#010e07", borderTop: "1px solid rgba(212,175,55,0.1)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <FadeIn key={metric.label} delay={i * 0.1}>
                <div
                  className="relative rounded-2xl p-5 sm:p-7 text-center flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <div
                    className="text-3xl sm:text-4xl font-black"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background: `linear-gradient(135deg, #b8860b, ${GOLD}, #F3E5AB)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white/85">{metric.label}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.42)" }}>
                      {metric.sub}
                    </p>
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
   SECTION 4 — REPORTING PORTAL & CASE TRACKER
══════════════════════════════════════════════ */
const CASE_TYPES = [
  "Unlawful Detention / Wrongful Arrest",
  "Land Dispute & Property Seizure",
  "Tribal Discrimination & Honour Crime",
  "Workplace Exploitation & Forced Labour",
  "Asylum Claim & Immigration Rights",
  "Domestic Violence & Gender-Based Violence",
  "Child Rights Violation",
  "Government Corruption & Abuse of Power",
  "Forced Displacement & Eviction",
  "Other Human Rights Violation",
];

const STATUS_STEPS = [
  { label: "Case Received", icon: Send, desc: "Your report has been securely logged in our encrypted system." },
  { label: "Under Review", icon: Eye, desc: "A senior legal officer is assessing the urgency and case details." },
  { label: "Attorney Assigned", icon: Users, desc: "A pro-bono expert has been matched and briefed on your case." },
  { label: "Active Advocacy", icon: Gavel, desc: "Legal proceedings, letters, or intervention is now underway." },
  { label: "Resolved", icon: BadgeCheck, desc: "Case outcome documented and follow-up support confirmed." },
];

function ReportingPortal() {
  const { toast } = useToast();
  const [caseType, setCaseType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseType || !location || !description.trim()) {
      toast({
        title: "Incomplete report",
        description: "Please select a case type, enter your location, and provide a description.",
        variant: "destructive",
      });
      return;
    }
    const id = generateCaseId();
    setSubmittedCaseId(id);
    setActiveStep(0);
    toast({
      title: `Case ID ${id} registered`,
      description:
        "Your case has been securely logged and forwarded to legal@orakzai.org. A legal officer will contact you within 48 hours.",
    });

    // Simulate progressive status advancement for demo
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= 2) {
        clearInterval(interval);
        setActiveStep(2);
      } else {
        setActiveStep(step);
      }
    }, 1800);
  };

  return (
    <section
      id="reporting-portal"
      className="relative py-20"
      style={{
        background: "linear-gradient(180deg, #00120B 0%, #010e07 100%)",
        borderTop: "1px solid rgba(212,175,55,0.1)",
      }}
    >
      {/* Background ornament */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,78,59,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-14">
          <div
            className="inline-flex items-center gap-3 mb-5 px-5 py-2 rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.28)", background: "rgba(212,175,55,0.05)" }}
          >
            <FileText className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
              Secure Reporting Portal
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Report a Case.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 45%, #F3E5AB 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Track Its Journey.
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
            }}
          >
            Every submission is end-to-end encrypted. A unique Case ID is generated immediately — giving you a
            transparent, trackable reference throughout the legal process.
          </p>

          {/* Security badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {["End-to-End Encrypted", "100% Confidential", "48-Hr Legal Review"].map((badge) => (
              <div
                key={badge}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.06)",
                  border: "1px solid rgba(212,175,55,0.22)",
                }}
              >
                <ShieldCheck className="w-3 h-3" style={{ color: GOLD }} />
                <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* ── Intake Form ── */}
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6"
              style={{
                background: "rgba(0,18,11,0.65)",
                border: "1px solid rgba(212,175,55,0.18)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}
                >
                  Case Intake Form
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  All fields are encrypted. Your identity is protected.
                </p>
              </div>

              {/* Urgent toggle */}
              <div
                className="flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition-all"
                style={{
                  background: urgent ? "rgba(248,113,113,0.08)" : "rgba(0,0,0,0.25)",
                  border: `1px solid ${urgent ? "rgba(248,113,113,0.4)" : "rgba(212,175,55,0.15)"}`,
                }}
                onClick={() => setUrgent(!urgent)}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: urgent ? "#f87171" : "rgba(255,255,255,0.4)" }}
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ color: urgent ? "#f87171" : "rgba(255,255,255,0.7)" }}>
                      Mark as Urgent / Life-Threatening
                    </p>
                    <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      Triggers immediate Emergency Taskforce response
                    </p>
                  </div>
                </div>
                <div
                  className="w-10 h-5 rounded-full relative transition-all duration-300 flex-shrink-0"
                  style={{ background: urgent ? "#f87171" : "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300"
                    style={{ left: urgent ? "calc(100% - 1.1rem)" : "0.1rem" }}
                  />
                </div>
              </div>

              {/* Case type */}
              <div className="space-y-2">
                <Label style={{ color: "rgba(255,255,255,0.75)" }}>
                  Case Type <span style={{ color: GOLD }}>*</span>
                </Label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(212,175,55,0.22)",
                    color: caseType ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                    fontFamily: "Inter, sans-serif",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled style={{ background: "#00120B" }}>
                    — Select case category —
                  </option>
                  {CASE_TYPES.map((type) => (
                    <option key={type} value={type} style={{ background: "#00120B", color: "white" }}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location + contact */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>
                    Location (Country / Region) <span style={{ color: GOLD }}>*</span>
                  </Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hangu, Pakistan"
                    className="bg-black/35 border-[#D4AF37]/20 text-white placeholder:text-white/30 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Your Name (optional)</Label>
                  <Input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Can remain anonymous"
                    className="bg-black/35 border-[#D4AF37]/20 text-white placeholder:text-white/30 rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label style={{ color: "rgba(255,255,255,0.75)" }}>
                  Case Description <span style={{ color: GOLD }}>*</span>
                </Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe the rights violation in as much detail as you feel comfortable sharing — dates, parties involved, what occurred, and any immediate threats..."
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-y"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(212,175,55,0.22)",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.7",
                    minHeight: "130px",
                  }}
                />
              </div>

              {/* Contact method */}
              <div className="space-y-2">
                <Label style={{ color: "rgba(255,255,255,0.75)" }}>Preferred Contact Method (optional)</Label>
                <Input
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  placeholder="WhatsApp number, email, or Signal"
                  className="bg-black/35 border-[#D4AF37]/20 text-white placeholder:text-white/30 rounded-xl"
                />
              </div>

              {/* Document upload */}
              <div className="space-y-2">
                <Label style={{ color: "rgba(255,255,255,0.75)" }}>Supporting Documents (optional)</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-3 rounded-xl py-6 transition-all"
                  style={{
                    border: `2px dashed ${fileName ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)"}`,
                    background: fileName ? "rgba(212,175,55,0.05)" : "rgba(0,0,0,0.25)",
                  }}
                >
                  <Upload className="w-6 h-6" style={{ color: GOLD, opacity: 0.7 }} />
                  {fileName ? (
                    <span className="text-sm font-semibold" style={{ color: GOLD }}>
                      {fileName}
                    </span>
                  ) : (
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Click to upload — PDF, JPG, PNG, DOC accepted
                    </span>
                  )}
                </button>
              </div>

              {/* Privacy note */}
              <div
                className="flex items-start gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}
              >
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD, opacity: 0.7 }} />
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Your report is encrypted end-to-end. We do not share personal information with any third party.
                  Anonymous submissions are fully accepted. You may contact us via WhatsApp at{" "}
                  <span style={{ color: GOLD }}>+92 336 0854603</span> or email{" "}
                  <span style={{ color: GOLD }}>legal@orakzai.org</span> for urgent cases.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full font-bold text-base py-6 rounded-xl"
                style={{ background: GOLD, color: "#04140e", letterSpacing: "0.03em" }}
              >
                Submit Secure Report &amp; Generate Case ID
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </FadeIn>

          {/* ── Case Tracker Panel ── */}
          <div className="lg:sticky lg:top-24 space-y-5">
            <AnimatePresence mode="wait">
              {submittedCaseId ? (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, scale: 0.93, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  {/* Case ID card */}
                  <div
                    className="relative rounded-2xl p-6 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #063320 0%, #01100a 60%, #063320 100%)",
                      border: `1px solid ${GOLD}`,
                      boxShadow: "0 0 50px rgba(212,175,55,0.2), 0 20px 50px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Glow orb */}
                    <div
                      className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20 blur-3xl"
                      style={{ background: GOLD }}
                    />

                    <div className="relative z-10 flex items-center justify-between mb-5">
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.3em]"
                          style={{ color: GOLD }}
                        >
                          Orakzai.org Legal
                        </p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                          Rights &amp; Representation
                        </p>
                      </div>
                      <Scale className="w-8 h-8" style={{ color: GOLD }} />
                    </div>

                    <div className="relative z-10 mb-5">
                      <p
                        className="text-[10px] uppercase tracking-widest mb-2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Unique Case ID
                      </p>
                      <CopyField label="Your Case Reference" value={submittedCaseId} />
                    </div>

                    <div
                      className="relative z-10 pt-4 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
                    >
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {caseType || "Case Submitted"}
                      </span>
                      <motion.div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase"
                        style={{ background: "rgba(212,175,55,0.15)", color: GOLD }}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      >
                        <Clock className="w-3 h-3" /> Under Review
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress tracker */}
                  <div
                    className="rounded-2xl p-5 space-y-1"
                    style={{
                      background: "rgba(0,18,11,0.65)",
                      border: "1px solid rgba(212,175,55,0.15)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    <p
                      className="text-[11px] font-black uppercase tracking-[0.28em] mb-5"
                      style={{ color: GOLD }}
                    >
                      Case Progress Timeline
                    </p>
                    {STATUS_STEPS.map((step, i) => {
                      const StepIcon = step.icon;
                      const isComplete = i < activeStep;
                      const isCurrent = i === activeStep;
                      const isPending = i > activeStep;

                      return (
                        <div key={step.label} className="flex gap-4 pb-5 last:pb-0 relative">
                          {/* Connector line */}
                          {i < STATUS_STEPS.length - 1 && (
                            <div
                              className="absolute left-[22px] top-10 w-[2px] h-[calc(100%-2.5rem)]"
                              style={{
                                background: isComplete
                                  ? GOLD
                                  : "rgba(212,175,55,0.12)",
                                transition: "background 0.6s ease",
                              }}
                            />
                          )}

                          {/* Step icon */}
                          <motion.div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                            animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            style={{
                              background: isComplete
                                ? GOLD
                                : isCurrent
                                ? "rgba(212,175,55,0.15)"
                                : "rgba(255,255,255,0.04)",
                              border: `1px solid ${
                                isComplete
                                  ? GOLD
                                  : isCurrent
                                  ? "rgba(212,175,55,0.5)"
                                  : "rgba(255,255,255,0.08)"
                              }`,
                              boxShadow: isCurrent
                                ? "0 0 16px rgba(212,175,55,0.3)"
                                : "none",
                            }}
                          >
                            <StepIcon
                              className="w-5 h-5"
                              style={{
                                color: isComplete
                                  ? "#04140e"
                                  : isCurrent
                                  ? GOLD
                                  : "rgba(255,255,255,0.25)",
                              }}
                            />
                          </motion.div>

                          {/* Step text */}
                          <div className="flex-1 pt-1.5">
                            <p
                              className="text-sm font-bold"
                              style={{
                                color: isComplete || isCurrent
                                  ? "rgba(255,255,255,0.92)"
                                  : "rgba(255,255,255,0.3)",
                              }}
                            >
                              {step.label}
                              {isComplete && (
                                <CheckCircle2
                                  className="inline w-3.5 h-3.5 ml-2"
                                  style={{ color: GOLD }}
                                />
                              )}
                            </p>
                            {(isComplete || isCurrent) && (
                              <p
                                className="text-[12px] mt-0.5 leading-snug"
                                style={{ color: "rgba(255,255,255,0.45)" }}
                              >
                                {step.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/923360854603"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:-translate-y-0.5"
                    style={{
                      background: "rgba(37,211,102,0.07)",
                      border: "1px solid rgba(37,211,102,0.25)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 flex-shrink-0" style={{ color: "#25d366" }} />
                      <div>
                        <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>
                          Urgent? Contact us on WhatsApp
                        </p>
                        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                          +92 336 0854603 · Available 24/7
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: "#25d366" }} />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl p-6 text-center space-y-5"
                  style={{
                    background: "rgba(0,18,11,0.55)",
                    border: "1px solid rgba(212,175,55,0.12)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Decorative scales */}
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    <Scale className="w-8 h-8" style={{ color: GOLD, opacity: 0.7 }} />
                  </div>
                  <div>
                    <p className="text-white/70 font-semibold text-sm">Case Tracker</p>
                    <p className="text-white/35 text-xs mt-1 leading-relaxed">
                      Submit the intake form to instantly generate your unique Case ID and track it
                      through every stage of the legal process.
                    </p>
                  </div>

                  {/* Dummy steps preview */}
                  <div className="space-y-2.5 text-left">
                    {STATUS_STEPS.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <step.icon className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.18)" }} />
                        </div>
                        <p className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px]" style={{ color: "rgba(212,175,55,0.5)" }}>
                    All submissions are encrypted &amp; confidential
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 5 — BOTTOM CTA BANNER
══════════════════════════════════════════════ */
function CtaBanner() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: EMERALD_DEEP, borderTop: "1px solid rgba(212,175,55,0.1)" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <FadeIn>
          <div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
              Justice Is Not a Privilege
            </span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every Right Matters.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 45%, #F3E5AB 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Every Voice Counts.
            </span>
          </h2>

          <p
            className="max-w-xl mx-auto leading-relaxed mb-10"
            style={{
              color: "rgba(255,255,255,0.58)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
            }}
          >
            Whether you are facing injustice yourself, or advocating on behalf of your community —
            Orakzai.org stands with you. Begin your case today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                document.getElementById("reporting-portal")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              style={{
                background: GOLD,
                color: "#04140e",
                boxShadow: "0 8px 30px rgba(212,175,55,0.35)",
              }}
            >
              <Scale className="w-4 h-4" /> Report a Case Now
            </button>
            <a
              href="/contact"
              className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(212,175,55,0.07)",
                border: "1px solid rgba(212,175,55,0.35)",
                color: GOLD,
              }}
            >
              <MessageSquare className="w-4 h-4" /> Speak to Our Team
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════ */
export default function RightsRepresentation() {
  return (
    <MainLayout>
      <Hero />
      <ImpactCounters />
      <PillarsSection />
      <ReportingPortal />
      <CtaBanner />
    </MainLayout>
  );
}
