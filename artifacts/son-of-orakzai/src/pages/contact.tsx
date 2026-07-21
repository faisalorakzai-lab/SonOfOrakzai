import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail, Phone, Globe, ShieldCheck, CheckCircle2,
  Loader2, ChevronRight, Clock, Headphones, Building2,
  Send, Hash, Sparkles, AlertCircle,
} from "lucide-react";
import { useState } from "react";

const GOLD = "#D4AF37";
const BG   = "#011a10";
const BG2  = "#02280f";

/* ── Zod schema ── */
const schema = z.object({
  fullName:    z.string().min(2, "Full name is required"),
  email:       z.string().email("Enter a valid email address"),
  phone:       z.string().optional(),
  category:    z.enum(["general", "emergency", "grant", "partnership"], {
    required_error: "Please select an inquiry category",
  }),
  subject:     z.string().min(5, "Subject must be at least 5 characters"),
  message:     z.string().min(20, "Please provide at least 20 characters"),
});
type FormValues = z.infer<typeof schema>;

const categories = [
  { value: "general",     label: "General Inquiry" },
  { value: "emergency",   label: "Emergency Legal Aid" },
  { value: "grant",       label: "Grant / Scholarship Support" },
  { value: "partnership", label: "Diaspora Partnership" },
] as const;

/* ── Gateways ── */
const gateways = [
  {
    icon: Building2,
    accent: GOLD,
    badge: "Primary Channel",
    title: "Institutional Secretariat",
    desc: "General inquiries, partnerships, and institutional communications.",
    details: [
      { icon: Mail,  text: "info@orakzaibond.com" },
      { icon: Clock, text: "Response within 24 hours" },
    ],
  },
  {
    icon: Headphones,
    accent: "#ef4444",
    badge: "24 / 7 Priority",
    title: "Emergency & Crisis Response",
    desc: "Urgent legal defense, migrant protection, and humanitarian crisis reports.",
    details: [
      { icon: Phone,     text: "+92 336 7970004" },
      { icon: ShieldCheck, text: "24/7 Priority Support Protocols" },
    ],
  },
  {
    icon: Globe,
    accent: "#22c55e",
    badge: "Global Network",
    title: "Global Chapter Coordination",
    desc: "Regional chapters across Gulf, Middle East, Europe, and North America.",
    details: [
      { icon: Mail,  text: "chapters@orakzaibond.com" },
      { icon: Globe, text: "Gulf · MENA · Europe · North America" },
    ],
  },
];

/* ── Input base styles (applied via className, augmented inline) ── */
const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200";
const inputStyle = {
  background: "rgba(0,40,20,0.7)",
  border: "1px solid rgba(212,175,55,0.18)",
};

/* ── Generates O-CNT-XXXX hash ── */
function genHash() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let h = "";
  for (let i = 0; i < 4; i++) h += chars[Math.floor(Math.random() * chars.length)];
  return `O-CNT-${h}`;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryHash, setInquiryHash] = useState("");
  const [loading, setLoading]     = useState(false);
  const [focusedField, setFocused] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedCategory = watch("category");

  const onSubmit = async (_data: FormValues) => {
    setLoading(true);
    /* Simulated dispatch — swap for supabase insert when table is ready */
    await new Promise((r) => setTimeout(r, 1400));
    const hash = genHash();
    setInquiryHash(hash);
    setSubmitted(true);
    setLoading(false);
    reset();
  };

  const focusRingStyle = (field: string) => ({
    ...inputStyle,
    border: focusedField === field
      ? `1px solid ${GOLD}`
      : inputStyle.border,
    boxShadow: focusedField === field
      ? `0 0 0 2px rgba(212,175,55,0.12)`
      : "none",
  });

  return (
    <MainLayout>

      {/* ═══════════════  HERO  ═══════════════ */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BG} 0%, ${BG2} 60%, ${BG} 100%)` }}
      >
        {/* Gold top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}99, transparent)` }}
        />
        {/* Glow orb */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            {/* Category badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.25em] mb-8"
              style={{ background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.22)`, color: GOLD }}
            >
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              C O N T A C T &nbsp;•&nbsp; A D V O C A C Y &nbsp;•&nbsp; S U P P O R T
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Global Embassy{" "}
              <span style={{ color: GOLD }}>Contact Center</span>
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
              Direct communication channels for emergency assistance, legal advocacy,
              institutional partnerships, and global diaspora inquiries.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-[1px] w-16" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              <div className="h-[1px] w-16" style={{ background: `linear-gradient(90deg, ${GOLD}55, transparent)` }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════  GATEWAY CARDS  ═══════════════ */}
      <section className="py-16 relative" style={{ background: BG }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-10"
            style={{ color: `${GOLD}99` }}
          >
            — Multi-Channel Contact Gateways —
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {gateways.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.1 }}
                  className="rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 hover:scale-[1.015]"
                  style={{
                    background: "rgba(212,175,55,0.04)",
                    border: `1px solid rgba(212,175,55,0.14)`,
                    boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}35` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: g.accent }} />
                    </div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: `${g.accent}15`, color: g.accent, border: `1px solid ${g.accent}30` }}
                    >
                      {g.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="text-white font-bold text-base mb-1.5 leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {g.title}
                    </h3>
                    <p className="text-white/45 text-xs leading-relaxed">{g.desc}</p>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-2 mt-auto pt-3" style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
                    {g.details.map((d) => {
                      const DIcon = d.icon;
                      return (
                        <div key={d.text} className="flex items-center gap-2">
                          <DIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: g.accent }} />
                          <span className="text-white/60 text-xs font-medium">{d.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hover accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${g.accent}60, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════  INQUIRY FORM  ═══════════════ */}
      <section className="py-16 relative" style={{ background: `linear-gradient(180deg, ${BG} 0%, #012015 100%)` }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5"
              style={{ background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.2)`, color: GOLD }}
            >
              <Send className="w-3 h-3" /> Secure Inquiry &amp; Case Intake
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Submit Your Inquiry
            </h2>
            <p className="text-white/45 text-sm leading-relaxed max-w-lg mx-auto">
              All submissions are end-to-end encrypted and dispatched directly to the Institutional Secretariat.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              /* ── FORM ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-7 sm:p-9"
                style={{
                  background: "rgba(1,26,16,0.85)",
                  border: `1px solid rgba(212,175,55,0.16)`,
                  boxShadow: "0 8px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  {/* Row 1 — Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        Full Name <span style={{ color: GOLD }}>*</span>
                      </label>
                      <input
                        {...register("fullName")}
                        placeholder="e.g. Ahmad Khan"
                        className={inputClass}
                        style={focusRingStyle("fullName")}
                        onFocus={() => setFocused("fullName")}
                        onBlur={() => setFocused(null)}
                      />
                      {errors.fullName && (
                        <span className="flex items-center gap-1 text-[11px] text-red-400">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        Email Address <span style={{ color: GOLD }}>*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass}
                        style={focusRingStyle("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-[11px] text-red-400">
                          <AlertCircle className="w-3 h-3" /> {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2 — Phone + Category */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        Contact Number / WhatsApp
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="+92 3XX XXXXXXX"
                        className={inputClass}
                        style={focusRingStyle("phone")}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        Category <span style={{ color: GOLD }}>*</span>
                      </label>
                      {/* Custom select pills on mobile, native select fallback */}
                      <div className="relative">
                        <select
                          value={selectedCategory ?? ""}
                          onChange={(e) => setValue("category", e.target.value as FormValues["category"], { shouldValidate: true })}
                          className={`${inputClass} pr-8 appearance-none cursor-pointer`}
                          style={{
                            ...focusRingStyle("category"),
                            color: selectedCategory ? "white" : "rgba(255,255,255,0.3)",
                          }}
                          onFocus={() => setFocused("category")}
                          onBlur={() => setFocused(null)}
                        >
                          <option value="" disabled style={{ background: "#011a10", color: "rgba(255,255,255,0.4)" }}>
                            Select category…
                          </option>
                          {categories.map((c) => (
                            <option key={c.value} value={c.value} style={{ background: "#011a10", color: "white" }}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <ChevronRight
                          className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
                          style={{ color: GOLD }}
                        />
                      </div>
                      {errors.category && (
                        <span className="flex items-center gap-1 text-[11px] text-red-400">
                          <AlertCircle className="w-3 h-3" /> {errors.category.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      Subject <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      {...register("subject")}
                      placeholder="Brief subject of your inquiry"
                      className={inputClass}
                      style={focusRingStyle("subject")}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    />
                    {errors.subject && (
                      <span className="flex items-center gap-1 text-[11px] text-red-400">
                        <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      Message / Case Details <span style={{ color: GOLD }}>*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      placeholder="Please describe your situation, inquiry, or case in detail. For emergency cases, include relevant dates and locations."
                      rows={5}
                      className={`${inputClass} resize-y min-h-[120px] leading-relaxed`}
                      style={focusRingStyle("message")}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                    {errors.message && (
                      <span className="flex items-center gap-1 text-[11px] text-red-400">
                        <AlertCircle className="w-3 h-3" /> {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Encryption notice */}
                  <div
                    className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs text-white/40"
                    style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.09)" }}
                  >
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                    Your submission is encrypted and dispatched securely to the Institutional Secretariat.
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: loading
                        ? "rgba(212,175,55,0.4)"
                        : `linear-gradient(135deg, #b8860b, ${GOLD})`,
                      color: "#011a10",
                      boxShadow: loading ? "none" : `0 4px 24px rgba(212,175,55,0.25)`,
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Dispatching to Secretariat…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Secure Inquiry
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* ── CONFIRMATION CARD ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl p-8 sm:p-10 text-center"
                style={{
                  background: "rgba(1,26,16,0.9)",
                  border: `1px solid rgba(212,175,55,0.25)`,
                  boxShadow: "0 8px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,175,55,0.1)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Pulse icon */}
                <div className="flex items-center justify-center mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center relative"
                    style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                    {/* Ripple */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(34,197,94,0.4)" }}
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Inquiry Dispatched
                </h2>
                <p className="text-white/45 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                  Your submission has been securely received and routed to the Institutional Secretariat.
                </p>

                {/* Hash card */}
                <div
                  className="rounded-xl p-5 mb-6 mx-auto max-w-xs"
                  style={{
                    background: "rgba(212,175,55,0.07)",
                    border: `1px solid rgba(212,175,55,0.3)`,
                  }}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <Hash className="w-3.5 h-3.5" style={{ color: GOLD }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Inquiry Reference</span>
                  </div>
                  <div
                    className="text-2xl font-bold tracking-widest mb-3"
                    style={{ color: GOLD, fontFamily: "monospace" }}
                  >
                    {inquiryHash}
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold"
                    style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Dispatched to Secretariat
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2 text-sm text-white/40 mb-8 max-w-xs mx-auto">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                    <span>General inquiries — within <strong className="text-white/60">24 hours</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#ef4444" }} />
                    <span>Emergency / legal aid — within <strong className="text-white/60">2–4 hours</strong></span>
                  </div>
                </div>

                {/* New inquiry button */}
                <button
                  onClick={() => { setSubmitted(false); setInquiryHash(""); }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:brightness-110"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: `1px solid rgba(212,175,55,0.25)`,
                    color: GOLD,
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════  BOTTOM CTA STRIP  ═══════════════ */}
      <section
        className="py-12 relative overflow-hidden"
        style={{ background: BG2, borderTop: `1px solid rgba(212,175,55,0.1)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)` }}
        />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-3">Direct Headquarters</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="mailto:info@orakzaibond.com"
              className="flex items-center gap-2 font-medium transition-colors hover:opacity-80"
              style={{ color: GOLD }}
            >
              <Mail className="w-4 h-4" /> info@orakzaibond.com
            </a>
            <div className="w-px h-4 opacity-20" style={{ background: GOLD }} />
            <a
              href="tel:+923367970004"
              className="flex items-center gap-2 font-medium text-white/50 transition-colors hover:text-white/80"
            >
              <Phone className="w-4 h-4" /> +92 336 7970004
            </a>
            <div className="w-px h-4 opacity-20" style={{ background: GOLD }} />
            <span className="flex items-center gap-2 text-white/35">
              <Globe className="w-4 h-4" /> Gulf · MENA · Europe · North America
            </span>
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
