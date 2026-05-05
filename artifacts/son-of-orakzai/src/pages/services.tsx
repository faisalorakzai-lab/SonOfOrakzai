import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, HeartPulse, Scale, Trophy, HandHeart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "digital-skill-lab",
    title: "Digital Skill Lab",
    icon: Monitor,
    description: "Empowering youth with modern digital skills including AI, Freelancing, Web Development, and Graphic Design to compete in the global market.",
    features: ["6-Month Intensive Bootcamps", "Freelancing Mentorship", "AI & Tech Workshops"]
  },
  {
    id: "sehat-e-orakzai",
    title: "Sehat-e-Orakzai",
    icon: HeartPulse,
    description: "Bringing accessible healthcare to remote areas through telemedicine platforms and organizing free medical camps with specialist doctors.",
    features: ["Free Medical Camps", "Telemedicine Portal", "Maternal Health Support"]
  },
  {
    id: "jirga-e-naujawan",
    title: "Jirga-e-Naujawan",
    icon: Scale,
    description: "A modern complaint and resolution portal where community issues are addressed collectively by youth and elders in a transparent manner.",
    features: ["Online Complaint Registration", "Community Mediations", "Legal Awareness Sessions"]
  },
  {
    id: "talent-hunt",
    title: "Talent Hunt",
    icon: Trophy,
    description: "Identifying and nurturing hidden talent in sports, arts, and academics across the district through organized competitions and awards.",
    features: ["Annual Sports Festival", "Academic Excellence Awards", "Cultural Arts Exhibitions"]
  },
  {
    id: "imdad-e-bahan",
    title: "Imdad-e-Bahan",
    icon: HandHeart,
    description: "A centralized donation and support system providing immediate relief during emergencies and sustained support for deserving families.",
    features: ["Emergency Relief Funds", "Widow Support Program", "Educational Scholarships"]
  }
];

export default function Services() {
  return (
    <MainLayout>
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Our Initiatives
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            Comprehensive programs designed to address the core needs of the Orakzai community, from healthcare and education to digital empowerment.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all group overflow-hidden bg-white">
                  <div className="h-2 bg-accent w-0 group-hover:w-full transition-all duration-500" />
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl font-display font-bold text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-sm font-medium text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-white group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
