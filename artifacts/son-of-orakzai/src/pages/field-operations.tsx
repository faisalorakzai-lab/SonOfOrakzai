import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { MapPin, Briefcase, CheckCircle2, Clock, Globe } from "lucide-react";

const GOLD = "#D4AF37";

const projects = [
  {
    title: "Clean Water Infrastructure — Orakzai District",
    status: "Ongoing",
    location: "Orakzai, KPK",
    desc: "Installing water purification units and hand pumps across 14 villages to provide safe drinking water.",
    statusColor: GOLD,
  },
  {
    title: "Vocational Training Centre — Hangu",
    status: "Completed",
    location: "Hangu, KPK",
    desc: "Established a fully operational training centre delivering IT, tailoring, and carpentry programs to 200+ youth.",
    statusColor: "#22c55e",
  },
  {
    title: "Mobile Health Clinic Deployment",
    status: "Ongoing",
    location: "Multiple Districts",
    desc: "Monthly mobile clinic visits covering maternal health, vaccinations, and general medicine for remote communities.",
    statusColor: GOLD,
  },
  {
    title: "Emergency Relief — Flood Response",
    status: "Completed",
    location: "South Orakzai",
    desc: "Distributed food packages, tarpaulins, and emergency cash grants to 480 flood-affected families.",
    statusColor: "#22c55e",
  },
  {
    title: "School Rehabilitation Programme",
    status: "Ongoing",
    location: "Central Orakzai",
    desc: "Rebuilding 6 government primary schools, furnishing classrooms, and installing solar power units.",
    statusColor: GOLD,
  },
];

const overview = [
  { label: "Active Projects", value: "8", icon: Briefcase },
  { label: "Completed Projects", value: "18", icon: CheckCircle2 },
  { label: "Districts Covered", value: "6", icon: MapPin },
  { label: "Countries Supported From", value: "12", icon: Globe },
];

export default function FieldOperations() {
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
              <MapPin className="w-3.5 h-3.5" /> Our Impact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Field Operations &amp; Projects
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              On-the-ground programmes making a direct difference — from water infrastructure to emergency relief, education, and healthcare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-14" style={{ background: "#011a10" }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {overview.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <Icon className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{item.value}</p>
                  <p className="text-xs text-white/45 mt-1 tracking-wide">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-14" style={{ background: "#000c07" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Active &amp; Completed Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.14)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-white font-semibold text-sm leading-snug">{project.title}</p>
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0"
                    style={{ background: `${project.statusColor}15`, color: project.statusColor, border: `1px solid ${project.statusColor}30` }}
                  >
                    <Clock className="w-2.5 h-2.5" /> {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: GOLD }} />
                  <span className="text-xs text-white/40">{project.location}</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
