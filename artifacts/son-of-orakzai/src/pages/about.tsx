import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Shield, BookOpen, Clock } from "lucide-react";

const timeline = [
  { year: "2015", title: "Foundation", desc: "Son Of Orakzai was established with a vision to unite the community." },
  { year: "2018", title: "Education Initiative", desc: "Launched the first scholarship program for deserving students." },
  { year: "2020", title: "Health Camps", desc: "Started regular free medical camps across the district." },
  { year: "2023", title: "Digital Era", desc: "Launched the Digital Skill Lab to empower youth with modern skills." },
];

export default function About() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            Son Of Orakzai is more than an organization; it is a movement. Born from a deep love for our homeland, we strive to build a future where every member of the Orakzai community is empowered, educated, and prosperous.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-primary mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To uplift the Orakzai community by providing accessible education, quality healthcare, and a platform for collective representation. We aim to bridge the gap between tradition and modern progress.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg bg-primary text-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">Our Vision</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    A united, empowered, and progressive Orakzai district where every individual has the opportunity to thrive and contribute to the global society while holding fast to their cultural roots.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide our every action and decision.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Unity", desc: "We believe our strength lies in our togetherness." },
              { icon: Heart, title: "Service", desc: "Selfless service to our community is our highest calling." },
              { icon: Target, title: "Empowerment", desc: "Equipping our people with the tools they need to succeed." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                  <value.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 font-display">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary text-center mb-16">Our Journey</h2>
          
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold shadow-lg z-10">
                    <Clock className="w-5 h-5" />
                  </div>
                  {i !== timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-4" />}
                </div>
                <div className="pb-12 pt-2">
                  <h3 className="text-2xl font-bold text-primary mb-1 font-display">
                    <span className="text-accent mr-3">{item.year}</span> 
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
