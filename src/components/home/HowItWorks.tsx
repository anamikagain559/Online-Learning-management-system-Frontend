"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, GraduationCap, ArrowRight, Search, Award } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Join LearnHub",
    desc: "Create your personalized learner profile and define your educational goals for a tailored experience.",
    icon: UserPlus,
    gradient: "from-indigo-600 to-blue-500",
    shadowColor: "shadow-indigo-500/20",
  },
  {
    step: "02",
    title: "Choose a Course",
    desc: "Browse our extensive catalog of expert-led courses across technology, design, and business.",
    icon: Search,
    gradient: "from-purple-600 to-indigo-500",
    shadowColor: "shadow-purple-500/20",
  },
  {
    step: "03",
    title: "Start Mastering",
    desc: "Engage with interactive content, complete hands-on projects, and earn industry-recognized certificates.",
    icon: Award,
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4 uppercase tracking-widest">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-lg font-medium">
            Mastering a new skill has never been easier with our streamlined learning journey.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-3"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group relative rounded-[2.5rem] bg-white p-10 shadow-xl ${item.shadowColor} border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-indigo-100`}
              >
                {/* Step number watermark */}
                <span className="absolute top-6 right-8 text-8xl font-black text-gray-50 select-none group-hover:text-indigo-50 transition-colors duration-500">
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.gradient} text-white shadow-xl ${item.shadowColor} transform group-hover:scale-110 transition-transform duration-500`}
                >
                  <Icon className="h-9 w-9" />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-gray-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-indigo-50 group-hover:border-indigo-200 transition-all">
                    <ArrowRight className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600" />
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
