import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateMember } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight, ChevronLeft, QrCode } from "lucide-react";
import logoPath from "@assets/FB_IMG_1778008183981_1778010398977.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, "Format: 12345-1234567-1"),
  phone: z.string().min(11, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(2, "Location is required"),
  profession: z.string().min(2, "Profession is required"),
  skills: z.string().min(2, "Skills are required"),
  interest: z.string().min(2, "Interest is required"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Join() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [memberData, setMemberData] = useState<any>(null);
  const { toast } = useToast();
  
  const createMember = useCreateMember();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      cnic: "",
      phone: "",
      email: "",
      location: "",
      profession: "",
      skills: "",
      interest: "",
      message: "",
    },
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["name", "fatherName", "cnic"]);
    } else if (step === 2) {
      isValid = await form.trigger(["phone", "email", "location"]);
    } else if (step === 3) {
      isValid = await form.trigger(["profession", "skills", "interest"]);
    }
    
    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const onSubmit = (data: FormValues) => {
    createMember.mutate({ data }, {
      onSuccess: (response) => {
        setIsSuccess(true);
        setMemberData(response);
        toast({
          title: "Application Submitted Successfully",
          description: "Welcome to Son of Orakzai. Your membership is pending approval.",
        });
      },
      onError: () => {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <MainLayout>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Join the Movement
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 leading-relaxed"
          >
            Become a part of the Son of Orakzai community. Your skills, voice, and presence matter.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          
          {isSuccess && memberData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto"
            >
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-bold text-primary mb-2">Application Received!</h2>
                <p className="text-muted-foreground text-lg">
                  Thank you for joining. Your digital membership card is being processed.
                </p>
              </div>

              {/* Digital Membership Card Mock */}
              <Card className="border-none shadow-2xl overflow-hidden bg-gradient-to-br from-primary to-primary/90 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-3">
                      <img src={logoPath} alt="Logo" className="w-12 h-12 rounded-full border-2 border-accent" />
                      <div>
                        <h3 className="font-display font-bold text-lg leading-none">SON OF ORAKZAI</h3>
                        <p className="text-accent text-xs font-semibold uppercase tracking-wider">Membership Card</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Status</p>
                      <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-full text-xs font-bold uppercase">
                        Pending
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-6 items-end">
                    <div>
                      <div className="mb-6">
                        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Member Name</p>
                        <p className="text-2xl font-bold font-display uppercase tracking-wide">{memberData.name}</p>
                      </div>
                      
                      <div className="flex gap-8">
                        <div>
                          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Member ID</p>
                          <p className="font-mono font-medium">{String(memberData.id).padStart(6, '0')}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Joined</p>
                          <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-2 rounded-lg">
                      <QrCode className="w-20 h-20 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="border-none shadow-xl bg-white">
              <CardContent className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className={step >= 1 ? "text-primary" : "text-muted-foreground"}>Identity</span>
                    <span className={step >= 2 ? "text-primary" : "text-muted-foreground"}>Contact</span>
                    <span className={step >= 3 ? "text-primary" : "text-muted-foreground"}>Professional</span>
                    <span className={step >= 4 ? "text-primary" : "text-muted-foreground"}>Finish</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-500 ease-out"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-2xl font-display font-bold text-primary mb-6">Personal Details</h3>
                          
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="fatherName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Father's Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your father's name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cnic"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CNIC Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="12345-1234567-1" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-2xl font-display font-bold text-primary mb-6">Contact Information</h3>
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+92 3XX XXXXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Location / Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, District, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-2xl font-display font-bold text-primary mb-6">Professional Background</h3>
                          
                          <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Profession</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Software Engineer, Teacher, Doctor" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Key Skills</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Public Speaking, Coding, Management" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="interest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Area of Interest for Contribution</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an area" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Education & IT">Education & IT (Digital Skill Lab)</SelectItem>
                                    <SelectItem value="Healthcare">Healthcare (Sehat-e-Orakzai)</SelectItem>
                                    <SelectItem value="Community Service">Community Service (Jirga-e-Naujawan)</SelectItem>
                                    <SelectItem value="Sports & Arts">Sports & Arts (Talent Hunt)</SelectItem>
                                    <SelectItem value="Fundraising">Fundraising (Imdad-e-Bahan)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-2xl font-display font-bold text-primary mb-6">Final Message</h3>
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Why do you want to join Son Of Orakzai? (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Share your thoughts or motivation..." 
                                    className="min-h-[120px] resize-none"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="bg-muted p-4 rounded-lg mt-6">
                            <p className="text-sm text-muted-foreground font-medium">
                              By submitting this application, you agree to uphold the values and constitution of Son Of Orakzai, dedicating yourself to the betterment of the community.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between pt-6 border-t border-border mt-8">
                      {step > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      ) : (
                        <div />
                      )}
                      
                      {step < 4 ? (
                        <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
                          Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={createMember.isPending} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                          {createMember.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
