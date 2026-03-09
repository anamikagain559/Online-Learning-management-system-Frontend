"use client";

import { motion } from "framer-motion";
import { UserPlus, Map, Users, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Sign Up",
    desc: "Create your travel profile with interests, preferences, and dream destinations.",
    icon: UserPlus,
    gradient: "from-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
  },
  {
    step: "02",
    title: "Create a Plan",
    desc: "Add your destination, dates, budget, and travel style for the perfect trip.",
    icon: Map,
    gradient: "from-purple-500 to-pink-400",
    shadowColor: "shadow-purple-500/20",
  },
  {
    step: "03",
    title: "Find a Buddy",
    desc: "Get matched with like-minded travelers and start your adventure together.",
    icon: Users,
    gradient: "from-amber-500 to-orange-400",
    shadowColor: "shadow-amber-500/20",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden">
      {/* subtle bg decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            Simple Steps
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-lg">
            Three easy steps to find your perfect travel companion
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative rounded-3xl bg-white p-8 shadow-lg ${item.shadowColor} border border-gray-100 transition-all duration-300 hover:shadow-xl`}
              >
                {/* Step number watermark */}
                <span className="absolute top-4 right-6 text-7xl font-black text-gray-100 select-none group-hover:text-gray-200 transition-colors">
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg ${item.shadowColor}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
