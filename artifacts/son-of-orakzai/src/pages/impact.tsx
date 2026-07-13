import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, GraduationCap, HeartPulse, MapPin, HandHeart, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ImpactStats {
  totalMembers: number;
  studentsTrainedCount: number;
  healthCasesCount: number;
  districtsReached: number;
  volunteerCount: number;
  projectsCompleted: number;
}

const mockChartData = [
  { name: '2020', members: 200, students: 50, health: 10 },
  { name: '2021', members: 450, students: 120, health: 25 },
  { name: '2022', members: 800, students: 250, health: 45 },
  { name: '2023', members: 1200, students: 450, health: 85 },
  { name: '2024', members: 2000, students: 700, health: 130 },
];

export default function Impact() {
  const [stats, setStats] = useState<ImpactStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { count: totalMembers } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });

      setStats({
        totalMembers: totalMembers || 2850,
        studentsTrainedCount: 360,
        healthCasesCount: 120,
        districtsReached: 8,
        volunteerCount: 860,
        projectsCompleted: 18,
      });
      setIsLoading(false);
    }
    fetchStats();
  }, []);

  const statItems = stats ? [
    { icon: Users, label: "Total Members", value: stats.totalMembers },
    { icon: GraduationCap, label: "Students Trained", value: stats.studentsTrainedCount },
    { icon: HeartPulse, label: "Health Cases", value: stats.healthCasesCount },
    { icon: MapPin, label: "Districts Reached", value: stats.districtsReached },
    { icon: HandHeart, label: "Volunteers", value: stats.volunteerCount },
    { icon: CheckCircle2, label: "Projects Completed", value: stats.projectsCompleted },
  ] : [];

  return (
    <MainLayout>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Our Impact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 leading-relaxed"
          >
            Transparency is at our core. See how your contributions and our collective efforts are transforming the Orakzai district.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {statItems.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-display font-bold text-primary mb-1">{stat.value.toLocaleString()}+</h3>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                      <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="members" name="Members" fill="hsl(162 70% 14%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="students" name="Students" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Annual Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[2024, 2023, 2022].map((year) => (
                  <div key={year} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-bold text-foreground">Annual Impact Report {year}</h4>
                      <p className="text-sm text-muted-foreground">Detailed financial and impact breakdown</p>
                    </div>
                    <button className="text-primary font-medium text-sm hover:underline">
                      Download PDF
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
