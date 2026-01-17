"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { getUserById } from "@/services/admin/usersManagement";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { IUser } from "@/types/travelers.interface";
import { serverFetch } from "@/lib/server-fetch";

// Default creator image
const DEFAULT_IMAGE = "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg";

// Star rating component
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm">
      {Array(fullStars).fill(0).map((_, i) => <span key={`full-${i}`}>★</span>)}
      {halfStar && <span>★</span>}
      {Array(emptyStars).fill(0).map((_, i) => <span key={`empty-${i}`}>☆</span>)}
    </div>
  );
}

// Fetch average rating for a travel plan
async function fetchRating(travelPlanId: string) {
  try {
    const res = await serverFetch.get(`/reviews/travel-plan/${travelPlanId}`);
    const data = await res.json();
    if (!data.success || !data.data) return { avg: 0, count: 0 };
    const reviews = data.data;
    const avg = reviews.length
      ? reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / reviews.length
      : 0;
    return { avg, count: reviews.length };
  } catch (err) {
    console.error("Failed to fetch rating", err);
    return { avg: 0, count: 0 };
  }
}

export default function ExplorePage() {
  const [trips, setTrips] = useState<ITravelPlan[]>([]);
  const [ratingsMap, setRatingsMap] = useState<Record<string, { avg: number; count: number }>>({});
  const [creatorsMap, setCreatorsMap] = useState<Record<string, IUser>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [budgetFilter, setBudgetFilter] = useState("Any Budget");

  useEffect(() => {
    const fetchTripsAndCreators = async () => {
      setLoading(true);

      try {
        // 1️⃣ Fetch travel plans
        const res = await getPublicTravelPlans();
        if (!res.success) {
          setError(res.message || "Failed to load travel plans");
          setLoading(false);
          return;
        }

        setTrips(res.data);

        // 2️⃣ Fetch ratings for each trip
        const ratingsPromises = res.data.map(async (plan: ITravelPlan) => ({
          id: plan._id,
          ...(await fetchRating(plan._id)),
        }));

        const ratingsArr = await Promise.all(ratingsPromises);
        const ratingsMapTemp: Record<string, { avg: number; count: number }> = {};
        ratingsArr.forEach((r) => (ratingsMapTemp[r.id] = { avg: r.avg, count: r.count }));
        setRatingsMap(ratingsMapTemp);

        // 3️⃣ Fetch creator info for each trip
        const creatorsTemp: Record<string, IUser> = {};
        await Promise.all(
          res.data.map(async (trip: ITravelPlan) => {
            const userId = trip.user?._id;
            if (!userId || creatorsTemp[userId]) return;

            try {
              const userRes = await getUserById(userId);
              if (userRes.success && userRes.data) {
                creatorsTemp[userId] = userRes.data;
              }
            } catch (err) {
              console.error("Failed to fetch creator", userId, err);
            }
          })
        );

        setCreatorsMap(creatorsTemp);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTripsAndCreators();
  }, []);

  // Filter trips
  const filteredTrips = trips.filter((trip) => {
    const city = trip.destination?.city ?? "";
    const country = trip.destination?.country ?? "";
    const matchesSearch =
      city.toLowerCase().includes(search.toLowerCase()) ||
      country.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All Types" ||
      (trip.travelType && trip.travelType.toUpperCase() === typeFilter.toUpperCase());

    const minBudget = trip.budgetRange?.min ?? 0;
    const maxBudget = trip.budgetRange?.max ?? 0;
    const matchesBudget =
      budgetFilter === "Any Budget" ||
      (budgetFilter === "Low" && maxBudget < 1000) ||
      (budgetFilter === "Medium" && minBudget >= 1000 && maxBudget <= 1500) ||
      (budgetFilter === "High" && minBudget > 1500);

    return matchesSearch && matchesType && matchesBudget;
  });

  if (loading) return <p className="text-center mt-8">Loading trips...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search destinations (e.g., Tokyo, Iceland)..."
          className="flex-1 border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg px-4 py-2"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>All Types</option>
          <option>SOLO</option>
          <option>FAMILY</option>
          <option>FRIENDS</option>
        </select>
        <select
          className="border rounded-lg px-4 py-2"
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
        >
          <option>Any Budget</option>
          <option value="Low">Under $1000</option>
          <option value="Medium">$1000 - $1500</option>
          <option value="High">Above $1500</option>
        </select>
      </div>

      {/* Trips */}
      <h2 className="text-xl font-bold mb-4">Featured Trips</h2>
      <p className="mb-4">{filteredTrips.length} trips found</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => {
          const rating = ratingsMap[trip._id]?.avg || 0;
          const reviewCount = ratingsMap[trip._id]?.count || 0;
          const creator = trip.user?.name || { name: "Unknown", picture: DEFAULT_IMAGE };
console.log(trip);
          return (
            <div
              key={trip._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col gap-2"
            >
              {/* Creator */}
          <div className="flex items-center gap-2 mb-2">
          <Link href={`/allUser/${trip.user?._id}`} className="flex items-center gap-2">
            <img
              src={trip.user?.picture || DEFAULT_IMAGE}
              alt={trip.user?.name || "User"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{trip.user?.name || "Unknown"}</span>
          </Link>
        </div>

              <h3 className="font-bold text-lg">
                {trip.destination?.city ?? "Unknown"}, {trip.destination?.country ?? "Unknown"}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : "N/A"} -{" "}
                  {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : "N/A"}
                </span>
                <span className="ml-auto font-semibold text-primary">{trip.travelType ?? "N/A"}</span>
              </div>

              <p className="text-gray-600 text-sm">{trip.description ?? ""}</p>
              <span className="text-sm font-medium text-gray-700">
                Budget: {trip.budgetRange?.min ?? 0} - {trip.budgetRange?.max ?? 0} USD
              </span>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={rating} />
                <span className="text-gray-500 text-sm">({reviewCount})</span>
              </div>

              <Link
                href={`/explore/${trip._id}`}
                className="text-primary font-medium hover:underline mt-2"
              >
                View Details →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
