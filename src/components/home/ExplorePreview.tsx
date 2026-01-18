"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import  TripCard  from "@/components/trips/TripCard";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExplorePreview() {
  const [trips, setTrips] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await getPublicTravelPlans();
        if (res?.success) {
          setTrips(res.data.slice(0, 6));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
   {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 text-center sm:text-left">
  <div className="sm:w-full">
    <h2 className="text-3xl md:text-4xl font-bold text-center sm:text-left">
      Explore Trips
    </h2>
    <p className="text-muted-foreground mt-2 text-center sm:text-left">
      Discover trips created by fellow travelers
    </p>
  </div>

  <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end">
    <Link href="/explore">
      <Button variant="outline" className="rounded-xl">
        View All
      </Button>
    </Link>
  </div>
</div>
      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No trips available right now.
        </p>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {trips.map((trip) => (
            <motion.div
              key={trip._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

/* ----------------------------------
   Skeleton Card
----------------------------------- */
function TripCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-4">
      <Skeleton className="h-44 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}
