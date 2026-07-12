import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { MapPin, Star, Linkedin, Twitter, Globe, Mail, ArrowLeft, Crown, BadgeCheck } from "lucide-react";
import {
  SUPREME_LEADERS, BOARD_MEMBERS, BOARD_ADVISORS, GLOBAL_LEADERSHIP,
  BENEFICIARY_MEMBERS, type TeamMember,
} from "@/pages/team";

const GOLD = "#D4AF37";

/* ── slug helper — "Dr. Asma Orakzai" → "drasmaorakzai" ── */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")   // strip punctuation (., (), etc.)
    .replace(/\s+/g, "")            // remove all spaces
    .trim();
}

const ALL_PROFILEABLE: TeamMember[] = [
  ...SUPREME_LEADERS,
  ...BOARD_MEMBERS,
  ...BOARD_ADVISORS,
  ...GLOBAL_LEADERSHIP,
  ...BENEFICIARY_MEMBERS,
];

export default function TeamProfile() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const member = ALL_PROFILEABLE.find((m) => toSlug(m.name) === slug);

  useEffect(() => {
    if (!member) {
      document.title = "Profile Not Found | Orakzai.org";
      return;
    }

    document.title = `${member.name} — ${member.title} | Orakzai.org`;

    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const desc = member.bio.slice(0, 200).replace(/\n/g, " ") + "…";
    setMeta("description", desc);
    setMeta("keywords", `${member.name}, Orakzai, ${member.title}, orakzai.org, Orakzai team`);
    setMeta("og:title", `${member.name} — ${member.title} | Orakzai.org`, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", `https://sonoforakzai.vercel.app${member.photo}`, true);
    setMeta("og:url", `https://sonoforakzai.vercel.app/team/${slug}`, true);
    setMeta("twitter:title", `${member.name} | Orakzai.org`);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", `https://sonoforakzai.vercel.app${member.photo}`);

    // JSON-LD Person
    const existing = document.getElementById("profile-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "profile-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.title,
      "description": member.bio.replace(/\n/g, " "),
      "image": `https://sonoforakzai.vercel.app${member.photo}`,
      "url": `https://sonoforakzai.vercel.app/team/${slug}`,
      "worksFor": { "@type": "Organization", "name": "Orakzai.org", "url": "https://sonoforakzai.vercel.app" },
      ...(member.linkedin && member.linkedin !== "#" ? { "sameAs": [member.linkedin] } : {}),
      ...(member.location ? { "address": { "@type": "PostalAddress", "addressLocality": member.location } } : {}),
    });
    document.head.appendChild(script);

    return () => {
      document.title = "Orakzai.org — Digital Embassy";
      document.getElementById("profile-jsonld")?.remove();
    };
  }, [member, slug]);

  /* ── 404 ── */
  if (!member) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#011a10" }}>
          <p className="text-white/60 text-lg mb-6">Profile not found.</p>
          <Link href="/team" className="text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full" style={{ background: GOLD, color: "#011a10" }}>
            ← Back to Team
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isSupreme = !!member.isSupreme;
  const contactHref = member.linkedin && member.linkedin !== "#" ? member.linkedin : `mailto:info@orakzai.org`;

  return (
    <MainLayout>
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #010f0a 0%, #011a10 60%, #010f0a 100%)" }}>

        {/* ── Hero band ── */}
        <div className="relative overflow-hidden">
          {/* bg photo */}
          <div className="absolute inset-0">
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" style={{ filter: "brightness(0.22) saturate(1.1)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(1,15,10,0.3) 0%, #010f0a 100%)" }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-5 pt-24 pb-12">
            {/* Back link */}
            <Link href="/team" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-10 transition-opacity hover:opacity-70" style={{ color: GOLD }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Team
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden" style={{ border: `3px solid ${GOLD}` }}>
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                {isSupreme && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
                    <Crown className="w-4 h-4" style={{ color: "#011a10" }} />
                  </div>
                )}
              </div>

              {/* Name / title */}
              <div>
                {isSupreme && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] mb-2 px-3 py-1 rounded-full" style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}>
                    <BadgeCheck className="w-3 h-3" /> {member.supremeTitle ?? "Leadership"}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {member.name}
                </h1>
                <p className="text-sm font-bold uppercase tracking-[0.18em] mt-1" style={{ color: GOLD }}>{member.title}</p>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  {member.location && (
                    <span className="flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin className="w-3 h-3" /> {member.location}
                    </span>
                  )}
                  {member.focus && (
                    <span className="flex items-center gap-1.5 text-xs text-white/50">
                      <Star className="w-3 h-3" /> {member.focus}
                    </span>
                  )}
                </div>

                {/* Social links */}
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <a href={contactHref} target={contactHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                    style={{ background: GOLD, color: "#022c22" }}>
                    <Mail className="w-3.5 h-3.5" /> Contact
                  </a>
                  {member.linkedin && member.linkedin !== "#" && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="p-2.5 rounded-full transition-all hover:scale-110"
                      style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}44` }}>
                      <Linkedin className="w-4 h-4" style={{ color: GOLD }} />
                    </a>
                  )}
                  {member.twitter && member.twitter !== "#" && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                      className="p-2.5 rounded-full transition-all hover:scale-110"
                      style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}44` }}>
                      <Twitter className="w-4 h-4" style={{ color: GOLD }} />
                    </a>
                  )}
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer" aria-label="Website"
                      className="p-2.5 rounded-full transition-all hover:scale-110"
                      style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}44` }}>
                      <Globe className="w-4 h-4" style={{ color: GOLD }} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-4xl mx-auto px-5 pb-24 space-y-10 pt-2">

          {/* Divider */}
          <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)` }} />

          {/* Mission */}
          {member.mission && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{ color: GOLD }}>Mission Statement</p>
              <div className="relative pl-5 py-1">
                <div className="absolute left-0 top-0 h-full w-[3px] rounded-full" style={{ background: `linear-gradient(to bottom, ${GOLD}, ${GOLD}20)` }} />
                <p className="text-white/85 text-lg leading-relaxed italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  &ldquo;{member.mission}&rdquo;
                </p>
              </div>
            </motion.div>
          )}

          {/* Biography */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Biography</p>
            <div className="text-white/75 leading-relaxed text-sm space-y-4">
              {member.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Leadership Principles */}
          {member.leadershipPrinciples && member.leadershipPrinciples.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Leadership Principles</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {member.leadershipPrinciples.map((p, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}22` }}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: `linear-gradient(135deg, #f5e07e, ${GOLD})`, color: "#011a10" }}>{i + 1}</div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{p.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Strategic Focus Areas */}
          {member.strategicFocusAreas && member.strategicFocusAreas.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Strategic Focus Areas</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {member.strategicFocusAreas.map((a, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(4,26,16,0.8), rgba(2,14,9,0.9))", border: `1px solid ${GOLD}22` }}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: GOLD }} />
                      <p className="text-sm font-bold text-white">{a.title}</p>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed pl-3.5">{a.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Current Initiatives */}
          {member.currentInitiatives && member.currentInitiatives.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Current Initiatives</p>
              <div className="space-y-3">
                {member.currentInitiatives.map((init, i) => (
                  <div key={i} className="p-4 rounded-xl flex items-start justify-between gap-3" style={{ background: "rgba(3,35,22,0.7)", border: `1px solid ${GOLD}20` }}>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{init.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{init.description}</p>
                    </div>
                    <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{
                      background: init.status === "Active" ? "rgba(16,185,129,0.15)" : init.status === "Completed" ? `${GOLD}20` : "rgba(59,130,246,0.15)",
                      color: init.status === "Active" ? "#10b981" : init.status === "Completed" ? GOLD : "#60a5fa",
                      border: `1px solid ${init.status === "Active" ? "rgba(16,185,129,0.3)" : init.status === "Completed" ? `${GOLD}44` : "rgba(59,130,246,0.3)"}`,
                    }}>
                      {init.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back CTA */}
          <div className="pt-4">
            <Link href="/team" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:scale-105" style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}44`, color: GOLD }}>
              <ArrowLeft className="w-4 h-4" /> View Full Team
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
