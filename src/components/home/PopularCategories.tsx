"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Sparkles, ArrowRight } from "lucide-react";
import { getAllCategories } from "@/services/category/category.service";
import Link from "next/link";

export default function PopularCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategories();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] -z-10">
          <div className="absolute top-20 right-20 w-96 h-96 border-[40px] border-indigo-600 rounded-full" />
          <div className="absolute bottom-20 left-10 w-64 h-64 border-[30px] border-purple-600 rounded-[3rem] rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">
                        Browse by category
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Explore Popular <span className="text-indigo-600">Learning Paths</span>
                </h2>
                <p className="mt-4 text-slate-500 text-lg font-medium">
                    Find the perfect course to advance your career and master new skills.
                </p>
            </motion.div>

            <Link href="/items">
                <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold hover:bg-slate-50 flex items-center gap-2">
                    View All Categories
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {categories.slice(0, 6).map((category) => (
            <motion.div
              key={category._id}
              className="group relative flex flex-col items-center text-center space-y-4 cursor-pointer"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
            >
              <div className="relative h-40 w-full rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-100 group-hover:-translate-y-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight px-2">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Inline Button import since it's used
import { Button } from "@/components/ui/button";