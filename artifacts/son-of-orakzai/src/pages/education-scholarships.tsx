import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  GraduationCap, Globe, Cpu, Users, Star, BookOpen,
  CheckCircle2, ArrowRight, Upload, Lock, BadgeCheck,
  Clock, Send, Eye, ChevronRight, Sparkles, Award,
  Microscope, MessageSquare, Copy, CheckCheck, BarChart3,
  Building2, MapPin, Lightbulb, Target, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/* ── Brand tokens ── */
const GOLD = "#D4AF37";
const EMERALD_DEEP = "#00120B";

/* ══════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════ */

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
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 1900;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3 gap-3"
      style={{ background: "rgba(0,0,0,0.38)", border: "1px solid rgba(212,175,55,0.18)" }}
    >
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</p>
        <p className="font-mono font-bold text-base break-all" style={{ color: GOLD, letterSpacing: "0.06em" }}>{value}</p>
      </div>
      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        style={{ color: copied ? "#4ade80" : "rgba(212,175,55,0.7)" }}
        title="Copy"
        className="flex-shrink-0 transition-colors"
      >
        {copied ? <CheckCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
}

function generateApplicationHash(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `O-SCHOLAR-${num}`;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden" style={{ background: EMERALD_DEEP }}>
      {/* Ambient layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Top-left gold radial */}
        <div
          className="absolute -top-24 -left-24 w-[750px] h-[750px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 68%)", filter: "blur(70px)" }}
        />
        {/* Bottom-right emerald */}
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,78,59,0.2) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        {/* Fine gold grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Decorative mortarboard / compass SVG watermark */}
        <svg className="absolute right-10 bottom-6 opacity-[0.04] hidden lg:block" width="360" height="360" viewBox="0 0 100 100" fill="none">
          <polygon points="50,10 90,32 50,54 10,32" stroke="#D4AF37" strokeWidth="1.4" />
          <line x1="50" y1="54" x2="50" y2="76" stroke="#D4AF37" strokeWidth="1.4" />
          <line x1="90" y1="32" x2="90" y2="58" stroke="#D4AF37" strokeWidth="1.4" />
          <path d="M80 58 Q90 68 90 78 Q90 88 80 88 Q70 88 70 78 Q70 68 80 58 Z" stroke="#D4AF37" strokeWidth="1.2" />
          <line x1="38" y1="76" x2="62" y2="76" stroke="#D4AF37" strokeWidth="1.4" />
          <circle cx="50" cy="80" r="5" stroke="#D4AF37" strokeWidth="1.2" />
          {/* Orbital ring */}
          <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
        <FadeIn>
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.35)", background: "rgba(212,175,55,0.06)", backdropFilter: "blur(12px)" }}
          >
            <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.32em] uppercase" style={{ color: GOLD }}>
              Pillar 03 · Education &amp; Global Scholarships
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black text-white leading-[1.05] mb-6"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              textShadow: "0 4px 80px rgba(0,0,0,0.65)",
            }}
          >
            Empowering Minds,
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
              Borderless Futures
            </span>
          </h1>

          {/* Gold rule with icon */}
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
            <Star className="w-4 h-4" style={{ color: GOLD, opacity: 0.75 }} />
            <div className="h-px w-16" style={{ background: `linear-gradient(270deg, transparent, ${GOLD})` }} />
          </div>

          {/* Description */}
          <p
            className="max-w-2xl mx-auto leading-[1.88]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.22rem)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Education is the single most powerful instrument of change in any society. Orakzai.org operates
            a sovereign scholarship embassy — connecting exceptional, underserved talent worldwide with
            fully-funded international university pathways, cutting-edge digital skills grants, and an elite
            mentorship network built on institutional-grade leadership programs.
          </p>

          {/* Trait pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { icon: Globe, label: "International Pathways" },
              { icon: Cpu, label: "Digital Skills Grants" },
              { icon: Users, label: "Elite Mentorship" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.28)", backdropFilter: "blur(10px)" }}
              >
                <pill.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                <span className="text-[11px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.72)" }}>{pill.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   IMPACT COUNTERS
══════════════════════════════════════════════ */
const METRICS = [
  { icon: Award, value: 360, suffix: "+", label: "Global Scholars Supported", sub: "Across 18+ countries worldwide" },
  { icon: MapPin, value: 12, suffix: "+", label: "Hub Cities Active", sub: "Regional learning centres" },
  { icon: Building2, value: 50, suffix: "+", label: "Partner Institutions", sub: "Universities & academies" },
  { icon: TrendingUp, value: 94, suffix: "%", label: "Placement Success Rate", sub: "Students in programmes" },
];

function ImpactCounters() {
  return (
    <section className="relative py-16" style={{ background: "#010e07", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeIn key={m.label} delay={i * 0.1}>
                <div
                  className="relative rounded-2xl p-5 sm:p-7 text-center flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(16px)" }}
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
                    <AnimatedNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/85">{m.label}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{m.sub}</p>
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
   THREE INSTITUTIONAL PROGRAMS
══════════════════════════════════════════════ */
const PROGRAMS = [
  {
    icon: Globe,
    number: "01",
    title: "International Pathways",
    subtitle: "Fully-Funded University Access",
    accentColor: GOLD,
    description:
      "Connecting exceptional talent from underserved communities with fully-funded international scholarship opportunities, university enrollment support, visa guidance, and pre-departure orientation programs at partner institutions across 18+ countries.",
    features: [
      "Fully-funded scholarship identification & matching",
      "University application preparation & SOP review",
      "Visa documentation & embassy interview coaching",
      "Pre-departure cultural orientation & buddy pairing",
      "Alumni network integration upon enrolment",
      "Remote students supported with digital enrollment kits",
    ],
    partners: ["Oxford Access", "US Fulbright", "Erasmus+", "DAAD Germany"],
  },
  {
    icon: Cpu,
    number: "02",
    title: "Digital Skills & Tech Grants",
    subtitle: "Future-Ready Workforce Programs",
    accentColor: "#5eead4",
    description:
      "Micro-grants, intensive bootcamps, and structured online resources for tech innovation, AI literacy, full-stack web development, and digital entrepreneurship — designed for students and early-career professionals with limited access to traditional pathways.",
    features: [
      "3–6 month intensive coding & AI bootcamps",
      "Micro-grant disbursements (hardware & connectivity)",
      "Cloud computing & AWS/Azure certification support",
      "Freelance launch kit: portfolio, contracts & rates",
      "Global hackathon team placement & mentoring",
      "Women-in-tech dedicated seats & mentorship cohort",
    ],
    partners: ["Google Dev", "AWS Educate", "Meta Spark", "GitHub Campus"],
  },
  {
    icon: Users,
    number: "03",
    title: "Elite Leadership Mentorship",
    subtitle: "One-on-One Growth Tracking",
    accentColor: "#c084fc",
    description:
      "A structured, institution-grade mentorship program matching outstanding students with corporate executives, Ivy League academics, and sector-leading professionals for quarterly growth sessions, career road-mapping, and curated networking opportunities.",
    features: [
      "Quarterly one-on-one video mentorship sessions",
      "Personalised 12-month academic & career roadmap",
      "Introductions to industry leaders & hiring circles",
      "Public speaking, debate & executive presence coaching",
      "Research & publication co-authorship opportunities",
      "Annual Orakzai Scholar Leadership Summit invitation",
    ],
    partners: ["MIT Media Lab", "LSE Alumni", "UN Youth", "Forbes 30u30"],
  },
];

function ProgramCard({ prog, index }: { prog: (typeof PROGRAMS)[0]; index: number }) {
  const Icon = prog.icon;
  return (
    <FadeIn delay={index * 0.13} className="h-full">
      <div
        className="relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-6 group transition-all duration-500 hover:-translate-y-1.5"
        style={{
          background: "linear-gradient(160deg, rgba(6,55,36,0.6) 0%, rgba(1,18,11,0.88) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(212,175,55,0.14)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* Top accent glow line */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] transition-all duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${prog.accentColor}70, transparent)` }}
        />
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `0 0 50px ${prog.accentColor}10` }}
        />

        {/* Icon row */}
        <div className="flex items-start justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.22)" }}
          >
            <Icon className="w-6 h-6" style={{ color: GOLD }} />
          </div>
          <span
            className="text-5xl font-black leading-none select-none"
            style={{ color: "rgba(212,175,55,0.07)", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
          >
            {prog.number}
          </span>
        </div>

        {/* Title block */}
        <div>
          <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.6)" }}>
            {prog.subtitle}
          </p>
          <h3 className="text-2xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>
            {prog.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)" }} />

        {/* Description */}
        <p className="text-sm leading-[1.82]" style={{ color: "rgba(255,255,255,0.58)" }}>
          {prog.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-2.5 flex-1">
          {prog.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD, opacity: 0.8 }} />
              <span className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Partner badges */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] mb-2.5 font-bold" style={{ color: "rgba(212,175,55,0.45)" }}>
            Partner Programmes
          </p>
          <div className="flex flex-wrap gap-2">
            {prog.partners.map((p) => (
              <span
                key={p}
                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)", color: "rgba(255,255,255,0.6)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3"
          style={{ color: GOLD }}
          onClick={() => document.getElementById("application-portal")?.scrollIntoView({ behavior: "smooth" })}
        >
          Apply Now <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </FadeIn>
  );
}

function ProgramsSection() {
  return (
    <section
      className="relative py-20"
      style={{ background: "linear-gradient(180deg, #00120B 0%, #010e07 50%, #00120B 100%)" }}
    >
      {/* Center bloom */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-14">
          <div
            className="inline-flex items-center gap-3 mb-5 px-5 py-2 rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.28)", background: "rgba(212,175,55,0.05)" }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
              Three Institutional Programs
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Complete{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 45%, #F3E5AB 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Educational Ecosystem
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
          >
            Three fully integrated programs — each targeting a distinct stage of the academic and
            professional journey — to ensure no scholar is left behind.
          </p>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {PROGRAMS.map((prog, i) => (
            <ProgramCard key={prog.number} prog={prog} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   APPLICATION PORTAL
══════════════════════════════════════════════ */
const DISCIPLINES = [
  "Engineering & Computer Science",
  "Medicine & Life Sciences",
  "Business & Economics",
  "Law & Political Science",
  "Arts, Design & Architecture",
  "Education & Pedagogy",
  "Environmental & Climate Science",
  "Mathematics & Physics",
  "International Relations & Diplomacy",
  "Social Sciences & Humanities",
  "Journalism & Media Studies",
  "Other / Interdisciplinary",
];

const QUALIFICATIONS = [
  "Secondary / O-Levels (Matriculation)",
  "Higher Secondary / A-Levels (FSc / ICS)",
  "Bachelor's Degree (In Progress)",
  "Bachelor's Degree (Completed)",
  "Master's Degree (In Progress)",
  "Master's Degree (Completed)",
  "PhD / Doctoral (In Progress)",
  "PhD / Doctoral (Completed)",
  "Professional Certification",
];

const TARGET_PROGRAMS = [
  "International Pathways (Scholarship)",
  "Digital Skills & Tech Grant",
  "Elite Leadership Mentorship",
  "Multiple Programs (All Three)",
];

const TIMELINE_STEPS = [
  { label: "Submitted", icon: Send, desc: "Application securely received and logged in our encrypted registry." },
  { label: "In Review", icon: Eye, desc: "Academic credentials and eligibility are assessed by our scholarship committee." },
  { label: "Verification", icon: Microscope, desc: "Documents verified and candidate profile cross-referenced with partner institutions." },
  { label: "Board Selection", icon: Star, desc: "Shortlisted for final board panel review and institutional matching." },
  { label: "Award Decision", icon: BadgeCheck, desc: "Scholarship decision communicated and onboarding initiated." },
];

function ApplicationPortal() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [qualification, setQualification] = useState("");
  const [targetProgram, setTargetProgram] = useState("");
  const [statement, setStatement] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [appHash, setAppHash] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !discipline || !qualification || !targetProgram || !statement.trim()) {
      toast({ title: "Incomplete application", description: "Please fill all required fields before submitting.", variant: "destructive" });
      return;
    }
    const hash = generateApplicationHash();
    setAppHash(hash);
    setActiveStep(0);
    toast({
      title: `Application ${hash} submitted`,
      description: "Your scholarship application has been received. Check your status tracker on the right.",
    });

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= 2) { clearInterval(interval); setActiveStep(2); }
      else setActiveStep(step);
    }, 1900);
  };

  return (
    <section
      id="application-portal"
      className="relative py-20"
      style={{ background: "linear-gradient(180deg, #00120B 0%, #010e07 100%)", borderTop: "1px solid rgba(212,175,55,0.1)" }}
    >
      {/* Background ornaments */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,78,59,0.14) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <div
            className="inline-flex items-center gap-3 mb-5 px-5 py-2 rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.28)", background: "rgba(212,175,55,0.05)" }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
              Scholarship Application Portal
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Apply Now.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 45%, #F3E5AB 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Track Every Step.
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
          >
            Submit your secure application and receive a unique Application Hash instantly — your
            transparent reference through every stage of the scholarship selection process.
          </p>
          {/* Security badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {["End-to-End Encrypted", "Merit-Based Selection", "48-Hr Initial Review"].map((b) => (
              <div
                key={b}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.22)" }}
              >
                <BadgeCheck className="w-3 h-3" style={{ color: GOLD }} />
                <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>{b}</span>
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
              style={{ background: "rgba(0,18,11,0.68)", border: "1px solid rgba(212,175,55,0.17)", backdropFilter: "blur(20px)" }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>
                  Student Intake Form
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
                  Open globally — all nationalities welcome. Applications are reviewed on merit.
                </p>
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Full Name <span style={{ color: GOLD }}>*</span></Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Zar Ali Khan Orakzai"
                    className="bg-black/35 border-[#D4AF37]/20 text-white placeholder:text-white/30 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-black/35 border-[#D4AF37]/20 text-white placeholder:text-white/30 rounded-xl"
                  />
                </div>
              </div>

              {/* Country + Discipline */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Country / Region</Label>
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Pakistan, UAE, UK…"
                    className="bg-black/35 border-[#D4AF37]/20 text-white placeholder:text-white/30 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Academic Discipline <span style={{ color: GOLD }}>*</span></Label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      color: discipline ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                      appearance: "none",
                    }}
                  >
                    <option value="" disabled style={{ background: "#00120B" }}>— Select discipline —</option>
                    {DISCIPLINES.map((d) => <option key={d} value={d} style={{ background: "#00120B", color: "white" }}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Qualification + Target */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Current Qualification <span style={{ color: GOLD }}>*</span></Label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      color: qualification ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                      appearance: "none",
                    }}
                  >
                    <option value="" disabled style={{ background: "#00120B" }}>— Select level —</option>
                    {QUALIFICATIONS.map((q) => <option key={q} value={q} style={{ background: "#00120B", color: "white" }}>{q}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label style={{ color: "rgba(255,255,255,0.75)" }}>Target Program <span style={{ color: GOLD }}>*</span></Label>
                  <select
                    value={targetProgram}
                    onChange={(e) => setTargetProgram(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      color: targetProgram ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                      appearance: "none",
                    }}
                  >
                    <option value="" disabled style={{ background: "#00120B" }}>— Select program —</option>
                    {TARGET_PROGRAMS.map((t) => <option key={t} value={t} style={{ background: "#00120B", color: "white" }}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Statement of Purpose */}
              <div className="space-y-2">
                <Label style={{ color: "rgba(255,255,255,0.75)" }}>
                  Statement of Purpose <span style={{ color: GOLD }}>*</span>
                </Label>
                <textarea
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  rows={5}
                  placeholder="Tell us about your academic achievements, financial circumstances, career goals, and why you believe you deserve this opportunity. Be specific — our committee reads every submission personally…"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-y"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(212,175,55,0.22)",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: "1.75",
                    minHeight: "130px",
                  }}
                />
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.32)" }}>
                  Minimum 100 words recommended. This is the most important part of your application.
                </p>
              </div>

              {/* Document upload */}
              <div className="space-y-2">
                <Label style={{ color: "rgba(255,255,255,0.75)" }}>Upload Transcripts / Supporting Documents</Label>
                <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFile} />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-3 rounded-xl py-7 transition-all hover:border-opacity-60"
                  style={{
                    border: `2px dashed ${fileName ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.2)"}`,
                    background: fileName ? "rgba(212,175,55,0.06)" : "rgba(0,0,0,0.22)",
                  }}
                >
                  <Upload className="w-6 h-6" style={{ color: GOLD, opacity: 0.7 }} />
                  {fileName ? (
                    <span className="text-sm font-semibold" style={{ color: GOLD }}>{fileName}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                        Drag & drop or click to upload
                      </span>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                        PDF, DOC, JPG, PNG accepted · Max 10MB
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy note */}
              <div
                className="flex items-start gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.11)" }}
              >
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD, opacity: 0.7 }} />
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                  Applications are encrypted and used solely for scholarship matching. We do not sell
                  or share personal data. For queries, contact{" "}
                  <span style={{ color: GOLD }}>education@orakzai.org</span> or WhatsApp{" "}
                  <span style={{ color: GOLD }}>+92 336 0854603</span>.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full font-bold text-base py-6 rounded-xl"
                style={{ background: GOLD, color: "#04140e", letterSpacing: "0.03em" }}
              >
                Submit Application &amp; Generate My Hash
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </FadeIn>

          {/* ── Status Tracker ── */}
          <div className="lg:sticky lg:top-24 space-y-5">
            <AnimatePresence mode="wait">
              {appHash ? (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  {/* Application ID card */}
                  <div
                    className="relative rounded-2xl p-6 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #063320 0%, #01100a 60%, #063320 100%)",
                      border: `1px solid ${GOLD}`,
                      boxShadow: "0 0 50px rgba(212,175,55,0.18), 0 20px 50px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Glow orb */}
                    <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20 blur-3xl" style={{ background: GOLD }} />

                    <div className="relative z-10 flex items-center justify-between mb-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Orakzai.org Education</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.42)" }}>Scholarship Registry</p>
                      </div>
                      <GraduationCap className="w-8 h-8" style={{ color: GOLD }} />
                    </div>

                    <div className="relative z-10 mb-5">
                      <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.38)" }}>
                        Application Hash
                      </p>
                      <CopyField label="Your Unique Reference" value={appHash} />
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "rgba(255,255,255,0.45)" }}>Applicant</span>
                        <span className="font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{fullName || "Scholar"}</span>
                      </div>
                      {targetProgram && (
                        <div className="flex justify-between text-xs">
                          <span style={{ color: "rgba(255,255,255,0.45)" }}>Program</span>
                          <span className="font-semibold text-right ml-4" style={{ color: "rgba(255,255,255,0.7)" }}>{targetProgram}</span>
                        </div>
                      )}
                    </div>

                    <div
                      className="relative z-10 mt-4 pt-4 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
                    >
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {discipline || "Academic Application"}
                      </span>
                      <motion.div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase"
                        style={{ background: "rgba(212,175,55,0.15)", color: GOLD }}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      >
                        <Clock className="w-3 h-3" /> In Review
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress timeline */}
                  <div
                    className="rounded-2xl p-5 space-y-1"
                    style={{ background: "rgba(0,18,11,0.68)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(16px)" }}
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] mb-5" style={{ color: GOLD }}>
                      Application Processing Timeline
                    </p>
                    {TIMELINE_STEPS.map((step, i) => {
                      const StepIcon = step.icon;
                      const isComplete = i < activeStep;
                      const isCurrent = i === activeStep;

                      return (
                        <div key={step.label} className="flex gap-4 pb-5 last:pb-0 relative">
                          {/* Connector */}
                          {i < TIMELINE_STEPS.length - 1 && (
                            <div
                              className="absolute left-[22px] top-10 w-[2px] h-[calc(100%-2.5rem)]"
                              style={{ background: isComplete ? GOLD : "rgba(212,175,55,0.1)", transition: "background 0.6s ease" }}
                            />
                          )}
                          {/* Icon */}
                          <motion.div
                            animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                            style={{
                              background: isComplete ? GOLD : isCurrent ? "rgba(212,175,55,0.14)" : "rgba(255,255,255,0.03)",
                              border: `1px solid ${isComplete ? GOLD : isCurrent ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.07)"}`,
                              boxShadow: isCurrent ? "0 0 18px rgba(212,175,55,0.28)" : "none",
                            }}
                          >
                            <StepIcon className="w-5 h-5" style={{ color: isComplete ? "#04140e" : isCurrent ? GOLD : "rgba(255,255,255,0.22)" }} />
                          </motion.div>
                          {/* Text */}
                          <div className="flex-1 pt-2">
                            <p className="text-sm font-bold flex items-center gap-2" style={{ color: isComplete || isCurrent ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.28)" }}>
                              {step.label}
                              {isComplete && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: GOLD }} />}
                            </p>
                            {(isComplete || isCurrent) && (
                              <p className="text-[12px] mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.42)" }}>
                                {step.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* WhatsApp / contact CTA */}
                  <a
                    href="https://wa.me/923360854603"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.24)" }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 flex-shrink-0" style={{ color: "#25d366" }} />
                      <div>
                        <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>Questions? WhatsApp Us</p>
                        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>+92 336 0854603 · 24/7</p>
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
                  style={{ background: "rgba(0,18,11,0.55)", border: "1px solid rgba(212,175,55,0.12)", backdropFilter: "blur(16px)" }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    <GraduationCap className="w-8 h-8" style={{ color: GOLD, opacity: 0.65 }} />
                  </div>
                  <div>
                    <p className="text-white/65 font-semibold text-sm">Application Status Portal</p>
                    <p className="text-white/32 text-xs mt-1 leading-relaxed">
                      Complete and submit the intake form to instantly generate your Application Hash
                      and activate real-time status tracking.
                    </p>
                  </div>
                  {/* Ghost steps */}
                  <div className="space-y-2.5 text-left">
                    {TIMELINE_STEPS.map((step) => (
                      <div key={step.label} className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <step.icon className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.16)" }} />
                        </div>
                        <p className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>{step.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px]" style={{ color: "rgba(212,175,55,0.48)" }}>
                    Merit-based · All nationalities welcome
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
   HIGHLIGHT STRIP — KEY DIFFERENTIATORS
══════════════════════════════════════════════ */
const DIFFERENTIATORS = [
  { icon: Target, title: "Merit-Based, Not Connections", desc: "Every applicant reviewed equally on academic merit, socioeconomic circumstance, and potential." },
  { icon: Globe, title: "Truly Borderless", desc: "Students from every country and background are eligible — no geography, creed, or ethnicity excluded." },
  { icon: Lightbulb, title: "Beyond Funding", desc: "We provide mentorship, alumni networks, career placement and post-graduation support — not just a cheque." },
  { icon: BarChart3, title: "Transparent Reporting", desc: "Annual impact reports published publicly. Every scholar, every institution, fully auditable." },
];

function DifferentiatorsStrip() {
  return (
    <section
      className="relative py-16"
      style={{ background: "#010e07", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <FadeIn key={d.title} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-5 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.12)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,175,55,0.09)", border: "1px solid rgba(212,175,55,0.22)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/85 mb-1">{d.title}</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{d.desc}</p>
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
   BOTTOM CTA
══════════════════════════════════════════════ */
function CtaBanner() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
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
              Knowledge Is the Greatest Equaliser
            </span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Potential Has{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 45%, #F3E5AB 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              No Borders.
            </span>
          </h2>

          <p
            className="max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.56)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
          >
            Whether you are a top student with no financial runway, a self-taught developer seeking
            your first grant, or a community leader ready for mentorship — Orakzai.org is your launchpad.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => document.getElementById("application-portal")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              style={{ background: GOLD, color: "#04140e", boxShadow: "0 8px 30px rgba(212,175,55,0.35)" }}
            >
              <GraduationCap className="w-4 h-4" /> Apply for a Scholarship
            </button>
            <a
              href="/contact"
              className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.35)", color: GOLD }}
            >
              <MessageSquare className="w-4 h-4" /> Speak to an Advisor
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
export default function EducationScholarships() {
  return (
    <MainLayout>
      <Hero />
      <ImpactCounters />
      <ProgramsSection />
      <DifferentiatorsStrip />
      <ApplicationPortal />
      <CtaBanner />
    </MainLayout>
  );
}
