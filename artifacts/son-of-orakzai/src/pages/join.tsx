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
     Canvas PNG download — pixel-perfect reference
  ──────────────────────────────────────────────── */
  const handleDownload = useCallback(async () => {
    setDl(true);
    try {
      const W = 1200, H = 560;
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const ctx = cv.getContext("2d")!;

      /* helpers */
      const goldGrad = () => {
        const g = ctx.createLinearGradient(0, 0, 0, 16);
        g.addColorStop(0, "#f5e070"); g.addColorStop(0.5, "#D4AF37"); g.addColorStop(1, "#b8860b");
        return g;
      };
      const loadImg = (src: string): Promise<HTMLImageElement> =>
        new Promise((res) => {
          const im = new Image(); im.crossOrigin = "anonymous";
          im.onload = () => res(im); im.onerror = () => res(im);
          im.src = src;
        });

      /* 1 ── Background */
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#051c0f"); bg.addColorStop(0.4, "#0a2d16"); bg.addColorStop(1, "#030e07");
      ctx.fillStyle = bg; ctx.roundRect(0, 0, W, H, 20); ctx.fill();

      /* brushed texture */
      ctx.save(); ctx.globalAlpha = 0.022;
      for (let y = 0; y < H; y += 2) {
        ctx.strokeStyle = y % 4 === 0 ? "#ffffff" : "#80ff80"; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();

      /* 2 ── Gold borders */
      ctx.strokeStyle = "#D4AF37cc"; ctx.lineWidth = 3.5;
      ctx.roundRect(2, 2, W - 4, H - 4, 18); ctx.stroke();
      ctx.strokeStyle = "rgba(212,175,55,0.28)"; ctx.lineWidth = 1;
      ctx.roundRect(8, 8, W - 16, H - 16, 13); ctx.stroke();

      /* 3 ── Corner screws */
      [[20,20],[W-20,20],[20,H-20],[W-20,H-20]].forEach(([sx,sy]) => {
        const sg = ctx.createRadialGradient(sx-2,sy-2,1,sx,sy,7);
        sg.addColorStop(0,"#f0d060"); sg.addColorStop(0.5,"#b8860b"); sg.addColorStop(1,"#3d2e04");
        ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(sx,sy,7,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle="#D4AF3799"; ctx.lineWidth=1;
        ctx.beginPath(); ctx.arc(sx,sy,7,0,Math.PI*2); ctx.stroke();
        ctx.strokeStyle="rgba(0,0,0,0.55)"; ctx.lineWidth=0.9;
        ctx.beginPath(); ctx.moveTo(sx-4,sy); ctx.lineTo(sx+4,sy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx,sy-4); ctx.lineTo(sx,sy+4); ctx.stroke();
      });

      /* 4 ── Header bar (0–76) */
      const hbg = ctx.createLinearGradient(0,0,0,76);
      hbg.addColorStop(0,"rgba(212,175,55,0.18)"); hbg.addColorStop(1,"rgba(212,175,55,0.04)");
      ctx.fillStyle=hbg; ctx.roundRect(4,4,W-8,72,[13,13,0,0]); ctx.fill();
      ctx.strokeStyle="rgba(212,175,55,0.22)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(14,76); ctx.lineTo(W-14,76); ctx.stroke();

      /* Title */
      ctx.textAlign="center"; ctx.textBaseline="alphabetic";
      const tg=ctx.createLinearGradient(0,16,0,56);
      tg.addColorStop(0,"#f5e070"); tg.addColorStop(0.5,"#D4AF37"); tg.addColorStop(1,"#b8860b");
      ctx.fillStyle=tg;
      ctx.font="bold 14px Georgia,serif"; ctx.fillText("→",W/2-185,46); ctx.fillText("←",W/2+185,46);
      ctx.font="bold 36px Georgia,serif"; ctx.fillText("ORAKZAI.ORG",W/2,50);
      ctx.font="bold 10px 'Courier New',monospace"; ctx.fillStyle="rgba(212,175,55,0.8)";
      ctx.fillText("GLOBAL DIGITAL CITIZENSHIP CARD",W/2,67);

      /* Verified badge */
      ctx.strokeStyle="rgba(212,175,55,0.65)"; ctx.lineWidth=1;
      ctx.roundRect(W-178,18,158,28,5); ctx.stroke();
      ctx.fillStyle="rgba(212,175,55,0.06)"; ctx.roundRect(W-178,18,158,28,5); ctx.fill();
      ctx.font="10px sans-serif"; ctx.fillStyle="#D4AF37cc"; ctx.textAlign="left";
      ctx.fillText("✦",W-168,37);
      ctx.font="bold 9px 'Courier New',monospace"; ctx.fillStyle="#D4AF37dd";
      ctx.fillText("VERIFIED MEMBER",W-152,37);

      /* 5 ── Left column (x:14–178) */
      /* Logo */
      const logo = await loadImg("/orakzai-org-logo.png");
      const lcX=96, logoY=100;
      if(logo.naturalWidth>0){
        ctx.save(); ctx.beginPath(); ctx.arc(lcX,logoY,34,0,Math.PI*2); ctx.clip();
        ctx.drawImage(logo,lcX-34,logoY-34,68,68); ctx.restore();
        ctx.strokeStyle="#D4AF37bb"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(lcX,logoY,35,0,Math.PI*2); ctx.stroke();
      } else {
        ctx.fillStyle="rgba(212,175,55,0.15)";
        ctx.beginPath(); ctx.arc(lcX,logoY,35,0,Math.PI*2); ctx.fill();
        ctx.font="22px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillStyle="#D4AF37"; ctx.fillText("🦅",lcX,logoY);
      }
      ctx.font="bold 8px 'Courier New',monospace"; ctx.fillStyle="#D4AF37cc";
      ctx.textAlign="center"; ctx.textBaseline="alphabetic";
      ctx.fillText("Orakzai.Org",lcX,147);

      /* Photo */
      const pcx=96, pcy=310, pr=78;
      ctx.strokeStyle="rgba(212,175,55,0.22)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(pcx,pcy,pr+18,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle="#D4AF37ee"; ctx.lineWidth=3.5;
      ctx.beginPath(); ctx.arc(pcx,pcy,pr+10,0,Math.PI*2); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.arc(pcx,pcy,pr,0,Math.PI*2); ctx.clip();
      if(data.photo){
        const pi = await loadImg(data.photo);
        ctx.drawImage(pi,pcx-pr,pcy-pr,pr*2,pr*2);
      } else {
        ctx.fillStyle="rgba(212,175,55,0.1)"; ctx.fillRect(pcx-pr,pcy-pr,pr*2,pr*2);
        ctx.font="64px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillStyle="#D4AF3788"; ctx.fillText((data.name[0]||"?").toUpperCase(),pcx,pcy);
      }
      ctx.restore();
      /* checkmark badge */
      const cbx=pcx+pr*0.68, cby=pcy+pr*0.68;
      ctx.fillStyle="#D4AF37"; ctx.beginPath(); ctx.arc(cbx,cby,12,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#051c0f"; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(cbx,cby,12,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle="#051c0f"; ctx.font="bold 11px sans-serif";
      ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("✓",cbx,cby);

      /* Chip */
      const chX=28, chY=418;
      const cg=ctx.createLinearGradient(chX,chY,chX+42,chY+30);
      cg.addColorStop(0,"#f0d060"); cg.addColorStop(0.5,"#D4AF37"); cg.addColorStop(1,"#b8860b");
      ctx.fillStyle=cg; ctx.roundRect(chX,chY,42,30,3); ctx.fill();
      ctx.strokeStyle="rgba(0,0,0,0.2)"; ctx.lineWidth=0.6;
      [8,15,22].forEach(dy=>{ctx.beginPath();ctx.moveTo(chX,chY+dy);ctx.lineTo(chX+42,chY+dy);ctx.stroke();});
      [13,29].forEach(dx=>{ctx.beginPath();ctx.moveTo(chX+dx,chY);ctx.lineTo(chX+dx,chY+30);ctx.stroke();});

      /* NFC arcs */
      const nX=82, nY=433;
      [12,20,29].forEach((r,i)=>{
        ctx.strokeStyle=`rgba(212,175,55,${0.3+i*0.2})`; ctx.lineWidth=1.8;
        ctx.beginPath(); ctx.arc(nX,nY,r,-Math.PI*0.65,Math.PI*0.65); ctx.stroke();
      });

      /* 6 ── World-map dots (right panel x:800..) */
      ctx.save(); ctx.globalAlpha=0.1;
      const wmS=800;
      for(let col=wmS;col<W-22;col+=12){
        for(let row=82;row<448;row+=12){
          const nc=(col-wmS)/(W-22-wmS), nr=(row-82)/(448-82);
          const land=
            (nc<0.32&&nr>0.1&&nr<0.74)||
            (nc>=0.32&&nc<0.58&&nr>0.04&&nr<0.58)||
            (nc>=0.58&&nr>0.08&&nr<0.64)||
            (nc>0.12&&nc<0.48&&nr>0.62&&nr<0.9);
          if(land){ctx.fillStyle="#D4AF37"; ctx.fillRect(col,row,6,6);}
        }
      }
      ctx.restore();

      /* 7 ── Data fields (x:200..795) */
      const rows:[string,string,boolean][]=[
        ["MEMBER NAME",        data.name,                        true ],
        ["DESIGNATION",        data.profession,                  false],
        ["CNIC / NATIONAL ID", hashCnic(data.cnic),             false],
        ["NATIONALITY",        data.nationality,                 false],
        ["LOCATION",           `${data.city}, ${data.country}`, false],
        ["AREA OF INTEREST",   data.interest,                   false],
      ];
      const fx=210, fy0=84, rowH=60, colonX=fx+148;
      rows.forEach(([lbl,val,large],i)=>{
        const y=fy0+i*rowH;
        ctx.font="bold 8.5px 'Courier New',monospace";
        ctx.fillStyle=goldGrad(); ctx.textAlign="left"; ctx.textBaseline="alphabetic";
        ctx.fillText(lbl,fx,y);
        ctx.fillText(":",colonX,y+(large?20:14));
        ctx.font=large?"bold 22px Georgia,serif":"500 15px sans-serif";
        ctx.fillStyle=large?"#ffffff":"#e0e0e0";
        ctx.fillText(val||"—",colonX+14,y+(large?23:16));
        const sep=ctx.createLinearGradient(fx,0,795,0);
        sep.addColorStop(0,"rgba(212,175,55,0.38)"); sep.addColorStop(1,"transparent");
        ctx.strokeStyle=sep; ctx.lineWidth=0.7;
        ctx.beginPath(); ctx.moveTo(fx,y+(large?34:26)); ctx.lineTo(795,y+(large?34:26)); ctx.stroke();
      });

      /* 8 ── Bottom strip (y:452) */
      const bsY=452;
      ctx.strokeStyle="rgba(212,175,55,0.22)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(14,bsY); ctx.lineTo(W-14,bsY); ctx.stroke();
      const bsBg=ctx.createLinearGradient(0,bsY,0,H);
      bsBg.addColorStop(0,"rgba(0,0,0,0.28)"); bsBg.addColorStop(1,"rgba(0,0,0,0.12)");
      ctx.fillStyle=bsBg; ctx.fillRect(14,bsY,W-28,H-bsY-4);

      /* Bottom LEFT: Member ID + Dates */
      const bLx=24;
      ctx.font="bold 7.5px 'Courier New',monospace"; ctx.fillStyle=goldGrad(); ctx.textAlign="left";
      ctx.fillText("MEMBER ID",bLx,bsY+17);
      ctx.font="bold 18px 'Courier New',monospace"; ctx.fillStyle="#D4AF37";
      ctx.fillText(data.memberId,bLx,bsY+37);
      ctx.font="bold 7px 'Courier New',monospace"; ctx.fillStyle=goldGrad();
      ctx.fillText("ISSUE DATE",bLx,bsY+54);
      ctx.font="500 11px sans-serif"; ctx.fillStyle="#cccccc";
      ctx.fillText(data.issueDate,bLx,bsY+68);
      ctx.font="bold 7px 'Courier New',monospace"; ctx.fillStyle=goldGrad();
      ctx.fillText("EXPIRY DATE",bLx+170,bsY+54);
      ctx.font="500 11px sans-serif"; ctx.fillStyle="#cccccc";
      ctx.fillText(data.expiryDate,bLx+170,bsY+68);

      /* QR code bottom-left */
      const qrEl=document.querySelector<SVGSVGElement>("#elite-card-qr svg");
      if(qrEl){
        const xml=new XMLSerializer().serializeToString(qrEl);
        const blob=new Blob([xml],{type:"image/svg+xml;charset=utf-8"});
        const url=URL.createObjectURL(blob);
        const qi=new Image();
        await new Promise<void>((res)=>{qi.onload=()=>res();qi.onerror=()=>res();qi.src=url;});
        ctx.fillStyle="#ffffff"; ctx.roundRect(bLx-2,bsY+78,68,68,4); ctx.fill();
        ctx.drawImage(qi,bLx,bsY+80,64,64);
        URL.revokeObjectURL(url);
        ctx.font="bold 6px 'Courier New',monospace"; ctx.fillStyle="rgba(212,175,55,0.6)";
        ctx.fillText("SCAN TO VERIFY",bLx,bsY+152);
      }

      /* Bottom CENTER: Lock shield + SVT + Divider + Signature */
      const bcX=420;
      /* lock shield */
      ctx.strokeStyle="rgba(212,175,55,0.6)"; ctx.lineWidth=1.5; ctx.fillStyle="rgba(212,175,55,0.06)";
      ctx.roundRect(bcX,bsY+8,34,44,6); ctx.fill(); ctx.stroke();
      ctx.strokeStyle="rgba(212,175,55,0.75)"; ctx.lineWidth=1.8;
      ctx.beginPath(); ctx.arc(bcX+17,bsY+24,10,Math.PI,0); ctx.stroke();
      ctx.fillStyle="rgba(212,175,55,0.8)"; ctx.roundRect(bcX+7,bsY+24,20,18,2); ctx.fill();
      ctx.fillStyle="#051c0f"; ctx.font="bold 10px sans-serif";
      ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("🔒",bcX+17,bsY+35);
      /* SVT */
      ctx.font="bold 9px 'Courier New',monospace"; ctx.fillStyle="#D4AF37ee"; ctx.textAlign="left";
      ctx.fillText("SECURE",bcX+40,bsY+22);
      ctx.fillText("VERIFIED",bcX+40,bsY+33);
      ctx.fillText("TRUSTED",bcX+40,bsY+44);
      ctx.font="6px sans-serif"; ctx.fillStyle="rgba(255,255,255,0.36)";
      ctx.fillText("BUILDING A BETTER",bcX+40,bsY+57);
      ctx.fillText("DIGITAL FUTURE",bcX+40,bsY+66);
      ctx.fillText("FOR HUMANITY",bcX+40,bsY+75);
      /* vertical divider */
      ctx.strokeStyle="rgba(212,175,55,0.22)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(bcX+128,bsY+5); ctx.lineTo(bcX+128,H-14); ctx.stroke();
      /* signature */
      const sig=await loadImg("/faisal-signature-transparent.png");
      if(sig.naturalWidth>0){
        ctx.save(); ctx.globalAlpha=0.88;
        ctx.drawImage(sig,bcX+134,bsY+2,155,74); ctx.restore();
      }
      ctx.font="bold 8.5px 'Courier New',monospace"; ctx.fillStyle=goldGrad(); ctx.textAlign="center";
      ctx.fillText("FAISAL ORAKZAI",bcX+210,H-30);
      ctx.font="7px sans-serif"; ctx.fillStyle="rgba(255,255,255,0.4)";
      ctx.fillText("Founder & Chairman, Orakzai Group",bcX+210,H-18);

      /* Bottom RIGHT: Gold circular stamp */
      const sX=W-90, sY=H-78, sR=62;
      const sg2=ctx.createRadialGradient(sX-14,sY-14,4,sX,sY,sR);
      sg2.addColorStop(0,"#f5e070"); sg2.addColorStop(0.35,"#d4af37");
      sg2.addColorStop(0.75,"#8a6a10"); sg2.addColorStop(1,"#4a3408");
      ctx.fillStyle=sg2; ctx.beginPath(); ctx.arc(sX,sY,sR,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#f0d060"; ctx.lineWidth=2.2;
      ctx.beginPath(); ctx.arc(sX,sY,sR,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle="rgba(0,0,0,0.22)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(sX,sY,sR-8,0,Math.PI*2); ctx.stroke();
      /* circular arc text top */
      ctx.save(); ctx.translate(sX,sY);
      const topT="★ ORAKZAI.ORG ★";
      topT.split("").forEach((ch,ci)=>{
        const a=-Math.PI/2-(topT.length/2*0.185)+ci*0.185;
        ctx.save(); ctx.rotate(a); ctx.translate(0,-(sR-13)); ctx.rotate(Math.PI/2);
        ctx.font="bold 6.5px 'Courier New',monospace"; ctx.fillStyle="#051c0f";
        ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(ch,0,0); ctx.restore();
      });
      const botT="VERIFIED MEMBER";
      botT.split("").forEach((ch,ci)=>{
        const a=Math.PI/2-(botT.length/2*0.155)+ci*0.155;
        ctx.save(); ctx.rotate(a); ctx.translate(0,-(sR-13)); ctx.rotate(Math.PI/2);
        ctx.font="bold 6px 'Courier New',monospace"; ctx.fillStyle="#051c0f";
        ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(ch,0,0); ctx.restore();
      });
      /* eagle */
      ctx.font="28px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("🦅",0,-2); ctx.restore();

      /* download */
      const lnk=document.createElement("a");
      lnk.download=`${data.memberId}-orakzai-card.png`;
      lnk.href=cv.toDataURL("image/png",1.0); lnk.click();
    } finally { setDl(false); }
  }, [data]);

  const handlePrint = () => {
    const win = window.open("", "_blank", "width=1040,height=640");
    if (!win) return;
    const cardHtml = cardRef.current?.outerHTML ?? "";
    win.document.write(`<html><head><title>Orakzai Member Card</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
      <style>* { -webkit-print-color-adjust:exact; print-color-adjust:exact; box-sizing:border-box; }
      body { margin:0; background:#051c0f; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:32px; }
      </style></head><body>${cardHtml}</body></html>`);
    win.document.close(); win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  /* ─── Visual HTML Card ──────────────────────────── */
  return (
    <div className="flex flex-col items-center gap-6 w-full">

      {/* Gold outer frame */}
      <div
        ref={cardRef}
        className="relative w-full select-none"
        style={{
          maxWidth: 900,
          padding: 4,
          background: "linear-gradient(135deg,#f0d060 0%,#8a6a10 25%,#D4AF37cc 50%,#5a4208 75%,#e8c84a 100%)",
          borderRadius: 20,
          boxShadow: "0 40px 100px rgba(0,0,0,0.75),0 12px 40px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Inner dark card */}
        <div
          className="relative rounded-[16px] overflow-hidden"
          style={{ background: "linear-gradient(160deg,#071e12 0%,#0c3020 18%,#082818 38%,#0a2d1c 52%,#061b11 70%,#04100a 100%)" }}
        >
          {/* diagonal micro-texture */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"repeating-linear-gradient(135deg,transparent 0,transparent 5px,rgba(255,255,255,0.006) 5px,rgba(255,255,255,0.006) 6px)", zIndex:1 }} />
          {/* inner gold inset */}
          <div className="absolute inset-[5px] rounded-[12px] pointer-events-none" style={{ border:"1px solid rgba(212,175,55,0.22)", zIndex:2 }} />
          {/* screws */}
          <Screw pos="tl"/><Screw pos="tr"/><Screw pos="bl"/><Screw pos="br"/>

          {/* ── HEADER ── */}
          <div
            className="relative z-10 py-2.5 text-center"
            style={{ background:"linear-gradient(180deg,rgba(212,175,55,0.17) 0%,rgba(212,175,55,0.04) 100%)", borderBottom:"1px solid rgba(212,175,55,0.2)" }}
          >
            {/* Verified badge – top-right */}
            <div
              className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 rounded"
              style={{ border:"1px solid rgba(212,175,55,0.55)", background:"rgba(212,175,55,0.05)" }}
            >
              <span style={{ color:"#D4AF37cc", fontSize:10 }}>✦</span>
              <span className="text-[8px] font-black tracking-[0.18em]" style={{ color:"#D4AF37dd" }}>VERIFIED MEMBER</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span style={{ color:"#D4AF37cc", fontSize:13 }}>→</span>
              <span
                className="text-[20px] sm:text-[24px] font-bold tracking-[0.18em]"
                style={{ fontFamily:"'Playfair Display',Georgia,serif", background:"linear-gradient(135deg,#f5e070 0%,#D4AF37 50%,#b8860b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}
              >ORAKZAI.ORG</span>
              <span style={{ color:"#D4AF37cc", fontSize:13 }}>←</span>
            </div>
            <div className="text-[7px] font-black tracking-[0.24em]" style={{ color:"rgba(212,175,55,0.75)" }}>
              GLOBAL DIGITAL CITIZENSHIP CARD
            </div>
          </div>

          {/* ── MAIN BODY: 3 columns ── */}
          <div className="relative z-10 flex min-h-0">

            {/* LEFT COLUMN: Logo → Photo → Chip */}
            <div className="flex flex-col items-center px-3 py-3 flex-shrink-0" style={{ width:148 }}>
              {/* Logo */}
              <div className="flex flex-col items-center mb-2">
                <div className="rounded-full overflow-hidden" style={{ width:46, height:46, border:"2px solid rgba(212,175,55,0.7)" }}>
                  <img src="/orakzai-org-logo.png" alt="Logo" className="w-full h-full object-cover"
                    onError={(e)=>{(e.target as HTMLImageElement).style.display="none";}} />
                </div>
                <span className="text-[6px] font-bold mt-1 tracking-widest" style={{ color:"rgba(212,175,55,0.8)" }}>Orakzai.Org</span>
              </div>

              {/* Photo with rings */}
              <div className="relative flex items-center justify-center mt-1">
                <div className="absolute rounded-full" style={{ inset:-18, border:"1px solid rgba(212,175,55,0.18)" }}/>
                <div className="absolute rounded-full" style={{ inset:-10, border:"3px solid rgba(212,175,55,0.9)", boxShadow:"0 0 16px rgba(212,175,55,0.22)" }}/>
                <div
                  className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background:"rgba(212,175,55,0.06)", boxShadow:"inset 0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {data.photo
                    ? <img src={data.photo} alt="" className="w-full h-full object-cover object-center"/>
                    : <User className="w-8 h-8" style={{ color:"rgba(212,175,55,0.5)" }}/>
                  }
                </div>
                {/* Checkmark badge */}
                <div
                  className="absolute bottom-[-2px] right-[-2px] w-5 h-5 rounded-full flex items-center justify-center z-10"
                  style={{ background:"radial-gradient(circle at 35% 35%,#f0d060,#8a6a10)", border:"1.5px solid #051c0f", boxShadow:"0 2px 6px rgba(0,0,0,0.7)" }}
                >
                  <Check className="w-2 h-2" style={{ color:"#051c0f" }}/>
                </div>
              </div>

              {/* Chip + NFC */}
              <div className="flex items-center gap-2 mt-5">
                <div
                  className="rounded-sm flex-shrink-0"
                  style={{ width:36, height:26, background:"linear-gradient(135deg,#f0d060,#b8860b)", border:"1px solid rgba(0,0,0,0.2)" }}
                >
                  {[0,1,2].map(i=>(
                    <div key={i} className="w-full" style={{ height:"1px", background:"rgba(0,0,0,0.22)", marginTop:i===0?7:6 }}/>
                  ))}
                </div>
                <div className="relative flex items-center justify-center" style={{ width:28, height:28 }}>
                  {[10,17,24].map(r=>(
                    <div key={r} className="absolute rounded-full border" style={{ width:r, height:r, borderColor:"rgba(212,175,55,0.5)", borderWidth:1.5 }}/>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: 6 data rows */}
            <div className="flex-1 py-3 pl-1 pr-2 flex flex-col justify-center gap-0 min-w-0">
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
                  className="flex items-baseline gap-1 py-[5px] min-w-0"
                  style={idx<arr.length-1?{borderBottom:"1px solid rgba(212,175,55,0.11)"}:{}}
                >
                  <span
                    className="text-[6px] sm:text-[6.5px] font-black uppercase tracking-[0.15em] flex-shrink-0"
                    style={{ color:"rgba(212,175,55,0.82)", minWidth:90 }}
                  >{lbl}</span>
                  <span className="flex-shrink-0 text-[8px]" style={{ color:"rgba(212,175,55,0.82)" }}>:</span>
                  <span
                    className={`truncate ${large ? "font-bold text-sm sm:text-[15px]" : "font-medium text-[10px] sm:text-[11px]"}`}
                    style={{ color:large?"#ffffff":"#ddd", fontFamily:large?"'Playfair Display',Georgia,serif":undefined }}
                  >{val||"—"}</span>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: World-map dots */}
            <div
              className="flex-shrink-0 self-stretch"
              style={{
                width:82,
                backgroundImage:"radial-gradient(circle, rgba(212,175,55,0.2) 1.5px, transparent 1.5px)",
                backgroundSize:"10px 10px",
              }}
            />
          </div>

          {/* ── BOTTOM STRIP ── */}
          <div
            className="relative z-10 flex items-center px-3 py-2 gap-1 flex-wrap sm:flex-nowrap"
            style={{ borderTop:"1px solid rgba(212,175,55,0.18)", background:"rgba(0,0,0,0.22)" }}
          >
            {/* LEFT: Member ID + QR + Dates */}
            <div className="flex gap-2 flex-shrink-0 items-start" style={{ minWidth:220 }}>
              {/* QR */}
              <div id="elite-card-qr" className="flex-shrink-0">
                <div className="p-1 rounded" style={{ background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.5)" }}>
                  <QRCodeSVG value={qrValue} size={52} bgColor="#ffffff" fgColor="#04100a"/>
                </div>
                <div className="mt-0.5">
                  <span className="text-[5px] font-black uppercase tracking-wider" style={{ color:"rgba(212,175,55,0.55)" }}>Scan to Verify</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <GoldLabel>Member ID</GoldLabel>
                <div className="font-mono font-black text-[11px]" style={{ color:"#D4AF37" }}>{data.memberId}</div>
                <div className="mt-1">
                  <GoldLabel>Issue Date</GoldLabel>
                  <div className="text-[9px] font-medium" style={{ color:"rgba(255,255,255,0.62)" }}>{data.issueDate}</div>
                </div>
                {data.expiryDate && (
                  <div className="mt-0.5">
                    <GoldLabel>Expiry Date</GoldLabel>
                    <div className="text-[9px] font-medium" style={{ color:"rgba(255,255,255,0.62)" }}>{data.expiryDate}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block self-stretch w-[1px] mx-1 flex-shrink-0" style={{ background:"rgba(212,175,55,0.18)" }}/>

            {/* CENTER: Lock + SVT + Signature */}
            <div className="flex items-center gap-2 flex-1 justify-center flex-wrap sm:flex-nowrap">
              {/* Lock shield */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-center rounded"
                style={{ width:26, height:34, border:"1.5px solid rgba(212,175,55,0.6)", background:"rgba(212,175,55,0.06)" }}
              >
                <div className="rounded-full border" style={{ width:11, height:11, borderColor:"rgba(212,175,55,0.8)", borderWidth:"1.5px", marginBottom:-4 }}/>
                <div className="rounded-sm mt-1" style={{ width:16, height:12, background:"rgba(212,175,55,0.8)" }}/>
              </div>
              <div className="flex flex-col flex-shrink-0">
                {["SECURE","VERIFIED","TRUSTED"].map(t=>(
                  <span key={t} className="text-[6.5px] font-black tracking-widest leading-tight" style={{ color:"rgba(212,175,55,0.9)" }}>{t}</span>
                ))}
                <span className="text-[5px] leading-tight mt-0.5" style={{ color:"rgba(255,255,255,0.32)" }}>
                  BUILDING A BETTER<br/>DIGITAL FUTURE<br/>FOR HUMANITY
                </span>
              </div>
              {/* vertical divider */}
              <div className="hidden sm:block self-stretch w-[1px] mx-1 flex-shrink-0" style={{ background:"rgba(212,175,55,0.18)" }}/>
              {/* Signature block */}
              <div className="flex flex-col items-center flex-shrink-0">
                <img src="/faisal-signature-transparent.png" alt="Signature" className="h-8 object-contain" style={{ filter:"drop-shadow(0 0 3px rgba(255,255,255,0.07))", maxWidth:120 }}/>
                <GoldLabel>FAISAL ORAKZAI</GoldLabel>
                <span className="text-[5.5px]" style={{ color:"rgba(255,255,255,0.35)" }}>Founder &amp; Chairman, Orakzai Group</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block self-stretch w-[1px] mx-1 flex-shrink-0" style={{ background:"rgba(212,175,55,0.18)" }}/>

            {/* RIGHT: Gold seal */}
            <div
              className="flex-shrink-0 w-[68px] h-[68px] rounded-full flex flex-col items-center justify-center relative overflow-hidden"
              style={{ background:"radial-gradient(circle at 38% 32%,#f5e070 0%,#c9a227 36%,#8a6a10 70%,#4a3408 100%)", border:"2.5px solid #f0d060", boxShadow:"0 4px 20px rgba(212,175,55,0.5)" }}
            >
              <span className="text-[4px] font-black tracking-widest text-center leading-tight" style={{ color:"#051c0f", letterSpacing:"0.12em" }}>ORAKZAI.ORG</span>
              <span className="text-[18px] leading-none my-0.5">🦅</span>
              <span className="text-[4px] font-black tracking-wider text-center" style={{ color:"#051c0f" }}>VERIFIED MEMBER</span>
            </div>
          </div>

          {/* Bottom gold rule */}
          <div className="h-[2px]" style={{ background:"linear-gradient(90deg,transparent,#D4AF37cc 30%,#D4AF37 50%,#D4AF37cc 70%,transparent)" }}/>

        </div>{/* /inner card */}
      </div>{/* /gold frame */}

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
