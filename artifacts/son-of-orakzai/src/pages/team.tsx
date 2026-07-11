import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Linkedin, Twitter, Crown, Shield, Star, ChevronRight, ChevronLeft, Globe, BadgeCheck,
  MapPin, Mail, Users, ArrowUpRight, HeartHandshake, Landmark, ScrollText,
  Quote, Target, Lightbulb, Zap, BookOpen, Building2, Activity,
  Award, Compass, CheckCircle2, Clock, AlertCircle, Layers,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F5E07E";
const GOLD_DARK = "#9A7520";
const DEEP = "#010f0a";
const MID = "#011a10";
const CARD_BG = "rgba(4, 22, 14, 0.82)";

/* ─────────────────────────────────────────────
   DATA INTERFACES & CONSTANTS
───────────────────────────────────────────── */
interface TeamMember {
  id: number;
  name: string;
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

const SUPREME_LEADERS: TeamMember[] = [
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
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan",
  },
];

const BOARD_MEMBERS: TeamMember[] = [
  {
    id: 3, name: "Maria Hussain", title: "Education Head",
    focus: "Digital Skill Lab & Women Empowerment",
    intro: "Driving educational initiatives and digital literacy programs that empower women across the Orakzai region.",
    photo: "/team/maria-hussain.jpg", linkedin: "#", twitter: "#",
    bio: "Maria Hussain is a distinguished education policy specialist, digital transformation advocate, and social impact leader. She holds a Master's degree in Education Policy from Quaid-i-Azam University, Islamabad, and is a UN APCICT Certified Trainer. Operating actively between Islamabad and Khyber Pakhtunkhwa, she has dedicated over a decade to driving educational equity, digital literacy, and women's empowerment across underserved regions, with a profound focus on the Orakzai District.\n\nKey Achievements & Career Track Record\n\nEducational Infrastructure: As the Education Head at Suno F Orakzai, she spearheads grassroots academic initiatives. Under her leadership, the organization established five localized learning centers in Orakzai to bridge infrastructure gaps.\n\nScholarship Design: She conceptualized and executed a flagship scholarship program that has successfully funded and transformed the academic journeys of over 500 students in the district.\n\nAcademic Development: She directly oversees core educational operations, including modern curriculum development, teacher training workshops, and distance learning partnerships with national universities.\n\nDigital & Women Empowerment: Serving as the Director of Operations at Infotex and Program Coordinator for WiFi DX (Women ICT Frontier Initiative), she trains women in critical ICT and digital skills, enabling them to transition into the modern digital economy.\n\nVision and Philosophy for Orakzai\n\nMaria's core operational philosophy is simple yet transformative: \"An educated Orakzai is an empowered Orakzai.\"\n\nHer vision is to move past traditional schooling and equip the youth and women of Orakzai with practical digital literacy. By introducing computer training, online skill labs, and remote learning programs, she aims to break geographical barriers. Her ultimate goal is to connect the remote talent of Orakzai directly to mainstream national and international socioeconomic opportunities.",
    location: "Islamabad Capital Territory, Islamabad, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 4, name: "Dr. Asma Orakzai", title: "Director of Health Services",
    focus: "Sehat-e-Orakzai & Telemedicine",
    intro: "Leading telemedicine and health outreach programs to bring quality healthcare to every corner of Orakzai district.",
    photo: "/team/dr-asma-orakzai.jpg", linkedin: "#", twitter: "#",
    bio: "Dr. Asma Orakzai is a qualified physician with specialized training in community health and preventive medicine. She leads the organization's medical outreach programs, including quarterly free medical camps that have served over 10,000 patients across remote Orakzai villages. Dr. Asma has built a network of volunteer doctors, nurses, and paramedics committed to bringing quality healthcare to underserved communities. She also spearheads maternal health and child welfare initiatives, significantly reducing health disparities in the district. Her compassion, clinical expertise, and administrative acumen make her an indispensable pillar of the organization.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 5, name: "Kashif Orakzai", title: "Operations & Logistics Head",
    focus: "Orakzai Transport Corp & Field Work",
    intro: "Overseeing ground operations and logistics to ensure efficient delivery of services across the district.",
    photo: "/team/kashif-orakzai.png", linkedin: "#", twitter: "#",
    bio: "Kashif Orakzai is the operational backbone of Orakzai, ensuring that every project is delivered with precision and efficiency. With a background in supply chain management and project coordination, he has streamlined the organization's field operations across multiple districts. From coordinating relief deliveries in disaster zones to managing the logistics of large-scale community events, Kashif's meticulous planning ensures nothing falls through the cracks. He has developed the organization's standard operating procedures and volunteer management systems, enabling it to scale its impact while maintaining accountability at every level.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 6, name: "Ghazi Mansoor Orakzai", title: "Community Engagement Lead",
    focus: "Jirga-e-Naujawan & Youth Affairs",
    intro: "Connecting youth with traditional Jirga values while fostering modern community leadership across Orakzai.",
    photo: "/team/ghazi-mansoor.png", linkedin: "#", twitter: "#",
    bio: "Ghazi Mansoor Orakzai is the bridge between Orakzai's leadership and the grassroots communities it serves. With exceptional interpersonal skills and deep-rooted community trust, he facilitates dialogue between tribal elders, youth groups, and organizational leadership. He oversees the organization's outreach programs, community forums, and the Jirga engagement initiatives. Ghazi's talent for building consensus across diverse groups has been instrumental in resolving community disputes and rallying collective action around shared goals.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 7, name: "Zubair Orakzai", title: "IT & Blockchain Strategist",
    focus: "Digital Homeland & Tech Infrastructure",
    intro: "Architecting the digital backbone of Orakzai, building blockchain-powered transparency systems.",
    photo: "/team/zubair-orakzai.jpg", linkedin: "#", twitter: "#",
    bio: "Zubair Orakzai is a technology entrepreneur and blockchain specialist who brings cutting-edge digital solutions to the Orakzai community's development agenda. Educated at NUST and internationally certified in blockchain applications, he is building transparent fund-tracking systems and digital identity solutions for community members. Zubair also leads the Digital Skill Lab initiative, which provides free coding, freelancing, and tech entrepreneurship training to Orakzai youth.",
    location: "Islamabad, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 8, name: "Haqnawaz Orakzai", title: "Welfare & Relief Coordinator",
    focus: "Imdad-e-Bahan & Social Safety Net",
    intro: "Coordinating relief efforts and welfare programs to support the most vulnerable families in Orakzai.",
    photo: "/team/haqnawaz-orakzai.png", linkedin: "#", twitter: "#",
    bio: "Haqnawaz Orakzai leads the organization's welfare and humanitarian relief operations with tireless dedication and compassion. He has coordinated emergency relief efforts during floods, droughts, and displacement crises affecting Orakzai communities, distributing food packages, tents, and medical supplies to thousands of families. Beyond emergency response, he manages ongoing welfare programs including widow support, orphan care, and financial assistance for families in need.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 9, name: "Abdul Razzaq Orakzai", title: "Strategic Planning Officer",
    focus: "Global Partnerships & NGO Relations",
    intro: "Building strategic alliances with international NGOs and government bodies to amplify Orakzai's voice globally.",
    photo: "/team/abdul-razzaq.jpg", linkedin: "#", twitter: "#",
    bio: "Abdul Razzaq Orakzai is the strategic mind behind Orakzai's long-term development roadmap. With an MBA and extensive experience in public sector planning, he develops five-year strategic plans, tracks organizational KPIs, and ensures alignment between field activities and institutional goals. He has successfully authored proposals that secured partnerships with national NGOs and international development organizations.",
    location: "Islamabad, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 10, name: "Sher Wali Orakzai", title: "Talent & Sports Director",
    focus: "Talent Hunt & Youth Development",
    intro: "Identifying and nurturing sporting talent and creative skills among Orakzai youth for national recognition.",
    photo: "/team/sher-wali.png", linkedin: "#", twitter: "#",
    bio: "Sher Wali Orakzai champions the immense untapped potential of Orakzai youth through sports, arts, and talent development programs. A former regional-level athlete himself, he established the organization's Sports Academy which has produced national-level competitors in cricket, football, and martial arts. Beyond athletics, Sher Wali runs talent discovery programs that have identified and supported young artists, musicians, and performers from the district.",
    location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan", reportsTo: "Faisal Orakzai",
  },
  {
    id: 11, name: "Muhammad Hayat", title: "Finance & Transparency Head",
    focus: "Audit & Annual Reports",
    intro: "Ensuring financial integrity and full transparency in all community funds through rigorous audit practices.",
    photo: "/team/muhammad-hayat.jpg", linkedin: "#", twitter: "#",
    bio: "Muhammad Hayat is the guardian of Orakzai's financial integrity. A chartered accountant with extensive experience in nonprofit finance, he oversees all financial planning, budgeting, auditing, and reporting processes. Under his stewardship, the organization has achieved full financial transparency — publishing detailed annual reports and implementing blockchain-verified fund tracking for donor contributions.",
    location: "Peshawar, Pakistan", reportsTo: "Faisal Orakzai",
  },
];

const BOARD_ADVISORS: TeamMember[] = [
  { id: 101, name: "Barrister Naeem Orakzai", title: "Senior Advisor — Legal Affairs", focus: "Constitutional Rights & Litigation Support", intro: "Providing pro-bono legal counsel and constitutional advocacy for Orakzai land, tribal, and civil rights cases.", photo: "/team/advisor-naeem.jpg", linkedin: "#", twitter: "#", bio: "Barrister Naeem Orakzai brings three decades of constitutional and civil law experience to the organization's Advisory Board. A Lincoln's Inn-called barrister, he has represented Orakzai tribal interests before the Peshawar High Court and the Supreme Court of Pakistan on matters of land rights, tribal representation, and post-FATA merger reforms. He guides the organization's legal strategy pro-bono and mentors the in-house legal advocacy team.", location: "Peshawar, Pakistan" },
  { id: 102, name: "Dr. Farah Karim", title: "Advisor — Economic Policy", focus: "Micro-Finance & Rural Development Economics", intro: "Shaping the organization's economic empowerment strategy with two decades of development-economics research.", photo: "/team/advisor-farah.jpg", linkedin: "#", twitter: "#", bio: "Dr. Farah Karim is a development economist who has advised the World Bank and Pakistan's Ministry of Planning on rural micro-finance policy. She sits on Orakzai's Advisory Board to shape the interest-free grant program and micro-enterprise incubation strategy, ensuring every rupee lent creates measurable, sustainable household income.", location: "Islamabad, Pakistan" },
  { id: 103, name: "Malak Ihsanullah Orakzai", title: "Advisor — Tribal & Jirga Affairs", focus: "Inter-Tribal Mediation & Customary Law", intro: "A respected elder-statesman bridging traditional Jirga governance with the organization's modern institutional structure.", photo: "/team/advisor-ihsanullah.jpg", linkedin: "#", twitter: "#", bio: "Malak Ihsanullah Orakzai has spent over forty years mediating inter-tribal disputes across the Orakzai qoums under customary Pashtunwali law. As a senior advisor, he ensures the organization's representative structure remains faithful to traditional Jirga consensus while modernizing its accountability and reach.", location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan" },
  { id: 104, name: "Ayesha Bibi Orakzai", title: "Advisor — Women & Youth Affairs", focus: "Gender Inclusion & Youth Policy", intro: "Championing women's participation in governance and youth-inclusive policy design across Orakzai institutions.", photo: "/team/advisor-ayesha.jpg", linkedin: "#", twitter: "#", bio: "Ayesha Bibi Orakzai is a policy consultant specializing in gender-inclusive rural development. She advises the organization on ensuring women and youth have a formal, permanent voice within its representative and beneficiary programs, and co-designed the Digital Skill Lab's women's cohort.", location: "Karachi, Pakistan" },
  { id: 105, name: "Colonel (R) Yousaf Orakzai", title: "Advisor — Security & Disaster Response", focus: "Emergency Preparedness & Logistics", intro: "Guiding the organization's disaster-response protocols with a career built on frontier security and crisis logistics.", photo: "/team/advisor-yousaf.jpg", linkedin: "#", twitter: "#", bio: "Colonel (Retired) Yousaf Orakzai served over 25 years in frontier security operations before joining the Advisory Board to design the organization's rapid emergency-response framework — covering flood relief, displacement logistics, and coordination with civil administration during crises.", location: "Rawalpindi, Pakistan" },
];

const BENEFICIARY_MEMBERS: TeamMember[] = [
  { id: 201, name: "Bibi Shireen Family", title: "Widow Support Program", focus: "Monthly Stipend & Children's Education", intro: "A widow of five supported with a monthly stipend and full school sponsorship for her children since 2023.", photo: "/team/beneficiary-1.jpg", bio: "The Bibi Shireen family from Ismailzai qoum lost their sole earner in 2022. Since enrolling in the Widow Support Program, all four school-age children now attend Orakzai-funded learning centers, and the family receives a monthly welfare stipend along with subsidized healthcare access.", location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan" },
  { id: 202, name: "Rehmat Gul", title: "Interest-Free Business Grant Recipient", focus: "Small Retail Enterprise Grant", intro: "Received an interest-free grant to launch a general store, now employing two other community members.", photo: "/team/beneficiary-2.jpg", bio: "Rehmat Gul, a father of six from the Daulatzai qoum, received an interest-free micro-grant of PKR 150,000 through the Economic Innovation program. He used it to open a general store in his village, which now employs two additional local youth and supplies essential goods to over 40 nearby households.", location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan" },
  { id: 203, name: "Zainab Scholarship Cohort", title: "Global Scholarship Beneficiaries", focus: "University Tuition & Mentorship", intro: "A cohort of 12 young women receiving full university scholarships and mentorship under the Education pillar.", photo: "/team/beneficiary-3.jpg", bio: "Named after the program's first graduate, the Zainab Cohort supports 12 young women from across the Orakzai qoums with full university tuition, hostel stipends, and one-on-one mentorship from professional women in the diaspora network.", location: "Peshawar, Pakistan" },
  { id: 204, name: "Sturi Khel Flood-Relief Households", title: "Emergency Relief Beneficiaries", focus: "Shelter, Food & Medical Aid", intro: "38 households provided emergency shelter, food rations, and medical care after seasonal flooding.", photo: "/team/beneficiary-4.jpg", bio: "Following seasonal flash floods, the Social Welfare & Crisis Relief pillar provided emergency tents, food rations, and mobile medical care to 38 households in the Sturi Khel qoum area. Follow-on support included home-repair grants and school-supply replacement for affected children.", location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan" },
  { id: 205, name: "Haji Dilbar Household", title: "Healthcare Access Beneficiary", focus: "Mobile Clinic & Chronic Care", intro: "An elderly beneficiary receiving ongoing chronic-care treatment through the mobile health unit program.", photo: "/team/beneficiary-5.jpg", bio: "Haji Dilbar, an elder of the Mishti qoum living with diabetes, receives regular checkups and medication through Orakzai's mobile health unit, which visits his village monthly.", location: "Orakzai District, Khyber Pakhtunkhwa, Pakistan" },
];

const GLOBAL_LEADERSHIP: TeamMember[] = [
  { id: 301, name: "Imran Wazir Orakzai", title: "Regional Head — United Kingdom", focus: "UK Diaspora Chapter & Advocacy", intro: "Leading the UK chapter, connecting British-Orakzai professionals and coordinating cross-border fundraising.", photo: "/team/global-uk.jpg", linkedin: "#", twitter: "#", bio: "Imran Wazir Orakzai heads the United Kingdom chapter of the Global Diaspora Network, based in London. He organizes the annual Orakzai UK Gala, coordinates remittance-based fundraising for education projects, and represents the community at British-Pakistani civic forums.", location: "London, United Kingdom" },
  { id: 302, name: "Sana Orakzai", title: "Regional Head — North America", focus: "USA & Canada Chapter Coordination", intro: "Coordinating the North American diaspora chapter and its scholarship-matching donor program.", photo: "/team/global-usa.jpg", linkedin: "#", twitter: "#", bio: "Sana Orakzai leads the North American chapter spanning the United States and Canada. A software engineer by profession, she built the organization's donor-matching platform for the Global Scholarship program and hosts quarterly virtual town halls.", location: "Houston, United States" },
  { id: 303, name: "Adnan Khattak Orakzai", title: "Regional Head — Gulf States", focus: "UAE, Saudi Arabia & Qatar Chapter", intro: "Mobilizing the large Gulf-based Orakzai workforce for structured remittance and welfare contributions.", photo: "/team/global-gulf.jpg", linkedin: "#", twitter: "#", bio: "Adnan Khattak Orakzai coordinates the Gulf chapter across the UAE, Saudi Arabia, and Qatar — home to one of the largest concentrations of Orakzai expatriate workers. He has formalized a structured monthly-giving program that now funds a significant share of the Social Welfare & Crisis Relief budget.", location: "Dubai, United Arab Emirates" },
  { id: 304, name: "Laila Farooq Orakzai", title: "Regional Head — Europe", focus: "Germany, France & Benelux Chapter", intro: "Building institutional partnerships with European NGOs and coordinating the continental European chapter.", photo: "/team/global-europe.jpg", linkedin: "#", twitter: "#", bio: "Laila Farooq Orakzai represents the organization across continental Europe, with chapter members in Germany, France, and the Benelux countries. She has secured co-funding partnerships with two European development NGOs.", location: "Frankfurt, Germany" },
  { id: 305, name: "Waqas Mehsud Orakzai", title: "Global Ambassador — International Relations", focus: "Multilateral Institutions & Policy Outreach", intro: "Representing Orakzai's interests before multilateral institutions and international development forums.", photo: "/team/global-ambassador.jpg", linkedin: "#", twitter: "#", bio: "Waqas Mehsud Orakzai serves as the organization's Global Ambassador, engaging with multilateral development institutions and diaspora-policy forums to advocate for Orakzai's inclusion in national and international development planning.", location: "Geneva, Switzerland" },
];

const QOUMS: string[] = [
  "Ismailzai","Lashkarzai","Massuzai","Alisherzai","Daulatzai",
  "Muhammad Khel","Abdul Aziz Khel","Zemasht","Sturi Khel","Lashmanai",
  "Mishti","Sheikhan","Ali Khel","Mula Khel","Feroz Khel",
  "Bar Muhammad Khel","Khwaja Khel","Rabia Khel","Hamsaya",
];
const MALIK_FIRST_NAMES = ["Zar Wali","Nasrullah","Rahim Dad","Sardar Wali","Gul Zamin","Sher Afzal","Amanat Shah","Dilawar Khan","Fazal Karim","Haji Sultan"];
const MALIK_VILLAGES = ["Kalaya","Ghiljo","Mishti Kandao","Zeran","Mastura Valley","Lower Orakzai","Upper Orakzai","Feroz Khel Banda","Ismail Kandao","Sturi Khel Valley"];

function buildQoumMaliks(qoum: string, qoumIndex: number): TeamMember[] {
  const roles = ["Spin Malak (Chief Elder)","Malak — Jirga Representative","Malak — Youth Liaison","Malak — Welfare Coordinator"];
  return roles.map((role, i) => {
    const nameIdx = (qoumIndex * 4 + i) % MALIK_FIRST_NAMES.length;
    const villageIdx = (qoumIndex + i) % MALIK_VILLAGES.length;
    const fullName = `Malak ${MALIK_FIRST_NAMES[nameIdx]} ${qoum}`;
    return {
      id: 1000 + qoumIndex * 10 + i, name: fullName, title: role,
      focus: `${qoum} Qoum Representation`,
      intro: `Represents the ${qoum} qoum within Orakzai.org's tribal council, based in ${MALIK_VILLAGES[villageIdx]}.`,
      photo: "/team/malik-placeholder.jpg",
      bio: `${fullName} serves as ${role.toLowerCase()} for the ${qoum} qoum, based in ${MALIK_VILLAGES[villageIdx]}, Orakzai District. He represents the qoum's households in the organization's tribal council, relaying community needs directly to the Executive Team.`,
      location: `${MALIK_VILLAGES[villageIdx]}, Orakzai District, Khyber Pakhtunkhwa, Pakistan`,
    };
  });
}
const QOUM_MALIKS: Record<string, TeamMember[]> = Object.fromEntries(QOUMS.map((q, i) => [q, buildQoumMaliks(q, i)]));
const ALL_QOUM_MEMBERS: TeamMember[] = Object.values(QOUM_MALIKS).flat();
const ALL_MEMBERS: TeamMember[] = [...SUPREME_LEADERS,...BOARD_MEMBERS,...BOARD_ADVISORS,...BENEFICIARY_MEMBERS,...GLOBAL_LEADERSHIP,...ALL_QOUM_MEMBERS];
const findMemberByName = (name?: string) => ALL_MEMBERS.find((m) => m.name === name);
const getDirectReports = (name: string) => ALL_MEMBERS.filter((m) => m.reportsTo === name);

/* ─────────────────────────────────────────────
   ANIMATED BACKGROUND
───────────────────────────────────────────── */
function PageBackground() {
  return (
    <>
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.06; }
          50% { transform: translateY(-40px) scale(1.12); opacity: 0.12; }
        }
        @keyframes floatOrbAlt {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.04; }
          33% { transform: translateY(-28px) translateX(18px) scale(1.08); opacity: 0.09; }
          66% { transform: translateY(14px) translateX(-12px) scale(0.95); opacity: 0.07; }
        }
        @keyframes shimmerLine {
          0% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(100%); }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Base */}
        <div className="absolute inset-0" style={{background:`linear-gradient(145deg, ${DEEP} 0%, #012018 40%, #021f16 70%, ${DEEP} 100%)`}} />
        {/* Fine grid */}
        <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(212,175,55,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.022) 1px, transparent 1px)", backgroundSize:"90px 90px"}} />
        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full" style={{opacity:0.035}}>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke={GOLD} strokeWidth="1"/>
          <line x1="25%" y1="0" x2="100%" y2="70%" stroke={GOLD} strokeWidth="0.8"/>
          <line x1="0" y1="30%" x2="75%" y2="100%" stroke={GOLD} strokeWidth="0.8"/>
          <line x1="50%" y1="0" x2="100%" y2="50%" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="0" y1="50%" x2="50%" y2="100%" stroke={GOLD} strokeWidth="0.5"/>
        </svg>
        {/* Floating orbs */}
        {[
          {w:600,h:600,t:"10%",l:"5%",delay:"0s",dur:"9s"},
          {w:500,h:500,t:"60%",l:"70%",delay:"3s",dur:"12s"},
          {w:350,h:350,t:"35%",l:"45%",delay:"6s",dur:"15s"},
          {w:280,h:280,t:"80%",l:"15%",delay:"1.5s",dur:"10s"},
          {w:420,h:420,t:"5%",l:"80%",delay:"4.5s",dur:"13s"},
        ].map((orb,i) => (
          <div key={i} className="absolute rounded-full" style={{
            width:orb.w, height:orb.h, top:orb.t, left:orb.l,
            background:`radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)`,
            animation:`${i%2===0?"floatOrb":"floatOrbAlt"} ${orb.dur} ease-in-out infinite`,
            animationDelay:orb.delay, filter:"blur(40px)",
          }}/>
        ))}
        {/* Vignette */}
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(1,15,10,0.7) 100%)"}}/>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────────── */
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px" style={{background:`linear-gradient(to right, transparent, ${GOLD}60)`}}/>
      <div className="w-1.5 h-1.5 rotate-45" style={{background:GOLD}}/>
      <div className="w-1 h-1 rotate-45 opacity-50" style={{background:GOLD}}/>
      <div className="flex-1 h-px" style={{background:`linear-gradient(to left, transparent, ${GOLD}60)`}}/>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8" style={{background:GOLD}}/>
      <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{color:GOLD}}>{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: CINEMATIC HERO
───────────────────────────────────────────── */
function CinematicHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 18);
    mouseY.set(y * 12);
  };

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{minHeight:"100vh"}}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Portrait with parallax */}
      <motion.div className="absolute inset-0" style={{x:springX, y:springY, scale:1.08}}>
        <img
          src="/faisal-orakzai-unitar.jpg"
          alt="Chairman Faisal Orakzai"
          className="w-full h-full object-cover"
          style={{objectPosition:"center 18%", filter:"saturate(0.85) brightness(0.7)"}}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0" style={{background:"linear-gradient(180deg, rgba(1,15,10,0.45) 0%, rgba(1,15,10,0.3) 30%, rgba(1,15,10,0.75) 75%, #010f0a 100%)"}}/>
      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 65% 35%, transparent 30%, rgba(1,9,6,0.6) 80%)"}}/>

      {/* Luxury gold frame — portrait side */}
      <div className="absolute top-8 right-8 bottom-8 hidden lg:block" style={{width:2, background:`linear-gradient(to bottom, transparent, ${GOLD}50, ${GOLD}90, ${GOLD}50, transparent)`}}/>
      <div className="absolute top-8 right-8 w-16 h-16 hidden lg:block" style={{borderTop:`1px solid ${GOLD}`, borderRight:`1px solid ${GOLD}`}}/>
      <div className="absolute bottom-8 right-8 w-16 h-16 hidden lg:block" style={{borderBottom:`1px solid ${GOLD}`, borderRight:`1px solid ${GOLD}`}}/>
      <div className="absolute top-8 left-8 w-16 h-16 hidden lg:block" style={{borderTop:`1px solid ${GOLD}50`, borderLeft:`1px solid ${GOLD}50`}}/>
      <div className="absolute bottom-8 left-8 w-16 h-16 hidden lg:block" style={{borderBottom:`1px solid ${GOLD}50`, borderLeft:`1px solid ${GOLD}50`}}/>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 lg:px-16 py-32">
        <div className="max-w-3xl">
          {/* Executive badge */}
          <motion.div
            initial={{opacity:0, y:-16}} animate={{opacity:1, y:0}} transition={{duration:0.8, delay:0.1}}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10" style={{background:GOLD}}/>
            <span className="text-[10px] font-bold uppercase tracking-[0.38em]" style={{color:GOLD}}>Executive Leadership</span>
            <div className="h-px w-10" style={{background:GOLD}}/>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:1, delay:0.2, ease:[0.16,1,0.3,1]}}
            className="text-white leading-[0.92] mb-5"
            style={{fontFamily:"'Playfair Display', serif", fontSize:"clamp(52px, 8vw, 110px)", fontWeight:700, letterSpacing:"-0.02em", textShadow:"0 8px 60px rgba(0,0,0,0.6)"}}
          >
            Faisal<br/>
            <span style={{fontStyle:"italic", fontWeight:400}}>Orakzai</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:0.8, delay:0.4}}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-6" style={{background:GOLD}}/>
            <p className="text-sm font-bold uppercase tracking-[0.22em]" style={{color:GOLD}}>Founder & Chairman</p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} transition={{duration:0.9, delay:0.55}}
            className="text-white/70 leading-relaxed max-w-xl"
            style={{fontFamily:"'Inter', sans-serif", fontSize:16, lineHeight:1.75}}
          >
            A sovereign institution built on the pillars of honour, unity, and progress — serving the Orakzai nation across Pakistan and beyond.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.9, delay:0.7}}
            className="flex items-center gap-8 mt-12 pt-10"
            style={{borderTop:`1px solid rgba(212,175,55,0.18)`}}
          >
            {[["12+","Countries Represented"],["50K+","Orakzai Served"],["2012","Founded"]].map(([n,l]) => (
              <div key={l}>
                <div className="text-3xl font-bold text-white mb-0.5" style={{fontFamily:"'Playfair Display', serif"}}>{n}</div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-white/40">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity, duration:1.6}} className="w-px h-8" style={{background:`linear-gradient(to bottom, ${GOLD}60, transparent)`}}/>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: EXECUTIVE STATEMENT
───────────────────────────────────────────── */
function ExecutiveStatement({ mission }: { mission: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-80px"});
  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{background:"rgba(3,12,8,0.7)"}}>
      <div className="absolute inset-0" style={{background:"linear-gradient(90deg, transparent, rgba(212,175,55,0.03) 50%, transparent)"}}/>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Massive quote mark */}
          <motion.div
            initial={{opacity:0, scale:0.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:1, ease:[0.16,1,0.3,1]}}
            className="absolute -top-6 left-0 leading-none select-none pointer-events-none"
            style={{fontFamily:"'Playfair Display', serif", fontSize:"clamp(120px,18vw,220px)", color:`${GOLD}0f`, lineHeight:1, fontWeight:700}}
          >
            &ldquo;
          </motion.div>
          <motion.div
            initial={{opacity:0, scale:0.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:1, delay:0.1, ease:[0.16,1,0.3,1]}}
            className="absolute -bottom-16 right-0 leading-none select-none pointer-events-none"
            style={{fontFamily:"'Playfair Display', serif", fontSize:"clamp(120px,18vw,220px)", color:`${GOLD}0f`, lineHeight:1, fontWeight:700}}
          >
            &rdquo;
          </motion.div>

          {/* Gold left accent */}
          <motion.div
            initial={{scaleY:0}} animate={inView?{scaleY:1}:{}} transition={{duration:0.8, delay:0.3}}
            className="absolute left-0 top-4 bottom-4 w-[3px] origin-top"
            style={{background:`linear-gradient(to bottom, ${GOLD}, ${GOLD}40)`}}
          />

          <div className="pl-8">
            <SectionLabel text="Mission Statement" />
            <motion.blockquote
              initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1, delay:0.25, ease:[0.16,1,0.3,1]}}
              className="text-left"
              style={{fontFamily:"'Playfair Display', serif", fontSize:"clamp(18px,2.2vw,28px)", lineHeight:1.65, fontWeight:400, fontStyle:"italic", color:"rgba(255,255,255,0.88)"}}
            >
              {mission}
            </motion.blockquote>
            <motion.div
              initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.6}}
              className="flex items-center gap-3 mt-8"
            >
              <div className="w-10 h-px" style={{background:GOLD}}/>
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color:GOLD}}>Chairman Faisal Orakzai</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: EXECUTIVE BIOGRAPHY
───────────────────────────────────────────── */
function ExecutiveBiography({ member }: { member: TeamMember }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-60px"});
  return (
    <section ref={ref} className="relative py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div initial={{opacity:0, y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9}}>
          <SectionLabel text="Executive Biography" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-12 xl:gap-20 items-start">
            {/* Left: Bio text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{fontFamily:"'Playfair Display', serif"}}>
                A Life of<br/><span style={{color:GOLD, fontStyle:"italic"}}>Purpose & Service</span>
              </h2>
              <GoldDivider className="mb-8"/>
              <div className="space-y-5">
                {member.bio.split(". ").reduce((acc: string[][], sentence, i) => {
                  const paraIdx = Math.floor(i / 3);
                  if (!acc[paraIdx]) acc[paraIdx] = [];
                  acc[paraIdx].push(sentence);
                  return acc;
                }, []).map((sentences, i) => (
                  <motion.p
                    key={i}
                    initial={{opacity:0, y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7, delay:0.15+i*0.08}}
                    className="text-white/65 leading-[1.85]"
                    style={{fontFamily:"'Inter', sans-serif", fontSize:15}}
                  >
                    {sentences.join(". ")}{sentences.length > 0 && !sentences[sentences.length-1].endsWith(".") ? "." : ""}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Right: Executive Summary Card */}
            <motion.div
              initial={{opacity:0, x:30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9, delay:0.3}}
              className="relative rounded-2xl overflow-hidden"
              style={{background:"linear-gradient(160deg, rgba(6,40,24,0.9) 0%, rgba(2,15,10,0.97) 100%)", border:`1px solid rgba(212,175,55,0.25)`, backdropFilter:"blur(20px)"}}
            >
              {/* Top accent */}
              <div className="h-[2px]" style={{background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`}}/>
              <div className="p-8">
                {/* Portrait */}
                <div className="relative mb-6 flex justify-center">
                  <div className="relative" style={{width:100, height:100}}>
                    <div className="absolute -inset-2 rounded-full" style={{background:`conic-gradient(from 0deg, ${GOLD}60, transparent, ${GOLD}60)`, animation:"spin 8s linear infinite"}}/>
                    <div className="absolute inset-0 rounded-full overflow-hidden" style={{border:`2px solid ${GOLD}`}}>
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" style={{objectPosition:"top center"}}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=064e3b&textColor=D4AF37`; }}/>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`, border:"2px solid #010f0a"}}>
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-950"/>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-center mb-1" style={{color:GOLD}}>Executive Summary</p>
                <div className="h-px mb-6" style={{background:`linear-gradient(90deg, transparent, ${GOLD}40, transparent)`}}/>

                <div className="space-y-4">
                  {[
                    {icon:<MapPin className="w-3.5 h-3.5"/>, label:"Location", value:member.location||""},
                    {icon:<Crown className="w-3.5 h-3.5"/>, label:"Role", value:member.title},
                    {icon:<Building2 className="w-3.5 h-3.5"/>, label:"Organisation", value:"Orakzai.org"},
                    {icon:<Target className="w-3.5 h-3.5"/>, label:"Focus", value:member.focus},
                    {icon:<Globe className="w-3.5 h-3.5"/>, label:"Languages", value:"Pashto · Urdu · English"},
                    {icon:<Layers className="w-3.5 h-3.5"/>, label:"Mission", value:"Community Development"},
                  ].map(({icon, label, value}) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5" style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.2)`, color:GOLD}}>
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-0.5">{label}</div>
                        <div className="text-sm text-white/80 font-medium leading-snug">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex items-center gap-2 mt-6 pt-5" style={{borderTop:"1px solid rgba(212,175,55,0.12)"}}>
                  {member.linkedin && member.linkedin !== "#" && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                      style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.2)`, color:GOLD}}>
                      <Linkedin className="w-3.5 h-3.5"/> LinkedIn
                    </a>
                  )}
                  {member.twitter && member.twitter !== "#" && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                      style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.2)`, color:GOLD}}>
                      <Twitter className="w-3.5 h-3.5"/> Twitter
                    </a>
                  )}
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                      style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}20, ${GOLD}20)`, border:`1px solid ${GOLD}50`, color:GOLD}}>
                      <Globe className="w-3.5 h-3.5"/> Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: LEADERSHIP PRINCIPLES
───────────────────────────────────────────── */
const PRINCIPLE_ICONS = [Crown, Shield, Users, Lightbulb, BookOpen];

function LeadershipPrinciples({ principles }: { principles: { title: string; description: string }[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-60px"});
  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{background:"rgba(2,10,6,0.8)"}}>
      <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(rgba(212,175,55,0.04) 1px, transparent 1px)", backgroundSize:"32px 32px"}}/>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-14">
          <SectionLabel text="Leadership Principles"/>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{fontFamily:"'Playfair Display', serif"}}>
              The Principles That<br/><span style={{color:GOLD, fontStyle:"italic"}}>Drive Every Decision</span>
            </h2>
            <GoldDivider className="hidden lg:flex w-80"/>
          </div>
        </motion.div>

        <div className="space-y-4">
          {principles.map((p, i) => {
            const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{opacity:0, x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7, delay:i*0.09, ease:[0.16,1,0.3,1]}}
                className="group relative flex items-start gap-6 p-7 rounded-2xl cursor-default overflow-hidden"
                style={{background:"linear-gradient(90deg, rgba(6,36,22,0.85), rgba(3,16,10,0.7))", border:"1px solid rgba(212,175,55,0.14)", transition:"all 0.4s ease"}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.background = "linear-gradient(90deg, rgba(8,50,30,0.95), rgba(4,24,15,0.8))";
                  e.currentTarget.style.transform = "translateX(6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.14)";
                  e.currentTarget.style.background = "linear-gradient(90deg, rgba(6,36,22,0.85), rgba(3,16,10,0.7))";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {/* Gold left bar */}
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background:`linear-gradient(to bottom, ${GOLD}, ${GOLD}40)`}}/>

                {/* Number */}
                <div className="flex-shrink-0 text-[42px] font-bold leading-none select-none" style={{fontFamily:"'Playfair Display', serif", color:`${GOLD}18`}}>
                  {String(i+1).padStart(2,"0")}
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.2)`}}>
                  <Icon className="w-5 h-5" style={{color:GOLD}}/>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white" style={{fontFamily:"'Playfair Display', serif"}}>{p.title}</h3>
                    <div className="flex-1 h-px" style={{background:"rgba(212,175,55,0.12)"}}/>
                  </div>
                  <p className="text-white/55 leading-relaxed" style={{fontFamily:"'Inter', sans-serif", fontSize:14}}>{p.description}</p>
                </div>

                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{background:"linear-gradient(90deg, transparent, rgba(212,175,55,0.025) 50%, transparent)"}}/>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: STRATEGIC PRIORITIES
───────────────────────────────────────────── */
const PRIORITY_ICONS = [Zap, BookOpen, Activity, Target, Award, Globe];
const PRIORITY_PROGRESS = [88, 76, 72, 65, 82, 58];

function StrategicPriorities({ areas }: { areas: { title: string; description: string }[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-60px"});
  return (
    <section ref={ref} className="relative py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-14">
          <SectionLabel text="Strategic Priorities"/>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{fontFamily:"'Playfair Display', serif"}}>
            Six Pillars of<br/><span style={{color:GOLD, fontStyle:"italic"}}>Institutional Impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area, i) => {
            const Icon = PRIORITY_ICONS[i % PRIORITY_ICONS.length];
            const progress = PRIORITY_PROGRESS[i % PRIORITY_PROGRESS.length];
            return (
              <motion.div
                key={i}
                initial={{opacity:0, y:32}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7, delay:i*0.07, ease:[0.16,1,0.3,1]}}
                className="group relative p-7 rounded-2xl overflow-hidden"
                style={{background:"linear-gradient(145deg, rgba(6,36,22,0.88) 0%, rgba(2,12,8,0.95) 100%)", border:"1px solid rgba(212,175,55,0.16)", backdropFilter:"blur(20px)", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)"}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${GOLD}80`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2), 0 0 40px rgba(212,175,55,0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.16)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Glass reflection */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{background:"linear-gradient(145deg, rgba(255,255,255,0.025) 0%, transparent 60%)"}}/>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:`linear-gradient(90deg, transparent, ${GOLD}50, transparent)`}}/>

                {/* Index number */}
                <div className="absolute top-5 right-6 text-[11px] font-bold tracking-[0.2em] opacity-20" style={{color:GOLD, fontFamily:"'Playfair Display', serif"}}>{String(i+1).padStart(2,"0")}</div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{background:"rgba(212,175,55,0.07)", border:`1px solid rgba(212,175,55,0.2)`}}>
                  <Icon className="w-5 h-5" style={{color:GOLD}}/>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 leading-snug" style={{fontFamily:"'Playfair Display', serif"}}>{area.title}</h3>
                <p className="text-white/50 leading-relaxed mb-6" style={{fontSize:13, fontFamily:"'Inter', sans-serif"}}>{area.description}</p>

                {/* Progress indicator */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">Programme Progress</span>
                    <span className="text-xs font-bold" style={{color:GOLD}}>{progress}%</span>
                  </div>
                  <div className="h-[3px] rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.06)"}}>
                    <motion.div
                      initial={{width:0}} animate={inView?{width:`${progress}%`}:{}} transition={{duration:1.2, delay:0.4+i*0.08, ease:[0.16,1,0.3,1]}}
                      className="h-full rounded-full"
                      style={{background:`linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`}}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: CURRENT INITIATIVES (TIMELINE)
───────────────────────────────────────────── */
function statusConfig(status: string) {
  const map: Record<string, {color:string; bg:string; border:string; Icon: React.ComponentType<{className?:string; style?: React.CSSProperties}>}> = {
    Active:    {color:"#34d399", bg:"rgba(52,211,153,0.08)",    border:"rgba(52,211,153,0.3)",   Icon:Activity},
    Open:      {color:GOLD,      bg:"rgba(212,175,55,0.08)",    border:"rgba(212,175,55,0.3)",   Icon:Compass},
    Completed: {color:"#93c5fd", bg:"rgba(147,197,253,0.08)",   border:"rgba(147,197,253,0.3)",  Icon:CheckCircle2},
    Ongoing:   {color:GOLD_LIGHT,bg:"rgba(245,224,126,0.08)",   border:"rgba(245,224,126,0.3)",  Icon:Clock},
    Research:  {color:"#c4b5fd", bg:"rgba(196,181,253,0.08)",   border:"rgba(196,181,253,0.3)",  Icon:BookOpen},
    Planning:  {color:"#fda4af", bg:"rgba(253,164,175,0.08)",   border:"rgba(253,164,175,0.3)",  Icon:AlertCircle},
  };
  return map[status] || map["Planning"];
}

function CurrentInitiatives({ initiatives }: { initiatives: { title: string; status: string; description: string }[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-60px"});
  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{background:"rgba(2,10,6,0.8)"}}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-14">
          <SectionLabel text="Current Initiatives"/>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{fontFamily:"'Playfair Display', serif"}}>
            Active Programmes &<br/><span style={{color:GOLD, fontStyle:"italic"}}>Field Operations</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-4 lg:pl-8">
          {/* Vertical line */}
          <motion.div
            initial={{scaleY:0}} animate={inView?{scaleY:1}:{}} transition={{duration:1.2, delay:0.3, ease:[0.16,1,0.3,1]}}
            className="absolute left-0 top-4 bottom-4 w-[2px] origin-top"
            style={{background:`linear-gradient(to bottom, ${GOLD}, rgba(212,175,55,0.2) 80%, transparent)`}}
          />

          <div className="space-y-6">
            {initiatives.map((item, i) => {
              const cfg = statusConfig(item.status);
              const StatusIcon = cfg.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{opacity:0, x:24}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7, delay:0.15+i*0.1, ease:[0.16,1,0.3,1]}}
                  className="group relative ml-8 p-6 rounded-2xl overflow-hidden"
                  style={{background:"linear-gradient(90deg, rgba(6,30,18,0.9), rgba(2,14,9,0.7))", border:"1px solid rgba(212,175,55,0.12)", transition:"all 0.35s ease"}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cfg.border;
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)";
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[37px] top-6 w-[11px] h-[11px] rounded-full border-2" style={{background:cfg.color, borderColor:DEEP, boxShadow:`0 0 12px ${cfg.color}80`}}/>

                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{background:cfg.bg, border:`1px solid ${cfg.border}`}}>
                        <StatusIcon className="w-4 h-4" style={{color:cfg.color}}/>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white mb-1.5 leading-snug" style={{fontFamily:"'Playfair Display', serif"}}>{item.title}</h3>
                        <p className="text-white/50 leading-relaxed" style={{fontSize:13}}>{item.description}</p>
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full" style={{background:cfg.bg, border:`1px solid ${cfg.border}`, color:cfg.color}}>
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: BOARD OF DIRECTORS
───────────────────────────────────────────── */
function BoardCard({ member, index, isChairman, onOpen }: { member: TeamMember; index: number; isChairman: boolean; onOpen: (m: TeamMember) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-40px"});

  if (isChairman) {
    return (
      <motion.div
        ref={ref}
        initial={{opacity:0, y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9, ease:[0.16,1,0.3,1]}}
        className="col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-2 relative rounded-3xl overflow-hidden cursor-pointer group"
        style={{background:"linear-gradient(155deg, rgba(14,60,36,0.95) 0%, rgba(4,22,14,0.98) 100%)", border:`1px solid ${GOLD}60`, boxShadow:`0 0 0 1px rgba(212,175,55,0.08), 0 32px 64px rgba(0,0,0,0.4), 0 0 80px rgba(212,175,55,0.06)`, transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}
        onClick={() => onOpen(member)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px) scale(1.01)";
          e.currentTarget.style.boxShadow = `0 0 0 1px ${GOLD}40, 0 40px 80px rgba(0,0,0,0.5), 0 0 100px rgba(212,175,55,0.12)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = `0 0 0 1px rgba(212,175,55,0.08), 0 32px 64px rgba(0,0,0,0.4), 0 0 80px rgba(212,175,55,0.06)`;
        }}
      >
        {/* Top gradient */}
        <div className="h-[2px]" style={{background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`}}/>

        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none" style={{background:GOLD}}/>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none" style={{background:GOLD}}/>

        {/* Inner frame */}
        <div className="absolute inset-3 rounded-[20px] pointer-events-none" style={{border:"1px solid rgba(212,175,55,0.1)"}}/>

        <div className="relative p-8 flex flex-col items-center text-center">
          {/* CHAIRMAN badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] mb-7" style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_DARK})`, color:"#021710"}}>
            <Crown className="w-3 h-3"/> Chairman
          </div>

          {/* Portrait */}
          <div className="relative mb-5">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden" style={{border:`3px solid ${GOLD}`, boxShadow:`0 0 0 6px rgba(212,175,55,0.08), 0 0 32px rgba(212,175,55,0.3)`}}>
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" style={{objectPosition:"top center"}}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=064e3b&textColor=D4AF37`; }}/>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center" style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`, border:"2.5px solid #010f0a"}}>
              <BadgeCheck className="w-4 h-4 text-emerald-950"/>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-1.5" style={{fontFamily:"'Playfair Display', serif"}}>{member.name}</h3>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{color:GOLD}}>{member.title}</p>
          <p className="text-xs text-white/40 mb-6">{member.focus}</p>
          {member.location && <p className="flex items-center gap-1.5 text-xs text-white/30 mb-6"><MapPin className="w-3 h-3"/>{member.location}</p>}

          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] group-hover:gap-3 transition-all duration-300" style={{color:GOLD}}>
            View Full Profile <ChevronRight className="w-3.5 h-3.5"/>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{opacity:0, y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7, delay:0.06*index, ease:[0.16,1,0.3,1]}}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{background:"linear-gradient(155deg, rgba(5,26,16,0.9) 0%, rgba(2,12,8,0.95) 100%)", border:"1px solid rgba(212,175,55,0.15)", backdropFilter:"blur(16px)", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)"}}
      onClick={() => onOpen(member)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${GOLD}60`;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2), 0 0 32px rgba(212,175,55,0.06)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Hover top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{background:`linear-gradient(90deg, transparent, ${GOLD}60, transparent)`}}/>

      {/* Glass reflection */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{background:"linear-gradient(155deg, rgba(255,255,255,0.025) 0%, transparent 50%)"}}/>

      <div className="relative p-6 flex flex-col items-center text-center">
        {/* Portrait */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden" style={{border:`2px solid rgba(212,175,55,0.5)`, boxShadow:`0 0 20px rgba(212,175,55,0.15)`}}>
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700" style={{objectPosition:"top center"}}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=064e3b&textColor=D4AF37`; }}/>
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-1 leading-snug" style={{fontFamily:"'Playfair Display', serif"}}>{member.name}</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{color:GOLD}}>{member.title}</p>
        <p className="text-[11px] text-white/35 mb-4 leading-snug">{member.focus}</p>
        {member.location && <p className="flex items-center gap-1 text-[10px] text-white/25 mb-4"><MapPin className="w-2.5 h-2.5"/>{member.location.split(",").slice(-2).join(",").trim()}</p>}

        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{color:GOLD}}>
          View Profile <ChevronRight className="w-3 h-3"/>
        </div>
      </div>
    </motion.div>
  );
}

function BoardOfDirectors({ members, onOpen }: { members: TeamMember[]; onOpen: (m: TeamMember) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-60px"});
  const chairman = members.find(m => m.isSupreme && m.id === 1)!;
  const rest = members.filter(m => !(m.isSupreme && m.id === 1));

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{background:"rgba(1,8,5,0.85)"}}>
      <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(212,175,55,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.018) 1px, transparent 1px)", backgroundSize:"60px 60px"}}/>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-14 text-center">
          <SectionLabel text="Executive Team"/>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{fontFamily:"'Playfair Display', serif"}}>
            The People Who Build<br/><span style={{color:GOLD, fontStyle:"italic"}}>Orakzai's Future</span>
          </h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </motion.div>

        {/* Chairman — centered, featured */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 max-w-lg mx-auto">
          <BoardCard member={chairman} index={0} isChairman={true} onOpen={onOpen}/>
        </div>

        {/* Rest of team — 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((m, i) => (
            <BoardCard key={m.id} member={m} index={i} isChairman={false} onOpen={onOpen}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: EXPLORE PILLARS (compact nav)
───────────────────────────────────────────── */
type ScreenId = "home" | "executive" | "board" | "representatives" | "qoum" | "beneficiaries" | "global";
interface ViewState { screen: ScreenId; qoum?: string; }

const PILLAR_META = {
  board:           {label:"Board & Advisors",          sub:"Senior governance counsel", icon:Shield,        count:"5 Advisors"},
  representatives: {label:"Orakzai Representatives",   sub:"19 sub-tribal councils",    icon:Landmark,      count:"19 Qoums"},
  beneficiaries:   {label:"Beneficiary Members",       sub:"Families we uplift",        icon:HeartHandshake,count:"5+ Featured"},
  global:          {label:"Global Leadership",         sub:"Worldwide diaspora network", icon:Globe,         count:"5 Regions"},
};

function ExplorePillars({ navigate }: { navigate: (s: ScreenId) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-60px"});
  return (
    <section ref={ref} className="relative py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-10 text-center">
          <SectionLabel text="Institutional Pillars"/>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{fontFamily:"'Playfair Display', serif"}}>
            Explore <span style={{color:GOLD, fontStyle:"italic"}}>All Pillars</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.entries(PILLAR_META) as [ScreenId, typeof PILLAR_META[keyof typeof PILLAR_META]][]).map(([id, meta], i) => {
            const Icon = meta.icon;
            return (
              <motion.div
                key={id}
                initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6, delay:i*0.08}}
                onClick={() => navigate(id)}
                className="group relative p-6 rounded-2xl cursor-pointer overflow-hidden"
                style={{background:"rgba(4,18,11,0.8)", border:"1px solid rgba(212,175,55,0.14)", transition:"all 0.35s ease"}}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 32px rgba(0,0,0,0.4), 0 0 24px rgba(212,175,55,0.1)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.14)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{background:`linear-gradient(90deg, transparent, ${GOLD}60, transparent)`}}/>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{background:"rgba(212,175,55,0.07)", border:`1px solid rgba(212,175,55,0.2)`}}>
                  <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" style={{color:GOLD}}/>
                </div>
                <h3 className="text-sm font-bold text-white mb-1" style={{fontFamily:"'Playfair Display', serif"}}>{meta.label}</h3>
                <p className="text-xs text-white/35 mb-4">{meta.sub}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full" style={{background:`linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`, color:"#010f0a"}}>{meta.count}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{color:GOLD}}/>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION: CONTACT GLASS PANEL
───────────────────────────────────────────── */
function ContactSection({ member }: { member: TeamMember }) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-40px"});
  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{background:"rgba(2,8,5,0.9)"}}>
      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 60%)"}}/>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <motion.div
          initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9}}
          className="relative max-w-2xl mx-auto text-center"
        >
          <SectionLabel text="Contact & Engagement"/>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily:"'Playfair Display', serif"}}>
            Connect With<br/><span style={{color:GOLD, fontStyle:"italic"}}>The Chairman</span>
          </h2>
          <GoldDivider className="mb-10"/>

          {/* Glass panel */}
          <div className="relative p-8 rounded-3xl overflow-hidden" style={{background:"linear-gradient(145deg, rgba(8,40,24,0.85) 0%, rgba(3,16,10,0.95) 100%)", border:`1px solid rgba(212,175,55,0.22)`, backdropFilter:"blur(24px)", boxShadow:"0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.05)"}}>
            <div className="h-[1px] absolute top-0 left-0 right-0" style={{background:`linear-gradient(90deg, transparent, ${GOLD}60, transparent)`}}/>
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{background:"linear-gradient(155deg, rgba(255,255,255,0.02) 0%, transparent 50%)"}}/>

            <p className="text-white/55 mb-8 leading-relaxed" style={{fontFamily:"'Inter', sans-serif", fontSize:14}}>
              For institutional inquiries, partnership proposals, and community affairs, reach the Chairman through the following verified channels.
            </p>

            <div className="flex items-center justify-center flex-wrap gap-3">
              {member.website && (
                <a href={member.website} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}18, ${GOLD}18)`, border:`1px solid ${GOLD}50`, color:GOLD, boxShadow:`0 0 0 0 ${GOLD}00`}}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(212,175,55,0.25)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <Globe className="w-4 h-4"/>
                  {member.website.replace("https://","")}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100"/>
                </a>
              )}
              {member.linkedin && member.linkedin !== "#" && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{background:"rgba(212,175,55,0.06)", border:"1px solid rgba(212,175,55,0.2)", color:"rgba(255,255,255,0.7)"}}>
                  <Linkedin className="w-4 h-4" style={{color:GOLD}}/> LinkedIn
                </a>
              )}
              {member.twitter && member.twitter !== "#" && (
                <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{background:"rgba(212,175,55,0.06)", border:"1px solid rgba(212,175,55,0.2)", color:"rgba(255,255,255,0.7)"}}>
                  <Twitter className="w-4 h-4" style={{color:GOLD}}/> Twitter / X
                </a>
              )}
              <a href="/contact"
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{background:GOLD, color:"#010f0a"}}>
                <Mail className="w-4 h-4"/> Send Message
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   AVATAR + LEGACY COMPONENTS (used in sub-views)
───────────────────────────────────────────── */
function MemberAvatar({ src, name, size=96, onClick, verified=false }: {src:string;name:string;size?:number;onClick?:()=>void;verified?:boolean}) {
  return (
    <div className="relative flex-shrink-0" style={{width:size+8, height:size+8}}>
      <button type="button" onClick={onClick} aria-label={`Open ${name}'s profile`}
        className="absolute rounded-full overflow-hidden transition-transform hover:scale-[1.04] active:scale-95"
        style={{top:4, left:4, width:size, height:size, border:`2px solid ${GOLD}`, boxShadow:`0 0 16px rgba(212,175,55,0.3)`, cursor:onClick?"pointer":"default"}}>
        <img src={src} alt={name} className="w-full h-full object-cover" style={{objectPosition:"top center"}}
          onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=064e3b&textColor=D4AF37`; }}/>
      </button>
      {verified && (
        <div className="absolute w-7 h-7 rounded-full flex items-center justify-center z-10" style={{bottom:0, right:0, background:`linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`, border:"2px solid #010f0a"}}>
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-950"/>
        </div>
      )}
    </div>
  );
}

function MemberCard({ member, index, onOpenBio }: {member:TeamMember;index:number;onOpenBio:(m:TeamMember)=>void}) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-30px"});
  return (
    <motion.div ref={ref}
      initial={{opacity:0, y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.06*index, duration:0.6, ease:[0.16,1,0.3,1]}}
      onClick={() => onOpenBio(member)} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key==="Enter") onOpenBio(member); }}
      className="group flex flex-col items-center text-center p-6 rounded-2xl cursor-pointer overflow-hidden"
      style={{background:CARD_BG, border:"1px solid rgba(212,175,55,0.14)", backdropFilter:"blur(16px)", transition:"all 0.35s ease"}}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor=`${GOLD}60`; e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 16px 32px rgba(0,0,0,0.4), 0 0 24px rgba(212,175,55,0.08)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(212,175,55,0.14)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{background:`linear-gradient(90deg, transparent, ${GOLD}50, transparent)`}}/>
      <div className="mb-4"><MemberAvatar src={member.photo} name={member.name} size={80} onClick={() => onOpenBio(member)}/></div>
      <h3 className="text-sm font-bold text-white mb-1" style={{fontFamily:"'Playfair Display', serif"}}>{member.name}</h3>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-4" style={{color:GOLD}}>{member.title}</p>
      <div className="mt-auto flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{color:GOLD}}>
        View Profile <ChevronRight className="w-3 h-3"/>
      </div>
    </motion.div>
  );
}

function QoumCard({ qoum, index, onClick }: {qoum:string;index:number;onClick:()=>void}) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:"-40px"});
  return (
    <motion.div ref={ref} initial={{opacity:0, y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.03*index, duration:0.5}}
      onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key==="Enter") onClick(); }}
      className="flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300"
      style={{background:CARD_BG, border:`1px solid rgba(212,175,55,0.14)`, backdropFilter:"blur(10px)"}}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor=GOLD; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 12px 24px rgba(0,0,0,0.3), 0 0 16px rgba(212,175,55,0.1)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(212,175,55,0.14)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"rgba(212,175,55,0.07)", border:`1px solid rgba(212,175,55,0.2)`}}>
        <Landmark className="w-4 h-4" style={{color:GOLD}}/>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate" style={{fontFamily:"'Playfair Display', serif"}}>{qoum}</h4>
        <p className="text-[11px] text-white/35">4 Malaks Represented</p>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" style={{color:GOLD}}/>
    </motion.div>
  );
}

function BackBar({ label, onBack }: {label:string;onBack:()=>void}) {
  return (
    <button onClick={onBack} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
      style={{background:"rgba(212,175,55,0.06)", border:`1px solid rgba(212,175,55,0.25)`, color:GOLD}}>
      <ChevronLeft className="w-3.5 h-3.5"/> {label}
    </button>
  );
}

function SectionHeading({ eyebrow, title, description }: {eyebrow:string;title:string;description:string}) {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5" style={{background:"rgba(212,175,55,0.07)", border:`1px solid rgba(212,175,55,0.3)`, color:GOLD}}>
        <ScrollText className="w-4 h-4"/> {eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily:"'Playfair Display', serif"}}>{title}</h2>
      <GoldDivider className="max-w-xs mb-5"/>
      <p className="text-white/55 max-w-2xl text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE SHEET (side panel — unchanged logic)
───────────────────────────────────────────── */
function ProfileSheet({ member, open, onClose }: {member:TeamMember|null;open:boolean;onClose:()=>void}) {
  const openBioInner = (m: TeamMember) => {
    // handled externally
  };
  if (!member) return null;
  const directs = getDirectReports(member.name);
  const contactHref = member.website || (member.linkedin && member.linkedin !== "#" ? member.linkedin : undefined) || "/contact";

  if (member.isSupreme) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0 border-l" style={{borderColor:"rgba(212,175,55,0.25)", background:"#061209"}}>
          <div className="h-[2px]" style={{background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`}}/>
          {/* Portrait */}
          <div className="relative w-full overflow-hidden" style={{height:320}}>
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" style={{objectPosition:"center 15%"}}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=064e3b&textColor=D4AF37`; }}/>
            <div className="absolute inset-0" style={{background:"linear-gradient(180deg, rgba(6,18,9,0.1) 0%, rgba(6,18,9,0.0) 40%, rgba(6,18,9,0.9) 100%)"}}/>
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_DARK})`, color:"#022c22"}}>
              <Crown className="w-3.5 h-3.5"/> {member.supremeTitle}
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold" style={{background:"rgba(6,18,9,0.75)", border:`1px solid rgba(212,175,55,0.35)`, color:GOLD, backdropFilter:"blur(8px)"}}>
              <BadgeCheck className="w-3 h-3"/> Verified Leadership
            </div>
          </div>
          <SheetHeader className="px-7 pt-6 pb-0 text-left">
            <SheetTitle className="text-3xl font-bold text-white leading-tight" style={{fontFamily:"'Playfair Display', serif"}}>{member.name}</SheetTitle>
            <p className="text-sm font-bold mt-1 uppercase tracking-[0.16em]" style={{color:GOLD}}>{member.title}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-white/45"><MapPin className="w-3 h-3"/> {member.location}</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5 text-xs text-white/45"><Star className="w-3 h-3"/> {member.focus}</span>
            </div>
            <div className="flex items-center gap-2.5 mt-5 flex-wrap">
              <a href={contactHref} target={contactHref.startsWith("http")?"_blank":undefined} rel={contactHref.startsWith("http")?"noopener noreferrer":undefined}
                className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                style={{background:GOLD, color:"#022c22"}}>
                <Mail className="w-3.5 h-3.5"/> Contact
              </a>
              {member.linkedin && member.linkedin !== "#" && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full transition-all hover:scale-110" style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.3)`}}><Linkedin className="w-4 h-4" style={{color:GOLD}}/></a>}
              {member.twitter && member.twitter !== "#" && <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2.5 rounded-full transition-all hover:scale-110" style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.3)`}}><Twitter className="w-4 h-4" style={{color:GOLD}}/></a>}
              {member.website && <a href={member.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="p-2.5 rounded-full transition-all hover:scale-110" style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.3)`}}><Globe className="w-4 h-4" style={{color:GOLD}}/></a>}
            </div>
          </SheetHeader>
          <div className="px-7 pt-6 pb-12 space-y-7">
            <div className="h-px" style={{background:`linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)`}}/>
            {member.mission && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{color:GOLD}}>Mission Statement</p>
                <div className="relative pl-5">
                  <div className="absolute left-0 top-0 h-full w-[3px] rounded-full" style={{background:`linear-gradient(to bottom, ${GOLD}, rgba(212,175,55,0.2))`}}/>
                  <p className="text-white/80 text-base leading-relaxed italic" style={{fontFamily:"'Playfair Display', serif"}}>&ldquo;{member.mission}&rdquo;</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{color:GOLD}}>Biography</p>
              <p className="text-white/60 leading-relaxed text-sm">{member.bio}</p>
            </div>
            {member.leadershipPrinciples && member.leadershipPrinciples.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{color:GOLD}}>Leadership Principles</p>
                <div className="space-y-2.5">
                  {member.leadershipPrinciples.map((p, i) => (
                    <div key={i} className="flex gap-3 p-3.5 rounded-xl" style={{background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.12)"}}>
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{background:`linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`, color:"#022c22"}}>{i+1}</div>
                      <div><p className="text-sm font-bold text-white mb-0.5">{p.title}</p><p className="text-xs text-white/45 leading-relaxed">{p.description}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {member.strategicFocusAreas && member.strategicFocusAreas.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{color:GOLD}}>Strategic Focus Areas</p>
                <div className="space-y-2.5">
                  {member.strategicFocusAreas.map((area, i) => (
                    <div key={i} className="p-3.5 rounded-xl" style={{background:"linear-gradient(135deg, rgba(4,26,16,0.8), rgba(2,14,9,0.9))", border:"1px solid rgba(212,175,55,0.15)"}}>
                      <div className="flex items-start gap-2 mb-1"><div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{background:GOLD}}/><p className="text-sm font-bold text-white">{area.title}</p></div>
                      <p className="text-xs text-white/45 leading-relaxed pl-3.5">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {member.currentInitiatives && member.currentInitiatives.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{color:GOLD}}>Current Initiatives</p>
                <div className="space-y-2.5">
                  {member.currentInitiatives.map((item, i) => {
                    const cfg = statusConfig(item.status);
                    return (
                      <div key={i} className="p-3.5 rounded-xl" style={{background:"rgba(3,22,14,0.7)", border:`1px solid rgba(212,175,55,0.12)`}}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 ml-2" style={{background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`}}>{item.status}</span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {directs.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-4" style={{color:GOLD}}>Team ({directs.length})</p>
                <div className="flex flex-wrap gap-2">
                  {directs.map(d => (
                    <div key={d.id} className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full" style={{background:"rgba(212,175,55,0.06)", border:`1px solid rgba(212,175,55,0.2)`}}>
                      <img src={d.photo} alt={d.name} className="w-6 h-6 rounded-full object-cover" style={{objectPosition:"top center"}}/>
                      <span className="text-xs text-white/70">{d.name.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  /* Standard layout */
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0 border-l" style={{borderColor:"rgba(212,175,55,0.25)", background:"#061209"}}>
        <div className="h-[2px]" style={{background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`}}/>
        <SheetHeader className="px-8 pt-8 pb-0 text-left">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0" style={{border:`2px solid rgba(212,175,55,0.6)`, boxShadow:`0 0 24px rgba(212,175,55,0.2)`}}>
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" style={{objectPosition:"top center"}}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=064e3b&textColor=D4AF37`; }}/>
            </div>
            <div className="pt-1">
              <SheetTitle className="text-2xl font-bold text-white" style={{fontFamily:"'Playfair Display', serif"}}>{member.name}</SheetTitle>
              <p className="text-sm font-semibold mt-1" style={{color:GOLD}}>{member.title}</p>
              <p className="text-xs text-white/35 mt-0.5">{member.focus}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mt-5 flex-wrap">
            <a href={contactHref} target={contactHref.startsWith("http")?"_blank":undefined} rel={contactHref.startsWith("http")?"noopener noreferrer":undefined}
              className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
              style={{background:GOLD, color:"#022c22"}}>
              <Mail className="w-3.5 h-3.5"/> Contact
            </a>
            {member.linkedin && member.linkedin !== "#" && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full transition-all hover:scale-110" style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.3)`}}><Linkedin className="w-4 h-4" style={{color:GOLD}}/></a>}
            {member.twitter && member.twitter !== "#" && <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2.5 rounded-full transition-all hover:scale-110" style={{background:"rgba(212,175,55,0.08)", border:`1px solid rgba(212,175,55,0.3)`}}><Twitter className="w-4 h-4" style={{color:GOLD}}/></a>}
          </div>
        </SheetHeader>
        <div className="px-8 pt-6 pb-12 space-y-6">
          <div className="h-px" style={{background:`linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)`}}/>
          {member.location && <div className="flex items-center gap-2 text-sm text-white/50"><MapPin className="w-4 h-4" style={{color:GOLD}}/>{member.location}</div>}
          {member.reportsTo && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-2" style={{color:GOLD}}>Reports To</p>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.12)"}}>
                {(() => { const sup = findMemberByName(member.reportsTo); return sup ? (<><img src={sup.photo} alt={sup.name} className="w-8 h-8 rounded-full object-cover" style={{border:`1px solid ${GOLD}50`, objectPosition:"top center"}}/><div><p className="text-sm font-bold text-white">{sup.name}</p><p className="text-xs" style={{color:GOLD}}>{sup.title}</p></div></>) : (<p className="text-sm text-white/60">{member.reportsTo}</p>); })()}
              </div>
            </div>
          )}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{color:GOLD}}>Biography</p>
            <div className="space-y-3">
              {member.bio.split("\n\n").map((para, i) => <p key={i} className="text-white/60 leading-relaxed text-sm">{para}</p>)}
            </div>
          </div>
          {directs.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{color:GOLD}}>Direct Team ({directs.length})</p>
              <div className="flex flex-wrap gap-2">
                {directs.map(d => (
                  <div key={d.id} className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full" style={{background:"rgba(212,175,55,0.06)", border:`1px solid rgba(212,175,55,0.2)`}}>
                    <img src={d.photo} alt={d.name} className="w-6 h-6 rounded-full object-cover" style={{objectPosition:"top center"}}/>
                    <span className="text-xs text-white/70">{d.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
const CATEGORY_META_FULL: Record<Exclude<ScreenId,"home"|"qoum">, {title:string;subtitle:string;icon:React.ComponentType<{className?:string;style?:React.CSSProperties}>;count:string}> = {
  executive: {title:"Executive Team", subtitle:"Leadership and staff running Orakzai.org's programmes on the ground.", icon:Users, count:`${SUPREME_LEADERS.length+BOARD_MEMBERS.length} Members`},
  board: {title:"Board & Advisors", subtitle:"Senior counsel guiding institutional strategy and governance.", icon:Shield, count:`${BOARD_ADVISORS.length} Advisors`},
  representatives: {title:"Orakzai Representatives", subtitle:"19 sub-tribes of the Orakzai nation, each with elected Malaks.", icon:Landmark, count:"19 Qoums"},
  beneficiaries: {title:"Beneficiary Members", subtitle:"Families supported through welfare, education, and economic grants.", icon:HeartHandshake, count:`${BENEFICIARY_MEMBERS.length}+ Featured`},
  global: {title:"Global Leadership", subtitle:"Diaspora representatives coordinating across five continents.", icon:Globe, count:`${GLOBAL_LEADERSHIP.length} Regions`},
};

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [view, setView] = useState<ViewState>({ screen: "home" });

  const openBio = (member: TeamMember) => { setSelectedMember(member); setSheetOpen(true); };
  const goHome = () => setView({ screen: "home" });
  const goCategory = (screen: ScreenId) => setView({ screen });
  const goQoum = (qoum: string) => setView({ screen: "qoum", qoum });

  const chairman = SUPREME_LEADERS[0];
  const allBoardMembers = [...SUPREME_LEADERS, ...BOARD_MEMBERS];

  return (
    <MainLayout>
      <div className="relative min-h-screen" style={{background:DEEP, color:"white"}}>
        <PageBackground/>

        <AnimatePresence mode="wait">
          {view.screen === "home" && (
            <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="relative z-10">
              {/* 1. HERO */}
              <CinematicHero/>

              {/* 2. EXECUTIVE STATEMENT */}
              {chairman.mission && <ExecutiveStatement mission={chairman.mission}/>}

              {/* 3. BIOGRAPHY */}
              <ExecutiveBiography member={chairman}/>

              {/* 4. LEADERSHIP PRINCIPLES */}
              {chairman.leadershipPrinciples && chairman.leadershipPrinciples.length > 0 && (
                <LeadershipPrinciples principles={chairman.leadershipPrinciples}/>
              )}

              {/* 5. STRATEGIC PRIORITIES */}
              {chairman.strategicFocusAreas && chairman.strategicFocusAreas.length > 0 && (
                <StrategicPriorities areas={chairman.strategicFocusAreas}/>
              )}

              {/* 6. CURRENT INITIATIVES */}
              {chairman.currentInitiatives && chairman.currentInitiatives.length > 0 && (
                <CurrentInitiatives initiatives={chairman.currentInitiatives}/>
              )}

              {/* 7. BOARD OF DIRECTORS */}
              <BoardOfDirectors members={allBoardMembers} onOpen={openBio}/>

              {/* 8. EXPLORE OTHER PILLARS */}
              <ExplorePillars navigate={goCategory}/>

              {/* 9. CONTACT */}
              <ContactSection member={chairman}/>
            </motion.div>
          )}

          {/* ── SUB-VIEWS ── */}
          {view.screen !== "home" && (
            <motion.div key={view.screen} initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration:0.35}}
              className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-8 py-16 pb-24"
            >
              <BackBar label="Back to Executive Leadership" onBack={goHome}/>

              {view.screen === "executive" && (
                <>
                  <SectionHeading eyebrow="Executive Team" title="The People Who Run Orakzai.org" description={CATEGORY_META_FULL.executive.subtitle}/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                    {SUPREME_LEADERS.map((m,i) => <MemberCard key={m.id} member={m} index={i} onOpenBio={openBio}/>)}
                  </div>
                  <GoldDivider className="my-10"/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BOARD_MEMBERS.map((m,i) => <MemberCard key={m.id} member={m} index={i} onOpenBio={openBio}/>)}
                  </div>
                </>
              )}

              {view.screen === "board" && (
                <>
                  <SectionHeading eyebrow="Board & Advisors" title="Senior Counsel & Governance" description={CATEGORY_META_FULL.board.subtitle}/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BOARD_ADVISORS.map((m,i) => <MemberCard key={m.id} member={m} index={i} onOpenBio={openBio}/>)}
                  </div>
                </>
              )}

              {view.screen === "representatives" && (
                <>
                  <SectionHeading eyebrow="Orakzai Representatives" title="The 19 Qoums of Orakzai" description={CATEGORY_META_FULL.representatives.subtitle}/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {QOUMS.map((q,i) => <QoumCard key={q} qoum={q} index={i} onClick={() => goQoum(q)}/>)}
                  </div>
                </>
              )}

              {view.screen === "qoum" && view.qoum && (
                <>
                  <button onClick={() => goCategory("representatives")} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105" style={{background:"rgba(212,175,55,0.06)", border:`1px solid rgba(212,175,55,0.25)`, color:GOLD}}>
                    <ChevronLeft className="w-3.5 h-3.5"/> All 19 Qoums
                  </button>
                  <SectionHeading eyebrow={`${view.qoum} Qoum`} title={`Malaks of ${view.qoum}`} description={`The tribal council representing the ${view.qoum} qoum — the direct link between this qoum's households and the Executive Team.`}/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {QOUM_MALIKS[view.qoum].map((m,i) => <MemberCard key={m.id} member={m} index={i} onOpenBio={openBio}/>)}
                  </div>
                </>
              )}

              {view.screen === "beneficiaries" && (
                <>
                  <SectionHeading eyebrow="Beneficiary Members" title="Families We Uplift" description={CATEGORY_META_FULL.beneficiaries.subtitle}/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BENEFICIARY_MEMBERS.map((m,i) => <MemberCard key={m.id} member={m} index={i} onOpenBio={openBio}/>)}
                  </div>
                </>
              )}

              {view.screen === "global" && (
                <>
                  <SectionHeading eyebrow="Global Leadership" title="Orakzai on the World Stage" description={CATEGORY_META_FULL.global.subtitle}/>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {GLOBAL_LEADERSHIP.map((m,i) => <MemberCard key={m.id} member={m} index={i} onOpenBio={openBio}/>)}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <ProfileSheet member={selectedMember} open={sheetOpen} onClose={() => setSheetOpen(false)}/>
      </div>

      {/* Spin animation for portrait ring */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </MainLayout>
  );
}
