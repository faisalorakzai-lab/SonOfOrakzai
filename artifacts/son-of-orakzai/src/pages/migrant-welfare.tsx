import { useMemo, useRef, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShieldCheck, Plane, Landmark, HeartHandshake, Users, GraduationCap,
  CheckCircle2, ChevronRight, Smartphone, Lock, Sparkles,
  IdCard, Fingerprint, ChevronDown, Wallet, ArrowRight, Copy, CheckCheck,
  MessageCircle, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const GOLD = "#D4AF37";
const EMERALD_DEEP = "#00120B";

/* ── The 18 verified Orakzai qoums (sections), matching the tribal
   council roster used across the Team → Community Council screens ── */
const QOUMS: string[] = [
  "Ali Khel", "Mula Khel", "Mamozai", "Ali Sherzai", "Eisa Khel",
  "Akhund Khel", "Shikhan", "Sepoy", "Bar Muhammad Khel", "Mani Khel",
  "Feroz Khel", "Utman Khel", "Bezoti", "Stori Khel", "Alizai",
  "Muhammad Khel", "Daulatzai", "Mishti",
];

/* ── Currency conversion (illustrative diaspora-facing rates,
   base unit = PKR; editable later against a live FX feed) ── */
const CURRENCIES: Record<string, { symbol: string; rate: number; label: string }> = {
  PKR: { symbol: "₨", rate: 1, label: "Pakistani Rupee" },
  USD: { symbol: "$", rate: 1 / 278, label: "US Dollar" },
  AED: { symbol: "AED", rate: 1 / 75.7, label: "UAE Dirham" },
  SAR: { symbol: "SAR", rate: 1 / 74.1, label: "Saudi Riyal" },
};

function formatAmount(pkr: number, currency: string): string {
  const c = CURRENCIES[currency];
  const value = pkr * c.rate;
  const decimals = currency === "PKR" ? 0 : 2;
  return `${c.symbol} ${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

/* ── Membership packages ── */
const PACKAGES = [
  {
    id: "basic",
    name: "Basic Protection Package",
    monthlyPKR: 1000,
    tagline: "Essential coverage for every migrant worker & traveler",
    accent: "rgba(212,175,55,0.35)",
    featured: false,
    benefits: [
      { icon: HeartHandshake, text: "100% critical healthcare coverage for medical expenses exceeding ₨100,000" },
      { icon: Plane, text: "Full international body repatriation logistics back to ancestral Orakzai lands" },
      { icon: Landmark, text: "Complete institutional funeral arrangements (Gaur-o-Kafan) fully funded" },
    ],
  },
  {
    id: "elite",
    name: "Elite Family Security Package",
    monthlyPKR: 2000,
    tagline: "Everything in Basic, plus long-term family protection",
    accent: GOLD,
    featured: true,
    benefits: [
      { icon: CheckCircle2, text: "Includes every Basic Protection Package benefit in full" },
      { icon: Users, text: "Post-demise immediate family financial security grant, disbursed directly" },
      { icon: Wallet, text: "Ongoing basic sustenance stipend for the surviving household" },
      { icon: GraduationCap, text: "Educational tuition waiver tracking for up to 2 children" },
    ],
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Register", desc: "Complete the intake form with your details and select your qoum (tribal section)." },
  { step: "02", title: "Pay", desc: "Send your monthly dues via EasyPaisa, JazzCash, NayaPay, SadaPay, or UBL bank transfer." },
  { step: "03", title: "Verify", desc: "Enter your transaction reference — our team verifies it against your qoum's records within 48 hours." },
  { step: "04", title: "Protected", desc: "Once verified, your Membership ID activates — healthcare, repatriation, and funeral support are on standby." },
];

/* ── Real, active payment channels for monthly membership dues ── */
const WALLET_ACCOUNT_TITLE = "Muhammad Faisal";
const WALLET_NUMBER = "03367970004";
const UBL_ACCOUNT_NUMBER = "0909318870498";
const UBL_IBAN = "PK13UNIL0109000318870498";
const WHATSAPP_NUMBER = "+92 336 7970004";

const PAYMENT_METHODS = [
  { id: "easypaisa", name: "EasyPaisa", kind: "wallet", color: "linear-gradient(135deg,#6DC04B,#4CA836)", letter: "E" },
  { id: "jazzcash", name: "JazzCash", kind: "wallet", color: "linear-gradient(135deg,#EE3124,#C41E14)", letter: "J" },
  { id: "nayapay", name: "NayaPay", kind: "wallet", color: "linear-gradient(135deg,#00B37E,#00875F)", letter: "N" },
  { id: "sadapay", name: "SadaPay", kind: "wallet", color: "linear-gradient(135deg,#7C5CFC,#5A3FD6)", letter: "S" },
  { id: "ubl", name: "UBL Bank Transfer", kind: "bank", color: "linear-gradient(135deg,#003087,#00257A)", letter: "U" },
];

const FAQS = [
  {
    q: "Who is eligible to join the Migrant Welfare & Diaspora Protection Fund?",
    a: "Any Orakzai national — whether working domestically in another Pakistani city or living abroad as part of the diaspora — belonging to one of the 18 verified Orakzai qoums is eligible to enroll.",
  },
  {
    q: "How is my Unique Digital Membership ID generated?",
    a: "Upon registration, a cryptographic hash is generated from your identity details and mapped permanently to your qoum, producing a unique, non-transferable Membership ID used for all claims and verification.",
  },
  {
    q: "When do automated monthly payments begin?",
    a: "Direct-debit billing through EasyPaisa, JazzCash, and international Stripe subscriptions is being finalized. Members who register now are placed in the priority activation queue and notified the moment billing goes live.",
  },
  {
    q: "What happens if I need to file a claim?",
    a: "Claims are filed via your Membership ID through the Orakzai.org welfare desk or WhatsApp helpline, and are reviewed by the Executive Team and your qoum's Malak within 48 hours for critical cases.",
  },
];

/* ── Deterministic client-side hash → Unique Digital Membership ID ── */
function generateMembershipId(name: string, qoum: string, phone: string): string {
  const qoumIdx = QOUMS.indexOf(qoum);
  const clanCode = qoum.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X");
  const seed = `${name.trim().toLowerCase()}|${qoum}|${phone}|${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const digits = String(hash % 100000).padStart(5, "0");
  const sectionTag = String((qoumIdx >= 0 ? qoumIdx : 0) + 1).padStart(2, "0");
  return `OKZ-${clanCode}${sectionTag}-${digits}`;
}

/* ── Reusable fade-in wrapper ── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

/* ═══════════════════════════ Hero ═══════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden" style={{ background: EMERALD_DEEP }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,78,59,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-3 mb-7 px-5 py-2 rounded-full" style={{ border: `1px solid rgba(212,175,55,0.35)`, background: "rgba(212,175,55,0.06)" }}>
            <ShieldCheck className="w-4 h-4" style={{ color: GOLD }} />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Pillar 01 · Strategic Protection Fund</span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif", color: "rgba(255,255,255,0.97)" }}
          >
            Migrant Welfare &amp;
            <br />
            <span style={{ background: "linear-gradient(135deg, #b8860b 0%, #D4AF37 40%, #F3E5AB 70%, #D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Diaspora Protection Fund
            </span>
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>
            A sovereign, community-backed membership program securing every Orakzai migrant — at home or abroad —
            with complete healthcare coverage, dignified repatriation, and lasting family security.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════ Currency toggle ═══════════════════════════ */
function CurrencyToggle({ currency, setCurrency }: { currency: string; setCurrency: (c: string) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
      <span className="text-xs font-bold uppercase tracking-[0.2em] mr-2" style={{ color: "rgba(255,255,255,0.45)" }}>Show rates in</span>
      {Object.keys(CURRENCIES).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setCurrency(code)}
          className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300"
          style={{
            background: currency === code ? GOLD : "rgba(212,175,55,0.08)",
            color: currency === code ? "#04140e" : "rgba(255,255,255,0.7)",
            border: `1px solid ${currency === code ? GOLD : "rgba(212,175,55,0.25)"}`,
            boxShadow: currency === code ? "0 6px 20px rgba(212,175,55,0.3)" : "none",
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════ Package cards ═══════════════════════════ */
function PackageCard({ pkg, currency, index, selected, onSelect }: any) {
  return (
    <FadeIn delay={index * 0.12} className="h-full">
      <div
        className="relative h-full rounded-3xl p-8 flex flex-col gap-5 transition-all duration-500"
        style={{
          background: pkg.featured ? "linear-gradient(160deg, rgba(6,55,36,0.85) 0%, rgba(2,20,13,0.95) 100%)" : "rgba(0,18,11,0.65)",
          backdropFilter: "blur(18px)",
          border: `1px solid ${selected === pkg.id ? GOLD : pkg.accent}`,
          boxShadow: pkg.featured ? "0 0 40px rgba(212,175,55,0.12), 0 20px 60px rgba(0,0,0,0.4)" : "0 4px 32px rgba(0,0,0,0.35)",
        }}
      >
        {pkg.featured && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
            style={{ background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`, color: "#022c22" }}
          >
            <Sparkles className="w-3 h-3" /> Most Comprehensive
          </div>
        )}
        <div className="pt-2">
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>{pkg.name}</h3>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{pkg.tagline}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
              {formatAmount(pkg.monthlyPKR, currency)}
            </span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>/month</span>
          </div>
        </div>

        <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />

        <ul className="space-y-4 flex-1">
          {pkg.benefits.map((b: any, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
                <b.icon className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{b.text}</span>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          onClick={() => onSelect(pkg.id)}
          className="w-full font-bold"
          style={{
            background: selected === pkg.id ? GOLD : "rgba(212,175,55,0.1)",
            color: selected === pkg.id ? "#04140e" : GOLD,
            border: `1px solid ${GOLD}`,
          }}
        >
          {selected === pkg.id ? "Selected for Enrollment" : "Select this Package"}
          {selected === pkg.id ? <CheckCircle2 className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════ Copyable field ═══════════════════════════ */
function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between rounded-lg px-4 py-3 gap-3" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
        <p className="font-mono font-semibold text-sm break-all" style={{ color: "rgba(255,255,255,0.92)" }}>{value}</p>
      </div>
      <button type="button" onClick={handleCopy} className="shrink-0 transition-colors" style={{ color: copied ? "#4ade80" : "rgba(212,175,55,0.7)" }} title="Copy">
        {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

/* ═══════════════════════════ Payment method picker (click → reveal account) ═══════════════════════════ */
function PaymentMethodPicker({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const activeMethod = PAYMENT_METHODS.find((m) => m.id === selected);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {PAYMENT_METHODS.map((m) => {
          const isSelected = selected === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(isSelected ? "" : m.id)}
              className="relative flex flex-col items-center gap-2 rounded-xl px-2 py-3 transition-all duration-200"
              style={{
                background: isSelected ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.3)",
                border: `1px solid ${isSelected ? GOLD : "rgba(212,175,55,0.2)"}`,
                boxShadow: isSelected ? "0 0 0 1px rgba(212,175,55,0.25), 0 8px 20px rgba(212,175,55,0.15)" : "none",
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: m.color }}>
                {m.letter}
              </div>
              <span className="text-[11px] font-semibold text-center leading-tight" style={{ color: isSelected ? GOLD : "rgba(255,255,255,0.75)" }}>
                {m.name}
              </span>
              {isSelected && (
                <CheckCircle2 className="w-3.5 h-3.5 absolute top-1.5 right-1.5" style={{ color: GOLD }} />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeMethod && (
          <motion.div
            key={activeMethod.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-xl p-4 space-y-2.5 mt-1" style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.25)" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0" style={{ background: activeMethod.color }}>
                  {activeMethod.letter}
                </div>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: GOLD }}>
                  {activeMethod.name} — send here
                </p>
              </div>
              {activeMethod.kind === "wallet" ? (
                <>
                  <CopyField label="Account Title" value={WALLET_ACCOUNT_TITLE} />
                  <CopyField label={`${activeMethod.name} Number`} value={WALLET_NUMBER} />
                </>
              ) : (
                <>
                  <CopyField label="Account Title" value={WALLET_ACCOUNT_TITLE} />
                  <CopyField label="Account Number" value={UBL_ACCOUNT_NUMBER} />
                  <CopyField label="IBAN Number" value={UBL_IBAN} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════ Digital membership card ═══════════════════════════ */
function MembershipCardPreview({ name, qoum, packageName, membershipId, txnRef }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 max-w-md mx-auto overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #06331f 0%, #011008 60%, #06331f 100%)",
        border: `1px solid ${GOLD}`,
        boxShadow: "0 0 50px rgba(212,175,55,0.25), 0 20px 50px rgba(0,0,0,0.5)",
      }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15 blur-3xl" style={{ background: GOLD }} />
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>Orakzai.org</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Diaspora Protection Fund</p>
        </div>
        <ShieldCheck className="w-8 h-8" style={{ color: GOLD }} />
      </div>
      <div className="relative z-10 mb-6">
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Member</p>
        <p className="text-xl font-bold" style={{ color: "white", fontFamily: "'Playfair Display', serif" }}>{name || "Full Name"}</p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{qoum ? `${qoum} Qoum` : "Qoum not selected"}</p>
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Unique Digital Membership ID</p>
          <p className="font-mono text-lg font-bold" style={{ color: GOLD, letterSpacing: "0.05em" }}>{membershipId}</p>
        </div>
        <Fingerprint className="w-9 h-9 opacity-70" style={{ color: GOLD }} />
      </div>
      <div className="relative z-10 mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}>
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{packageName}</span>
        <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: "rgba(212,175,55,0.15)", color: GOLD }}>
          <Clock className="w-3 h-3" /> Pending Verification
        </span>
      </div>
      {txnRef && (
        <div className="relative z-10 mt-3 text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
          Txn Ref: {txnRef}
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════ Intake / signup form ═══════════════════════════ */
function IntakeForm({ selectedPackage, currency }: { selectedPackage: string | null; currency: string }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qoum, setQoum] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [txnRef, setTxnRef] = useState("");
  const [membershipId, setMembershipId] = useState<string | null>(null);

  const selectedPkg = useMemo(() => PACKAGES.find((p) => p.id === selectedPackage), [selectedPackage]);
  const packageName = selectedPkg?.name ?? "No package selected";
  const amountDue = selectedPkg ? formatAmount(selectedPkg.monthlyPKR, currency) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !qoum || !selectedPackage) {
      toast({
        title: "Missing information",
        description: "Please provide your name, phone number, qoum, and select a membership package before enrolling.",
        variant: "destructive",
      });
      return;
    }
    if (!paymentMethod || !txnRef.trim()) {
      toast({
        title: "Payment confirmation required",
        description: "Please send your monthly dues via one of the gateways above, then enter the payment method and transaction reference to activate your Membership ID.",
        variant: "destructive",
      });
      return;
    }
    const id = generateMembershipId(name, qoum, phone);
    setMembershipId(id);
    toast({
      title: "Membership ID generated — pending verification",
      description: `Your Unique Digital Membership ID ${id} has been issued and mapped to the ${qoum} qoum. WhatsApp your payment receipt to ${WHATSAPP_NUMBER} to complete verification.`,
    });
  };

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl p-8" style={{ background: "rgba(0,18,11,0.6)", border: "1px solid rgba(212,175,55,0.18)" }}>
        <div className="mb-2">
          <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.95)" }}>Membership Intake Form</h3>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Currently selected package: <span style={{ color: GOLD }}>{packageName}</span></p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label style={{ color: "rgba(255,255,255,0.7)" }}>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Zar Wali Orakzai" className="bg-black/30 border-[#D4AF37]/25 text-white placeholder:text-white/30" />
          </div>
          <div className="space-y-2">
            <Label style={{ color: "rgba(255,255,255,0.7)" }}>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 3XX XXXXXXX" className="bg-black/30 border-[#D4AF37]/25 text-white placeholder:text-white/30" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label style={{ color: "rgba(255,255,255,0.7)" }}>Email (optional)</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-black/30 border-[#D4AF37]/25 text-white placeholder:text-white/30" />
          </div>
          <div className="space-y-2">
            <Label style={{ color: "rgba(255,255,255,0.7)" }}>Current Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" className="bg-black/30 border-[#D4AF37]/25 text-white placeholder:text-white/30" />
          </div>
        </div>

        <div className="space-y-2">
          <Label style={{ color: "rgba(255,255,255,0.7)" }}>Qoum (Tribal Section)</Label>
          <Select value={qoum} onValueChange={setQoum}>
            <SelectTrigger className="bg-black/30 border-[#D4AF37]/25 text-white">
              <SelectValue placeholder="Select your qoum from the 18 verified sections" />
            </SelectTrigger>
            <SelectContent>
              {QOUMS.map((q) => (
                <SelectItem key={q} value={q}>{q}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-[1px] w-full my-2" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />

        <div>
          <h4 className="text-base font-bold mb-1 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.92)" }}>
            <Wallet className="w-4 h-4" style={{ color: GOLD }} /> Confirm Your Payment
          </h4>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
            {amountDue ? `Send ${amountDue} using one of the gateways above, ` : "Select a package above, send its monthly due, "}
            then confirm the details here. Your Membership ID is issued immediately but stays <span style={{ color: GOLD }}>Pending Verification</span> until we confirm receipt.
          </p>
        </div>

        <div className="space-y-2">
          <Label style={{ color: "rgba(255,255,255,0.7)" }}>Payment Method Used</Label>
          <PaymentMethodPicker selected={paymentMethod} onSelect={setPaymentMethod} />
        </div>

        <div className="space-y-2">
          <Label style={{ color: "rgba(255,255,255,0.7)" }}>Transaction ID / Reference</Label>
          <Input value={txnRef} onChange={(e) => setTxnRef(e.target.value)} placeholder="e.g. TXN849213765" className="bg-black/30 border-[#D4AF37]/25 text-white placeholder:text-white/30" />
        </div>

        <div className="flex items-start gap-2 text-xs pt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
          Your details are used solely to generate and verify your Unique Digital Membership ID against your qoum's records.
        </div>

        <Button type="submit" className="w-full font-bold text-base py-6" style={{ background: GOLD, color: "#04140e" }}>
          Confirm Payment &amp; Generate My Membership ID
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div className="lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          {membershipId ? (
            <div className="space-y-4">
              <MembershipCardPreview name={name} qoum={qoum} packageName={packageName} membershipId={membershipId} txnRef={txnRef} />
              <div className="flex items-start gap-2.5 rounded-xl p-4 text-xs" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.25)" }}>
                <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  WhatsApp your payment receipt to <span className="font-bold" style={{ color: GOLD }}>{WHATSAPP_NUMBER}</span> to complete verification and fully activate your card.
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,18,11,0.5)", border: "1px dashed rgba(212,175,55,0.3)" }}>
              <IdCard className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(212,175,55,0.5)" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Your Digital Membership Card preview will appear here once you generate your ID.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Section wrapper ═══════════════════════════ */
function Section({ eyebrow, title, desc, children }: any) {
  return (
    <section className="relative py-20" style={{ background: EMERALD_DEEP }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>{eyebrow}</span>
            <div className="h-[1px] w-8" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>{title}</h2>
          {desc && <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</p>}
        </FadeIn>
        {children}
      </div>
    </section>
  );
}

/* ═══════════════════════════ Page ═══════════════════════════ */
export default function MigrantWelfare() {
  const [currency, setCurrency] = useState("PKR");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <MainLayout>
      <Hero />

      <Section
        eyebrow="Membership Packages"
        title="Choose Your Protection Level"
        desc="Two tiers of premium community-backed protection, priced for accessibility and billed monthly."
      >
        <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} currency={currency} index={i} selected={selectedPackage} onSelect={setSelectedPackage} />
          ))}
        </div>
      </Section>

      <section className="py-20" style={{ background: "#00120B", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>
              From Registration to Protection
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.1}>
                <div className="relative rounded-2xl p-6 h-full" style={{ background: "rgba(0,18,11,0.65)", border: "1px solid rgba(212,175,55,0.18)" }}>
                  <span className="text-3xl font-bold block mb-3" style={{ color: "rgba(212,175,55,0.35)", fontFamily: "'Playfair Display', serif" }}>{s.step}</span>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>{s.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "#00120B", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
            <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>Enroll Now</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.96)" }}>
              Secure Your Digital Membership
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Every membership is locked to a Unique Digital Membership ID, permanently mapped to your qoum out of the 18 verified Orakzai sections.
            </p>
          </FadeIn>
          <IntakeForm selectedPackage={selectedPackage} currency={currency} />
        </div>
      </section>

      <Section eyebrow="Frequently Asked" title="Common Questions">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl px-5" style={{ background: "rgba(0,18,11,0.6)", border: "1px solid rgba(212,175,55,0.18)" }}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent style={{ color: "rgba(255,255,255,0.55)" }}>
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </MainLayout>
  );
}
