"use client";

import { motion } from "framer-motion";

export default function Destinations() {
  const destinations = ["Paris", "Bangkok", "Bali", "Rome", "Tokyo", "Istanbul"];

  return (
    <section className="bg-gray-50 py-20">
      {/* Section Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Popular Destinations
      </motion.h2>

      {/* Destination Cards */}
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {destinations.map((place) => (
          <motion.div
            key={place}
            className="p-6 bg-white rounded-xl shadow text-center font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {place}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
