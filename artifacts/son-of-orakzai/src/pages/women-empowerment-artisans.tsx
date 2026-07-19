import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles, ShoppingBag, GraduationCap, Coins, Upload,
  CheckCircle2, Lock, BadgeCheck, MapPin, Mail, Phone,
  User, ArrowRight, Store, Laptop, Scissors, Gem,
  Package, Globe2, Palette, Shirt, Flower2, Award,
  HandCoins, TrendingUp, Star, Layers, Heart,
  ChevronRight, Building2, Leaf, Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GOLD = "#D4AF37";
const EMERALD_DEEP = "#00120B";
const ROSE = "#e8a0a0";

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

function generateCraftHash(): string {
  return `O-CRAFT-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ background: EMERALD_DEEP }}>

      {/* Layered glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(212,175,55,0.07) 0%, transparent 65%)," +
          "radial-gradient(ellipse 45% 60% at 5% 75%, rgba(180,80,120,0.06) 0%, transparent 55%)," +
          "radial-gradient(ellipse 45% 60% at 95% 75%, rgba(180,80,120,0.06) 0%, transparent 55%)",
      }} />

      {/* Woven diagonal pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(212,175,55,0.8) 0px, rgba(212,175,55,0.8) 1px, transparent 1px, transparent 40px)," +
            "repeating-linear-gradient(-45deg, rgba(212,175,55,0.8) 0px, rgba(212,175,55,0.8) 1px, transparent 1px, transparent 40px)",
        }} />

      {/* Floating craft icons */}
      {[
        { Icon: Scissors, x: "8%", y: "20%", size: 16 },
        { Icon: Gem, x: "86%", y: "16%", size: 14 },
        { Icon: Flower2, x: "6%", y: "65%", size: 15 },
        { Icon: Palette, x: "90%", y: "60%", size: 16 },
        { Icon: Crown, x: "50%", y: "85%", size: 13 },
        { Icon: Star, x: "30%", y: "12%", size: 11 },
      ].map(({ Icon, x, y, size }, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          animate={{ y: [-8, 8, -8], opacity: [0.1, 0.2, 0.1], rotate: [-5, 5, -5] }}
          transition={{ duration: 4.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}>
          <Icon style={{ width: size, height: size, color: GOLD }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: GOLD }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
            Women Empowerment & Artisans
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
          Elevating Craft,{" "}
          <span style={{
            background: `linear-gradient(135deg, ${GOLD}, #f0d060, ${GOLD})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Empowering Independence
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}>
          Orakzai.org's Women Empowerment & Artisans programme breaks economic barriers for women,
          preserves generations of traditional cultural craft, and connects grassroots artisans
          directly with global premium markets — eliminating exploitation and returning full value
          to the hands that create it.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#artisan-form"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
            <Store className="w-4 h-4" />
            Register as Artisan
          </a>
          <a href="#empowerment-verticals"
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
            { value: "850+", label: "Artisans Connected" },
            { value: "15+", label: "Craft Clusters Revived" },
            { value: "100%", label: "Direct Fair-Trade Revenue" },
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
   THREE EMPOWERMENT VERTICALS
══════════════════════════════════════════════ */
const VERTICALS = [
  {
    icon: ShoppingBag, tag: "Vertical I", title: "Artisanal Marketplace & Trade",
    color: "rgba(212,175,55,0.07)", borderColor: "rgba(212,175,55,0.25)",
    iconBg: "rgba(212,175,55,0.1)", iconColor: GOLD, badge: "Global Market",
    description:
      "A premium digital portal that onboards, showcases, and exports high-end traditional crafts, hand-embroidered textiles, and bespoke artisanal items directly to international markets — eliminating exploitative middlemen and returning the full margin to the artisan.",
    pillars: [
      { icon: Store, label: "Direct Export Marketplace", desc: "Premium online storefront connecting artisans to buyers in UAE, UK, USA, and Europe with zero commission structures" },
      { icon: Globe2, label: "Overseas Trade Linkages", desc: "Established relationships with boutique retailers and cultural galleries across 20+ countries" },
      { icon: Award, label: "Fair-Trade Certification", desc: "Certified labelling and provenance documentation that commands premium pricing in global markets" },
    ],
    tags: ["Export Portal", "Zero Middlemen", "Fair Trade", "Global Buyers"],
  },
  {
    icon: Laptop, tag: "Vertical II", title: "Skill Development & Tech Training",
    color: "rgba(200,160,255,0.07)", borderColor: "rgba(200,160,255,0.2)",
    iconBg: "rgba(200,160,255,0.1)", iconColor: "#c8a0ff", badge: "Vocational",
    description:
      "Structured vocational programmes covering premium textile design, small-business management, digital literacy, and end-to-end e-commerce operations — giving every woman the knowledge and tools to build an independent, scalable livelihood.",
    pillars: [
      { icon: Palette, label: "Premium Textile & Design Training", desc: "Master-class curriculum in traditional patterns, natural dye techniques, and contemporary fusion design" },
      { icon: TrendingUp, label: "Business & Finance Literacy", desc: "Practical modules covering pricing, costing, bookkeeping, and growth planning for cottage enterprises" },
      { icon: Laptop, label: "Digital & E-Commerce Workflows", desc: "Hands-on training in digital product photography, online listings, payment systems, and customer management" },
    ],
    tags: ["Design Mastery", "Business Skills", "E-Commerce", "Digital Literacy"],
  },
  {
    icon: HandCoins, tag: "Vertical III", title: "Micro-Enterprise Incubator",
    color: "rgba(80,200,120,0.07)", borderColor: "rgba(80,200,120,0.2)",
    iconBg: "rgba(80,200,120,0.1)", iconColor: "#50c878", badge: "Interest-Free",
    description:
      "Dedicated zero-interest micro-grants, equipment provisions, and raw material supply chains that give women the tangible capital needed to establish self-sustaining home-based cottage businesses — without debt, without dependency.",
    pillars: [
      { icon: Coins, label: "Interest-Free Startup Grants", desc: "Riba-free seed capital ranging from raw material vouchers to full cottage-industry equipment sets" },
      { icon: Package, label: "Raw Material Provisions", desc: "Subsidised threads, fabrics, tools, and materials delivered directly to artisan clusters" },
      { icon: Layers, label: "Cottage Business Formation", desc: "Guidance on formalising businesses, registering products, and accessing government support schemes" },
    ],
    tags: ["Zero Interest", "Equipment Aid", "Raw Materials", "Business Setup"],
  },
];

function EmpowermentVerticals() {
  return (
    <section id="empowerment-verticals" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Programme Architecture"
          title="Three Pillars of Women's Economic Sovereignty"
          subtitle="From raw craft to global market — our three-vertical model takes an artisan from skill development through business formation to international fair-trade export, at every stage supported by Orakzai.org's institutional infrastructure."
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
   LIVE IMPACT METRICS
══════════════════════════════════════════════ */
const METRICS = [
  { value: 850, suffix: "+", label: "Artisans Globally Connected", sub: "Active registered artisan members", icon: Sparkles },
  { value: 15, suffix: "+", label: "Craft Clusters Revived", sub: "Traditional craft communities restored", icon: Flower2 },
  { value: 100, suffix: "%", label: "Direct Fair-Trade Revenue", sub: "Zero middleman deduction model", icon: Award },
  { value: 40, suffix: "+", label: "Export Destinations", sub: "Countries receiving Orakzai crafts", icon: Globe2 },
];

function ImpactMetrics() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Programme Impact"
          title="Measurable Outcomes, Real Lives Changed"
          subtitle="Every artisan onboarded, every craft cluster revived, and every gram of product exported at fair-trade value is a direct act of economic sovereignty restored to women who built these traditions with their hands."
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

        {/* Fair-trade assurance */}
        <FadeIn delay={0.4} className="mt-12">
          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
            style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.18)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}>
              <Leaf className="w-6 h-6" style={{ color: GOLD }} />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-white text-sm mb-1">
                Zero-Commission · Fully Ethical Supply Chain · Direct Producer Pricing
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Every product listed on the Orakzai.org artisan marketplace is priced by the artisan,
                exported directly under fair-trade certification, and pays 100% of revenue back to
                the creator — no platform fee, no middleman cut, no exploitation. This is the economic
                model the artisan economy deserves.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ARTISAN REGISTRY STATUS CARD
══════════════════════════════════════════════ */
const CRAFT_STAGES = [
  { id: "logged", label: "Profile Logged", icon: Store },
  { id: "review", label: "Allocation Review", icon: BadgeCheck },
  { id: "active", label: "Supply Dispatch / Digital Onboarding Active", icon: Sparkles },
];

function ArtisanRegistryCard({ craftHash }: { craftHash: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [syncPct, setSyncPct] = useState(0);

  useEffect(() => {
    let stage = 0;
    const st = setInterval(() => {
      stage += 1; setActiveStage(stage);
      if (stage >= CRAFT_STAGES.length - 1) clearInterval(st);
    }, 1000);
    let pct = 0;
    const pt = setInterval(() => {
      pct += 2; setSyncPct(Math.min(pct, 100));
      if (pct >= 100) clearInterval(pt);
    }, 40);
    return () => { clearInterval(st); clearInterval(pt); };
  }, [craftHash]);

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

      {/* Header */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Sparkles className="w-3 h-3" style={{ color: GOLD }} />
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Artisan Registry Hash Issued
          </span>
        </div>
        <div className="text-xl md:text-2xl font-bold tracking-widest"
          style={{ fontFamily: "monospace", color: GOLD }}>
          {craftHash}
        </div>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Present this reference when contacting any Orakzai.org artisan coordination hub
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}>Registry Processing</span>
          <span className="text-[10px] font-bold" style={{ color: GOLD }}>{syncPct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, #b8860b, ${GOLD})` }}
            initial={{ width: "0%" }} animate={{ width: `${syncPct}%` }}
            transition={{ duration: 0.1 }} />
        </div>
      </div>

      {/* 3-stage tracker — wider node spacing for 3 nodes */}
      <div className="relative mb-6">
        <div className="absolute top-5 left-[calc(16.66%)] right-[calc(16.66%)] h-px"
          style={{ background: "rgba(212,175,55,0.15)" }} />
        <motion.div className="absolute top-5 left-[calc(16.66%)] h-px"
          style={{ background: `linear-gradient(to right, ${GOLD}, rgba(212,175,55,0.4))` }}
          initial={{ width: "0%" }}
          animate={{ width: activeStage >= CRAFT_STAGES.length - 1 ? "66.66%" : `${(activeStage / (CRAFT_STAGES.length - 1)) * 66.66}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }} />

        <div className="relative grid grid-cols-3 gap-2">
          {CRAFT_STAGES.map((stage, i) => {
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
                <span className="text-[9px] font-semibold text-center leading-tight px-1"
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
            {activeStage === 0 && "✦ Your artisan profile has been securely logged in the Orakzai.org registry. Our coordination team will review your application within 48 hours."}
            {activeStage === 1 && "✦ Your craft profile is under allocation review — our team is assessing marketplace tier, skill training pathway, and grant eligibility."}
            {activeStage === 2 && "✦ Welcome to the network. Your supply dispatch has been arranged and your digital marketplace onboarding is now active."}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   ARTISAN INTAKE FORM
══════════════════════════════════════════════ */
const CRAFT_TYPES = [
  { value: "textiles", label: "Textiles", icon: Shirt },
  { value: "embroidery", label: "Embroidery", icon: Flower2 },
  { value: "jewelry", label: "Jewelry", icon: Gem },
  { value: "pottery", label: "Pottery", icon: Layers },
  { value: "small-trade", label: "Small Trade", icon: ShoppingBag },
  { value: "other", label: "Other Craft", icon: Palette },
];

const ASSISTANCE_TYPES = [
  { value: "marketplace", label: "Marketplace Onboarding", icon: Store },
  { value: "training", label: "Skill Training", icon: GraduationCap },
  { value: "materials", label: "Equipment / Raw Materials Grant", icon: Package },
];

function ArtisanForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [craftHash, setCraftHash] = useState("");
  const [form, setForm] = useState({
    name: "", craftType: "", location: "", assistanceType: "", email: "", phone: "", description: "",
  });
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.craftType || !form.location || !form.assistanceType || !form.email) {
      toast({ title: "Incomplete Form", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    const hash = generateCraftHash();
    setCraftHash(hash);
    setSubmitted(true);
    toast({ title: "Artisan Registry Hash Issued", description: `Your reference is ${hash}` });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <ArtisanRegistryCard craftHash={craftHash} />
        <div className="mt-6 text-center">
          <button onClick={() => { setSubmitted(false); setForm({ name: "", craftType: "", location: "", assistanceType: "", email: "", phone: "", description: "" }); setFileName(""); }}
            className="text-sm font-medium underline" style={{ color: "rgba(212,175,55,0.6)" }}>
            Register another artisan
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
          border: "1px solid rgba(212,175,55,0.2)", backdropFilter: "blur(16px)",
          boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)",
        }}>

        {/* Privacy notice */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            All registrations are confidential. Artisan data is never shared without explicit consent.
          </p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Applicant / Group Name <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.5)" }} />
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name or craft group name"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Craft Specialization */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Art / Craft Specialization <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CRAFT_TYPES.map((ct) => {
              const CIcon = ct.icon;
              return (
                <button key={ct.value} type="button"
                  onClick={() => setForm({ ...form, craftType: ct.value })}
                  className="px-3 py-3 rounded-xl text-left text-xs font-medium transition-all flex items-center gap-2"
                  style={{
                    background: form.craftType === ct.value ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.3)",
                    border: form.craftType === ct.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                    color: form.craftType === ct.value ? GOLD : "rgba(255,255,255,0.55)",
                  }}>
                  <CIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  {ct.label}
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
              placeholder="Village, District, Country"
              className="h-11 rounded-xl text-sm pl-10"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)" }} />
          </div>
        </div>

        {/* Required Assistance */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Required Assistance <span style={{ color: GOLD }}>*</span>
          </Label>
          <div className="flex flex-col gap-2">
            {ASSISTANCE_TYPES.map((at) => {
              const AIcon = at.icon;
              return (
                <button key={at.value} type="button"
                  onClick={() => setForm({ ...form, assistanceType: at.value })}
                  className="px-4 py-3 rounded-xl text-left text-sm font-medium transition-all flex items-center gap-3"
                  style={{
                    background: form.assistanceType === at.value ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.3)",
                    border: form.assistanceType === at.value ? `1px solid ${GOLD}` : "1px solid rgba(212,175,55,0.12)",
                    color: form.assistanceType === at.value ? GOLD : "rgba(255,255,255,0.55)",
                  }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: form.assistanceType === at.value ? "rgba(212,175,55,0.2)" : "rgba(212,175,55,0.05)" }}>
                    <AIcon className="w-3.5 h-3.5" style={{ color: form.assistanceType === at.value ? GOLD : "rgba(212,175,55,0.4)" }} />
                  </div>
                  {at.label}
                  {form.assistanceType === at.value && (
                    <CheckCircle2 className="w-4 h-4 ml-auto" style={{ color: GOLD }} />
                  )}
                </button>
              );
            })}
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

        {/* Work / Portfolio Upload */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Work / Portfolio Image Upload{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px dashed rgba(212,175,55,0.25)" }}>
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.1)" }}>
              <Upload className="w-3.5 h-3.5" style={{ color: GOLD }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: fileName ? GOLD : "rgba(255,255,255,0.5)" }}>
                {fileName || "Upload photos of your craft work"}
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                JPG, PNG, WEBP, PDF — max 10MB
              </p>
            </div>
            {fileName && <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: GOLD }} />}
          </label>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            Brief Description{" "}
            <span className="normal-case font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(Optional)</span>
          </Label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your craft, how long you've been practising, and what support would mean to you and your community..."
            rows={3}
            className="w-full rounded-xl p-3.5 text-sm resize-none"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "inherit" }} />
        </div>

        {/* Submit */}
        <Button type="submit"
          className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2.5"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}>
          <Sparkles className="w-4 h-4" />
          Register My Artisan Profile
        </Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CRAFT CLUSTER SHOWCASE
══════════════════════════════════════════════ */
const CLUSTERS = [
  { region: "Khyber Pakhtunkhwa", crafts: "Swat embroidery · Pashtun tribal textiles · hand-loomed shawls" },
  { region: "FATA / Tribal Belts", crafts: "Waziri rugs · copper craftwork · traditional jewellery" },
  { region: "Gilgit-Baltistan", crafts: "Wool weaving · gemstone crafts · Hunza caps & embroidery" },
  { region: "Punjab Artisan Belts", crafts: "Phulkari embroidery · blue pottery · leather goods" },
  { region: "Sindh Craft Communities", crafts: "Ajrak block prints · Sindhi caps · mirror work textiles" },
  { region: "Diaspora Artisans (Overseas)", crafts: "UK, UAE, Canada — cultural craft preservation & export" },
];

function CraftClusters() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#010f09" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Craft Heritage" title="Active Artisan Clusters by Region"
          subtitle="Our programme is anchored in the authentic craft traditions of specific regional communities — each cluster carries centuries of inherited technique that Orakzai.org is committed to preserving and commercialising at fair value." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CLUSTERS.map((c, i) => (
            <FadeIn key={c.region} delay={i * 0.08}>
              <div className="rounded-xl p-5"
                style={{ background: "rgba(0,18,11,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                  <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{c.region}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{c.crafts}</p>
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
            <Crown className="w-10 h-10 mx-auto mb-5" style={{ color: GOLD }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.97)" }}>
              Every Stitch Carries a Story Worth Preserving
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Whether you're an embroiderer in Swat, a jeweller in Gilgit, or a weaver in the diaspora —
              Orakzai.org's Artisan Programme is your institutional gateway to global markets, sustainable
              income, and the dignity your craft deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#artisan-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}>
                <Store className="w-4 h-4" />
                Join the Artisan Network
              </a>
              <a href="/economic-innovation-grants"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                <HandCoins className="w-4 h-4" style={{ color: GOLD }} />
                Explore Micro-Grants
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
export default function WomenEmpowermentArtisans() {
  return (
    <MainLayout>
      <Hero />
      <EmpowermentVerticals />
      <ImpactMetrics />
      <CraftClusters />

      {/* Artisan Portal */}
      <section id="artisan-form" className="py-24 px-4 sm:px-6" style={{ background: "#010f09" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Artisan Registration Portal"
            title="Register Your Craft & Access Support"
            subtitle="Join 850+ artisans already connected to global markets through Orakzai.org. Register your profile and we will match you with the right marketplace tier, training cohort, or materials grant — within 48 hours."
          />
          <ArtisanForm />
        </div>
      </section>

      <CtaBand />
    </MainLayout>
  );
}
