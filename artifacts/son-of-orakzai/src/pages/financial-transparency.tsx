import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Scale, ShieldCheck, PieChart, Download, CheckCircle2 } from "lucide-react";

const GOLD = "#D4AF37";

const allocationData = [
  { category: "Field Programmes & Projects", percent: 62, color: GOLD },
  { category: "Education & Scholarships", percent: 15, color: "#22c55e" },
  { category: "Healthcare Outreach", percent: 12, color: "#60a5fa" },
  { category: "Administration & Operations", percent: 7, color: "#a78bfa" },
  { category: "Communications & Outreach", percent: 4, color: "#f97316" },
];

const audits = [
  { year: 2024, auditor: "Chartered Accountants of Pakistan", status: "Verified" },
  { year: 2023, auditor: "Chartered Accountants of Pakistan", status: "Verified" },
  { year: 2022, auditor: "Independent Audit Firm — Islamabad", status: "Verified" },
];

const commitments = [
  "100% of member donations go directly to declared programmes",
  "Annual independent third-party financial audit",
  "All expenditures above PKR 50,000 require dual-signatory approval",
  "Quarterly financial summaries published for all members",
  "Registered NGO — full compliance with Pakistan regulatory standards",
];

export default function FinancialTransparency() {
  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #011a10 0%, #02280f 60%, #011a10 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)` }} />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(212,175,55,0.1)", border: `1px solid rgba(212,175,55,0.25)`, color: GOLD }}
            >
              <Scale className="w-3.5 h-3.5" /> Our Impact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Financial Transparency
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              We hold ourselves to the highest standard of accountability. Every rupee is tracked, audited, and reported — because your trust is our most valuable asset.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-14" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <PieChart className="w-5 h-5" style={{ color: GOLD }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Fund Allocation 2024</h2>
          </div>
          <div className="space-y-4">
            {allocationData.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/70 text-sm">{item.category}</span>
                  <span className="text-sm font-bold" style={{ color: item.color }}>{item.percent}%</span>
                </div>
                <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ background: item.color, width: `${item.percent}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Records */}
      <section className="py-14" style={{ background: "#000c07" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">

            {/* Audits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5" style={{ color: GOLD }} />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Annual Audits</h2>
              </div>
              <div className="space-y-3">
                {audits.map((audit, i) => (
                  <motion.div
                    key={audit.year}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.13)" }}
                  >
                    <div>
                      <p className="text-white text-sm font-semibold">FY {audit.year}</p>
                      <p className="text-white/40 text-xs mt-0.5">{audit.auditor}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" /> {audit.status}
                      </span>
                      <button
                        className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                        style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}
                      >
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Commitments */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-5 h-5" style={{ color: GOLD }} />
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Our Commitments</h2>
              </div>
              <div className="space-y-3">
                {commitments.map((commitment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.10)" }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                    <p className="text-white/65 text-sm leading-relaxed">{commitment}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
