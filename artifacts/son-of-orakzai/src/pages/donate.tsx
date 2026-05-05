import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, HeartPulse, HandHeart, ShieldAlert, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

const donationCauses = [
  {
    id: "education",
    title: "Education Fund",
    icon: GraduationCap,
    description: "Support digital literacy and scholarships for deserving students in Orakzai.",
    color: "bg-blue-500/10 text-blue-600 border-blue-200"
  },
  {
    id: "health",
    title: "Health Support",
    icon: HeartPulse,
    description: "Fund free medical camps and life-saving treatments for remote areas.",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  },
  {
    id: "emergency",
    title: "Emergency Aid",
    icon: ShieldAlert,
    description: "Immediate relief funds for families affected by unforeseen crises.",
    color: "bg-destructive/10 text-destructive border-destructive/20"
  },
  {
    id: "general",
    title: "General Fund",
    icon: HandHeart,
    description: "Contribute to the overall operations and maintenance of our initiatives.",
    color: "bg-accent/10 text-accent border-accent/20"
  }
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between bg-muted/60 rounded-lg px-4 py-3 gap-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="font-mono font-semibold text-foreground text-sm break-all">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
        title="Copy"
      >
        {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function Donate() {
  return (
    <MainLayout>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Make a Difference
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 leading-relaxed"
          >
            Your contribution directly empowers the Orakzai community. Every donation is an investment in a brighter future.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12">

            {/* Causes */}
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-8">Choose a Cause</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {donationCauses.map((cause, i) => (
                  <motion.div
                    key={cause.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={`border-2 ${cause.color} shadow-sm hover:shadow-md transition-shadow h-full bg-white`}>
                      <CardHeader className="pb-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cause.color.split(' ')[0]} ${cause.color.split(' ')[1]}`}>
                          <cause.icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl font-bold font-display text-foreground">{cause.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{cause.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-6">

              {/* EasyPaisa */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardHeader className="pb-4 bg-gradient-to-r from-[#6DC04B] to-[#4CA836] text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">E</div>
                      <div>
                        <CardTitle className="text-white text-lg">EasyPaisa</CardTitle>
                        <p className="text-white/80 text-xs">Mobile Wallet Transfer</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    <CopyField label="Account Title" value="Muhammad Faisal" />
                    <CopyField label="EasyPaisa Number" value="03367970004" />
                    <p className="text-xs text-muted-foreground text-center pt-1">EasyPaisa app → Send Money → Mobile Account</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* JazzCash */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardHeader className="pb-4 bg-gradient-to-r from-[#EE3124] to-[#C41E14] text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">J</div>
                      <div>
                        <CardTitle className="text-white text-lg">JazzCash</CardTitle>
                        <p className="text-white/80 text-xs">Mobile Wallet Transfer</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    <CopyField label="Account Title" value="Muhammad Faisal" />
                    <CopyField label="JazzCash Number" value="03367970004" />
                    <p className="text-xs text-muted-foreground text-center pt-1">JazzCash app → Send Money → Mobile Account</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* UBL Bank */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardHeader className="pb-4 bg-gradient-to-r from-[#003087] to-[#00257A] text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">U</div>
                      <div>
                        <CardTitle className="text-white text-lg">UBL Bank Transfer</CardTitle>
                        <p className="text-white/80 text-xs">United Bank Limited</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    <CopyField label="Account Title" value="Muhammad Faisal" />
                    <CopyField label="Account Number" value="0909318870498" />
                    <CopyField label="IBAN Number" value="PK13UNIL0109000318870498" />
                    <p className="text-xs text-muted-foreground text-center pt-1">Use IBAN for online & international transfers</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Note */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center">
                <p className="text-sm text-foreground font-medium">After donation, please WhatsApp your receipt to</p>
                <p className="text-primary font-bold mt-1">+92 336 7970004</p>
                <p className="text-xs text-muted-foreground mt-1">for acknowledgment & tax certificate</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
