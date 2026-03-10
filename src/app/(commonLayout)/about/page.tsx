"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Users, 
  Map, 
  ShieldCheck, 
  Compass,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";

const teamMembers = [
  { 
    name: "Anamika Gain", 
    role: "Founder & Lead Developer", 
    bio: "Passionate traveler and tech enthusiast building the future of community-driven travel.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anamika",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
  { 
    name: "Debabrota Gain", 
    role: "Co-Founder & Product Strategist", 
    bio: "Defining the vision and ensuring we deliver the best experience for every traveler.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debabrota",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
  { 
    name: "Sarah Miller", 
    role: "UI/UX Experience Designer", 
    bio: "Crafting beautiful and intuitive interfaces that make travel planning a joy.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
  { 
    name: "Michael Chen", 
    role: "Backend Architect", 
    bio: "Ensuring our systems are robust, secure, and lightning fast for users worldwide.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
];

const values = [
  { icon: Users, title: "Community First", description: "We believe travel is better together. Our platform is built on trust and connection." },
  { icon: Compass, title: "Deep Exploration", description: "Helping you find matches that share your passion for authentic, off-the-beaten-path experiences." },
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety and privacy are our top priorities, with verified profiles and secure interactions." },
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-indigo-200">
              Our Journey
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Bridging the Gap Between <span className="text-yellow-300">Travelers</span>
            </h1>
            <p className="text-indigo-100/80 text-lg md:text-xl leading-relaxed">
              We started with a simple idea: travel is more meaningful when shared. Our mission is to connect like-minded adventurers across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 border border-gray-100">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-2">
                <Map className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Our Story: Redefining the Way People Explore Together
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                TravelBuddy was born from the frustration of planning solo trips and missing out on the joy of shared discovery. We built this platform to ensure no traveler ever has to sit at a dinner table alone or miss an adventure because they couldn't find a partner.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <h4 className="text-3xl font-bold text-indigo-600">10k+</h4>
                  <p className="text-gray-500 text-sm font-medium">Active Travelers</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-bold text-indigo-600">50+</h4>
                  <p className="text-gray-500 text-sm font-medium">Countries Explored</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50" />
                <Image
                    src="/travel_collaboration_illustration.png"
                    alt="Team Collaboration"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-xl relative z-10"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group p-10 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden transition-all"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a seamless, safe, and inspiring global network where travelers can find meaningful connections, share resources, and create unforgettable memories together.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group p-10 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden transition-all"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-gray-900 mb-6 shadow-lg shadow-yellow-100">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the world's most trusted travel companion platform, empowering humanity to explore every corner of the earth through the power of community and shared passion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">The Values That Drive Us</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <div key={i} className="space-y-4">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <v.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{v.title}</h4>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Meet the Visionaries</h2>
            <p className="text-indigo-200/70 text-lg">
                The diverse team of innovators and globetrotters working behind the scenes to make your travel dreams a reality.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all hover:border-white/20"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500/30 p-1 group-hover:border-indigo-400 transition-colors">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover bg-indigo-100"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <span className="text-indigo-400 text-sm font-medium mb-4">{member.role}</span>
                <p className="text-gray-400 text-sm text-center line-clamp-2 mb-6">
                  {member.bio}
                </p>
                <div className="flex gap-4">
                  <a href={member.social.github} className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to Start Your Adventure?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20">
              Join the Community
            </button>
            <button className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-xl border border-indigo-400 hover:bg-indigo-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
