import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { useListMembers, getListMembersQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Only show approved members
  const { data: members, isLoading } = useListMembers(
    { status: "approved", search: searchQuery || undefined },
    { query: { queryKey: getListMembersQueryKey({ status: "approved", search: searchQuery || undefined }) } }
  );

  return (
    <MainLayout>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Our Community
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 leading-relaxed"
          >
            Connect with the bright minds and dedicated individuals of the Orakzai district. Together, we are stronger.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <h2 className="text-2xl font-display font-bold text-primary">Member Directory</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, profession, or skills..." 
                className="pl-10 h-12 bg-white rounded-full shadow-sm border-border focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-none shadow-md overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : members && members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white overflow-hidden h-full flex flex-col">
                    <div className="h-2 w-full bg-accent" />
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-xl uppercase shrink-0">
                          {member.name.charAt(0)}{member.name.split(' ').length > 1 ? member.name.split(' ')[1].charAt(0) : ''}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-primary leading-tight">{member.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{member.profession}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mt-auto text-sm text-foreground/80">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{member.location}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Briefcase className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{member.interest}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Award className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{member.skills}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">No members found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any members matching your search query. Try adjusting your search terms.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
