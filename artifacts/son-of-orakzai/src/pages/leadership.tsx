import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Crown, Shield, Star, ChevronRight, ChevronLeft, Globe, BadgeCheck,
  MapPin, Mail, Users, ArrowUpRight, HeartHandshake, Landmark,
  ScrollText, X,
} from "lucide-react";
import {
  TeamMember,
  SUPREME_LEADERS,
  BOARD_MEMBERS,
  BOARD_ADVISORS,
  BENEFICIARY_MEMBERS,
  GLOBAL_LEADERSHIP,
  QOUMS,
  QOUM_MALIKS,
} from "./team";

/* ─── Design tokens ─── */
const GOLD = "#D4AF37";
const BG_CARD = "rgba(5,26,16,0.94)";
const BORDER_DEFAULT = "rgba(212,175,55,0.2)";
const BORDER_HOVER = "rgba(212,175,55,0.7)";
const BORDER_ACTIVE = "#D4AF37";
const BLUR = "blur(20px)";

/* ─── Slug helper ─── */
function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "").trim();
}

/* ──────────────────────────────────────────────────────────
   HERO CAROUSEL
────────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  { src: "/faisal-orakzai-unitar.jpg", caption: "Chairman Faisal Orakzai — UNITAR, United Nations" },
  { src: "/hero/heritage-tribal-elders.jpg", caption: "The Tribes of Our Frontier — Orakzai Elders" },
  { src: "/hero/heritage-dost-mohammad-khan.jpg", caption: "A Legacy of Honour & Command" },
  { src: "/hero/heritage-frontier-jirga.jpeg", caption: "A Heritage of Diplomacy & Resolve" },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 3.6, ease: "linear" } }}
          className="absolute inset-0"
        >
          <img
            src={HERO_SLIDES[index].src}
            alt={HERO_SLIDES[index].caption}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </motion.div>
      </AnimatePresence>
      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,26,16,0.55) 0%,rgba(1,26,16,0.78) 55%,#011a10 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center,rgba(1,26,16,0.18) 0%,rgba(1,26,16,0.62) 100%)" }} />
      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <div key={i} className="h-1 rounded-full transition-all duration-500"
            style={{ width: i === index ? 28 : 8, background: i === index ? GOLD : "rgba(212,175,55,0.35)" }} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PILLAR DEFINITIONS
────────────────────────────────────────────────────────── */
type PillarId = "executive" | "board" | "representatives" | "beneficiaries" | "global";

const PILLARS: {
  id: PillarId;
  ordinal: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge: string;
}[] = [
  {
    id: "executive",
    ordinal: "01",
    title: "Executive Team",
    subtitle: "The people who work with us day-to-day — leadership and staff running Orakzai.org's programs on the ground.",
    icon: Users,
    badge: `${SUPREME_LEADERS.length + BOARD_MEMBERS.length} Members`,
  },
  {
    id: "board",
    ordinal: "02",
    title: "Board & Advisors",
    subtitle: "Senior counsel — legal, economic, tribal, and security advisors who guide institutional strategy and governance.",
    icon: Shield,
    badge: `${BOARD_ADVISORS.length} Advisors`,
  },
  {
    id: "representatives",
    ordinal: "03",
    title: "Orakzai Representatives",
    subtitle: "One tribal council per qoum — 19 sub-tribes of the Orakzai nation, each with its own elected Malaks.",
    icon: Landmark,
    badge: `${QOUMS.length} Sectors`,
  },
  {
    id: "beneficiaries",
    ordinal: "04",
    title: "Beneficiary Members",
    subtitle: "Families and individuals directly supported through welfare, education, healthcare, and economic grants.",
    icon: HeartHandshake,
    badge: `${BENEFICIARY_MEMBERS.length}+ Featured`,
  },
  {
    id: "global",
    ordinal: "05",
    title: "Global Leadership",
    subtitle: "Orakzai representatives on the world stage — coordinating diaspora chapters across five continents.",
    icon: Globe,
    badge: `${GLOBAL_LEADERSHIP.length} Regions`,
  },
];

/* ──────────────────────────────────────────────────────────
   PILLAR CARD  — glassmorphism panel with toggle behavior
────────────────────────────────────────────────────────── */
function PillarCard({
  pillar, index, active, onClick,
}: {
  pillar: typeof PILLARS[number];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = pillar.icon;

  const borderColor = active ? BORDER_ACTIVE : hovered ? BORDER_HOVER : BORDER_DEFAULT;
  const boxShadow = active
    ? `0 0 0 1px ${GOLD}55, 0 20px 56px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.22)`
    : hovered
      ? `0 0 0 1px rgba(212,175,55,0.35), 0 28px 52px rgba(0,0,0,0.5), 0 0 48px rgba(212,175,55,0.15)`
      : "inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 28px rgba(0,0,0,0.35)";
  const translateY = hovered && !active ? "-10px" : active ? "-6px" : "0";
  const scale = hovered && !active ? "1.02" : "1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-pressed={active}
      className="group relative rounded-[22px] p-7 md:p-8 cursor-pointer overflow-hidden text-left flex flex-col min-h-[300px] md:min-h-[330px]"
      style={{
        background: BG_CARD,
        backdropFilter: BLUR,
        WebkitBackdropFilter: BLUR,
        border: `1px solid ${borderColor}`,
        boxShadow,
        transform: `translateY(${translateY}) scale(${scale})`,
        transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1), border-color 0.38s ease, box-shadow 0.42s ease",
      }}
    >
      {/* Top hairline accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          opacity: active ? 0.9 : hovered ? 0.6 : 0.3,
        }}
      />

      {/* Ambient corner glow */}
      <div
        className="absolute -top-14 -right-14 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        style={{ background: GOLD, opacity: active ? 0.22 : hovered ? 0.18 : 0 }}
      />

      {/* Active indicator bar — left side */}
      {active && (
        <div
          className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full"
          style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }}
        />
      )}

      {/* Ordinal mark */}
      <span
        className="absolute top-6 right-7 text-[11px] font-bold tracking-[0.22em] transition-opacity duration-400"
        style={{ color: GOLD, fontFamily: "'Playfair Display', serif", opacity: active ? 0.8 : hovered ? 0.55 : 0.28 }}
      >
        {pillar.ordinal}
      </span>

      {/* Icon container */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        style={{
          background: active
            ? `linear-gradient(155deg, rgba(212,175,55,0.28), rgba(212,175,55,0.08))`
            : "linear-gradient(155deg, rgba(212,175,55,0.14), rgba(212,175,55,0.03))",
          border: `1px solid ${active ? GOLD + "88" : GOLD + "44"}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        <Icon className="w-6 h-6" style={{ color: GOLD }} />
      </div>

      {/* Title */}
      <h3
        className="text-xl md:text-[22px] font-bold text-white mb-2.5 tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {pillar.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-emerald-100/52 leading-relaxed mb-7 flex-1">
        {pillar.subtitle}
      </p>

      {/* Footer: badge + explore label */}
      <div
        className="relative flex items-center justify-between pt-5 border-t"
        style={{ borderColor: "rgba(212,175,55,0.14)" }}
      >
        {/* Count badge */}
        <span
          className="text-[10px] font-extrabold uppercase tracking-[0.15em] px-3.5 py-[7px] rounded-full whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, #a9822f)`,
            color: "#0a1f14",
            boxShadow: "0 2px 10px rgba(212,175,55,0.35)",
          }}
        >
          {pillar.badge}
        </span>

        {/* Explore / Active label */}
        <span
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300"
          style={{ color: active ? "#fff" : GOLD }}
        >
          {active ? (
            <>Active <X className="w-3.5 h-3.5" /></>
          ) : (
            <>Explore <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" /></>
          )}
        </span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   MEMBER AVATAR
────────────────────────────────────────────────────────── */
function MemberAvatar({
  src, name, size = 96, dualRing = false, verified = false, onClick,
}: {
  src: string; name: string; size?: number;
  dualRing?: boolean; verified?: boolean; onClick?: () => void;
}) {
  const pad = dualRing ? 10 : 0;
  return (
    <div className="relative flex-shrink-0" style={{ width: size + pad * 2, height: size + pad * 2 }}>
      {dualRing && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(6,95,60,0) 58%, rgba(16,120,74,0.5) 72%, rgba(16,120,74,0) 90%)",
            filter: "blur(3px)",
          }}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open ${name}'s profile`}
        className="absolute rounded-full overflow-hidden transition-transform hover:scale-[1.04] active:scale-95"
        style={{
          top: pad, left: pad, width: size, height: size,
          border: `3px solid ${GOLD}`,
          boxShadow: dualRing
            ? `0 0 0 4px rgba(4,20,14,0.9), 0 0 22px rgba(212,175,55,0.4)`
            : `0 0 16px rgba(212,175,55,0.3)`,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: "top center" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=064e3b&textColor=D4AF37`;
          }}
        />
      </button>
      {verified && (
        <div
          className="absolute w-7 h-7 rounded-full flex items-center justify-center z-10"
          style={{
            bottom: pad - 2, right: pad - 2,
            background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`,
            border: "2.5px solid #041a10",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-950" />
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SUPREME CARD  (Founder / Co-Founder)
────────────────────────────────────────────────────────── */
function SupremeLeaderCard({
  member, index, onOpenBio,
}: { member: TeamMember; index: number; onOpenBio: (m: TeamMember) => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpenBio(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onOpenBio(member); }}
      className="relative flex flex-col items-center text-center p-8 pt-14 rounded-[26px] cursor-pointer"
      style={{
        background: "linear-gradient(160deg, rgba(6,55,36,0.92) 0%, rgba(2,20,13,0.96) 100%)",
        backdropFilter: BLUR,
        WebkitBackdropFilter: BLUR,
        border: `1px solid ${hovered ? GOLD : "rgba(212,175,55,0.48)"}`,
        boxShadow: hovered
          ? "0 0 52px rgba(212,175,55,0.35), 0 20px 48px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.38s ease",
      }}
    >
      {/* Inner frame */}
      <div
        className="absolute inset-3 rounded-[20px] pointer-events-none"
        style={{ border: "1px solid rgba(212,175,55,0.14)" }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-14 -right-14 w-44 h-44 rounded-full blur-3xl pointer-events-none" style={{ background: GOLD, opacity: 0.16 }} />
      <div className="absolute -bottom-14 -left-14 w-36 h-36 rounded-full blur-3xl pointer-events-none" style={{ background: GOLD, opacity: 0.08 }} />

      {/* Supreme badge */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap shadow-lg z-10"
        style={{ background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`, color: "#022c22" }}
      >
        <Crown className="w-3.5 h-3.5" />
        {member.supremeTitle ?? "Supreme Leadership"}
      </div>

      {/* Avatar */}
      <div className="relative mt-3 mb-5">
        <MemberAvatar
          src={member.photo}
          name={member.name}
          size={136}
          dualRing
          verified
          onClick={() => onOpenBio(member)}
        />
      </div>

      <h3
        className="text-[24px] leading-tight font-bold text-white mb-1.5 tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {member.name}
      </h3>
      <p
        className="text-[12px] font-bold mb-6 uppercase tracking-[0.16em]"
        style={{ color: GOLD }}
      >
        {member.title}
      </p>

      <span
        className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300"
        style={{
          background: hovered ? GOLD : "rgba(212,175,55,0.08)",
          border: `1px solid ${GOLD}`,
          color: hovered ? "#04140e" : GOLD,
          boxShadow: hovered ? "0 6px 20px rgba(212,175,55,0.35)" : "none",
        }}
      >
        View Full Profile
        <ChevronRight className="w-3.5 h-3.5" style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s" }} />
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   MEMBER CARD  (department heads, advisors, global)
────────────────────────────────────────────────────────── */
function MemberCard({
  member, index, onOpenBio, showLocation,
}: {
  member: TeamMember; index: number;
  onOpenBio: (m: TeamMember) => void;
  showLocation?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.06 + index * 0.07, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpenBio(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onOpenBio(member); }}
      className="relative flex flex-col items-center text-center p-6 rounded-2xl border cursor-pointer h-full"
      style={{
        background: "linear-gradient(160deg, rgba(6,48,32,0.48) 0%, rgba(2,20,13,0.72) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: hovered ? GOLD : "rgba(212,175,55,0.2)",
        borderWidth: "1px",
        boxShadow: hovered
          ? "0 0 28px rgba(212,175,55,0.28), 0 10px 28px rgba(0,0,0,0.35)"
          : "inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 12px rgba(0,0,0,0.18)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Top accent hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: hovered ? 0.7 : 0.2 }}
      />

      <div className="relative mb-3">
        <MemberAvatar src={member.photo} name={member.name} size={88} onClick={() => onOpenBio(member)} />
      </div>

      {showLocation && member.location && (
        <span
          className="flex items-center justify-center gap-1 px-2.5 py-1 mb-3 rounded-full text-[9px] font-bold text-center leading-tight max-w-full"
          style={{
            background: "linear-gradient(135deg, #1a3d26 0%, #0d2417 100%)",
            border: `1px solid ${GOLD}`,
            color: GOLD,
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <MapPin className="w-2.5 h-2.5 shrink-0" />
          <span>{member.location}</span>
        </span>
      )}

      <h3
        className="text-[15px] font-bold text-white mb-1.5 tracking-wide leading-snug"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {member.name}
      </h3>
      <p className="text-[10.5px] font-semibold mb-5 uppercase tracking-[0.12em]" style={{ color: GOLD }}>
        {member.title}
      </p>

      <span
        className="mt-auto flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-300"
        style={{ color: GOLD, opacity: hovered ? 1 : 0.7 }}
      >
        View Profile
        <ChevronRight
          className="w-3 h-3"
          style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s" }}
        />
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   QOUM CARD  (sub-tribe tiles)
────────────────────────────────────────────────────────── */
function QoumTile({
  qoum, index, onSelect,
}: { qoum: string; index: number; onSelect: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.03 * index, duration: 0.48 }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onSelect(); }}
      className="group flex items-center gap-3.5 p-4 rounded-xl cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(3,45,30,0.52)",
        border: `1px solid rgba(212,175,55,0.2)`,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = GOLD;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 0 22px rgba(212,175,55,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(212,175,55,0.1)", border: `1px solid rgba(212,175,55,0.3)` }}
      >
        <Landmark className="w-4 h-4" style={{ color: GOLD }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
          {qoum}
        </h4>
        <p className="text-[10.5px] text-emerald-100/44">4 Malaks Represented</p>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: GOLD }} />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   SECTION HEADING
────────────────────────────────────────────────────────── */
function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-10">
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
        style={{ background: "rgba(212,175,55,0.09)", border: `1px solid ${GOLD}55`, color: GOLD }}
      >
        <ScrollText className="w-4 h-4" /> {eyebrow}
      </div>
      <h2
        className="text-3xl md:text-4xl font-bold text-white mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      <div className="h-px w-20 mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <p className="text-white/58 max-w-2xl text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PROFILE SHEET  (right-side drawer)
────────────────────────────────────────────────────────── */
function ProfileSheet({
  member, open, onClose, allMembers,
}: {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
  allMembers: TeamMember[];
}) {
  if (!member) return null;

  const directs = allMembers.filter((m) => m.reportsTo === member.name);
  const superior = allMembers.find((m) => m.name === member.reportsTo);

  const contactHref =
    member.website ||
    (member.linkedin && member.linkedin !== "#" ? member.linkedin : undefined) ||
    "/contact";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto p-0 border-l"
        style={{ borderColor: "rgba(212,175,55,0.3)", background: "#061209" }}
      >
        {/* Top gold accent */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        {/* Portrait */}
        <div className="relative w-full overflow-hidden" style={{ height: member.isSupreme ? 320 : 240 }}>
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 15%" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=064e3b&textColor=D4AF37`;
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(6,18,9,0.1) 0%,rgba(6,18,9,0) 40%,rgba(6,18,9,0.9) 100%)" }} />
          {member.isSupreme && (
            <div
              className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`, color: "#022c22" }}
            >
              <Crown className="w-3.5 h-3.5" /> {member.supremeTitle}
            </div>
          )}
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</p>
            <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: GOLD }}>{member.title}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 space-y-5">
          {/* Location + contact */}
          <div className="flex flex-wrap gap-2.5">
            {member.location && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-white/70"
                style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${GOLD}30` }}>
                <MapPin className="w-3 h-3" style={{ color: GOLD }} /> {member.location}
              </span>
            )}
            <a href={contactHref} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${GOLD}30`, color: GOLD }}>
              <Mail className="w-3 h-3" /> Contact
            </a>
          </div>

          <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }} />

          {/* Hierarchy links */}
          {superior && (
            <button
              className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ background: "rgba(212,175,55,0.05)", border: `1px solid ${GOLD}22` }}
            >
              <img src={superior.photo} alt={superior.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                style={{ objectPosition: "top center", border: `2px solid ${GOLD}60` }} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-emerald-100/40">Reports to</p>
                <p className="text-sm font-semibold text-white truncate">{superior.name}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
            </button>
          )}

          {directs.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-widest text-emerald-100/40 mb-2.5 flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Team ({directs.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {directs.map((d) => (
                  <span
                    key={d.id}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full"
                    style={{ background: "rgba(212,175,55,0.07)", border: `1px solid ${GOLD}28` }}
                  >
                    <img src={d.photo} alt={d.name} className="w-5 h-5 rounded-full object-cover" style={{ objectPosition: "top center" }} />
                    <span className="text-xs text-white/75">{d.name.split(" ")[0]}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}35, transparent)` }} />

          {/* Mission quote */}
          {member.mission && (
            <div className="relative pl-5 mb-4">
              <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: GOLD }} />
              <p className="text-emerald-100/75 text-sm leading-relaxed italic">
                &ldquo;{member.mission}&rdquo;
              </p>
            </div>
          )}

          {/* Bio */}
          <p className="text-emerald-100/65 leading-relaxed text-sm whitespace-pre-line">{member.bio}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────────────────────────────────────────
   MEMBER GRID  — renders the correct content per active pillar
────────────────────────────────────────────────────────── */
type SubView = "list" | "qoum";

function MemberGrid({
  activePillar,
  onOpenBio,
}: {
  activePillar: PillarId;
  onOpenBio: (m: TeamMember) => void;
}) {
  const [subView, setSubView] = useState<{ mode: SubView; qoum?: string }>({ mode: "list" });

  // Reset sub-view whenever the active pillar changes
  useEffect(() => { setSubView({ mode: "list" }); }, [activePillar]);

  const pillarMeta = PILLARS.find((p) => p.id === activePillar)!;
  const pillarDescs: Record<PillarId, string> = {
    executive: "The people who work with us day-to-day — leadership and staff running Orakzai.org's programs on the ground.",
    board: "Senior counsel — legal, economic, tribal, and security advisors who guide institutional strategy and governance.",
    representatives: "One tribal council per qoum — 19 sub-tribes of the Orakzai nation, each with its own elected Malaks.",
    beneficiaries: "Families and individuals directly supported through welfare, education, healthcare, and economic grants.",
    global: "Orakzai representatives on the world stage — coordinating diaspora chapters across five continents.",
  };

  return (
    <motion.section
      key={activePillar}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-8"
    >
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}50)` }} />
        <div
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
          style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${GOLD}55`, color: GOLD }}
        >
          {pillarMeta.title}
        </div>
        <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${GOLD}50)` }} />
      </div>

      <SectionHeading
        eyebrow={pillarMeta.ordinal + " · " + pillarMeta.badge}
        title={activePillar === "executive" ? "The People Who Run Orakzai.org" :
               activePillar === "board" ? "Senior Counsel & Governance" :
               activePillar === "representatives" ? "The Qoums of Orakzai" :
               activePillar === "beneficiaries" ? "Families We Uplift" :
               "Orakzai on the World Stage"}
        description={pillarDescs[activePillar]}
      />

      <AnimatePresence mode="wait">
        {/* ═══ EXECUTIVE TEAM ═══ */}
        {activePillar === "executive" && (
          <motion.div key="exec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* Supreme tier */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-7 justify-center">
                <div className="h-px flex-1 max-w-20" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: "rgba(212,175,55,0.09)", border: `1px solid ${GOLD}55`, color: GOLD }}>
                  <Crown className="w-4 h-4" /> Supreme Leadership
                </div>
                <div className="h-px flex-1 max-w-20" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-3xl mx-auto">
                {SUPREME_LEADERS.map((m, i) => (
                  <SupremeLeaderCard key={m.id} member={m} index={i} onOpenBio={onOpenBio} />
                ))}
              </div>
            </div>

            {/* Department heads */}
            <div>
              <div className="flex items-center gap-3 mb-7 justify-center">
                <div className="h-px flex-1 max-w-20" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: "rgba(212,175,55,0.09)", border: `1px solid ${GOLD}55`, color: GOLD }}>
                  <Star className="w-4 h-4" /> Department Heads
                </div>
                <div className="h-px flex-1 max-w-20" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {BOARD_MEMBERS.map((m, i) => (
                  <MemberCard key={m.id} member={m} index={i} onOpenBio={onOpenBio} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ BOARD & ADVISORS ═══ */}
        {activePillar === "board" && (
          <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BOARD_ADVISORS.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} onOpenBio={onOpenBio} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ ORAKZAI REPRESENTATIVES ═══ */}
        {activePillar === "representatives" && subView.mode === "list" && (
          <motion.div key="reps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {QOUMS.map((qoum, i) => (
                <QoumTile
                  key={qoum}
                  qoum={qoum}
                  index={i}
                  onSelect={() => setSubView({ mode: "qoum", qoum })}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ SINGLE QOUM ═══ */}
        {activePillar === "representatives" && subView.mode === "qoum" && subView.qoum && (
          <motion.div key={`qoum-${subView.qoum}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <button
              onClick={() => setSubView({ mode: "list" })}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${GOLD}40`, color: GOLD }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              All 19 Qoums
            </button>
            <SectionHeading
              eyebrow={`${subView.qoum} Qoum`}
              title={`Malaks of ${subView.qoum}`}
              description={`The tribal council representing the ${subView.qoum} qoum within Orakzai.org.`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {QOUM_MALIKS[subView.qoum].map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} onOpenBio={onOpenBio} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ BENEFICIARY MEMBERS ═══ */}
        {activePillar === "beneficiaries" && (
          <motion.div key="benef" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFICIARY_MEMBERS.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} onOpenBio={onOpenBio} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ GLOBAL LEADERSHIP ═══ */}
        {activePillar === "global" && (
          <motion.div key="global" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GLOBAL_LEADERSHIP.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} onOpenBio={onOpenBio} showLocation />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────
   ALL MEMBERS (for bio sheet hierarchy lookup)
────────────────────────────────────────────────────────── */
const ALL_QOUM_MEMBERS: TeamMember[] = Object.values(QOUM_MALIKS).flat();
const ALL_MEMBERS: TeamMember[] = [
  ...SUPREME_LEADERS, ...BOARD_MEMBERS, ...BOARD_ADVISORS,
  ...BENEFICIARY_MEMBERS, ...GLOBAL_LEADERSHIP, ...ALL_QOUM_MEMBERS,
];

/* ──────────────────────────────────────────────────────────
   LEADERSHIP PAGE  (default export, rendered at /leadership + /team)
────────────────────────────────────────────────────────── */
export default function Leadership({
  params,
}: {
  params?: Record<string, string | undefined>;
} = {}) {
  const [activePillar, setActivePillar] = useState<PillarId | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const memberGridRef = useRef<HTMLDivElement>(null);

  // SEO
  useEffect(() => {
    document.title = "Our People | Leadership & Team — Orakzai.org";
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const desc = "Five institutional pillars of the people who build, guide, represent, and are uplifted by Orakzai.org — Executive Team, Board & Advisors, Orakzai Representatives, Beneficiary Members, and Global Leadership.";
    setMeta("description", desc);
    setMeta("og:title", "Our People | Leadership — Orakzai.org", true);
    setMeta("og:description", desc, true);
    return () => { document.title = "Orakzai.org — Digital Embassy"; };
  }, []);

  const openBio = (member: TeamMember) => { setSelectedMember(member); setSheetOpen(true); };

  const handlePillarClick = (id: PillarId) => {
    if (activePillar === id) {
      // Toggle off
      setActivePillar(null);
    } else {
      setActivePillar(id);
      // Smooth scroll to member grid after brief delay
      setTimeout(() => {
        memberGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #011a10 0%, #022c22 50%, #011a10 100%)" }}>

        {/* ── HERO ── */}
        <div className="relative min-h-[68vh] md:min-h-[76vh] flex items-center justify-center text-center overflow-hidden">
          <HeroCarousel />

          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none z-[1]">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-[0.07] blur-3xl" style={{ background: GOLD }} />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-[0.07] blur-3xl" style={{ background: GOLD }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 px-4"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
                Orakzai · Digital Embassy
              </span>
              <Shield className="w-4 h-4" style={{ color: GOLD }} />
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-5 leading-none"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
            >
              Our People
            </h1>
            <div className="h-px w-24 mx-auto mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <p className="text-white/72 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              A living legacy of honour, heritage, and service — five institutional pillars of the people who build, guide, represent, and are uplifted by Orakzai.org.
            </p>

            {/* Who Builds label */}
            <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ background: "rgba(212,175,55,0.09)", border: `1px solid ${GOLD}45` }}>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
                Five Institutional Pillars
              </span>
            </div>
          </motion.div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent, #011a10)" }} />
        </div>

        {/* ── CONTENT ── */}
        <div className="container mx-auto px-4 md:px-8 pb-28">

          {/* Who Builds Orakzai.org */}
          <div className="flex flex-col items-center text-center mb-10">
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
              style={{ background: "rgba(212,175,55,0.09)", border: `1px solid ${GOLD}55`, color: GOLD }}
            >
              <ScrollText className="w-4 h-4" /> Five Institutional Pillars
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Who Builds Orakzai.org
            </h2>
            <div className="h-px w-20 mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <p className="text-white/55 max-w-2xl text-sm md:text-base leading-relaxed">
              Each pillar operates as its own institution — its own people, its own mandate, all accountable to one shared
              mission. Select a pillar to meet the people behind it.
            </p>
          </div>

          {/* PILLAR CARDS — 5 cards, responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mb-4">
            {PILLARS.map((pillar, i) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                index={i}
                active={activePillar === pillar.id}
                onClick={() => handlePillarClick(pillar.id)}
              />
            ))}
          </div>

          {/* Hint text */}
          {!activePillar && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-emerald-100/35 text-xs uppercase tracking-[0.2em] mt-5"
            >
              Select a pillar to explore
            </motion.p>
          )}

          {/* ── MEMBER GRID — toggles in below pillar cards ── */}
          <div ref={memberGridRef}>
            <AnimatePresence mode="wait">
              {activePillar && (
                <MemberGrid
                  key={activePillar}
                  activePillar={activePillar}
                  onOpenBio={openBio}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── CTA FOOTER STRIP ── */}
        <div
          className="py-20 px-4 text-center"
          style={{
            background: "linear-gradient(180deg, rgba(1,26,16,0) 0%, rgba(2,40,26,0.5) 40%, rgba(1,26,16,0) 100%)",
            borderTop: `1px solid ${BORDER_DEFAULT}`,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>
            Ready to Make a Difference?
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Become part of the<br />Orakzai family
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/join"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-[0.12em] transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #a9822f)`,
                color: "#04140e",
                boxShadow: "0 6px 22px rgba(212,175,55,0.4)",
              }}
            >
              Join Now
            </a>
            <a
              href="/donate"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-[0.12em] transition-all hover:scale-105"
              style={{
                background: "rgba(212,175,55,0.08)",
                border: `1px solid ${GOLD}55`,
                color: GOLD,
              }}
            >
              Donate
            </a>
          </div>
        </div>
      </div>

      {/* ── PROFILE SHEET ── */}
      <ProfileSheet
        member={selectedMember}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        allMembers={ALL_MEMBERS}
      />
    </MainLayout>
  );
}
