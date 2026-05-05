import { MainLayout } from "@/components/layout/main-layout";
import { useGetMembersStats, useListMembers, useUpdateMember, getListMembersQueryKey, getGetMembersStatsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Users, UserCheck, UserX, Clock, Check, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: stats, isLoading: isLoadingStats } = useGetMembersStats();
  const { data: members, isLoading: isLoadingMembers } = useListMembers();
  
  const updateMember = useUpdateMember();

  const handleUpdateStatus = (id: number, status: string) => {
    updateMember.mutate({ id, data: { status } }, {
      onSuccess: () => {
        toast({
          title: "Status Updated",
          description: `Member status has been updated to ${status}.`,
        });
        queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetMembersStatsQueryKey() });
      },
      onError: () => {
        toast({
          title: "Update Failed",
          description: "There was an error updating the status.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <MainLayout>
      <div className="bg-muted/30 min-h-[80vh] py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage members and view platform statistics.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {isLoadingStats ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl bg-white" />)
            ) : stats ? (
              <>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                      <h3 className="text-2xl font-bold">{stats.total}</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Approved</p>
                      <h3 className="text-2xl font-bold">{stats.approved}</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <h3 className="text-2xl font-bold">{stats.pending}</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                      <UserX className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                      <h3 className="text-2xl font-bold">{stats.rejected}</h3>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>

          {/* Members Table */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="font-display">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingMembers ? (
                <div className="p-8 space-y-4">
                  {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : members && members.length > 0 ? (
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
                          <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                member.status === "approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" :
                                member.status === "rejected" ? "bg-destructive/10 text-destructive border-destructive/20" :
                                "bg-amber-500/10 text-amber-600 border-amber-200"
                              }
                            >
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {member.status === "pending" && (
                              <div className="flex justify-end gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 border-emerald-200"
                                  onClick={() => handleUpdateStatus(member.id, "approved")}
                                  disabled={updateMember.isPending}
                                >
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                                  onClick={() => handleUpdateStatus(member.id, "rejected")}
                                  disabled={updateMember.isPending}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
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
                <div className="p-8 text-center text-muted-foreground">
                  No applications found.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
