import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { useListBlogPosts } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts();

  return (
    <MainLayout>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            News & Updates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 leading-relaxed"
          >
            Stay informed about the latest developments, stories, and impact from the Son Of Orakzai community.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            <Badge variant="default" className="px-4 py-2 bg-primary hover:bg-primary text-white cursor-pointer rounded-full text-sm">All Categories</Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-muted cursor-pointer rounded-full text-sm font-medium">Education</Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-muted cursor-pointer rounded-full text-sm font-medium">Healthcare</Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-muted cursor-pointer rounded-full text-sm font-medium">Development</Badge>
            <Badge variant="outline" className="px-4 py-2 hover:bg-muted cursor-pointer rounded-full text-sm font-medium">Peace</Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Card key={i} className="border-none shadow-md overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-4" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex"
                >
                  <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white overflow-hidden flex flex-col group w-full">
                    {post.imageUrl ? (
                      <div className="w-full h-48 overflow-hidden relative">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent text-accent-foreground font-bold hover:bg-accent">{post.category}</Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center relative">
                        <span className="text-muted-foreground font-display font-bold text-xl opacity-50">Son Of Orakzai</span>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent text-accent-foreground font-bold hover:bg-accent">{post.category}</Badge>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="p-6 pb-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                      </div>
                      <CardTitle className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-6 pt-2 flex-1">
                      <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="p-6 pt-0 border-t border-border/50 mt-auto">
                      <Button variant="ghost" className="w-full justify-between p-0 hover:bg-transparent text-primary font-semibold hover:text-accent group/btn">
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-2">No posts available</h3>
              <p className="text-muted-foreground">Check back later for updates and news.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
