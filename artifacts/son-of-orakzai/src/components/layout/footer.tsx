import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
const logoPath = "https://api.dicebear.com/7.x/initials/svg?seed=SOO&backgroundColor=064e3b&textColor=D4AF37";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src={logoPath} 
                alt="Son of Orakzai Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-accent bg-white"
              />
              <span className="font-display font-bold text-xl tracking-tight text-white">
                SON OF ORAKZAI
              </span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed max-w-xs text-sm">
              A digital homeland where tradition meets progress, and every member is seen, heard, and empowered.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">About Us</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Our Services</Link></li>
              <li><Link href="/community" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Community</Link></li>
              <li><Link href="/impact" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Our Impact</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">News & Updates</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6 text-white">Initiatives</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Digital Skill Lab</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Sehat-e-Orakzai</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Jirga-e-Naujawan</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Talent Hunt</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors inline-block">Imdad-e-Bahan</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Orakzai District, Khyber Pakhtunkhwa, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+92 336 7970004</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>sonoforakzai@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Son Of Orakzai. All rights reserved.
          </p>
          <div className="text-primary-foreground/60 text-sm">
            Powered by <span className="font-semibold text-accent">Orakzai Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
