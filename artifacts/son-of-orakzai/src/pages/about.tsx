import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

const GOLD = "#D4AF37";

/* ── Timeline nodes ── */
const timelineNodes = [
  { year: "Pre-1800s", label: "Sacred Origins", color: "#6ee7b7" },
  { year: "1800–1947", label: "Colonial Resistance", color: GOLD },
  { year: "1947–2000", label: "Displacement Era", color: "#f87171" },
  { year: "2000–Today", label: "Digital Renaissance", color: "#818cf8" },
];

/* ── Stat badges ── */
const stats = [
  { value: "3,000+", label: "Years of History" },
  { value: "12+", label: "Countries of Diaspora" },
  { value: "4M+", label: "Global Community" },
  { value: "1", label: "Unbreakable Identity" },
];

/* ── 7 Chapters ── */
const chapters = [
  {
    number: "I",
    era: "Pre-Islamic Era — Ancient Roots",
    title: "Sacred Roots & Ancestral Identity",
    accent: "#6ee7b7",
    pullQuote: "We did not arrive at history — we were already there, carved into the mountains before memory began.",
    body: [
      "Long before the cartographers drew their lines and the empires wrote their names across the Hindu Kush, the Orakzai people were already there. Settled across the highland valleys of the Tirah — a geographic fortress of pine forest, glacial streams, and vertical cliffs — the Orakzai inhabited one of the most strategically significant and spiritually charged landscapes in all of Central Asia.",
      "The name 'Orakzai' carries within it a declaration: descendants of a man, a lineage, a covenant made in the shadow of great mountains. Tribal oral historians trace the ancestry to Orakzai Khan, from whom the entire tribal tree descends — a figure not merely of genealogy but of moral foundation. In the Pashtun tradition, the ancestor is not simply a point of origin; he is a living standard by which every generation measures its conduct.",
      "The Orakzai were among the most cohesive of the Pashtun confederacies. Unlike many neighboring tribes who fragmented into sub-clans across wide plains, the Orakzai maintained a geographic concentration that preserved both their dialect, their customs, and their singular identity. The Tirah Valley was not just a homeland — it was a living archive. Every waterfall, every ridge, every ancient grave site was a chapter in a history transmitted not in books but in breath, in story, in the recitation of lineage at birth and at burial.",
      "The tribe organized itself around the principles of Pashtunwali — the ancient unwritten code that governed everything from hospitality (melmastia) to sanctuary (nanawatai) to the pursuit of justice (badal). These were not abstract values. They were the operating system of daily life, adjudicated not by kings or courts, but by the Jirga — the council of elders whose decisions carried the full moral authority of the community.",
    ],
  },
  {
    number: "II",
    era: "Classical Period — Governance & Culture",
    title: "Tribal Structure & The Jirga System",
    accent: GOLD,
    pullQuote: "Democracy was not invented in Athens. It was practiced in the mountains of Tirah, in circles of elders who spoke until truth emerged.",
    body: [
      "The Jirga is perhaps the most misunderstood institution in Pashtun history. To outside observers — colonial administrators, modern policy analysts — it appeared primitive: a gathering of bearded men under a tree, debating without formal law. What they failed to comprehend was that the Jirga was one of the world's most sophisticated systems of restorative justice and collective decision-making.",
      "Within Orakzai society, the Jirga operated at multiple levels. Village Jirgas resolved local disputes — land boundaries, water rights, family disagreements — through consensus and mediation. Tribal Jirgas handled larger conflicts between sub-clans, drawing on principles of proportionality and collective responsibility. And Grand Jirgas, convened only in moments of existential crisis, united the entire tribe across factional lines to make decisions that would bind every household.",
      "The Orakzai Jirga system was remarkable for its insistence on consensus. A ruling required not majority agreement but unanimity — a standard that demanded every voice be heard, every grievance addressed, every elder satisfied before a decision was finalized. This was governance through exhaustion of objection, not through suppression of it.",
      "The Orakzai were also known across the Pashtun belt for their oral literary tradition. Poets, storytellers, and musicians held a revered place in tribal life. The landay — a form of short, devastating poetry traditionally composed by women — captured everything from grief to defiance to romantic longing. These were not decorations of culture. They were its bloodstream, carrying values, warnings, and wisdom across generations without a single written word.",
      "Sub-tribal divisions — the Utmankhel, the Mamuzai, the Malla Khel, and others — each maintained distinct identities and internal governance structures, yet recognized their membership in the larger Orakzai confederation. This balance between sub-tribal autonomy and collective solidarity was the genius of Orakzai political organization, and it endured for centuries.",
    ],
  },
  {
    number: "III",
    era: "1800s–1947 — Imperial Confrontation",
    title: "Age of Conflict & Colonial Resistance",
    accent: "#f87171",
    pullQuote: "They came with maps and called our land a frontier. We called it home, and we defended every inch of it.",
    body: [
      "The nineteenth century brought the British Empire to the edge of the Orakzai homeland — and the Orakzai did not yield quietly. The Great Game, the imperial contest between Britain and Russia for dominance of Central Asia, turned the Pashtun belt into a theater of geopolitical maneuvering. The Orakzai Tirah, with its natural fortifications and independent-minded population, was a strategic headache for British planners who preferred compliant buffer states to proud tribes.",
      "The Tirah Expedition of 1897–1898 stands as the most direct collision between British imperial force and Orakzai resistance. Launched in response to a general uprising across the Pashtun tribal agencies, the expedition sent tens of thousands of British and Indian troops into the Tirah Valley — the largest military force ever assembled for a frontier operation at that time. The Orakzai and their Afridi neighbors fought with ferocity in conditions the British commanders described as among the most punishing they had ever encountered.",
      "The British ultimately withdrew from Tirah without establishing permanent military presence — a tactical retreat dressed as strategic restraint. The Orakzai had made the cost of occupation prohibitive. But the broader war was one of attrition, and the imperial system extracted its price through political manipulation, economic marginalization, and the systematic elevation of cooperative factions over resistant ones.",
      "The Durand Line of 1893 — drawn by Sir Mortimer Durand with a pen that had never walked the territory — bisected Pashtun communities with cartographic indifference, separating families, grazing lands, and trade routes. While the Orakzai homeland was largely contained on one side of the line, the psychological wound of arbitrary partition was felt across the entire Pashtun world, planting seeds of political grievance that would define the region's tensions for the next 130 years.",
      "Through all of this, the Orakzai maintained their internal solidarity. Occupation could not install itself in the Jirga. Colonial law could not replace Pashtunwali. The tribe adapted — accepting some modernization while fiercely guarding its social architecture. When independence came in 1947 and the new state of Pakistan took shape around them, the Orakzai entered the modern era as a tribe that had never been colonized in spirit, even when it had been politically constrained.",
    ],
  },
  {
    number: "IV",
    era: "Post-1947 — The Great Dispersal",
    title: "Displacement, Migration & the Making of the Global Diaspora",
    accent: "#c084fc",
    pullQuote: "We left the mountains because we had to. But the mountains never left us.",
    body: [
      "The decades following Pakistan's independence brought a new kind of transformation to the Orakzai people — not conquest but dispersal. The socioeconomic pressures of a young and resource-strained nation pushed Pashtun communities, including the Orakzai, into vast migration flows that would eventually reach every corner of the globe.",
      "The first wave moved within Pakistan itself — to Peshawar, Rawalpindi, Karachi, and the industrial cities of Punjab. Men who had farmed highland terraces became factory workers, shopkeepers, truck drivers, and government clerks. The transition was not easy. The Orakzai identity — rooted in the specific social geography of Tirah — had to be preserved in new environments that offered none of its natural reinforcements.",
      "The Gulf migration boom of the 1970s and 1980s drew hundreds of thousands of Pashtuns to Saudi Arabia, the UAE, Kuwait, and Qatar. Orakzai men — many of them with no formal education but extraordinary work ethic and mechanical aptitude — filled the labor markets of the Gulf's construction boom. They sent remittances home that built houses, paid school fees, and sustained families across generations. But they lived in conditions of profound social isolation, disconnected from their communities and treated as disposable inputs in an economic machine that valued their labor but not their humanity.",
      "Later waves reached Europe — the UK, Germany, the Netherlands, Scandinavia — and North America. These migrations carried a different character. Younger, often better-educated Orakzai men and women arrived as students, asylum seekers, or family reunification cases. They entered societies with strong institutions and real opportunities, but also with deep cultural distance and frequent hostility toward Muslim Pashtun identities.",
      "By the early twenty-first century, the Orakzai diaspora had become genuinely global: concentrated communities in at least twelve countries, spanning five continents, speaking Pashto in apartments in Toronto and Oslo and Dubai and Karachi. What had been a geographically anchored tribal identity was now floating across national borders, sustained only by family networks, WhatsApp groups, and the stubborn insistence of elders who refused to let the old stories die.",
    ],
  },
  {
    number: "V",
    era: "2004–2014 — The Decade of Crisis",
    title: "War, IDP Crisis & the Fragmented Reality",
    accent: "#f97316",
    pullQuote: "They left with nothing but their names. And they held those names like fire in a windstorm.",
    body: [
      "The first decade of the twenty-first century brought catastrophe to the Orakzai homeland. The War on Terror transformed the tribal agencies of northwestern Pakistan into a theater of drone strikes, military operations, and militant infiltration. The Orakzai Agency — for decades one of the more stable areas of FATA — became progressively destabilized as Taliban factions expanded their presence, extorting communities and executing those who resisted.",
      "Beginning in 2008 and intensifying through 2009–2010, Pakistani military operations against Taliban positions in the Orakzai Agency triggered one of the largest internal displacement crises in Pakistani history. Hundreds of thousands of Orakzai civilians — estimates range from 400,000 to over 700,000 — were forced to abandon their homes, their livestock, their orchards, and their ancestral graves. They fled to displacement camps on the plains of Kohat and Hangu, living in canvas tents through winter temperatures that fell below freezing.",
      "The internally displaced Orakzai faced a triple crisis: the physical trauma of displacement, the bureaucratic indifference of a state stretched beyond its institutional capacity, and the social disintegration that comes when community structures built over centuries are suddenly compressed into temporary shelter. Jirga authority weakened. Family units fragmented. Young men — cut off from education, employment, and purpose — became vulnerable to the very forces their families had fled.",
      "The return process, beginning in 2011 and continuing through subsequent years, was painful and incomplete. Many families returned to find their homes destroyed, their fields mined or overgrown, their water infrastructure shattered. Government rehabilitation efforts were delayed, underfunded, and frequently misdirected. A generation of Orakzai children grew up in displacement or in traumatized return — their formative years marked not by the stories of ancient valor their grandparents had known, but by the sounds of helicopters and the bureaucratic language of relief agencies.",
      "It is out of this crucible — out of the ashes of displacement and the determination to rebuild — that the need for Orakzai.org became not an aspiration but an urgency.",
    ],
  },
  {
    number: "VI",
    era: "2020–Present — The Digital Answer",
    title: "Birth of Orakzai.org — Building the Digital Homeland",
    accent: "#34d399",
    pullQuote: "If the mountains could no longer hold us together, we would build something that could.",
    body: [
      "Orakzai.org was not conceived in a boardroom. It was born from a question asked by people who had watched their community scatter and suffer: what would it take to build something that could hold the Orakzai together across distance, across borders, across the wounds of displacement?",
      "The answer was digital infrastructure — not as a tech product, but as a social institution. A platform that could serve as a homeland when the homeland itself had been disrupted. A place where a displaced family in a Kohat camp and a professional in Toronto and a student in London could all find the same thread connecting them to each other and to something larger than themselves.",
      "The founding team brought together Orakzai voices from across the diaspora — engineers, educators, community organizers, humanitarian workers, and tribal elders who understood that survival in the twenty-first century required tools that previous generations had never needed. The result was a platform designed not merely to connect but to serve: scholarships for students who had lost educational years to displacement; welfare support for families who had lost everything; legal advocacy for rights that had been systematically denied; economic grants for entrepreneurs rebuilding from zero.",
      "Orakzai.org registered its first 2,000 members within months of launch. They came from Pakistan's tribal districts and from Gulf labor camps and from European cities and from North American universities. They came because the need was real and the platform offered something rare in the institutional landscape available to displaced Pashtun communities: genuine representation by people who shared the experience they were seeking to address.",
      "The organization operates on a principle that distinguishes it from traditional NGOs: the community is not the beneficiary — it is the governing authority. Every program, every allocation of resources, every strategic decision flows through consultation with community members whose lives are directly affected. The Jirga tradition, adapted for the digital age, remains the moral foundation of how Orakzai.org makes its decisions.",
    ],
  },
  {
    number: "VII",
    era: "The Future — The Covenant",
    title: "The Covenant With the Future",
    accent: "#818cf8",
    pullQuote: "Every Orakzai child born today inherits three thousand years of survival. We owe them the tools to use that inheritance.",
    body: [
      "History is not a record of the past. It is a set of instructions for the future. And the history of the Orakzai people — with its unbroken thread of resistance, adaptation, solidarity, and dignity — carries within it everything a community needs to navigate whatever the coming century will bring.",
      "The Orakzai who survived colonial conquest did so because they refused to accept the categories their conquerors imposed on them. The Orakzai who survived displacement did so because they carried their social structures with them — in their memories, in their relationships, in the stories they told their children in the dark of displacement camps. The Orakzai who built a global diaspora did so not by abandoning who they were but by insisting on it in every new context they entered.",
      "The covenant we make with the future is simple in its statement and profound in its demand: every Orakzai child born today, wherever in the world they enter life, deserves to know who they are. They deserve access to the history that precedes them, the community that surrounds them, and the opportunities that their ancestors fought to make possible. They deserve a digital homeland that reflects the depth and dignity of the physical one — that preserves the language, the poetry, the Jirga wisdom, the Pashtunwali ethics in forms that the twenty-first century can hold.",
      "They also deserve something the generations before them often lacked: institutional power. Not borrowed power, not the charity of stronger states, but the self-generated authority of a community that has organized itself, funded itself, represented itself, and refused to wait for someone else to solve its problems.",
      "Orakzai.org exists to honor that covenant. Every scholarship issued, every welfare grant disbursed, every legal brief filed, every displaced family supported — these are not charitable acts. They are payments on a debt we owe to the three thousand years of courage that brought us to this moment, and to the future generations who will judge us by what we built when we had the chance.",
      "One Nation. One Covenant. One Future — Written Together.",
    ],
  },
];

export default function About() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % timelineNodes.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
        style={{ background: "linear-gradient(160deg, #010f08 0%, #011a10 40%, #022c22 100%)" }}
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute rounded-full blur-[120px] opacity-20"
            style={{ width: 500, height: 500, background: GOLD, top: "-15%", left: "-10%" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full blur-[100px] opacity-15"
            style={{ width: 400, height: 400, background: "#6ee7b7", bottom: "5%", right: "-5%" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold uppercase tracking-[0.35em] mb-5"
            style={{ color: GOLD }}
          >
            Our Story
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] mb-6"
            style={{ color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Three Thousand Years<br />
            <span style={{ color: GOLD }}>of Orakzai</span>
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-[1px] w-32 mx-auto mb-8"
            style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
          />

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-14"
            style={{ color: "rgba(209,250,229,0.72)" }}
          >
            From the sacred valleys of Tirah to the cities of the global diaspora — the complete, unbroken story of a nation that has never surrendered its identity, its dignity, or its future.
          </motion.p>

          {/* Stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl px-4 py-5"
                style={{
                  background: "rgba(212,175,55,0.06)",
                  border: "1px solid rgba(212,175,55,0.22)",
                }}
              >
                <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-emerald-100/50 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="h-8 w-[1px]" style={{ background: `linear-gradient(to bottom, transparent, ${GOLD})` }} />
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD, opacity: 0.5 }}>Scroll</p>
        </motion.div>
      </section>

      {/* ── INTERACTIVE TIMELINE ── */}
      <section className="py-16" style={{ background: "#040e07" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] mb-10" style={{ color: GOLD }}>
            Four Epochs of History
          </p>
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-5 h-[1px]" style={{ background: "rgba(212,175,55,0.15)" }} />
            <motion.div
              className="absolute left-0 top-5 h-[1px]"
              style={{ background: GOLD }}
              animate={{ width: `${(activeNode / (timelineNodes.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {timelineNodes.map((node, i) => (
              <button
                key={node.year}
                onClick={() => setActiveNode(i)}
                className="relative flex flex-col items-center gap-3 z-10 cursor-pointer bg-transparent border-0 p-0"
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  animate={{
                    scale: activeNode === i ? 1.25 : 1,
                    background: activeNode === i ? node.color : "rgba(212,175,55,0.12)",
                    color: activeNode === i ? "#011a10" : "rgba(212,175,55,0.5)",
                    boxShadow: activeNode === i ? `0 0 24px ${node.color}66` : "none",
                  }}
                  transition={{ duration: 0.35 }}
                >
                  {i + 1}
                </motion.div>
                <div className="text-center">
                  <p className="text-[11px] font-bold hidden sm:block" style={{ color: activeNode === i ? node.color : "rgba(255,255,255,0.3)" }}>
                    {node.year}
                  </p>
                  <p className="text-[10px] hidden md:block" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {node.label}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active label */}
          <motion.p
            key={activeNode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 text-base font-semibold"
            style={{ color: timelineNodes[activeNode].color, fontFamily: "Georgia, serif" }}
          >
            {timelineNodes[activeNode].year} — {timelineNodes[activeNode].label}
          </motion.p>
        </div>
      </section>

      {/* ── 7 CHAPTERS ── */}
      {chapters.map((chapter, ci) => (
        <section
          key={chapter.number}
          className="py-20 md:py-28"
          style={{
            background: ci % 2 === 0
              ? "linear-gradient(180deg, #061209 0%, #040e07 100%)"
              : "#040e07",
          }}
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              {/* Chapter label */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${chapter.accent}18`, border: `1px solid ${chapter.accent}44`, color: chapter.accent, fontFamily: "Georgia, serif" }}
                >
                  {chapter.number}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: chapter.accent, opacity: 0.75 }}>
                    {chapter.era}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
                    {chapter.title}
                  </h2>
                </div>
              </div>

              {/* Gold thin rule */}
              <div className="h-[1px] mb-8" style={{ background: `linear-gradient(to right, ${chapter.accent}55, transparent)` }} />

              {/* Pull quote */}
              <blockquote
                className="text-base md:text-lg italic leading-relaxed mb-10 pl-5"
                style={{
                  color: chapter.accent,
                  borderLeft: `3px solid ${chapter.accent}`,
                  fontFamily: "Georgia, serif",
                }}
              >
                "{chapter.pullQuote}"
              </blockquote>

              {/* Body paragraphs */}
              <div className="space-y-5">
                {chapter.body.map((para, pi) => (
                  <p key={pi} className="text-base md:text-lg leading-[1.85]" style={{ color: "rgba(209,250,229,0.72)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── CLOSING CTA ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #011a10 0%, #022c22 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full opacity-10 blur-[100px]" style={{ background: GOLD }} />
        </div>
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: GOLD }}>
            Join the Story
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#fff", fontFamily: "Georgia, serif" }}>
            The Next Chapter<br />
            <span style={{ color: GOLD }}>Is Yours to Write</span>
          </h2>
          <div className="h-[1px] w-24 mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(209,250,229,0.65)" }}>
            Three thousand years of Orakzai history brought us here. The choices we make now — how we connect, how we serve, how we preserve — will determine the story our grandchildren inherit. Be part of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center font-bold px-10 h-12 rounded-full text-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 50%, #f5e07a 100%)`,
                color: "#011a10",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.05em",
                boxShadow: `0 6px 28px rgba(212,175,55,0.4)`,
              }}
            >
              Become a Member
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center font-semibold px-8 h-12 rounded-full text-sm text-white transition-all hover:-translate-y-1"
              style={{ border: "1px solid rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.06)" }}
            >
              Support the Mission
            </Link>
          </div>

          <div className="mt-16">
            <div className="h-[1px] w-40 mx-auto mb-6" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            <p className="text-lg md:text-xl font-bold tracking-wide" style={{ color: "#fff", fontFamily: "Georgia, serif" }}>
              One Nation. One Identity. One Shared Future.
            </p>
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
