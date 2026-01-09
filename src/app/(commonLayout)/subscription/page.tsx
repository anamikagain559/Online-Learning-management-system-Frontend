"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { getUserInfo } from "@/services/auth/getUserInfo";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SubscriptionPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] =
    useState<"MONTHLY" | "YEARLY" | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const res = await getUserInfo();
      if (res) setUser(res);
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-20 text-red-600">
        Please login first
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Choose Your Subscription
      </h1>

      {/* PLAN SELECTION */}
      {!selectedPlan && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* MONTHLY */}
          <div className="border p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">Monthly Plan</h2>
            <p className="text-gray-600 mt-2">$10 / month</p>

            <button
              onClick={() => setSelectedPlan("MONTHLY")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Subscribe Monthly
            </button>
          </div>

          {/* YEARLY */}
          <div className="border p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">Yearly Plan</h2>
            <p className="text-gray-600 mt-2">$100 / year</p>

            <button
              onClick={() => setSelectedPlan("YEARLY")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Subscribe Yearly
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {selectedPlan && (
        <div className="mt-10">
          <button
            onClick={() => setSelectedPlan(null)}
            className="mb-6 text-sm text-gray-600 underline"
          >
            ← Change Plan
          </button>

          <Elements stripe={stripePromise}>
            <CheckoutForm plan={selectedPlan} user={user} />
          </Elements>
        </div>
      )}
    </div>
  );
}
