import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Users, CheckCircle2, Download, Calendar } from "lucide-react";

const GOLD = "#D4AF37";

const stats = [
  { label: "Total Members", value: "2,850+", icon: Users },
  { label: "Projects Completed", value: "18+", icon: CheckCircle2 },
  { label: "Annual Growth", value: "34%", icon: TrendingUp },
  { label: "Reports Published", value: "12", icon: BarChart2 },
];

const annualReports = [
  { year: 2024, title: "Annual Impact Report 2024", desc: "Detailed financial and programme impact breakdown" },
  { year: 2023, title: "Annual Impact Report 2023", desc: "Growth metrics, beneficiary data & community reach" },
  { year: 2022, title: "Annual Impact Report 2022", desc: "Foundational milestone report — first 3 years" },
];

export default function ImpactReports() {
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
              <BarChart2 className="w-3.5 h-3.5" /> Our Impact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Impact Reports &amp; Metrics
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Transparent, data-driven reporting on how your trust and support translates into measurable change for the Orakzai community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <Icon className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                  <p className="text-xs text-white/45 mt-1 tracking-wide">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-14" style={{ background: "#000c07" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Annual Reports
          </h2>
          <div className="space-y-4">
            {annualReports.map((report, i) => (
              <motion.div
                key={report.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center justify-between p-5 rounded-2xl gap-4"
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.14)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <Calendar className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{report.title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{report.desc}</p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all hover:opacity-80"
                  style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
