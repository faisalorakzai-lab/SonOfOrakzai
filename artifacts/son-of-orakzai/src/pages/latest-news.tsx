import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Newspaper, Calendar, ChevronRight, Tag } from "lucide-react";

const GOLD = "#D4AF37";

const articles = [
  {
    category: "Community",
    date: "July 15, 2026",
    title: "Orakzai.org Launches Largest Scholarship Drive in Organisation History",
    excerpt:
      "Over 120 students from across Orakzai District will benefit from the 2026 scholarship programme, covering university tuition, accommodation, and stipends.",
  },
  {
    category: "Field Report",
    date: "July 8, 2026",
    title: "Clean Water Reaches 14 Villages in South Orakzai",
    excerpt:
      "The completion of Phase II of our WASH infrastructure project has delivered safe drinking water to more than 4,200 residents across remote communities.",
  },
  {
    category: "Diaspora",
    date: "June 28, 2026",
    title: "Global Fundraising Summit Raises PKR 8.2 Million in a Single Day",
    excerpt:
      "Members from the UAE, UK, and Australia joined a live fundraising summit that broke previous records and will fund three new field programmes.",
  },
  {
    category: "Health",
    date: "June 14, 2026",
    title: "Mobile Health Clinic Expands to 6 New Districts",
    excerpt:
      "Our mobile clinic fleet now covers six districts in Khyber Pakhtunkhwa, providing free medical consultations, vaccinations, and maternal health support.",
  },
  {
    category: "Policy",
    date: "May 30, 2026",
    title: "Orakzai.org Delegation Meets Federal Minister for Overseas Pakistanis",
    excerpt:
      "A formal delegation presented policy recommendations on migrant protection, diaspora remittance access, and skills training at a meeting in Islamabad.",
  },
  {
    category: "Education",
    date: "May 18, 2026",
    title: "Six Government Schools Fully Rehabilitated in Central Orakzai",
    excerpt:
      "Classrooms rebuilt, solar panels installed, and libraries stocked — six primary schools are now fully operational ahead of the new academic term.",
  },
];

const categoryColors: Record<string, string> = {
  Community: GOLD,
  "Field Report": "#22c55e",
  Diaspora: "#60a5fa",
  Health: "#f97316",
  Policy: "#a78bfa",
  Education: "#fb7185",
};

export default function LatestNews() {
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
              <Newspaper className="w-3.5 h-3.5" /> News &amp; Updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Latest News &amp; Articles
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Stay informed with the latest developments, field updates, and stories from across the Orakzai nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((article, i) => {
              const color = categoryColors[article.category] ?? GOLD;
              return (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl p-6 flex flex-col gap-3 cursor-pointer group transition-all hover:border-[rgba(212,175,55,0.35)] ${i === 0 ? "md:col-span-2" : ""}`}
                  style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.13)" }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                    >
                      <Tag className="w-2.5 h-2.5" /> {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/30">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug group-hover:text-yellow-200 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold mt-1" style={{ color: GOLD }}>
                    Read More <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
