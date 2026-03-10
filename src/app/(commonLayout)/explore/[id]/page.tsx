"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Trash2, Edit2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import { getPublicTravelPlans } from "@/services/travelPlan/travelPlan.service";
import {
  createReview,
  getReviewsByTravelPlan,
  deleteReview,
  updateReview,
} from "@/services/review/review.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import {
  sendBuddyRequest as sendReq,
  getPlanBuddies,
  getRequestsForTrip,
  respondToRequest as respondToBuddyReq
} from "@/services/buddyRequest/buddyRequest.service";
import { UserCircle, CheckCircle2, Clock } from "lucide-react";

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

  /* -------- Buddy State -------- */
  const [buddies, setBuddies] = useState<any[]>([]);
  const [hostRequests, setHostRequests] = useState<any[]>([]);
  const [userRequestStatus, setUserRequestStatus] = useState<string | null>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const DEFAULT_IMAGE = "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg";

  /* -------- Fetch Current User -------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/me`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setCurrentUser(data.data);
        }
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUser();
  }, []);

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

      // Fetch Buddies
      const buddiesRes = await getPlanBuddies(id);
      if (buddiesRes.success) setBuddies(buddiesRes.data);

      // If host, fetch requests
      if (found.user && currentUser?.id === found.user._id) {
        const hostReqRes = await getRequestsForTrip(id);
        if (hostReqRes.success) setHostRequests(hostReqRes.data);
      } else if (currentUser) {
        // Find current user's request status
        const allTripReqs = await getRequestsForTrip(id); // Usually you'd have a specific "mine" endpoint, but I'll filter for now
        if (allTripReqs.success) {
          const mine = allTripReqs.data.find((r: any) => r.userId?._id === currentUser._id);
          if (mine) setUserRequestStatus(mine.status);
        }
      }
    };

    fetchData();
  }, [id, currentUser]);

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
        res = await updateReview(editingId, { rating: reviewRating, comment });
      } else {
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

  /* -------- Buddy Request Logic -------- */
  const handleJoinRequest = async () => {
    if (!currentUser) {
      Swal.fire("Login Required", "Please log in to join this trip", "info");
      return;
    }

    try {
      setRequestLoading(true);
      const res = await sendReq(id);
      if (res.success) {
        setUserRequestStatus("PENDING");
        Swal.fire("Request Sent!", "Your request to join this trip is pending approval.", "success");
      } else {
        Swal.fire("Failed", res.message || "Failed to send request", "error");
      }
    } finally {
      setRequestLoading(false);
    }
  };

  const handleHostAction = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await respondToBuddyReq(requestId, status);
      if (res.success) {
        setHostRequests(prev => prev.map(r => r._id === requestId ? { ...r, status } : r));
        if (status === "APPROVED") {
          const approvedReq = hostRequests.find(r => r._id === requestId);
          if (approvedReq) setBuddies(prev => [...prev, approvedReq]);
        }
        Swal.fire("Success", `Request ${status.toLowerCase()} successfully`, "success");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to process request", "error");
    }
  };

  /* -------- UI States -------- */
  if (loading)
    return <p className="text-center mt-8 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!trip) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <img
          src={trip.image || DEFAULT_IMAGE}
          alt={`${trip.destination.city} image`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  {trip.travelType}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/30">
                  {trip.budgetRange.min} - {trip.budgetRange.max} USD
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3">
                {trip.destination.city}, {trip.destination.country}
              </h1>
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(trip.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  {" — "}
                  {new Date(trip.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-10 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content (Left, 2/3) */}
          <div className="md:col-span-2 space-y-8">
            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About this Trip</h2>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {trip.description}
              </p>
            </motion.div>

            {/* Joined Buddies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-100 shadow-inner"
            >
              <h3 className="text-xl font-bold text-indigo-950 flex items-center gap-3 mb-6">
                <UserCircle className="w-6 h-6 text-indigo-600" />
                Joined Buddies ({buddies.length})
              </h3>
              {buddies.length === 0 ? (
                <p className="text-indigo-400/80 italic text-center py-4">No one has joined yet. Be the first!</p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {buddies.map((b) => (
                    <div key={b._id} className="group relative">
                      <img
                        src={b.userId?.picture || DEFAULT_IMAGE}
                        alt={b.userId?.name}
                        title={b.userId?.name}
                        className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Host Requests Management */}
            {currentUser?._id === (trip.user as any)?._id && hostRequests.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
                <h3 className="text-xl font-bold text-indigo-900 mb-6">
                  Join Requests
                  <span className="ml-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {hostRequests.filter(r => r.status === "PENDING").length} pending
                  </span>
                </h3>
                <div className="space-y-4">
                  {hostRequests.map((req) => (
                    <div key={req._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all bg-white group gap-4">
                      <div className="flex items-center gap-4">
                        <img src={req.userId?.picture || DEFAULT_IMAGE} className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:ring-2 ring-indigo-100" />
                        <div>
                          <p className="font-bold text-slate-800">{req.userId?.name}</p>
                          <p className="text-xs font-semibold px-2 py-0.5 mt-1 rounded-full w-fit bg-slate-100 text-slate-500">{req.status}</p>
                        </div>
                      </div>
                      {req.status === "PENDING" && (
                        <div className="flex w-full sm:w-auto gap-2">
                          <button
                            onClick={() => handleHostAction(req._id, "APPROVED")}
                            className="flex-1 sm:flex-none bg-green-600 text-white font-semibold flex items-center justify-center gap-1 px-4 py-2 rounded-xl hover:bg-green-700 transition shadow-sm hover:shadow-md hover:shadow-green-200"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve
                          </button>
                          <button
                            onClick={() => handleHostAction(req._id, "REJECTED")}
                            className="flex-1 sm:flex-none bg-red-50 text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-100/80 hover:text-red-700 transition"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Sidebar (Right, 1/3) */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                {/* Rating Summary Snippet */}
                <div className="text-center pb-6 border-b border-slate-100 mb-6">
                  <h3 className="text-3xl font-black text-slate-800 mb-2">{rating.toFixed(1)}</h3>
                  <div className="flex justify-center mb-1">
                    <StarRating rating={rating} />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Based on {reviewCount} reviews</p>
                </div>

                {(!currentUser || currentUser?._id !== (trip.user as any)?._id) && (
                  <div>
                    {buddies.some(b => b.userId?._id === currentUser?._id) || userRequestStatus === "APPROVED" ? (
                      <div className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold bg-green-500 text-white shadow-lg shadow-green-200">
                        <CheckCircle2 className="w-6 h-6" />
                        You're officially a Buddy!
                      </div>
                    ) : !userRequestStatus ? (
                      <button
                        onClick={handleJoinRequest}
                        disabled={requestLoading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg py-4 rounded-2xl hover:from-indigo-700 hover:to-blue-700 transition-all shadow-xl shadow-indigo-200/50 disabled:opacity-50 transform hover:-translate-y-0.5"
                      >
                        {requestLoading ? "Sending..." : "Request to Join Trip"}
                      </button>
                    ) : (
                      <div className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold border-2 ${userRequestStatus === "PENDING" ? "border-amber-200 bg-amber-50 text-amber-700" :
                        "border-red-200 bg-red-50 text-red-700"
                        }`}>
                        <Clock className="w-5 h-5" />
                        {userRequestStatus === "PENDING" ? "Join Request Pending..." : "Request Rejected"}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Reviews Area full width below */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b">Traveler Reviews</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">


              {reviews.map((r) => (
                <motion.div
                  key={r._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-lg p-4 bg-gray-50 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={r.reviewer?.picture || DEFAULT_IMAGE}
                        alt={r.reviewer?.name || "Anonymous"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <strong>{r.reviewer?.name || "Anonymous"}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <StarRating rating={r.rating} />
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
                </motion.div>
              ))}
            </div>

            {/* Add / Edit Review */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm h-fit"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {editingId ? "Edit Your Review" : "Write a Review"}
              </h2>

              <StarInput value={reviewRating} onChange={setReviewRating} />

              <textarea
                className="w-full border-2 border-slate-200 focus:border-indigo-500 rounded-2xl p-4 mt-4 text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                rows={4}
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                className="mt-6 w-full bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl disabled:opacity-50 hover:bg-black transition-all shadow-lg hover:shadow-xl"
              >
                {submitting ? "Submitting..." : editingId ? "Update Review" : "Submit Review"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
