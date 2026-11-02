import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Link } from "wouter";
import { useEffect } from "react";

const GOLD = "#D6B44C";
const IVORY = "#F5F1E7";
const SAGE = "#A6B3A9";
const FOREST = "#031B13";
const EMERALD = "#06271B";

const stats = [
  { value: "3,000+", label: "Years of History" },
  { value: "12+", label: "Countries of Diaspora" },
  { value: "4M+", label: "Global Community" },
  { value: "1", label: "Unbreakable Identity" },
];

const heritageStories = [
  { image: "/hero/heritage-frontier-jirga.jpeg", label: "Living governance", title: "The Jirga tradition", caption: "An existing Orakzai.org heritage visual representing dialogue, diplomacy, and collective memory." },
  { image: "/hero/heritage-tribal-elders.jpg", label: "Ancestral memory", title: "A people carried forward", caption: "Existing heritage imagery from the Orakzai.org visual archive — presented as cultural context, not fabricated archival evidence." },
  { image: "/hero/heritage-dost-mohammad-khan.jpg", label: "Historical legacy", title: "Honour, memory, responsibility", caption: "A preserved visual study of Orakzai heritage and the responsibility of each generation." },
  { image: "/global-diaspora.jpg", label: "The living diaspora", title: "Home across borders", caption: "A contemporary Orakzai.org community image reflecting connection beyond the homeland." },
];

const storyTimeline = [
  { chapter: "01", title: "Ancient Heritage", era: "Before written record", image: "/hero/heritage-tribal-elders.jpg", text: "The highland valleys of Tirah form the geographic and spiritual setting from which Orakzai identity is told — a living archive carried through memory, landscape, and story." },
  { chapter: "02", title: "Ancestral Roots", era: "Lineage, homeland, identity", image: "/hero/heritage-dost-mohammad-khan.jpg", text: "The Orakzai name, lineage, Pashtunwali ethics, and the moral authority of the ancestor remain central threads in the community’s understanding of itself." },
  { chapter: "03", title: "Tribal History", era: "Classical governance and culture", image: "/hero/heritage-frontier-jirga.jpeg", text: "Sub-tribal autonomy and collective solidarity were held together through the Jirga — a system of dialogue, mediation, and shared responsibility." },
  { chapter: "04", title: "Cultural Traditions", era: "Jirga, poetry, hospitality", image: "/hero/heritage-tribal-elders.jpg", text: "Melmastia, nanawatai, badal, oral poetry, and the landay tradition carried values and wisdom from one generation to the next." },
  { chapter: "05", title: "Historical Transitions", era: "1893 · 1897–1898 · 1947", image: "/hero/heritage-frontier-jirga.jpeg", text: "Imperial confrontation, the Tirah Expedition, the Durand Line, and the formation of Pakistan shaped the modern political context without erasing internal identity." },
  { chapter: "06", title: "Modern Orakzai", era: "2004–2014 · 2020–Present", image: "/hero-community.jpg", text: "Conflict, displacement, return, and the birth of Orakzai.org form the modern chapter: rebuilding social infrastructure for a community separated by crisis." },
  { chapter: "07", title: "Global Diaspora", era: "Post-1947 to the present", image: "/global-diaspora.jpg", text: "From Pakistan’s cities to the Gulf, Europe, North America, and beyond, Orakzai identity continues through family, service, language, and shared memory." },
  { chapter: "08", title: "The Future Generation", era: "The covenant", image: "/hero-youth.jpg", text: "The future is a promise that every Orakzai child can know the history behind them, the community around them, and the opportunities ahead." },
];

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
  useEffect(() => {
    const previousTitle = document.title;
    const previousValues = new Map<string, string | null>();
    const description = "Explore the living story of the Orakzai people — from the sacred valleys of Tirah through ancestral memory, Jirga tradition, displacement, global diaspora, and the future generation.";
    const title = "Our Story — Three Thousand Years of Orakzai | Orakzai.org";
    const canonical = "https://orakzai.org/about";
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        property ? element.setAttribute("property", name) : element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      const key = selector;
      if (!previousValues.has(key)) previousValues.set(key, element.getAttribute("content"));
      element.setAttribute("content", content);
    };
    const setCanonical = () => {
      let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        document.head.appendChild(element);
      }
      if (!previousValues.has("canonical")) previousValues.set("canonical", element.getAttribute("href"));
      element.setAttribute("href", canonical);
    };
    document.title = title;
    setMeta("description", description);
    setMeta("keywords", "Orakzai history, Orakzai heritage, Tirah Valley, Orakzai culture, Jirga tradition, Pashtun heritage, Orakzai diaspora, Orakzai.org");
    setMeta("og:type", "article", true);
    setMeta("og:url", canonical, true);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", "https://orakzai.org/hero/heritage-frontier-jirga.jpeg", true);
    setMeta("twitter:url", canonical);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", "https://orakzai.org/hero/heritage-frontier-jirga.jpeg");
    setCanonical();

    const existingSchema = document.getElementById("story-page-jsonld");
    const schema = document.createElement("script");
    schema.id = "story-page-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Three Thousand Years of Orakzai",
      description,
      url: canonical,
      image: ["https://orakzai.org/hero/heritage-frontier-jirga.jpeg", "https://orakzai.org/hero/heritage-tribal-elders.jpg"],
      author: { "@type": "Organization", name: "Orakzai.org", url: "https://orakzai.org" },
      publisher: { "@type": "Organization", name: "Orakzai.org", logo: { "@type": "ImageObject", url: "https://orakzai.org/orakzai-org-logo.png" } },
      isPartOf: { "@type": "WebSite", name: "Orakzai.org", url: "https://orakzai.org" },
      about: ["Orakzai history", "Tirah Valley heritage", "Orakzai culture", "Global Orakzai diaspora"]
    });
    if (existingSchema) existingSchema.replaceWith(schema); else document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      previousValues.forEach((value, key) => {
        if (key === "canonical") {
          const link = document.querySelector('link[rel="canonical"]');
          if (link && value) link.setAttribute("href", value);
          return;
        }
        const element = document.querySelector(key) as HTMLMetaElement | null;
        if (element && value !== null) element.setAttribute("content", value);
      });
      document.getElementById("story-page-jsonld")?.remove();
    };
  }, []);

  return (
    <MainLayout>
      {/* Editorial hero */}
      <section className="relative overflow-hidden border-b border-[#D6B44C]/15 bg-[#031B13]" style={{ backgroundImage: "linear-gradient(118deg, rgba(6,39,27,0.9), rgba(3,27,19,0.98)), repeating-linear-gradient(135deg, transparent 0, transparent 118px, rgba(214,180,76,0.035) 119px, transparent 120px)" }}>
        <div className="absolute right-[8%] top-20 hidden h-40 w-40 border-r border-t border-[#D6B44C]/25 md:block" />
        <div className="absolute bottom-12 left-[8%] hidden h-20 w-20 border-b border-l border-[#D6B44C]/20 md:block" />
        <div className="relative mx-auto grid min-h-[660px] max-w-6xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:px-12 md:pb-24 md:pt-40">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D6B44C] sm:text-xs">Our Story</p>
            <h1 className="max-w-3xl font-serif text-[3.2rem] font-medium leading-[0.98] tracking-[-0.04em] text-[#F5F1E7] sm:text-6xl md:text-[5.3rem]">
              Three Thousand<br /><span className="text-[#D6B44C]">Years of Orakzai</span>
            </h1>
            <div className="mt-8 h-px w-24 bg-[#D6B44C]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7 }} className="border-l border-[#D6B44C]/45 pl-6 md:pl-9">
            <p className="max-w-md font-serif text-xl leading-relaxed text-[#F5F1E7]/80 sm:text-2xl">From the sacred valleys of Tirah to the cities of the global diaspora — the complete, unbroken story of a nation that has never surrendered its identity, its dignity, or its future.</p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-[#A6B3A9]">A living heritage · A shared future</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction and visual story */}
      <section className="bg-[#06271B] py-16 text-[#F5F1E7] md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
          <div className="grid items-end gap-10 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
            <div><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D6B44C]">A living archive</p><h2 className="max-w-sm font-serif text-3xl leading-tight text-[#F5F1E7] sm:text-4xl">A story carried in landscape, language, and memory.</h2></div>
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-[#A6B3A9] sm:text-2xl">From the sacred valleys of Tirah to the cities of the global diaspora — the complete, unbroken story of a nation that has never surrendered its identity, its dignity, or its future.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-[210px_210px]">
            <figure className="group relative overflow-hidden md:col-span-7 md:row-span-2"><img src="/hero/heritage-frontier-jirga.jpeg" alt="Existing Orakzai heritage visual representing a jirga" className="h-full min-h-[280px] w-full object-cover transition duration-700 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031B13]/90 to-transparent p-5 pt-14 text-sm text-[#F5F1E7]">The Jirga tradition · collective responsibility</figcaption></figure>
            <figure className="group relative overflow-hidden md:col-span-5"><img src="/hero/heritage-tribal-elders.jpg" alt="Existing Orakzai heritage visual of tribal elders" className="h-full min-h-[210px] w-full object-cover transition duration-700 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031B13]/85 to-transparent p-4 pt-10 text-xs text-[#F5F1E7]">Ancestral memory</figcaption></figure>
            <figure className="group relative overflow-hidden md:col-span-5"><img src="/global-diaspora.jpg" alt="Contemporary Orakzai diaspora community visual" className="h-full min-h-[210px] w-full object-cover transition duration-700 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031B13]/85 to-transparent p-4 pt-10 text-xs text-[#F5F1E7]">Home across borders</figcaption></figure>
          </div>
        </div>
      </section>

      {/* Preserved figures, redesigned as an institutional data band */}
      <section className="border-y border-[#D6B44C]/15 bg-[#06271B] py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-[#D6B44C]/15 px-5 sm:px-8 md:grid-cols-4 md:divide-y-0 md:px-12">
          {stats.map((stat) => <div key={stat.label} className="px-4 py-5 text-center md:px-6"><p className="font-serif text-3xl text-[#D6B44C] sm:text-4xl">{stat.value}</p><p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#A6B3A9]">{stat.label}</p></div>)}
        </div>
      </section>

      {/* Eight-chapter timeline */}
      <section className="bg-[#031B13] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
          <div className="mb-14 max-w-2xl"><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6B44C]">The long view</p><h2 className="font-serif text-4xl leading-tight text-[#F5F1E7] sm:text-5xl">Eight chapters of a living identity.</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-[#A6B3A9]">A concise reading map of the story told across this page. Dates are retained only where they are already established in the source history.</p></div>
          <div className="relative ml-2 border-l border-[#D6B44C]/25 md:ml-6">
            {storyTimeline.map((item, i) => <motion.article key={item.chapter} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="relative mb-12 pl-8 last:mb-0 md:pl-14"><span className="absolute -left-[7px] top-1 h-3 w-3 rotate-45 border border-[#D6B44C] bg-[#031B13]" /><div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:gap-14"><div><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D6B44C]">{item.chapter} · {item.era}</p><h3 className="mt-3 font-serif text-2xl text-[#F5F1E7] sm:text-3xl">{item.title}</h3></div><div className="grid gap-4 sm:grid-cols-[150px_1fr] sm:items-start"><img src={item.image} alt={item.title} className="h-32 w-full object-cover grayscale-[20%] sm:h-24" /><p className="text-sm leading-relaxed text-[#A6B3A9]">{item.text}</p></div></div></motion.article>)}
          </div>
        </div>
      </section>

      {/* Detailed source chapters */}
      <section className="bg-[#031B13] py-20 text-[#F5F1E7] md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12"><div className="mb-14 max-w-2xl"><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6B44C]">The archive</p><h2 className="font-serif text-4xl leading-tight text-[#F5F1E7] sm:text-5xl">History is not behind us.</h2><p className="mt-5 text-base leading-relaxed text-[#A6B3A9]">The full source chapters remain available below, edited into a calmer reading rhythm for long-form attention.</p></div>
          <div className="space-y-20 md:space-y-28">{chapters.map((chapter, ci) => <motion.article key={chapter.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="grid gap-8 md:grid-cols-[0.33fr_0.67fr] md:gap-14"><div className="md:sticky md:top-28 md:self-start"><p className="font-serif text-5xl text-[#D6B44C]/80">{chapter.number}</p><p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D6B44C]">{chapter.era}</p><h3 className="mt-3 font-serif text-2xl leading-tight text-[#F5F1E7]">{chapter.title}</h3><div className="mt-6 h-px w-16 bg-[#D6B44C]" /></div><div><blockquote className="mb-8 border-l-2 border-[#D6B44C] pl-5 font-serif text-xl italic leading-relaxed text-[#F5F1E7]/80">“{chapter.pullQuote}”</blockquote><div className="space-y-5 text-base leading-[1.85] text-[#A6B3A9]">{chapter.body.map((para, pi) => <p key={pi}>{para}</p>)}</div></div></motion.article>)}</div>
        </div>
      </section>

      {/* Closing invitation */}
      <section className="border-t border-[#D6B44C]/15 bg-[#06271B] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6B44C]">Join the story</p><h2 className="font-serif text-4xl leading-tight text-[#F5F1E7] sm:text-5xl">The next chapter<br /><span className="text-[#D6B44C]">is yours to write.</span></h2><div className="mx-auto my-8 h-px w-20 bg-[#D6B44C]" /><p className="text-base leading-relaxed text-[#A6B3A9] sm:text-lg">Three thousand years of Orakzai history brought us here. How we connect, serve, and preserve will determine the story our grandchildren inherit.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/join" className="inline-flex h-12 items-center justify-center rounded-full bg-[#D6B44C] px-8 text-sm font-semibold text-[#031B13] transition hover:-translate-y-0.5 hover:bg-[#F5F1E7]">Become a Member</Link><Link href="/donate" className="inline-flex h-12 items-center justify-center rounded-full border border-[#D6B44C]/45 px-8 text-sm text-[#F5F1E7] transition hover:-translate-y-0.5 hover:border-[#D6B44C]">Support the Mission</Link></div><p className="mt-12 font-serif text-lg text-[#F5F1E7]">One Nation. One Identity. One Shared Future.</p></div>
      </section>
    </MainLayout>
  );
}
