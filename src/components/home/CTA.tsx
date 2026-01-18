"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 py-24 text-white">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-3xl mx-auto text-center px-4"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Ready to Start Your Journey?
        </h2>

        <p className="mt-4 text-indigo-100 text-lg">
          Join now and find your next travel buddy today.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8"
        >
          <Link href="/login">
            <button className="px-10 py-4 bg-white text-indigo-700 rounded-2xl font-semibold shadow-xl hover:bg-indigo-50 transition">
              Join Now
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
