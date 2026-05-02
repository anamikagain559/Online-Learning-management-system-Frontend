"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getPublicCourses } from "@/services/course/course.service";
import CourseCard from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy courses data for fallback/demonstration
const DUMMY_COURSES = [
  {
    _id: "dummy1",
    category: "Full Stack Web Development",
    description: "Master React, Next.js, and Node.js with hands-on projects and industry best practices.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    courseLevel: "ADVANCED",
    price: 199,
    user: { name: "John Doe", picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" }
  },
  {
    _id: "dummy2",
    category: "UI/UX Design Masterclass",
    description: "Learn to create stunning user interfaces and seamless user experiences using Figma and Adobe XD.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    courseLevel: "INTERMEDIATE",
    price: 149,
    user: { name: "Sarah Smith", picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
  },
  {
    _id: "dummy3",
    category: "Data Science & AI",
    description: "Dive deep into Python, Machine Learning, and Neural Networks to solve real-world data problems.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    courseLevel: "ADVANCED",
    price: 299,
    user: { name: "Alex Chen", picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" }
  }
];

export default function ExplorePreview() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await getPublicCourses();
        if (res?.success && res.data.length > 0) {
          // If we have real data, use it, otherwise use dummy
          setCourses(res.data.slice(0, 6));
        } else {
          setCourses(DUMMY_COURSES);
        }
      } catch (err) {
        setCourses(DUMMY_COURSES);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-[120px] -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
             <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Sparkles className="h-5 w-5" />
             </div>
             <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">
                Featured Courses
             </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Top Programs</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl text-lg font-medium leading-relaxed">
            Unlock your potential with courses designed and led by world-class industry professionals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/items">
            <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-all duration-300 shadow-2xl shadow-slate-200 hover:shadow-indigo-100 transform hover:-translate-y-1">
              Explore All Courses
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {courses.map((course) => (
            <motion.div
              key={course._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

/* ── Skeleton Card ── */
function CourseCardSkeleton() {
  return (
    <div className="rounded-[2.5rem] border border-slate-50 bg-white p-6 shadow-sm space-y-6">
      <Skeleton className="h-52 w-full rounded-3xl" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-24 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}
