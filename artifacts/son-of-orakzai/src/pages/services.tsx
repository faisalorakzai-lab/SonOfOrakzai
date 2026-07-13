import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, HeartPulse, Scale, Trophy, HandHeart, ArrowRight, Sparkles, Dumbbell, Droplet, Ambulance, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  },
  {
    id: "women-empowerment-artisans",
    title: "Women Empowerment & Skilled Artisans Support",
    icon: Sparkles,
    description: "Launching dedicated vocational training centers, healthcare programs, and marketplace infrastructure to empower women and support local small-scale artisans.",
    metric: "450+ Beneficiaries Enrolled"
  },
  {
    id: "youth-sports-development",
    title: "Youth Development & Sports Infrastructure",
    icon: Dumbbell,
    description: "Establishing local sports academies, youth mentorship programs, and constructive recreational facilities to engage the younger generation and promote healthy community development.",
    metric: "15+ Sports Facilities Supported"
  },
  {
    id: "clean-water-sanitation",
    title: "Clean Water & Sanitation (WASH)",
    icon: Droplet,
    description: "Installing solar-powered water filtration plants and modern tube wells in remote areas to ensure access to safe, clean drinking water and hygienic sanitation systems.",
    metric: "80+ Clean Water Points Installed"
  },
  {
    id: "emergency-ambulance-health",
    title: "Emergency Ambulance & Mobile Health",
    icon: Ambulance,
    description: "Deploying fully equipped free ambulance services and mobile healthcare vans to provide immediate emergency response and basic medical care to far-flung rural areas.",
    metric: "2,400+ Emergency Dispatches"
  },
  {
    id: "migrant-welfare-protection",
    title: "Migrant Welfare & Diaspora Protection Fund",
    icon: ShieldCheck,
    description: "A dedicated premium community membership program for Orakzai migrants globally and domestically, providing complete healthcare coverage, repatriation services, and family security systems.",
    metric: "100% Comprehensive Coverage",
    modalDetails: {
      about: "This pillar operates a sovereign community-backed protection fund tailored exclusively for Orakzai travelers, laborers, and diaspora members working away from home.",
      membershipTiers: [
        {
          tierName: "Basic Protection Package",
          monthlyContribution: "1,000 PKR",
          benefits: [
            "Complete coverage for medical expenditures exceeding 100,000 PKR.",
            "In the unfortunate event of demise, complete coverage for body repatriation/transportation back to the Orakzai ancestral land.",
            "Full institutional management and funding for official funeral (Gaur-o-Kafan) arrangements."
          ]
        },
        {
          tierName: "Elite Family Security Package",
          monthlyContribution: "2,000 PKR",
          benefits: [
            "Includes all benefits of the Basic Protection Package (Medical over 100k, Repatriation, and Funeral coverage).",
            "Post-demise sustainable family protection fund and direct financial security grants disbursed by Orakzai.org to the dependent family."
          ]
        }
      ]
    }
  }
];

export default function Services() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const activeService = services.find((s) => s.id === activeModal);

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
                    {service.features && (
                      <ul className="space-y-2 mb-8">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-center text-sm font-medium text-foreground/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    {service.metric && (
                      <div className="mb-8 inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-primary">
                        {service.metric}
                      </div>
                    )}
                    {service.modalDetails ? (
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:bg-primary hover:text-white group/btn"
                        onClick={() => setActiveModal(service.id)}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-white group/btn">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!activeModal} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl">
          {activeService?.modalDetails && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-primary">{activeService.title}</DialogTitle>
                <DialogDescription className="text-base pt-2">{activeService.modalDetails.about}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-2">
                {activeService.modalDetails.membershipTiers.map((tier, i) => (
                  <div key={i} className="rounded-xl border p-5 bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-bold text-lg text-primary">{tier.tierName}</h4>
                      <span className="text-sm font-bold text-accent">{tier.monthlyContribution}/month</span>
                    </div>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-accent shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
