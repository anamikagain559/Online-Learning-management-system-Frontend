"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const destinations = [
  {
    name: "Paris",
    country: "France",
    emoji: "🗼",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  },
  {
    name: "Bangkok",
    country: "Thailand",
    emoji: "🏯",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
  },
  {
    name: "Bali",
    country: "Indonesia",
    emoji: "🌴",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  },
  {
    name: "Rome",
    country: "Italy",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  },
  {
    name: "Tokyo",
    country: "Japan",
    emoji: "⛩️",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    emoji: "🕌",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80",
  },
];

export default function Destinations() {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Trending Places
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            Explore the most loved travel spots by our community
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {destinations.map((place) => (
            <motion.div
              key={place.name}
              className="relative h-52 md:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md group"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
            >
              {/* Background image - clear, no hover effect */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${place.image})` }}
              />

              {/* Halka overlay শুধুমাত্র লেখার readability র জন্য। 
                রঙিন ইফেক্ট সরিয়ে দেওয়া হয়েছে।
              */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
                <span className="text-3xl mb-2">{place.emoji}</span>
                <h3 className="text-xl font-bold">{place.name}</h3>
                <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {place.country}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}