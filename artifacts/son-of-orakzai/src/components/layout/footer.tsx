import { Link } from "wouter";
import { MapPin, Mail, Phone, CheckCircle2, ArrowUpRight, ChevronRight } from "lucide-react";

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
  { Icon: FacebookIcon, href: "https://facebook.com/orakzai", label: "Facebook" },
  { Icon: TwitterIcon, href: "https://twitter.com/orakzai", label: "Twitter" },
  { Icon: InstagramIcon, href: "https://instagram.com/orakzai", label: "Instagram" },
  { Icon: LinkedInIcon, href: "https://linkedin.com/company/orakzai", label: "LinkedIn" },
  { Icon: YouTubeIcon, href: "https://youtube.com/@orakzai", label: "YouTube" },
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Leadership" },
  { href: "/services", label: "Our Services" },
  { href: "/community", label: "Community" },
  { href: "/impact", label: "Our Impact" },
  { href: "/join", label: "Become a Member" },
];

const impactLinks = [
  { href: "/impact-reports", label: "Impact Reports & Metrics" },
  { href: "/field-operations", label: "Field Operations & Projects" },
  { href: "/community-stories", label: "Community & Success Stories" },
  { href: "/financial-transparency", label: "Financial Transparency" },
];

const serviceLinks = [
  { href: "/services", label: "Migrant Welfare & Diaspora Protection Fund" },
  { href: "/services", label: "Education & Skills" },
  { href: "/services", label: "Healthcare Access" },
  { href: "/services", label: "Legal Aid" },
  { href: "/services", label: "Youth Programs" },
];

const newsLinks = [
  { href: "/blog", label: "Latest News" },
  { href: "/blog", label: "Press Releases" },
  { href: "/blog", label: "Media Gallery" },
  { href: "/blog", label: "Upcoming Events" },
];

function FooterLinkList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3
        className="font-bold text-sm mb-5 uppercase tracking-[0.22em] flex items-center gap-2"
        style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
      >
        <span className="w-3 h-[1px] inline-block" style={{ background: GOLD }} />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link href={href}>
              <span className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors cursor-pointer group">
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1 group-hover:ml-0" style={{ color: GOLD }} />
                {label}
              </span>
            </Link>
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
      <div className="relative z-10 py-10 px-6 md:px-14 max-w-[1400px] mx-auto">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-8 md:px-12 rounded-2xl"
          style={{
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.18)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: GOLD }}>Ready to make a difference?</p>
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Become part of the Orakzai family
            </h3>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/join">
              <button
                className="px-7 py-3 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
                  color: '#011a10',
                  boxShadow: `0 4px 20px rgba(212,175,55,0.35)`,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Join Now
              </button>
            </Link>
            <Link href="/donate">
              <button
                className="px-7 py-3 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}
              >
                Donate
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 pb-14 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-10 mb-14">

          {/* Brand column — 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 20px rgba(212,175,55,0.2)`, transform: 'scale(1.4)' }} />
                <img
                  src={logoPath}
                  alt="Orakzai.org Logo"
                  className="relative w-13 h-13 rounded-full object-cover"
                  style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 14px rgba(212,175,55,0.3)`, width: 52, height: 52 }}
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

            {/* Social icons */}
            <div className="flex gap-2 pt-1 flex-wrap">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg group"
                  style={{
                    background: 'rgba(212,175,55,0.07)',
                    border: '1px solid rgba(212,175,55,0.18)',
                    color: 'rgba(212,175,55,0.65)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.65)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.18)'; (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.07)'; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-1">
            <FooterLinkList title="Quick Links" links={quickLinks} />
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <FooterLinkList title="Services" links={serviceLinks} />
          </div>

          {/* Impact */}
          <div className="lg:col-span-1">
            <FooterLinkList title="Impact" links={impactLinks} />
            <div className="mt-8">
              <FooterLinkList title="News" links={newsLinks} />
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            {/* Contact block */}
            <h3
              className="font-bold text-sm mb-4 uppercase tracking-[0.22em] flex items-center gap-2"
              style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
            >
              <span className="w-3 h-[1px] inline-block" style={{ background: GOLD }} />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span>Orakzai District, Khyber Pakhtunkhwa, Pakistan</span>
              </li>
              <li>
                <a href="tel:+923367970004" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                  <span>+92 336 7970004</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                </a>
              </li>
              <li>
                <a href="mailto:sonoforakzai@gmail.com" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                  <span>sonoforakzai@gmail.com</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full mb-6" style={{ background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.18), transparent)` }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs tracking-wider order-2 md:order-1">
            &copy; {new Date().getFullYear()} Orakzai.org — Digital Embassy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            {['Privacy Policy', 'Terms of Use', 'Transparency Report'].map((item) => (
              <a key={item} href="#" className="text-white/25 text-xs hover:text-white/55 transition-colors tracking-wider">{item}</a>
            ))}
          </div>
          <div className="text-white/20 text-xs tracking-wider order-3">
            Powered by{' '}
            <span className="font-semibold" style={{ color: `${GOLD}88` }}>Orakzai Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
