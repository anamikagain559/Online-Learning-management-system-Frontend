// app/subscription/page.tsx
"use client";

import { useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
}

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const plans: Plan[] = [
    { id: "basic", name: "Basic Plan", price: 5, description: "Access basic features", duration: "Monthly" },
    { id: "premium", name: "Premium Plan", price: 50, description: "Access all premium features", duration: "Yearly" },
  ];

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    try {
      // Call backend to create payment intent
      const res = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();

      // Redirect to payment page or integrate Stripe Checkout
      console.log("Payment Intent:", data);

      // For demo, mark as success
      setSuccess(true);
    } catch (err) {
      console.error("Subscription failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Choose Your Subscription</h1>
        <p className="text-gray-600 text-lg">
          Unlock premium features and verified badges to enhance your travel experience.
        </p>
      </section>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded text-center">
          Payment successful! Your subscription is now active.
        </div>
      )}

      <section className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-xl font-bold mb-4">${plan.price} / {plan.duration}</p>
            </div>
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </section>

      <section className="mt-12 text-center text-gray-600">
        <p>
          Need help? Contact us at <strong>contact@yourproject.com</strong>
        </p>
      </section>
    </main>
  );
}
