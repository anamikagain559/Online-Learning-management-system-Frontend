"use client";
import { motion } from "framer-motion";
const features = [
  {
    title: "Verified Travelers",
    description: "Travel with confidence and peace of mind.",
  },
  {
    title: "Smart Matching System",
    description: "Connect with travelers that match your interests and plans.",
  },
  {
    title: "Secure & Trusted Platform",
    description: "Your data and trips are safe with us at all times.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Why Choose Us
      </h2>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            className="p-6 border rounded-xl text-center bg-white shadow-sm hover:shadow-lg transition"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
