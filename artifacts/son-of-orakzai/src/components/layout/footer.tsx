import { Link } from "wouter";
import { useState } from "react";
import { MapPin, Mail, Phone, CheckCircle2, Plus, Minus, ChevronRight, ArrowUpRight } from "lucide-react";

const GOLD = "#D4AF37";
const logoPath = "/orakzai-org-logo.png";

/* ── Social icons as inline SVG for custom gold styling ── */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#011a10" />
    </svg>
  );
}

const socialLinks = [
  { Icon: FacebookIcon, href: "https://facebook.com/orakzaiorg", label: "Facebook" },
  { Icon: TwitterIcon, href: "https://twitter.com/orakzaiorg", label: "Twitter" },
  { Icon: InstagramIcon, href: "https://instagram.com/orakzaiorg", label: "Instagram" },
  { Icon: LinkedInIcon, href: "https://linkedin.com/company/orakzai", label: "LinkedIn" },
  { Icon: YouTubeIcon, href: "https://youtube.com/@orakzaiorg", label: "YouTube" },
];

const footerCategories = [
  {
    title: "About Orakzai",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Leadership" },
      { href: "/services", label: "Our Services" },
      { href: "/community", label: "Community" },
      { href: "/impact", label: "Our Impact" },
      { href: "/join", label: "Become a Member" },
    ],
  },
  {
    title: "Governance & Trust",
    links: [
      { href: "/impact-reports", label: "Impact Reports & Metrics" },
      { href: "/financial-transparency", label: "Financial Transparency" },
    ],
  },
  {
    title: "Programs & Services",
    links: [
      { href: "/migrant-welfare", label: "Migrant Welfare & Diaspora Protection" },
      { href: "/rights-representation", label: "Rights & Representation" },
      { href: "/education-scholarships", label: "Education & Global Scholarships" },
      { href: "/social-welfare-relief", label: "Social Welfare & Crisis Relief" },
      { href: "/healthcare-infrastructure", label: "Healthcare Infrastructure" },
      { href: "/clean-water-sanitation", label: "Clean Water & Sanitation (WASH)" },
    ],
  },
  {
    title: "Community & Diaspora",
    links: [
      { href: "/global-diaspora-network", label: "Global Diaspora Network" },
      { href: "/community-stories", label: "Community & Success Stories" },
    ],
  },
  {
    title: "Development & Impact",
    links: [
      { href: "/field-operations", label: "Field Operations & Projects" },
      { href: "/women-empowerment-artisans", label: "Women Empowerment & Artisans" },
      { href: "/youth-sports-development", label: "Youth & Sports Development" },
    ],
  },
  {
    title: "News & Publications",
    links: [
      { href: "/latest-news", label: "Latest News & Articles" },
      { href: "/press-room", label: "Press Room & Media Kit" },
      { href: "/events", label: "Global Events & Summits" },
      { href: "/announcements", label: "Official Announcements" },
    ],
  },
  {
    title: "Business & Partnerships",
    links: [
      { href: "/economic-innovation-grants", label: "Economic Innovation & Grants" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { href: "tel:+923360854603", label: "+92 336 0854603" },
      { href: "mailto:info@orakzai.org", label: "info@orakzai.org" },
    ],
  },
];

function FooterLinkList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const sectionId = `footer-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="border-b border-white/[0.10] last:border-b-0 lg:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={sectionId}
        onClick={() => setOpen((value) => !value)}
        className="group flex min-h-[3.25rem] w-full items-center justify-between gap-4 text-left lg:pointer-events-none lg:min-h-0"
      >
        <span className="flex items-center gap-2.5">
          <span className="h-px w-4 transition-colors group-hover:bg-[#d6b44c]" style={{ background: GOLD }} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs" style={{ color: '#D6B44C', fontFamily: "'Playfair Display', serif" }}>
            {title}
          </span>
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[#D6B44C] transition-colors group-hover:border-[#D6B44C]/50 lg:hidden" aria-hidden="true">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <ul id={sectionId} className={`${open ? 'block' : 'hidden'} space-y-1.5 pb-4 pl-6 md:space-y-2 lg:block lg:space-y-2.5 lg:pb-0 lg:pl-6 lg:pt-3`}>
        {links.map(({ href, label }) => (
          <li key={label}>
            {href.startsWith('/') ? (
              <Link href={href}>
                <span className="group flex min-h-7 items-center gap-1.5 text-xs leading-relaxed text-[#A6B3A9] transition-colors hover:text-[#F5F1E7] sm:text-sm">
                  <ChevronRight className="-ml-1 h-3 w-3 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" style={{ color: GOLD }} />
                  {label}
                </span>
              </Link>
            ) : (
              <a href={href} className="group flex min-h-7 items-center gap-1.5 text-xs leading-relaxed text-[#A6B3A9] transition-colors hover:text-[#F5F1E7] sm:text-sm">
                <ChevronRight className="-ml-1 h-3 w-3 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" style={{ color: GOLD }} />
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #011a10 0%, #000c07 100%)' }}
    >
      {/* Top gold rule */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}70, ${GOLD}, ${GOLD}70, transparent)` }} />
      {/* Subtle pattern */}
      <div className="absolute inset-0 orakzai-pattern opacity-20 pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />

      {/* ── CTA top band ── */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 py-6 sm:px-6 md:px-10 md:py-8">
        <div
          className="flex flex-col items-start justify-between gap-5 rounded-[1.25rem] px-5 py-5 sm:px-7 md:flex-row md:items-center md:px-9 md:py-6"
          style={{
            background: 'linear-gradient(105deg, rgba(212,175,55,0.075), rgba(255,255,255,0.018))',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 12px 34px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.035)',
          }}
        >
          <div className="max-w-xl">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: GOLD }}>Ready to make a difference?</p>
            <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Become part of the Orakzai family
            </h3>
          </div>
          <div className="flex w-full gap-3 sm:w-auto sm:flex-shrink-0">
            <Link
              href="/join"
              className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 sm:flex-none sm:min-w-[112px]"
              style={{
                background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
                color: '#011a10',
                boxShadow: `0 4px 20px rgba(212,175,55,0.35)`,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Join Now
            </Link>
            <Link
              href="/donate"
              className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 sm:flex-none sm:min-w-[102px]"
              style={{ border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-8 pt-3 sm:px-6 md:px-10 md:pb-11 md:pt-5">
        <div className="mb-8 grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-8 lg:mb-10 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8">

          {/* Brand column — 2 cols */}
          <div className="col-span-1 space-y-4 rounded-2xl border border-white/10 bg-white/[0.022] p-5 sm:p-6 md:col-span-2 lg:col-span-2 lg:space-y-5 lg:border-0 lg:bg-transparent lg:p-0">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 20px rgba(212,175,55,0.2)`, transform: 'scale(1.4)' }} />
                <img
                  src={logoPath}
                  alt="Orakzai.org Logo"
                  className="relative h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 12px rgba(212,175,55,0.24)`, width: 48, height: 48 }}
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-[0.12em] text-white block uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Orakzai.org
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: GOLD, opacity: 0.65 }}>Digital Embassy</span>
              </div>
            </Link>

            {/* Verified badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.25)', boxShadow: '0 0 16px rgba(212,175,55,0.08)' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, boxShadow: `0 0 8px rgba(212,175,55,0.4)` }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#011a10' }} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider leading-tight" style={{ color: GOLD }}>Verified Institution</p>
                <p className="text-white/30 text-[10px] leading-tight">Registered NGO · Pakistan</p>
              </div>
            </div>

            <p className="text-white/45 text-sm leading-relaxed">
              A digital homeland where tradition meets progress — uniting and empowering every member of the Orakzai nation across Pakistan and the world.
            </p>

          </div>

          {footerCategories.map((category) => (
            <FooterLinkList key={category.title} title={category.title} links={category.links} />
          ))}
        </div>

        {/* ── Community / social ── */}
        <div className="mb-8 flex flex-col gap-4 border-y border-white/[0.10] py-5 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#D6B44C' }}>Community</p>
            <p className="text-xs text-[#A6B3A9]">Follow the Orakzai global community.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-[#D6B44C] transition-all hover:-translate-y-0.5 hover:border-[#D6B44C]/55 hover:bg-[#D6B44C]/10"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ── Contact card ── */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#06271B]/55 p-5 sm:p-6 lg:mb-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-4 lg:mb-0">
            {/* Contact block */}
            <h3
              className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: '#D6B44C', fontFamily: "'Playfair Display', serif" }}
            >
              <span className="h-px w-4" style={{ background: GOLD }} />
              Contact Us
            </h3>
            <p className="pl-6 text-xs text-[#A6B3A9]">Reach the Orakzai digital embassy.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 sm:gap-5 lg:flex lg:flex-1 lg:justify-end lg:gap-8">
              <li className="flex items-start gap-3 text-sm text-[#A6B3A9]">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span>Orakzai District, Khyber Pakhtunkhwa, Pakistan</span>
              </li>
              <li>
                <a href="tel:+923360854603" className="flex min-h-8 items-center gap-3 text-sm text-[#A6B3A9] transition-colors hover:text-[#F5F1E7] group">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                  <span>+92 336 0854603</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                </a>
              </li>
              <li>
                <a href="mailto:info@orakzai.org" className="flex min-h-8 items-center gap-3 text-sm text-[#A6B3A9] transition-colors hover:text-[#F5F1E7] group">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                  <span>info@orakzai.org</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                </a>
              </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="mb-5 h-[1px] w-full" style={{ background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.22), transparent)` }} />

        {/* Bottom bar */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="order-2 text-xs tracking-wide text-white/35 md:order-1">
            &copy; {new Date().getFullYear()} Orakzai.org — Digital Embassy. All rights reserved.
          </p>
          <div className="order-1 flex flex-wrap items-center gap-x-4 gap-y-2 md:order-2">
            {['Privacy Policy', 'Terms of Use', 'Transparency Report'].map((item) => (
              <a key={item} href="#" className="text-xs tracking-wide text-white/35 transition-colors hover:text-white/70">{item}</a>
            ))}
          </div>
          <div className="order-3 text-xs tracking-wide text-white/30 md:text-right">
            Powered by{' '}
            <span className="font-semibold" style={{ color: `${GOLD}88` }}>Orakzai Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
