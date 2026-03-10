"use client";

import { useEffect, useState } from "react";
import { MapPin, Calendar, PlusCircle, Compass } from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/modules/Dashboard/StatsCard";
import { getMyTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserDashboardPage = () => {
  const [plans, setPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPlans = async () => {
      setLoading(true);
      try {
        const res = await getMyTravelPlans();
        if (res.success) {
          setPlans(res.data);
        }
      } catch (error) {
        console.error("Error fetching my plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPlans();
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your travel plans and track your adventures.
          </p>
        </div>
        <Link href="/dashboard/travel-plans">
          <Button className="w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Travel Plan
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Trips"
          value={plans.length}
          icon={MapPin}
          description="Trips planned so far"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Public Trips"
          value={plans.filter(p => p.isPublic).length}
          icon={Compass}
          description="Shared with the community"
          iconColor="text-green-500"
        />
        <StatsCard
          title="Upcoming Adventures"
          value={plans.filter(p => new Date(p.startDate) > new Date()).length}
          icon={Calendar}
          description="Counting down the days"
          iconColor="text-purple-500"
        />
      </div>

      {/* Recent Trips */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Recent Trips</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.length > 0 ? (
            plans.slice(0, 3).map((plan) => (
              <Card key={plan._id} className="overflow-hidden hover:shadow-md transition-shadow">
                {plan.image && (
                  <div className="h-32 w-full overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={plan.destination.city} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {plan.destination.city}, {plan.destination.country}
                    </CardTitle>
                    <Badge variant={plan.isPublic ? "default" : "secondary"}>
                      {plan.isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {plan.description || "No description provided."}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                <h3 className="text-lg font-medium">No trips yet</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  Ready to start your next adventure? Create your first travel plan now!
                </p>
                <Link href="/dashboard/travel-plans">
                  <Button variant="outline">Create a Plan</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
