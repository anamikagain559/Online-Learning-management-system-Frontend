// app/travel-plans/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash, Edit, Plus } from "lucide-react";

interface TravelPlan {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelType: string;
  budget: string;
  description: string;
}

export default function TravelPlansPage() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch travel plans from backend
  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/travel-plans");
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Failed to fetch travel plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Delete plan function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this travel plan?")) return;
    try {
      const res = await fetch(`/api/travel-plans/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPlans(plans.filter((plan) => plan._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Travel Plans</h1>
        <Link
          href="/travel-plans/add"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" size={18} /> Add New Plan
        </Link>
      </div>

      {/* Loading state */}
      {loading ? (
        <p className="text-gray-600">Loading travel plans...</p>
      ) : plans.length === 0 ? (
        <p className="text-gray-600">You have no travel plans yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{plan.destination}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Dates:</strong> {plan.startDate} - {plan.endDate}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {plan.travelType}
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Budget:</strong> {plan.budget}
              </p>
              <p className="text-gray-700 mb-4">{plan.description}</p>

              <div className="flex gap-4">
                <Link
                  href={`/travel-plans/${plan._id}/edit`}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Edit size={16} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash size={16} /> Delete
                </button>
                <Link
                  href={`/travel-plans/${plan._id}`}
                  className="ml-auto text-gray-700 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
