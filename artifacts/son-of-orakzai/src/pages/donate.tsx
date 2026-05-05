import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, HeartPulse, HandHeart, ShieldAlert, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

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
            Your contribution directly empowers the Orakzai community. Every donation is an investment in a brighter, more secure future for our people.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
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
                    <Card className={`border-2 ${cause.color} shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full bg-white`}>
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

            <div>
              <Card className="border-none shadow-xl sticky top-28 bg-white">
                <CardHeader className="bg-primary text-white rounded-t-xl pb-6">
                  <CardTitle className="text-2xl font-display">Donation Details</CardTitle>
                  <p className="text-primary-foreground/80 text-sm mt-1">Secure payment processing</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold text-foreground mb-2 block">Amount (PKR)</label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {["1,000", "5,000", "10,000"].map((amt) => (
                          <Button key={amt} variant="outline" className="border-border hover:border-primary hover:bg-primary/5 font-medium">
                            {amt}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">Rs.</span>
                        <Input placeholder="Other Amount" className="pl-12 h-12 text-lg font-bold" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-foreground mb-2 block">Payment Method</label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary">
                          <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary">
                          <div className="w-4 h-4 rounded-full border border-border" />
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary">
                          <div className="w-4 h-4 rounded-full border border-border" />
                          <span className="font-medium">Easypaisa / JazzCash</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-lg rounded-xl shadow-lg">
                    Proceed to Payment <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
        </div>
      </section>
    </MainLayout>
  );
}
