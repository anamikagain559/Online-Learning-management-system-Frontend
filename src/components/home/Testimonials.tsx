"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Full-stack Developer",
    comment: "LearnHub made mastering React a breeze! The instructors are top-notch and the curriculum is very practical.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Maria Garcia",
    role: "UX Researcher",
    comment: "I love connecting with fellow learners. The community support here is unlike any other platform.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Liam Chen",
    role: "Data Scientist",
    comment: "The UI is gorgeous and the learning paths are spot-on for career growth. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      {/* background blobs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-100/30 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-100/30 blur-[120px] -z-10" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-px w-8 bg-indigo-600" />
             <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">Success Stories</span>
             <div className="h-px w-8 bg-indigo-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Loved by <span className="text-indigo-600">thousands</span> of learners
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Join a community of professionals who have transformed their careers through our platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-600 rounded-full blur-lg opacity-20 scale-110 group-hover:opacity-40 transition-opacity" />
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="relative w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover"
                />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <Quote className="h-4 w-4 fill-white" />
                </div>
              </div>
              
              <p className="text-slate-600 font-medium leading-relaxed mb-6 italic">
                &ldquo;{t.comment}&rdquo;
              </p>
              
              <div>
                <h4 className="text-lg font-black text-slate-900">{t.name}</h4>
                <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
