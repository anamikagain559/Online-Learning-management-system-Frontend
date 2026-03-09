"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex Johnson",
    comment: "Travel Buddy made planning my trip to Japan a breeze!",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Maria Garcia",
    comment: "I love connecting with fellow travelers through this app.",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Liam Chen",
    comment: "The UI is gorgeous and the recommendations are spot‑on.",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      {/* background blobs */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-pink-100/50 blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-yellow-100/50 blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            What Travelers Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Real stories from our community of wanderers.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full mb-4"
              />
              <p className="text-gray-800 italic mb-2">"{t.comment}"</p>
              <span className="text-sm font-medium text-gray-600">- {t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
