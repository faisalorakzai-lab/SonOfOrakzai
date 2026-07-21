import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Globe, Users, ChevronRight } from "lucide-react";

const GOLD = "#D4AF37";

const upcomingEvents = [
  {
    date: "Aug 12, 2026",
    title: "Orakzai Global Diaspora Summit 2026",
    location: "Dubai, UAE",
    time: "10:00 AM GST",
    type: "Summit",
    online: false,
    desc: "Annual gathering of Orakzai diaspora leaders across the Gulf, Europe, and North America to align on community strategy for 2026–27.",
  },
  {
    date: "Sep 3, 2026",
    title: "Youth Leadership & Entrepreneurship Workshop",
    location: "Peshawar, KPK",
    time: "9:00 AM PKT",
    type: "Workshop",
    online: false,
    desc: "A two-day intensive programme for young Orakzai entrepreneurs covering business planning, grant applications, and mentorship.",
  },
  {
    date: "Sep 20, 2026",
    title: "Online Membership Town Hall — Q3 2026",
    location: "Virtual",
    time: "7:00 PM PKT",
    type: "Town Hall",
    online: true,
    desc: "Quarterly open forum for all members — leadership updates, project progress, financial report, and live Q&A.",
  },
  {
    date: "Oct 15, 2026",
    title: "Healthcare Infrastructure Conference",
    location: "Islamabad, Pakistan",
    time: "10:00 AM PKT",
    type: "Conference",
    online: false,
    desc: "Bringing together medical professionals, NGOs, and government stakeholders to discuss rural healthcare access in KPK.",
  },
];

const pastEvents = [
  { date: "June 2026", title: "Scholarship Awards Ceremony 2026", location: "Kohat, KPK" },
  { date: "April 2026", title: "Spring Fundraising Gala — UK Chapter", location: "London, UK" },
  { date: "Feb 2026", title: "Women Empowerment Forum", location: "Peshawar, KPK" },
];

const typeColors: Record<string, string> = {
  Summit: GOLD,
  Workshop: "#22c55e",
  "Town Hall": "#60a5fa",
  Conference: "#a78bfa",
};

export default function Events() {
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
              <Calendar className="w-3.5 h-3.5" /> News &amp; Updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Global Events &amp; Summits
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              From diaspora summits in Dubai to community workshops in KPK — join us at upcoming events shaping the Orakzai nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Upcoming Events
          </h2>
          <div className="space-y-5">
            {upcomingEvents.map((event, i) => {
              const typeColor = typeColors[event.type] ?? GOLD;
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 cursor-pointer group transition-all hover:border-[rgba(212,175,55,0.3)]"
                  style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.13)" }}
                >
                  {/* Date badge */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-center"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{event.date.split(" ")[0]}</span>
                    <span className="text-2xl font-bold leading-tight" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                      {event.date.split(" ")[1].replace(",", "")}
                    </span>
                    <span className="text-[10px] text-white/40">{event.date.split(" ")[2]}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: `${typeColor}15`, color: typeColor, border: `1px solid ${typeColor}30` }}
                      >
                        {event.type}
                      </span>
                      {event.online && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-blue-300" style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)" }}>
                          <Globe className="w-2.5 h-2.5" /> Online
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-yellow-200 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {event.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-3">{event.desc}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/35">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" style={{ color: GOLD }} />{event.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" style={{ color: GOLD }} />{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center sm:items-end">
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:opacity-80 whitespace-nowrap"
                      style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10" }}
                    >
                      Register <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Past Events */}
          <h2 className="text-xl font-bold text-white mt-14 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Past Events
          </h2>
          <div className="space-y-3">
            {pastEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div>
                  <p className="text-white/60 text-sm font-medium">{event.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/25">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                  </div>
                </div>
                <Users className="w-4 h-4 flex-shrink-0 opacity-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
