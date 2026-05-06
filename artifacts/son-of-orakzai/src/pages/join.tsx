import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, AnimatePresence } from "framer-motion";
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
import { CheckCircle2, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";

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

/* ─── Luxury 3D Membership Card ───────────────────────────────── */
function LuxuryMemberCard({ member }: { member: any }) {
  const [flipped, setFlipped] = useState(false);
  const memberId = String(member.id).padStart(6, "0");
  const joined = new Date(member.created_at || Date.now()).getFullYear();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 3-D flip container */}
      <div
        className="relative w-full max-w-[420px] cursor-pointer select-none"
        style={{ perspective: "1200px", height: "260px" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped((v) => !v)}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ══ FRONT ══════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow:
                "0 32px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,55,0.35), inset 0 -1px 0 rgba(0,0,0,0.5)",
              background: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 3px,
                  rgba(255,255,255,0.012) 3px,
                  rgba(255,255,255,0.012) 6px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 3px,
                  rgba(255,255,255,0.012) 3px,
                  rgba(255,255,255,0.012) 6px
                ),
                linear-gradient(145deg,
                  #061c14 0%,
                  #0a2e1e 18%,
                  #083520 38%,
                  #072618 58%,
                  #041710 80%,
                  #061c14 100%
                )
              `,
              border: "1px solid rgba(212,175,55,0.45)",
            }}
          >
            {/* Gold edge shimmer */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.14) 0%, transparent 35%, transparent 65%, rgba(212,175,55,0.09) 100%)",
              }}
            />

            <div className="relative h-full flex flex-col justify-between p-6 z-10">
              {/* Top: seal + status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #F5D87A, #B8942A)",
                      boxShadow: "0 0 0 2px rgba(212,175,55,0.3), 0 4px 14px rgba(0,0,0,0.45)",
                    }}
                  >
                    <span className="text-[#061c14] font-black text-[10px] tracking-widest">SOO</span>
                  </div>
                  <div>
                    <div className="font-black text-[11px] tracking-[0.28em] text-white uppercase">
                      Son of Orakzai
                    </div>
                    <div
                      className="text-[9px] tracking-[0.2em] uppercase font-semibold"
                      style={{ color: "#D4AF37" }}
                    >
                      Official Membership
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-[9px] uppercase tracking-widest mb-1"
                    style={{ color: "rgba(212,175,55,0.6)" }}
                  >
                    Status
                  </div>
                  <div
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                    style={{
                      background: "rgba(234,179,8,0.15)",
                      borderColor: "rgba(234,179,8,0.5)",
                      color: "#FDE68A",
                    }}
                  >
                    {member.status || "Pending"}
                  </div>
                </div>
              </div>

              {/* Middle: gold embossed name + details */}
              <div>
                <div
                  className="text-[22px] font-black uppercase tracking-widest mb-2 leading-tight"
                  style={{
                    background:
                      "linear-gradient(180deg, #F5D87A 0%, #D4AF37 40%, #B8942A 70%, #E8C84A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.7))",
                  }}
                >
                  {member.name?.toUpperCase()}
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-widest"
                      style={{ color: "rgba(212,175,55,0.55)" }}
                    >
                      Member ID
                    </div>
                    <div className="font-mono font-bold text-sm" style={{ color: "#D4AF37" }}>
                      ID: {memberId}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-widest"
                      style={{ color: "rgba(212,175,55,0.55)" }}
                    >
                      Year
                    </div>
                    <div className="font-mono font-bold text-sm" style={{ color: "#D4AF37" }}>
                      {joined}
                    </div>
                  </div>
                  {member.interest && (
                    <div>
                      <div
                        className="text-[9px] uppercase tracking-widest"
                        style={{ color: "rgba(212,175,55,0.55)" }}
                      >
                        Focus
                      </div>
                      <div className="text-xs font-semibold text-white/75">
                        {member.interest.split(" ")[0]}
                      </div>
                    </div>
                  )}
                </div>
                {member.location && (
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3" style={{ color: "#D4AF37" }} />
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {member.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom: signature + QR */}
              <div className="flex items-end justify-between">
                <div>
                  <img
                    src="/faisal-signature.jpg"
                    alt="Chairman Signature"
                    className="h-9 w-auto object-contain"
                    style={{
                      filter:
                        "invert(1) sepia(1) saturate(2.5) hue-rotate(10deg) brightness(0.8)",
                      opacity: 0.88,
                    }}
                  />
                  <div
                    className="text-[9px] uppercase tracking-widest mt-0.5"
                    style={{ color: "rgba(212,175,55,0.5)" }}
                  >
                    Chairman's Signature
                  </div>
                </div>

                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                >
                  <QRCodeSVG
                    value={`Son Of Orakzai Member\nID: ${memberId}\nName: ${member.name}\nPhone: ${member.phone}\nEmail: ${member.email}`}
                    size={60}
                    bgColor="transparent"
                    fgColor="#0B3D2E"
                    level="M"
                  />
                </div>
              </div>
            </div>

            {/* Holographic bottom strip */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background:
                  "linear-gradient(90deg, #D4AF37, #7FFFD4, #D4AF37, #7FFFD4, #D4AF37)",
                opacity: 0.75,
              }}
            />
          </div>

          {/* ══ BACK ═══════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.45)",
              background:
                "linear-gradient(145deg, #041710 0%, #082818 50%, #041710 100%)",
              border: "1px solid rgba(212,175,55,0.4)",
            }}
          >
            {/* Magnetic stripe */}
            <div className="absolute top-9 left-0 right-0 h-10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900" />

            <div className="relative h-full flex flex-col justify-end p-6">
              {/* Holographic security strip */}
              <div
                className="mb-4 rounded-lg overflow-hidden flex items-center justify-center py-2"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.12), rgba(127,255,212,0.18), rgba(212,175,55,0.12))",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <span
                  className="text-[9px] tracking-[0.45em] font-black uppercase"
                  style={{ color: "#D4AF37" }}
                >
                  ◆ S O O ◆ VERIFIED MEMBER ◆ S O O ◆
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div
                    className="text-[9px] tracking-widest uppercase mb-1"
                    style={{ color: "rgba(212,175,55,0.5)" }}
                  >
                    Member Since
                  </div>
                  <div className="font-mono font-bold" style={{ color: "#D4AF37" }}>
                    {joined}
                  </div>
                  <div
                    className="text-[9px] tracking-widest uppercase mt-2"
                    style={{ color: "rgba(212,175,55,0.45)" }}
                  >
                    Son Of Orakzai NGO
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    sonoforakzai.vercel.app
                  </div>
                </div>

                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #F5D87A, #B8942A)",
                    boxShadow: "0 0 24px rgba(212,175,55,0.45)",
                  }}
                >
                  <span className="text-[#061c14] font-black text-sm tracking-widest">SOO</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-muted-foreground">Hover or tap card to flip and see the back</p>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export default function Join() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [memberData, setMemberData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    if (step === 1) isValid = await form.trigger(["name", "fatherName", "cnic"]);
    else if (step === 2) isValid = await form.trigger(["phone", "email", "location"]);
    else if (step === 3) isValid = await form.trigger(["profession", "skills", "interest"]);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { data: inserted, error } = await supabase
        .from("members")
        .insert({
          name: data.name,
          father_name: data.fatherName,
          cnic: data.cnic,
          phone: data.phone,
          email: data.email,
          location: data.location,
          profession: data.profession,
          skills: data.skills,
          interest: data.interest,
          message: data.message || null,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        const isTableMissing =
          error.code === "PGRST205" ||
          error.message?.includes("schema cache") ||
          error.message?.includes("does not exist") ||
          error.message?.includes("PGRST205");

        if (isTableMissing) {
          const localMember = {
            id: Date.now(),
            ...data,
            father_name: data.fatherName,
            status: "pending",
            created_at: new Date().toISOString(),
          };
          try {
            const prev = JSON.parse(localStorage.getItem("soo_members") || "[]");
            localStorage.setItem("soo_members", JSON.stringify([...prev, localMember]));
          } catch {}
          setIsSuccess(true);
          setMemberData(localMember);
          toast({
            title: "Application Submitted!",
            description: "Son of Orakzai mein khush amdeed! Apki membership pending hai.",
          });
          return;
        }
        throw error;
      }

      setIsSuccess(true);
      setMemberData(inserted);
      toast({
        title: "Application Submitted!",
        description: "Son of Orakzai mein khush amdeed! Apki membership pending hai.",
      });
    } catch (err: any) {
      const msg = err?.message || err?.error_description || "Unknown error";
      console.error("Join form error:", err);
      toast({
        title: "Submission Failed",
        description: msg || "Application submit nahi hua. Dobara koshish karein.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <h2 className="text-3xl font-display font-bold text-primary mb-2">
                  Application Received!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your premium digital membership card is ready.
                </p>
              </div>
              <LuxuryMemberCard member={memberData} />
            </motion.div>
          ) : (
            <Card className="border-none shadow-xl bg-white">
              <CardContent className="p-8">
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
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter your full name" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="fatherName" render={({ field }) => (
                            <FormItem><FormLabel>Father's Name</FormLabel><FormControl><Input placeholder="Enter your father's name" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="cnic" render={({ field }) => (
                            <FormItem><FormLabel>CNIC Number</FormLabel><FormControl><Input placeholder="12345-1234567-1" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
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
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+92 3XX XXXXXXX" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem><FormLabel>Current Location / Address</FormLabel><FormControl><Input placeholder="City, District, etc." {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
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
                          <FormField control={form.control} name="profession" render={({ field }) => (
                            <FormItem><FormLabel>Profession</FormLabel><FormControl><Input placeholder="e.g., Software Engineer, Teacher, Doctor" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="skills" render={({ field }) => (
                            <FormItem><FormLabel>Key Skills</FormLabel><FormControl><Input placeholder="e.g., Public Speaking, Coding, Management" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="interest" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area of Interest for Contribution</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select an area" /></SelectTrigger>
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
                          )} />
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
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Why do you want to join Son Of Orakzai? (Optional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Share your thoughts or motivation..." className="min-h-[120px] resize-none" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
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
                        <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                          {isSubmitting ? "Submitting..." : "Submit Application"}
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
