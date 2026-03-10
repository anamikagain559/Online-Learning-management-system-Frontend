"use client";

import { useEffect, useState } from "react";
import { Users, MapPin, ClipboardList, TrendingUp } from "lucide-react";
import StatsCard from "@/components/modules/Dashboard/StatsCard";
import { getUsers } from "@/services/admin/usersManagement";
import { getAllTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { IUser } from "@/types/travelers.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlans: 0,
    publicPlans: 0,
    privatePlans: 0,
  });
  const [recentPlans, setRecentPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [usersRes, plansRes] = await Promise.all([
          getUsers(),
          getAllTravelPlans(),
        ]);

        const users: IUser[] = usersRes?.data || [];
        const plans: ITravelPlan[] = plansRes?.data || [];

        setStats({
          totalUsers: users.length,
          totalPlans: plans.length,
          publicPlans: plans.filter(p => p.isPublic).length,
          privatePlans: plans.filter(p => !p.isPublic).length,
        });

        setRecentPlans(plans.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of TravelBuddy platform activity and statistics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          description="Registered travelers"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Total Plans"
          value={stats.totalPlans}
          icon={MapPin}
          description="Travel plans created"
          iconColor="text-green-500"
        />
        <StatsCard
          title="Public Plans"
          value={stats.publicPlans}
          icon={ClipboardList}
          description="Open for buddies"
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Private Plans"
          value={stats.privatePlans}
          icon={TrendingUp}
          description="Personal trips"
          iconColor="text-orange-500"
        />
      </div>

      {/* Recent activity / Tables */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Travel Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPlans.length > 0 ? (
                  recentPlans.map((plan) => (
                    <TableRow key={plan._id}>
                      <TableCell className="font-medium">
                        {plan.destination.city}, {plan.destination.country}
                      </TableCell>
                      <TableCell>{(plan.user as any)?.name || "N/A"}</TableCell>
                      <TableCell>{plan.travelType}</TableCell>
                      <TableCell>
                        <Badge variant={plan.isPublic ? "default" : "secondary"}>
                          {plan.isPublic ? "Public" : "Private"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No recent plans found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Platform Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Active Community
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stats.totalUsers} travelers sharing experiences.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Trip Matchmaking
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stats.publicPlans} public trips looking for buddies.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
