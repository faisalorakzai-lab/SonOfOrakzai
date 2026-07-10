import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, useInView } from "framer-motion";
import { Linkedin, Twitter, Crown, Shield, Star } from "lucide-react";
import { useRef } from "react";

const GOLD = "#D4AF37";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  focus: string;
  intro: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  isSupreme?: boolean;
  supremeTitle?: string;
}

const SUPREME_LEADERS: TeamMember[] = [
  {
    id: 1,
    name: "Faisal Orakzai",
    title: "Chairman",
    focus: "Vision, Leadership & National Outreach",
    intro: "Leading Orakzai with a vision of digital empowerment and unity for the Orakzai community across Pakistan and beyond.",
    photo: "/faisal-orakzai.png",
    linkedin: "#",
    twitter: "#",
    isSupreme: true,
    supremeTitle: "Chairman",
  },
  {
    id: 2,
    name: "Speen Gul Orakzai",
    title: "Founder",
    focus: "Foundation, Heritage & Community Roots",
    intro: "Visionary founder who established the platform to preserve Orakzai heritage while building a progressive digital homeland for future generations.",
    photo: "/malak-speen-gul.jpg",
    linkedin: "#",
    twitter: "#",
    isSupreme: true,
    supremeTitle: "Founder",
  },
];

const BOARD_MEMBERS: TeamMember[] = [
  {
    id: 3,
    name: "Maria Hussain",
    title: "Education Head",
    focus: "Digital Skill Lab & Women Empowerment",
    intro: "Driving educational initiatives and digital literacy programs that empower women across the Orakzai region.",
    photo: "/team/maria-hussain.jpg",
    linkedin: "#", twitter: "#",
  },
  {
    id: 4,
    name: "Dr. Asma Orakzai",
    title: "Director of Health Services",
    focus: "Sehat-e-Orakzai & Telemedicine",
    intro: "Leading telemedicine and health outreach programs to bring quality healthcare to every corner of Orakzai district.",
    photo: "/team/dr-asma-orakzai.jpg",
    linkedin: "#", twitter: "#",
  },
  {
    id: 5,
    name: "Kashif Orakzai",
    title: "Operations & Logistics Head",
    focus: "Orakzai Transport Corp & Field Work",
    intro: "Overseeing ground operations and logistics to ensure efficient delivery of services across the district.",
    photo: "/team/kashif-orakzai.png",
    linkedin: "#", twitter: "#",
  },
  {
    id: 6,
    name: "Ghazi Mansoor Orakzai",
    title: "Community Engagement Lead",
    focus: "Jirga-e-Naujawan & Youth Affairs",
    intro: "Connecting youth with traditional Jirga values while fostering modern community leadership across Orakzai.",
    photo: "/team/ghazi-mansoor.png",
    linkedin: "#", twitter: "#",
  },
  {
    id: 7,
    name: "Zubair Orakzai",
    title: "IT & Blockchain Strategist",
    focus: "Digital Homeland & Tech Infrastructure",
    intro: "Architecting the digital backbone of Orakzai, building blockchain-powered transparency systems.",
    photo: "/team/zubair-orakzai.jpg",
    linkedin: "#", twitter: "#",
  },
  {
    id: 8,
    name: "Haqnawaz Orakzai",
    title: "Welfare & Relief Coordinator",
    focus: "Imdad-e-Bahan & Social Safety Net",
    intro: "Coordinating relief efforts and welfare programs to support the most vulnerable families in Orakzai.",
    photo: "/team/haqnawaz-orakzai.png",
    linkedin: "#", twitter: "#",
  },
  {
    id: 9,
    name: "Abdul Razzaq Orakzai",
    title: "Strategic Planning Officer",
    focus: "Global Partnerships & NGO Relations",
    intro: "Building strategic alliances with international NGOs and government bodies to amplify Orakzai's voice globally.",
    photo: "/team/abdul-razzaq.jpg",
    linkedin: "#", twitter: "#",
  },
  {
    id: 10,
    name: "Sher Wali Orakzai",
    title: "Talent & Sports Director",
    focus: "Talent Hunt & Youth Development",
    intro: "Identifying and nurturing sporting talent and creative skills among Orakzai youth for national recognition.",
    photo: "/team/sher-wali.png",
    linkedin: "#", twitter: "#",
  },
  {
    id: 11,
    name: "Muhammad Hayat",
    title: "Finance & Transparency Head",
    focus: "Audit & Annual Reports",
    intro: "Ensuring financial integrity and full transparency in all community funds through rigorous audit practices.",
    photo: "/team/muhammad-hayat.jpg",
    linkedin: "#", twitter: "#",
  },
];

/* Circular avatar — object-position: top crops name text at bottom */
function MemberAvatar({ src, name, size = 128 }: { src: string; name: string; size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0"
      style={{
        width: size, height: size,
        border: `3px solid ${GOLD}`,
        boxShadow: `0 0 16px rgba(212,175,55,0.35)`,
      }}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        style={{ objectPosition: 'top center' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=064e3b&textColor=D4AF37`;
        }}
      />
    </div>
  );
}

function SupremeCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center text-center p-8 rounded-2xl border"
      style={{
        background: "rgba(3,45,30,0.7)",
        backdropFilter: "blur(16px)",
        borderColor: GOLD,
        borderWidth: "1px",
        boxShadow: hovered
          ? "0 0 40px rgba(212,175,55,0.45), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s ease",
      }}
    >
      {/* Supreme Badge */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold"
        style={{ background: GOLD, color: "#022c22" }}
      >
        <Crown className="w-3.5 h-3.5" />
        {member.supremeTitle}
      </div>

      <div className="mt-2 mb-4">
        <MemberAvatar src={member.photo} name={member.name} size={128} />
      </div>

      <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
      <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>{member.title}</p>
      <p className="text-xs text-white/50 mb-3">{member.focus}</p>
      <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-xs">{member.intro}</p>

      <div className="flex gap-3">
        <a href={member.linkedin || "#"} className="p-2 rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
          <Linkedin className="w-4 h-4" style={{ color: GOLD }} />
        </a>
        <a href={member.twitter || "#"} className="p-2 rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
          <Twitter className="w-4 h-4" style={{ color: GOLD }} />
        </a>
      </div>
    </motion.div>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col items-center text-center p-6 rounded-2xl border"
      style={{
        background: "rgba(3,45,30,0.6)",
        backdropFilter: "blur(12px)",
        borderColor: hovered ? GOLD : `${GOLD}40`,
        borderWidth: "1px",
        boxShadow: hovered
          ? "0 0 28px rgba(212,175,55,0.35), 0 6px 24px rgba(0,0,0,0.35)"
          : "0 2px 12px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="mb-4">
        <MemberAvatar src={member.photo} name={member.name} size={96} />
      </div>

      <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
      <p className="text-xs font-semibold mb-1" style={{ color: GOLD }}>{member.title}</p>
      <p className="text-xs text-white/40 mb-3">{member.focus}</p>
      <p className="text-xs text-white/65 leading-relaxed mb-4 line-clamp-2">{member.intro}</p>

      <div className="flex gap-2">
        <a href={member.linkedin || "#"} className="p-1.5 rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
          <Linkedin className="w-3.5 h-3.5" style={{ color: GOLD }} />
        </a>
        <a href={member.twitter || "#"} className="p-1.5 rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
          <Twitter className="w-3.5 h-3.5" style={{ color: GOLD }} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #011a10 0%, #022c22 50%, #011a10 100%)" }}>
        {/* Hero Header */}
        <div className="relative pt-28 pb-16 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          </div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25,0.46,0.45,0.94] }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-5 h-5" style={{ color: GOLD }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>Orakzai</span>
              <Shield className="w-5 h-5" style={{ color: GOLD }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Leadership
            </h1>
            <div className="h-[1px] w-20 mx-auto mb-4" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <p className="text-white/60 max-w-xl mx-auto text-base">
              Meet the dedicated team driving progress, unity, and digital empowerment for the Orakzai community.
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 md:px-8 pb-24">
          {/* Supreme Leadership */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}60`, color: GOLD }}>
                <Crown className="w-4 h-4" /> Supreme Leadership
              </div>
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {SUPREME_LEADERS.map((member, i) => (
                <SupremeCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>

          {/* Executive Board */}
          <div>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}60`, color: GOLD }}>
                <Star className="w-4 h-4" /> Executive Board
              </div>
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BOARD_MEMBERS.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
