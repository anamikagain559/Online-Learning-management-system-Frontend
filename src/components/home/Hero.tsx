"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
      {/* background glow */}
      <div className="absolute -top-24 -left-24 h-96 w-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-24 h-96 w-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Find Your Perfect <br />
          <span className="text-yellow-300">Travel Buddy</span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90"
        >
          Connect with like-minded travelers, plan trips together, and turn solo
          journeys into unforgettable shared adventures.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
         <Link href="/match">
        <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
          Find Travel Buddy
        </button>
      </Link>

      <Link href="/explore">
        <button className="px-8 py-4 border border-white/70 rounded-2xl font-semibold backdrop-blur hover:bg-white/10 transition">
          Explore Travelers
        </button>
      </Link>
        </motion.div>
      </div>
    </section>
  );
}
