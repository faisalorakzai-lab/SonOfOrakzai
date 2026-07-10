import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Info, Briefcase, Users, BarChart2, BookOpen, CheckCircle2 } from "lucide-react";

const GOLD = "#D4AF37";
const logoPath = "/orakzai-org-logo.png";

const offices = [
  { city: "Karachi", country: "National HQ", address: "Main Karachi Office" },
  { city: "Kohat", country: "KP Region", address: "Kohat District" },
  { city: "Hangu", country: "KP Region", address: "Hangu District" },
  { city: "Ghaljo", country: "Headquarters", address: "Orakzai District" },
];

const quickLinks = [
  { href: "/about", label: "About Us", icon: Info },
  { href: "/services", label: "Our Services", icon: Briefcase },
  { href: "/community", label: "Community", icon: Users },
  { href: "/impact", label: "Our Impact", icon: BarChart2 },
  { href: "/blog", label: "News & Updates", icon: BookOpen },
];

export function Footer() {
  return (
    <footer
      className="text-white pt-16 pb-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #011a10 0%, #000d08 100%)' }}
    >
      {/* Top gold rule */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />

      {/* Subtle pattern */}
      <div className="absolute inset-0 orakzai-pattern opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand + Verified badge */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={logoPath}
                alt="Orakzai.org Logo"
                className="w-12 h-12 rounded-full object-cover"
                style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 10px rgba(212,175,55,0.3)` }}
              />
              <div>
                <span
                  className="font-bold text-lg tracking-widest text-white block uppercase"
                  style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.1em' }}
                >
                  Orakzai.org
                </span>
                <span className="text-white/40 text-xs tracking-widest">Digital Embassy</span>
              </div>
            </Link>

            {/* Verified Institution badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.3)',
                boxShadow: '0 0 16px rgba(212,175,55,0.1)',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, #b8860b, ${GOLD})`,
                  boxShadow: `0 0 10px rgba(212,175,55,0.4)`,
                }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: '#011a10' }} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>Verified Institution</p>
                <p className="text-white/30 text-xs">Registered NGO · Pakistan</p>
              </div>
            </div>

            <p className="text-white/50 leading-relaxed text-sm">
              A digital homeland where tradition meets progress, and every member is seen, heard, and empowered.
            </p>

            <div className="flex gap-3 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: GOLD }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links with icons */}
          <div>
            <h3
              className="font-bold text-sm mb-6 uppercase tracking-[0.2em]"
              style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2.5 text-white/55 hover:text-white transition-colors text-sm group"
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-yellow-400 transition-colors" style={{ color: 'rgba(212,175,55,0.5)' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h3
              className="font-bold text-sm mb-6 uppercase tracking-[0.2em]"
              style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
            >
              Global Offices
            </h3>
            <ul className="space-y-4">
              {offices.map((office) => (
                <li key={office.city} className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <div>
                    <p className="text-white text-sm font-semibold">{office.city}</p>
                    <p className="text-white/35 text-xs">{office.country}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-bold text-sm mb-6 uppercase tracking-[0.2em]"
              style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/55 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span>Orakzai District, Khyber Pakhtunkhwa, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-white/55 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                <span>+92 336 7970004</span>
              </li>
              <li className="flex items-center gap-3 text-white/55 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
                <span>sonoforakzai@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
        >
          <p className="text-white/30 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Son Of Orakzai. All rights reserved.
          </p>
          <div className="text-white/30 text-xs tracking-wider">
            Powered by <span className="font-semibold" style={{ color: GOLD }}>Orakzai Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
