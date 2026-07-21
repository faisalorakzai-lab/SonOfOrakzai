import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Bell, Calendar, Pin, ShieldCheck, ChevronRight } from "lucide-react";

const GOLD = "#D4AF37";

const pinned = [
  {
    date: "July 20, 2026",
    title: "Membership Registration for 2026–27 Is Now Open",
    body: "All existing and new members are invited to complete their annual registration for the 2026–27 membership cycle. Early registration closes August 31, 2026. Visit the Join page or contact your regional representative.",
    tag: "Membership",
  },
];

const announcements = [
  {
    date: "July 18, 2026",
    title: "Scholarship Application Deadline Extended to August 20, 2026",
    body: "Due to high demand, the deadline for the 2026 Global Scholarship Programme has been extended. All eligible candidates are encouraged to apply through the official portal.",
    tag: "Education",
  },
  {
    date: "July 10, 2026",
    title: "New Board Members Elected — Executive Committee 2026–28",
    body: "Following a transparent election process, six new Executive Committee members have been elected to serve the 2026–28 term. Full profiles will be published on the Leadership page.",
    tag: "Governance",
  },
  {
    date: "June 30, 2026",
    title: "Emergency Relief Fund Activated — Flood Response, South Orakzai",
    body: "In response to recent flooding, Orakzai.org has activated its Emergency Relief Fund. Donations are being directed to affected families immediately. Bank details available on the Donate page.",
    tag: "Relief",
  },
  {
    date: "June 15, 2026",
    title: "Annual Financial Audit 2025 — Report Published",
    body: "The independently audited annual financial report for the year ending December 2025 has been published. Download it from the Financial Transparency page.",
    tag: "Finance",
  },
  {
    date: "May 28, 2026",
    title: "Orakzai.org Launches Official Mobile App — Beta Testing",
    body: "We are pleased to announce the beta launch of the Orakzai.org mobile application for Android and iOS. Beta testers can register via the membership portal.",
    tag: "Technology",
  },
];

const tagColors: Record<string, string> = {
  Membership: GOLD,
  Education: "#22c55e",
  Governance: "#a78bfa",
  Relief: "#f97316",
  Finance: "#60a5fa",
  Technology: "#fb7185",
};

export default function Announcements() {
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
              <Bell className="w-3.5 h-3.5" /> News &amp; Updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Official Announcements
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Verified communications directly from Orakzai.org leadership — governance updates, programme notices, and critical alerts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Pinned */}
          {pinned.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-5 mb-6"
              style={{ background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.35)` }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Pin className="w-3.5 h-3.5" style={{ color: GOLD }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>Pinned</span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30` }}
                >
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/30 ml-auto">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              </div>
              <h3 className="text-white font-bold text-base mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
              <div className="flex items-center gap-1 text-xs font-semibold mt-3" style={{ color: GOLD }}>
                Learn More <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}

          {/* Verified badge */}
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck className="w-4 h-4" style={{ color: GOLD }} />
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Official Announcements</span>
          </div>

          {/* Announcement list */}
          <div className="space-y-4">
            {announcements.map((item, i) => {
              const color = tagColors[item.tag] ?? GOLD;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="rounded-2xl p-5 cursor-pointer group transition-all hover:border-[rgba(212,175,55,0.3)]"
                  style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.11)" }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                    >
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/25 ml-auto">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 leading-snug group-hover:text-yellow-200 transition-colors">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
