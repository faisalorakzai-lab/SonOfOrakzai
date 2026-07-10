import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Target, Heart, Shield, BookOpen, Clock, Crown, Star, ChevronRight } from "lucide-react";

const GOLD = "#D4AF37";

const timeline = [
  { year: "2015", title: "Foundation", desc: "Orakzai was established with a vision to unite the community." },
  { year: "2018", title: "Education Initiative", desc: "Launched the first scholarship program for deserving students." },
  { year: "2020", title: "Health Camps", desc: "Started regular free medical camps across the district." },
  { year: "2023", title: "Digital Era", desc: "Launched the Digital Skill Lab to empower youth with modern skills." },
];

const grandVisionaries = [
  {
    name: "Faisal Orakzai",
    title: "Chairman",
    image: "/faisal-orakzai.png",
    mission: "To forge a legacy of unity and progress for the Orakzai people — where every voice is heard, every talent is nurtured, and no family is left behind. Our strength is our togetherness.",
    bio: "Chairman Faisal Orakzai is the driving force behind Orakzai's transformation into a nationally recognized community movement. With a visionary approach rooted in deep love for his homeland, he has spearheaded initiatives spanning education, healthcare, digital empowerment, and civic representation. Under his leadership, the organization has grown from a grassroots effort into a structured institution serving thousands of Orakzai families. His commitment to transparent governance and inclusive leadership sets the tone for everything the organization does. Chairman Faisal believes that true prosperity is collective — and that the Orakzai district's greatest resource is the resilience and talent of its people.",
  },
  {
    name: "Malak Speen Gul Orakzai",
    title: "Founder",
    image: "/malak-speen-gul.jpg",
    mission: "I founded this organization with one belief: that the sons and daughters of Orakzai carry within them the seeds of greatness. Our duty is to water those seeds — with education, with opportunity, and with unwavering unity.",
    bio: "Malak Speen Gul Orakzai is the founder and patriarch of Orakzai, a man whose life embodies the spirit of selfless service. Born and raised in the Orakzai district, he witnessed firsthand the challenges faced by his community — limited access to education, healthcare, and economic opportunity. Driven by an unshakeable belief in the potential of his people, he laid the foundation of this organization with his own resources, rallying elders, youth, and professionals around a shared vision. Malak Speen Gul's wisdom, rooted in decades of tribal leadership and community mediation, continues to guide the organization's values and direction. He is universally revered as the moral compass of the movement.",
  },
];

const boardMembers = [
  {
    name: "Maria Hussain",
    title: "Education Head",
    initials: "MH",
    bio: "Maria Hussain has dedicated over a decade to transforming education access across the Orakzai district. A graduate of Quaid-i-Azam University with a Master's in Education Policy, she designed and launched the organization's flagship scholarship program that has benefited more than 500 students. She oversees curriculum development, teacher training initiatives, and digital literacy programs. Maria's philosophy is simple: an educated Orakzai is an empowered Orakzai. Under her guidance, the Education Department has established five learning centers and partnered with national universities for distance learning programs.",
  },
  {
    name: "Dr. Asma Orakzai",
    title: "Director of Health Services",
    initials: "DA",
    bio: "Dr. Asma Orakzai is a qualified physician with specialized training in community health and preventive medicine. She leads the organization's medical outreach programs, including quarterly free medical camps that have served over 10,000 patients across remote Orakzai villages. Dr. Asma has built a network of volunteer doctors, nurses, and paramedics committed to bringing quality healthcare to underserved communities. She also spearheads maternal health and child welfare initiatives, significantly reducing health disparities in the district. Her compassion, clinical expertise, and administrative acumen make her an indispensable pillar of the organization.",
  },
  {
    name: "Kashif Orakzai",
    title: "Operations & Logistics Head",
    initials: "KO",
    bio: "Kashif Orakzai is the operational backbone of Orakzai, ensuring that every project is delivered with precision and efficiency. With a background in supply chain management and project coordination, he has streamlined the organization's field operations across multiple districts. From coordinating relief deliveries in disaster zones to managing the logistics of large-scale community events, Kashif's meticulous planning ensures nothing falls through the cracks. He has developed the organization's standard operating procedures and volunteer management systems, enabling it to scale its impact while maintaining accountability at every level.",
  },
  {
    name: "Ghazi Mansoor Orakzai",
    title: "Community Engagement Lead",
    initials: "GM",
    bio: "Ghazi Mansoor Orakzai is the bridge between Orakzai's leadership and the grassroots communities it serves. With exceptional interpersonal skills and deep-rooted community trust, he facilitates dialogue between tribal elders, youth groups, and organizational leadership. He oversees the organization's outreach programs, community forums, and the Jirga engagement initiatives. Ghazi's talent for building consensus across diverse groups has been instrumental in resolving community disputes and rallying collective action around shared goals. His work ensures that the organization remains genuinely connected to the people it represents.",
  },
  {
    name: "Zubair Orakzai",
    title: "IT & Blockchain Strategist",
    initials: "ZO",
    bio: "Zubair Orakzai is a technology entrepreneur and blockchain specialist who brings cutting-edge digital solutions to the Orakzai community's development agenda. Educated at NUST and internationally certified in blockchain applications, he is building transparent fund-tracking systems and digital identity solutions for community members. Zubair also leads the Digital Skill Lab initiative, which provides free coding, freelancing, and tech entrepreneurship training to Orakzai youth. His vision is to position the Orakzai district as a hub for Pakistan's digital economy, creating sustainable livelihoods through technology and innovation.",
  },
  {
    name: "Haqnawaz Orakzai",
    title: "Welfare & Relief Coordinator",
    initials: "HO",
    bio: "Haqnawaz Orakzai leads the organization's welfare and humanitarian relief operations with tireless dedication and compassion. He has coordinated emergency relief efforts during floods, droughts, and displacement crises affecting Orakzai communities, distributing food packages, tents, and medical supplies to thousands of families. Beyond emergency response, he manages ongoing welfare programs including widow support, orphan care, and financial assistance for families in need. Haqnawaz's deep empathy and ground-level knowledge of community needs make him the first responder in any humanitarian situation the organization addresses.",
  },
  {
    name: "Abdul Razzaq Orakzai",
    title: "Strategic Planning Officer",
    initials: "AR",
    bio: "Abdul Razzaq Orakzai is the strategic mind behind Orakzai's long-term development roadmap. With an MBA and extensive experience in public sector planning, he develops five-year strategic plans, tracks organizational KPIs, and ensures alignment between field activities and institutional goals. He has successfully authored proposals that secured partnerships with national NGOs and international development organizations. Abdul Razzaq's analytical approach and policy expertise help the organization punch above its weight, translating community needs into actionable, fundable programs that deliver measurable results.",
  },
  {
    name: "Sher Wali Orakzai",
    title: "Talent & Sports Director",
    initials: "SW",
    bio: "Sher Wali Orakzai champions the immense untapped potential of Orakzai youth through sports, arts, and talent development programs. A former regional-level athlete himself, he established the organization's Sports Academy which has produced national-level competitors in cricket, football, and martial arts. Beyond athletics, Sher Wali runs talent discovery programs that have identified and supported young artists, musicians, and performers from the district. He believes that nurturing talent builds confidence, discipline, and community pride — qualities that transform individuals and societies alike. His programs have become a source of joy and aspiration for thousands of young Orakzai.",
  },
  {
    name: "Muhammad Hayat",
    title: "Finance & Transparency Head",
    initials: "MH2",
    bio: "Muhammad Hayat is the guardian of Orakzai's financial integrity. A chartered accountant with extensive experience in nonprofit finance, he oversees all financial planning, budgeting, auditing, and reporting processes. Under his stewardship, the organization has achieved full financial transparency — publishing detailed annual reports and implementing blockchain-verified fund tracking for donor contributions. Muhammad Hayat has built a culture of accountability within the organization, ensuring that every rupee donated by community members and partners is deployed with maximum impact and complete honesty. His work has earned the trust of donors, government bodies, and the communities the organization serves.",
  },
];

function MemberCard({ member, onClick }: { member: typeof boardMembers[0]; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center group"
    >
      {/* Photo Frame */}
      <div
        className="relative w-44 h-44 mb-5"
        style={{ filter: "drop-shadow(0 8px 24px rgba(212,175,55,0.25))" }}
      >
        {/* Gold border frame */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #B8962E, #F5E07E, #D4AF37)",
            padding: "3px",
          }}
        >
          <div className="w-full h-full rounded-full bg-[#0a1a0f] flex items-center justify-center overflow-hidden">
            {/* Elegant placeholder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0d2b1a] to-[#041409] flex items-center justify-center relative overflow-hidden">
              {/* Subtle texture */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
                backgroundSize: "8px 8px"
              }} />
              <span
                className="relative z-10 text-4xl font-bold tracking-wider"
                style={{ color: GOLD, fontFamily: "Georgia, serif", textShadow: "0 2px 12px rgba(212,175,55,0.4)" }}
              >
                {member.initials.replace("2", "")}
              </span>
            </div>
          </div>
        </div>
        {/* Corner ornament */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
          <Star className="w-3 h-3 text-emerald-950 fill-emerald-950" />
        </div>
      </div>

      {/* Name & Title */}
      <h3
        className="text-lg font-bold mb-1 leading-tight"
        style={{ color: GOLD, fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
      >
        {member.name}
      </h3>
      <p className="text-sm text-emerald-200/60 mb-4 uppercase tracking-widest font-medium">{member.title}</p>

      {/* Biography Button */}
      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
        className="rounded-full border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-emerald-950 hover:border-[#D4AF37] transition-all duration-300 text-xs font-bold px-5 gap-1.5 bg-transparent"
      >
        Biography
        <ChevronRight className="w-3 h-3" />
      </Button>
    </motion.div>
  );
}

export default function About() {
  const [selectedMember, setSelectedMember] = useState<(typeof boardMembers[0] & { image?: string; mission?: string }) | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openBio = (member: typeof boardMembers[0] & { image?: string; mission?: string }) => {
    setSelectedMember(member);
    setSheetOpen(true);
  };

  return (
    <MainLayout>
      {/* ─── HERO ─── */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            Orakzai is more than an organization; it is a movement. Born from a deep love for our homeland, we strive to build a future where every member of the Orakzai community is empowered, educated, and prosperous.
          </motion.p>
        </div>
      </section>

      {/* ─── GRAND VISIONARIES ─── */}
      <section className="py-24 bg-[#071a0e] relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: GOLD, filter: "blur(120px)" }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: GOLD, filter: "blur(120px)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <Crown className="w-6 h-6" style={{ color: GOLD }} />
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: GOLD, fontFamily: "Georgia, serif" }}
            >
              Grand Visionaries
            </h2>
            <p className="text-emerald-200/50 text-lg max-w-2xl mx-auto">
              The founders who lit the flame — their vision shapes every step we take.
            </p>
          </div>

          {/* Two Visionaries */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {grandVisionaries.map((visionary, i) => (
              <motion.div
                key={visionary.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div
                  className="relative rounded-3xl overflow-hidden border"
                  style={{ borderColor: "rgba(212,175,55,0.3)", background: "linear-gradient(145deg, #0a1f12, #061209)" }}
                >
                  {/* Gold top accent line */}
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

                  {/* Cinematic Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={visionary.image}
                      alt={visionary.name}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: "brightness(0.85) contrast(1.05)" }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(to bottom, transparent 40%, #061209 100%)"
                    }} />
                    {/* Title badge */}
                    <div
                      className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                      style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.4)", color: GOLD }}
                    >
                      {visionary.title}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-8 pb-8 -mt-4 relative z-10">
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-2"
                      style={{ color: GOLD, fontFamily: "Georgia, serif" }}
                    >
                      {visionary.name}
                    </h3>
                    <div className="h-px w-16 mb-5" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                    {/* Personal Mission */}
                    <div className="relative pl-5 mb-6">
                      <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: GOLD }} />
                      <p className="text-emerald-100/80 text-sm leading-relaxed italic">
                        &ldquo;{visionary.mission}&rdquo;
                      </p>
                    </div>
                    <Button
                      onClick={() => openBio(visionary)}
                      className="rounded-full text-xs font-bold px-6 gap-1.5"
                      style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.4)", color: GOLD }}
                    >
                      Full Biography
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Gold bottom accent */}
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR LEADERSHIP ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #061209 0%, #040e07 100%)" }}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <Star className="w-5 h-5 fill-current" style={{ color: GOLD }} />
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: GOLD, fontFamily: "Georgia, serif" }}
            >
              Our Leadership
            </h2>
            <p className="text-emerald-200/50 text-lg max-w-2xl mx-auto">
              The executive board — dedicated professionals steering our mission with expertise and integrity.
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {boardMembers.map((member) => (
              <MemberCard
                key={member.name}
                member={member}
                onClick={() => openBio(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-primary mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To uplift the Orakzai community by providing accessible education, quality healthcare, and a platform for collective representation. We aim to bridge the gap between tradition and modern progress.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg bg-primary text-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">Our Vision</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    A united, empowered, and progressive Orakzai district where every individual has the opportunity to thrive and contribute to the global society while holding fast to their cultural roots.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide our every action and decision.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Unity", desc: "We believe our strength lies in our togetherness." },
              { icon: Heart, title: "Service", desc: "Selfless service to our community is our highest calling." },
              { icon: Target, title: "Empowerment", desc: "Equipping our people with the tools they need to succeed." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                  <value.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 font-display">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary text-center mb-16">Our Journey</h2>
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold shadow-lg z-10">
                    <Clock className="w-5 h-5" />
                  </div>
                  {i !== timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-4" />}
                </div>
                <div className="pb-12 pt-2">
                  <h3 className="text-2xl font-bold text-primary mb-1 font-display">
                    <span className="text-accent mr-3">{item.year}</span>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BIOGRAPHY SIDE PANEL ─── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto p-0 border-l"
          style={{ borderColor: "rgba(212,175,55,0.3)", background: "#061209" }}
        >
          {selectedMember && (
            <>
              {/* Gold accent top */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

              {/* Header */}
              <SheetHeader className="px-8 pt-8 pb-4">
                {/* Photo or Monogram */}
                <div className="flex justify-center mb-6">
                  {'image' in selectedMember && selectedMember.image ? (
                    <div
                      className="w-32 h-32 rounded-full overflow-hidden"
                      style={{ border: "3px solid rgba(212,175,55,0.6)", boxShadow: "0 0 32px rgba(212,175,55,0.2)" }}
                    >
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #0d2b1a, #041409)",
                        border: "3px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 0 24px rgba(212,175,55,0.15)"
                      }}
                    >
                      <span className="text-3xl font-bold" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
                        {'initials' in selectedMember ? (selectedMember.initials as string).replace("2","") : selectedMember.name[0]}
                      </span>
                    </div>
                  )}
                </div>

                <SheetTitle
                  className="text-center text-2xl font-bold"
                  style={{ color: GOLD, fontFamily: "Georgia, serif" }}
                >
                  {selectedMember.name}
                </SheetTitle>
                <p className="text-center text-sm uppercase tracking-widest text-emerald-200/50 mt-1">
                  {selectedMember.title}
                </p>
                <div className="h-px w-24 mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
              </SheetHeader>

              {/* Body */}
              <div className="px-8 pb-10">
                {'mission' in selectedMember && selectedMember.mission && (
                  <div className="mb-6 relative pl-5">
                    <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: GOLD }} />
                    <p className="text-emerald-100/80 text-sm leading-relaxed italic">
                      &ldquo;{selectedMember.mission}&rdquo;
                    </p>
                  </div>
                )}
                <p className="text-emerald-100/70 leading-relaxed text-sm">
                  {selectedMember.bio}
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
