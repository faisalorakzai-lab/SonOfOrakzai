import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  Copy, CheckCheck, Upload, Wallet, CreditCard, Building2,
  Bitcoin, ShieldCheck, Zap, Globe, ChevronDown, Star, Lock,
  RefreshCw, ArrowRight, FileText
} from "lucide-react";
import { QRCode } from "qrcode.react";

// ─── Constants ───────────────────────────────────────────────────────────────
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F5E07A";
const EMERALD_DARK = "#02180e";
const EMERALD_MID = "#031f12";
const EMERALD_CARD = "#041a0e";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function CopyField({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
      style={{
        background: "rgba(212,175,55,0.06)",
        border: "1px solid rgba(212,175,55,0.18)",
      }}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: "rgba(212,175,55,0.55)" }}>{label}</p>
        <p className={`text-white text-sm break-all ${mono ? "font-mono" : "font-semibold"}`}>{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{
          background: copied ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.10)",
          border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(212,175,55,0.25)"}`,
          color: copied ? "#22c55e" : GOLD,
        }}
      >
        {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
      style={{
        background: "rgba(212,175,55,0.12)",
        border: "1px solid rgba(212,175,55,0.30)",
        color: GOLD_LIGHT,
      }}
    >
      {children}
    </span>
  );
}

const CAUSES = [
  { value: "migrant", label: "Migrant Protection Fund" },
  { value: "scholarships", label: "Education Scholarships" },
  { value: "grants", label: "Riba-Free Economic Grants" },
  { value: "relief", label: "Crisis Relief & Emergency Aid" },
  { value: "general", label: "General Welfare & Operations" },
];

const AMOUNTS = [25, 50, 100, 500];

// ─── Tab A: Card ─────────────────────────────────────────────────────────────
function CardTab() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selected, setSelected] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [cause, setCause] = useState(CAUSES[0].value);
  const [causeOpen, setCauseOpen] = useState(false);
  const causeLabel = CAUSES.find(c => c.value === cause)?.label ?? "";

  return (
    <div className="space-y-6">
      {/* Frequency Toggle */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Donation Frequency</p>
        <div className="inline-flex rounded-xl p-1" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)" }}>
          {[{ id: "once", label: "One-Time" }, { id: "monthly", label: "Monthly Recurring" }].map(f => (
            <button
              key={f.id}
              onClick={() => setFrequency(f.id as "once" | "monthly")}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: frequency === f.id ? `linear-gradient(135deg, #b8860b, ${GOLD})` : "transparent",
                color: frequency === f.id ? "#011a10" : "rgba(255,255,255,0.5)",
                boxShadow: frequency === f.id ? `0 4px 14px rgba(212,175,55,0.35)` : "none",
              }}
            >
              {f.id === "monthly" && <RefreshCw className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Presets */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Select Amount (USD)</p>
        <div className="grid grid-cols-4 gap-3">
          {AMOUNTS.map(amt => (
            <button
              key={amt}
              onClick={() => { setSelected(amt); setCustom(""); }}
              className="py-3 rounded-xl font-bold text-base transition-all"
              style={{
                background: selected === amt && !custom ? `linear-gradient(135deg, #b8860b, ${GOLD})` : "rgba(212,175,55,0.07)",
                border: `1px solid ${selected === amt && !custom ? GOLD : "rgba(212,175,55,0.20)"}`,
                color: selected === amt && !custom ? "#011a10" : "rgba(255,255,255,0.75)",
                boxShadow: selected === amt && !custom ? `0 4px 16px rgba(212,175,55,0.35)` : "none",
              }}
            >
              ${amt}
            </button>
          ))}
        </div>
        <div className="mt-3 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold" style={{ color: GOLD }}>$</span>
          <input
            type="number"
            placeholder="Custom amount"
            value={custom}
            onChange={e => { setCustom(e.target.value); setSelected(null); }}
            className="w-full pl-8 pr-4 py-3 rounded-xl text-white text-sm font-semibold outline-none transition-all"
            style={{
              background: "rgba(212,175,55,0.06)",
              border: `1px solid ${custom ? GOLD : "rgba(212,175,55,0.18)"}`,
            }}
          />
        </div>
      </div>

      {/* Cause Selector */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Assign Funds To</p>
        <div className="relative">
          <button
            onClick={() => setCauseOpen(!causeOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${causeOpen ? GOLD : "rgba(212,175,55,0.20)"}` }}
          >
            <span>{causeLabel}</span>
            <ChevronDown className="w-4 h-4 transition-transform" style={{ color: GOLD, transform: causeOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          <AnimatePresence>
            {causeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-1 rounded-xl z-20 overflow-hidden"
                style={{ background: EMERALD_DARK, border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
              >
                {CAUSES.map(c => (
                  <button
                    key={c.value}
                    onClick={() => { setCause(c.value); setCauseOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:bg-[rgba(212,175,55,0.07)] hover:text-white transition-colors"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
                  >
                    {c.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Card Fields Mock */}
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.55)" }}>Card Details</p>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Cardholder Full Name"
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)", color: "white" }}
          />
          <input
            type="text"
            placeholder="Card Number"
            maxLength={19}
            className="w-full px-4 py-3 rounded-xl text-white text-sm font-mono outline-none"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)" }}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="MM / YY"
              maxLength={7}
              className="w-full px-4 py-3 rounded-xl text-white text-sm font-mono outline-none"
              style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)" }}
            />
            <input
              type="text"
              placeholder="CVV"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl text-white text-sm font-mono outline-none"
              style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)" }}
            />
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-2">
        {["Visa", "Mastercard", "256-bit SSL", "PCI-DSS"].map(b => (
          <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.4)" }}>
            <Lock className="w-2.5 h-2.5" />
            {b}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        className="w-full py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 40%, ${GOLD_LIGHT} 70%, ${GOLD} 100%)`,
          backgroundSize: "200% auto",
          color: "#011a10",
          boxShadow: `0 8px 32px rgba(212,175,55,0.45)`,
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "0.04em",
        }}
      >
        Donate {custom ? `$${custom}` : selected ? `$${selected}` : ""} {frequency === "monthly" ? "Monthly" : "Now"}
        <ArrowRight className="w-4 h-4 inline ml-2 -mt-0.5" />
      </button>
    </div>
  );
}

// ─── Tab B: Bank Wire ─────────────────────────────────────────────────────────
function BankTab() {
  const [cause, setCause] = useState(CAUSES[0].value);
  const [causeOpen, setCauseOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const causeLabel = CAUSES.find(c => c.value === cause)?.label ?? "";

  return (
    <div className="space-y-6">
      {/* Glassmorphic Bank Container */}
      <div
        className="rounded-2xl p-5 space-y-3"
        style={{
          background: "rgba(212,175,55,0.04)",
          border: "1px solid rgba(212,175,55,0.28)",
          boxShadow: "inset 0 1px 0 rgba(212,175,55,0.10), 0 16px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}>
            <Building2 className="w-4 h-4" style={{ color: GOLD }} />
          </div>
          <div>
            <p className="text-white text-sm font-bold">International Wire Transfer</p>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.55)" }}>Audit-Grade Banking Details</p>
          </div>
        </div>
        <CopyField label="Account Title" value="Son of Orakzai — Global Trust" mono={false} />
        <CopyField label="Bank Name" value="United Bank Limited (UBL)" mono={false} />
        <CopyField label="Account Number" value="0909318870498" />
        <CopyField label="IBAN" value="PK13UNIL0109000318870498" />
        <CopyField label="SWIFT / BIC Code" value="UNILPKKA" />
        <CopyField label="Branch Code" value="0109" />
        <div
          className="mt-2 px-4 py-3 rounded-xl text-xs"
          style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)", color: "rgba(255,255,255,0.45)" }}
        >
          For international donors: Include your country code and purpose of transfer (e.g. "Humanitarian Donation"). IBAN must be used for cross-border transfers.
        </div>
      </div>

      {/* Cause Selector */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Assign Funds To</p>
        <div className="relative">
          <button
            onClick={() => setCauseOpen(!causeOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${causeOpen ? GOLD : "rgba(212,175,55,0.20)"}` }}
          >
            <span>{causeLabel}</span>
            <ChevronDown className="w-4 h-4 transition-transform" style={{ color: GOLD, transform: causeOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          <AnimatePresence>
            {causeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full mt-1 rounded-xl z-20 overflow-hidden"
                style={{ background: EMERALD_DARK, border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
              >
                {CAUSES.map(c => (
                  <button
                    key={c.value}
                    onClick={() => { setCause(c.value); setCauseOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:bg-[rgba(212,175,55,0.07)] hover:text-white transition-colors"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
                  >
                    {c.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* File Upload */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Upload Wire Receipt / Transfer Screenshot</p>
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full py-6 rounded-xl flex flex-col items-center gap-3 transition-all hover:bg-[rgba(212,175,55,0.08)]"
          style={{
            border: `2px dashed ${file ? "rgba(34,197,94,0.5)" : "rgba(212,175,55,0.22)"}`,
            background: file ? "rgba(34,197,94,0.04)" : "rgba(212,175,55,0.03)",
          }}
        >
          {file ? (
            <>
              <FileText className="w-8 h-8" style={{ color: "#22c55e" }} />
              <p className="text-sm font-semibold text-green-400">{file.name}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Click to change file</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8" style={{ color: GOLD }} />
              <p className="text-sm font-semibold text-white/70">Drop your receipt here</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>PNG, JPG, or PDF — max 10 MB</p>
            </>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>

      <div
        className="px-4 py-3 rounded-xl text-center text-sm"
        style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.18)" }}
      >
        <p className="text-white/70">After transferring, WhatsApp your receipt to</p>
        <p className="font-bold text-base mt-0.5" style={{ color: GOLD }}>+92 336 7970004</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Instant digital receipt issued upon confirmation</p>
      </div>
    </div>
  );
}

// ─── Tab C: Crypto ────────────────────────────────────────────────────────────
const WALLETS = [
  {
    id: "usdt-polygon",
    label: "USDT (Polygon EVM)",
    symbol: "USDT",
    network: "Polygon",
    color: "#8247e5",
    address: "0x742d35Cc6634C0532925a3b8D4C9A3E2f3d1b6A7",
    icon: "🟣",
  },
  {
    id: "usdt-trc20",
    label: "USDT (TRC20 / Tron)",
    symbol: "USDT",
    network: "TRC20",
    color: "#ef0027",
    address: "TQkd1NqJouMkMDrXdDZZnRmH3xVTvX1234",
    icon: "🔴",
  },
  {
    id: "usdc",
    label: "USDC (Ethereum)",
    symbol: "USDC",
    network: "ERC20",
    color: "#2775ca",
    address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    icon: "🔵",
  },
  {
    id: "eth",
    label: "Ethereum (ETH)",
    symbol: "ETH",
    network: "Mainnet",
    color: "#627eea",
    address: "0x742d35Cc6634C0532925a3b8D4C9A3E2f3d1b6A7",
    icon: "⬡",
  },
  {
    id: "matic",
    label: "MATIC / POL",
    symbol: "MATIC",
    network: "Polygon",
    color: "#8247e5",
    address: "0x742d35Cc6634C0532925a3b8D4C9A3E2f3d1b6A7",
    icon: "💜",
  },
];

function CryptoTab() {
  const [selected, setSelected] = useState(WALLETS[0].id);
  const [cause, setCause] = useState(CAUSES[0].value);
  const [causeOpen, setCauseOpen] = useState(false);
  const wallet = WALLETS.find(w => w.id === selected)!;
  const causeLabel = CAUSES.find(c => c.value === cause)?.label ?? "";

  return (
    <div className="space-y-6">
      {/* Network Selector */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Select Network & Currency</p>
        <div className="grid grid-cols-1 gap-2">
          {WALLETS.map(w => (
            <button
              key={w.id}
              onClick={() => setSelected(w.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: selected === w.id ? `rgba(${w.color.replace('#','').match(/../g)?.map(x=>parseInt(x,16)).join(',')}, 0.12)` : "rgba(212,175,55,0.04)",
                border: `1px solid ${selected === w.id ? w.color + "66" : "rgba(212,175,55,0.14)"}`,
              }}
            >
              <span className="text-xl">{w.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">{w.label}</p>
                <p className="text-xs truncate font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{w.address.slice(0, 20)}…</p>
              </div>
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ border: `2px solid ${selected === w.id ? GOLD : "rgba(255,255,255,0.2)"}` }}
              >
                {selected === w.id && <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* QR Code + Address */}
      <div
        className="rounded-2xl p-5 flex flex-col items-center gap-4"
        style={{
          background: "rgba(212,175,55,0.04)",
          border: "1px solid rgba(212,175,55,0.22)",
          boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)",
        }}
      >
        <div>
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(212,175,55,0.55)" }}>
            {wallet.symbol} — {wallet.network}
          </p>
        </div>
        <div className="p-3 rounded-2xl" style={{ background: "white" }}>
          <QRCode value={wallet.address} size={160} level="H" />
        </div>
        <div className="w-full">
          <CopyField label="Wallet Address" value={wallet.address} />
        </div>
        <div
          className="w-full px-4 py-3 rounded-xl text-xs text-center"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", color: "rgba(255,255,255,0.5)" }}
        >
          ⚠️ Send only <strong className="text-white">{wallet.symbol}</strong> on the <strong className="text-white">{wallet.network}</strong> network. Wrong network = permanent loss.
        </div>
      </div>

      {/* Cause Selector */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Assign Funds To</p>
        <div className="relative">
          <button
            onClick={() => setCauseOpen(!causeOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${causeOpen ? GOLD : "rgba(212,175,55,0.20)"}` }}
          >
            <span>{causeLabel}</span>
            <ChevronDown className="w-4 h-4 transition-transform" style={{ color: GOLD, transform: causeOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          <AnimatePresence>
            {causeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full mt-1 rounded-xl z-20 overflow-hidden"
                style={{ background: EMERALD_DARK, border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
              >
                {CAUSES.map(c => (
                  <button
                    key={c.value}
                    onClick={() => { setCause(c.value); setCauseOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:bg-[rgba(212,175,55,0.07)] hover:text-white transition-colors"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
                  >
                    {c.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Connect Wallet CTA */}
      <button
        className="w-full py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
        style={{
          background: "linear-gradient(135deg, #3b1e9a, #6c3fe8)",
          color: "white",
          boxShadow: "0 8px 32px rgba(108,63,232,0.4)",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        <Wallet className="w-5 h-5" />
        Connect Wallet & Donate
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TABS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "wire", label: "Bank Wire Transfer", icon: Building2 },
  { id: "crypto", label: "Crypto & Web3", icon: Bitcoin },
];

export default function Donate() {
  const [tab, setTab] = useState("card");

  return (
    <MainLayout>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: `linear-gradient(160deg, ${EMERALD_DARK} 0%, #011208 50%, #031a0c 100%)` }}
      >
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD}55 30%, ${GOLD}99 50%, ${GOLD}55 70%, transparent 100%)` }} />

        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Overline */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD }}>Global Donation Portal</span>
              <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-5 leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fund the Future of Our{" "}
              <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Global Community
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
              100% Direct Allocation. Audit-Grade Transparency across{" "}
              <span style={{ color: GOLD_LIGHT }}>12+ Nations.</span>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <GoldBadge><ShieldCheck className="w-3.5 h-3.5" /> Zero Administrative Fees</GoldBadge>
              <GoldBadge><Zap className="w-3.5 h-3.5" /> Instant Digital Receipt</GoldBadge>
              <GoldBadge><Globe className="w-3.5 h-3.5" /> 12+ Nations Served</GoldBadge>
              <GoldBadge><Star className="w-3.5 h-3.5" /> Audit-Grade Transparency</GoldBadge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────────────────────────── */}
      <div
        className="py-4"
        style={{
          background: `linear-gradient(90deg, ${EMERALD_DARK} 0%, #021610 50%, ${EMERALD_DARK} 100%)`,
          borderTop: "1px solid rgba(212,175,55,0.10)",
          borderBottom: "1px solid rgba(212,175,55,0.10)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { num: "3,000+", label: "Years of Legacy" },
              { num: "12+", label: "Nations of Diaspora" },
              { num: "$0", label: "Admin Overhead" },
              { num: "100%", label: "Direct to Cause" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>{s.num}</p>
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Payment Gateway ─────────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: `linear-gradient(180deg, ${EMERALD_DARK} 0%, #011208 100%)` }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Gateway Card */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: EMERALD_CARD,
                border: "1px solid rgba(212,175,55,0.22)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.10)",
              }}
            >
              {/* Tab Switcher */}
              <div
                className="grid grid-cols-3 p-1 gap-1"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.12)", background: "rgba(0,0,0,0.25)" }}
              >
                {TABS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: tab === t.id ? `linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))` : "transparent",
                        border: `1px solid ${tab === t.id ? "rgba(212,175,55,0.35)" : "transparent"}`,
                        color: tab === t.id ? GOLD_LIGHT : "rgba(255,255,255,0.40)",
                        boxShadow: tab === t.id ? "inset 0 1px 0 rgba(212,175,55,0.10)" : "none",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:block text-center leading-tight">{t.label}</span>
                      <span className="sm:hidden text-center leading-tight text-[10px]">{t.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab === "card" && <CardTab />}
                    {tab === "wire" && <BankTab />}
                    {tab === "crypto" && <CryptoTab />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom trust note */}
            <div className="mt-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
                <Lock className="w-3 h-3" />
                <span>All transactions are encrypted with 256-bit SSL. Your data is never sold or shared.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Donate Section ──────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: `linear-gradient(180deg, #011208 0%, ${EMERALD_DARK} 100%)`, borderTop: "1px solid rgba(212,175,55,0.08)" }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Where Your Money Goes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Five Pillars of Impact
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {CAUSES.map((c, i) => (
              <motion.div
                key={c.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.14)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-lg"
                  style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.22)" }}
                >
                  {["🛡️", "🎓", "📈", "🆘", "🤝"][i]}
                </div>
                <p className="text-xs font-semibold text-white/80 leading-snug">{c.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
