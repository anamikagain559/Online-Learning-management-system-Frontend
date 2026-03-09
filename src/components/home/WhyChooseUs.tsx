"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Brain, Lock } from "lucide-react";

const features = [
  {
    title: "Verified Travelers",
    description:
      "Every profile is verified so you can travel with confidence and peace of mind.",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-teal-400",
    bgGlow: "bg-emerald-500/10",
    shadowColor: "shadow-emerald-500/10",
  },
  {
    title: "Smart Matching System",
    description:
      "Our AI connects you with travelers that match your interests, budget, and travel style.",
    icon: Brain,
    gradient: "from-violet-500 to-purple-400",
    bgGlow: "bg-violet-500/10",
    shadowColor: "shadow-violet-500/10",
  },
  {
    title: "Secure & Trusted",
    description:
      "End-to-end encryption keeps your data, payments, and trip details safe at all times.",
    icon: Lock,
    gradient: "from-blue-500 to-cyan-400",
    bgGlow: "bg-blue-500/10",
    shadowColor: "shadow-blue-500/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-50 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Why TravelBuddy
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            Built with trust, intelligence, and security at the core
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg ${feature.shadowColor} text-center transition-all duration-300 hover:shadow-xl`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
              >
                {/* Glow bg */}
                <div
                  className={`absolute inset-0 rounded-3xl ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-gray-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
