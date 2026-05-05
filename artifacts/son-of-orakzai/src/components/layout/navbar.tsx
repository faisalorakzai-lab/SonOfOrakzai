import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/FB_IMG_1778008183981_1778010398977.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 dark:bg-card/95"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={logoPath} 
              alt="Son of Orakzai Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary"
            />
            <span className={cn(
              "font-display font-bold text-lg md:text-xl tracking-tight",
              isScrolled ? "text-primary" : "text-primary dark:text-primary-foreground drop-shadow-md"
            )}>
              SON OF ORAKZAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "font-medium text-sm transition-colors hover:text-accent cursor-pointer",
                  location === link.href 
                    ? "text-accent" 
                    : isScrolled ? "text-foreground" : "text-foreground"
                )}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>EN | UR | PS</span>
            </div>
            <Link href="/join">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                Join Now
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-foreground p-2"
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
            className="lg:hidden bg-background border-t mt-3 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-foreground font-medium text-lg cursor-pointer block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link href="/join">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Join Now
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
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
