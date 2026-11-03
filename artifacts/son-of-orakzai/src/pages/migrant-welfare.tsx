import { createElement, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  FileUp,
  LockKeyhole,
  Search,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { SiBinance, SiBitcoin, SiEthereum, SiPolygon, SiSolana } from "react-icons/si";

const COLORS = {
  forest: "#031B13",
  emerald: "#06271B",
  gold: "#D6B44C",
  ivory: "#F5F1E7",
  sage: "#A6B3A9",
} as const;

const CANONICAL = "https://orakzai.org/migrant-welfare";
const TITLE = "Orakzai.org Migrant Welfare | Membership & Protection Services";
const DESCRIPTION =
  "Apply for Orakzai.org Migrant Welfare membership, access application tracking, submit documents and explore migrant protection and community support services.";
const steps = ["Personal", "Migrant profile", "Package", "Payment", "Review"];
const packages = [
  {
    id: "standard",
    name: "Standard Membership",
    description: "Core membership intake for migrant and diaspora support services.",
    fee: "PKR 1,500 / month",
    duration: "Monthly membership",
  },
  {
    id: "family",
    name: "Family Membership",
    description: "A family application option subject to eligibility and administrator review.",
    fee: "PKR 5,000 / month",
    duration: "Monthly membership",
  },
];
const paymentMethods = ["EasyPaisa", "JazzCash", "Bank Transfer", "Crypto / digital assets"];
const paymentInstructions: Record<string, { title: string; lines: string[]; note: string }> = {
  EasyPaisa: { title: "EasyPaisa account", lines: ["Account name: Muhammad Faisal", "Account number: 03367970004"], note: "Send only to this verified recipient and keep the transaction reference." },
  JazzCash: { title: "JazzCash account", lines: ["Account name: Muhammad Faisal", "Account number: 03367970004"], note: "Send only to this verified recipient and keep the transaction reference." },
  "Bank Transfer": { title: "UBL Bank transfer", lines: ["Bank: UBL Bank"], note: "Verified UBL account number / IBAN will appear here once configured. Do not send funds until the full official details are visible." },
  "Crypto / digital assets": { title: "Crypto payment", lines: ["USDT · USDC · Bitcoin · Ethereum · Polygon", "BNB Chain · Solana · Tron · Avalanche · Orakzai Bond"], note: "Wallet addresses will appear only after verified organizational addresses are configured. Never send crypto to an unverified address." },
};

// Addresses were checked against the wallet QR images supplied in the connected Drive folder.
const cryptoNetworks = [
  { id: "tron", name: "TRON · TRC20", logo: null, symbol: "T", color: "#EF0027", intro: "Select TRON / TRC20 on your exchange or wallet.", address: "TZAczoo7d2iHKCxdt4KAQ7eGpQEm7FDVKM", qrImage: "/crypto-wallet-qrs/tron.jpg" },
  { id: "ethereum", name: "Ethereum · ERC20", logo: SiEthereum, color: "#627EEA", intro: "Select Ethereum / ERC20. Ethereum network fees apply.", address: "0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7", qrImage: "/crypto-wallet-qrs/ethereum.jpg" },
  { id: "bnb", name: "BNB Smart Chain · BEP20", logo: SiBinance, color: "#F3BA2F", intro: "Select BNB Smart Chain / BEP20.", address: "0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7", qrImage: "/crypto-wallet-qrs/bnb.jpg" },
  { id: "polygon", name: "Polygon", logo: SiPolygon, color: "#8247E5", intro: "Select Polygon network.", address: "0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7", qrImage: "/crypto-wallet-qrs/polygon.jpg" },
  { id: "arbitrum", name: "Arbitrum One", logo: null, symbol: "A", color: "#28A0F0", intro: "Select Arbitrum One network.", address: "0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7", qrImage: "/crypto-wallet-qrs/arbitrum.jpg" },
  { id: "solana", name: "Solana", logo: SiSolana, color: "#9945FF", intro: "Select Solana network.", address: "BErcmzVQymkFEiBjTQTGGDDEev3iRApV8tKgUyc3n8VY", qrImage: "/crypto-wallet-qrs/solana.jpg" },
  { id: "bitcoin", name: "Bitcoin · BTC", logo: SiBitcoin, color: "#F7931A", intro: "Send BTC using the Bitcoin network only.", address: "bc1qvdttdxn53t8pf687cp3ev7j0k5zrjgmaucjgzc", qrImage: "/crypto-wallet-qrs/bitcoin.jpg" },
] as const;

type FormData = {
  fullName: string;
  parentName: string;
  dob: string;
  gender: string;
  nationality: string;
  identityNumber: string;
  currentCountry: string;
  currentCity: string;
  originDistrict: string;
  employmentStatus: string;
  occupation: string;
  emergencyContact: string;
  familyInfo: string;
  packageId: string;
  paymentMethod: string;
  cryptoNetwork: string;
  transactionReference: string;
  consent: boolean;
};

const emptyForm: FormData = {
  fullName: "",
  parentName: "",
  dob: "",
  gender: "",
  nationality: "",
  identityNumber: "",
  currentCountry: "",
  currentCity: "",
  originDistrict: "",
  employmentStatus: "",
  occupation: "",
  emergencyContact: "",
  familyInfo: "",
  packageId: "",
  paymentMethod: "",
  cryptoNetwork: "",
  transactionReference: "",
  consent: false,
};

function usePortalSeo() {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = TITLE;
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", DESCRIPTION);
    setMeta("keywords", "migrant welfare, Orakzai diaspora, membership, application tracking, community protection");
    setMeta("robots", "index, follow");
    setMeta("og:title", TITLE, true);
    setMeta("og:description", DESCRIPTION, true);
    setMeta("og:url", CANONICAL, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Orakzai.org", true);
    setMeta("og:image", "https://orakzai.org/orakzai-org-logo.png", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", TITLE);
    setMeta("twitter:description", DESCRIPTION);
    setMeta("twitter:image", "https://orakzai.org/orakzai-org-logo.png");
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const oldCanonical = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL;
    const schema = document.createElement("script");
    schema.id = "migrant-welfare-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", name: "Orakzai.org", url: "https://orakzai.org", logo: "https://orakzai.org/orakzai-org-logo.png" },
        { "@type": "WebPage", url: CANONICAL, name: TITLE, description: DESCRIPTION, isPartOf: { "@type": "WebSite", name: "Orakzai.org", url: "https://orakzai.org" } },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://orakzai.org/" }, { "@type": "ListItem", position: 2, name: "Migrant Welfare", item: CANONICAL }] },
      ],
    });
    document.getElementById(schema.id)?.remove();
    document.head.appendChild(schema);
    return () => {
      document.title = oldTitle;
      document.getElementById(schema.id)?.remove();
      if (oldCanonical) canonical!.href = oldCanonical;
      else canonical?.remove();
    };
  }, []);
}

function Field({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="text-sm text-white/75">{label}{required && <span className="ml-1 text-[#D6B44C]">*</span>}</Label>{children}</div>;
}

function inputClass() {
  return "h-12 border-white/10 bg-[#02150e]/80 text-white placeholder:text-white/30 focus-visible:ring-[#D6B44C]";
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-[#D6B44C]/30 bg-[#D6B44C]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#D6B44C]">{children}</span>;
}

function Progress({ current }: { current: number }) {
  return <div className="mb-8"><div className="mb-4 flex items-center justify-between text-xs text-white/50"><span>Application progress</span><span className="font-semibold text-[#D6B44C]">{current + 1} / {steps.length}</span></div><div className="grid grid-cols-5 gap-2">{steps.map((name, index) => <div key={name} className="space-y-2"><div className={`h-1.5 rounded-full ${index <= current ? "bg-[#D6B44C]" : "bg-white/10"}`} /><p className={`hidden text-[10px] uppercase tracking-wider sm:block ${index === current ? "text-[#D6B44C]" : "text-white/35"}`}>{name}</p></div>)}</div></div>;
}

function PackageCard({ value, selected, onSelect }: { value: typeof packages[number]; selected: boolean; onSelect: () => void }) {
  return <button type="button" onClick={onSelect} aria-pressed={selected} className={`w-full rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 ${selected ? "border-[#D6B44C] bg-[#D6B44C]/10 shadow-[0_12px_40px_rgba(214,180,76,.08)]" : "border-white/10 bg-black/15 hover:border-[#D6B44C]/50"}`}><div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-semibold text-[#F5F1E7]">{value.name}</h3><p className="mt-2 text-sm leading-relaxed text-white/55">{value.description}</p></div><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#D6B44C] bg-[#D6B44C] text-[#031B13]" : "border-white/20 text-transparent"}`}><Check className="h-4 w-4" /></span></div><div className="mt-5 grid gap-2 border-t border-white/10 pt-4 text-xs text-white/45 sm:grid-cols-2"><span>{value.fee}</span><span>{value.duration}</span></div></button>;
}

function TrackApplication() {
  const { toast } = useToast();
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const search = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setResult(null);
    const { data, error } = await supabase.rpc("track_migrant_application", { p_application_number: id.trim(), p_tracking_token: token.trim() });
    setLoading(false); const record = Array.isArray(data) ? data[0] : data;
    if (error || !record) { toast({ title: "Application not found", description: "Check your application number and secure tracking token.", variant: "destructive" }); return; }
    setResult(record);
  };
  return <div className="rounded-2xl border border-[#D6B44C]/20 bg-[#06271B]/70 p-6"><div className="mb-5 flex items-start gap-3"><Search className="mt-0.5 h-5 w-5 text-[#D6B44C]" /><div><h3 className="font-semibold text-[#F5F1E7]">Track an application</h3><p className="mt-1 text-xs leading-relaxed text-white/45">Use the application ID and secure token from your confirmation.</p></div></div><form onSubmit={search} className="space-y-3"><Input value={id} onChange={(e) => setId(e.target.value)} placeholder="ORK-MW-2026-000001" aria-label="Application ID" required className={inputClass()} /><Input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Secure tracking token" aria-label="Secure tracking token" required className={inputClass()} /><Button disabled={loading} type="submit" className="h-12 w-full" style={{ background: COLORS.gold, color: COLORS.forest }}>{loading ? "Checking…" : "Check application status"}</Button></form>{result && <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3"><div><p className="text-xs text-white/45">Application</p><p className="font-semibold text-white">{result.application_number}</p></div><div><p className="text-xs text-white/45">Status</p><StatusPill>{result.status}</StatusPill></div><div><p className="text-xs text-white/45">Payment</p><StatusPill>{result.payment_status}</StatusPill></div></div>}</div>;
}

export default function MigrantWelfare() {
  usePortalSeo();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const set = (key: keyof FormData, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const selectedPackage = useMemo(() => packages.find((pkg) => pkg.id === form.packageId), [form.packageId]);
  const selectedCryptoNetwork = cryptoNetworks.find((network) => network.id === form.cryptoNetwork);
  const copyCryptoAddress = async () => {
    if (!selectedCryptoNetwork?.address) return;
    try {
      await navigator.clipboard.writeText(selectedCryptoNetwork.address);
      toast({ title: "Wallet address copied", description: `Copied ${selectedCryptoNetwork.name} address.` });
    } catch {
      toast({ title: "Could not copy address", description: "Please select and copy the address manually.", variant: "destructive" });
    }
  };
  const next = () => {
    const required: Record<number, (keyof FormData)[]> = { 0: ["fullName", "parentName", "dob", "gender", "nationality"], 1: ["currentCountry", "currentCity", "originDistrict", "employmentStatus", "occupation", "emergencyContact"], 2: ["packageId"], 3: ["paymentMethod", "transactionReference"] };
    if (required[step]?.some((key) => !String(form[key]).trim())) { toast({ title: "Complete this step", description: "Please provide the required information before continuing.", variant: "destructive" }); return; }
    if (step === 3 && form.paymentMethod === "Crypto / digital assets") {
      if (!selectedCryptoNetwork) { toast({ title: "Select a crypto network", description: "Choose the exact network shown by your sending wallet or exchange.", variant: "destructive" }); return; }
      if (!selectedCryptoNetwork.address) { toast({ title: "Crypto deposits unavailable", description: `A verified ${selectedCryptoNetwork.name} wallet has not been configured. Do not send funds; contact the organization.`, variant: "destructive" }); return; }
    }
    setStep((value) => Math.min(4, value + 1));
  };
  const selectFile = (file: File | undefined, type: "photo" | "receipt") => {
    if (!file) return;
    const allowed = type === "photo" ? file.type.startsWith("image/") : file.type.startsWith("image/") || file.type === "application/pdf";
    if (!allowed || file.size > 5 * 1024 * 1024) { toast({ title: "File not accepted", description: "Use an image or PDF up to 5 MB.", variant: "destructive" }); return; }
    type === "photo" ? setPhoto(file) : setReceipt(file);
  };
  const submit = async () => {
    if (!form.consent) { toast({ title: "Consent required", description: "Please confirm the privacy and review consent before submitting.", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const upload = async (file: File | null, prefix: string) => { if (!file) return null; const path = `${prefix}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`; const { error } = await supabase.storage.from("migrant-documents").upload(path, file, { upsert: false, contentType: file.type }); if (error) throw error; return path; };
      const [photoPath, receiptPath] = await Promise.all([upload(photo, "profiles"), upload(receipt, "receipts")]);
      const { data, error } = await supabase.rpc("submit_migrant_application", { application_payload: { ...form, profilePhotoPath: photoPath, receiptPath } });
      if (error) throw new Error(error.message || error.details || "The application could not be saved.");
      const record = Array.isArray(data) ? data[0] : data;
      if (!record?.application_number) throw new Error("The database did not return an application number. Please contact the administrator.");
      setSubmitted(record);
      toast({ title: "Application submitted", description: `Your application ID is ${record.application_number}.` });
    } catch (error: any) { toast({ title: "Submission unavailable", description: error?.message || "Please try again after the database setup is completed.", variant: "destructive" }); } finally { setSaving(false); }
  };
  const reset = () => { setForm(emptyForm); setPhoto(null); setReceipt(null); setSubmitted(null); setStep(0); };
  return <MainLayout><main style={{ background: COLORS.forest, color: COLORS.ivory }}>
    <section className="relative overflow-hidden border-b border-[#D6B44C]/20"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,180,76,.14),transparent_58%)]" /><div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28"><div className="max-w-3xl"><StatusPill>Orakzai.org · Migrant welfare portal</StatusPill><h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-7xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>A considered path to <span className="text-[#D6B44C]">community protection.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/60 md:text-lg">Apply for migrant welfare membership, submit your information securely, and keep visibility on your application from submission through authorized review.</p><div className="mt-8 flex flex-wrap gap-3 text-xs text-white/50"><span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"><LockKeyhole className="h-3.5 w-3.5 text-[#D6B44C]" /> Secure document handling</span><span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"><ShieldCheck className="h-3.5 w-3.5 text-[#D6B44C]" /> Review before approval</span></div></div></div></section>
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20"><div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]"><div className="rounded-3xl border border-[#D6B44C]/20 bg-[#06271B]/70 p-5 shadow-2xl shadow-black/20 sm:p-8"><div className="mb-8 flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6B44C]/10 text-[#D6B44C]"><ShieldCheck className="h-6 w-6" /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#D6B44C]">Secure intake</p><h2 className="mt-1 text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Migrant welfare application</h2><p className="mt-2 text-sm text-white/45">Five short steps. Save your confirmation details at the end.</p></div></div>{submitted ? <div className="rounded-2xl border border-[#D6B44C]/30 bg-[#D6B44C]/10 p-7 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-[#D6B44C]" /><h3 className="mt-5 text-2xl font-semibold">Application received</h3><p className="mt-3 text-sm leading-relaxed text-white/60">Your application is submitted for review and payment verification. This is not an approval or membership activation.</p><div className="mt-6 rounded-xl border border-[#D6B44C]/20 p-4"><p className="text-xs uppercase tracking-[.16em] text-white/45">Application ID</p><p className="mt-2 font-mono text-xl font-bold text-[#D6B44C]">{submitted.application_number}</p><p className="mt-3 break-all text-xs text-white/45">Tracking token: {submitted.tracking_token}</p></div><Button onClick={reset} className="mt-6" style={{ background: COLORS.gold, color: COLORS.forest }}>Start another application</Button></div> : <><Progress current={step} /><div className="space-y-5">{step === 0 && <><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" required><Input autoComplete="name" className={inputClass()} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} /></Field><Field label="Father's / Husband's name" required><Input className={inputClass()} value={form.parentName} onChange={(e) => set("parentName", e.target.value)} /></Field><Field label="Date of birth" required><Input type="date" className={inputClass()} value={form.dob} onChange={(e) => set("dob", e.target.value)} /></Field><Field label="Gender" required><select className={`${inputClass()} w-full rounded-md px-3`} value={form.gender} onChange={(e) => set("gender", e.target.value)}><option value="">Select</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></Field><Field label="Nationality" required><Input className={inputClass()} value={form.nationality} onChange={(e) => set("nationality", e.target.value)} /></Field><Field label="CNIC / passport number"><Input className={inputClass()} value={form.identityNumber} onChange={(e) => set("identityNumber", e.target.value)} /></Field></div><Field label="Profile photograph"><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D6B44C]/30 p-4 text-sm text-white/55 hover:bg-white/5"><UploadCloud className="h-5 w-5 text-[#D6B44C]" />{photo ? photo.name : "Choose a photograph (optional, max 5 MB)"}<input type="file" accept="image/*" className="hidden" onChange={(e) => selectFile(e.target.files?.[0], "photo")} /></label></Field></>}{step === 1 && <><div className="grid gap-5 sm:grid-cols-2"><Field label="Current country" required><Input autoComplete="country-name" className={inputClass()} value={form.currentCountry} onChange={(e) => set("currentCountry", e.target.value)} /></Field><Field label="Current city" required><Input className={inputClass()} value={form.currentCity} onChange={(e) => set("currentCity", e.target.value)} /></Field><Field label="Pakistani district of origin" required><Input className={inputClass()} value={form.originDistrict} onChange={(e) => set("originDistrict", e.target.value)} /></Field><Field label="Employment status" required><select className={`${inputClass()} w-full rounded-md px-3`} value={form.employmentStatus} onChange={(e) => set("employmentStatus", e.target.value)}><option value="">Select</option><option>Employed</option><option>Self-employed</option><option>Student</option><option>Seeking work</option><option>Other</option></select></Field><Field label="Occupation" required><Input className={inputClass()} value={form.occupation} onChange={(e) => set("occupation", e.target.value)} /></Field><Field label="Emergency contact" required><Input className={inputClass()} value={form.emergencyContact} onChange={(e) => set("emergencyContact", e.target.value)} /></Field></div><Field label="Family information (optional)"><textarea className="min-h-24 w-full rounded-md border border-white/10 bg-[#02150e]/80 p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D6B44C]" value={form.familyInfo} onChange={(e) => set("familyInfo", e.target.value)} /></Field></>}{step === 2 && <div className="space-y-4">{packages.map((pkg) => <PackageCard key={pkg.id} value={pkg} selected={form.packageId === pkg.id} onSelect={() => set("packageId", pkg.id)} />)}<p className="text-xs leading-relaxed text-white/45">Fees, duration and benefits are administrator-configured. No fee or benefit is represented until officially verified and published.</p></div>}{step === 3 && <><div className="rounded-xl border border-[#D6B44C]/20 bg-black/15 p-4 text-sm text-white/60"><p className="font-semibold text-white">Selected package: {selectedPackage?.name}</p><p className="mt-1 leading-relaxed">Payment details are shown only when verified organizational details are configured. Do not send money to an unverified account.</p></div><Field label="Payment method" required><select className={`${inputClass()} w-full rounded-md px-3`} value={form.paymentMethod} onChange={(e) => { set("paymentMethod", e.target.value); set("cryptoNetwork", ""); }}><option value="">Select</option>{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></Field>{form.paymentMethod === "Crypto / digital assets" ? <div className="space-y-4 rounded-xl border border-[#D6B44C]/30 bg-[#D6B44C]/10 p-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#D6B44C]">Choose deposit network</p><p className="mt-2 text-xs leading-relaxed text-white/55">Select the same asset and network as in your exchange or wallet (for example, Bybit or MEXC). Sending on a different network may permanently lose funds.</p></div><div className="grid gap-2">{cryptoNetworks.map((network) => <button type="button" key={network.id} onClick={() => set("cryptoNetwork", network.id)} aria-pressed={form.cryptoNetwork === network.id} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${form.cryptoNetwork === network.id ? "border-[#D6B44C] bg-[#D6B44C]/10" : "border-white/10 bg-black/15 hover:border-[#D6B44C]/50"}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white" style={{ backgroundColor: network.color }}>{network.logo ? createElement(network.logo, { className: "h-5 w-5 text-white" }) : <span className="text-lg font-bold text-white">{network.symbol}</span>}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-white">{network.name}</span><span className="mt-1 block text-xs leading-relaxed text-white/50">{network.intro}</span></span><span className={`h-4 w-4 shrink-0 rounded-full border ${form.cryptoNetwork === network.id ? "border-[#D6B44C] bg-[#D6B44C]" : "border-white/30"}`} /></button>)}</div>{selectedCryptoNetwork && <div className="rounded-xl border border-white/10 bg-[#02150e]/80 p-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#D6B44C]">{selectedCryptoNetwork.name} deposit details</p>{selectedCryptoNetwork.address ? <><p className="mt-2 text-xs leading-relaxed text-white/60">Send only the asset supported on this exact network; selecting a network here does not confirm token support.</p><div className="mt-3 flex flex-col gap-3 sm:flex-row"><code className="min-w-0 flex-1 break-all rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-white">{selectedCryptoNetwork.address}</code><Button type="button" onClick={copyCryptoAddress} className="gap-2" style={{ background: COLORS.gold, color: COLORS.forest }}><Copy className="h-4 w-4" /> Copy address</Button></div><div className="mt-4 flex justify-center rounded-xl bg-white p-4"><img src={selectedCryptoNetwork.qrImage} alt={`${selectedCryptoNetwork.name} deposit QR code`} className="h-48 w-48 object-contain" /></div><p className="mt-3 text-center text-xs text-white/55">Scan this QR only after confirming the network and address.</p></> : <div className="mt-3 rounded-lg border border-amber-300/20 bg-amber-300/5 p-3"><p className="text-sm font-semibold text-amber-100">Verified wallet address not configured</p><p className="mt-1 text-xs leading-relaxed text-white/60">Deposits for this network are unavailable. No address or QR will be shown until an official wallet is configured. Do not send funds.</p></div>}</div>}</div> : form.paymentMethod ? <div className="rounded-xl border border-[#D6B44C]/30 bg-[#D6B44C]/10 p-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#D6B44C]">{paymentInstructions[form.paymentMethod].title}</p><div className="mt-3 space-y-1 text-sm font-medium text-white">{paymentInstructions[form.paymentMethod].lines.map((line) => <p key={line}>{line}</p>)}</div><p className="mt-3 text-xs leading-relaxed text-white/55">{paymentInstructions[form.paymentMethod].note}</p></div> : null}<Field label="Transaction reference" required><Input className={inputClass()} value={form.transactionReference} onChange={(e) => set("transactionReference", e.target.value)} placeholder="Reference supplied by your payment provider" /></Field><Field label="Receipt screenshot"><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D6B44C]/30 p-4 text-sm text-white/55 hover:bg-white/5"><FileUp className="h-5 w-5 text-[#D6B44C]" />{receipt ? receipt.name : "Choose receipt image or PDF (optional, max 5 MB)"}<input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => selectFile(e.target.files?.[0], "receipt")} /></label></Field></>}{step === 4 && <><div className="grid gap-3 rounded-xl border border-[#D6B44C]/20 p-5 text-sm">{[["Applicant", form.fullName], ["Origin", `${form.originDistrict}, ${form.currentCountry}`], ["Package", selectedPackage?.name || "Not selected"], ["Payment", `${form.paymentMethod} · ${form.transactionReference}`]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0"><span className="text-white/45">{label}</span><span className="text-right text-white">{value}</span></div>)}</div><label className="flex items-start gap-3 text-sm leading-relaxed text-white/65"><input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 accent-[#D6B44C]" />I confirm that the information is accurate and understand that submission starts review only. Documents are handled for application processing and are not automatically published.</label></>}</div><div className="mt-8 flex justify-between gap-3 border-t border-white/10 pt-5">{step > 0 ? <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)} className="gap-2 border-white/15 text-white"><ArrowLeft className="h-4 w-4" /> Back</Button> : <span />}{step < 4 ? <Button type="button" onClick={next} className="gap-2" style={{ background: COLORS.gold, color: COLORS.forest }}>Continue <ArrowRight className="h-4 w-4" /></Button> : <Button type="button" disabled={saving} onClick={submit} className="gap-2" style={{ background: COLORS.gold, color: COLORS.forest }}>{saving ? "Submitting…" : "Submit for review"} <CheckCircle2 className="h-4 w-4" /></Button>}</div></>}</div><div className="space-y-6"><TrackApplication /><div className="rounded-2xl border border-white/10 bg-[#06271B]/40 p-6"><div className="flex items-start gap-3"><AlertCircle className="mt-1 h-5 w-5 shrink-0 text-[#D6B44C]" /><div><h3 className="font-semibold">How review works</h3><p className="mt-2 text-sm leading-relaxed text-white/55">Submitted → Under Review → Payment Verification → Approved / Rejected. A digital membership ID or QR card is issued only after authorized approval.</p></div></div></div><div className="rounded-2xl border border-[#D6B44C]/15 p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#D6B44C]">Before you begin</p><ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/55"><li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#D6B44C]" />Have your identity and migrant details ready.</li><li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#D6B44C]" />Keep your payment reference available if applicable.</li><li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#D6B44C]" />Save your application ID and tracking token.</li></ul></div></div></div></section>
  </main></MainLayout>;
}
