import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle, Loader2, CheckCircle2, User, Calendar, MapPin, Briefcase } from "lucide-react";

const GOLD = "#D4AF37";
const BG   = "#011a10";

function hashCnic(cnic: string) {
  if (!cnic) return "—";
  const parts = cnic.split("-");
  if (parts.length === 3) return `${parts[0]}-•••••••-${parts[2]}`;
  return cnic.slice(0, 5) + "-•••••••-" + cnic.slice(-1);
}

interface MemberRecord {
  id: number;
  memberId: string | null;
  name: string;
  profession: string;
  cnic: string;
  nationality: string | null;
  city: string | null;
  country: string | null;
  location: string;
  interest: string;
  photo: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  status: string;
}

export default function Verify() {
  const { memberId } = useParams<{ memberId: string }>();
  const [member, setMember] = useState<MemberRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!memberId) return;
    setLoading(true);
    setNotFound(false);
    fetch(`/api/members/verify/${encodeURIComponent(memberId)}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setMember(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [memberId]);

  return (
    <MainLayout>
      <section
        className="min-h-screen py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BG} 0%, #02280f 55%, ${BG} 100%)` }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />

        <div className="container mx-auto px-6 max-w-2xl relative z-10">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[10px] font-black tracking-[0.22em]" style={{ border: `1px solid rgba(212,175,55,0.25)`, background: "rgba(212,175,55,0.06)", color: GOLD }}>
              <ShieldCheck className="w-3.5 h-3.5" /> MEMBER VERIFICATION
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Digital ID Verification
            </h1>
            <p className="text-white/40 text-sm">
              Official verification portal for Orakzai.org Global Digital Citizenship Cards
            </p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-16">
              <Loader2 className="w-10 h-10 animate-spin" style={{ color: GOLD }} />
              <p className="text-white/50 text-sm">Verifying membership…</p>
            </motion.div>
          )}

          {/* Not Found */}
          {!loading && notFound && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-8 text-center" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)" }}>
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
              <h2 className="text-xl font-bold text-white mb-2">Member Not Found</h2>
              <p className="text-white/50 text-sm mb-1">No record found for member ID:</p>
              <p className="font-mono font-bold text-red-400 text-lg">{memberId}</p>
              <p className="text-white/35 text-xs mt-4">If you believe this is an error, please contact support@orakzai.org</p>
            </motion.div>
          )}

          {/* Member Found */}
          {!loading && member && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Verification stamp */}
              <div className="flex justify-center mb-6">
                <motion.div
                  className="flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.30)" }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0.2)", "0 0 0 16px rgba(34,197,94,0)", "0 0 0 0 rgba(34,197,94,0)"] }}
                  transition={{ duration: 2, repeat: 3 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-black text-sm tracking-widest uppercase">Verified Member</span>
                </motion.div>
              </div>

              {/* Card */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(145deg, #031a0e 0%, #051c10 50%, #021509 100%)",
                  border: `2px solid rgba(212,175,55,0.45)`,
                  boxShadow: `0 0 60px rgba(212,175,55,0.12), 0 20px 60px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Gold top stripe */}
                <div style={{ height: 4, background: `linear-gradient(90deg, transparent, ${GOLD}, #f5e070, ${GOLD}, transparent)` }} />

                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(212,175,55,0.18)", background: "rgba(212,175,55,0.05)" }}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full overflow-hidden w-8 h-8" style={{ border: `1px solid rgba(212,175,55,0.6)` }}>
                      <img src="/orakzai-org-logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase" style={{ color: GOLD }}>Orakzai.Org</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-[0.15em]" style={{ fontFamily: "'Playfair Display', serif", color: GOLD }}>ORAKZAI.ORG</div>
                    <div className="text-[7px] tracking-[0.22em] font-black" style={{ color: "rgba(212,175,55,0.65)" }}>GLOBAL DIGITAL CITIZENSHIP CARD</div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded text-[8px] font-black tracking-wider" style={{ border: `1px solid rgba(212,175,55,0.5)`, color: GOLD }}>
                    ✦ VERIFIED
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5 flex gap-5">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="relative" style={{ width: 96, height: 96 }}>
                      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(212,175,55,0.20)" }} />
                      <div className="absolute rounded-full" style={{ inset: 6, border: `3px solid ${GOLD}`, boxShadow: `0 0 14px rgba(212,175,55,0.25)` }} />
                      <div className="absolute rounded-full overflow-hidden flex items-center justify-center" style={{ inset: 13, background: "rgba(212,175,55,0.08)" }}>
                        {member.photo
                          ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                          : <User className="w-8 h-8" style={{ color: "rgba(212,175,55,0.4)" }} />
                        }
                      </div>
                      <div className="absolute flex items-center justify-center rounded-full" style={{ width: 22, height: 22, bottom: 10, right: 10, background: "radial-gradient(circle at 35% 30%, #f5e070, #c9a227, #7a5a0a)", border: "2px solid #051c0f", zIndex: 10 }}>
                        <CheckCircle2 className="w-3 h-3" style={{ color: "#051c0f" }} />
                      </div>
                    </div>
                  </div>

                  {/* Data */}
                  <div className="flex-1 space-y-2">
                    {[
                      ["Member Name",      member.name,                                         true],
                      ["Designation",      member.profession,                                   false],
                      ["CNIC / National ID", hashCnic(member.cnic),                            false],
                      ["Nationality",      member.nationality || "—",                           false],
                      ["Location",         member.city ? `${member.city}, ${member.country}` : member.location, false],
                      ["Area of Interest", member.interest,                                     false],
                    ].map(([label, value, large]) => (
                      <div key={String(label)} className="flex items-start gap-2">
                        <span className="text-[9px] font-black uppercase tracking-wider flex-shrink-0" style={{ color: "rgba(212,175,55,0.75)", minWidth: 110 }}>{String(label)}</span>
                        <span className="text-[9px] font-black flex-shrink-0" style={{ color: "rgba(212,175,55,0.6)" }}>:</span>
                        <span style={{ fontSize: large ? 14 : 11, fontWeight: large ? 700 : 500, color: large ? "#fff" : "#e0e0e0", fontFamily: large ? "'Playfair Display', Georgia, serif" : undefined }}>{String(value) || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 flex items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(212,175,55,0.18)", background: "rgba(0,0,0,0.2)" }}>
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: "rgba(212,175,55,0.6)" }}>Member ID</div>
                    <div className="font-mono font-black text-sm" style={{ color: GOLD }}>{member.memberId || memberId}</div>
                  </div>
                  {member.issueDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" style={{ color: "rgba(212,175,55,0.5)" }} />
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>Issued</div>
                        <div className="text-[10px] text-white/70">{member.issueDate}</div>
                      </div>
                    </div>
                  )}
                  {member.expiryDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" style={{ color: "rgba(212,175,55,0.5)" }} />
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>Expires</div>
                        <div className="text-[10px] text-white/70">{member.expiryDate}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-[9px] font-black uppercase tracking-wider">Active</span>
                  </div>
                </div>

                {/* Bottom ticker */}
                <div className="overflow-hidden" style={{ height: 16, background: "rgba(212,175,55,0.08)", borderTop: "1px solid rgba(212,175,55,0.18)" }}>
                  <div className="flex items-center h-full whitespace-nowrap" style={{ animation: "tickerScroll 20s linear infinite", fontSize: 6, fontWeight: 900, letterSpacing: "0.28em", color: "rgba(212,175,55,0.5)" }}>
                    {Array(4).fill("GLOBAL MEMBER • DIGITAL CITIZEN • SECURE • VERIFIED • TRUSTED • ORAKZAI.ORG • ").map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>
                  <style>{`@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-25%)}}`}</style>
                </div>
              </div>

              {/* Bottom note */}
              <p className="text-center text-white/30 text-xs mt-6">
                This verification is provided by Orakzai.org · Official Global Digital Citizenship Registry
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
