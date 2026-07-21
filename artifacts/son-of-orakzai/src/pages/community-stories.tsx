import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Users, Quote, MapPin, Star } from "lucide-react";

const GOLD = "#D4AF37";

const stories = [
  {
    name: "Aftab Khan",
    location: "Orakzai District, KPK",
    role: "Scholarship Beneficiary",
    story:
      "Thanks to the Orakzai.org education programme, I completed my engineering degree and now support my entire family. The scholarship changed not just my life, but my village's future.",
  },
  {
    name: "Rukhsana Bibi",
    location: "Hangu, KPK",
    role: "Women's Vocational Training Graduate",
    story:
      "I never thought I would run my own tailoring business. The training centre gave me skills, confidence, and a way to earn an income while staying close to my children.",
  },
  {
    name: "Dr. Imran Orakzai",
    location: "UAE Diaspora",
    role: "Diaspora Volunteer & Donor",
    story:
      "Living abroad, I felt disconnected from my roots. Orakzai.org gave me a real way to contribute — I helped fund a water project in my ancestral village and visited to see it completed.",
  },
  {
    name: "Hussain Ali",
    location: "Peshawar, KPK",
    role: "Flood Relief Recipient",
    story:
      "When the floods destroyed our home, Orakzai.org arrived within days. They provided food, shelter materials, and later helped us rebuild. We are forever grateful.",
  },
  {
    name: "Zainab Afridi",
    location: "Central Orakzai",
    role: "Health Outreach Patient",
    story:
      "The mobile clinic came to our village when my son was critically ill. Without it, we had no way to reach a hospital. The doctors treated him and saved his life.",
  },
];

export default function CommunityStories() {
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
              <Users className="w-3.5 h-3.5" /> Our Impact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Community &amp; Success Stories
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Real voices, real transformation. The stories behind our numbers — from scholars to survivors, diaspora volunteers to village heroes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 flex flex-col gap-4 ${i === 0 ? "md:col-span-2" : ""}`}
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.14)" }}
              >
                <Quote className="w-7 h-7 flex-shrink-0" style={{ color: GOLD, opacity: 0.6 }} />
                <p className="text-white/70 text-sm leading-relaxed flex-1 italic">"{story.story}"</p>
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})` }}
                  >
                    <Star className="w-4 h-4" style={{ color: "#011a10" }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{story.name}</p>
                    <p className="text-xs" style={{ color: GOLD, opacity: 0.8 }}>{story.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" style={{ color: "rgba(255,255,255,0.3)" }} />
                      <span className="text-white/30 text-xs">{story.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
