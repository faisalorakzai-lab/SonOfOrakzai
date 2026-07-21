import { useState, useRef, useCallback } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck, GraduationCap, CreditCard, Globe,
  ChevronRight, ChevronLeft, Upload, User, Check,
  Download, Printer, Loader2, AlertCircle, Sparkles, Star,
} from "lucide-react";

/* ─── Design tokens ─────────────────────────── */
const GOLD   = "#D4AF37";
const BG     = "#011a10";
const BG2    = "#02280f";

/* ─── Helpers ─────────────────────────────────── */
function genMemberId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `O-MBR-2026-${s}`;
}

function hashCnic(cnic: string) {
  if (!cnic) return "••••••••••••••";
  const parts = cnic.split("-");
  if (parts.length === 3) return `${parts[0]}-•••••••-${parts[2]}`;
  return cnic.slice(0, 5) + "-•••••••-" + cnic.slice(-1);
}

/* ─── Privilege cards ──────────────────────────── */
const privileges = [
  {
    icon: ShieldCheck,
    title: "Sovereign Protection & Legal Advocacy",
    desc: "Priority support for overseas diaspora and vulnerable community members facing legal, migration, or humanitarian crises.",
    color: "#22c55e",
  },
  {
    icon: GraduationCap,
    title: "Grant & Scholarship Eligibility",
    desc: "Direct access to Riba-free economic innovation grants and higher education funds for members and their families.",
    color: GOLD,
  },
  {
    icon: CreditCard,
    title: "Digital Citizen Identity",
    desc: "Official verified Orakzai.org digital membership card and a unique biometric-linked hash ID for global recognition.",
    color: "#a78bfa",
  },
  {
    icon: Globe,
    title: "Global Representation",
    desc: "Voting rights and full participation in regional diaspora chapter initiatives and constitutional assemblies.",
    color: "#38bdf8",
  },
];

/* ─── Services (step 3) ────────────────────────── */
const services = [
  "Rights & Representation",
  "Education & Scholarships",
  "Migrant Welfare",
  "Economic Innovation & Grants",
  "Global Diaspora Network",
  "Healthcare Infrastructure",
  "Women Empowerment & Artisans",
  "Youth & Sports Development",
  "Clean Water & Sanitation",
  "Crisis Relief & Social Welfare",
];

const skillOptions = [
  "Technology", "Legal", "Healthcare", "Education",
  "Finance", "Governance", "Engineering", "Media",
  "Agriculture", "Social Work",
];

const countryCodes = [
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "SA" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+1",   flag: "🇺🇸", name: "US" },
  { code: "+49",  flag: "🇩🇪", name: "DE" },
  { code: "+61",  flag: "🇦🇺", name: "AU" },
  { code: "+974", flag: "🇶🇦", name: "QA" },
  { code: "+965", flag: "🇰🇼", name: "KW" },
  { code: "+968", flag: "🇴🇲", name: "OM" },
];

/* ─── Shared input styles ───────────────────────── */
const inputBase =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200";
const inputStyle = {
  background: "rgba(0,40,20,0.75)",
  border: "1px solid rgba(212,175,55,0.18)",
};
const focusStyle = {
  border: `1px solid ${GOLD}`,
  boxShadow: "0 0 0 2px rgba(212,175,55,0.12)",
};

/* ─── Step progress indicator ────────────────────── */
function Stepper({ step }: { step: number }) {
  const steps = ["Personal", "Contacts", "Background", "Statement"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8 select-none">
      {steps.map((label, i) => {
        const idx    = i + 1;
        const done   = idx < step;
        const active = idx === step;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400"
                style={{
                  background: done
                    ? `linear-gradient(135deg, #b8860b, ${GOLD})`
                    : active
                      ? `rgba(212,175,55,0.15)`
                      : "rgba(255,255,255,0.05)",
                  border: active
                    ? `2px solid ${GOLD}`
                    : done
                      ? "2px solid transparent"
                      : "2px solid rgba(255,255,255,0.1)",
                  color: done ? "#011a10" : active ? GOLD : "rgba(255,255,255,0.3)",
                  boxShadow: active ? `0 0 12px rgba(212,175,55,0.3)` : "none",
                }}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : idx}
              </div>
              <span
                className="text-[9px] font-bold uppercase tracking-wider hidden sm:block"
                style={{ color: active ? GOLD : done ? `${GOLD}80` : "rgba(255,255,255,0.2)" }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-12 sm:w-16 h-[1px] mx-1 mb-4 sm:mb-5 transition-all duration-500"
                style={{ background: done ? `linear-gradient(90deg, ${GOLD}, ${GOLD}80)` : "rgba(255,255,255,0.07)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Field wrapper ─────────────────────────────── */
function Field({
  label, required = false, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">
        {label} {required && <span style={{ color: GOLD }}>*</span>}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </span>
      )}
    </div>
  );
}

/* ─── Membership card (visual + download) ───────── */
function MemberCard({ data }: { data: MemberData }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const [dl, setDl] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDl(true);
    try {
      /* Canvas-based export – no external library needed */
      const W = 800, H = 480;
      const canvas = document.createElement("canvas");
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      /* Background gradient */
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0,   "#061c14");
      grad.addColorStop(0.4, "#083520");
      grad.addColorStop(1,   "#041710");
      ctx.fillStyle = grad;
      ctx.roundRect(0, 0, W, H, 24);
      ctx.fill();

      /* Gold border */
      ctx.strokeStyle = "rgba(212,175,55,0.55)";
      ctx.lineWidth   = 2;
      ctx.roundRect(1, 1, W - 2, H - 2, 23);
      ctx.stroke();

      /* Top gold rule */
      const topLine = ctx.createLinearGradient(0, 0, W, 0);
      topLine.addColorStop(0,   "transparent");
      topLine.addColorStop(0.5, GOLD);
      topLine.addColorStop(1,   "transparent");
      ctx.fillStyle = topLine;
      ctx.fillRect(0, 0, W, 2);

      /* Header bar */
      const hbar = ctx.createLinearGradient(0, 0, W, 56);
      hbar.addColorStop(0, "rgba(212,175,55,0.12)");
      hbar.addColorStop(1, "rgba(212,175,55,0.03)");
      ctx.fillStyle = hbar;
      ctx.fillRect(0, 0, W, 56);
      ctx.strokeStyle = "rgba(212,175,55,0.18)";
      ctx.lineWidth   = 1;
      ctx.beginPath(); ctx.moveTo(0, 56); ctx.lineTo(W, 56); ctx.stroke();

      /* Header text */
      ctx.font      = "bold 11px monospace";
      ctx.fillStyle = GOLD;
      ctx.textAlign = "center";
      ctx.fillText("ORAKZAI.ORG  —  GLOBAL DIGITAL CITIZENSHIP CARD", W / 2, 34);

      /* Profile circle */
      const cx = 110, cy = 260, r = 70;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      if (data.photo) {
        const img = new Image();
        img.src = data.photo;
        await new Promise((res) => { img.onload = res; img.onerror = res; });
        ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
      } else {
        ctx.fillStyle = "rgba(212,175,55,0.1)";
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
        ctx.fillStyle = "rgba(212,175,55,0.4)";
        ctx.font = "52px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(data.name?.[0]?.toUpperCase() ?? "?", cx, cy);
      }
      ctx.restore();

      /* Gold ring around photo */
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.stroke();

      /* Data fields */
      const fx = 220, fy0 = 90;
      const rows: [string, string][] = [
        ["MEMBER NAME",       data.name],
        ["CNIC (HASH)",       hashCnic(data.cnic)],
        ["LOCATION",          `${data.city}, ${data.country}`],
        ["AREA OF INTEREST",  data.interest],
        ["MEMBERSHIP ID",     data.memberId],
        ["ISSUE DATE",        data.issueDate],
      ];
      rows.forEach(([key, val], i) => {
        const y = fy0 + i * 58;
        ctx.font      = "bold 9px monospace";
        ctx.fillStyle = `${GOLD}99`;
        ctx.textAlign = "left";
        ctx.fillText(key, fx, y);
        ctx.font      = i === 4 ? "bold 18px monospace" : "600 14px sans-serif";
        ctx.fillStyle = i === 4 ? GOLD : "#ffffff";
        ctx.fillText(val || "—", fx, y + 20);
        ctx.strokeStyle = "rgba(212,175,55,0.1)";
        ctx.lineWidth   = 1;
        ctx.beginPath(); ctx.moveTo(fx, y + 30); ctx.lineTo(W - 48, y + 30); ctx.stroke();
      });

      /* Status badge */
      ctx.fillStyle = "rgba(34,197,94,0.18)";
      ctx.strokeStyle = "rgba(34,197,94,0.4)";
      ctx.lineWidth = 1;
      const bx = fx, by = fy0 + rows.length * 58 + 8;
      ctx.roundRect(bx, by, 160, 24, 12);
      ctx.fill(); ctx.stroke();
      ctx.font      = "bold 10px sans-serif";
      ctx.fillStyle = "#4ade80";
      ctx.textAlign = "center";
      ctx.fillText("● ACTIVE / VERIFIED MEMBER", bx + 80, by + 15.5);

      /* Render QR to an image via an off-screen SVG */
      const qrSvg = document.querySelector<SVGSVGElement>("#card-qr svg");
      if (qrSvg) {
        const xml   = new XMLSerializer().serializeToString(qrSvg);
        const blob  = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
        const url   = URL.createObjectURL(blob);
        const qrImg = new Image();
        await new Promise<void>((res) => {
          qrImg.onload = () => res();
          qrImg.onerror = () => res();
          qrImg.src = url;
        });
        ctx.drawImage(qrImg, W - 140, H - 145, 110, 110);
        URL.revokeObjectURL(url);
      }

      /* QR label */
      ctx.font      = "bold 8px monospace";
      ctx.fillStyle = `${GOLD}77`;
      ctx.textAlign = "center";
      ctx.fillText("SCAN TO VERIFY", W - 84, H - 22);

      /* Download */
      const link    = document.createElement("a");
      link.download = `${data.memberId}-orakzai-card.png`;
      link.href     = canvas.toDataURL("image/png", 1.0);
      link.click();
    } finally {
      setDl(false);
    }
  }, [data]);

  const handlePrint = () => {
    const win = window.open("", "_blank", "width=900,height=600");
    if (!win) return;
    const cardHtml = cardRef.current?.outerHTML ?? "";
    win.document.write(`
      <html><head><title>Orakzai Member Card</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        body { margin: 0; background: #011a10; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      </style></head>
      <body>${cardHtml}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card visual */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[640px] rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #061c14 0%, #0a2e1e 30%, #083520 55%, #041710 100%)",
          border: "1px solid rgba(212,175,55,0.45)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.3)",
        }}
      >
        {/* Diagonal texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.012) 4px, rgba(255,255,255,0.012) 8px)",
            zIndex: 0,
          }}
        />
        {/* Top gold rule */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

        {/* Header */}
        <div
          className="relative z-10 flex items-center justify-between px-6 py-3"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.07)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.15)", border: `1px solid ${GOLD}55` }}>
              <Globe className="w-3.5 h-3.5" style={{ color: GOLD }} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/60">Orakzai.org</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.22em]" style={{ color: GOLD }}>
            Global Digital Citizenship Card
          </span>
          <div
            className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest"
            style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            ● Active
          </div>
        </div>

        {/* Card body */}
        <div className="relative z-10 p-5 sm:p-7 flex gap-5 sm:gap-7">
          {/* Profile */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center"
                style={{ border: `3px solid ${GOLD}`, boxShadow: `0 0 20px rgba(212,175,55,0.3)` }}
              >
                {data.photo ? (
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <User className="w-8 h-8" style={{ color: `${GOLD}88` }} />
                  </div>
                )}
              </div>
              {/* Pulse ring */}
              <div
                className="absolute inset-[-4px] rounded-full pointer-events-none"
                style={{ border: `1px solid ${GOLD}44`, animation: "pulse 2.5s infinite" }}
              />
            </div>
            <div className="text-center">
              <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Membership ID</div>
              <div className="text-[11px] font-black tracking-widest font-mono" style={{ color: GOLD }}>
                {data.memberId}
              </div>
            </div>
          </div>

          {/* Data */}
          <div className="flex-1 min-w-0 grid grid-cols-1 gap-2.5">
            {[
              { label: "Member Name",       val: data.name,                bold: true },
              { label: "CNIC Hash",         val: hashCnic(data.cnic),      mono: true },
              { label: "Location",          val: `${data.city}, ${data.country}` },
              { label: "Area of Interest",  val: data.interest },
              { label: "Issue Date",        val: data.issueDate },
            ].map(({ label, val, bold, mono }) => (
              <div key={label} className="pb-2" style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">{label}</div>
                <div
                  className={`text-xs sm:text-sm leading-tight ${bold ? "font-bold" : "font-medium"} ${mono ? "font-mono" : ""} text-white truncate`}
                  style={bold ? { fontFamily: "'Playfair Display', serif", color: "white" } : {}}
                >
                  {val || "—"}
                </div>
              </div>
            ))}

            {/* Verified badge */}
            <div
              className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
              style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              <ShieldCheck className="w-2.5 h-2.5" /> Active / Verified Member
            </div>
          </div>

          {/* QR */}
          <div className="flex-shrink-0 hidden sm:flex flex-col items-center gap-1.5" id="card-qr">
            <div
              className="p-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            >
              <QRCodeSVG
                value={`https://orakzai.org/verify/${data.memberId}`}
                size={80}
                bgColor="#ffffff"
                fgColor="#011a10"
              />
            </div>
            <span className="text-[7px] font-black uppercase tracking-widest text-white/25">Scan to Verify</span>
          </div>
        </div>

        {/* Mobile QR bar */}
        <div
          className="sm:hidden relative z-10 flex items-center justify-center gap-3 px-5 py-3"
          style={{ borderTop: "1px solid rgba(212,175,55,0.1)", background: "rgba(0,0,0,0.2)" }}
          id="card-qr"
        >
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.93)" }}>
            <QRCodeSVG value={`https://orakzai.org/verify/${data.memberId}`} size={52} bgColor="#ffffff" fgColor="#011a10" />
          </div>
          <div>
            <div className="text-[8px] font-black uppercase tracking-widest text-white/30">Scan to Verify</div>
            <div className="text-[10px] font-black font-mono" style={{ color: GOLD }}>{data.memberId}</div>
          </div>
        </div>

        {/* Card footer */}
        <div
          className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-2.5"
          style={{ borderTop: "1px solid rgba(212,175,55,0.1)", background: "rgba(0,0,0,0.15)" }}
        >
          <span className="text-[7px] font-black uppercase tracking-widest text-white/20">
            Digital Identity — Orakzai Global Citizenship Initiative
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-0.5 rounded-full" style={{ height: i % 3 === 0 ? 14 : i % 2 === 0 ? 10 : 6, background: `${GOLD}${i % 3 === 0 ? "66" : "33"}` }} />
            ))}
          </div>
        </div>

        {/* Bottom gold rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)` }} />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDownload}
          disabled={dl}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:brightness-110 active:scale-95"
          style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", boxShadow: "0 4px 20px rgba(212,175,55,0.3)" }}
        >
          {dl ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Download Card (PNG)
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-white/10"
          style={{ border: `1px solid rgba(212,175,55,0.3)`, color: GOLD }}
        >
          <Printer className="w-4 h-4" />
          Print Identity Badge
        </button>
      </div>
    </div>
  );
}

/* ─── Types ──────────────────────────────────────── */
interface MemberData {
  name: string; fatherName: string; cnic: string; photo: string;
  countryCode: string; phone: string; email: string; city: string; country: string;
  profession: string; skills: string[]; interest: string;
  statement: string; memberId: string; issueDate: string;
}

/* ─── Validation helpers ────────────────────────── */
function required(val: string, label: string) {
  if (!val?.trim()) return `${label} is required`;
  return "";
}
function validEmail(val: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email";
  return "";
}
function validCnic(val: string) {
  if (!/^\d{5}-\d{7}-\d{1}$/.test(val)) return "Format: 12345-1234567-1";
  return "";
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function Join() {
  const formRef  = useRef<HTMLDivElement>(null);
  const [step,   setStep]   = useState(1);
  const [done,   setDone]   = useState(false);
  const [loading, setLoad]  = useState(false);
  const [member, setMember] = useState<MemberData | null>(null);
  const [focused, setFocus] = useState<string | null>(null);

  /* ── Form state ── */
  const [f, setF] = useState<{
    name: string; fatherName: string; cnic: string; photo: string;
    countryCode: string; phone: string; email: string; city: string; country: string;
    profession: string; skills: string[]; interest: string; statement: string;
  }>({
    name: "", fatherName: "", cnic: "", photo: "",
    countryCode: "+92", phone: "", email: "", city: "", country: "",
    profession: "", skills: [], interest: "", statement: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ── Photo upload ── */
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setF((p) => ({ ...p, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  /* ── CNIC auto-format ── */
  const formatCnic = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 13);
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
  };

  /* ── Skill toggle ── */
  const toggleSkill = (s: string) =>
    setF((p) => ({
      ...p,
      skills: p.skills.includes(s) ? p.skills.filter((x) => x !== s) : [...p.skills, s],
    }));

  /* ── Field focus ring ── */
  const fs = (name: string) => ({
    ...inputStyle,
    ...(focused === name ? focusStyle : {}),
  });

  /* ── Validation per step ── */
  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      const n = required(f.name, "Full Name"); if (n) e.name = n;
      const fn = required(f.fatherName, "Father's Name"); if (fn) e.fatherName = fn;
      const c = validCnic(f.cnic); if (c) e.cnic = c;
    }
    if (s === 2) {
      const ph = required(f.phone, "Phone"); if (ph) e.phone = ph;
      const em = validEmail(f.email); if (em) e.email = em;
      const ci = required(f.city, "City"); if (ci) e.city = ci;
      const co = required(f.country, "Country"); if (co) e.country = co;
    }
    if (s === 3) {
      const pr = required(f.profession, "Profession"); if (pr) e.profession = pr;
      if (f.skills.length === 0) e.skills = "Select at least one skill";
      const i = required(f.interest, "Area of Interest"); if (i) e.interest = i;
    }
    if (s === 4) {
      const st = required(f.statement, "Statement"); if (st) e.statement = st;
      if (f.statement.trim().length < 20) e.statement = "Please write at least 20 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((s) => s + 1); };
  const prev = () => { setStep((s) => s - 1); setErrors({}); };

  /* ── Submit ── */
  const submit = async () => {
    if (!validate(4)) return;
    setLoad(true);
    await new Promise((r) => setTimeout(r, 1500));
    const now = new Date();
    setMember({
      ...f,
      memberId: genMemberId(),
      issueDate: now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
    });
    setDone(true);
    setLoad(false);
  };

  /* ── Scroll to form ── */
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ─────────────── RENDER ─────────────── */
  return (
    <MainLayout>

      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BG} 0%, ${BG2} 55%, ${BG} 100%)` }}
      >
        {/* Top rule */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}99, transparent)` }} />
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.022]" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black tracking-[0.26em] mb-8"
              style={{ background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.22)`, color: GOLD }}
            >
              <Star className="w-3 h-3" />
              G L O B A L &nbsp; D I G I T A L &nbsp; C I T I Z E N S H I P
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Unite with a{" "}
              <span style={{ color: GOLD }}>Global Network</span>
              <br className="hidden sm:block" /> of Purpose &amp; Honor
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-12">
              Joining Orakzai.org connects you to a borderless ecosystem of legal protection, educational grants, economic empowerment, and humanitarian solidarity.
            </p>

            {/* Privilege cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {privileges.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="rounded-2xl p-5 text-left group transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.13)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${p.color}18`, border: `1px solid ${p.color}35` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: p.color, width: 18, height: 18 }} />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              onClick={scrollToForm}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:brightness-110 active:scale-95"
              style={{
                background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
                color: "#011a10",
                boxShadow: `0 8px 32px rgba(212,175,55,0.35), 0 0 0 1px ${GOLD}33`,
              }}
            >
              <Sparkles className="w-4 h-4" />
              Start Membership Application
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mt-10">
              <div className="h-[1px] w-16" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}44)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              <div className="h-[1px] w-16" style={{ background: `linear-gradient(90deg, ${GOLD}44, transparent)` }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ WIZARD / CARD ══════════════ */}
      <section ref={formRef} className="py-16 relative" style={{ background: `linear-gradient(180deg, ${BG} 0%, #012015 100%)` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 max-w-2xl relative z-10">

          <AnimatePresence mode="wait">

            {/* ─── WIZARD ─── */}
            {!done && (
              <motion.div key="wizard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                {/* Section label */}
                <div className="text-center mb-8">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                    style={{ background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.2)`, color: GOLD }}
                  >
                    <CreditCard className="w-3 h-3" /> Membership Registration
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {step === 1 && "Personal Details"}
                    {step === 2 && "Contact Information"}
                    {step === 3 && "Professional Background"}
                    {step === 4 && "Final Statement"}
                  </h2>
                </div>

                <Stepper step={step} />

                {/* Card shell */}
                <div
                  className="rounded-2xl p-6 sm:p-8"
                  style={{
                    background: "rgba(1,26,16,0.88)",
                    border: "1px solid rgba(212,175,55,0.16)",
                    boxShadow: "0 8px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <AnimatePresence mode="wait">

                    {/* ───── STEP 1 ───── */}
                    {step === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">

                        <div className="grid sm:grid-cols-2 gap-5">
                          <Field label="Full Name" required error={errors.name}>
                            <input
                              value={f.name}
                              onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
                              placeholder="Ahmad Khan Orakzai"
                              className={inputBase}
                              style={fs("name")}
                              onFocus={() => setFocus("name")}
                              onBlur={() => setFocus(null)}
                            />
                          </Field>
                          <Field label="Father's Name" required error={errors.fatherName}>
                            <input
                              value={f.fatherName}
                              onChange={(e) => setF((p) => ({ ...p, fatherName: e.target.value }))}
                              placeholder="Khan Muhammad Orakzai"
                              className={inputBase}
                              style={fs("fatherName")}
                              onFocus={() => setFocus("fatherName")}
                              onBlur={() => setFocus(null)}
                            />
                          </Field>
                        </div>

                        <Field label="CNIC / National ID" required error={errors.cnic}>
                          <input
                            value={f.cnic}
                            onChange={(e) => setF((p) => ({ ...p, cnic: formatCnic(e.target.value) }))}
                            placeholder="12345-1234567-1"
                            className={`${inputBase} font-mono tracking-widest`}
                            style={fs("cnic")}
                            onFocus={() => setFocus("cnic")}
                            onBlur={() => setFocus(null)}
                            maxLength={15}
                          />
                        </Field>

                        {/* Photo upload */}
                        <Field label="Profile Photo">
                          <label
                            className="flex items-center gap-4 rounded-xl px-4 py-4 cursor-pointer transition-all hover:border-[rgba(212,175,55,0.35)]"
                            style={{ ...inputStyle, borderStyle: "dashed" }}
                          >
                            {f.photo ? (
                              <img src={f.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover flex-shrink-0" style={{ border: `2px solid ${GOLD}` }} />
                            ) : (
                              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.07)", border: `1px dashed ${GOLD}55` }}>
                                <Upload className="w-5 h-5" style={{ color: `${GOLD}99` }} />
                              </div>
                            )}
                            <div>
                              <p className="text-white/60 text-sm font-medium">{f.photo ? "Photo uploaded ✓" : "Click to upload profile photo"}</p>
                              <p className="text-white/25 text-xs mt-0.5">JPG, PNG — max 5 MB</p>
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                          </label>
                        </Field>

                      </motion.div>
                    )}

                    {/* ───── STEP 2 ───── */}
                    {step === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">

                        <Field label="Phone / WhatsApp" required error={errors.phone}>
                          <div className="flex gap-2">
                            <select
                              value={f.countryCode}
                              onChange={(e) => setF((p) => ({ ...p, countryCode: e.target.value }))}
                              className="rounded-xl px-2 py-3 text-sm text-white outline-none flex-shrink-0"
                              style={{ ...inputStyle, minWidth: 88 }}
                            >
                              {countryCodes.map((c) => (
                                <option key={c.code} value={c.code} style={{ background: "#011a10" }}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <input
                              value={f.phone}
                              onChange={(e) => setF((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "") }))}
                              placeholder="3360854603"
                              className={`${inputBase} flex-1`}
                              style={fs("phone")}
                              onFocus={() => setFocus("phone")}
                              onBlur={() => setFocus(null)}
                            />
                          </div>
                        </Field>

                        <Field label="Email Address" required error={errors.email}>
                          <input
                            type="email"
                            value={f.email}
                            onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))}
                            placeholder="you@example.com"
                            className={inputBase}
                            style={fs("email")}
                            onFocus={() => setFocus("email")}
                            onBlur={() => setFocus(null)}
                          />
                        </Field>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <Field label="Current City" required error={errors.city}>
                            <input
                              value={f.city}
                              onChange={(e) => setF((p) => ({ ...p, city: e.target.value }))}
                              placeholder="Dubai"
                              className={inputBase}
                              style={fs("city")}
                              onFocus={() => setFocus("city")}
                              onBlur={() => setFocus(null)}
                            />
                          </Field>
                          <Field label="Country" required error={errors.country}>
                            <input
                              value={f.country}
                              onChange={(e) => setF((p) => ({ ...p, country: e.target.value }))}
                              placeholder="United Arab Emirates"
                              className={inputBase}
                              style={fs("country")}
                              onFocus={() => setFocus("country")}
                              onBlur={() => setFocus(null)}
                            />
                          </Field>
                        </div>

                      </motion.div>
                    )}

                    {/* ───── STEP 3 ───── */}
                    {step === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">

                        <Field label="Profession / Occupation" required error={errors.profession}>
                          <input
                            value={f.profession}
                            onChange={(e) => setF((p) => ({ ...p, profession: e.target.value }))}
                            placeholder="e.g. Software Engineer, Lawyer, Doctor…"
                            className={inputBase}
                            style={fs("profession")}
                            onFocus={() => setFocus("profession")}
                            onBlur={() => setFocus(null)}
                          />
                        </Field>

                        <Field label="Key Skills & Expertise" required error={errors.skills}>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {skillOptions.map((s) => {
                              const on = f.skills.includes(s);
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => toggleSkill(s)}
                                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                                  style={{
                                    background: on ? `linear-gradient(135deg, #b8860b, ${GOLD})` : "rgba(212,175,55,0.06)",
                                    border: on ? "1px solid transparent" : "1px solid rgba(212,175,55,0.2)",
                                    color: on ? "#011a10" : "rgba(255,255,255,0.5)",
                                    transform: on ? "scale(1.04)" : "scale(1)",
                                  }}
                                >
                                  {on && <Check className="inline w-2.5 h-2.5 mr-1" />}
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </Field>

                        <Field label="Area of Interest for Contribution" required error={errors.interest}>
                          <div className="relative">
                            <select
                              value={f.interest}
                              onChange={(e) => setF((p) => ({ ...p, interest: e.target.value }))}
                              className={`${inputBase} pr-8 appearance-none cursor-pointer`}
                              style={{ ...fs("interest"), color: f.interest ? "white" : "rgba(255,255,255,0.25)" }}
                              onFocus={() => setFocus("interest")}
                              onBlur={() => setFocus(null)}
                            >
                              <option value="" disabled style={{ background: "#011a10" }}>Select a core service area…</option>
                              {services.map((s) => (
                                <option key={s} value={s} style={{ background: "#011a10", color: "white" }}>{s}</option>
                              ))}
                            </select>
                            <ChevronRight className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" style={{ color: GOLD }} />
                          </div>
                        </Field>

                      </motion.div>
                    )}

                    {/* ───── STEP 4 ───── */}
                    {step === 4 && (
                      <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">

                        <Field label="Why do you want to join Orakzai.org?" required error={errors.statement}>
                          <textarea
                            value={f.statement}
                            onChange={(e) => setF((p) => ({ ...p, statement: e.target.value }))}
                            placeholder="Share your motivation, your story, and what you hope to contribute to the global Orakzai community…"
                            rows={6}
                            className={`${inputBase} resize-y min-h-[140px] leading-relaxed`}
                            style={fs("statement")}
                            onFocus={() => setFocus("statement")}
                            onBlur={() => setFocus(null)}
                          />
                        </Field>

                        {/* Summary */}
                        <div
                          className="rounded-xl p-4 space-y-2"
                          style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)" }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: `${GOLD}88` }}>Application Summary</p>
                          {[
                            ["Name",       f.name],
                            ["CNIC",       hashCnic(f.cnic)],
                            ["Location",   `${f.city}, ${f.country}`],
                            ["Profession", f.profession],
                            ["Interest",   f.interest],
                            ["Skills",     f.skills.join(", ") || "—"],
                          ].map(([k, v]) => (
                            <div key={k} className="flex gap-2 text-xs">
                              <span className="text-white/30 w-24 flex-shrink-0">{k}:</span>
                              <span className="text-white/65 truncate">{v || "—"}</span>
                            </div>
                          ))}
                        </div>

                        <div
                          className="flex items-start gap-2 rounded-xl px-4 py-3 text-xs text-white/35"
                          style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.09)" }}
                        >
                          <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                          By submitting, you agree to uphold the values and constitution of Orakzai.org and dedicate yourself to the betterment of the global community.
                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prev}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/5"
                        style={{ border: "1px solid rgba(212,175,55,0.2)", color: "rgba(255,255,255,0.5)" }}
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    ) : <div />}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={next}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95"
                        style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", boxShadow: "0 4px 16px rgba(212,175,55,0.22)" }}
                      >
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={submit}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
                        style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", boxShadow: "0 4px 20px rgba(212,175,55,0.28)" }}
                      >
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Generating Card…</>
                        ) : (
                          <><CreditCard className="w-4 h-4" /> Generate My Digital Membership Card</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── CARD ─── */}
            {done && member && (
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="text-center mb-8">
                  {/* Celebration pulse */}
                  <motion.div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
                    style={{ background: "rgba(212,175,55,0.12)", border: `1px solid rgba(212,175,55,0.3)` }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(212,175,55,0.3)", "0 0 0 20px rgba(212,175,55,0)", "0 0 0 0 rgba(212,175,55,0)"] }}
                    transition={{ duration: 1.8, repeat: 3 }}
                  >
                    <CreditCard className="w-7 h-7" style={{ color: GOLD }} />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Welcome to the Brotherhood
                  </h2>
                  <p className="text-white/40 text-sm">
                    Your digital membership card has been generated. Download or print it below.
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[11px] font-black" style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}>
                    <Check className="w-3 h-3" /> Application Registered — {member.memberId}
                  </div>
                </div>

                <MemberCard data={member} />

                {/* New application */}
                <div className="text-center mt-8">
                  <button
                    onClick={() => { setDone(false); setStep(1); setMember(null); setF({ name: "", fatherName: "", cnic: "", photo: "", countryCode: "+92", phone: "", email: "", city: "", country: "", profession: "", skills: [], interest: "", statement: "" }); }}
                    className="text-xs font-semibold transition-colors hover:opacity-80"
                    style={{ color: `${GOLD}88` }}
                  >
                    ← Register another member
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

    </MainLayout>
  );
}
