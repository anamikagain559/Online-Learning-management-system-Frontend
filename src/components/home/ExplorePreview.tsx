"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { TripCard } from "@/components/trips/TripCard";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Button } from "@/components/ui/button";

export default function ExplorePreview() {
  const [trips, setTrips] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      const res = await getPublicTravelPlans();
      if (res.success) {
        setTrips(res.data.slice(0, 6)); // 🔑 ONLY 6 trips
      }
      setLoading(false);
    }
    fetchTrips();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Explore Trips</h2>
          <p className="text-gray-600 mt-1">
            Discover trips created by fellow travelers
          </p>
        </div>

        <Link href="/explore">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading trips...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
}
