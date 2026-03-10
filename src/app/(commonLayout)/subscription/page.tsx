"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Star, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const plans = [
  {
    type: "MONTHLY",
    name: "Explorer Monthly",
    price: 10,
    duration: "month",
    description: "Perfect for flexible travelers planning their next adventure.",
    features: [
      "Unlimited Travel Matching",
      "Advanced Destination Filters",
      "Standard Profile Badge",
      "Community Access",
      "Email Support",
    ],
    icon: Zap,
    color: "indigo",
  },
  {
    type: "YEARLY",
    name: "Globetrotter Annual",
    price: 100,
    duration: "year",
    description: "Best for frequent travelers who want to save more.",
    features: [
      "All Monthly Features",
      "2 Months Free (Save $20)",
      "Premium Pro Badge",
      "Priority Matching Algorithm",
      "24/7 Priority Support",
      "Early Access to New Features",
    ],
    icon: Star,
    color: "emerald",
    popular: true,
  },
];

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
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-gray-500 font-medium">Preparing your plans...</p>
        </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h2>
        <p className="text-red-700 mb-6">You need to be logged in to manage your subscription.</p>
        <button 
            onClick={() => window.location.href = '/login'}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
        >
            Login to Continue
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Upgrade Your <span className="text-indigo-600">Travel Game</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Unlock premium features, connect with more buddies, and get exclusive access to global travel insight.
                </p>
            </motion.div>
        </div>

        {/* PLAN SELECTION */}
        <AnimatePresence mode="wait">
        {!selectedPlan ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.type}
                whileHover={{ y: -8 }}
                className={`relative bg-white p-8 lg:p-10 rounded-3xl border-2 transition-all ${
                  plan.popular ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10' : 'border-gray-100 shadow-xl shadow-gray-200/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-8 px-4 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  <plan.icon className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 font-medium">/{plan.duration}</span>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className={`p-0.5 rounded-full ${
                        plan.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.type as any)}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group ${
                    plan.color === 'emerald' 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* CHECKOUT */
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <button
                            onClick={() => setSelectedPlan(null)}
                            className="text-sm font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-2 transition-colors mb-1"
                        >
                            <span className="text-lg">←</span> Change Plan
                        </button>
                        <h2 className="text-xl font-bold text-gray-900">Finalize Subscription</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Plan Selected</p>
                        <p className="text-lg font-bold text-indigo-600 capitalize">{selectedPlan.toLowerCase()}</p>
                    </div>
                </div>
                
                <div className="p-8 lg:p-12">
                    <div className="mb-8 p-4 bg-indigo-50 rounded-2xl flex items-center gap-4 text-indigo-700 border border-indigo-100/50">
                        <ShieldCheck className="w-6 h-6 flex-shrink-0" />
                        <p className="text-sm font-medium">Secure payment gateway powered by Stripe. Your data is always encrypted.</p>
                    </div>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm plan={selectedPlan} user={user} />
                    </Elements>
                </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* FAQ or Trust Section */}
        {!selectedPlan && (
            <div className="mt-24 grid md:grid-cols-3 gap-8 text-center border-t border-gray-200 pt-16">
                <div className="space-y-3">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center mx-auto text-indigo-600">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Secure Payments</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Encrypted transactions via Stripe industry-leading security.</p>
                </div>
                <div className="space-y-3">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center mx-auto text-indigo-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Instant Activation</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Premium features are unlocked immediately after checkout.</p>
                </div>
                <div className="space-y-3">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center mx-auto text-indigo-600">
                        <Star className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Global Community</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Join thousands of verified travelers around the world.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
