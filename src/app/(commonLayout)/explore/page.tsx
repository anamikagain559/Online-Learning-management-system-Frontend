// app/explore/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Link, User } from "lucide-react";

// Trip type
interface Trip {
  id: string;
  title: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  description: string;
  spotsLeft: number;
  host: { name: string; avatar: string };
  image: string;
}

// Mock data (replace with API call)
const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Tokyo, Japan",
    location: "Tokyo, Japan",
    price: 1200,
    startDate: "Apr 10",
    endDate: "Apr 17",
    description:
      "A week of cherry blossoms, sushi making classes, and exploring the hidden alleys of Tokyo.",
    spotsLeft: 2,
    host: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
    image: "/images/tokyo.jpg",
  },
  {
    id: "2",
    title: "Reykjavik, Iceland",
    location: "Reykjavik, Iceland",
    price: 1800,
    startDate: "Sep 15",
    endDate: "Sep 22",
    description:
      "Chasing northern lights and hiking glaciers. This is an active trip involving moderate hiking and cold weather.",
    spotsLeft: 1,
    host: { name: "Mike Ross", avatar: "/avatars/mike.jpg" },
    image: "/images/iceland.jpg",
  },
  {
    id: "3",
    title: "Barcelona, Spain",
    location: "Barcelona, Spain",
    price: 950,
    startDate: "Jun 20",
    endDate: "Jun 25",
    description:
      "Architecture, tapas, and beach vibes. A relaxed trip focusing on Gaudi's masterpieces and culinary delights.",
    spotsLeft: 4,
    host: { name: "Elena Rodriguez", avatar: "/avatars/elena.jpg" },
    image: "/images/barcelona.jpg",
  },
];

export default function ExplorePage() {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [budgetFilter, setBudgetFilter] = useState("Any Budget");

  // Filter trips
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.location.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "All Types" || trip.description.includes(typeFilter);
    const matchesBudget =
      budgetFilter === "Any Budget" ||
      (budgetFilter === "Low" && trip.price < 1000) ||
      (budgetFilter === "Medium" && trip.price >= 1000 && trip.price <= 1500) ||
      (budgetFilter === "High" && trip.price > 1500);

    return matchesSearch && matchesType && matchesBudget;
  });

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
          <option>Solo</option>
          <option>Family</option>
          <option>Friends</option>
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
        <button className="border px-4 py-2 rounded-lg">More Filters</button>
      </div>

      {/* Featured Trips */}
      <h2 className="text-xl font-bold mb-4">Featured Trips</h2>
      <p className="mb-4">{filteredTrips.length} trips found</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative">
              <Image src={trip.image} alt={trip.title} width={400} height={250} className="object-cover w-full h-56" />
              <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {trip.spotsLeft} spots left
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg">{trip.title}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  {trip.startDate} - {trip.endDate}
                </span>
                <span className="ml-auto font-semibold text-primary">${trip.price}</span>
              </div>
              <p className="text-gray-600 text-sm">{trip.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={trip.host.avatar}
                    alt={trip.host.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm">{trip.host.name}</span>
                </div>
                <Link href={`/travel-plans/${trip.id}`} className="text-primary font-medium hover:underline">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
