import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown, MapPin, TrendingUp, Newspaper, Users, GraduationCap, Heart, Briefcase, BarChart2, BookOpen, Phone, Info, UserCheck, ShieldCheck, Scale, HandHeart, HeartPulse, Sparkles, Dumbbell, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#D4AF37";
const logoPath = "/orakzai-org-logo.png";

type NavIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/* ── Dropdown data ── */
const dropdownMenus: Record<string, { href: string; label: string; icon: NavIcon; desc: string }[]> = {
  "About Us": [
    { href: "/about", label: "Our Story", icon: Info, desc: "The legacy of Orakzai" },
    { href: "/team", label: "Leadership", icon: UserCheck, desc: "Meet our visionaries" },
    { href: "/impact", label: "Mission & Vision", icon: TrendingUp, desc: "What drives us forward" },
  ],
  "Our Impact": [
    { href: "/impact", label: "Impact Reports", icon: BarChart2, desc: "Annual transparency reports" },
    { href: "/impact", label: "Education Programs", icon: GraduationCap, desc: "Students trained & placed" },
    { href: "/impact", label: "Health Outreach", icon: Heart, desc: "Medical cases resolved" },
    { href: "/community", label: "Community Stories", icon: Users, desc: "Real change, real people" },
  ],
  "Services": [
    { href: "/migrant-welfare", label: "Migrant Welfare & Diaspora Protection Fund", icon: ShieldCheck, desc: "Premium member protection & repatriation" },
    { href: "/rights-representation", label: "Rights & Representation", icon: Scale, desc: "Legal advocacy & representation" },
    { href: "/education-scholarships", label: "Education & Global Scholarships", icon: GraduationCap, desc: "Scholarships & training" },
    { href: "/social-welfare-relief", label: "Social Welfare & Crisis Relief", icon: HandHeart, desc: "Humanitarian & emergency aid" },
    { href: "/economic-innovation-grants", label: "Economic Innovation & Grants", icon: TrendingUp, desc: "Business grants & entrepreneurship" },
    { href: "/global-diaspora-network", label: "Global Diaspora Network", icon: Globe, desc: "Connecting Orakzai worldwide" },
    { href: "/healthcare-infrastructure", label: "Healthcare Infrastructure & Access", icon: HeartPulse, desc: "Medical support programs" },
    { href: "/women-empowerment-artisans", label: "Women Empowerment & Artisans", icon: Sparkles, desc: "Vocational training for women" },
    { href: "/youth-sports-development", label: "Youth & Sports Development", icon: Dumbbell, desc: "Academies & mentorship" },
    { href: "/clean-water-sanitation", label: "Clean Water & Sanitation", icon: Droplet, desc: "WASH infrastructure projects" },
    { href: "/services", label: "Emergency  & Health", icon: desc: "Rapid response & mobile clinics" },
  ],
  "News & Updates": [
    { href: "/blog", label: "Latest News", icon: Newspaper, desc: "Breaking updates" },
    { href: "/blog", label: "Press Room", icon: BookOpen, desc: "Media & publications" },
    { href: "/blog", label: "Events", icon: Users, desc: "Upcoming gatherings" },
  ],
};

const topNavItems = [
  { href: "/", label: "Home", dropdown: null },
  { href: "/about", label: "About Us", dropdown: "About Us" },
  { href: "/impact", label: "Our Impact", dropdown: "Our Impact" },
  { href: "/services", label: "Services", dropdown: "Services" },
  { href: "/blog", label: "News & Updates", dropdown: "News & Updates" },
  { href: "/contact", label: "Contact", dropdown: null },
];

function DropdownPanel({ items }: { items: { href: string; label: string; icon: NavIcon; desc: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[260px] rounded-2xl overflow-hidden z-[100]"
      style={{
        background: "rgba(1, 20, 12, 0.97)",
        backdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(212,175,55,0.22)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.05) inset",
      }}
    >
      {/* Gold top accent line */}
      <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href}>
              <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all group hover:bg-[rgba(212,175,55,0.07)]">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:scale-110"
                  style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium leading-tight group-hover:text-yellow-300 transition-colors">{item.label}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-tight">{item.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500")}
      style={{
        background: isScrolled ? "rgba(1,18,10,0.88)" : "rgba(1,18,10,0.22)",
        backdropFilter: "blur(22px) saturate(160%)",
        WebkitBackdropFilter: "blur(22px) saturate(160%)",
        borderBottom: isScrolled ? "1px solid rgba(212,175,55,0.20)" : "1px solid rgba(212,175,55,0.07)",
        boxShadow: isScrolled ? "0 6px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(212,175,55,0.08) inset" : "none",
        padding: isScrolled ? "8px 0" : "14px 0",
      }}
    >
      {/* Subtle top gold pinstripe */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD}55 30%, ${GOLD}88 50%, ${GOLD}55 70%, transparent 100%)` }} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: `radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)`, transform: 'scale(1.4)' }} />
              <img
                src={logoPath}
                alt="Orakzai.org Logo"
                className="relative w-11 h-11 md:w-13 md:h-13 rounded-full object-cover"
                style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 16px rgba(212,175,55,0.35), 0 0 4px rgba(212,175,55,0.6) inset` }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base md:text-lg tracking-[0.15em] text-white uppercase block" style={{ fontFamily: "'Playfair Display', serif" }}>
                Orakzai.org
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase block" style={{ color: GOLD, opacity: 0.7 }}>Digital Embassy</span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {topNavItems.map((item) => {
              const isActive = location === item.href;
              const hasDropdown = item.dropdown && dropdownMenus[item.dropdown];
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.href}>
                    <span
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap",
                        isActive ? "text-yellow-300" : "text-white/70 hover:text-white"
                      )}
                      style={isActive ? { color: GOLD } : {}}
                    >
                      {item.label}
                      {hasDropdown && (
                        <ChevronDown
                          className="w-3 h-3 transition-transform duration-200"
                          style={{ transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)", color: openDropdown === item.label ? GOLD : "inherit" }}
                        />
                      )}
                    </span>
                  </Link>
                  {hasDropdown && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <DropdownPanel items={dropdownMenus[item.dropdown!]} />
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)" }}>
              <Globe className="w-3 h-3" style={{ color: GOLD }} />
              <span className="text-[11px] font-semibold tracking-widest text-white/50">EN | UR | PS</span>
            </div>
            <Link
              href="/join"
              className="font-bold px-7 h-9 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center"
              style={{
                background: `linear-gradient(135deg, #b8860b 0%, ${GOLD} 40%, #f5e07a 70%, ${GOLD} 100%)`,
                backgroundSize: "200% auto",
                color: "#011a10",
                border: "none",
                boxShadow: `0 4px 20px rgba(212,175,55,0.4)`,
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.04em",
              }}
            >
              Become a Member
            </Link>
            <Link
              href="/donate"
              className="font-semibold px-5 h-9 rounded-full text-sm text-white transition-all hover:-translate-y-0.5 inline-flex items-center"
              style={{ borderColor: "rgba(212,175,55,0.35)", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.35)" }}
            >
              Donate
            </Link>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            className="xl:hidden text-white p-2 rounded-lg transition-colors"
            style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.15)" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" style={{ color: GOLD }} /> : <Menu className="w-5 h-5" style={{ color: GOLD }} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE NAV ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden"
            style={{ background: "rgba(0,12,7,0.99)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(212,175,55,0.15)" }}
          >
            <div className="flex flex-col p-4 gap-1 max-h-[80vh] overflow-y-auto">
              {topNavItems.map((item) => {
                const hasDropdown = item.dropdown && dropdownMenus[item.dropdown];
                const isOpen = mobileOpenDropdown === item.label;
                return (
                  <div key={item.label}>
                    <div
                      className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer"
                      style={{ color: location === item.href ? GOLD : "rgba(255,255,255,0.75)" }}
                      onClick={() => {
                        if (hasDropdown) {
                          setMobileOpenDropdown(isOpen ? null : item.label);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      <Link href={item.href} onClick={() => !hasDropdown && setIsMobileMenuOpen(false)}>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                      {hasDropdown && (
                        <ChevronDown
                          className="w-4 h-4 transition-transform"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", color: GOLD }}
                        />
                      )}
                    </div>
                    {hasDropdown && isOpen && (
                      <div className="ml-4 pl-4 border-l border-[rgba(212,175,55,0.15)] space-y-1 mb-2">
                        {dropdownMenus[item.dropdown!].map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link key={sub.label} href={sub.href}>
                              <div
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                                <span className="text-xs font-medium">{sub.label}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="h-px my-2" style={{ background: "rgba(212,175,55,0.1)" }} />
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full font-bold rounded-full h-11 flex items-center justify-center text-sm"
                style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD})`, color: "#011a10", border: "none" }}
              >
                Become a Member
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full font-semibold rounded-full h-10 mt-1 flex items-center justify-center text-sm text-white"
                style={{ border: "1px solid rgba(212,175,55,0.35)", background: "rgba(212,175,55,0.06)" }}
              >
                Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
