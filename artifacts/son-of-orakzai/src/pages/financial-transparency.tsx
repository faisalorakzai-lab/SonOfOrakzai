import { useEffect } from "react";
import { AlertCircle, ArrowUpRight, BarChart3, CheckCircle2, Download, FileCheck2, Landmark, Scale, ShieldCheck } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";

const COLORS = { forest: "#031B13", emerald: "#06271B", gold: "#D6B44C", ivory: "#F5F1E7", sage: "#A6B3A9" } as const;
const CANONICAL = "https://orakzai.org/financial-transparency";
const REPORT_URL = "/Orakzai_Annual_Impact_Report_2025.pdf";
const TITLE = "Orakzai.org Financial Transparency | Annual Report 2025";
const DESCRIPTION = "Explore Orakzai.org financial transparency, annual financial reporting, fund allocation, expenditure disclosures, governance and 2025 accountability report.";

const disclosures = [
  { title: "Income & funding sources", status: "Not published", detail: "A verified 2025 income statement is not currently published on this page." },
  { title: "Programme expenditure", status: "Not published", detail: "Programme-level expenditure figures are unavailable until supported by an approved 2025 statement." },
  { title: "Administrative costs", status: "Not published", detail: "No 2025 administrative-cost figure is displayed without a verified source." },
  { title: "Operational expenditure", status: "Not published", detail: "Operational expenditure remains unavailable in the published materials reviewed." },
  { title: "Financial governance", status: "Framework", detail: "The organization presents accountability as a commitment; specific approval records should be published with the underlying policy." },
  { title: "Independent audit status", status: "Unavailable", detail: "No independently verified 2025 audit statement is asserted here." },
];

const commitments = [
  "Publish financial figures only when they are supported by organizational records.",
  "Distinguish audited, unaudited and unavailable information clearly.",
  "Keep the annual report link prominent and accessible to members and supporters.",
  "Review disclosures before publication rather than presenting estimates as facts.",
];

const reportStatuses = [
  ["Income and donations", "Unavailable", "Bank and donor schedules required"],
  ["Programme expenditure", "Unavailable", "General ledger by programme required"],
  ["Administration and operations", "Unavailable", "Expense ledger and allocation policy required"],
  ["Financial position", "Unavailable", "Assets, liabilities and fund balances required"],
  ["Audit assurance", "Unavailable", "Signed independent audit report required"],
] as const;

const programmePortfolio = ["Humanitarian assistance", "Legal protection and migrant support", "Education and scholarships", "Healthcare initiatives", "Economic empowerment", "Water and infrastructure", "Community and diaspora engagement"];

function setMeta(key: string, value: string, property = false) {
  const attribute = property ? "property" : "name";
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attribute, key); document.head.appendChild(tag); }
  tag.content = value;
}

function useFinancialSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = TITLE;
    setMeta("description", DESCRIPTION);
    setMeta("keywords", "Orakzai.org Financial Transparency, Orakzai Annual Financial Report 2025");
    setMeta("robots", "index, follow");
    setMeta("og:type", "website", true); setMeta("og:url", CANONICAL, true); setMeta("og:title", TITLE, true); setMeta("og:description", DESCRIPTION, true); setMeta("og:site_name", "Orakzai.org", true);
    setMeta("twitter:card", "summary", false); setMeta("twitter:url", CANONICAL); setMeta("twitter:title", TITLE); setMeta("twitter:description", DESCRIPTION);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = CANONICAL;
    const schema = document.createElement("script"); schema.id = "financial-transparency-jsonld"; schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": "https://orakzai.org/#organization", name: "Orakzai.org", url: "https://orakzai.org" },
      { "@type": "WebPage", "@id": `${CANONICAL}#webpage`, url: CANONICAL, name: TITLE, description: DESCRIPTION, isPartOf: { "@id": "https://orakzai.org/#website" } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://orakzai.org/" }, { "@type": "ListItem", position: 2, name: "Financial Transparency", item: CANONICAL }] },
    ] });
    document.getElementById(schema.id)?.remove(); document.head.appendChild(schema);
    return () => { document.title = previousTitle; document.getElementById(schema.id)?.remove(); if (previousCanonical) canonical!.href = previousCanonical; else canonical?.remove(); };
  }, []);
}

function StatusBadge({ children, tone = "muted" }: { children: string; tone?: "muted" | "gold" | "green" }) {
  const colors = tone === "green" ? { color: "#8bd5a8", background: "rgba(139,213,168,.1)", border: "rgba(139,213,168,.25)" } : tone === "gold" ? { color: COLORS.gold, background: "rgba(214,180,76,.1)", border: "rgba(214,180,76,.28)" } : { color: "#c7cec9", background: "rgba(166,179,169,.08)", border: "rgba(166,179,169,.2)" };
  return <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={colors}>{children}</span>;
}

export default function FinancialTransparency() {
  useFinancialSeo();
  return <MainLayout><main style={{ background: COLORS.forest, color: COLORS.ivory }}>
    <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(214,180,76,.25)", background: "radial-gradient(ellipse 65% 80% at 50% 0%, rgba(214,180,76,.12), transparent 65%), linear-gradient(135deg, #031B13, #06271B)" }}>
      <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32"><p className="mb-7 text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.gold }}>Accountability • Trust • Transparency</p><h1 className="text-4xl font-semibold leading-tight md:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Financial Transparency</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">Every contribution deserves accountability. Explore our financial reporting, fund allocation, governance standards and institutional commitments.</p></div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="allocation-title"><div className="mb-10 flex items-start gap-4"><div className="rounded-full p-3" style={{ background: "rgba(214,180,76,.1)", color: COLORS.gold }}><BarChart3 className="h-6 w-6" /></div><div><p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: COLORS.gold }}>Verified figures only</p><h2 id="allocation-title" className="mt-2 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Fund Allocation 2025</h2></div></div><div className="rounded-2xl border p-7 md:p-10" style={{ background: "rgba(6,39,27,.62)", borderColor: "rgba(214,180,76,.2)" }}><div className="flex items-start gap-4"><AlertCircle className="mt-1 h-5 w-5 shrink-0" style={{ color: COLORS.gold }} /><div><h3 className="font-semibold">2025 allocation percentages — pending verified publication</h3><p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">No percentage bars are shown until verified 2025 financial data is available. This avoids presenting earlier-year or estimated figures as 2025 disclosures.</p></div></div><div className="mt-8 space-y-5">{["Programme delivery", "Education and scholarships", "Healthcare and relief", "Administration", "Operations and outreach"].map((label) => <div key={label}><div className="mb-2 flex justify-between text-sm"><span className="text-white/65">{label}</span><span style={{ color: COLORS.sage }}>Unavailable</span></div><div className="h-2 rounded-full" style={{ background: "rgba(166,179,169,.12)" }} /></div>)}</div></div></section>

    <section className="border-y" style={{ borderColor: "rgba(214,180,76,.18)", background: COLORS.emerald }} aria-labelledby="report-title"><div className="mx-auto max-w-6xl px-6 py-16 md:py-20"><div className="grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: COLORS.gold }}>Annual disclosure</p><h2 id="report-title" className="mt-3 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Annual Financial Transparency Report 2025</h2><p className="mt-5 max-w-2xl leading-relaxed text-white/65">Detailed financial statements, funding sources, expenditure breakdown and programme allocations for January–December 2025.</p><p className="mt-5 text-sm text-white/45">The available PDF is a public-records edition prepared for transparency and learning. It explicitly states that audited statements, ledgers, registers and signed audit evidence were not supplied for independent verification.</p></div><div className="rounded-2xl border p-7" style={{ background: "rgba(3,27,19,.65)", borderColor: "rgba(214,180,76,.3)" }}><div className="mb-5 flex items-center gap-3"><FileCheck2 className="h-8 w-8" style={{ color: COLORS.gold }} /><div><p className="font-semibold">Orakzai Annual Report 2025</p><StatusBadge tone="gold">Public-records edition</StatusBadge></div></div><a href={REPORT_URL} target="_blank" rel="noreferrer" download className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold" style={{ color: COLORS.forest, background: COLORS.gold }}>Download 2025 PDF <Download className="h-4 w-4" /></a><p className="mt-4 text-center text-xs text-white/40">Opens the published report · 15 pages</p></div></div></div></section>

    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20" aria-labelledby="evidence-title"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: COLORS.gold }}>What the report says</p><h2 id="evidence-title" className="mt-3 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>2025 evidence status</h2><p className="mt-4 max-w-3xl leading-relaxed text-white/60">The report separates public statements from independently verified records. No 2025 financial total or percentage is presented here without a reporting year, monetary base and allocation method.</p></div><div className="grid gap-4 md:grid-cols-2">{reportStatuses.map(([label, status, required]) => <article key={label} className="rounded-xl border p-5" style={{ background: "rgba(6,39,27,.55)", borderColor: "rgba(214,180,76,.14)" }}><div className="flex items-start justify-between gap-4"><h3 className="font-semibold">{label}</h3><StatusBadge>{status}</StatusBadge></div><p className="mt-3 text-sm leading-relaxed text-white/50">{required}</p></article>)}</div><div className="mt-10 rounded-2xl border p-7" style={{ background: "rgba(214,180,76,.05)", borderColor: "rgba(214,180,76,.18)" }}><div className="mb-5 flex items-center gap-3"><FileCheck2 className="h-5 w-5" style={{ color: COLORS.gold }} /><h3 className="font-semibold">2025 programme portfolio described in the report</h3></div><div className="flex flex-wrap gap-2">{programmePortfolio.map((item) => <span key={item} className="rounded-full border px-3 py-1.5 text-xs text-white/65" style={{ borderColor: "rgba(214,180,76,.2)" }}>{item}</span>)}</div><p className="mt-5 text-xs leading-relaxed text-white/45">These are programme areas described in the public record, not a claim that each area has a complete dated 2025 delivery or expenditure ledger.</p></div></section>

    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="disclosure-title"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: COLORS.gold }}>Evidence status</p><h2 id="disclosure-title" className="mt-3 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Financial disclosure</h2><p className="mt-4 max-w-2xl leading-relaxed text-white/60">Each category is labeled so readers can distinguish published evidence from information that still needs a verified release.</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{disclosures.map((item) => <article key={item.title} className="rounded-2xl border p-6" style={{ background: "rgba(6,39,27,.55)", borderColor: "rgba(214,180,76,.14)" }}><div className="mb-5 flex items-start justify-between gap-3"><Landmark className="h-5 w-5" style={{ color: COLORS.gold }} /><StatusBadge>{item.status}</StatusBadge></div><h3 className="font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{item.detail}</p></article>)}</div></section>

    <section className="border-t" style={{ borderColor: "rgba(214,180,76,.18)", background: "#02150d" }} aria-labelledby="commitments-title"><div className="mx-auto max-w-6xl px-6 py-16 md:py-20"><div className="mb-9 flex items-center gap-4"><ShieldCheck className="h-7 w-7" style={{ color: COLORS.gold }} /><div><p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: COLORS.gold }}>Institutional standard</p><h2 id="commitments-title" className="mt-2 text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Our Commitments</h2></div></div><div className="grid gap-4 md:grid-cols-2">{commitments.map((commitment) => <div key={commitment} className="flex items-start gap-3 rounded-xl border p-5" style={{ borderColor: "rgba(214,180,76,.14)", background: "rgba(6,39,27,.55)" }}><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: COLORS.gold }} /><p className="text-sm leading-relaxed text-white/65">{commitment}</p></div>)}</div><div className="mt-10 flex flex-wrap gap-4 text-sm text-white/45"><span className="inline-flex items-center gap-2"><Scale className="h-4 w-4" style={{ color: COLORS.gold }} /> Evidence-led disclosure</span><a href="/impact-reports" className="inline-flex items-center gap-2 hover:text-white"><ArrowUpRight className="h-4 w-4" style={{ color: COLORS.gold }} /> View impact reporting</a></div></div></section>
  </main></MainLayout>;
}
