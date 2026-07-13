import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, GraduationCap, HandHeart, TrendingUp, Globe, HeartPulse, Sparkles, Dumbbell, Droplet, Ambulance, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const services = [
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
  },
  {
    id: "rights-representation",
    title: "Rights & Representation",
    icon: Scale,
    description: "Legal advocacy and institutional representation dedicated to protecting the rights, interests, and collective voice of Orakzai communities worldwide.",
    metric: "120+ Cases Represented"
  },
  {
    id: "education-global-scholarships",
    title: "Education & Global Scholarships",
    icon: GraduationCap,
    description: "Scholarships, mentorship, leadership development, and international educational pathways that empower the next generation of Orakzai students.",
    metric: "360+ Students in 12 Cities"
  },
  {
    id: "social-welfare-crisis-relief",
    title: "Social Welfare & Crisis Relief",
    icon: HandHeart,
    description: "Humanitarian assistance, poverty alleviation, emergency response initiatives, and sustainable support systems for vulnerable families.",
    metric: "3,100+ Families Supported"
  },
  {
    id: "economic-innovation-grants",
    title: "Economic Innovation & Grants",
    icon: TrendingUp,
    description: "Interest-free business grants, entrepreneurship support, digital innovation, and local economic development designed to strengthen community prosperity.",
    metric: "340+ Grants Disbursed"
  },
  {
    id: "global-diaspora-network",
    title: "Global Diaspora Network",
    icon: Globe,
    description: "Connecting Orakzai professionals, families, entrepreneurs, and organizations across Pakistan, the Gulf, Europe, North America, and beyond.",
    metric: "14+ Countries, 8 Active Chapters"
  },
  {
    id: "healthcare-infrastructure-access",
    title: "Healthcare Infrastructure & Access",
    icon: HeartPulse,
    description: "Supporting modern healthcare initiatives through mobile clinics, clean water projects, preventive care, and improved medical accessibility in underserved regions.",
    metric: "120+ Health Cases Resolved"
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
