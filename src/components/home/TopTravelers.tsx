"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const travelers = [
  {
    name: "Ariana Lopez",
    country: "Spain",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    name: "Daniel Park",
    country: "South Korea",
    rating: "⭐⭐⭐⭐☆",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Sophia Williams",
    country: "USA",
    rating: "⭐⭐⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TopTravelers() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-14"
      >
        Top Travel Buddies
      </motion.h2>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid gap-8 px-6 md:grid-cols-3"
      >
        {travelers.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-2xl"
          >
            {/* Image */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/20"
            >
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Info */}
            <div className="mt-5 text-center">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.country}</p>

              <p className="mt-2 text-sm">{t.rating}</p>

              <p className="mt-3 text-sm text-gray-600">
                Passionate traveler who loves exploring new cultures and
                connecting with people.
              </p>
            </div>

            {/* CTA */}
            <button className="mt-5 w-full rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white">
              View Profile
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
