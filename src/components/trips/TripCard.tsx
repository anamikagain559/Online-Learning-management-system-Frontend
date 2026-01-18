"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import StarRating from "@/components/StarRating";
const DEFAULT_IMAGE =
  "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg";

interface Trip {
  _id: string;
  image?: string;
  destination?: { city?: string; country?: string };
  user?: { _id?: string; name?: string; picture?: string };
  creatorType?: "Solo" | "Family" | "Any"; // Trip type
  travelType?: string; // e.g., Adventure / Relaxing
  startDate?: string;
  endDate?: string;
  description?: string;
  budgetRange?: { min?: number; max?: number };
  rating?: number;
  reviewCount?: number;
}

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const tripImage = trip.image || "/placeholder-trip.jpg";
  const creator = trip.user?.name || "Unknown";
  const rating = trip.rating ?? 0;
  const reviewCount = trip.reviewCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
      className="border rounded-lg shadow transition flex flex-col gap-2 bg-white"
    >
      {/* Trip Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={tripImage}
          alt={`${trip.destination?.city ?? "Trip"} Image`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Dark overlay to make badges visible */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top-left: Creator Type + Creator Info */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {/* Trip Type Badge */}
          {trip.creatorType && (
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              {trip.creatorType}
            </span>
          )}

          {/* Creator Info */}
          {trip.user && (
            <Link
              href={`/allUser/${trip.user._id}`}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-md"
            >
              <img
                src={trip.user.picture || DEFAULT_IMAGE}
                alt={creator}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-gray-800">{creator}</span>
            </Link>
          )}
        </div>

        {/* Top-right: Travel Type Badge */}
        {trip.travelType && (
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            {trip.travelType}
          </span>
        )}
      </div>

      {/* Trip Details */}
      <div className="px-3 pb-3 flex flex-col gap-1">
        <h3 className="font-bold text-lg">
          {trip.destination?.city ?? "Unknown"}, {trip.destination?.country ?? "Unknown"}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>
            {trip.startDate
              ? new Date(trip.startDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}{" "}
            -{" "}
            {trip.endDate
              ? new Date(trip.endDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </span>
        </div>

        {trip.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{trip.description}</p>
        )}

        {trip.budgetRange && (
          <span className="text-sm font-medium text-gray-700">
            Budget: {trip.budgetRange.min ?? 0} - {trip.budgetRange.max ?? 0} USD
          </span>
        )}

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
    </motion.div>
  );
}
