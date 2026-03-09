"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, MapPin, Globe2 } from "lucide-react";

/* ──────────────────── floating icon data ──────────────────── */
const floatingIcons = [
  { Icon: Plane, x: "10%", y: "20%", delay: 0, size: 28, rotate: -15 },
  { Icon: MapPin, x: "85%", y: "15%", delay: 0.5, size: 24, rotate: 10 },
  { Icon: Globe2, x: "75%", y: "75%", delay: 1, size: 32, rotate: -8 },
  { Icon: Plane, x: "15%", y: "70%", delay: 1.5, size: 22, rotate: 20 },
  { Icon: MapPin, x: "50%", y: "85%", delay: 0.8, size: 20, rotate: -5 },
];

/* ──────────────────── particle dots ──────────────────── */
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 4,
}));

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
      {/* ── mesh‑gradient blobs ── */}
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 blur-[120px]" />
      <div className="absolute bottom-[-80px] right-[-60px] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-purple-600/30 to-pink-400/20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-indigo-400/10 blur-[100px]" />

      {/* ── animated particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── floating travel icons ── */}
      {floatingIcons.map(({ Icon, x, y, delay, size, rotate }, idx) => (
        <motion.div
          key={idx}
          className="absolute text-white/10"
          style={{ left: x, top: y }}
          animate={{ y: [0, -18, 0], rotate: [rotate, rotate + 10, rotate] }}
          transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* ── grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center w-full">
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          2,500+ Travelers Already Connected
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight"
        >
          Find Your Perfect{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            Travel Buddy
          </span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed"
        >
          Connect with like‑minded travelers, plan trips together, and turn
          solo journeys into unforgettable shared adventures.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/match">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.04] overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                <Plane size={18} />
                Find Travel Buddy
              </span>
            </button>
          </Link>

          <Link href="/explore">
            <button className="px-8 py-4 border border-white/30 rounded-2xl font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 transition-all duration-300 hover:scale-[1.04] hover:border-white/50">
              Explore Travelers
            </button>
          </Link>
        </motion.div>

        {/* stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { label: "Active Travelers", value: "2,500+" },
            { label: "Trips Matched", value: "1,200+" },
            { label: "Countries", value: "85+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── bottom wave ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-white/[0.06]"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-white/[0.04]"
          />
        </svg>
      </div>
    </section>
  );
}
