import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ITravelPlan } from "@/types/travelPlan.interface";

// Default creator image if none provided
const DEFAULT_CREATOR_IMAGE = "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg";

interface TripCardProps {
  trip: ITravelPlan;
}

export function TripCard({ trip }: TripCardProps) {
  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "N/A";

  return (
    <Card className="h-full flex flex-col rounded-xl border hover:shadow-md transition">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-200 rounded-t-xl overflow-hidden">
        {trip.image ? (
          <img
            src={trip?.image}
            alt="Travel"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-2 mt-3 px-5">
        <Link href={`/allUser/${trip.user?._id || ""}`} className="flex items-center gap-2">
       
          <img
  src={trip.user?.picture || DEFAULT_CREATOR_IMAGE}
  alt={trip.user?.name || "Creator"}  width={32}
            height={32}
     className="rounded-full object-cover"
/>
          <span className="text-sm font-medium">{trip.user?.name || "Unknown"}</span>
        </Link>
      </div>

      {/* Trip Details */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold line-clamp-1">
          {trip.destination.city}, {trip.destination.country}
        </h3>

        {/* Dates */}
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2 flex-1">
          {trip.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <span className="text-sm font-medium text-blue-600">
            {trip.travelType}
          </span>

          <Link href={`/explore/${trip._id}`}>
            <Button variant="ghost" size="sm">
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
