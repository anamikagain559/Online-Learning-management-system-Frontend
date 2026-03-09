"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MapPin, Briefcase } from "lucide-react";

const travelers = [
  {
    name: "Ariana Lopez",
    country: "Spain",
    trips: 28,
    rating: 4.9,
    role: "Travel Guide",
    bio: "Adventure seeker & culture lover. Always looking for the next hidden gem to discover.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
  },
  {
    name: "Daniel Park",
    country: "South Korea",
    trips: 35,
    rating: 4.8,
    role: "Food Explorer",
    bio: "Foodie traveler exploring street markets and local cuisines around the world.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
  },
  {
    name: "Sophia Williams",
    country: "USA",
    trips: 42,
    rating: 5.0,
    role: "Photographer",
    bio: "Passionate photographer capturing moments across 40+ countries and counting.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  },
];

export default function TopTravelers() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* subtle bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-50 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-4 tracking-wide uppercase">
            Our Community
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Top Travel Buddies
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Meet the most experienced and highly-rated travelers in our
            community
          </p>
        </motion.div>

        {/* Cards — each slides in from a different direction */}
        <div className="grid gap-8 md:grid-cols-3">
          {travelers.map((t, i) => {
            // Alternate slide directions: left, bottom, right
            const slideVariants = [
              { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
              { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } },
              { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
            ];

            return (
              <motion.div
                key={i}
                initial={slideVariants[i].hidden}
                whileInView={slideVariants[i].show}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] as [
                    number,
                    number,
                    number,
                    number
                  ],
                }}
                className="group rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Top section — avatar + name */}
                <div className="px-6 pt-8 pb-6 text-center border-b border-gray-100">
                  <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {t.name}
                  </h3>

                  <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {t.country}
                  </div>

                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-500">
                    <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                    {t.role}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-base font-semibold text-gray-800">
                        {t.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Rating</p>
                  </div>
                  <div className="py-4 text-center">
                    <span className="text-base font-semibold text-gray-800">
                      {t.trips}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">Trips</p>
                  </div>
                </div>

                {/* Bio + CTA */}
                <div className="px-6 py-5">
                  <p className="text-sm text-gray-500 leading-relaxed text-center">
                    {t.bio}
                  </p>

                  <button className="mt-5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200">
                    View Profile
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
