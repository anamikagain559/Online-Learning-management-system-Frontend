"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MapPin, Briefcase, GraduationCap } from "lucide-react";

const instructors = [
  {
    name: "Dr. Sarah Chen",
    country: "USA",
    courses: 24,
    rating: 4.9,
    role: "Senior AI Researcher",
    bio: "Passionate about making complex AI concepts accessible to everyone. 10+ years in Machine Learning.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
  },
  {
    name: "Marcus Holloway",
    country: "UK",
    courses: 15,
    rating: 4.8,
    role: "Lead Web Architect",
    bio: "Expert in modern frontend frameworks and scalable backend systems. Loves mentoring aspiring devs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Elena Rodriguez",
    country: "Spain",
    courses: 32,
    rating: 5.0,
    role: "UI/UX Design Master",
    bio: "Award-winning designer focused on human-centric digital experiences and creative workflows.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
  },
];

export default function TopInstructors() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* subtle bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-50 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4 tracking-wide uppercase">
            World-Class Mentors
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Meet Our Top Instructors
          </h2>
          <p className="mt-4 text-slate-500 max-w-lg mx-auto">
            Learn from industry experts who are passionate about sharing their knowledge and helping you grow.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {instructors.map((t, i) => {
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
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Top section — avatar + name */}
                <div className="px-6 pt-8 pb-6 text-center border-b border-slate-50">
                  <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300 border-4 border-white shadow-lg">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {t.name}
                  </h3>

                  <div className="flex items-center justify-center gap-1 text-slate-500 text-sm mt-1 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                    {t.country}
                  </div>

                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full w-fit mx-auto">
                    <Briefcase className="h-3.5 w-3.5" />
                    {t.role}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 divide-x divide-slate-50 bg-slate-50/50">
                  <div className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-indigo-600">
                      <Star className="h-4 w-4 fill-indigo-600" />
                      <span className="text-base font-bold">
                        {t.rating}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Rating</p>
                  </div>
                  <div className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-700">
                        <GraduationCap className="h-4 w-4 text-indigo-500" />
                        <span className="text-base font-bold">
                        {t.courses}
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Courses</p>
                  </div>
                </div>

                {/* Bio + CTA */}
                <div className="px-6 py-6">
                  <p className="text-sm text-slate-500 leading-relaxed text-center italic">
                    "{t.bio}"
                  </p>

                  <button className="mt-6 w-full rounded-xl bg-slate-900 text-white px-4 py-3 text-sm font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-slate-200">
                    View Courses
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
