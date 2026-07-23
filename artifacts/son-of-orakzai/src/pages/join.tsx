import { useState, useRef, useCallback } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
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

/* ─── Corner screw detail ─── */
function Screw({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls =
    pos === "tl" ? "top-[10px] left-[10px]"
    : pos === "tr" ? "top-[10px] right-[10px]"
    : pos === "bl" ? "bottom-[10px] left-[10px]"
    : "bottom-[10px] right-[10px]";
  return (
    <div
      className={`absolute ${cls} w-[11px] h-[11px] rounded-full z-30 flex items-center justify-center`}
      style={{
        background: "radial-gradient(circle at 35% 35%, #e8c84a, #8a6a10, #3d2e04)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 0.5px 0 rgba(255,255,255,0.2)",
        border: "1px solid rgba(212,175,55,0.5)",
      }}
    >
      {/* cross groove */}
      <div className="absolute w-[5px] h-[0.5px] rounded-full" style={{ background: "rgba(0,0,0,0.55)" }} />
      <div className="absolute w-[0.5px] h-[5px] rounded-full" style={{ background: "rgba(0,0,0,0.55)" }} />
    </div>
  );
}

/* ─── Gold foil label ─── */
function GoldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[8px] font-black uppercase tracking-[0.22em] block"
      style={{
        background: "linear-gradient(135deg, #c9a227 0%, #f0d060 40%, #b8860b 65%, #e8c84a 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "0.2em",
      }}
    >
      {children}
    </span>
  );
}


/* ─── Membership card (visual + download) ───────── */
function MemberCard({ data }: { data: MemberData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dl, setDl] = useState(false);
  const qrValue = `https://sonoforakzai.vercel.app/verify/${data.memberId}`;

  /* ────────────────────────────────────────────────
     Shared capture helper — renders card at full
     960 px width off-screen, fixes webkit gradient
     text (unsupported by html2canvas), then returns
     a high-res canvas.
  ──────────────────────────────────────────────── */
  const captureCard = useCallback(async (): Promise<HTMLCanvasElement> => {
    const original = cardRef.current!;

    // 1. Clone into a fixed-width off-screen shell so mobile viewport
    //    doesn't crop the right side of the card.
    const shell = document.createElement("div");
    shell.style.cssText =
      "position:fixed;top:-20000px;left:-20000px;width:960px;z-index:-1;pointer-events:none;";
    const clone = original.cloneNode(true) as HTMLElement;
    clone.style.width = "960px";
    clone.style.maxWidth = "960px";
    // Force all clamp()-driven font sizes to their desktop maximum by
    // temporarily widening the clone's context to 960 px.
    shell.appendChild(clone);
    document.body.appendChild(shell);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 15000,
        width: 960,
        onclone: (_doc, el) => {
          // html2canvas cannot render -webkit-background-clip:text.
          // Replace every gradient-text element with solid gold so nothing
          // renders as a yellow rectangle.
          el.querySelectorAll<HTMLElement>("*").forEach((node) => {
            const s = node.style;
            if (
              s.webkitTextFillColor === "transparent" ||
              s.getPropertyValue("-webkit-text-fill-color") === "transparent"
            ) {
              s.removeProperty("-webkit-text-fill-color");
              s.removeProperty("-webkit-background-clip");
              s.removeProperty("background-clip");
              s.background = "none";
              s.color = "#D4AF37";
            }
          });
          // Freeze ticker so it doesn't appear mid-scroll.
          const ticker = el.querySelector<HTMLElement>(".ticker-scroll");
          if (ticker) ticker.style.animation = "none";
        },
      });
      return canvas;
    } finally {
      document.body.removeChild(shell);
    }
  }, []);

  /* PNG download */
  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDl(true);
    try {
      const canvas = await captureCard();
      const link = document.createElement("a");
      link.download = `${data.memberId}-orakzai-card.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } finally {
      setDl(false);
    }
  }, [captureCard, data.memberId]);

  /* Print */
  const handlePrint = useCallback(async () => {
    if (!cardRef.current) return;
    setDl(true);
    try {
      const canvas = await captureCard();
      const img = canvas.toDataURL("image/png", 1.0);
      const win = window.open("", "_blank");
      if (!win) return;
      win.document.write(`<!DOCTYPE html><html><head>
        <title>Orakzai Member Card</title>
        <style>
          *{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
          body{background:#051c0f;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:12px;}
          img{max-width:100%;height:auto;display:block;}
          @media print{body{padding:0;}@page{margin:0.3cm;size:landscape;}}
        </style>
      </head><body>
        <img src="${img}"/>
        <script>window.onload=function(){setTimeout(function(){window.print();},700);}<\/script>
      </body></html>`);
      win.document.close();
      win.focus();
    } finally {
      setDl(false);
    }
  }, [captureCard]);

  /* ─── Visual HTML Card ──────────────────────────── */
  return (
    <div className="flex flex-col items-center gap-6 w-full">

      {/* Mobile scroll wrapper — card stays full quality, scrollable on small screens */}
      <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"] }}>
        <div style={{ minWidth: 360, display: "flex", justifyContent: "center", padding: "0 4px" }}>

      {/* ══ GOLD OUTER FRAME ══ */}
      <div
        ref={cardRef}
        className="relative w-full select-none"
        style={{
          maxWidth: 960,
          padding: 3,
          background: "linear-gradient(135deg,#f5e070 0%,#8a6a10 20%,#D4AF37 50%,#5a4208 78%,#e8c84a 100%)",
          borderRadius: 18,
          boxShadow: "0 48px 120px rgba(0,0,0,0.80),0 16px 48px rgba(0,0,0,0.65),inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
      >
        {/* ══ INNER DARK CARD ══ */}
        <div
          className="relative rounded-[15px] overflow-hidden"
          style={{ background: "linear-gradient(155deg,#061a0e 0%,#0b2e18 22%,#082214 42%,#092919 58%,#051608 78%,#030d06 100%)" }}
        >

          {/* Micro-texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:"repeating-linear-gradient(135deg,transparent 0,transparent 4px,rgba(255,255,255,0.005) 4px,rgba(255,255,255,0.005) 5px)",
            zIndex:0
          }}/>

          {/* Inner gold inset border */}
          <div className="absolute inset-[6px] rounded-[10px] pointer-events-none" style={{ border:"1px solid rgba(212,175,55,0.20)", zIndex:3 }}/>

          {/* Corner screws */}
          <Screw pos="tl"/><Screw pos="tr"/><Screw pos="bl"/><Screw pos="br"/>

          {/* Corner ornaments (SVG flourishes) */}
          {/* Top-left */}
          <svg className="absolute top-3 left-3 pointer-events-none" style={{ zIndex:4, opacity:0.55 }} width="48" height="48" viewBox="0 0 48 48">
            <path d="M4 44 Q4 4 44 4" stroke="#D4AF37" strokeWidth="1" fill="none"/>
            <path d="M4 36 Q4 4 36 4" stroke="#D4AF37" strokeWidth="0.6" fill="none"/>
            <circle cx="4" cy="4" r="2.5" fill="#D4AF37"/>
            <path d="M4 12 L4 4 L12 4" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
          </svg>
          {/* Top-right */}
          <svg className="absolute top-3 right-3 pointer-events-none" style={{ zIndex:4, opacity:0.55, transform:"scaleX(-1)" }} width="48" height="48" viewBox="0 0 48 48">
            <path d="M4 44 Q4 4 44 4" stroke="#D4AF37" strokeWidth="1" fill="none"/>
            <path d="M4 36 Q4 4 36 4" stroke="#D4AF37" strokeWidth="0.6" fill="none"/>
            <circle cx="4" cy="4" r="2.5" fill="#D4AF37"/>
            <path d="M4 12 L4 4 L12 4" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
          </svg>
          {/* Bottom-left */}
          <svg className="absolute bottom-3 left-3 pointer-events-none" style={{ zIndex:4, opacity:0.55, transform:"scaleY(-1)" }} width="48" height="48" viewBox="0 0 48 48">
            <path d="M4 44 Q4 4 44 4" stroke="#D4AF37" strokeWidth="1" fill="none"/>
            <path d="M4 36 Q4 4 36 4" stroke="#D4AF37" strokeWidth="0.6" fill="none"/>
            <circle cx="4" cy="4" r="2.5" fill="#D4AF37"/>
            <path d="M4 12 L4 4 L12 4" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
          </svg>
          {/* Bottom-right */}
          <svg className="absolute bottom-3 right-3 pointer-events-none" style={{ zIndex:4, opacity:0.55, transform:"scale(-1,-1)" }} width="48" height="48" viewBox="0 0 48 48">
            <path d="M4 44 Q4 4 44 4" stroke="#D4AF37" strokeWidth="1" fill="none"/>
            <path d="M4 36 Q4 4 36 4" stroke="#D4AF37" strokeWidth="0.6" fill="none"/>
            <circle cx="4" cy="4" r="2.5" fill="#D4AF37"/>
            <path d="M4 12 L4 4 L12 4" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
          </svg>

          {/* ── HEADER ── */}
          <div
            className="relative flex items-center justify-between px-5 py-2"
            style={{ background:"linear-gradient(180deg,rgba(212,175,55,0.18) 0%,rgba(212,175,55,0.04) 100%)", borderBottom:"1px solid rgba(212,175,55,0.22)", zIndex:5 }}
          >
            {/* Logo (top-left of header) */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ width: 56 }}>
              <div className="rounded-full overflow-hidden" style={{ width:40, height:40, border:"1.5px solid rgba(212,175,55,0.75)" }}>
                <img src="/orakzai-org-logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLImageElement).style.display="none";}}/>
              </div>
              <span className="text-[6px] font-bold mt-0.5 tracking-widest" style={{ color:"rgba(212,175,55,0.8)" }}>Orakzai.Org</span>
            </div>

            {/* Center title */}
            <div className="flex flex-col items-center flex-1 mx-2">
              <div className="flex items-center gap-2">
                <span style={{ color:"rgba(212,175,55,0.7)", fontSize:12, lineHeight:1 }}>→</span>
                <span
                  className="font-bold tracking-[0.20em]"
                  style={{
                    fontSize:"clamp(18px,3.2vw,32px)",
                    fontFamily:"'Playfair Display',Georgia,serif",
                    background:"linear-gradient(135deg,#f5e070 0%,#D4AF37 45%,#b8860b 100%)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                    lineHeight:1.15,
                  }}
                >ORAKZAI.ORG</span>
                <span style={{ color:"rgba(212,175,55,0.7)", fontSize:12, lineHeight:1 }}>←</span>
              </div>
              <div className="text-[7.5px] font-black tracking-[0.26em] mt-0.5" style={{ color:"rgba(212,175,55,0.72)" }}>
                GLOBAL DIGITAL CITIZENSHIP CARD
              </div>
            </div>

            {/* Verified badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded flex-shrink-0"
              style={{ border:"1px solid rgba(212,175,55,0.60)", background:"rgba(212,175,55,0.06)" }}
            >
              <span style={{ color:"rgba(212,175,55,0.9)", fontSize:9 }}>✦</span>
              <span className="text-[7.5px] font-black tracking-[0.16em] whitespace-nowrap" style={{ color:"rgba(212,175,55,0.95)" }}>VERIFIED MEMBER</span>
            </div>
          </div>

          {/* ── MAIN BODY ── */}
          <div className="relative flex" style={{ zIndex:5, minHeight:240 }}>

            {/* Vertical left security strip */}
            <div
              className="absolute left-0 top-0 bottom-0 flex items-center justify-center pointer-events-none overflow-hidden"
              style={{ width:14, background:"rgba(0,0,0,0.18)", borderRight:"1px solid rgba(212,175,55,0.10)", zIndex:6 }}
            >
              <div
                className="text-[4.5px] font-black tracking-[0.22em] whitespace-nowrap"
                style={{ color:"rgba(212,175,55,0.35)", writingMode:"vertical-rl", transform:"rotate(180deg)", letterSpacing:"0.28em" }}
              >VERIFIED • SECURE • GLOBAL MEMBER • DIGITAL CITIZEN • ORAKZAI.ORG •</div>
            </div>

            {/* LEFT COLUMN: photo + chip */}
            <div className="flex flex-col items-center pt-4 pb-3 flex-shrink-0" style={{ width:"clamp(150px,22%,210px)", paddingLeft:20, paddingRight:8 }}>

              {/* Photo with dual rings */}
              <div className="relative flex items-center justify-center mt-2" style={{ width:156, height:156 }}>
                {/* Outer faint ring */}
                <div className="absolute inset-0 rounded-full" style={{ border:"1px solid rgba(212,175,55,0.22)" }}/>
                {/* Gold ring */}
                <div className="absolute rounded-full" style={{
                  inset:10, border:"3.5px solid #D4AF37",
                  boxShadow:"0 0 18px rgba(212,175,55,0.30), inset 0 0 8px rgba(0,0,0,0.3)"
                }}/>
                {/* Photo circle */}
                <div
                  className="absolute rounded-full overflow-hidden flex items-center justify-center"
                  style={{ inset:18, background:"rgba(212,175,55,0.08)", boxShadow:"inset 0 3px 12px rgba(0,0,0,0.6)" }}
                >
                  {data.photo
                    ? <img src={data.photo} alt="" className="w-full h-full object-cover object-top"/>
                    : <User className="w-10 h-10" style={{ color:"rgba(212,175,55,0.45)" }}/>
                  }
                </div>
                {/* Gold shield checkmark */}
                <div
                  className="absolute flex items-center justify-center rounded-full z-10"
                  style={{
                    width:28, height:28, bottom:18, right:18,
                    background:"radial-gradient(circle at 35% 30%,#f5e070,#c9a227,#7a5a0a)",
                    border:"2px solid #051c0f",
                    boxShadow:"0 3px 10px rgba(0,0,0,0.7)",
                  }}
                >
                  <Check className="w-3.5 h-3.5" style={{ color:"#051c0f", strokeWidth:3 }}/>
                </div>
              </div>

              {/* Chip + NFC */}
              <div className="flex items-center gap-3 mt-5">
                {/* EMV Chip */}
                <div
                  className="rounded flex-shrink-0 relative overflow-hidden"
                  style={{
                    width:44, height:32,
                    background:"linear-gradient(145deg,#f5e070 0%,#D4AF37 35%,#b8860b 65%,#d4a017 100%)",
                    border:"1px solid rgba(0,0,0,0.18)",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Horizontal lines */}
                  {[8,15,22].map(t=>(
                    <div key={t} className="absolute w-full" style={{ height:"0.8px", background:"rgba(0,0,0,0.20)", top:t }}/>
                  ))}
                  {/* Vertical lines */}
                  {[14,29].map(l=>(
                    <div key={l} className="absolute h-full" style={{ width:"0.8px", background:"rgba(0,0,0,0.20)", left:l }}/>
                  ))}
                </div>
                {/* NFC arcs */}
                <div className="relative" style={{ width:32, height:32 }}>
                  {[12,19,27].map((r,i)=>(
                    <div key={r} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width:r, height:r,
                        border:`1.5px solid rgba(212,175,55,${0.25+i*0.2})`,
                        clipPath:"polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: data rows */}
            <div className="flex-1 py-3 pl-3 pr-2 flex flex-col justify-center min-w-0 relative">
              {/* World-map dot pattern (right-aligned behind data) */}
              <div className="absolute top-0 right-0 bottom-0 pointer-events-none" style={{
                width:"38%",
                backgroundImage:"radial-gradient(circle, rgba(212,175,55,0.18) 1.5px, transparent 1.5px)",
                backgroundSize:"11px 11px",
                maskImage:"radial-gradient(ellipse 80% 90% at 70% 50%, black 30%, transparent 100%)",
                WebkitMaskImage:"radial-gradient(ellipse 80% 90% at 70% 50%, black 30%, transparent 100%)",
              }}/>

              {([
                ["MEMBER NAME",        data.name,                        true ],
                ["DESIGNATION",        data.profession,                  false],
                ["CNIC / NATIONAL ID", hashCnic(data.cnic),             false],
                ["NATIONALITY",        data.nationality,                 false],
                ["LOCATION",           `${data.city}, ${data.country}`, false],
                ["AREA OF INTEREST",   data.interest,                   false],
              ] as [string,string,boolean][]).map(([lbl,val,large],idx,arr)=>(
                <div
                  key={lbl}
                  className="flex items-center gap-2 min-w-0"
                  style={{
                    paddingTop: large ? 6 : 5,
                    paddingBottom: large ? 6 : 5,
                    borderBottom: idx<arr.length-1 ? "1px solid rgba(212,175,55,0.12)" : "none",
                  }}
                >
                  <span
                    className="font-black uppercase flex-shrink-0"
                    style={{
                      fontSize:"clamp(5.5px,0.9vw,8px)",
                      letterSpacing:"0.14em",
                      color:"rgba(212,175,55,0.85)",
                      minWidth:"clamp(72px,13%,108px)",
                    }}
                  >{lbl}</span>
                  <span className="flex-shrink-0 font-black" style={{ color:"rgba(212,175,55,0.85)", fontSize:"clamp(7px,1.1vw,9px)" }}>:</span>
                  <span
                    className="truncate"
                    style={{
                      fontSize: large ? "clamp(13px,2.2vw,20px)" : "clamp(9px,1.5vw,13px)",
                      fontWeight: large ? 700 : 500,
                      color: large ? "#ffffff" : "#e0e0e0",
                      fontFamily: large ? "'Playfair Display',Georgia,serif" : undefined,
                      letterSpacing: large ? "0.01em" : 0,
                    }}
                  >{val||"—"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM STRIP ── */}
          <div
            className="relative flex items-stretch px-4 py-2.5 gap-0"
            style={{ borderTop:"1px solid rgba(212,175,55,0.22)", background:"rgba(0,0,0,0.28)", zIndex:5 }}
          >
            {/* LEFT: QR + Member ID + Dates */}
            <div className="flex gap-3 items-start flex-shrink-0" style={{ paddingLeft:10, minWidth:"clamp(190px,30%,250px)" }}>
              {/* QR */}
              <div id="elite-card-qr" className="flex-shrink-0 flex flex-col items-center">
                <div className="p-1 rounded" style={{ background:"#fff", boxShadow:"0 2px 10px rgba(0,0,0,0.55)" }}>
                  <QRCodeSVG value={qrValue} size={56} bgColor="#ffffff" fgColor="#031006"/>
                </div>
                <span className="text-[5.5px] font-black uppercase tracking-wider mt-1" style={{ color:"rgba(212,175,55,0.55)" }}>Scan to Verify</span>
              </div>
              {/* ID + Dates */}
              <div className="flex flex-col gap-1">
                <div>
                  <GoldLabel>Member ID</GoldLabel>
                  <div className="font-mono font-black" style={{ fontSize:"clamp(9px,1.6vw,13px)", color:"#D4AF37", letterSpacing:"0.06em" }}>{data.memberId}</div>
                </div>
                <div>
                  <GoldLabel>Issue Date</GoldLabel>
                  <div className="font-medium" style={{ fontSize:"clamp(8px,1.2vw,10px)", color:"rgba(255,255,255,0.65)" }}>{data.issueDate}</div>
                </div>
                {data.expiryDate && (
                  <div>
                    <GoldLabel>Expiry Date</GoldLabel>
                    <div className="font-medium" style={{ fontSize:"clamp(8px,1.2vw,10px)", color:"rgba(255,255,255,0.65)" }}>{data.expiryDate}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="self-stretch mx-3 flex-shrink-0" style={{ width:1, background:"rgba(212,175,55,0.20)" }}/>

            {/* CENTER: Shield lock + SVT + motto */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Shield SVG */}
              <svg width="30" height="38" viewBox="0 0 30 38" fill="none" style={{ flexShrink:0 }}>
                <path d="M15 2 L28 7 L28 20 Q28 33 15 37 Q2 33 2 20 L2 7 Z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.2" fill="rgba(212,175,55,0.06)"/>
                <path d="M15 10 Q20 10 20 15 L20 16 L10 16 Q10 10 15 10Z" stroke="rgba(212,175,55,0.75)" strokeWidth="1" fill="none"/>
                <rect x="9" y="16" width="12" height="10" rx="1.5" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.65)" strokeWidth="1"/>
                <circle cx="15" cy="21" r="1.8" fill="rgba(212,175,55,0.8)"/>
              </svg>
              <div className="flex flex-col">
                {["SECURE","VERIFIED","TRUSTED"].map(t=>(
                  <span key={t} className="font-black tracking-[0.18em] leading-tight" style={{ fontSize:"clamp(6px,0.9vw,8px)", color:"rgba(212,175,55,0.95)" }}>{t}</span>
                ))}
                <span className="leading-tight mt-1" style={{ fontSize:"clamp(4.5px,0.7vw,6px)", color:"rgba(255,255,255,0.32)", letterSpacing:"0.08em" }}>
                  BUILDING A BETTER<br/>DIGITAL FUTURE<br/>FOR HUMANITY
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="self-stretch mx-3 flex-shrink-0" style={{ width:1, background:"rgba(212,175,55,0.20)" }}/>

            {/* RIGHT: Signature + name */}
            <div className="flex flex-col items-start justify-center flex-1">
              <img
                src="/faisal-signature-transparent.png"
                alt="Signature"
                className="object-contain mb-1"
                style={{ height:38, maxWidth:130, filter:"drop-shadow(0 0 4px rgba(100,150,255,0.18))" }}
              />
              <GoldLabel>FAISAL ORAKZAI</GoldLabel>
              <span style={{ fontSize:"clamp(5px,0.75vw,7px)", color:"rgba(255,255,255,0.38)", letterSpacing:"0.06em" }}>
                Founder &amp; Chairman, Orakzai.org
              </span>
            </div>

            {/* ORZ ref number bottom-right */}
            <div className="flex flex-col justify-end items-end flex-shrink-0 pl-2">
              <span
                className="font-mono font-bold self-end"
                style={{ fontSize:"clamp(5px,0.75vw,7px)", color:"rgba(212,175,55,0.40)", letterSpacing:"0.12em" }}
              >ORZ-2026-{data.memberId.slice(-5)}</span>
            </div>
          </div>

          {/* ── BOTTOM TICKER ── */}
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{
              height:18,
              background:"linear-gradient(90deg,rgba(212,175,55,0.14) 0%,rgba(212,175,55,0.08) 50%,rgba(212,175,55,0.14) 100%)",
              borderTop:"1px solid rgba(212,175,55,0.22)",
              zIndex:5,
            }}
          >
            <div
              className="ticker-scroll absolute flex items-center h-full whitespace-nowrap"
              style={{
                animation:"tickerScroll 22s linear infinite",
                fontSize:"5.5px",
                fontWeight:900,
                letterSpacing:"0.28em",
                color:"rgba(212,175,55,0.55)",
              }}
            >
              {Array(3).fill("GLOBAL MEMBER • DIGITAL CITIZEN • SECURE • VERIFIED • TRUSTED • ORAKZAI.ORG • ").map((t,i)=>(
                <span key={i}>{t}</span>
              ))}
            </div>
            <style>{`@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
          </div>

        </div>{/* /inner card */}
      </div>{/* /gold frame */}
        </div>{/* /min-width wrapper */}
      </div>{/* /mobile scroll */}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDownload} disabled={dl}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
          style={{ background:"linear-gradient(135deg,#b8860b,#D4AF37,#e8c84a)", color:"#011a10", boxShadow:"0 4px 20px rgba(212,175,55,0.35)" }}
        >
          {dl ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4"/>}
          Download Card (PNG)
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-white/5"
          style={{ border:"1px solid rgba(212,175,55,0.35)", color:"#D4AF37" }}
        >
          <Printer className="w-4 h-4"/>
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
  nationality: string; profession: string; skills: string[]; interest: string;
  statement: string; memberId: string; issueDate: string; expiryDate: string;
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
    nationality: string; profession: string; skills: string[]; interest: string; statement: string;
  }>({
    name: "", fatherName: "", cnic: "", photo: "",
    countryCode: "+92", phone: "", email: "", city: "", country: "",
    nationality: "", profession: "", skills: [], interest: "", statement: "",
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
      const na = required(f.nationality, "Nationality"); if (na) e.nationality = na;
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
    const expiry = new Date(now);
    expiry.setFullYear(expiry.getFullYear() + 5);
    setMember({
      ...f,
      memberId: genMemberId(),
      issueDate: now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      expiryDate: expiry.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
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

                        <Field label="Nationality" required error={errors.nationality}>
                          <input
                            value={f.nationality}
                            onChange={(e) => setF((p) => ({ ...p, nationality: e.target.value }))}
                            placeholder="e.g. Pakistani, British, American…"
                            className={inputBase}
                            style={fs('nationality')}
                            onFocus={() => setFocus('nationality')}
                            onBlur={() => setFocus(null)}
                          />
                        </Field>

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
                    onClick={() => { setDone(false); setStep(1); setMember(null); setF({ name: "", fatherName: "", cnic: "", photo: "", countryCode: "+92", phone: "", email: "", city: "", country: "", nationality: "", profession: "", skills: [], interest: "", statement: "" }); }}
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
