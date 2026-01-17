"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { getMatchedTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";

export default function MatchPage() {
  const [filters, setFilters] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelType: "",
  });

  const [matches, setMatches] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    console.log("SENDING FILTERS 👉", filters);
    setLoading(true);
    const res = await getMatchedTravelPlans(filters);
    setMatches(res.success ? res.data : []);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Find Your Travel Match</h1>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          name="destination"
          value={filters.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="border rounded-lg px-4 py-2"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />
        <select
          name="travelType"
          value={filters.travelType}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Types</option>
          <option value="SOLO">Solo</option>
          <option value="FAMILY">Family</option>
          <option value="FRIENDS">Friends</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-primary text-white px-6 py-2 rounded-lg mb-6"
      >
        Find Matches
      </button>

      {loading && <p>Loading matches...</p>}

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {matches.map((trip) => (
          <div key={trip._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">
              {trip.destination?.city}, {trip.destination?.country}
            </h3>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-2">{trip.description}</p>
            <p className="text-sm mt-1 font-medium">Travel Type: {trip.travelType}</p>

            <Link
              href={`/travel-plans/${trip._id}`}
              className="text-primary font-medium hover:underline mt-3 inline-block"
            >
              View Plan →
            </Link>
          </div>
        ))}
      </div>

      {!loading && matches.length === 0 && (
        <p className="text-gray-500 mt-6">No matching travel plans found.</p>
      )}
    </div>
  );
}
