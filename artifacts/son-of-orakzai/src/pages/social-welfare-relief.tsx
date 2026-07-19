import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  HandHeart, Truck, HeartPulse, Wheat, Home, ShieldCheck,
  Upload, CheckCircle2, Clock, Send, AlertTriangle, MapPin,
  Users, Zap, Globe, ChevronRight, Lock, BadgeCheck, Package,
  Droplets, Wind, Flame, CloudRain, ArrowRight, Star,
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
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
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
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

function Section({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={`py-24 px-4 sm:px-6 ${className}`}
      style={style}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
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
      <span
        className="text-[10px] font-black tracking-[0.35em] uppercase block mb-3"
        style={{ color: GOLD }}
      >
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

function generateCaseHash(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `O-RELIEF-${num}`;
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
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 80%, rgba(0,80,40,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Animated particle lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 1,
              height: `${80 + i * 30}px`,
              background: `linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)`,
              left: `${15 + i * 14}%`,
              top: "10%",
            }}
            animate={{ y: [0, 40, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
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
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <HandHeart className="w-3.5 h-3.5" style={{ color: GOLD }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Social Welfare & Crisis Relief
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
          Serving Humanity,{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Deploying Hope
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
          Orakzai.org deploys structured humanitarian operations at the intersection of rapid crisis
          intervention, precision disaster relief management, and sustainable social welfare programming —
          ensuring that vulnerable global populations receive immediate, transparent, and dignified support
          when it matters most.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#relief-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm transition-all"
            style={{
              background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
              color: "#011a10",
            }}
          >
            <AlertTriangle className="w-4 h-4" />
            Submit Relief Request
          </a>
          <a
            href="#relief-verticals"
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
            { value: "15,000+", label: "Families Supported" },
            { value: "120+", label: "Active Deployments" },
            { value: "100%", label: "Direct Distribution" },
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

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #00120B)" }}
      />
    </section>
  );
}

/* ══════════════════════════════════════════════
   THREE RELIEF VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: Zap,
    tag: "Vertical I",
    title: "Rapid Crisis Response",
    color: "rgba(255,100,60,0.15)",
    borderColor: "rgba(255,100,60,0.3)",
    iconBg: "rgba(255,100,60,0.12)",
    iconColor: "#ff6c3e",
    description:
      "When disaster strikes — flood, earthquake, or sudden displacement — our field-ready logistics network deploys within hours, not days. We coordinate direct delivery of emergency medical kits, hygiene packs, and first-response triage frameworks to affected communities.",
    pillars: [
      { icon: Truck, label: "Field Logistics Command", desc: "Coordinated ground transport and last-mile delivery networks" },
      { icon: HeartPulse, label: "Emergency Medical Kits", desc: "WHO-compliant trauma kits, medicines, and basic surgical supplies" },
      { icon: Users, label: "Crisis Deployment Squads", desc: "Trained volunteer teams dispatched within 24 hours of incident" },
    ],
    crises: ["Earthquake Relief", "Flash Flood Response", "Displacement Aid", "Fire Emergency"],
  },
  {
    icon: Wheat,
    tag: "Vertical II",
    title: "Global Food Security Initiatives",
    color: "rgba(212,175,55,0.08)",
    borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)",
    iconColor: GOLD,
    description:
      "Zero-income families and conflict-affected populations face chronic nutritional crisis. Our structured food distribution networks — from regional ration drives to clean supply chains — ensure that every household receives adequate, safe, and dignified nourishment.",
    pillars: [
      { icon: Package, label: "Ration Distribution Drives", desc: "Monthly dry ration packages for zero-income households" },
      { icon: Globe, label: "Clean Food Supply Chains", desc: "Vetted procurement ensuring zero adulteration in aid goods" },
      { icon: Wheat, label: "Nutritional Support Programs", desc: "Targeted supplemental feeding for children and nursing mothers" },
    ],
    crises: ["Ration Drives", "Child Nutrition", "Community Kitchens", "Food Vouchers"],
  },
  {
    icon: Home,
    tag: "Vertical III",
    title: "Vulnerable Family Support",
    color: "rgba(80,200,120,0.08)",
    borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)",
    iconColor: "#50c878",
    description:
      "Beyond crisis moments, chronic poverty demands sustained intervention. We provide micro-endowments, seasonal clothing distributions, winterization kits, and emergency shelter aid to underprivileged families — building dignity alongside survival.",
    pillars: [
      { icon: ShieldCheck, label: "Micro-Endowment Grants", desc: "Small-capital grants enabling household economic recovery" },
      { icon: Wind, label: "Winterization & Shelter Aid", desc: "Blankets, heaters, tarpaulins, and emergency shelter kits" },
      { icon: Star, label: "Clothing Distribution Drives", desc: "Seasonal clothing campaigns for children and elders" },
    ],
    crises: ["Shelter Aid", "Winter Kits", "Clothing Drives", "Micro-Grants"],
  },
];

function ReliefVerticals() {
  return (
    <section
      id="relief-verticals"
      className="py-24 px-4 sm:px-6"
      style={{ background: "#010f09" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Core Programs"
          title="Three Pillars of Relief Operations"
          subtitle="Every humanitarian crisis is unique. Our verticals are purpose-built to address distinct dimensions of vulnerability — acute emergencies, chronic food insecurity, and long-term family fragility."
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
                  {/* Tag + Icon */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="text-[9px] font-black tracking-[0.35em] uppercase px-3 py-1 rounded-full"
                      style={{ color: v.iconColor, background: v.iconBg, border: `1px solid ${v.borderColor}` }}
                    >
                      {v.tag}
                    </span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: v.iconBg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: v.iconColor }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.95)" }}
                  >
                    {v.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {v.description}
                  </p>

                  {/* Pillars */}
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

                  {/* Crisis tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-5" style={{ borderTop: `1px solid ${v.borderColor}` }}>
                    {v.crises.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: v.iconColor, background: v.iconBg }}
                      >
                        {c}
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
   OPERATIONAL METRICS
══════════════════════════════════════════════ */
const METRICS = [
  {
    value: 15000,
    prefix: "",
    suffix: "+",
    label: "Families Supported",
    sub: "Across active relief verticals",
    icon: Users,
  },
  {
    value: 120,
    prefix: "",
    suffix: "+",
    label: "Active Crisis Deployments",
    sub: "Live field operations globally",
    icon: Zap,
  },
  {
    value: 100,
    prefix: "",
    suffix: "%",
    label: "Direct Distribution",
    sub: "Zero administrative leakage",
    icon: ShieldCheck,
  },
  {
    value: 48,
    prefix: "<",
    suffix: "h",
    label: "Average Response Time",
    sub: "From intake to first dispatch",
    icon: Clock,
  },
];

function OperationalMetrics() {
  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: EMERALD_DEEP }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Live Impact"
          title="Global Relief Operations at Scale"
          subtitle="Real numbers. Transparent outcomes. Every resource deployed reaches the hands it was intended for — our commitment to zero-overhead direct distribution is absolute."
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
                    <Icon className="w-4.5 h-4.5" style={{ color: GOLD }} />
                  </div>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
                  >
                    <AnimatedCounter
                      target={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </div>
                  <div
                    className="text-sm font-semibold mb-1"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
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

        {/* Transparency strip */}
        <FadeIn delay={0.4} className="mt-12">
          <div
            className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
            style={{
              background: "rgba(212,175,55,0.04)",
              border: "1px solid rgba(212,175,55,0.18)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              <BadgeCheck className="w-6 h-6" style={{ color: GOLD }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">
                100% Transparent Distribution Model
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every relief case is assigned a unique Case Hash traceable through our dispatch verification
                system. No funds are diverted to administrative overhead — every contribution translates
                directly into tangible aid for the beneficiary.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   RELIEF REQUEST FORM + STATUS TRACKER
══════════════════════════════════════════════ */
const CRISIS_CATEGORIES = [
  "Medical Emergency",
  "Disaster Impact (Flood / Earthquake / Fire)",
  "Basic Subsistence Need",
  "Family Displacement",
  "Winter Emergency (Shelter / Warmth)",
  "Food Insecurity",
];

const DISPATCH_STAGES = [
  { id: "intake", label: "Intake", icon: Send },
  { id: "verification", label: "Dispatch Verification", icon: ShieldCheck },
  { id: "allocation", label: "Resource Allocation", icon: Package },
  { id: "delivery", label: "Out for Delivery", icon: Truck },
];

function StatusTracker({ caseHash }: { caseHash: string }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    let stage = 0;
    const timer = setInterval(() => {
      stage += 1;
      setActiveStage(stage);
      if (stage >= DISPATCH_STAGES.length - 1) clearInterval(timer);
    }, 1100);
    return () => clearInterval(timer);
  }, [caseHash]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-7"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,18,11,0.92) 0%, rgba(0,30,18,0.88) 100%)",
        border: "1px solid rgba(212,175,55,0.35)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.15)",
      }}
    >
      {/* Case hash */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <Lock className="w-3 h-3" style={{ color: GOLD }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Secure Case Reference
          </span>
        </div>
        <div
          className="text-2xl md:text-3xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}
        >
          {caseHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Save this reference — our team will contact you within 24 hours
        </p>
      </div>

      {/* Stage progress bar */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px"
          style={{ background: "rgba(212,175,55,0.15)" }}
        />
        <motion.div
          className="absolute top-5 left-[calc(12.5%)] h-px"
          style={{ background: `linear-gradient(to right, ${GOLD}, rgba(212,175,55,0.4))` }}
          initial={{ width: "0%" }}
          animate={{
            width: activeStage >= DISPATCH_STAGES.length - 1
              ? "75%"
              : `${(activeStage / (DISPATCH_STAGES.length - 1)) * 75}%`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Stage nodes */}
        <div className="relative grid grid-cols-4 gap-2">
          {DISPATCH_STAGES.map((stage, i) => {
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
                    <SIcon
                      className="w-4 h-4"
                      style={{ color: isActive ? "#011a10" : "rgba(255,255,255,0.3)" }}
                    />
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

      {/* Status message */}
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
            {activeStage === 0 && "✦ Your request has been received and logged into our secure intake system."}
            {activeStage === 1 && "✦ Our dispatch team is verifying your case details and assessing urgency level."}
            {activeStage === 2 && "✦ Resources are being allocated from our nearest regional depot for your case."}
            {activeStage === 3 && "✦ Relief package is confirmed and on its way. Our field agent will reach you shortly."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function ReliefForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [caseHash, setCaseHash] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    urgency: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.location || !form.urgency) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    const hash = generateCaseHash();
    setCaseHash(hash);
    setSubmitted(true);
    toast({
      title: "Relief Request Submitted",
      description: `Your case ${hash} has been logged. Our team will contact you within 24 hours.`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setFileName(file.name);
      setTimeout(() => setUploading(false), 1200);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <StatusTracker caseHash={caseHash} />
        <div className="mt-6 text-center">
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", category: "", location: "", urgency: "" }); setFileName(""); }}
            className="text-sm font-medium underline"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            Submit another request
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
          background:
            "linear-gradient(135deg, rgba(0,18,11,0.85) 0%, rgba(0,25,15,0.80) 100%)",
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
            All submissions are encrypted and reviewed by our humanitarian team within 24 hours.
          </p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Applicant Full Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full legal name"
            className="h-11 rounded-xl text-sm"
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(212,175,55,0.18)",
              color: "rgba(255,255,255,0.9)",
            }}
          />
        </div>

        {/* Crisis category */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Crisis Category <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {CRISIS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setForm({ ...form, category: cat })}
                className="px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all"
                style={{
                  background:
                    form.category === cat
                      ? "rgba(212,175,55,0.15)"
                      : "rgba(0,0,0,0.3)",
                  border:
                    form.category === cat
                      ? `1px solid ${GOLD}`
                      : "1px solid rgba(212,175,55,0.12)",
                  color:
                    form.category === cat ? GOLD : "rgba(255,255,255,0.55)",
                }}
              >
                {form.category === cat && (
                  <CheckCircle2 className="w-3 h-3 inline mr-1.5" style={{ color: GOLD }} />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Impact location */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Impact Location <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <MapPin
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "rgba(212,175,55,0.5)" }}
            />
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="City, Region, Country"
              className="h-11 rounded-xl text-sm pl-10"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(212,175,55,0.18)",
                color: "rgba(255,255,255,0.9)",
              }}
            />
          </div>
        </div>

        {/* Urgency description */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Description of Urgency <span style={{ color: GOLD }}>*</span>
          </Label>
          <textarea
            value={form.urgency}
            onChange={(e) => setForm({ ...form, urgency: e.target.value })}
            placeholder="Describe your situation clearly — the nature of the crisis, number of people affected, and what specific assistance you need..."
            rows={4}
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

        {/* Proof upload */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Proof / Documentation{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>
              (Optional)
            </span>
          </Label>
          <label
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px dashed rgba(212,175,55,0.25)",
            }}
          >
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            {uploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="w-4 h-4" style={{ color: GOLD }} />
              </motion.div>
            ) : (
              <Upload className="w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            )}
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {fileName
                ? fileName
                : "Upload photo, document, or proof of need (JPG, PNG, PDF · max 10MB)"}
            </span>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{
            background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
            color: "#011a10",
            border: "none",
          }}
        >
          <Send className="w-4 h-4" />
          Submit Emergency Relief Request
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HOW WE OPERATE
══════════════════════════════════════════════ */
const OPERATIONS = [
  {
    step: "01",
    title: "Intake Assessment",
    desc: "Every relief request receives a unique case hash and is assessed within 24 hours by our humanitarian triage team.",
  },
  {
    step: "02",
    title: "Dispatch Verification",
    desc: "Cases are geo-verified and urgency-scored. Our field coordinators confirm logistics routing for the designated region.",
  },
  {
    step: "03",
    title: "Resource Allocation",
    desc: "Aid packages are assembled from our nearest depot — medical kits, ration packs, or shelter supplies as appropriate.",
  },
  {
    step: "04",
    title: "Direct Delivery",
    desc: "Field agents deliver aid directly to the beneficiary with photographic confirmation uploaded to the case file.",
  },
];

function HowWeOperate() {
  return (
    <section className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Operational Protocol"
          title="From Request to Relief — Our Process"
          subtitle="A structured, verifiable pipeline ensures every case is handled with urgency, accountability, and dignity."
        />
        <div className="grid md:grid-cols-4 gap-6">
          {OPERATIONS.map((op, i) => (
            <FadeIn key={op.step} delay={i * 0.1}>
              <div
                className="relative rounded-2xl p-6 h-full"
                style={{
                  background: "rgba(0,18,11,0.65)",
                  border: "1px solid rgba(212,175,55,0.18)",
                }}
              >
                {/* Connector arrow */}
                {i < OPERATIONS.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10"
                    style={{ color: GOLD }}
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: "rgba(212,175,55,0.4)" }} />
                  </div>
                )}
                <span
                  className="text-3xl font-bold block mb-3"
                  style={{
                    color: "rgba(212,175,55,0.3)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {op.step}
                </span>
                <h4
                  className="text-base font-bold mb-2"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {op.title}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {op.desc}
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
   CALL TO ACTION BAND
══════════════════════════════════════════════ */
function CtaBand() {
  return (
    <FadeIn>
      <section
        className="py-20 px-4 sm:px-6"
        style={{ background: EMERALD_DEEP, borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(0,40,22,0.6) 50%, rgba(212,175,55,0.04) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <HandHeart className="w-10 h-10 mx-auto mb-5" style={{ color: GOLD }} />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}
            >
              Every Contribution Saves a Life
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Your donation powers direct relief operations — no intermediaries, no overhead. Join thousands
              of global supporters who trust Orakzai.org to deploy aid with integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}
              >
                <HeartPulse className="w-4 h-4" />
                Donate to Relief Fund
              </a>
              <a
                href="#relief-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}
              >
                <AlertTriangle className="w-4 h-4" style={{ color: GOLD }} />
                Submit Relief Request
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
export default function SocialWelfareRelief() {
  return (
    <MainLayout>
      <Hero />
      <ReliefVerticals />
      <OperationalMetrics />
      <HowWeOperate />

      {/* Emergency Relief Request Form */}
      <section
        id="relief-form"
        className="py-24 px-4 sm:px-6"
        style={{ background: "#010f09" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Emergency Portal"
            title="Submit a Relief Request"
            subtitle="Our secure humanitarian intake portal is open 24/7. Every case is assigned a unique Case Hash and reviewed by our dispatch team within 24 hours."
          />
          <ReliefForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
