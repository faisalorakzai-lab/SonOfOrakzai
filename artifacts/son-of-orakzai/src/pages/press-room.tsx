import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { BookOpen, Download, ExternalLink, FileText, Image, Mail } from "lucide-react";

const GOLD = "#D4AF37";

const pressReleases = [
  {
    date: "July 2026",
    title: "Orakzai.org Achieves ISO Certification for NGO Governance",
    type: "Press Release",
  },
  {
    date: "June 2026",
    title: "Launch of Global Diaspora Scholarship Fund 2026–2027",
    type: "Press Release",
  },
  {
    date: "May 2026",
    title: "Mobile Healthcare Initiative Reaches 10,000 Beneficiaries",
    type: "Statement",
  },
  {
    date: "March 2026",
    title: "Partnership Signed with KPK Government for School Rehabilitation",
    type: "Press Release",
  },
];

const mediaKit = [
  { label: "Organisation Logo Pack (SVG + PNG)", icon: Image, size: "2.4 MB" },
  { label: "Brand Guidelines & Style Guide", icon: FileText, size: "1.8 MB" },
  { label: "Fact Sheet 2026", icon: FileText, size: "420 KB" },
  { label: "Leadership Portraits (High-Res)", icon: Image, size: "18 MB" },
];

export default function PressRoom() {
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
              <BookOpen className="w-3.5 h-3.5" /> News &amp; Updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Press Room &amp; Media Kit
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Official press releases, statements, brand assets, and media resources for journalists and partners.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">

            {/* Press Releases */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <FileText className="w-5 h-5" style={{ color: GOLD }} /> Press Releases
              </h2>
              <div className="space-y-3">
                {pressReleases.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.09 }}
                    className="p-4 rounded-xl flex items-start justify-between gap-3 cursor-pointer group transition-all hover:border-[rgba(212,175,55,0.3)]"
                    style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.13)" }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.12)", color: GOLD }}>
                          {item.type}
                        </span>
                        <span className="text-white/30 text-xs">{item.date}</span>
                      </div>
                      <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors leading-snug">{item.title}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Media Kit */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <Download className="w-5 h-5" style={{ color: GOLD }} /> Media Kit Downloads
              </h2>
              <div className="space-y-3 mb-8">
                {mediaKit.map((asset, i) => {
                  const Icon = asset.icon;
                  return (
                    <motion.div
                      key={asset.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.09 }}
                      className="flex items-center justify-between p-4 rounded-xl gap-3 cursor-pointer group transition-all hover:border-[rgba(212,175,55,0.3)]"
                      style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.13)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)" }}>
                          <Icon className="w-4 h-4" style={{ color: GOLD }} />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{asset.label}</p>
                          <p className="text-white/30 text-xs">{asset.size}</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Media enquiry */}
              <div
                className="p-5 rounded-2xl"
                style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Media Enquiries</p>
                <p className="text-white/60 text-sm mb-3">For interview requests, fact-checking, or media partnerships:</p>
                <a
                  href="mailto:press@orakzai.org"
                  className="flex items-center gap-2 text-sm font-semibold text-white hover:opacity-80 transition-opacity"
                >
                  <Mail className="w-4 h-4" style={{ color: GOLD }} /> press@orakzai.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
