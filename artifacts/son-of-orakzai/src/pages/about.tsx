import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Shield,
  BookOpen,
  Globe2,
  GraduationCap,
  HandHeart,
  TrendingUp,
  Users,
  HeartPulse,
  Scale,
  Award,
  Lightbulb,
  Sprout,
  Sparkles,
  Dumbbell,
  Droplet,
  Ambulance,
  ShieldCheck,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";

const GOLD = "#D4AF37";

const missionItems = [
  "Education and scholarships",
  "Community unity",
  "Humanitarian assistance",
  "Economic empowerment",
  "Healthcare awareness",
  "Digital innovation",
  "Global networking",
  "Cultural preservation",
  "Youth leadership",
  "Long-term sustainable development",
];

const pillars = [
  {
    icon: Scale,
    title: "Rights & Representation",
    desc: "Legal advocacy and institutional representation dedicated to protecting the rights, interests, and collective voice of Orakzai communities worldwide.",
  },
  {
    icon: GraduationCap,
    title: "Education & Global Scholarships",
    desc: "Scholarships, mentorship, leadership development, and international educational pathways that empower the next generation of Orakzai students.",
  },
  {
    icon: HandHeart,
    title: "Social Welfare & Crisis Relief",
    desc: "Humanitarian assistance, poverty alleviation, emergency response initiatives, and sustainable support systems for vulnerable families.",
  },
  {
    icon: TrendingUp,
    title: "Economic Innovation & Grants",
    desc: "Interest-free business grants, entrepreneurship support, digital innovation, and local economic development designed to strengthen community prosperity.",
  },
  {
    icon: Globe2,
    title: "Global Diaspora Network",
    desc: "Connecting Orakzai professionals, families, entrepreneurs, and organizations across Pakistan, the Gulf, Europe, North America, and beyond.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Infrastructure & Access",
    desc: "Supporting modern healthcare initiatives through mobile clinics, clean water projects, preventive care, and improved medical accessibility in underserved regions.",
  },
  {
    icon: Sparkles,
    title: "Women Empowerment & Skilled Artisans Support",
    desc: "Launching dedicated vocational training centers, healthcare programs, and marketplace infrastructure to empower women and support local small-scale artisans.",
  },
  {
    icon: Dumbbell,
    title: "Youth Development & Sports Infrastructure",
    desc: "Establishing local sports academies, youth mentorship programs, and constructive recreational facilities to engage the younger generation and promote healthy community development.",
  },
  {
    icon: Droplet,
    title: "Clean Water & Sanitation (WASH)",
    desc: "Installing solar-powered water filtration plants and modern tube wells in remote areas to ensure access to safe, clean drinking water and hygienic sanitation systems.",
  },
  {
    icon: Ambulance,
    title: "Emergency Ambulance & Mobile Health",
    desc: "Deploying fully equipped free ambulance services and mobile healthcare vans to provide immediate emergency response and basic medical care to far-flung rural areas.",
  },
  {
    icon: ShieldCheck,
    title: "Migrant Welfare & Diaspora Protection Fund",
    desc: "A dedicated premium community membership program for Orakzai migrants globally and domestically, providing complete healthcare coverage, repatriation services, and family security systems.",
  },
];

const values = [
  { icon: Award, title: "Integrity", desc: "Acting with honesty, accountability, and transparency." },
  { icon: Users, title: "Unity", desc: "Bringing communities together beyond borders." },
  { icon: Shield, title: "Respect", desc: "Honoring every individual and every generation." },
  { icon: Heart, title: "Service", desc: "Placing people and communities first." },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing technology to solve real challenges." },
  { icon: Sprout, title: "Sustainability", desc: "Building solutions that create lasting impact." },
];

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center mb-14">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>
          {eyebrow}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
          {title}
        </h2>
        <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <MainLayout>
      {/* ─── HERO ─── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #011a10 0%, #022c22 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: GOLD }}
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: "#fff", fontFamily: "Georgia, serif" }}
          >
            A Digital Homeland for the Orakzai Nation
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-px w-24 mx-auto mb-8"
            style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-emerald-100/80 leading-relaxed"
          >
            Across generations, the Orakzai people have carried with them a proud legacy of courage, honor, resilience, and unity. From the mountains of the historic Orakzai region to communities established across Pakistan, the Gulf, Europe, North America, and beyond, our identity has always been rooted in strong family values and collective progress.
          </motion.p>
        </div>
      </section>

      {/* ─── NARRATIVE ─── */}
      <section className="py-20" style={{ background: "#061209" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-6 text-emerald-100/75 text-lg leading-relaxed">
            <p>
              Yet, as the world became increasingly connected, our community remained geographically dispersed. Families, professionals, students, entrepreneurs, and future leaders often lacked a unified digital platform where they could connect, collaborate, preserve their heritage, and create opportunities for future generations.
            </p>
            <p className="text-xl font-semibold" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
              Orakzai.org was created to bridge that gap.
            </p>
            <p>
              It is more than a website—it is a digital homeland built to unite the global Orakzai community under a shared vision of education, innovation, humanitarian service, and sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY WE EXIST ─── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #061209 0%, #040e07 100%)" }}>
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <SectionHeading title="Why We Exist" />
          <div className="space-y-6 text-emerald-100/75 text-lg leading-relaxed text-center">
            <p className="text-xl italic" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
              Every strong nation begins with unity.
            </p>
            <p>
              Our purpose is to strengthen connections between Orakzai families worldwide while creating practical opportunities that improve lives. We believe that when knowledge is shared, communities become stronger. When opportunities are accessible, future generations thrive. And when people stand together, no challenge is impossible.
            </p>
            <p className="font-semibold text-white">
              Orakzai.org exists to transform collective potential into collective progress.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ─── */}
      <section className="py-20" style={{ background: "#040e07" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 border"
              style={{ borderColor: "rgba(212,175,55,0.3)", background: "linear-gradient(145deg, #0a1f12, #061209)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(212,175,55,0.15)" }}>
                <Globe2 className="w-7 h-7" style={{ color: GOLD }} />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>Our Vision</h2>
              <p className="text-emerald-100/75 text-base leading-relaxed">
                To become the world's leading digital platform dedicated to empowering, connecting, and representing the global Orakzai community through education, humanitarian initiatives, innovation, and sustainable development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 border"
              style={{ borderColor: "rgba(212,175,55,0.3)", background: "linear-gradient(145deg, #0a1f12, #061209)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(212,175,55,0.15)" }}>
                <Target className="w-7 h-7" style={{ color: GOLD }} />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>Our Mission</h2>
              <p className="text-emerald-100/75 text-base leading-relaxed mb-4">
                We work to create meaningful opportunities that benefit individuals, families, and communities by promoting:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {missionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-emerald-100/75 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STRATEGIC PILLARS ─── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #040e07 0%, #061209 100%)" }}>
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Everything we build is guided by eleven core priorities" title="Our Strategic Pillars" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl p-7 border"
                style={{ borderColor: "rgba(212,175,55,0.25)", background: "rgba(3,45,30,0.5)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(212,175,55,0.15)" }}>
                  <pillar.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>{pillar.title}</h3>
                <p className="text-emerald-100/65 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR VALUES ─── */}
      <section className="py-20" style={{ background: "#061209" }}>
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Every initiative is guided by the principles that define who we are" title="Our Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center rounded-2xl p-6 border"
                style={{ borderColor: "rgba(212,175,55,0.2)", background: "rgba(3,45,30,0.4)" }}
              >
                <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(212,175,55,0.15)" }}>
                  <value.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>{value.title}</h3>
                <p className="text-emerald-100/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOOKING AHEAD ─── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #061209 0%, #040e07 100%)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading title="Looking Ahead" />
          <div className="space-y-6 text-emerald-100/75 text-lg leading-relaxed text-center">
            <p className="italic" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
              Our journey is only beginning.
            </p>
            <p>
              We envision a future where every Orakzai student can access educational opportunities, every family can remain connected regardless of geography, every entrepreneur can find support to build meaningful businesses, and every generation can proudly preserve its heritage while embracing the opportunities of a rapidly changing world.
            </p>
            <p>
              Through collaboration, innovation, and shared responsibility, we aim to build a stronger, more connected, and more prosperous global Orakzai community.
            </p>
          </div>
        </div>
      </section>

      {/* ─── JOIN THE MOVEMENT ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#011a10" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
        </div>
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
            Join the Movement
          </h2>
          <p className="text-emerald-100/75 text-lg leading-relaxed mb-4">
            Orakzai.org is powered by its community. Whether you are a student, educator, entrepreneur, healthcare professional, community leader, researcher, or simply someone who believes in unity and progress, there is a place for you here.
          </p>
          <p className="text-emerald-100/75 text-lg leading-relaxed mb-10">
            Together, we can preserve our heritage, empower future generations, and build a stronger global Orakzai community—one connected by shared values, mutual support, and a vision for lasting progress.
          </p>
          <div className="h-px w-24 mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <p className="text-xl md:text-2xl font-bold tracking-wide" style={{ color: "#fff", fontFamily: "Georgia, serif" }}>
            One Community. One Identity. One Shared Future.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
