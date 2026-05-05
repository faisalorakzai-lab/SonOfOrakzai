import { Link } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, GraduationCap, ChevronRight, ArrowRight, Activity, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import founderPath from "@assets/IMG-20260506-WA0000_1778010673889.jpg";
import chairmanPath from "@assets/a41d2ef1-fb04-40f8-bd66-df98ff195782_1778010706098.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 z-10" />
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2940&auto=format&fit=crop')`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-block mb-4 px-4 py-1.5 bg-accent/20 border border-accent/50 rounded-full">
                <span className="text-accent font-semibold tracking-wider text-sm uppercase">Sada-e-Orakzai</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
                Mutahid, Ba-Ikhtiyar, <br />
                <span className="text-accent">Taraqi-Yafta</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
                A digital homeland where tradition meets progress, and every member of the Orakzai community is seen, heard, and empowered.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/join">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 h-14 rounded-full text-lg">
                    Join the Movement
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 h-14 rounded-full text-lg">
                    Our Story
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-background relative z-20 -mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Users, label: "Registered Members", value: "1,200+", color: "bg-blue-500/10 text-blue-600" },
              { icon: GraduationCap, label: "Students Trained", value: "450+", color: "bg-accent/10 text-accent" },
              { icon: Activity, label: "Health Cases Resolved", value: "85+", color: "bg-destructive/10 text-destructive" }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className={`p-4 rounded-2xl ${stat.color}`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-foreground font-display">{stat.value}</p>
                      <p className="text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">Our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Guided by visionaries dedicated to the upliftment and prosperity of the Orakzai people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-none shadow-xl group">
                <div className="relative h-[400px]">
                  <img src={founderPath} alt="Malak Speen Gul Orakzai" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-2 text-accent font-semibold tracking-wider text-sm uppercase">Founder & Former MNA</div>
                    <h3 className="text-3xl font-display font-bold mb-2">Malak Speen Gul Orakzai</h3>
                    <p className="text-white/80 line-clamp-2">A lifelong advocate for the rights and development of the Orakzai district, building bridges between tradition and modernity.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-none shadow-xl group">
                <div className="relative h-[400px]">
                  <img src={chairmanPath} alt="Faisal Orakzai" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-2 text-accent font-semibold tracking-wider text-sm uppercase">Chairman</div>
                    <h3 className="text-3xl font-display font-bold mb-2">Faisal Orakzai</h3>
                    <p className="text-white/80 line-clamp-2">Spearheading digital initiatives and youth empowerment programs to prepare the next generation for global opportunities.</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              Apni Matti, Apne Log <br/>
              <span className="text-accent">— Son Of Orakzai</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Join hands with us to build a stronger, educated, and prosperous community. Your participation matters.
            </p>
            <Link href="/join">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-10 h-16 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all">
                Become a Member Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
