import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Copy, CheckCheck, Upload, Wallet, CreditCard, Building2,
  Bitcoin, ShieldCheck, Zap, Globe, ChevronDown, Star, Lock,
  RefreshCw, ArrowRight, FileText, X, ExternalLink, BadgeCheck,
  AlertTriangle, Loader2, Send
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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

// ─── Web3 Types ──────────────────────────────────────────────────────────────
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isTrust?: boolean;
      isCoinbaseWallet?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}

// ─── Tab C: Crypto ────────────────────────────────────────────────────────────
const WALLETS = [
  {
    id: "usdt-polygon",
    label: "USDT (Polygon EVM)",
    symbol: "USDT",
    network: "Polygon",
    chainId: "0x89",
    color: "#8247e5",
    address: "0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7",
    icon: "🟣",
    evm: true,
    tokenContract: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // USDT on Polygon
  },
  {
    id: "usdt-trc20",
    label: "USDT (TRC20 / Tron)",
    symbol: "USDT",
    network: "TRC20",
    chainId: null,
    color: "#ef0027",
    address: "TZAczoo7d2iHKCxdt4KAQ7eGpQEm7FDVKM",
    icon: "🔴",
    evm: false,
    tokenContract: null,
  },
  {
    id: "usdc",
    label: "USDC (Ethereum)",
    symbol: "USDC",
    network: "ERC20",
    chainId: "0x1",
    color: "#2775ca",
    address: "0x9b02e2edd6f58d626aaa91889708dbf39dfa8cd7",
    icon: "🔵",
    evm: true,
    tokenContract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC on Ethereum
  },
  {
    id: "eth",
    label: "Ethereum (ETH)",
    symbol: "ETH",
    network: "Mainnet",
    chainId: "0x1",
    color: "#627eea",
    address: "0x9b02e2edd6f58d626aaa91889708dbf39dfa8cd7",
    icon: "⬡",
    evm: true,
    tokenContract: null,
  },
  {
    id: "matic",
    label: "MATIC / POL",
    symbol: "MATIC",
    network: "Polygon",
    chainId: "0x89",
    color: "#8247e5",
    address: "0x9b02e2edd6f58d626aaa91889708dbf39dfa8cd7",
    icon: "💜",
    evm: true,
    tokenContract: null,
  },
];

// ERC-20 transfer ABI encoded: transfer(address,uint256)
function encodeERC20Transfer(to: string, amount: bigint): string {
  const selector = "0xa9059cbb";
  const paddedTo = to.replace("0x", "").padStart(64, "0");
  const paddedAmount = amount.toString(16).padStart(64, "0");
  return selector + paddedTo + paddedAmount;
}

type WalletStatus = "idle" | "connecting" | "connected" | "error";

const WALLET_OPTIONS = [
  { id: "metamask", name: "MetaMask", icon: "🦊", deeplink: "https://metamask.app.link/dapp/sonoforakzai.vercel.app/donate" },
  { id: "trust", name: "Trust Wallet", icon: "🛡️", deeplink: "https://link.trustwallet.com/open_url?coin_id=60&url=https://sonoforakzai.vercel.app/donate" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", deeplink: "https://go.cb-w.com/dapp?cb_url=https://sonoforakzai.vercel.app/donate" },
  { id: "injected", name: "Browser Wallet", icon: "🌐", deeplink: null },
];

function WalletModal({ onClose, onConnect }: { onClose: () => void; onConnect: (addr: string) => void }) {
  const [status, setStatus] = useState<"pick" | "connecting" | "error">("pick");
  const [errMsg, setErrMsg] = useState("");

  const tryConnect = useCallback(async () => {
    if (!window.ethereum) return false;
    try {
      setStatus("connecting");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      if (accounts?.[0]) {
        onConnect(accounts[0]);
        return true;
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Connection rejected";
      setErrMsg(msg.includes("rejected") ? "Connection cancelled by user." : msg);
      setStatus("error");
    }
    return false;
  }, [onConnect]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="w-full max-w-sm rounded-3xl overflow-hidden"
          style={{
            background: "#031a0e",
            border: "1px solid rgba(212,175,55,0.28)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,175,55,0.12)",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Orakzai.Org Verified Badge */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.28)" }}
              >
                <img src="/orakzai-org-logo.png" alt="Orakzai.Org" className="w-8 h-8 rounded-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Orakzai.Org</p>
                  <BadgeCheck className="w-4 h-4" style={{ color: "#3b82f6" }} />
                </div>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.55)" }}>Verified Humanitarian dApp</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Gold separator */}
          <div className="h-px mx-6" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />

          <div className="p-6 space-y-3">
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#f87171" }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errMsg}</span>
              </motion.div>
            )}

            {status === "connecting" && (
              <div className="flex flex-col items-center py-6 gap-3">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: GOLD }} />
                <p className="text-white/60 text-sm">Waiting for wallet approval…</p>
                <p className="text-xs" style={{ color: "rgba(212,175,55,0.5)" }}>Check your wallet app</p>
              </div>
            )}

            {status !== "connecting" && WALLET_OPTIONS.map(opt => {
              const isInstalled = opt.id === "metamask" ? !!window.ethereum?.isMetaMask
                : opt.id === "trust" ? !!window.ethereum?.isTrust
                : opt.id === "coinbase" ? !!window.ethereum?.isCoinbaseWallet
                : !!window.ethereum;

              return (
                <button
                  key={opt.id}
                  onClick={async () => {
                    if (isInstalled) {
                      await tryConnect();
                    } else if (opt.deeplink) {
                      window.open(opt.deeplink, "_blank");
                    } else {
                      setErrMsg("No wallet detected. Install MetaMask or Trust Wallet.");
                      setStatus("error");
                    }
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                    {opt.icon}
                  </span>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold text-sm">{opt.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {isInstalled ? "Detected — click to connect" : "Tap to install / open app"}
                    </p>
                  </div>
                  {isInstalled
                    ? <div className="w-2 h-2 rounded-full bg-green-400" />
                    : <ExternalLink className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.25)" }} />
                  }
                </button>
              );
            })}

            <p className="text-center text-[10px] pt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              By connecting you agree to our terms. Your keys stay in your wallet — we never access them.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CryptoTab() {
  const [selected, setSelected] = useState(WALLETS[0].id);
  const [cause, setCause] = useState(CAUSES[0].value);
  const [causeOpen, setCauseOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("idle");
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txStatus, setTxStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [amount, setAmount] = useState("50");

  const wallet = WALLETS.find(w => w.id === selected)!;
  const causeLabel = CAUSES.find(c => c.value === cause)?.label ?? "";

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccChange = (accounts: unknown) => {
      const accs = accounts as string[];
      if (accs.length === 0) {
        setConnectedAddress(null);
        setWalletStatus("idle");
      } else {
        setConnectedAddress(accs[0]);
      }
    };
    window.ethereum.on("accountsChanged", handleAccChange);
    return () => window.ethereum?.removeListener("accountsChanged", handleAccChange);
  }, []);

  const handleConnected = useCallback((addr: string) => {
    setConnectedAddress(addr);
    setWalletStatus("connected");
    setShowModal(false);
  }, []);

  const sendDonation = useCallback(async () => {
    if (!window.ethereum || !connectedAddress || !wallet.evm) return;
    setTxStatus("pending");
    try {
      // Switch to correct network first
      if (wallet.chainId) {
        try {
          await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: wallet.chainId }] });
        } catch {
          // Add Polygon if not present
          if (wallet.chainId === "0x89") {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              }],
            });
          }
        }
      }

      const amtNum = parseFloat(amount) || 50;
      let txParams: Record<string, string>;

      if (wallet.tokenContract) {
        // ERC-20 token transfer
        const amtWei = BigInt(Math.floor(amtNum * 1_000_000)); // USDT/USDC = 6 decimals
        const data = encodeERC20Transfer(wallet.address, amtWei);
        txParams = { from: connectedAddress, to: wallet.tokenContract, data, value: "0x0" };
      } else {
        // Native token (ETH / MATIC)
        const amtWei = BigInt(Math.floor(amtNum * 1e18));
        txParams = { from: connectedAddress, to: wallet.address, value: "0x" + amtWei.toString(16) };
      }

      const hash = await window.ethereum.request({ method: "eth_sendTransaction", params: [txParams] }) as string;
      setTxHash(hash);
      setTxStatus("sent");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      if (!msg.includes("rejected") && !msg.includes("denied")) setTxStatus("error");
      else setTxStatus("idle");
    }
  }, [connectedAddress, wallet, amount]);

  const shortAddr = connectedAddress ? `${connectedAddress.slice(0, 6)}…${connectedAddress.slice(-4)}` : "";

  return (
    <div className="space-y-6">
      {/* Wallet Modal */}
      {showModal && <WalletModal onClose={() => setShowModal(false)} onConnect={handleConnected} />}

      {/* Connected Badge */}
      {connectedAddress && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.30)" }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(59,130,246,0.15)" }}>
            <BadgeCheck className="w-4 h-4" style={{ color: "#3b82f6" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-bold text-sm">Connected to Orakzai.Org</p>
              <BadgeCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "#3b82f6" }} />
            </div>
            <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{shortAddr}</p>
          </div>
          <button
            onClick={() => { setConnectedAddress(null); setWalletStatus("idle"); setTxStatus("idle"); setTxHash(null); }}
            className="text-xs px-2.5 py-1 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            Disconnect
          </button>
        </motion.div>
      )}

      {/* Network Selector */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Select Network & Currency</p>
        <div className="grid grid-cols-1 gap-2">
          {WALLETS.map(w => (
            <button
              key={w.id}
              onClick={() => { setSelected(w.id); setTxStatus("idle"); setTxHash(null); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: selected === w.id ? `rgba(${w.color.replace('#','').match(/../g)?.map((x: string)=>parseInt(x,16)).join(',')}, 0.12)` : "rgba(212,175,55,0.04)",
                border: `1px solid ${selected === w.id ? w.color + "66" : "rgba(212,175,55,0.14)"}`,
              }}
            >
              <span className="text-xl">{w.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">{w.label}</p>
                <p className="text-xs truncate font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{w.address.slice(0, 20)}…</p>
              </div>
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ border: `2px solid ${selected === w.id ? GOLD : "rgba(255,255,255,0.2)"}` }}>
                {selected === w.id && <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* QR Code + Address */}
      <div
        className="rounded-2xl p-5 flex flex-col items-center gap-4"
        style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.22)", boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)" }}
      >
        <p className="text-center text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.55)" }}>
          {wallet.symbol} — {wallet.network}
        </p>
        <div className="p-3 rounded-2xl" style={{ background: "white" }}>
          <QRCodeSVG value={wallet.address} size={160} level="H" />
        </div>
        <div className="w-full">
          <CopyField label="Wallet Address" value={wallet.address} />
        </div>
        <div className="w-full px-4 py-3 rounded-xl text-xs text-center"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", color: "rgba(255,255,255,0.5)" }}>
          ⚠️ Send only <strong className="text-white">{wallet.symbol}</strong> on the <strong className="text-white">{wallet.network}</strong> network. Wrong network = permanent loss.
        </div>
      </div>

      {/* Amount (for connected wallet send) */}
      {connectedAddress && wallet.evm && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Donation Amount ({wallet.symbol})</p>
          <div className="flex gap-2">
            {[10, 25, 50, 100].map(a => (
              <button key={a} onClick={() => setAmount(String(a))}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: amount === String(a) ? `linear-gradient(135deg, #b8860b, ${GOLD})` : "rgba(212,175,55,0.07)",
                  border: `1px solid ${amount === String(a) ? GOLD : "rgba(212,175,55,0.18)"}`,
                  color: amount === String(a) ? "#011a10" : "rgba(255,255,255,0.7)",
                }}>
                {a}
              </button>
            ))}
          </div>
          <input type="number" placeholder="Custom amount" value={amount} onChange={e => setAmount(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-xl text-white text-sm font-mono outline-none"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)" }} />
        </div>
      )}

      {/* Cause Selector */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>Assign Funds To</p>
        <div className="relative">
          <button onClick={() => setCauseOpen(!causeOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${causeOpen ? GOLD : "rgba(212,175,55,0.20)"}` }}>
            <span>{causeLabel}</span>
            <ChevronDown className="w-4 h-4 transition-transform" style={{ color: GOLD, transform: causeOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          <AnimatePresence>
            {causeOpen && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full mt-1 rounded-xl z-20 overflow-hidden"
                style={{ background: EMERALD_DARK, border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
                {CAUSES.map(c => (
                  <button key={c.value} onClick={() => { setCause(c.value); setCauseOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:bg-[rgba(212,175,55,0.07)] hover:text-white transition-colors"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
                    {c.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tx Success */}
      {txStatus === "sent" && txHash && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 px-4 py-4 rounded-2xl"
          style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.28)" }}>
          <BadgeCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-green-400 font-bold text-sm">Transaction Submitted!</p>
            <p className="text-xs text-white/50 mt-0.5 break-all font-mono">{txHash.slice(0, 20)}…</p>
            <a href={`https://${wallet.network === "Polygon" ? "polygonscan.com" : "etherscan.io"}/tx/${txHash}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs mt-1.5 text-green-400/80 hover:text-green-300">
              View on Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      {!connectedAddress ? (
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
          style={{
            background: "linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)",
            color: "white",
            boxShadow: "0 8px 32px rgba(37,99,235,0.45)",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet & Donate
          <BadgeCheck className="w-4 h-4 opacity-80" />
        </button>
      ) : wallet.evm ? (
        <button
          onClick={sendDonation}
          disabled={txStatus === "pending"}
          className="w-full py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-60"
          style={{
            background: txStatus === "pending"
              ? "rgba(212,175,55,0.15)"
              : `linear-gradient(135deg, #b8860b 0%, ${GOLD} 40%, ${GOLD_LIGHT} 70%, ${GOLD} 100%)`,
            color: txStatus === "pending" ? GOLD : "#011a10",
            boxShadow: txStatus === "pending" ? "none" : `0 8px 32px rgba(212,175,55,0.45)`,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {txStatus === "pending" ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Confirm in Wallet…</>
          ) : (
            <><Send className="w-4 h-4" /> Send {amount} {wallet.symbol} Now</>
          )}
        </button>
      ) : (
        <div className="px-4 py-3 rounded-xl text-sm text-center" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)", color: "rgba(255,255,255,0.55)" }}>
          TRC20 (Tron) network — scan QR or copy address above to send from your Tron-compatible wallet.
        </div>
      )}
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
