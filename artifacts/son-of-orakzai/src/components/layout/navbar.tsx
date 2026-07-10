import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Home, Info, Briefcase, Users, UserCheck, BarChart2, BookOpen, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#D4AF37";
const logoPath = "/orakzai-org-logo.png";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/community", label: "Community", icon: Users },
  { href: "/team", label: "Team", icon: UserCheck },
  { href: "/impact", label: "Impact", icon: BarChart2 },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        isScrolled ? "py-2.5" : "py-4"
      )}
      style={{
        background: isScrolled ? 'rgba(1, 26, 16, 0.72)' : 'rgba(1, 26, 16, 0.32)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        borderBottom: isScrolled ? '1px solid rgba(212,175,55,0.18)' : '1px solid rgba(212,175,55,0.06)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <img
                src={logoPath}
                alt="Orakzai.org Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 12px rgba(212,175,55,0.3)` }}
              />
            </div>
            <span
              className="font-bold text-lg md:text-xl tracking-widest text-white uppercase"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.12em' }}
            >
              Orakzai.org
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-white/65 hover:text-white"
                    )}
                    style={isActive ? { color: GOLD } : {}}
                  >
                    <Icon className="w-3.5 h-3.5 opacity-70" />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-medium text-white/40 tracking-widest">
              <Globe className="w-3.5 h-3.5" />
              <span>EN | UR | PS</span>
            </div>
            <Link href="/join">
              <Button
                className="font-bold px-6 rounded-full text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, #b8860b, ${GOLD}, #f5e07a, ${GOLD})`,
                  backgroundSize: '200% auto',
                  color: '#011a10',
                  border: 'none',
                  boxShadow: `0 2px 16px rgba(212,175,55,0.3)`,
                }}
              >
                Join Now
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                variant="outline"
                className="font-semibold px-6 rounded-full text-sm text-white hover:text-white transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: `rgba(212,175,55,0.4)`,
                  background: 'rgba(212,175,55,0.06)',
                }}
              >
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden mt-3"
            style={{
              background: 'rgba(1, 26, 16, 0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-colors"
                      style={{ color: isActive ? GOLD : 'rgba(255,255,255,0.7)' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <div className="h-px my-2" style={{ background: 'rgba(212,175,55,0.1)' }} />
              <Link href="/join">
                <Button
                  className="w-full font-bold rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
                    color: '#011a10',
                    border: 'none',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Now
                </Button>
              </Link>
              <Link href="/donate">
                <Button
                  variant="outline"
                  className="w-full font-semibold rounded-full text-white hover:text-white"
                  style={{ borderColor: `rgba(212,175,55,0.4)`, background: 'rgba(212,175,55,0.06)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Donate
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
