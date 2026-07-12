import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* slug helper — "Faisal Orakzai" → "faisalorakzai" */
function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "").trim();
}
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Linkedin, Twitter, Crown, Shield, Star, ChevronRight, ChevronLeft, Globe, BadgeCheck,
  MapPin, Mail, Users, ArrowUpRight, HeartHandshake, Landmark, ScrollText,
} from "lucide-react";

const GOLD = "#D4AF37";

const HERO_SLIDES = [
  { src: "/faisal-orakzai-unitar.jpg", caption: "Chairman Faisal Orakzai — UNITAR, United Nations" },
  { src: "/hero/heritage-tribal-elders.jpg", caption: "The Tribes of Our Frontier — Orakzai Elders" },
  { src: "/hero/heritage-dost-mohammad-khan.jpg", caption: "A Legacy of Honour & Command" },
  { src: "/hero/heritage-frontier-jirga.jpeg", caption: "A Heritage of Diplomacy & Resolve" },
];

/* Full-bleed hero background that auto-cycles through heritage & leadership
   imagery every 3s, crossfading endlessly. Never pauses, never stops. */
function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 3.4, ease: "linear" } }}
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

      {/* Cinematic overlays for legibility over any photo */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(1,26,16,0.55) 0%, rgba(1,26,16,0.75) 55%, #011a10 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(1,26,16,0.2) 0%, rgba(1,26,16,0.65) 100%)" }} />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 28 : 8,
              background: i === index ? GOLD : "rgba(212,175,55,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export interface TeamMember {
  id: number;
  name: string;
  slug?: string;
  title: string;
  focus: string;
  intro: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  isSupreme?: boolean;
  supremeTitle?: string;
  mission?: string;
  bio: string;
  location?: string;
  reportsTo?: string;
  leadershipPrinciples?: { title: string; description: string }[];
  strategicFocusAreas?: { title: string; description: string }[];
  currentInitiatives?: { title: string; status: string; description: string }[];
}

export const SUPREME_LEADERS: TeamMember[] = [
  {
    id: 1,
    name: "Faisal Orakzai",
    title: "Founder & Chairman",
    focus: "Vision, Leadership & National Outreach",
    intro: "Leading Orakzai with a vision of digital empowerment and unity for the Orakzai community across Pakistan and beyond.",
    photo: "/faisal-orakzai-unitar.jpg",
    linkedin: "https://www.linkedin.com/in/faisalorakzaii",
    twitter: "https://x.com/faisalorakzaii",
    website: "https://faisalorakzai.com",
    isSupreme: true,
    supremeTitle: "Founder & Chairman",
    mission: "To forge a legacy of unity and progress for the Orakzai people — where every voice is heard, every talent is nurtured, and no family is left behind. Our strength is our togetherness.",
    bio: "Chairman Faisal Orakzai is the driving force behind Orakzai's transformation into a nationally recognized community movement. With a visionary approach rooted in deep love for his homeland, he has spearheaded initiatives spanning education, healthcare, digital empowerment, and civic representation. Under his leadership, the organization has grown from a grassroots effort into a structured institution serving thousands of Orakzai families. His commitment to transparent governance and inclusive leadership sets the tone for everything the organization does. Chairman Faisal believes that true prosperity is collective — and that the Orakzai district's greatest resource is the resilience and talent of its people.",
    location: "Karachi, Pakistan",
    leadershipPrinciples: [
      { title: "Unity Above All", description: "Every decision begins with one question: does this bring our people closer together?" },
      { title: "Transparent Governance", description: "Trust is built through accountability — every rupee, every project, every outcome is reported openly." },
      { title: "Inclusive Progress", description: "No family is left behind. Development that excludes any segment of society is incomplete." },
      { title: "Youth as the Vanguard", description: "The next generation of Orakzai leaders will be digital, educated, and globally competitive." },
      { title: "Heritage with Modernity", description: "Our roots in Pashtunwali give us character; our embrace of technology gives us reach." },
    ],
    strategicFocusAreas: [
      { title: "Digital Empowerment", description: "Building the infrastructure for Orakzai youth to compete in Pakistan's digital economy through skill labs, coding bootcamps, and freelancing programs." },
      { title: "Education Access", description: "Scholarships, learning centers, and distance-learning partnerships to ensure no child in Orakzai district is denied quality education." },
      { title: "Healthcare Outreach", description: "Mobile medical units, telemedicine, and preventive health camps reaching the most remote villages of the district." },
      { title: "Civic Representation", description: "Amplifying the Orakzai voice in national policy through structured engagement with government bodies and legislative forums." },
      { title: "Economic Innovation", description: "Interest-free micro-grants, enterprise incubation, and job placement programs creating sustainable livelihoods." },
      { title: "Global Diaspora Network", description: "Connecting Orakzai communities across 12 countries into a unified force for development and advocacy." },
    ],
    currentInitiatives: [
      { title: "Digital Skill Lab — Phase II", status: "Active", description: "Expanding coding, AI literacy, and freelancing training to 500 new students across three districts." },
      { title: "Sehat-e-Orakzai Mobile Clinics", status: "Active", description: "Four mobile health units conducting monthly camps across 28 remote villages." },
      { title: "Global Scholarship Fund 2026", status: "Open", description: "Full university scholarships for 50 Orakzai students — applications now open for the 2026–27 academic year." },
      { title: "UNITAR Community Leadership Program", status: "Completed", description: "Representing the Orakzai community at the United Nations Institute for Training and Research in Geneva." },
      { title: "Orakzai Digital Embassy Launch", status: "Ongoing", description: "Building sonoforakzai.vercel.app into a comprehensive digital homeland for the entire Orakzai nation." },
    ],
  },
  {
    id: 2,
    name: "Malak Speen Gul Orakzai",
    title: "Co-Founder & Chairman of CSR (Former MNA)",
    focus: "Regional Governance, National Legislative Advocacy & Institutional CSR Strategy",
    intro: "Distinguished statesman, Former Member of National Assembly (MNA) for Hangu, and Co-Founder anchoring national governance and CSR frameworks for the Orakzai nation.",
    photo: "/malak-speen-gul.jpg",
    linkedin: "#",
    twitter: "#",
    isSupreme: true,
    supremeTitle: "Co-Founder",
    mission: "To establish structural pathways for regional empowerment—anchoring national governance frameworks and corporate social responsibility to build sustainable, high-impact socio-economic foundations.",
    bio: "Malak Speen Gul Orakzai is a distinguished statesman, prominent regional leader, and the Co-Founder of Orakzai.org. Bringing a powerful legacy of public service, legislative oversight, and national governance as a Former Member of the National Assembly (MNA) for Hangu, his strategic leadership bridges high-level policy frameworks in Islamabad with impactful developmental deployment across the Orakzai and Hangu regions. Functioning as the Chairman of Corporate Social Responsibility (CSR), he orchestrates the organization's institutional welfare architectures, regional integration initiatives, and sustainable development portfolios. His decades of unmatched tribal diplomacy, state-level legislative acumen, and dedication to structural enablement form the foundational bedrock of the group's socio-economic strategy, driving long-term stability and progress across national and regional frontiers.",
    location: "Orakzai District & Hangu, Khyber Pakhtunkhwa, Pakistan",
  },
];

export const BOARD_MEMBERS: TeamMember[] = [
  {
    id: 3,
    name: "Maria Hussain",
    title: "Education Head",
    focus: "Digital Skill Lab & Women Empowerment",
    intro: "Driving educational initiatives and digital literacy programs that empower women across the Orakzai region.",
    photo: "/team/maria-hussain.jpg",
    linkedin: "#", twitter: "#",
    bio: "Maria Hussain is a distinguished education policy specialist, digital transformation advocate, and social impact leader. She holds a Master's degree in Education Policy from Quaid-i-Azam University, Islamabad, and is a UN APCICT Certified Trainer. Operating actively between Islamabad and Khyber Pakhtunkhwa, she has dedicated over a decade to driving educational equity, digital literacy, and women's empowerment across underserved regions, with a profound focus on the Orakzai District.\n\nKey Achievements & Career Track Record\n\nEducational Infrastructure: As the Education Head at Suno F Orakzai, she spearheads grassroots academic initiatives. Under her leadership, the organization established five localized learning centers in Orakzai to bridge infrastructure gaps.\n\nScholarship Design: She conceptualized and executed a flagship scholarship program that has successfully funded and transformed the academic journeys of over 500 students in the district.\n\nAcademic Development: She directly oversees core educational operations, including modern curriculum development, teacher training workshops, and distance learning partnerships with national universities.\n\nDigital & Women Empowerment: Serving as the Director of Operations at Infotex and Program Coordinator for WiFi DX (Women ICT Frontier Initiative), she trains women in critical ICT and digital skills, enabling them to transition into the modern digital economy.\n\nVision and Philosophy for Orakzai\n\nMaria's core operational philosophy is simple yet transformative: \"An educated Orakzai is an empowered Orakzai.\"\n\nHer vision is to move past traditional schooling and equip the youth and women of Orakzai with practical digital literacy. By introducing computer training, online skill labs, and remote learning programs, she aims to break geographical barriers. Her ultimate goal is to connect the remote talent of Orakzai directly to mainstream national and international socioeconomic opportunities.",
    location: "Islamabad Capital Territory, Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 4,
    name: "Dr. Asma Orakzai",
    title: "Director of Health Services",
    focus: "Sehat-e-Orakzai, Telemedicine Infrastructure & Maternal Health Systems",
    intro: "Women Health Leader & clinical architect pioneering telemedicine networks and maternal health systems across Orakzai and beyond.",
    photo: "/team/dr-asma-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer equitable clinical frameworks and scalable health systems—bridging advanced medical expertise with structured delivery metrics to transform maternal and regional public health outcomes.",
    bio: "Dr. Asma Orakzai is a highly distinguished healthcare leader and specialized clinical architect serving as the Director of Health Services. Functioning as a prominent Women Health Leader with clinical associations at the prestigious Aga Khan University Hospital, her administrative portfolio bridges advanced public health models with critical local delivery infrastructure. Based out of Karachi, Pakistan, she expertly leads the organization's overarching healthcare operations, managing comprehensive healthcare programs and pioneering digital telemedicine networks designed to serve thousands of families across underserved regions. Backed by structured medical training and extensive field clinical oversight, Dr. Asma spearheads maternal health, preventative medicine protocols, and large-scale child welfare systems. Her strategic combination of clinical precision, healthcare policy direction, and operational excellence establishes her as a cornerstone pillar of the group's global digital and physical wellness mission.",
    location: "Karachi, Pakistan & Orakzai District",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 5,
    name: "Kashif Orakzai",
    title: "Core Team Member & Security Liaison",
    focus: "Public Safety, Police Liaison & Field Operations",
    intro: "Law enforcement professional ensuring safety, security compliance, and structured on-ground operations for all community initiatives.",
    photo: "/team/kashif-orakzai.png",
    linkedin: "#", twitter: "#",
    mission: "To serve and secure the community framework—leveraging professional enforcement background to maintain absolute safety and structured support for all regional initiatives.",
    bio: "Kashif Orakzai is an indispensable Core Team Member and the Security Liaison lead for Orakzai.org. Serving actively within the law enforcement and police services, his professional background brings strong discipline, structural coordination, and reliable public safety management to the organization's on-ground activities. Based across Hangu and the Orakzai District, Kashif works directly within the core team to ensure all local community initiatives, public events, and field programs are executed safely, smoothly, and in full compliance with local security guidelines. His practical experience in regional law enforcement, combined with his dedicated volunteer oversight, provides a trusted foundation of stability and safety for every team member and project across the district.",
    location: "Hangu & Orakzai District, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 6,
    name: "Ghazi Mansoor Orakzai",
    title: "Community Engagement & Medical Outreach Lead",
    focus: "Digital Media Advocacy, Healthcare Coordination & Jirga-e-Naujawan",
    intro: "Bridging digital advocacy with healthcare coordination to mobilize regional communities and youth affairs across Orakzai.",
    photo: "/team/ghazi-mansoor.png",
    linkedin: "#", twitter: "#",
    mission: "To mobilize digital networks and drive healthcare accessibility—uniting public communication strategies with clinical coordination to empower regional communities.",
    bio: "Ghazi Mansoor Orakzai is a dynamic core leader serving as the Community Engagement & Medical Outreach Lead at Orakzai.org. Seamlessly bridging clinical care parameters with active digital public relations, his dual background in the medical field and social media advocacy brings strong visibility and execution power to the team. Based out of Kohat, Ghazi spearheads the organization's regional healthcare initiatives and dynamic public communication channels. He works directly on the ground to coordinate medical aid setups, health awareness, and youth development programs while managing the community's digital footprint. His unique ability to rally public support through digital spaces, combined with his medical field coordination experience, makes him a key driver in keeping regional public programs transparent, deeply trusted, and highly impactful.",
    location: "Kohat, KPK, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 7,
    name: "Zubair Orakzai",
    title: "IT & Blockchain Strategist / Media Head (Orakzai Bond)",
    focus: "Ecosystem Media Communications, Tech Infrastructure & Blockchain Strategy",
    intro: "Architecting the digital backbone of Orakzai, building blockchain-powered transparency systems.",
    photo: "/team/zubair-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer high-performance tech frameworks and command institutional media architectures—uniting digital communications with blockchain strategy to secure ecosystem transparency and global reach.",
    bio: "M. Zubair Orakzai is a core visionary leader, technology engineer, and the IT & Blockchain Strategist at Orakzai.org. Functioning dynamically within the ecosystem, he also serves as the Media Head for Orakzai Bond, strategically commanding the intersection of cryptographic infrastructure rollout and high-end digital media communication. Based out of Murree, Zubair spearheads the integration of next-generation digital frameworks, ecosystem transparency models, and tech-driven public solutions for regional and digital operations. Backed by structured expertise in network configurations and blockchain application deployments, he manages the group's digital skill-building initiatives, core tech infrastructure pipelines, and authoritative brand messaging frameworks. His critical combination of technical systems deployment and media coordination ensures the group's decentralized platforms and community footprints maintain world-class execution and strategic visibility across both global and regional networks.",
    location: "Murree, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 8,
    name: "Haqnawaz Orakzai",
    title: "Welfare & Relief Coordinator",
    focus: "Humanitarian Aid Architecture, Social Safety Nets & Imdad-e-Bahan",
    intro: "Coordinating relief efforts and welfare programs to support the most vulnerable families in Orakzai.",
    photo: "/team/haqnawaz-orakzai.png",
    linkedin: "#", twitter: "#",
    mission: "To engineer proactive relief models and secure community resilience—optimizing end-to-end welfare distribution and institutional safety nets across vulnerable sectors.",
    bio: "Haqnawaz Orakzai is an indispensable core leader and the Welfare & Relief Coordinator at Orakzai.org. Commandingly leading the group's humanitarian operations, emergency response protocols, and corporate social responsibility (CSR) initiatives, his administrative strategy focuses on structuring scalable aid deployment. Operative throughout the Orakzai District, Haqnawaz manages the organization's comprehensive relief programs, orchestrating rapid-response networks during critical environmental and structural crises. From coordinating essential supply logistics to executing long-term socio-economic safety programs—including structured family grants, widow support, and childcare welfare infrastructure—his operational foresight guarantees absolute delivery precision. His deep command of field conditions and community metrics provides a highly trusted foundation for regional public safety, setting an institutional standard for impactful on-ground development.",
    location: "Orakzai District, KPK, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 9,
    name: "Abdul Razzaq Orakzai",
    title: "Strategic Planning Officer",
    focus: "Global Partnerships, Institutional KPI Tracking & NGO Relations",
    intro: "Building strategic alliances with international NGOs and government bodies to amplify Orakzai's voice globally.",
    photo: "/team/abdul-razzaq.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer macro-level development roadmaps and secure high-impact global alliances—aligning institutional data frameworks with structured community development metrics.",
    bio: "Abdul Razzaq Orakzai is the visionary framework architect and the Strategic Planning Officer at Orakzai.org. Equipped with an MBA and extensive expertise in large-scale public sector development pipelines, his leadership structures the group's institutional expansion strategy and multi-year execution plans. Based out of Kohat, Pakistan, Abdul Razzaq manages high-level national and international NGO relations, authoring technical proposals that secure critical global partnerships. He anchors organizational accountability by tracking key performance indicators (KPIs) and translating complex community requirements into funded, scalable, and measurable field programs. His highly analytical approach and corporate policy expertise ensure the entire organization maintains strategic alignment, maximizing project funding and operational efficiency across the region.",
    location: "Kohat, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 10,
    name: "Sher Wali Orakzai",
    title: "Talent, Sports & Cultural Director",
    focus: "Literary Arts & Poetry, Talent Hunt & Youth Sports Development",
    intro: "Identifying and nurturing sporting talent and creative skills among Orakzai youth for national recognition.",
    photo: "/team/sher-wali.png",
    linkedin: "#", twitter: "#",
    mission: "To preserve regional heritage and inspire youth empowerment—uniting sports administration with literary excellence to cultivate creative and athletic leadership.",
    bio: "Sher Wali Orakzai is a distinguished cultural leader, celebrated regional poet, and the Talent, Sports & Cultural Director at Orakzai.org. Seamlessly blending his deep passion for literary arts and poetry with professional youth development frameworks, his leadership champions the creative and athletic potential of the region. Based out of Kohat, Sher Wali orchestrates the organization's comprehensive talent hunt operations, sports academies, and cultural heritage preservation programs. As a prominent poet and former athlete, he spearheads initiatives that provide mentorship and platforms for young sportspersons, artists, and writers alike. His strategic focus on nurturing discipline through sports and instilling cultural pride through literature forms a foundational pillar for youth empowerment, turning grassroots potential into structured national success.",
    location: "Kohat, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 11,
    name: "Muhammad Hayat",
    title: "Finance, Transparency & Marketing Head",
    focus: "Global Marketing Strategies, Chartered Accounting & Audit Reports",
    intro: "Ensuring financial integrity and full transparency in all community funds through rigorous audit practices.",
    photo: "/team/muhammad-hayat.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer bulletproof financial transparency and scale global brand penetration—uniting corporate chartered accounting precision with high-impact capital marketing strategies.",
    bio: "Muhammad Hayat is a top-tier institutional leader and the Finance, Transparency & Marketing Head at Orakzai.org. As an elite Chartered Accountant combined with powerful expertise as a Marketing Expert, his multi-dimensional portfolio drives both strict fiscal accountability and international growth metrics. Operating directly out of the United Arab Emirates (UAE), Muhammad Hayat serves as the absolute bridge for global donor relations, capital campaign management, and corporate financial oversight. He commandingly steers all international budgeting, blockchain-verified fundraising compliance, and transparent auditing processes. By perfectly executing standard financial audits alongside advanced digital marketing and brand growth strategies, he ensures that the organization's cross-border operations remain completely secure, highly visible, and perfectly optimized for maximum global impact.",
    location: "United Arab Emirates (UAE)",
    reportsTo: "Faisal Orakzai",
  },
];

/* ── Board & Advisors — senior counsel guiding governance & strategy ── */
export const BOARD_ADVISORS: TeamMember[] = [
  {
    id: 106,
    name: "Senator Aurangzeb Khan Orakzai",
    title: "Senior Board Advisor (Senator & MPA)",
    focus: "Sovereign Governance, Legislative Strategy & Institutional Advisory",
    intro: "A veteran legislator anchoring state-level governance frameworks and legislative strategy for the organization's institutional roadmap.",
    photo: "/team/senator-aurangzeb.jpg",
    linkedin: "#", twitter: "#",
    mission: "To anchor macro-level legislative frameworks and steer strategic regional governance—deploying state-level advisory to build sustainable socio-economic infrastructure.",
    bio: "Senator Aurangzeb Khan Orakzai is an illustrious statesman, veteran legislator, and Senior Board Advisor at Orakzai.org. Possessing a formidable legacy of apex public service on the national stage as a Senator and Member of the Provincial Assembly (MPA), his unparalleled legislative acumen and governance foresight provide executive-tier counsel to the organization's institutional roadmap. Operative across Islamabad and the Orakzai District, Senator Aurangzeb serves as the strategic anchor bridging state-level policy formulation with grassroots socioeconomic deployment. His profound mastery over tribal diplomacy, regional security architecture, and legislative alignment forms the structural cornerstone of the advisory council. By orchestrating high-level governance frameworks and sustainable socio-economic directives, he ensures the organization scales its sovereign regional impact while maintaining absolute institutional excellence.",
    location: "Orakzai District & Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 107,
    name: "Yousaf Khan",
    title: "Board Advisor (Sitting MNA)",
    focus: "Parliamentary Policy, National Legislative Oversight & Regional Development",
    intro: "The sitting Member of the National Assembly for Hangu and Orakzai, linking the organization directly with national policy channels.",
    photo: "/team/yousaf-khan.jpg",
    linkedin: "#", twitter: "#",
    mission: "To synthesize current legislative initiatives with targeted regional execution—leveraging active parliamentary authority to drive sustainable civic advancement and socioeconomic empowerment.",
    bio: "Yousaf Khan is an eminent political figure, active national legislator, and Board Advisor at Orakzai.org. Serving as the sitting Member of the National Assembly (MNA) for the Hangu and Orakzai constituency, his presence on the advisory panel links the organization directly with contemporary national decision-making and top-tier legislative oversight. Operating dynamically between the federal capital of Islamabad and the regional centers of Hangu and Orakzai, his leadership ensures local socio-development initiatives are seamlessly integrated with national policy channels. With an expansive command over public policy, institutional governance, and parliamentary strategy, Yousaf Khan serves as a vital strategic advisor. His active involvement steers the organization's high-impact community programs, regional infrastructure alignment, and public empowerment strategies toward absolute execution and state-level excellence.",
    location: "Hangu, Orakzai & Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 108,
    name: "Hafiz Malik Habib Noor Orakzai",
    title: "Senior Board Advisor (Chairman PTIP)",
    focus: "Political Strategy, Socio-Economic Advocacy & Public Relations",
    intro: "The sitting Chairman of PTIP, bringing macro-level political governance and public policy advocacy to the advisory panel.",
    photo: "/team/hafiz-malik-habib-noor.jpg",
    linkedin: "#", twitter: "#",
    mission: "To synthesize political foresight with regional empowerment—utilizing executive leadership frameworks to drive structured socio-economic development and national integration.",
    bio: "Hafiz Malik Habib Noor Orakzai is a highly distinguished political leader, strategist, and Senior Board Advisor at Orakzai.org. As the sitting Chairman of PTIP, his entry into the advisory panel brings a powerful dimension of macro-level political governance, community organization, and public policy advocacy to the group. Operating dynamically across Kohat and Islamabad, Hafiz Malik Habib Noor acts as a critical institutional anchor, aligning regional welfare initiatives with broader national advocacy networks. His profound command over tribal diplomacy, youth mobilization frameworks, and structural public relations ensures the organization's long-term community roadmaps are executed with supreme strategic oversight and absolute institutional excellence.",
    location: "Kohat & Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 109,
    name: "Nighat Yasmin Orakzai",
    title: "Senior Board Advisor (Former MPA 2002 - 2023)",
    focus: "Legislative Oversight, Women Empowerment & Public Policy Formulation",
    intro: "A veteran parliamentarian with a historic tenure as MPA from 2002 to 2023, bringing unmatched policy-making authority to the advisory council.",
    photo: "/team/nighat-yasmin-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To leverage decades of legislative mastery and public policy insight—advocating for structural gender equity, provincial governance realignment, and sustainable community empowerment models.",
    bio: "Nighat Yasmin Orakzai is a legendary stateswoman, veteran parliamentarian, and Senior Board Advisor at Orakzai.org. Serving as a distinguished Member of the Provincial Assembly (MPA) across a historic and expansive tenure from 2002 to 2023, her extensive legislative career brings unmatched policy-making authority and governance experience to the advisory council. Based out of Peshawar, her impactful legacy anchors the organization's high-level advocacy pipelines and regional human development strategies. With over two decades of experience in navigating complex provincial legislative frameworks, driving grassroots welfare systems, and championing women's socioeconomic rights, she acts as a pivotal structural strategist. Her seasoned insight guides the board toward absolute execution, maintaining elite institutional standards across all regional community development and integration programs.",
    location: "Peshawar, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 110,
    name: "Muhammad Iqbal Wazir",
    title: "Senior Board Advisor (Ex-Minister & MPA)",
    focus: "Ministerial Governance, Regional Development Strategy & Public Administration",
    intro: "A former provincial Minister and MPA, bringing executive-level governance experience and administrative expertise to the advisory council.",
    photo: "/team/muhammad-iqbal-wazir.jpg",
    linkedin: "#", twitter: "#",
    mission: "To translate ministerial executive oversight into institutional community milestones—deploying macro-level administrative strategies to unlock sustainable structural growth and regional modernization.",
    bio: "Muhammad Iqbal Wazir is an eminent statesman, veteran legislator, and Senior Board Advisor at Orakzai.org. Having served with high distinction as a provincial Minister and Member of the Provincial Assembly (MPA), his executive-level governance background and profound understanding of administrative frameworks bring formidable policy execution weight to the advisory council. Operating dynamically out of Islamabad, his leadership serves as a vital bridge for large-scale development pipelines, provincial resource management, and strategic policy realignment. With extensive experience steering ministerial portfolios, driving high-impact infrastructure programs, and managing public sector resources, he provides the board with elite systemic oversight. His seasoned guidance ensures the organization's socioeconomic development initiatives are designed and deployed with absolute structural precision and national excellence.",
    location: "Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 111,
    name: "Sajid Hussain Turi",
    title: "Senior Board Advisor (Ex-Federal Minister & MNA 2008 - 2023)",
    focus: "Federal Governance, Overseas Alliances & Human Resource Development",
    intro: "Pakistan's former Federal Minister for Overseas Pakistanis and Human Resource Development, with a historic 15-year tenure as MNA from 2008 to 2023.",
    photo: "/team/sajid-hussain-turi.jpg",
    linkedin: "#", twitter: "#",
    mission: "To bridge national legislative authority with global diaspora engagement—utilizing macro-level federal frameworks to drive sustainable regional development and international human capital cultivation.",
    bio: "Sajid Hussain Turi is an illustrious statesman, veteran federal legislator, and Senior Board Advisor at Orakzai.org. Having served with high distinction as Pakistan's Federal Minister for Overseas Pakistanis and Human Resource Development, alongside a historic 15-year continuous tenure as a Member of the National Assembly (MNA) from 2008 to 2023, his presence anchors the board with apex-level state governance authority. Operating primarily out of Islamabad, his vast expertise specializes in cross-border diplomacy, strategic international collaborations, and institutional human capital empowerment. His seasoned mastery in alignment of federal public policies, driving national infrastructure initiatives, and optimizing diaspora engagement frameworks provides the organization with supreme executive oversight. His guidance ensures the group's socio-economic and regional transformation programs scale with absolute structural precision and elite national excellence.",
    location: "Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
  {
    id: 112,
    name: "Ahmad Hanif Orakzai",
    title: "Senior Board Advisor (PAS Officer, BS-22)",
    focus: "Public Administration, Apex Bureaucratic Policy & Strategic Governance",
    intro: "An exceptionally distinguished civil servant of the elite Pakistan Administrative Service, serving at the apex of civil governance in Grade BS-22.",
    photo: "/team/ahmad-hanif-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To deploy top-tier administrative mastery and civil service foresight—anchoring structural development blueprints within federal governance frameworks for absolute execution excellence.",
    bio: "Ahmad Hanif Orakzai is an exceptionally distinguished civil servant, public administrator, and Senior Board Advisor at Orakzai.org. Belonging to the elite Pakistan Administrative Service (PAS) and serving at the absolute apex of civil governance in Grade BS-22, his extensive career in state machinery brings unmatched bureaucratic authority and administrative mastery to the advisory council. Operating out of the federal capital of Islamabad, his leadership provides the board with unparalleled insight into large-scale public sector management, regulatory frameworks, and national policy execution. With a historic footprint in heading key institutional portfolios and organizing macro-level structural operations, he guides the organization's strategic initiatives toward total alignment with state standards and institutional sustainability.",
    location: "Islamabad, Pakistan",
    reportsTo: "Faisal Orakzai",
  },
];

/* ── Beneficiary Members — families & individuals supported by Orakzai.org ── */
export const BENEFICIARY_MEMBERS: TeamMember[] = [
  {
    id: 201,
    name: "Bibi Shireen Family",
    title: "Widow Support Program",
    focus: "Monthly Stipend & Children's Education",
    intro: "A widow of five supported with a monthly stipend and full school sponsorship for her children since 2023.",
    photo: "/team/beneficiary-1.jpg",
    bio: "The Bibi Shireen family from Ismailzai qoum lost their sole earner in 2022. Since enrolling in the Widow Support Program, all four school-age children now attend Orakzai-funded learning centers, and the family receives a monthly welfare stipend along with subsidized healthcare access. Bibi Shireen also completed a tailoring micro-enterprise course through the Digital Skill Lab and now runs a small home-based sewing business.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    id: 202,
    name: "Rehmat Gul",
    title: "Interest-Free Business Grant Recipient",
    focus: "Small Retail Enterprise Grant",
    intro: "Received an interest-free grant to launch a general store, now employing two other community members.",
    photo: "/team/beneficiary-2.jpg",
    bio: "Rehmat Gul, a father of six from the Daulatzai qoum, received an interest-free micro-grant of PKR 150,000 through the Economic Innovation program. He used it to open a general store in his village, which now employs two additional local youth and supplies essential goods to over 40 nearby households.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    id: 203,
    name: "Zainab Scholarship Cohort",
    title: "Global Scholarship Beneficiaries",
    focus: "University Tuition & Mentorship",
    intro: "A cohort of 12 young women receiving full university scholarships and mentorship under the Education pillar.",
    photo: "/team/beneficiary-3.jpg",
    bio: "Named after the program's first graduate, the Zainab Cohort supports 12 young women from across the Orakzai qoums with full university tuition, hostel stipends, and one-on-one mentorship from professional women in the diaspora network. Three graduates now work in healthcare and education back in the district.",
    location: "Peshawar, Pakistan",
  },
  {
    id: 204,
    name: "Sturi Khel Flood-Relief Households",
    title: "Emergency Relief Beneficiaries",
    focus: "Shelter, Food & Medical Aid",
    intro: "38 households provided emergency shelter, food rations, and medical care after seasonal flooding.",
    photo: "/team/beneficiary-4.jpg",
    bio: "Following seasonal flash floods, the Social Welfare & Crisis Relief pillar provided emergency tents, food rations, and mobile medical care to 38 households in the Sturi Khel qoum area. Follow-on support included home-repair grants and school-supply replacement for affected children.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    id: 205,
    name: "Haji Dilbar Household",
    title: "Healthcare Access Beneficiary",
    focus: "Mobile Clinic & Chronic Care",
    intro: "An elderly beneficiary receiving ongoing chronic-care treatment through the mobile health unit program.",
    photo: "/team/beneficiary-5.jpg",
    bio: "Haji Dilbar, an elder of the Mishti qoum living with diabetes, receives regular checkups and medication through Orakzai's mobile health unit, which visits his village monthly. He credits the program with preventing complications that would otherwise have required a costly trip to Peshawar.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan",
  },
];

/* ── Global Leadership — representing Orakzai at the international level ── */
export const GLOBAL_LEADERSHIP: TeamMember[] = [
  {
    id: 300,
    name: "Faisal Orakzai",
    slug: "faisalorakzai-global",
    title: "Founder & Chairman (Technology Entrepreneur & Computer Scientist)",
    focus: "Decentralized Systems Architecture, Tokenomics & Quantitative AI Trading Engine Design",
    intro: "An elite technology entrepreneur and computer scientist leading Orakzai's global technical architecture and digital asset strategy.",
    photo: "/team/faisal-orakzai-global.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer apex decentralized infrastructure and lead high-performance technology ecosystems—uniting computer science frameworks with global capital investment to build transparent digital economies.",
    bio: "Faisal Orakzai is an elite technology entrepreneur, visionary computer scientist, and the Founder and Chairman of the Orakzai Group. Positioned at the forefront of global technological innovation, his leadership anchors the structural deployment of advanced technical ecosystems and high-yield digital asset models. Operating from the commercial hub of Karachi, he spearheads the end-to-end technical architecture, cryptographic frameworks, and smart contract protocol tokenomics for pioneering blockchain platforms on the Polygon network. Backed by a powerful command over quantitative engineering and machine learning paradigms, he conceptualizes and drives automated AI financial trading engines. As an investor and master technologist, his systemic oversight seamlessly unifies bleeding-edge software infrastructure with global asset real estate platforms, securing absolute execution precision and positioning the enterprise at the apex of the digital economy.",
    location: "Karachi, Pakistan",
  },
  {
    id: 306,
    name: "Dr. Shahzad Orakzai",
    slug: "drshahzadorakzai",
    title: "Global Leadership (Executive Vice President, TAQA Water Solutions)",
    focus: "Global Infrastructure Strategy, Sustainable Water Systems & Executive Corporate Management",
    intro: "An exceptionally accomplished global executive and infrastructure strategist serving as Executive Vice President at TAQA Water Solutions.",
    photo: "/team/dr-shahzad-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To architect world-class infrastructure models and drive cross-border corporate innovation—deploying institutional leadership to secure global utility scale and environmental sustainability.",
    bio: "Dr. Shahzad Orakzai is an exceptionally accomplished global executive, infrastructure strategist, and key member of the Global Leadership panel at Orakzai.org. Serving as the Executive Vice President at TAQA Water Solutions, his presence on the platform brings formidable corporate authority, macro-level asset administration, and top-tier industrial execution expertise. Operating from the global commercial hub of Abu Dhabi, UAE, his leadership anchors high-end regional utility planning, sustainable resource networks, and multi-billion dollar international project operations. With an extensive academic and executive track record in managing critical technical systems and directing corporate development models, he provides the organization with deep systemic insight. His vision bridges elite regional network development with world-class operational metrics, securing absolute operational standard across global and regional frameworks.",
    location: "Abu Dhabi, United Arab Emirates (UAE)",
  },
  {
    id: 307,
    name: "Dr. Faisal Moeen Orakzai",
    slug: "drfaisalmoeenorakzai",
    title: "Global Leadership (Founder & CEO, Digifloat)",
    focus: "Artificial Intelligence Systems, Distributed Cloud Architecture & Advisory Analytics",
    intro: "A top-tier European technology executive and senior systems architect serving as Founder and CEO of Digifloat.",
    photo: "/team/dr-faisal-moeen-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To architect resilient cloud topologies and pioneering artificial intelligence pipelines—deploying world-class systems engineering to drive global enterprise modernization and strategic technical analytics.",
    bio: "Dr. Faisal Moeen Orakzai is a top-tier European technology executive, senior systems architect, and an esteemed member of the Global Leadership council at Orakzai.org. As the Founder and CEO of Digifloat, his exceptional career anchors the platform with profound expertise in advanced Cloud Architecture, Big Data Analytics, and enterprise-scale Artificial Intelligence systems. Operating directly from the diplomatic and corporate hub of Brussels, Belgium, he acts as a key international advisory consultant, leading multi-national organizational strategies to harness the full analytical potential of decentralized data pipelines. His deep executive oversight and specialized command over distributed infrastructures provide the board with an elite engineering foundation, perfectly scaling the organization's technical frameworks and high-performance digital solutions across international corridors.",
    location: "Brussels, Belgium",
  },
  {
    id: 308,
    name: "Faiçal Orakzai",
    slug: "faical-orakzai-paris",
    title: "Global Leadership (Co-Founder & CEO, easyBNB)",
    focus: "Property Technology (PropTech), Short-Term Asset Management & Scale Operations",
    intro: "A highly accomplished global property technology entrepreneur and hospitality strategist serving as Co-Founder and CEO of easyBNB.",
    photo: "/team/faical-orakzai.jpg",
    linkedin: "#", twitter: "#",
    mission: "To disrupt traditional hospitality landscapes and streamline property technology—deploying innovative operational models to maximize cross-border digital real estate asset optimization.",
    bio: "Faiçal Orakzai is a highly accomplished global property technology entrepreneur, hospitality strategist, and a premier member of the Global Leadership panel at Orakzai.org. As the Co-Founder and CEO of easyBNB, his executive presence anchors the platform with profound mastery over PropTech solutions, decentralized asset management pipelines, and high-growth operational scalability. Based out of Paris, France, his leadership bridges European real estate markets with cutting-edge short-term rental management ecosystems, orchestrating frictionless digital workflows for premium properties. His deep command of cross-border real estate operational tech and scalable market penetration models provides the advisory framework with an unmatched asset optimization perspective, steering the organization's property initiatives toward world-class standard and market efficiency.",
    location: "Paris, France",
  },
  {
    id: 309,
    name: "Arslan Orakzai",
    slug: "arslan-orakzai-telecom",
    title: "Global Leadership (CEO, Apollo Telecom)",
    focus: "Telecommunications Infrastructure, Enterprise Connectivity & Scalable Networks",
    intro: "A highly distinguished technology executive and infrastructure specialist serving as Chief Executive Officer at Apollo Telecom.",
    photo: "/team/arslan-orakzai-telecom.jpg",
    linkedin: "#", twitter: "#",
    mission: "To architect seamless communication networks and scale next-generation connectivity—deploying high-performance telecom frameworks to unlock regional business agility and technical synergy.",
    bio: "Arslan Orakzai is a highly distinguished technology executive, infrastructure specialist, and an esteemed member of the Global Leadership panel at Orakzai.org. Serving as the Chief Executive Officer at Apollo Telecom (Pvt) Ltd., his presence brings massive operational authority, telecom engineering prowess, and corporate management expertise to the advisory council. Operating out of the federal capital of Islamabad, his leadership anchors large-scale enterprise communication infrastructures, regulatory integrations, and critical network deployments. His seasoned mastery in executing complex technology frameworks and expanding infrastructure channels across multiple business verticals provides the platform with an unmatched systemic edge, aligning regional communications with global industry standards.",
    location: "Islamabad, Pakistan",
  },
  {
    id: 310,
    name: "Ahmad Orakzai",
    slug: "ahmad-orakzai-finance",
    title: "Global Leadership (Financial Modeling Associate, S&P Global)",
    focus: "Quantitative Financial Modeling, Valuation Architectures & Data Analytics",
    intro: "A distinguished corporate finance professional and quantitative analyst serving as a Financial Modeling Associate at S&P Global.",
    photo: "/team/ahmad-orakzai-finance.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer high-fidelity financial models and structure institutional market analytics—deploying precise data intelligence to optimize asset valuation and drive corporate growth portfolios.",
    bio: "Ahmad Orakzai is a distinguished corporate finance professional, quantitative analyst, and a key executive member of the Global Leadership panel at Orakzai.org. Serving as a Financial Modeling Associate at S&P Global, his corporate pedigree anchors the platform with elite capabilities in algorithmic asset valuation, macro-level market data structuring, and rigorous predictive modeling. Operating from the institutional hub of Islamabad, his expertise specializes in synthesizing complex financial datasets into actionable enterprise intelligence. His sharp mathematical precision and technical command over corporate valuation frameworks provide the advisory panel with an essential quantitative edge, perfectly optimizing the organization's strategic asset pipelines and cross-border financial systems.",
    location: "Islamabad, Pakistan",
  },
  {
    id: 311,
    name: "Zarak Khan Orakzai",
    slug: "zarak-khan-orakzai-aws",
    title: "Global Leadership (Enterprise Software Architect, AWS)",
    focus: "Enterprise Cloud Architecture, Hyperscale Distributed Systems & Resilient Infrastructure Design",
    intro: "A top-tier international technology leader and cloud systems engineer serving as an Enterprise Software Architect at Amazon Web Services (AWS).",
    photo: "/team/zarak-khan-orakzai-aws.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer hyper-scalable enterprise software systems and architect elite cloud infrastructures—deploying systemic tech blueprints to drive global computational agility and seamless operational execution.",
    bio: "Zarak Khan Orakzai is a top-tier international technology leader, cloud systems engineer, and a premier executive member of the Global Leadership panel at Orakzai.org. Serving as an Enterprise Software Architect at Amazon Web Services (AWS), his corporate pedigree anchors the platform with elite capabilities in distributed systems design, fault-tolerant infrastructure, and hyperscale software deployment models. Operating directly out of the global technology epicenter of California, USA, his expertise specializes in orchestrating highly secure, massive-scale cloud environments for global enterprises. His advanced command over computing frameworks and structural cloud topologies provides the organization with a powerful engineering foundation, ensuring all backend software networks and computational frameworks operate with absolute efficiency and world-class resilience.",
    location: "California, USA",
  },
  {
    id: 312,
    name: "Asfandyar Orakzai",
    slug: "asfandyar-orakzai-capgemini",
    title: "Global Leadership (Lead Data Engineer, Capgemini)",
    focus: "Enterprise Data Engineering, Big Data Architecture & Advanced Predictive Analytics Pipelines",
    intro: "An exceptionally accomplished international data infrastructure executive and cloud engineer serving as the Lead Data Engineer at Capgemini.",
    photo: "/team/asfandyar-orakzai-capgemini.jpg",
    linkedin: "#", twitter: "#",
    mission: "To engineer hyper-efficient data systems and orchestrate robust analytical frameworks—transforming multi-tier distributed datasets into elite institutional intelligence and scalable technological assets.",
    bio: "Asfandyar Orakzai is an exceptionally accomplished international data infrastructure executive, cloud engineer, and a premier member of the Global Leadership panel at Orakzai.org. Serving as the Lead Data Engineer at Capgemini, his corporate pedigree anchors the platform with elite capabilities in enterprise-scale data modeling, real-time streaming architectures, and high-performance pipeline design. Operating from the global financial and tech hub of London, UK, his leadership specializes in managing critical data lifecycles and structuring resilient architectures for complex institutional frameworks. His seasoned command over big data environments, cloud integrations, and structural analytics tools provides the organization with a powerful technical foundation, ensuring all decentralized data networks deploy with supreme precision and absolute execution excellence.",
    location: "London, United Kingdom (UK)",
  },
  {
    id: 313,
    name: "Hamza Saeed Orakzai",
    slug: "hamza-saeed-orakzai-stza",
    title: "Global Leadership (Chief Market Development Officer, STZA & Eisenhower Fellow)",
    focus: "Technology Ecosystem Architecture, Macroeconomic Public Policy & Tech-Zone Commercialization",
    intro: "A prominent C-suite executive and public policy expert serving as Chief Market Development Officer and founding director at the Special Technology Zones Authority (STZA).",
    photo: "/team/hamza-saeed-orakzai-stza.jpg",
    linkedin: "#", twitter: "#",
    mission: "To architect world-class legal and commercial frameworks that fuel digital economies—scaling tech zones, driving asset governance, and eliminating macro-level structural infrastructure bottlenecks.",
    bio: "Hamza Saeed Orakzai is an exceptionally prominent C-suite executive, distinguished public policy expert, and a premier member of the Global Leadership panel at Orakzai.org. Serving as the Chief Market Development Officer (CMDO) and a founding director at the Special Technology Zones Authority (STZA), his leadership has been instrumental in architecting the foundational legal and commercial frameworks for Pakistan's modern digital economy. As an globally recognized Eisenhower Fellow operating out of Islamabad, he has co-authored groundbreaking state frameworks, including the Special Technology Zones Act 2021 and its regulatory rulesets. His phenomenal commercial legacy includes scaling the national tech zone network from 12 to 32 notified zones—housing over 250 technology enterprises—and managing an asset jurisdiction that scaled from US$500 million to over US$1.3 billion. A seasoned international diplomat, he leads critical bilateral tech and science cooperation frameworks globally, providing the board with apex-level systemic oversight and macro-level market strategy execution.",
    location: "Islamabad, Pakistan",
  },
];

/* ── The 19 Orakzai Qoums (sub-tribes) ── */
const QOUMS: string[] = [
  "Ismailzai", "Lashkarzai", "Massuzai", "Alisherzai", "Daulatzai",
  "Muhammad Khel", "Abdul Aziz Khel", "Zemasht", "Sturi Khel", "Lashmanai",
  "Mishti", "Sheikhan", "Ali Khel", "Mula Khel", "Feroz Khel",
  "Bar Muhammad Khel", "Khwaja Khel", "Rabia Khel", "Hamsaya",
];

const MALIK_FIRST_NAMES = [
  "Zar Wali", "Nasrullah", "Rahim Dad", "Sardar Wali", "Gul Zamin",
  "Sher Afzal", "Amanat Shah", "Dilawar Khan", "Fazal Karim", "Haji Sultan",
];
const MALIK_VILLAGES = [
  "Kalaya", "Ghiljo", "Mishti Kandao", "Zeran", "Mastura Valley",
  "Lower Orakzai", "Upper Orakzai", "Feroz Khel Banda", "Ismail Kandao", "Sturi Khel Valley",
];

/* Deterministic 4-Malik roster per qoum — illustrative representative list,
   editable later with real elder data supplied by the organization. */
function buildQoumMaliks(qoum: string, qoumIndex: number): TeamMember[] {
  const roles = ["Spin Malak (Chief Elder)", "Malak — Jirga Representative", "Malak — Youth Liaison", "Malak — Welfare Coordinator"];
  return roles.map((role, i) => {
    const nameIdx = (qoumIndex * 4 + i) % MALIK_FIRST_NAMES.length;
    const villageIdx = (qoumIndex + i) % MALIK_VILLAGES.length;
    const fullName = `Malak ${MALIK_FIRST_NAMES[nameIdx]} ${qoum}`;
    return {
      id: 1000 + qoumIndex * 10 + i,
      name: fullName,
      title: role,
      focus: `${qoum} Qoum Representation`,
      intro: `Represents the ${qoum} qoum within Orakzai.org's tribal council, based in ${MALIK_VILLAGES[villageIdx]}.`,
      photo: "/team/malik-placeholder.jpg",
      bio: `${fullName} serves as ${role.toLowerCase()} for the ${qoum} qoum, based in ${MALIK_VILLAGES[villageIdx]}, Orakzai District. He represents the qoum's households in the organization's tribal council, relaying community needs — from welfare cases to development priorities — directly to the Executive Team, and carrying organizational updates back to the qoum's families.`,
      location: `${MALIK_VILLAGES[villageIdx]}, Orakzai District, Khyber Pakhtunkhwa, Pakistan`,
    };
  });
}

const QOUM_MALIKS: Record<string, TeamMember[]> = Object.fromEntries(
  QOUMS.map((q, i) => [q, buildQoumMaliks(q, i)])
);
const ALL_QOUM_MEMBERS: TeamMember[] = Object.values(QOUM_MALIKS).flat();

/* Circular avatar — object-position: top crops name text at bottom.
   Clickable: opens the full profile, per "click the picture" requirement. */
function MemberAvatar({
  src, name, size = 128, onClick, dualRing = false, verified = false,
}: { src: string; name: string; size?: number; onClick?: () => void; dualRing?: boolean; verified?: boolean }) {
  const ringPad = dualRing ? 10 : 0;
  return (
    <div className="relative flex-shrink-0" style={{ width: size + ringPad * 2, height: size + ringPad * 2 }}>
      {dualRing && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(6,95,60,0.0) 58%, rgba(16,120,74,0.55) 72%, rgba(16,120,74,0) 90%)",
            filter: "blur(3px)",
          }}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open ${name}'s full profile`}
        className="absolute rounded-full overflow-hidden transition-transform hover:scale-[1.04] active:scale-95"
        style={{
          top: ringPad, left: ringPad, width: size, height: size,
          border: `3px solid ${GOLD}`,
          boxShadow: dualRing
            ? `0 0 0 4px rgba(4,20,14,0.9), 0 0 22px rgba(212,175,55,0.4)`
            : `0 0 16px rgba(212,175,55,0.35)`,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: 'top center' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=064e3b&textColor=D4AF37`;
          }}
        />
      </button>
      {verified && (
        <div
          className="absolute w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{
            bottom: ringPad - 2, right: ringPad - 2,
            background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`,
            border: "2.5px solid #041a10",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
          title="Verified Leadership"
        >
          <BadgeCheck className="w-4 h-4 text-emerald-950" />
        </div>
      )}
    </div>
  );
}

function SupremeCard({ member, index, onOpenBio }: { member: TeamMember; index: number; onOpenBio: (m: TeamMember) => void }) {
  const [hovered, setHovered] = useState(false);
  const [location, navigate] = useLocation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  // Profile links live under whichever pillar page is currently open
  // (e.g. /board-advisor/name, not always /team/name) so "View Profile"
  // takes you back to the same pillar instead of the generic team hub.
  const profileUrl = `${location}/${member.slug ?? toSlug(member.name)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(profileUrl)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(profileUrl); }}
      className="relative flex flex-col items-center text-center p-9 pt-14 rounded-[28px] cursor-pointer"
      style={{
        border: `1px solid ${hovered ? GOLD : "rgba(212,175,55,0.5)"}`,
        boxShadow: hovered
          ? "0 0 56px rgba(212,175,55,0.35), 0 20px 48px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.35)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s ease",
      }}
    >
      {/* Background, glow & hairline frame — clipped to the card, kept below the badge */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none" style={{ background: "linear-gradient(160deg, rgba(6,55,36,0.9) 0%, rgba(2,20,13,0.95) 100%)", backdropFilter: "blur(18px)" }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: GOLD }} />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
        <div className="absolute inset-3 rounded-[22px]" style={{ border: "1px solid rgba(212,175,55,0.18)" }} />
      </div>

      {/* Supreme Badge — sits above the clipped background so it is never cut off */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-lg z-10"
        style={{ background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`, color: "#022c22" }}
      >
        <Crown className="w-3.5 h-3.5" />
        {member.supremeTitle}
      </div>

      {/* Avatar — dual ring (gold inner + emerald outer glow) + verified badge */}
      <div className="relative mt-3 mb-6">
        <MemberAvatar src={member.photo} name={member.name} size={148} dualRing verified />
      </div>

      <h3 className="text-[26px] leading-tight font-bold text-white mb-2 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
      <p className="text-[13px] font-bold mb-6" style={{ color: GOLD, fontFamily: "'Inter', sans-serif", letterSpacing: "0.16em" }}>{member.title.toUpperCase()}</p>

      <span
        className="relative flex items-center gap-2 rounded-full px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300"
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

function MemberCard({ member, index, onOpenBio }: { member: TeamMember; index: number; onOpenBio: (m: TeamMember) => void }) {
  const [hovered, setHovered] = useState(false);
  const [location, navigate] = useLocation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  // Same pillar-aware profile link as SupremeCard — stay under the
  // current pillar route instead of always linking to /team/name.
  const profileUrl = `${location}/${member.slug ?? toSlug(member.name)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(profileUrl)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(profileUrl); }}
      className="flex flex-col items-center text-center p-7 rounded-2xl border cursor-pointer h-full"
      style={{
        background: "linear-gradient(160deg, rgba(6,55,36,0.42) 0%, rgba(2,20,13,0.68) 100%)",
        backdropFilter: "blur(14px)",
        borderColor: hovered ? GOLD : `${GOLD}35`,
        borderWidth: "1px",
        boxShadow: hovered
          ? "0 0 28px rgba(212,175,55,0.3), 0 10px 28px rgba(0,0,0,0.35)"
          : "inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 12px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="mb-5">
        <MemberAvatar src={member.photo} name={member.name} size={92} />
      </div>

      <h3 className="text-base font-bold text-white mb-1.5 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
      <p className="text-[11px] font-semibold mb-5 uppercase tracking-[0.12em]" style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}>{member.title}</p>

      <span className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
        View Profile
        <ChevronRight className="w-3 h-3" style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s" }} />
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   CATEGORY LANDING — 5 institutional pillars of "Our People"
   ══════════════════════════════════════════════════ */

type ScreenId = "home" | "executive" | "board" | "representatives" | "qoum" | "beneficiaries" | "global";
interface ViewState { screen: ScreenId; qoum?: string; }

const CATEGORY_META: Record<Exclude<ScreenId, "home" | "qoum">, {
  title: string; subtitle: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; count: string;
}> = {
  executive: {
    title: "Executive Team",
    subtitle: "The people who work with us day-to-day — leadership and staff running Orakzai.org's programs on the ground.",
    icon: Users,
    count: `${SUPREME_LEADERS.length + BOARD_MEMBERS.length} Members`,
  },
  board: {
    title: "Board & Advisors",
    subtitle: "Senior counsel — legal, economic, tribal, and security advisors who guide institutional strategy and governance.",
    icon: Shield,
    count: `${BOARD_ADVISORS.length} Advisors`,
  },
  representatives: {
    title: "Orakzai Representatives",
    subtitle: "One tribal council per qoum — 19 sub-tribes of the Orakzai nation, each with its own elected Malaks.",
    icon: Landmark,
    count: "19 Qoums",
  },
  beneficiaries: {
    title: "Beneficiary Members",
    subtitle: "Families and individuals directly supported through welfare, education, healthcare, and economic grants.",
    icon: HeartHandshake,
    count: `${BENEFICIARY_MEMBERS.length}+ Featured`,
  },
  global: {
    title: "Global Leadership",
    subtitle: "Orakzai representatives on the world stage — coordinating diaspora chapters across five continents.",
    icon: Globe,
    count: `${GLOBAL_LEADERSHIP.length} Regions`,
  },
};

function CategoryCard({
  id, index, onClick,
}: { id: Exclude<ScreenId, "home" | "qoum">; index: number; onClick: () => void }) {
  const meta = CATEGORY_META[id];
  const Icon = meta.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      className="group relative rounded-[22px] p-8 cursor-pointer overflow-hidden text-left h-full flex flex-col min-h-[336px]"
      style={{
        background: "linear-gradient(160deg, rgba(5,26,16,0.94) 0%, rgba(11,17,17,0.97) 55%, rgba(4,12,9,0.98) 100%)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(212,175,55,0.24)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 28px rgba(0,0,0,0.35)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.45s ease, box-shadow 0.45s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
        e.currentTarget.style.borderColor = GOLD;
        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(212,175,55,0.35), 0 32px 60px rgba(0,0,0,0.5), 0 0 48px rgba(212,175,55,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.24)";
        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 28px rgba(0,0,0,0.35)";
      }}
    >
      {/* top hairline accent — brightens on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
      />
      {/* ambient corner glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 pointer-events-none" style={{ background: GOLD }} />
      {/* institutional index mark */}
      <span
        className="absolute top-7 right-8 text-[11px] font-bold tracking-[0.2em] opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
      >
        {ordinal}
      </span>

      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        style={{
          background: "linear-gradient(155deg, rgba(212,175,55,0.16), rgba(212,175,55,0.04))",
          border: `1px solid ${GOLD}55`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <Icon className="w-7 h-7" style={{ color: GOLD }} />
      </div>

      <h3 className="text-2xl font-bold text-white mb-2.5 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{meta.title}</h3>
      <p className="text-sm text-emerald-100/55 leading-relaxed mb-7 flex-1">{meta.subtitle}</p>

      <div className="relative flex items-center justify-between pt-5 border-t" style={{ borderColor: "rgba(212,175,55,0.14)" }}>
        <span
          className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] px-3.5 py-[7px] rounded-full"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, #a9822f)`,
            color: "#0a1f14",
            boxShadow: "0 2px 10px rgba(212,175,55,0.35)",
          }}
        >
          {meta.count}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
          Explore
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </motion.div>
  );
}

function QoumCard({ qoum, index, onClick }: { qoum: string; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.03 * index, duration: 0.5 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      className="group flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300"
      style={{ background: "rgba(3,45,30,0.55)", border: `1px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = GOLD;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 0 24px rgba(212,175,55,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${GOLD}30`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}
      >
        <Landmark className="w-5 h-5" style={{ color: GOLD }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{qoum}</h4>
        <p className="text-[11px] text-emerald-100/45">4 Malaks Represented</p>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: GOLD }} />
    </motion.div>
  );
}

function BackBar({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
      style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${GOLD}40`, color: GOLD }}
    >
      <ChevronLeft className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
        style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}60`, color: GOLD }}>
        <ScrollText className="w-4 h-4" /> {eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
      <div className="h-[1px] w-24 mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <p className="text-white/60 max-w-2xl text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  );
}

const ALL_MEMBERS: TeamMember[] = [
  ...SUPREME_LEADERS, ...BOARD_MEMBERS, ...BOARD_ADVISORS,
  ...BENEFICIARY_MEMBERS, ...GLOBAL_LEADERSHIP, ...ALL_QOUM_MEMBERS,
];
const findMemberByName = (name?: string) => ALL_MEMBERS.find((m) => m.name === name);
const getDirectReports = (name: string) => ALL_MEMBERS.filter((m) => m.reportsTo === name);

/* ── Route map for the 5 institutional pillars — each pillar owns a clean,
   SEO-friendly, directly-linkable URL. "executive" is served at /team
   itself (its own hub); the other four each get a dedicated route. ── */
const PILLAR_ROUTES: Record<Exclude<ScreenId, "home" | "qoum">, string> = {
  executive: "/team",
  board: "/board-advisor",
  representatives: "/orakzai-representative",
  beneficiaries: "/beneficiary-member",
  global: "/global-leadership",
};

/* ── Per-pillar SEO metadata: exact document titles + descriptions per URL ── */
const PILLAR_SEO: Record<Exclude<ScreenId, "home" | "qoum">, { title: string; description: string }> = {
  executive: {
    title: "Executive Leadership Team | Orakzai",
    description: "Meet the Executive Team of Orakzai.org — Founder & Chairman Faisal Orakzai, Co-Founder Malak Speen Gul Orakzai (Former MNA), and the staff running Orakzai.org's programs on the ground.",
  },
  board: {
    title: "Board of Directors & Senior Advisory | Orakzai",
    description: "Senior counsel to Orakzai.org — legal, economic, tribal, and security advisors who guide institutional strategy and governance.",
  },
  representatives: {
    title: "Orakzai Tribal Representatives & Council | Orakzai",
    description: "One tribal council per qoum — 19 sub-tribes of the Orakzai nation, each with its own elected Malaks representing their households.",
  },
  beneficiaries: {
    title: "Beneficiary Members & Community Impact | Orakzai",
    description: "Families and individuals directly supported by Orakzai.org through welfare, education, healthcare, and economic grants.",
  },
  global: {
    title: "Global Leadership & Diaspora Network | Orakzai",
    description: "Orakzai representatives on the world stage — coordinating diaspora chapters across five continents.",
  },
};

export default function Team({
  initialScreen = "home",
}: {
  initialScreen?: ScreenId;
  /* present so this component structurally satisfies wouter's
     RouteComponentProps when used directly as a <Route component={Team} />
     for /team; unused otherwise. */
  params?: Record<string, string | undefined>;
} = {}) {
  const [, navigate] = useLocation();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [view, setView] = useState<ViewState>({ screen: initialScreen });

  // A dedicated pillar route (anything but /team) renders exactly one
  // screen — "back to all pillars" must leave this component and go to
  // the /team hub instead of resetting local state.
  const isDedicatedPillarRoute = initialScreen !== "home";

  // ── SEO: dynamic title + meta + JSON-LD per pillar/route ──
  useEffect(() => {
    const activeScreen = view.screen === "qoum" ? "representatives" : view.screen;
    const seo = activeScreen !== "home" ? PILLAR_SEO[activeScreen as Exclude<ScreenId, "home" | "qoum">] : null;

    document.title = seo ? seo.title : "Our People | Orakzai.org — Digital Embassy";

    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    const path = activeScreen !== "home" ? PILLAR_ROUTES[activeScreen as Exclude<ScreenId, "home" | "qoum">] : "/team";
    const description = seo ? seo.description : "Five institutional pillars of the people who build, guide, represent, and are uplifted by Orakzai.org.";

    setMeta("description", description);
    setMeta("keywords", "Faisal Orakzai, Malak Speen Gul Orakzai, Orakzai leadership, Orakzai team, Orakzai.org team, Orakzai chairman, Orakzai co-founder, MNA Hangu, Orakzai board, Maria Hussain Orakzai, Dr Asma Orakzai");
    setMeta("og:title", seo ? seo.title : "Our People | Orakzai.org", true);
    setMeta("og:description", description, true);
    setMeta("og:url", `https://sonoforakzai.vercel.app${path}`, true);
    setMeta("twitter:title", seo ? seo.title : "Our People | Orakzai.org");
    setMeta("twitter:description", description);

    // Structured data: BreadcrumbList + CollectionPage for the active pillar,
    // plus the founding Person schema on the /team (executive) route.
    const existing = document.getElementById("team-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "team-jsonld";
    script.type = "application/ld+json";

    const structuredData: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Our People", "item": "https://sonoforakzai.vercel.app/team" },
          { "@type": "ListItem", "position": 2, "name": seo ? seo.title.split(" | ")[0] : "Our People", "item": `https://sonoforakzai.vercel.app${path}` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": seo ? seo.title : "Our People | Orakzai.org",
        "description": description,
        "url": `https://sonoforakzai.vercel.app${path}`,
        "isPartOf": { "@type": "Organization", "name": "Orakzai.org" },
      },
    ];

    if (activeScreen === "executive") {
      structuredData.push(
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Faisal Orakzai",
          "jobTitle": "Founder & Chairman",
          "worksFor": { "@type": "Organization", "name": "Orakzai.org" },
          "description": "Faisal Orakzai is the Founder and Chairman of Orakzai.org, the digital embassy of the Orakzai nation. A visionary leader dedicated to uniting 50,000+ Orakzai families across 12 countries through education, healthcare, and digital empowerment.",
          "url": "https://sonoforakzai.vercel.app/team",
          "image": "https://sonoforakzai.vercel.app/faisal-orakzai.png",
          "sameAs": ["https://www.linkedin.com/in/faisalorakzaii"],
          "nationality": "Pakistani",
          "alumniOf": "Orakzai District, Khyber Pakhtunkhwa",
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Malak Speen Gul Orakzai",
          "jobTitle": "Co-Founder & Chairman of CSR",
          "worksFor": { "@type": "Organization", "name": "Orakzai.org" },
          "description": "Malak Speen Gul Orakzai is the Co-Founder of Orakzai.org and Former Member of the National Assembly (MNA) for Hangu. A distinguished statesman anchoring national governance frameworks and CSR strategy for the Orakzai nation.",
          "url": "https://sonoforakzai.vercel.app/team",
          "image": "https://sonoforakzai.vercel.app/malak-speen-gul.jpg",
          "nationality": "Pakistani",
          "alumniOf": "National Assembly of Pakistan",
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Dr. Asma Orakzai",
          "jobTitle": "Director of Health Services",
          "worksFor": { "@type": "Organization", "name": "Orakzai.org" },
          "description": "Dr. Asma Orakzai is a Women Health Leader and clinical architect at Orakzai.org, with clinical associations at Aga Khan University Hospital. She leads telemedicine networks and maternal health systems for the Orakzai region.",
          "url": "https://sonoforakzai.vercel.app/team",
          "nationality": "Pakistani",
        },
      );
    }

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.title = "Orakzai.org — Digital Embassy";
      document.getElementById("team-jsonld")?.remove();
    };
  }, [view.screen]);

  const openBio = (member: TeamMember) => {
    setSelectedMember(member);
    setSheetOpen(true);
  };

  // "All Pillars" always returns to the /team hub. On dedicated pillar
  // routes that means a real navigation; on /team itself it's just a
  // local state reset back to the card grid.
  const goHome = () => {
    if (isDedicatedPillarRoute) navigate("/team");
    else setView({ screen: "home" });
  };
  // Category cards on the /team hub: "Executive Team" stays on /team and
  // switches the local view; the other four pillars have their own route.
  const goCategory = (screen: Exclude<ScreenId, "home" | "qoum">) => {
    if (screen === "executive") setView({ screen });
    else navigate(PILLAR_ROUTES[screen]);
  };
  const goQoum = (qoum: string) => setView({ screen: "qoum", qoum });

  return (
    <MainLayout>
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #011a10 0%, #022c22 50%, #011a10 100%)" }}>
        {/* Hero Header — cinematic auto-cycling background */}
        <div className="relative min-h-[70vh] md:min-h-[78vh] flex items-center justify-center text-center overflow-hidden">
          <HeroCarousel />

          <div className="absolute inset-0 pointer-events-none z-[1]">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 px-4"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5" style={{ color: GOLD }} />
              <span className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Orakzai</span>
              <Shield className="w-5 h-5" style={{ color: GOLD }} />
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
            >
              Our People
            </h1>
            <div className="h-[1px] w-24 mx-auto mb-5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed">
              A living legacy of honour, heritage, and service — five institutional pillars of the people who build, guide, represent, and are uplifted by Orakzai.org.
            </p>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, #011a10)" }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 pb-24">
          <AnimatePresence mode="wait">
            {/* ═══ HOME: 5 category cards ═══ */}
            {view.screen === "home" && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <SectionHeading
                  eyebrow="Five Institutional Pillars"
                  title="Who Builds Orakzai.org"
                  description="Each pillar operates as its own institution — its own people, its own mandate, all accountable to one shared mission. Select a pillar to meet the people behind it."
                />
                <div className="flex flex-wrap justify-center gap-6 md:gap-7 max-w-6xl mx-auto">
                  {(["executive", "board", "representatives", "beneficiaries", "global"] as const).map((id, i) => (
                    <div key={id} className="w-full md:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)]">
                      <CategoryCard id={id} index={i} onClick={() => goCategory(id)} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ EXECUTIVE TEAM ═══ */}
            {view.screen === "executive" && (
              <motion.div key="executive" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BackBar label="All Pillars" onBack={goHome} />
                <SectionHeading eyebrow="Executive Team" title="The People Who Run Orakzai.org" description={CATEGORY_META.executive.subtitle} />

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

                <div>
                  <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                      style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}60`, color: GOLD }}>
                      <Star className="w-4 h-4" /> Department Heads
                    </div>
                    <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BOARD_MEMBERS.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} onOpenBio={openBio} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ BOARD & ADVISORS ═══ */}
            {view.screen === "board" && (
              <motion.div key="board" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BackBar label="All Pillars" onBack={goHome} />
                <SectionHeading eyebrow="Board & Advisors" title="Senior Counsel & Governance" description={CATEGORY_META.board.subtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BOARD_ADVISORS.map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} onOpenBio={openBio} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ ORAKZAI REPRESENTATIVES — 19 Qoums ═══ */}
            {view.screen === "representatives" && (
              <motion.div key="representatives" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BackBar label="All Pillars" onBack={goHome} />
                <SectionHeading eyebrow="Orakzai Representatives" title="The 19 Qoums of Orakzai" description={CATEGORY_META.representatives.subtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                  {QOUMS.map((qoum, i) => (
                    <QoumCard key={qoum} qoum={qoum} index={i} onClick={() => goQoum(qoum)} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ SINGLE QOUM — its Malaks ═══ */}
            {view.screen === "qoum" && view.qoum && (
              <motion.div key={`qoum-${view.qoum}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BackBar label="All 19 Qoums" onBack={() => goCategory("representatives")} />
                <SectionHeading
                  eyebrow={`${view.qoum} Qoum`}
                  title={`Malaks of ${view.qoum}`}
                  description={`The tribal council representing the ${view.qoum} qoum within Orakzai.org — the direct link between this qoum's households and the Executive Team.`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {QOUM_MALIKS[view.qoum].map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} onOpenBio={openBio} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ BENEFICIARY MEMBERS ═══ */}
            {view.screen === "beneficiaries" && (
              <motion.div key="beneficiaries" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BackBar label="All Pillars" onBack={goHome} />
                <SectionHeading eyebrow="Beneficiary Members" title="Families We Uplift" description={CATEGORY_META.beneficiaries.subtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BENEFICIARY_MEMBERS.map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} onOpenBio={openBio} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ GLOBAL LEADERSHIP ═══ */}
            {view.screen === "global" && (
              <motion.div key="global" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <BackBar label="All Pillars" onBack={goHome} />
                <SectionHeading eyebrow="Global Leadership" title="Orakzai on the World Stage" description={CATEGORY_META.global.subtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {GLOBAL_LEADERSHIP.map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} onOpenBio={openBio} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── FULL PROFILE PANEL ─── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto p-0 border-l"
          style={{ borderColor: "rgba(212,175,55,0.3)", background: "#061209" }}
        >
          {selectedMember && (() => {
            const directs = getDirectReports(selectedMember.name);
            const superior = findMemberByName(selectedMember.reportsTo);
            const contactHref =
              selectedMember.website ||
              (selectedMember.linkedin && selectedMember.linkedin !== "#" ? selectedMember.linkedin : undefined) ||
              "/contact";

            /* ══ GLOBAL INSTITUTIONAL LAYOUT — for supreme/chairman profiles ══ */
            if (selectedMember.isSupreme) {
              return (
                <>
                  <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

                  {/* 1. EXECUTIVE PORTRAIT — full-width, cinematic */}
                  <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
                    <img
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 15%" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedMember.name)}&backgroundColor=064e3b&textColor=D4AF37`;
                      }}
                    />
                    {/* Portrait overlay gradient */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,18,9,0.1) 0%, rgba(6,18,9,0.0) 40%, rgba(6,18,9,0.85) 100%)" }} />
                    {/* Crown badge */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
                      style={{ background: `linear-gradient(135deg, #F5E07E, ${GOLD}, #B8962E)`, color: "#022c22" }}
                    >
                      <Crown className="w-3.5 h-3.5" />
                      {selectedMember.supremeTitle}
                    </div>
                    <div
                      className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: "rgba(6,18,9,0.75)", border: `1px solid ${GOLD}40`, color: GOLD, backdropFilter: "blur(8px)" }}
                    >
                      <BadgeCheck className="w-3 h-3" /> Verified Leadership
                    </div>
                  </div>

                  <SheetHeader className="px-7 pt-6 pb-0 text-left">
                    {/* 2. NAME & POSITION */}
                    <SheetTitle className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {selectedMember.name}
                    </SheetTitle>
                    <p className="text-sm font-bold mt-1 uppercase tracking-[0.16em]" style={{ color: GOLD }}>{selectedMember.title}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs text-emerald-100/50">
                        <MapPin className="w-3 h-3" /> {selectedMember.location}
                      </span>
                      <span className="text-emerald-100/25">·</span>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-100/50">
                        <Star className="w-3 h-3" /> {selectedMember.focus}
                      </span>
                    </div>

                    {/* Contact & Social Links */}
                    <div className="flex items-center gap-2.5 mt-5 flex-wrap">
                      <a
                        href={contactHref}
                        target={contactHref.startsWith("http") ? "_blank" : undefined}
                        rel={contactHref.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                        style={{ background: GOLD, color: "#022c22" }}
                      >
                        <Mail className="w-3.5 h-3.5" /> Contact
                      </a>
                      {selectedMember.linkedin && selectedMember.linkedin !== "#" && (
                        <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                          className="p-2.5 rounded-full transition-all hover:scale-110"
                          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                          <Linkedin className="w-4 h-4" style={{ color: GOLD }} />
                        </a>
                      )}
                      {selectedMember.twitter && selectedMember.twitter !== "#" && (
                        <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                          className="p-2.5 rounded-full transition-all hover:scale-110"
                          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                          <Twitter className="w-4 h-4" style={{ color: GOLD }} />
                        </a>
                      )}
                      {selectedMember.website && (
                        <a href={selectedMember.website} target="_blank" rel="noopener noreferrer" aria-label="Website"
                          className="p-2.5 rounded-full transition-all hover:scale-110"
                          style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                          <Globe className="w-4 h-4" style={{ color: GOLD }} />
                        </a>
                      )}
                    </div>
                  </SheetHeader>

                  <div className="px-7 pt-6 pb-12 space-y-8">
                    <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)` }} />


                    {/* 3. TEAM (direct reports) — shown at top */}
                    {directs.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>
                          Team ({directs.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {directs.map((d) => (
                            <button
                              key={d.id}
                              onClick={() => openBio(d)}
                              className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full transition-all hover:scale-105"
                              style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${GOLD}30` }}
                            >
                              <img src={d.photo} alt={d.name} className="w-7 h-7 rounded-full object-cover"
                                style={{ objectPosition: "top center" }} />
                              <span className="text-xs text-white/80">{d.name.split(" ")[0]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. MISSION STATEMENT / QUOTE */}
                    {selectedMember.mission && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{ color: GOLD }}>Mission Statement</p>
                        <div className="relative pl-5 py-1">
                          <div className="absolute left-0 top-0 h-full w-[3px] rounded-full" style={{ background: `linear-gradient(to bottom, ${GOLD}, rgba(212,175,55,0.2))` }} />
                          <p className="text-white/85 text-base leading-relaxed italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                            &ldquo;{selectedMember.mission}&rdquo;
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 4. BIOGRAPHY */}
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{ color: GOLD }}>Biography</p>
                      <p className="text-emerald-100/75 leading-relaxed text-sm">{selectedMember.bio}</p>
                    </div>

                    {/* 5. LEADERSHIP PRINCIPLES */}
                    {selectedMember.leadershipPrinciples && selectedMember.leadershipPrinciples.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Leadership Principles</p>
                        <div className="space-y-3">
                          {selectedMember.leadershipPrinciples.map((principle, i) => (
                            <div
                              key={i}
                              className="flex gap-4 p-4 rounded-xl"
                              style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                            >
                              <div
                                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                                style={{ background: `linear-gradient(135deg, #F5E07E, ${GOLD})`, color: "#022c22" }}
                              >
                                {i + 1}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white mb-1">{principle.title}</p>
                                <p className="text-xs text-emerald-100/55 leading-relaxed">{principle.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 6. STRATEGIC FOCUS AREAS */}
                    {selectedMember.strategicFocusAreas && selectedMember.strategicFocusAreas.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Strategic Focus Areas</p>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedMember.strategicFocusAreas.map((area, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-xl"
                              style={{ background: "linear-gradient(135deg, rgba(4,26,16,0.8), rgba(2,14,9,0.9))", border: "1px solid rgba(212,175,55,0.18)" }}
                            >
                              <div className="flex items-start gap-2 mb-1.5">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: GOLD }} />
                                <p className="text-sm font-bold text-white">{area.title}</p>
                              </div>
                              <p className="text-xs text-emerald-100/55 leading-relaxed pl-3.5">{area.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 7. CURRENT INITIATIVES */}
                    {selectedMember.currentInitiatives && selectedMember.currentInitiatives.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Current Initiatives</p>
                        <div className="space-y-3">
                          {selectedMember.currentInitiatives.map((initiative, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-xl"
                              style={{ background: "rgba(3,35,22,0.7)", border: "1px solid rgba(212,175,55,0.14)" }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-bold text-white">{initiative.title}</p>
                                <span
                                  className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                                  style={{
                                    background: initiative.status === "Active"
                                      ? "rgba(16,185,129,0.15)"
                                      : initiative.status === "Completed"
                                      ? "rgba(212,175,55,0.12)"
                                      : "rgba(59,130,246,0.15)",
                                    color: initiative.status === "Active"
                                      ? "#10b981"
                                      : initiative.status === "Completed"
                                      ? GOLD
                                      : "#60a5fa",
                                    border: `1px solid ${initiative.status === "Active" ? "rgba(16,185,129,0.3)" : initiative.status === "Completed" ? "rgba(212,175,55,0.3)" : "rgba(59,130,246,0.3)"}`,
                                  }}
                                >
                                  {initiative.status}
                                </span>
                              </div>
                              <p className="text-xs text-emerald-100/55 leading-relaxed">{initiative.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 9. CONTACT & SOCIAL LINKS (footer) */}
                    <div
                      className="p-5 rounded-2xl"
                      style={{ background: "linear-gradient(135deg, rgba(6,55,36,0.5), rgba(2,20,13,0.8))", border: `1px solid ${GOLD}30` }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{ color: GOLD }}>Contact & Social Links</p>
                      <div className="flex flex-col gap-3">
                        {selectedMember.website && (
                          <a href={selectedMember.website} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                              <Globe className="w-4 h-4" style={{ color: GOLD }} />
                            </div>
                            <span className="group-hover:underline">{selectedMember.website.replace("https://", "")}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-40 group-hover:opacity-100" style={{ color: GOLD }} />
                          </a>
                        )}
                        {selectedMember.linkedin && selectedMember.linkedin !== "#" && (
                          <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                              <Linkedin className="w-4 h-4" style={{ color: GOLD }} />
                            </div>
                            <span className="group-hover:underline">linkedin.com/in/faisalorakzaii</span>
                            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-40 group-hover:opacity-100" style={{ color: GOLD }} />
                          </a>
                        )}
                        {selectedMember.twitter && selectedMember.twitter !== "#" && (
                          <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                              <Twitter className="w-4 h-4" style={{ color: GOLD }} />
                            </div>
                            <span className="group-hover:underline">x.com/faisalorakzaii</span>
                            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-40 group-hover:opacity-100" style={{ color: GOLD }} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            }

            /* ══ STANDARD ORG-CHART LAYOUT — for all other team members ══ */
            return (
              <>
                <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
                <SheetHeader className="px-8 pt-8 pb-0 text-left">
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-24 h-24 rounded-full overflow-hidden"
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
                    <div className="pt-1">
                      <SheetTitle className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {selectedMember.name}
                      </SheetTitle>
                      <p className="text-sm font-semibold mt-1" style={{ color: GOLD }}>
                        {selectedMember.title}
                      </p>
                      <p className="text-xs text-emerald-100/40 mt-1">{selectedMember.focus}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mt-5 flex-wrap">
                    <a
                      href={contactHref}
                      target={contactHref.startsWith("http") ? "_blank" : undefined}
                      rel={contactHref.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                      style={{ background: GOLD, color: "#022c22" }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Contact
                    </a>
                    {selectedMember.linkedin && selectedMember.linkedin !== "#" && (
                      <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="p-2.5 rounded-full transition-all hover:scale-110"
                        style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                        <Linkedin className="w-4 h-4" style={{ color: GOLD }} />
                      </a>
                    )}
                    {selectedMember.twitter && selectedMember.twitter !== "#" && (
                      <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                        className="p-2.5 rounded-full transition-all hover:scale-110"
                        style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                        <Twitter className="w-4 h-4" style={{ color: GOLD }} />
                      </a>
                    )}
                    {selectedMember.website && (
                      <a href={selectedMember.website} target="_blank" rel="noopener noreferrer" aria-label="Website"
                        className="p-2.5 rounded-full transition-all hover:scale-110"
                        style={{ background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD}40` }}>
                        <Globe className="w-4 h-4" style={{ color: GOLD }} />
                      </a>
                    )}
                  </div>
                </SheetHeader>

                <div className="px-8 pt-6 pb-10">
                  <div className="grid grid-cols-2 gap-4 py-5 border-y" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-emerald-100/40 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Location
                      </p>
                      <p className="text-sm text-white/85">{selectedMember.location || "Orakzai District, Pakistan"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-emerald-100/40 mb-1.5 flex items-center gap-1.5">
                        <Star className="w-3 h-3" /> Focus Area
                      </p>
                      <p className="text-sm text-white/85">{selectedMember.focus}</p>
                    </div>
                  </div>

                  {superior && (
                    <button
                      onClick={() => openBio(superior)}
                      className="w-full flex items-center gap-3 mt-5 p-3 rounded-xl transition-all hover:scale-[1.02] text-left"
                      style={{ background: "rgba(212,175,55,0.06)", border: `1px solid ${GOLD}25` }}
                    >
                      <img src={superior.photo} alt={superior.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        style={{ objectPosition: "top center", border: `1.5px solid ${GOLD}80` }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-emerald-100/40">Reports to</p>
                        <p className="text-sm font-semibold text-white truncate">{superior.name}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                    </button>
                  )}

                  {directs.length > 0 && (
                    <div className="mt-5">
                      <p className="text-[11px] uppercase tracking-widest text-emerald-100/40 mb-2.5 flex items-center gap-1.5">
                        <Users className="w-3 h-3" /> Team ({directs.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {directs.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => openBio(d)}
                            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full transition-all hover:scale-105"
                            style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${GOLD}30` }}
                          >
                            <img src={d.photo} alt={d.name} className="w-6 h-6 rounded-full object-cover"
                              style={{ objectPosition: "top center" }} />
                            <span className="text-xs text-white/80">{d.name.split(" ")[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="h-px w-full my-6" style={{ background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)` }} />

                  {selectedMember.mission && (
                    <div className="mb-6 relative pl-5">
                      <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: GOLD }} />
                      <p className="text-emerald-100/80 text-sm leading-relaxed italic">
                        &ldquo;{selectedMember.mission}&rdquo;
                      </p>
                    </div>
                  )}
                  <p className="text-emerald-100/70 leading-relaxed text-sm whitespace-pre-line">{selectedMember.bio}</p>
                </div>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
