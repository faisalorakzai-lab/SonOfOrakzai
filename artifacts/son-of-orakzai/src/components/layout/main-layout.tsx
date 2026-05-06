import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Phone } from "lucide-react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        {children}
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/923367970004" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#022c22] hover:bg-[#064e3b] text-[#D4AF37] p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#D4AF37]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center group"
      >
        <Phone className="w-6 h-6 fill-[#D4AF37]" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </a>
    </div>
  );
}
