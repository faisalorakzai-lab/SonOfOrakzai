import { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { supabase, type Member } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Users, UserCheck, UserX, Clock, Check, X, Lock, Eye, EyeOff, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const ADMIN_EMAIL = "sonoforakzai@gmail.com";
const ADMIN_PASSWORD = "Son Of Orakzai2100";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("soo_admin_auth", "1");
      toast({ title: "Login Successful", description: "Welcome, Admin!" });
      onLogin();
    } else {
      setError("Galat email ya password. Dobara koshish karein.");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="border-none shadow-2xl">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-display font-bold text-primary">Admin Login</h1>
                <p className="text-muted-foreground text-sm mt-1">Orakzai NGO — Secure Access</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    placeholder="admin@example.com"
                    required
                    className="h-11"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <Input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(""); }}
                      placeholder="••••••••••"
                      required
                      className="h-11 pr-10"
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2">
                    {error}
                  </motion.p>
                )}
                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold">
                  Login to Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem("soo_admin_auth") === "1");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("members").select("*").order("created_at", { ascending: false });
    if (!error && data) setMembers(data as Member[]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchMembers();
  }, [isLoggedIn, fetchMembers]);

  if (!isLoggedIn) return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;

  const stats = {
    total: members.length,
    approved: members.filter(m => m.status === "approved").length,
    pending: members.filter(m => m.status === "pending").length,
    rejected: members.filter(m => m.status === "rejected").length,
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    const { error } = await supabase.from("members").update({ status }).eq("id", id);
    if (!error) {
      toast({ title: "Status Updated", description: `Member "${status}" kar diya gaya.` });
      await fetchMembers();
    } else {
      toast({ title: "Error", description: "Status update fail hua.", variant: "destructive" });
    }
    setUpdatingId(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("soo_admin_auth");
    setIsLoggedIn(false);
    toast({ title: "Logged Out", description: "Admin session khatam." });
  };

  return (
    <MainLayout>
      <div className="bg-muted/30 min-h-[80vh] py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-primary">Admin Dashboard</h1>
              <p className="text-muted-foreground">Members ko manage karein aur statistics dekhein.</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl bg-white" />)
            ) : (
              <>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Users className="w-6 h-6" /></div>
                    <div><p className="text-sm font-medium text-muted-foreground">Total Applications</p><h3 className="text-2xl font-bold">{stats.total}</h3></div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600"><UserCheck className="w-6 h-6" /></div>
                    <div><p className="text-sm font-medium text-muted-foreground">Approved</p><h3 className="text-2xl font-bold">{stats.approved}</h3></div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600"><Clock className="w-6 h-6" /></div>
                    <div><p className="text-sm font-medium text-muted-foreground">Pending</p><h3 className="text-2xl font-bold">{stats.pending}</h3></div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center text-destructive"><UserX className="w-6 h-6" /></div>
                    <div><p className="text-sm font-medium text-muted-foreground">Rejected</p><h3 className="text-2xl font-bold">{stats.rejected}</h3></div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="font-display">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 space-y-4">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
              ) : members.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Profession</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </TableCell>
                          <TableCell>{member.profession}</TableCell>
                          <TableCell>{member.location}</TableCell>
                          <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              member.status === "approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" :
                              member.status === "rejected" ? "bg-destructive/10 text-destructive border-destructive/20" :
                              "bg-amber-500/10 text-amber-600 border-amber-200"
                            }>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {member.status === "pending" && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50 border-emerald-200"
                                  onClick={() => handleUpdateStatus(member.id, "approved")} disabled={updatingId === member.id}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/20"
                                  onClick={() => handleUpdateStatus(member.id, "rejected")} disabled={updatingId === member.id}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">Koi application nahi mili.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
