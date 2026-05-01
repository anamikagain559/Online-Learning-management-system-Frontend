"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const courses = [
  {
    name: "Web Development",
    category: "Programming",
    emoji: "💻",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  },
  {
    name: "Data Science",
    category: "Data",
    emoji: "📊",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    name: "UI/UX Design",
    category: "Design",
    emoji: "🎨",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    name: "Digital Marketing",
    category: "Business",
    emoji: "📈",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    name: "AI & ML",
    category: "Advanced Tech",
    emoji: "🤖",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
  },
  {
    name: "Mobile App Dev",
    category: "Programming",
    emoji: "📱",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  },
];

export default function TopCourses() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            Trending Courses
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Explore Popular Categories
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            Discover the most in-demand skills loved by our student community
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
          {courses.map((course) => (
            <motion.div
              key={course.name}
              className="relative h-52 md:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md group"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${course.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
                <span className="text-3xl mb-2">{course.emoji}</span>
                <h3 className="text-xl font-bold">{course.name}</h3>
                <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {course.category}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
