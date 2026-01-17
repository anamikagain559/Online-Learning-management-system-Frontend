"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Trash2, Edit2 } from "lucide-react";
import Swal from "sweetalert2";

import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import {
  createReview,
  getReviewsByTravelPlan,
  deleteReview,
  updateReview,
} from "@/services/review/review.service";
import { ITravelPlan } from "@/types/travelPlan.interface";

/* ---------------- Star Display ---------------- */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex gap-1 text-yellow-400 text-lg">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`}>☆</span>
      ))}
    </div>
  );
}

/* ---------------- Star Input ---------------- */
function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1 text-2xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={star <= value ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function ExploreDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [trip, setTrip] = useState<ITravelPlan | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_IMAGE = "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg";

  /* -------- Fetch Travel Plan + Reviews -------- */
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);

      const planRes = await getPublicTravelPlans();
      if (!planRes.success) {
        setError(planRes.message || "Failed to load travel plan");
        setLoading(false);
        return;
      }

      const found = planRes.data.find((p: ITravelPlan) => p._id === id);
      if (!found) {
        setError("Travel plan not found");
        setLoading(false);
        return;
      }

      setTrip(found);

      const reviewRes = await getReviewsByTravelPlan(id);
      if (reviewRes.success) {
        const list = reviewRes.data;
        setReviews(list);
        setReviewCount(list.length);

        const avg =
          list.length === 0
            ? 0
            : list.reduce((acc: number, r: any) => acc + r.rating, 0) /
              list.length;

        setRating(avg);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  /* -------- Submit or Edit Review -------- */
  const handleSubmitReview = async () => {
    if (!reviewRating || !comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete",
        text: "Please give rating and comment",
      });
      return;
    }

    try {
      setSubmitting(true);

      let res;
      if (editingId) {
        // Update existing review
        res = await updateReview(editingId, { rating: reviewRating, comment });
      } else {
        // Create new review
        res = await createReview({
          travelPlan: id,
          rating: reviewRating,
          comment,
        });
      }

      if (!res.success) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.message || "Failed to submit review",
        });
        return;
      }

      // Update UI
      const updatedReview = res.data;
      let newReviews;
      if (editingId) {
        newReviews = reviews.map((r) => (r._id === editingId ? updatedReview : r));
        setEditingId(null);
      } else {
        newReviews = [updatedReview, ...reviews];
      }

      setReviews(newReviews);
      setReviewCount(newReviews.length);

      const avg =
        newReviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        newReviews.length;

      setRating(avg);
      setReviewRating(0);
      setComment("");

      Swal.fire({
        icon: "success",
        title: editingId ? "Updated!" : "Thank you!",
        text: editingId
          ? "Review updated successfully"
          : "Review submitted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* -------- Delete Review -------- */
  const handleDeleteReview = async (reviewId: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await deleteReview(reviewId);
      if (res.success) {
        const newReviews = reviews.filter((r) => r._id !== reviewId);
        setReviews(newReviews);
        setReviewCount(newReviews.length);

        const avg =
          newReviews.length === 0
            ? 0
            : newReviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
              newReviews.length;
        setRating(avg);

        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      } else {
        Swal.fire("Error", res.message || "Failed to delete review", "error");
      }
    }
  };

  /* -------- Start Editing -------- */
  const handleEditReview = (review: any) => {
    setEditingId(review._id);
    setReviewRating(review.rating);
    setComment(review.comment);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* -------- UI States -------- */
  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!trip) return null;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">
        {trip.destination.city}, {trip.destination.country}
      </h1>

      <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
        <Calendar className="w-4 h-4" />
        <span>
          {new Date(trip.startDate).toLocaleDateString()} –{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </span>
        <span className="ml-auto font-semibold">{trip.travelType}</span>
      </div>

      <p className="text-gray-700 mb-2">{trip.description}</p>
      <p className="text-gray-700 mb-4">
        Budget: {trip.budgetRange.min} – {trip.budgetRange.max} USD
      </p>

      {/* Rating Summary */}
      <div className="flex items-center gap-2 mb-6">
        <StarRating rating={rating} />
        <span className="text-gray-500">({reviewCount} reviews)</span>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 mb-8">
        {reviews.length === 0 && <p className="text-gray-500">No reviews yet</p>}

        {reviews.map((r) => (
          <div key={r._id} className="border rounded-lg p-4 bg-gray-50 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={r.reviewer?.picture || DEFAULT_IMAGE}
                  alt={r.reviewer?.name || "Anonymous"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <strong>{r.reviewer?.name || "Anonymous"}</strong>
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={r.rating} />
                {/* Edit/Delete if reviewer matches current user */}
                {r.isCurrentUser && (
                  <>
                    <button
                      onClick={() => handleEditReview(r)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(r._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 mt-2">{r.comment}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Add / Edit Review */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "Edit Your Review" : "Write a Review"}
        </h2>

        <StarInput value={reviewRating} onChange={setReviewRating} />

        <textarea
          className="w-full border rounded-lg p-3 mt-3"
          rows={4}
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmitReview}
          disabled={submitting}
          className="mt-3 bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {submitting ? "Submitting..." : editingId ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
