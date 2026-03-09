"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import TripCard from "@/components/trips/TripCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Trip {
  _id: string;
  image?: string;
  destination?: { city?: string; country?: string };
  user?: { _id?: string; name?: string; picture?: string };
  creatorType?: "Solo" | "Family" | "Any";
  travelType?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  budgetRange?: { min?: number; max?: number };
  rating?: number;
  reviewCount?: number;
}

export default function ExplorePreview() {
  const [trips, setTrips] = useState<Trip[]>([]);
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
    <section className="relative max-w-7xl mx-auto px-4 py-24 overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] -z-10" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
      >
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Featured Trips
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Explore Trips
          </h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Discover amazing trips created by fellow travelers
          </p>
        </div>

        <Link href="/explore">
          <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30">
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">✈️</div>
          <p className="text-gray-500 text-lg">
            No trips available right now. Be the first to create one!
          </p>
        </div>
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

/* ── Skeleton Card ── */
function TripCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
      <Skeleton className="h-44 w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-1/2 rounded-lg" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  );
}
