import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  TrendingUp, Cpu, Wheat, ShoppingBag, Lightbulb, Rocket,
  BadgeCheck, Lock, Upload, Send, CheckCircle2, Package,
  MapPin, Users, Globe, ChevronRight, ArrowRight, Star,
  Coins, Sprout, Hammer, BarChart3, Shield, Zap,
  DollarSign, Clock, Award, Building2,
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

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
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
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <FadeIn className={`mb-14 ${center ? "text-center max-w-2xl mx-auto" : "max-w-xl"}`}>
      <span className="text-[10px] font-black tracking-[0.35em] uppercase block mb-3" style={{ color: GOLD }}>
        {eyebrow}
      </span>
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}
      >
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

function generateGrantHash(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `O-GRANT-${num}`;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ background: EMERALD_DEEP }}
    >
      {/* Background glow layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 25%, rgba(212,175,55,0.08) 0%, transparent 68%), radial-gradient(ellipse 45% 70% at 85% 75%, rgba(0,100,50,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Rising line particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 1,
              height: `${60 + i * 25}px`,
              background: `linear-gradient(to top, transparent, rgba(212,175,55,${0.15 + i * 0.03}), transparent)`,
              left: `${8 + i * 12}%`,
              bottom: "15%",
            }}
            animate={{ y: [0, -50, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Floating coin-like orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 6 + i * 3,
              height: 6 + i * 3,
              background: `rgba(212,175,55,${0.12 + i * 0.05})`,
              border: "1px solid rgba(212,175,55,0.2)",
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <TrendingUp className="w-3.5 h-3.5" style={{ color: GOLD }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Economic Innovation &amp; Grants
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}
        >
          Fueling Innovation,{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Financing Futures
          </span>
        </motion.h1>

        {/* Executive description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Orakzai.org channels zero-interest, riba-free capital into the hands of underprivileged
          entrepreneurs, emerging technologists, and grassroots innovators worldwide — delivering
          structured micro-grants, startup incubation support, and sustainable livelihood funding
          that transforms economic potential into permanent prosperity.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#grant-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm transition-all"
            style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}
          >
            <Rocket className="w-4 h-4" />
            Apply for a Grant
          </a>
          <a
            href="#grant-verticals"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all"
            style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}
          >
            <ArrowRight className="w-4 h-4" />
            Our Programs
          </a>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "1,200+", label: "Businesses Funded" },
            { value: "45+", label: "Tech Startups Launched" },
            { value: "100%", label: "Interest-Free Capital" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
              >
                {m.value}
              </div>
              <div className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #00120B)" }}
      />
    </section>
  );
}

/* ══════════════════════════════════════════════
   THREE GRANT VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: Coins,
    tag: "Vertical I",
    title: "Interest-Free Micro-Loans",
    color: "rgba(212,175,55,0.07)",
    borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)",
    iconColor: GOLD,
    badge: "Riba-Free",
    badgeColor: "rgba(212,175,55,0.15)",
    description:
      "We inject zero-interest financial capital directly into small-scale traders, cottage industries, and neighbourhood retail shops — removing the debt burden of conventional lending and enabling self-sustaining businesses to grow on their own terms.",
    pillars: [
      { icon: ShoppingBag, label: "Retail & Trade Capital", desc: "Working capital for shopkeepers, market traders, and local distributors" },
      { icon: Hammer, label: "Cottage Industry Support", desc: "Equipment and stock financing for home-based and artisanal producers" },
      { icon: Building2, label: "Micro-Enterprise Seed Fund", desc: "Start-up capital tranches for first-time entrepreneurs with zero collateral" },
    ],
    tags: ["Retail", "Cottage Industries", "Micro-Enterprises", "Trade Finance"],
  },
  {
    icon: Cpu,
    tag: "Vertical II",
    title: "Tech Innovation Grants",
    color: "rgba(80,140,255,0.07)",
    borderColor: "rgba(80,140,255,0.2)",
    iconBg: "rgba(80,140,255,0.1)",
    iconColor: "#6ea8ff",
    badge: "Seed Funding",
    badgeColor: "rgba(80,140,255,0.15)",
    description:
      "Emerging developers, AI innovators, and tech builders from underserved regions deserve access to the same resources as Silicon Valley. Our Tech Innovation Grants provide seed capital, mentorship networks, and infrastructure access to accelerate breakthrough ideas.",
    pillars: [
      { icon: Lightbulb, label: "AI & Software Grants", desc: "Funding for AI/ML projects, SaaS products, and mobile applications" },
      { icon: Rocket, label: "Startup Incubation Support", desc: "Structured 6-month cohort with mentors, workspace, and network access" },
      { icon: Zap, label: "Digital Infrastructure Access", desc: "Cloud credits, developer tools, and connectivity support for remote builders" },
    ],
    tags: ["AI / ML", "SaaS Startups", "Developer Tools", "Incubation"],
  },
  {
    icon: Sprout,
    tag: "Vertical III",
    title: "Sustainable Livelihood Funding",
    color: "rgba(80,200,120,0.07)",
    borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)",
    iconColor: "#50c878",
    badge: "Long-Term Impact",
    badgeColor: "rgba(80,200,120,0.12)",
    description:
      "We fund agricultural advancements, localized asset distribution programs, and commercial trade infrastructure that embed economic resilience into communities for generations — not just short-term relief cycles.",
    pillars: [
      { icon: Wheat, label: "Agricultural Advancement Grants", desc: "Modern farming tools, seeds, irrigation, and agri-tech for smallholder farmers" },
      { icon: Package, label: "Asset Distribution Programs", desc: "Productive assets — machinery, vehicles, equipment — placed in community hands" },
      { icon: Globe, label: "Trade Infrastructure Funding", desc: "Cold storage, market linkage, and export-readiness programs for rural producers" },
    ],
    tags: ["Agriculture", "Asset Grants", "Trade Infra", "Rural Development"],
  },
];

function GrantVerticals() {
  return (
    <section
      id="grant-verticals"
      className="py-24 px-4 sm:px-6"
      style={{ background: "#010f09" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Funding Streams"
          title="Three Pillars of Economic Empowerment"
          subtitle="Every economic context demands a tailored approach. Our three verticals address the full spectrum — from street-level trade to cutting-edge technology — with structured capital that never charges interest."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {VERTICALS.map((v, i) => {
            const Icon = v.icon;
            return (
              <FadeIn key={v.tag} delay={i * 0.12}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{
                    background: v.color,
                    border: `1px solid ${v.borderColor}`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Tag + Icon row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex flex-col gap-2">
                      <span
                        className="text-[9px] font-black tracking-[0.35em] uppercase px-3 py-1 rounded-full w-fit"
                        style={{ color: v.iconColor, background: v.iconBg, border: `1px solid ${v.borderColor}` }}
                      >
                        {v.tag}
                      </span>
                      <span
                        className="text-[9px] font-bold px-3 py-1 rounded-full w-fit"
                        style={{ color: v.iconColor, background: v.badgeColor }}
                      >
                        {v.badge}
                      </span>
                    </div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: v.iconBg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: v.iconColor }} />
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.95)" }}
                  >
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
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: v.iconBg }}
                          >
                            <PIcon className="w-3.5 h-3.5" style={{ color: v.iconColor }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                              {p.label}
                            </p>
                            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                              {p.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-5" style={{ borderTop: `1px solid ${v.borderColor}` }}>
                    {v.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: v.iconColor, background: v.iconBg }}
                      >
                        {t}
                      </span>
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
   LIVE IMPACT METRICS
══════════════════════════════════════════════ */
const METRICS = [
  { value: 1200, prefix: "", suffix: "+", label: "Businesses Funded", sub: "Across all three verticals", icon: Building2 },
  { value: 45, prefix: "", suffix: "+", label: "Tech Startups Launched", sub: "From incubation to market", icon: Rocket },
  { value: 100, prefix: "", suffix: "%", label: "Interest-Free Capital", sub: "Zero riba, zero hidden fees", icon: Shield },
  { value: 32, prefix: "", suffix: "+", label: "Countries Reached", sub: "Global diaspora impact", icon: Globe },
];

function ImpactMetrics() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Global Impact"
          title="Economic Transformation at Scale"
          subtitle="Every grant disbursed, every startup launched, every farmer equipped — our numbers represent real livelihoods permanently elevated by access to ethical, interest-free capital."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeIn key={m.label} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(212,175,55,0.1)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
                  >
                    <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {m.label}
                  </div>
                  <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {m.sub}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Riba-free assurance strip */}
        <FadeIn delay={0.4} className="mt-12">
          <div
            className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
            style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.18)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              <BadgeCheck className="w-6 h-6" style={{ color: GOLD }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">Shariah-Compliant · 100% Interest-Free · Zero Hidden Fees</p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every grant and micro-loan disbursed through Orakzai.org is structured on ethical, riba-free principles.
                No compounding interest, no hidden charges — capital is provided as a trust-based community investment
                in human potential, not a profit mechanism.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   GRANT APPLICATION FORM + STATUS TRACKER
══════════════════════════════════════════════ */
const SECTORS = [
  { value: "retail", label: "Retail / Trade", icon: ShoppingBag },
  { value: "technology", label: "Technology", icon: Cpu },
  { value: "agriculture", label: "Agriculture", icon: Sprout },
  { value: "artisanal", label: "Artisanal / Craft", icon: Hammer },
];

const FUNDING_RANGES = [
  "Under $500 (Micro-Seed)",
  "$500 – $2,000 (Growth Capital)",
  "$2,000 – $10,000 (Scale Fund)",
  "$10,000+ (Strategic Grant)",
];

const REVIEW_STAGES = [
  { id: "lodged", label: "Application Lodged", icon: Send },
  { id: "vetting", label: "Initial Vetting", icon: CheckCircle2 },
  { id: "pitch", label: "Board Pitch Review", icon: BarChart3 },
  { id: "disbursal", label: "Allocation & Disbursal", icon: Coins },
];

function StatusTracker({ grantHash }: { grantHash: string }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    let stage = 0;
    const timer = setInterval(() => {
      stage += 1;
      setActiveStage(stage);
      if (stage >= REVIEW_STAGES.length - 1) clearInterval(timer);
    }, 1100);
    return () => clearInterval(timer);
  }, [grantHash]);

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
      }}
    >
      {/* Grant reference */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <Lock className="w-3 h-3" style={{ color: GOLD }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Secure Grant Reference
          </span>
        </div>
        <div
          className="text-2xl md:text-3xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}
        >
          {grantHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Save this reference — our grants committee will contact you within 3–5 business days
        </p>
      </div>

      {/* Stage progress */}
      <div className="relative">
        <div
          className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px"
          style={{ background: "rgba(212,175,55,0.15)" }}
        />
        <motion.div
          className="absolute top-5 left-[calc(12.5%)] h-px"
          style={{ background: `linear-gradient(to right, ${GOLD}, rgba(212,175,55,0.4))` }}
          initial={{ width: "0%" }}
          animate={{
            width: activeStage >= REVIEW_STAGES.length - 1
              ? "75%"
              : `${(activeStage / (REVIEW_STAGES.length - 1)) * 75}%`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="relative grid grid-cols-4 gap-2">
          {REVIEW_STAGES.map((stage, i) => {
            const SIcon = stage.icon;
            const isActive = i <= activeStage;
            const isCurrent = i === activeStage;
            return (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                    animate={{
                      background: isActive
                        ? `linear-gradient(135deg, #b8860b, ${GOLD})`
                        : "rgba(255,255,255,0.05)",
                      borderColor: isActive ? GOLD : "rgba(255,255,255,0.1)",
                    }}
                    style={{ border: "2px solid" }}
                    transition={{ duration: 0.4 }}
                  >
                    <SIcon className="w-4 h-4" style={{ color: isActive ? "#011a10" : "rgba(255,255,255,0.3)" }} />
                  </motion.div>
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${GOLD}` }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                <span
                  className="text-[9px] font-semibold text-center leading-tight"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic status message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-xl p-4 text-center"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
        >
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {activeStage === 0 && "✦ Your grant application has been securely lodged and assigned to our intake team."}
            {activeStage === 1 && "✦ Our grants committee is conducting initial eligibility and sector vetting."}
            {activeStage === 2 && "✦ Your application has advanced to the Board Pitch Review stage — shortlisted."}
            {activeStage === 3 && "✦ Congratulations — your grant has been approved for allocation and disbursal."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function GrantForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [grantHash, setGrantHash] = useState("");
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    name: "",
    enterprise: "",
    sector: "",
    funding: "",
    pitch: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.enterprise || !form.sector || !form.funding || !form.pitch) {
      toast({
        title: "Incomplete Application",
        description: "Please complete all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    const hash = generateGrantHash();
    setGrantHash(hash);
    setSubmitted(true);
    toast({
      title: "Grant Application Submitted",
      description: `Reference ${hash} is now under review. We'll contact you within 3–5 business days.`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <StatusTracker grantHash={grantHash} />
        <div className="mt-6 text-center">
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", enterprise: "", sector: "", funding: "", pitch: "" }); setFileName(""); }}
            className="text-sm font-medium underline"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-7 md:p-10 space-y-6"
        style={{
          background: "linear-gradient(135deg, rgba(0,18,11,0.85) 0%, rgba(0,25,15,0.80) 100%)",
          border: "1px solid rgba(212,175,55,0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)",
        }}
      >
        {/* Security badge */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
        >
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            All applications are reviewed by our Grants Committee. 100% confidential and interest-free.
          </p>
        </div>

        {/* Applicant Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Applicant Full Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full legal name"
            className="h-11 rounded-xl text-sm"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }}
          />
        </div>

        {/* Enterprise / Idea Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Enterprise / Idea Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <Input
            value={form.enterprise}
            onChange={(e) => setForm({ ...form, enterprise: e.target.value })}
            placeholder="Your business or project name"
            className="h-11 rounded-xl text-sm"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }}
          />
        </div>

        {/* Sector */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Sector <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {SECTORS.map((s) => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setForm({ ...form, sector: s.value })}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all"
                  style={{
                    background: form.sector === s.value ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.3)",
                    border: form.sector === s.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                    color: form.sector === s.value ? GOLD : "rgba(255,255,255,0.55)",
                  }}
                >
                  <SIcon className="w-4 h-4 flex-shrink-0" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Funding Amount */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Funding Amount Requested <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="space-y-2">
            {FUNDING_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setForm({ ...form, funding: range })}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: form.funding === range ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.28)",
                  border: form.funding === range ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.1)",
                  color: form.funding === range ? GOLD : "rgba(255,255,255,0.55)",
                }}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  {range}
                </div>
                {form.funding === range && <CheckCircle2 className="w-4 h-4" style={{ color: GOLD }} />}
              </button>
            ))}
          </div>
        </div>

        {/* Project Pitch */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Project Proposal / Pitch <span style={{ color: GOLD }}>*</span>
          </Label>
          <textarea
            value={form.pitch}
            onChange={(e) => setForm({ ...form, pitch: e.target.value })}
            placeholder="Describe your business idea or project — what problem does it solve, who does it serve, how will the grant be used, and what impact do you expect to create?"
            rows={5}
            className="w-full rounded-xl p-3.5 text-sm resize-none"
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(212,175,55,0.18)",
              color: "rgba(255,255,255,0.9)",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Pitch document upload */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Pitch Deck / Business Plan{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <label
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px dashed rgba(212,175,55,0.25)" }}
          >
            <input type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" className="hidden" onChange={handleFileChange} />
            <Upload className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(212,175,55,0.5)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {fileName ? fileName : "Upload pitch deck or business plan (PDF, PPTX, DOCX · max 20MB)"}
            </span>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}
        >
          <Rocket className="w-4 h-4" />
          Submit Grant Application
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   REVIEW PROCESS STEPS
══════════════════════════════════════════════ */
const PROCESS_STEPS = [
  { step: "01", title: "Application Lodged", desc: "Your application receives a unique O-GRANT reference and enters our secure intake queue for initial processing." },
  { step: "02", title: "Initial Vetting", desc: "The grants team reviews eligibility, sector alignment, and completeness of your application within 3 business days." },
  { step: "03", title: "Board Pitch Review", desc: "Shortlisted applications are presented to our grants board for sector-specific evaluation and impact assessment." },
  { step: "04", title: "Allocation & Disbursal", desc: "Approved grants are disbursed directly — zero-interest, zero-delay — through our verified distribution channels." },
];

function ReviewProcess() {
  return (
    <section className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Grant Pipeline"
          title="From Application to Capital — Our Process"
          subtitle="A transparent, accountable review system that treats every applicant with the dignity their vision deserves."
        />
        <div className="grid md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.1}>
              <div
                className="relative rounded-2xl p-6 h-full"
                style={{ background: "rgba(0,18,11,0.65)", border: "1px solid rgba(212,175,55,0.18)" }}
              >
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5" style={{ color: "rgba(212,175,55,0.4)" }} />
                  </div>
                )}
                <span
                  className="text-3xl font-bold block mb-3"
                  style={{ color: "rgba(212,175,55,0.3)", fontFamily: "'Playfair Display', serif" }}
                >
                  {s.step}
                </span>
                <h4 className="text-base font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>
                  {s.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.desc}
                </p>
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
      <section
        className="py-20 px-4 sm:px-6"
        style={{ background: EMERALD_DEEP, borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(0,40,22,0.6) 50%, rgba(212,175,55,0.04) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <TrendingUp className="w-10 h-10 mx-auto mb-5" style={{ color: GOLD }} />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}
            >
              Your Idea Deserves Capital
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Whether you're a street trader in Karachi, a developer in Nairobi, or a farmer in rural Orakzai —
              your vision matters. Apply today for interest-free funding that moves at the speed of ambition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#grant-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}
              >
                <Rocket className="w-4 h-4" />
                Apply for a Grant
              </a>
              <a
                href="/donate"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}
              >
                <Star className="w-4 h-4" style={{ color: GOLD }} />
                Fund the Grant Pool
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
export default function EconomicInnovationGrants() {
  return (
    <MainLayout>
      <Hero />
      <GrantVerticals />
      <ImpactMetrics />
      <ReviewProcess />

      {/* Grant Application Portal */}
      <section
        id="grant-form"
        className="py-24 px-4 sm:px-6"
        style={{ background: "#010f09" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Grant Application Portal"
            title="Apply for Economic Support"
            subtitle="Our secure intake portal is open to applicants worldwide. Every submission receives a unique O-GRANT reference and is reviewed by our grants committee within 3–5 business days."
          />
          <GrantForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
