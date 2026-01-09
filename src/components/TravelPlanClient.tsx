"use client";

import { useEffect, useState } from "react";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { getReviewsByTravelPlan } from "@/services/review/review.service"; // <--- use server service
import { Calendar } from "lucide-react";

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

export default function TravelPlanClient({ id }: { id: string }) {
  const [trip, setTrip] = useState<ITravelPlan | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTripAndReviews = async () => {
      setLoading(true);
      try {
        // Fetch travel plan
        const res = await getPublicTravelPlans();
        if (!res.success) {
          setError(res.message || "Failed to fetch travel plan");
          setLoading(false);
          return;
        }

        const foundTrip = res.data.find((plan: ITravelPlan) => plan._id === id);
        if (!foundTrip) {
          setError("Travel plan not found");
          setLoading(false);
          return;
        }

        setTrip(foundTrip);

        // Fetch reviews using server service
        const reviewsRes = await getReviewsByTravelPlan(id);
        if (!reviewsRes.success) {
          setRating(0);
          setReviewCount(0);
        } else {
          const reviews = reviewsRes.data;
          const avgRating = reviews.length ? reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / reviews.length : 0;
          setRating(avgRating);
          setReviewCount(reviews.length);
        }

        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchTripAndReviews();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading travel plan...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!trip) return <p className="text-center mt-8">Travel plan not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{trip.destination.city}, {trip.destination.country}</h1>
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
        <Calendar className="w-4 h-4" />
        <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
        <span className="ml-auto font-semibold">{trip.travelType}</span>
      </div>
      <p className="text-gray-700 mb-2">{trip.description}</p>
      <p className="text-gray-700 mb-2">Budget: {trip.budgetRange.min} - {trip.budgetRange.max} USD</p>
      <div className="flex items-center gap-2 mb-4">
        <StarRating rating={rating} />
        <span className="text-gray-500">({reviewCount} reviews)</span>
      </div>
    </div>
  );
}
