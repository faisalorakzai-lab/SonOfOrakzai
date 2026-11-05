import { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { supabase, type Member, type StorySubmission, type MigrantApplication, type MigrantPayment } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Users, UserCheck, UserX, Clock, Check, X, Lock, Eye, EyeOff, LogOut, FileText } from "lucide-react";
import { motion } from "framer-motion";

const setupHint = "Ensure the admin_review_migrant_application and admin_review_migrant_payment RPCs, migrant_payments table, and admin RLS policies are installed.";
const messageForError = (error: { message: string; code?: string }) => {
  const detail = error.message || "Unknown error";
  return /function .* does not exist|schema cache|relation .* does not exist|could not find the function/i.test(detail)
    ? `${detail} ${setupHint}`
    : detail;
};

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSubmitting(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (authError) { setError(authError.message); return; }
    if (data.session?.user.app_metadata?.role !== "migrant_admin") {
      await supabase.auth.signOut();
      setError("This account is not authorized as a migrant administrator. Ask an administrator to assign the migrant_admin role in Supabase app metadata.");
      return;
    }
    toast({ title: "Login successful", description: "Administrator access verified." }); onLogin();
  };
  return <MainLayout><div className="min-h-[80vh] flex items-center justify-center bg-muted/30 px-4 py-8"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md"><Card className="border-none shadow-2xl"><CardContent className="p-6 sm:p-10"><div className="text-center mb-8"><div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-primary" /></div><h1 className="text-2xl font-display font-bold text-primary">Admin Login</h1><p className="text-muted-foreground text-sm mt-1">Orakzai NGO — Secure Access</p></div><form onSubmit={handleSubmit} className="space-y-5"><div><label className="block text-sm font-medium mb-1.5">Email Address</label><Input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="admin@example.com" required autoComplete="email" /></div><div><label className="block text-sm font-medium mb-1.5">Password</label><div className="relative"><Input type={showPass ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(""); }} required className="pr-10" autoComplete="current-password" /><button type="button" onClick={() => setShowPass(v => !v)} aria-label={showPass ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>{error && <p role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 break-words">{error}</p>}<Button type="submit" disabled={submitting} className="w-full h-11">{submitting ? "Signing in…" : "Login to Dashboard"}</Button></form></CardContent></Card></motion.div></div></MainLayout>;
}

export default function Dashboard() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [stories, setStories] = useState<StorySubmission[]>([]);
  const [migrantApplications, setMigrantApplications] = useState<MigrantApplication[]>([]);
  const [migrantPayments, setMigrantPayments] = useState<MigrantPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);
  const [dataError, setDataError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    let alive = true;
    const verify = (session: { user: { app_metadata?: { role?: string } } } | null) => {
      if (!alive) return;
      setAuthorized(session?.user.app_metadata?.role === "migrant_admin");
      setSessionChecked(true);
    };
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) { if (alive) { setDataError(`Could not verify Supabase session: ${error.message}`); setSessionChecked(true); } return; }
      verify(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => verify(session));
    return () => { alive = false; listener.subscription.unsubscribe(); };
  }, []);

  const fetchData = useCallback(async () => {
    if (!authorized) return;
    setIsLoading(true); setDataError("");
    const [memberResult, storyResult, applicationResult, paymentResult] = await Promise.all([
      supabase.from("members").select("*").order("created_at", { ascending: false }),
      supabase.from("story_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("migrant_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("migrant_payments").select("*").order("created_at", { ascending: false }),
    ]);
    if (applicationResult.error || paymentResult.error) {
      const firstError = applicationResult.error || paymentResult.error;
      setDataError(`Could not load migrant welfare data: ${messageForError(firstError!)}${paymentResult.error ? ` Payment data error: ${messageForError(paymentResult.error)}` : ""}`);
    }
    if (memberResult.data) setMembers(memberResult.data as Member[]);
    if (storyResult.data) setStories(storyResult.data as StorySubmission[]);
    if (applicationResult.data) setMigrantApplications(applicationResult.data as MigrantApplication[]);
    if (paymentResult.data) setMigrantPayments(paymentResult.data as MigrantPayment[]);
    setIsLoading(false);
  }, [authorized]);

  useEffect(() => { if (authorized) void fetchData(); else { setMembers([]); setStories([]); setMigrantApplications([]); setMigrantPayments([]); setIsLoading(false); } }, [authorized, fetchData]);

  if (!sessionChecked) return <MainLayout><div className="container mx-auto px-4 py-12"><Skeleton className="h-48 w-full" /></div></MainLayout>;
  if (!authorized) return <AdminLogin onLogin={() => setAuthorized(true)} />;

  const stats = { total: members.length, approved: members.filter(m => m.status === "approved").length, pending: members.filter(m => m.status === "pending").length, rejected: members.filter(m => m.status === "rejected").length };
  const handleUpdateStatus = async (id: number, status: string) => {
    setUpdatingId(id); const { error } = await supabase.from("members").update({ status }).eq("id", id);
    if (!error) { toast({ title: "Status updated" }); await fetchData(); } else toast({ title: "Update failed", description: error.message, variant: "destructive" }); setUpdatingId(null);
  };
  const handleMigrantStatus = async (application: MigrantApplication, status: "approved" | "rejected" | "under_review" | "payment_verification") => {
    setUpdatingId(application.id);
    const payment_status = status === "approved" ? "verified" : status === "rejected" ? "rejected" : application.payment_status;
    const { error } = await supabase.rpc("admin_review_migrant_application", { p_application_id: application.id, p_status: status, p_payment_status: payment_status, p_internal_notes: null });
    if (!error) { toast({ title: "Migrant application updated", description: `Application status: ${status.replaceAll("_", " ")}.` }); await fetchData(); }
    else toast({ title: "Application review failed", description: messageForError(error), variant: "destructive" }); setUpdatingId(null);
  };
  const handlePaymentStatus = async (payment: MigrantPayment, status: "verified" | "rejected") => {
    setUpdatingId(payment.id);
    const { error } = await supabase.rpc("admin_review_migrant_payment", { p_payment_id: payment.id, p_status: status, p_internal_notes: null });
    if (!error) { toast({ title: "Renewal payment updated", description: `Payment marked ${status}.` }); await fetchData(); }
    else toast({ title: "Payment review failed", description: messageForError(error), variant: "destructive" }); setUpdatingId(null);
  };
  const handleStoryStatus = async (id: string, status: StorySubmission["status"]) => {
    setUpdatingId(id); const { error } = await supabase.from("story_submissions").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    if (!error) { toast({ title: "Story updated" }); await fetchData(); } else toast({ title: "Update failed", description: error.message, variant: "destructive" }); setUpdatingId(null);
  };
  const handleLogout = async () => { const { error } = await supabase.auth.signOut(); if (error) toast({ title: "Logout failed", description: error.message, variant: "destructive" }); else { setAuthorized(false); toast({ title: "Logged out" }); } };

  return <MainLayout><div className="bg-muted/30 min-h-[80vh] py-6 sm:py-12"><div className="container mx-auto px-3 sm:px-4 max-w-7xl"><div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl sm:text-3xl font-display font-bold text-primary">Admin Dashboard</h1><p className="text-muted-foreground">Members, stories, and migrant applications.</p></div><Button variant="outline" onClick={handleLogout} className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</Button></div>
    {dataError && <div role="alert" className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive break-words">{dataError}</div>}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">{isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl bg-white" />) : <><Stat icon={<Users />} label="Total Applications" value={stats.total} /><Stat icon={<UserCheck />} label="Approved" value={stats.approved} /><Stat icon={<Clock />} label="Pending" value={stats.pending} /><Stat icon={<UserX />} label="Rejected" value={stats.rejected} /></>}</div>
    <Card className="border-none shadow-sm bg-white overflow-hidden"><CardHeader className="border-b"><CardTitle>Recent Member Applications</CardTitle></CardHeader><CardContent className="p-0">{members.length === 0 ? <Empty /> : <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Profession</TableHead><TableHead>Location</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>{members.map(member => <TableRow key={member.id}><TableCell><div className="font-medium">{member.name}</div><div className="text-xs text-muted-foreground">{member.email}</div></TableCell><TableCell>{member.profession}</TableCell><TableCell>{member.location}</TableCell><TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell><TableCell><Badge variant="outline">{member.status}</Badge></TableCell><TableCell>{member.status === "pending" && <div className="flex gap-2"><Button size="sm" variant="outline" aria-label="Approve member" onClick={() => handleUpdateStatus(member.id, "approved")} disabled={updatingId === member.id}><Check /></Button><Button size="sm" variant="outline" aria-label="Reject member" onClick={() => handleUpdateStatus(member.id, "rejected")} disabled={updatingId === member.id}><X /></Button></div>}</TableCell></TableRow>)}</TableBody></Table></div>}</CardContent></Card>
    <Card className="border-none shadow-sm bg-white overflow-hidden mt-6 sm:mt-8"><CardHeader className="border-b"><CardTitle>Migrant Welfare Applications ({migrantApplications.filter(a => a.status !== "approved" && a.status !== "rejected").length} pending)</CardTitle><FileText className="h-5 w-5 text-primary" /></CardHeader><CardContent className="p-0">{migrantApplications.length === 0 ? <Empty label="No migrant applications found." /> : <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Applicant</TableHead><TableHead>Package / payment</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead><TableHead>Review</TableHead></TableRow></TableHeader><TableBody>{migrantApplications.map(application => <TableRow key={application.id}><TableCell><div className="font-medium">{application.full_name}</div><div className="text-xs text-muted-foreground">{application.application_number} · {application.current_city}, {application.current_country}</div><div className="text-xs text-muted-foreground">{application.emergency_contact}</div></TableCell><TableCell>{application.package_id}<div className="text-xs text-muted-foreground">{application.payment_method} · {application.transaction_reference}</div></TableCell><TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell><TableCell><Badge variant="outline">{application.status.replaceAll("_", " ")}</Badge><div className="mt-1 text-xs text-muted-foreground">Payment: {application.payment_status?.replaceAll("_", " ")}</div></TableCell><TableCell><div className="flex flex-wrap gap-2">{(["under_review", "payment_verification"] as const).map(status => <Button key={status} size="sm" variant="outline" onClick={() => handleMigrantStatus(application, status)} disabled={updatingId === application.id}>{status.replaceAll("_", " ")}</Button>)}{application.status !== "approved" && <Button size="sm" variant="outline" className="text-emerald-600" onClick={() => handleMigrantStatus(application, "approved")} disabled={updatingId === application.id}><Check className="mr-1 h-4 w-4" />Approve</Button>}{application.status !== "rejected" && <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleMigrantStatus(application, "rejected")} disabled={updatingId === application.id}><X className="mr-1 h-4 w-4" />Reject</Button>}</div></TableCell></TableRow>)}</TableBody></Table></div>}</CardContent></Card>
    <Card className="border-none shadow-sm bg-white overflow-hidden mt-6 sm:mt-8"><CardHeader className="border-b"><CardTitle>Migrant Renewal Payments ({migrantPayments.length})</CardTitle></CardHeader><CardContent className="p-0">{migrantPayments.length === 0 ? <Empty label="No renewal payments found." /> : <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Period</TableHead><TableHead>Method</TableHead><TableHead>Reference</TableHead><TableHead>Status</TableHead><TableHead>Review</TableHead></TableRow></TableHeader><TableBody>{migrantPayments.map(payment => <TableRow key={payment.id}><TableCell>{`${payment.billing_period_start} – ${payment.billing_period_end}`}</TableCell><TableCell>{payment.payment_method || "—"}</TableCell><TableCell className="break-all">{payment.transaction_reference || "—"}</TableCell><TableCell><Badge variant="outline">{payment.payment_status.replaceAll("_", " ")}</Badge></TableCell><TableCell>{["verification_pending", "rejected"].includes(payment.payment_status) && <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" className="text-emerald-600" onClick={() => handlePaymentStatus(payment, "verified")} disabled={updatingId === payment.id}><Check className="mr-1 h-4 w-4" />Verify</Button><Button size="sm" variant="outline" className="text-destructive" onClick={() => handlePaymentStatus(payment, "rejected")} disabled={updatingId === payment.id}><X className="mr-1 h-4 w-4" />Reject</Button></div>}</TableCell></TableRow>)}</TableBody></Table></div>}</CardContent></Card>
    <Card className="border-none shadow-sm bg-white overflow-hidden mt-6 sm:mt-8"><CardHeader className="border-b"><CardTitle>Community Story Submissions ({stories.filter(s => s.status === "pending").length} pending)</CardTitle></CardHeader><CardContent className="p-0">{stories.length === 0 ? <Empty label="No story submissions found." /> : <div className="divide-y">{stories.map(story => <div key={story.id} className="p-4 sm:p-6 space-y-3"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{story.name}</p>{story.email && <p className="text-xs text-muted-foreground">{story.email}</p>}<p className="text-xs text-muted-foreground mt-1">{new Date(story.created_at).toLocaleString()}</p></div><Badge variant="outline">{story.status}</Badge></div><p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{story.story}</p>{story.status === "pending" && <div className="flex gap-2"><Button size="sm" variant="outline" className="text-emerald-600" onClick={() => handleStoryStatus(story.id, "approved")} disabled={updatingId === story.id}><Check className="mr-1 h-4 w-4" />Approve</Button><Button size="sm" variant="outline" className="text-destructive" onClick={() => handleStoryStatus(story.id, "rejected")} disabled={updatingId === story.id}><X className="mr-1 h-4 w-4" />Reject</Button></div>}</div>)}</div>}</CardContent></Card>
  </div></div></MainLayout>;
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) { return <Card className="border-none shadow-sm bg-white"><CardContent className="p-5 flex items-center gap-4"><div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-primary">{icon}</div><div><p className="text-sm text-muted-foreground">{label}</p><h3 className="text-2xl font-bold">{value}</h3></div></CardContent></Card>; }
function Empty({ label = "No applications found." }: { label?: string }) { return <div className="p-6 sm:p-8 text-center text-muted-foreground">{label}</div>; }
