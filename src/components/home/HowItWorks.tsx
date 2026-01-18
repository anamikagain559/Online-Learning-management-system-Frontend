"use client";

import { motion } from "framer-motion";
import { UserPlus, Map, Users } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Sign Up",
    desc: "Create your travel profile with interests and preferences.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Create a Plan",
    desc: "Add your destination, dates, and travel style.",
    icon: Map,
  },
  {
    step: "03",
    title: "Find a Buddy",
    desc: "Match and connect with like-minded travelers.",
    icon: Users,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-6 pb-20">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        How It Works
      </motion.h2>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid gap-8 px-6 md:grid-cols-3"
      >
        {steps.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
              </div>

              {/* Step */}
              <p className="mt-4 text-center text-xs font-semibold tracking-wide text-primary">
                STEP {item.step}
              </p>

              {/* Title */}
              <h3 className="mt-2 text-center text-xl font-semibold">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-center text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
