import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, useInView } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Linkedin, Twitter, Crown, Shield, Star, ChevronRight } from "lucide-react";

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
  mission?: string;
  bio: string;
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
    mission: "To forge a legacy of unity and progress for the Orakzai people — where every voice is heard, every talent is nurtured, and no family is left behind. Our strength is our togetherness.",
    bio: "Chairman Faisal Orakzai is the driving force behind Orakzai's transformation into a nationally recognized community movement. With a visionary approach rooted in deep love for his homeland, he has spearheaded initiatives spanning education, healthcare, digital empowerment, and civic representation. Under his leadership, the organization has grown from a grassroots effort into a structured institution serving thousands of Orakzai families. His commitment to transparent governance and inclusive leadership sets the tone for everything the organization does. Chairman Faisal believes that true prosperity is collective — and that the Orakzai district's greatest resource is the resilience and talent of its people.",
  },
  {
    id: 2,
    name: "Malak Speen Gul Orakzai",
    title: "Founder",
    focus: "Foundation, Heritage & Community Roots",
    intro: "Visionary founder who established the platform to preserve Orakzai heritage while building a progressive digital homeland for future generations.",
    photo: "/malak-speen-gul.jpg",
    linkedin: "#",
    twitter: "#",
    isSupreme: true,
    supremeTitle: "Founder",
    mission: "I founded this organization with one belief: that the sons and daughters of Orakzai carry within them the seeds of greatness. Our duty is to water those seeds — with education, with opportunity, and with unwavering unity.",
    bio: "Malak Speen Gul Orakzai is the founder and patriarch of Orakzai, a man whose life embodies the spirit of selfless service. Born and raised in the Orakzai district, he witnessed firsthand the challenges faced by his community — limited access to education, healthcare, and economic opportunity. Driven by an unshakeable belief in the potential of his people, he laid the foundation of this organization with his own resources, rallying elders, youth, and professionals around a shared vision. Malak Speen Gul's wisdom, rooted in decades of tribal leadership and community mediation, continues to guide the organization's values and direction. He is universally revered as the moral compass of the movement.",
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
    bio: "Maria Hussain has dedicated over a decade to transforming education access across the Orakzai district. A graduate of Quaid-i-Azam University with a Master's in Education Policy, she designed and launched the organization's flagship scholarship program that has benefited more than 500 students. She oversees curriculum development, teacher training initiatives, and digital literacy programs. Maria's philosophy is simple: an educated Orakzai is an empowered Orakzai. Under her guidance, the Education Department has established five learning centers and partnered with national universities for distance learning programs.",
  },
  {
    id: 4,
    name: "Dr. Asma Orakzai",
    title: "Director of Health Services",
    focus: "Sehat-e-Orakzai & Telemedicine",
    intro: "Leading telemedicine and health outreach programs to bring quality healthcare to every corner of Orakzai district.",
    photo: "/team/dr-asma-orakzai.jpg",
    linkedin: "#", twitter: "#",
    bio: "Dr. Asma Orakzai is a qualified physician with specialized training in community health and preventive medicine. She leads the organization's medical outreach programs, including quarterly free medical camps that have served over 10,000 patients across remote Orakzai villages. Dr. Asma has built a network of volunteer doctors, nurses, and paramedics committed to bringing quality healthcare to underserved communities. She also spearheads maternal health and child welfare initiatives, significantly reducing health disparities in the district. Her compassion, clinical expertise, and administrative acumen make her an indispensable pillar of the organization.",
  },
  {
    id: 5,
    name: "Kashif Orakzai",
    title: "Operations & Logistics Head",
    focus: "Orakzai Transport Corp & Field Work",
    intro: "Overseeing ground operations and logistics to ensure efficient delivery of services across the district.",
    photo: "/team/kashif-orakzai.png",
    linkedin: "#", twitter: "#",
    bio: "Kashif Orakzai is the operational backbone of Orakzai, ensuring that every project is delivered with precision and efficiency. With a background in supply chain management and project coordination, he has streamlined the organization's field operations across multiple districts. From coordinating relief deliveries in disaster zones to managing the logistics of large-scale community events, Kashif's meticulous planning ensures nothing falls through the cracks. He has developed the organization's standard operating procedures and volunteer management systems, enabling it to scale its impact while maintaining accountability at every level.",
  },
  {
    id: 6,
    name: "Ghazi Mansoor Orakzai",
    title: "Community Engagement Lead",
    focus: "Jirga-e-Naujawan & Youth Affairs",
    intro: "Connecting youth with traditional Jirga values while fostering modern community leadership across Orakzai.",
    photo: "/team/ghazi-mansoor.png",
    linkedin: "#", twitter: "#",
    bio: "Ghazi Mansoor Orakzai is the bridge between Orakzai's leadership and the grassroots communities it serves. With exceptional interpersonal skills and deep-rooted community trust, he facilitates dialogue between tribal elders, youth groups, and organizational leadership. He oversees the organization's outreach programs, community forums, and the Jirga engagement initiatives. Ghazi's talent for building consensus across diverse groups has been instrumental in resolving community disputes and rallying collective action around shared goals. His work ensures that the organization remains genuinely connected to the people it represents.",
  },
  {
    id: 7,
    name: "Zubair Orakzai",
    title: "IT & Blockchain Strategist",
    focus: "Digital Homeland & Tech Infrastructure",
    intro: "Architecting the digital backbone of Orakzai, building blockchain-powered transparency systems.",
    photo: "/team/zubair-orakzai.jpg",
    linkedin: "#", twitter: "#",
    bio: "Zubair Orakzai is a technology entrepreneur and blockchain specialist who brings cutting-edge digital solutions to the Orakzai community's development agenda. Educated at NUST and internationally certified in blockchain applications, he is building transparent fund-tracking systems and digital identity solutions for community members. Zubair also leads the Digital Skill Lab initiative, which provides free coding, freelancing, and tech entrepreneurship training to Orakzai youth. His vision is to position the Orakzai district as a hub for Pakistan's digital economy, creating sustainable livelihoods through technology and innovation.",
  },
  {
    id: 8,
    name: "Haqnawaz Orakzai",
    title: "Welfare & Relief Coordinator",
    focus: "Imdad-e-Bahan & Social Safety Net",
    intro: "Coordinating relief efforts and welfare programs to support the most vulnerable families in Orakzai.",
    photo: "/team/haqnawaz-orakzai.png",
    linkedin: "#", twitter: "#",
    bio: "Haqnawaz Orakzai leads the organization's welfare and humanitarian relief operations with tireless dedication and compassion. He has coordinated emergency relief efforts during floods, droughts, and displacement crises affecting Orakzai communities, distributing food packages, tents, and medical supplies to thousands of families. Beyond emergency response, he manages ongoing welfare programs including widow support, orphan care, and financial assistance for families in need. Haqnawaz's deep empathy and ground-level knowledge of community needs make him the first responder in any humanitarian situation the organization addresses.",
  },
  {
    id: 9,
    name: "Abdul Razzaq Orakzai",
    title: "Strategic Planning Officer",
    focus: "Global Partnerships & NGO Relations",
    intro: "Building strategic alliances with international NGOs and government bodies to amplify Orakzai's voice globally.",
    photo: "/team/abdul-razzaq.jpg",
    linkedin: "#", twitter: "#",
    bio: "Abdul Razzaq Orakzai is the strategic mind behind Orakzai's long-term development roadmap. With an MBA and extensive experience in public sector planning, he develops five-year strategic plans, tracks organizational KPIs, and ensures alignment between field activities and institutional goals. He has successfully authored proposals that secured partnerships with national NGOs and international development organizations. Abdul Razzaq's analytical approach and policy expertise help the organization punch above its weight, translating community needs into actionable, fundable programs that deliver measurable results.",
  },
  {
    id: 10,
    name: "Sher Wali Orakzai",
    title: "Talent & Sports Director",
    focus: "Talent Hunt & Youth Development",
    intro: "Identifying and nurturing sporting talent and creative skills among Orakzai youth for national recognition.",
    photo: "/team/sher-wali.png",
    linkedin: "#", twitter: "#",
    bio: "Sher Wali Orakzai champions the immense untapped potential of Orakzai youth through sports, arts, and talent development programs. A former regional-level athlete himself, he established the organization's Sports Academy which has produced national-level competitors in cricket, football, and martial arts. Beyond athletics, Sher Wali runs talent discovery programs that have identified and supported young artists, musicians, and performers from the district. He believes that nurturing talent builds confidence, discipline, and community pride — qualities that transform individuals and societies alike. His programs have become a source of joy and aspiration for thousands of young Orakzai.",
  },
  {
    id: 11,
    name: "Muhammad Hayat",
    title: "Finance & Transparency Head",
    focus: "Audit & Annual Reports",
    intro: "Ensuring financial integrity and full transparency in all community funds through rigorous audit practices.",
    photo: "/team/muhammad-hayat.jpg",
    linkedin: "#", twitter: "#",
    bio: "Muhammad Hayat is the guardian of Orakzai's financial integrity. A chartered accountant with extensive experience in nonprofit finance, he oversees all financial planning, budgeting, auditing, and reporting processes. Under his stewardship, the organization has achieved full financial transparency — publishing detailed annual reports and implementing blockchain-verified fund tracking for donor contributions. Muhammad Hayat has built a culture of accountability within the organization, ensuring that every rupee donated by community members and partners is deployed with maximum impact and complete honesty. His work has earned the trust of donors, government bodies, and the communities the organization serves.",
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

function SupremeCard({ member, index, onOpenBio }: { member: TeamMember; index: number; onOpenBio: (m: TeamMember) => void }) {
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

      <button
        onClick={() => onOpenBio(member)}
        className="flex items-center gap-1.5 mb-4 rounded-full px-5 py-1.5 text-xs font-bold transition-all hover:scale-105"
        style={{ background: "rgba(212,175,55,0.12)", border: `1px solid ${GOLD}60`, color: GOLD }}
      >
        Full Biography
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

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

function MemberCard({ member, index, onOpenBio }: { member: TeamMember; index: number; onOpenBio: (m: TeamMember) => void }) {
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

      <button
        onClick={() => onOpenBio(member)}
        className="flex items-center gap-1 mb-4 rounded-full px-4 py-1 text-xs font-bold transition-all hover:scale-105"
        style={{ background: "rgba(212,175,55,0.12)", border: `1px solid ${GOLD}60`, color: GOLD }}
      >
        Biography
        <ChevronRight className="w-3 h-3" />
      </button>

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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openBio = (member: TeamMember) => {
    setSelectedMember(member);
    setSheetOpen(true);
  };

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
                <SupremeCard key={member.id} member={member} index={i} onOpenBio={openBio} />
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
                <MemberCard key={member.id} member={member} index={i} onOpenBio={openBio} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BIOGRAPHY SIDE PANEL ─── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto p-0 border-l"
          style={{ borderColor: "rgba(212,175,55,0.3)", background: "#061209" }}
        >
          {selectedMember && (
            <>
              <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
              <SheetHeader className="px-8 pt-8 pb-4">
                <div className="flex justify-center mb-6">
                  <div
                    className="w-32 h-32 rounded-full overflow-hidden"
                    style={{ border: "3px solid rgba(212,175,55,0.6)", boxShadow: "0 0 32px rgba(212,175,55,0.2)" }}
                  >
                    <img
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "top center" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedMember.name)}&backgroundColor=064e3b&textColor=D4AF37`;
                      }}
                    />
                  </div>
                </div>
                <SheetTitle className="text-center text-2xl font-bold" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
                  {selectedMember.name}
                </SheetTitle>
                <p className="text-center text-sm uppercase tracking-widest text-emerald-200/50 mt-1">
                  {selectedMember.title}
                </p>
                <div className="h-px w-24 mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
              </SheetHeader>
              <div className="px-8 pb-10">
                {selectedMember.mission && (
                  <div className="mb-6 relative pl-5">
                    <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: GOLD }} />
                    <p className="text-emerald-100/80 text-sm leading-relaxed italic">
                      &ldquo;{selectedMember.mission}&rdquo;
                    </p>
                  </div>
                )}
                <p className="text-emerald-100/70 leading-relaxed text-sm">{selectedMember.bio}</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
