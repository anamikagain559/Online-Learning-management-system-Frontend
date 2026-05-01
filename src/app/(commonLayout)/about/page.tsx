"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Lightbulb,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  Award
} from "lucide-react";

const teamMembers = [
  { 
    name: "Dr. Anamika Gain", 
    role: "Founder & Lead Educator", 
    bio: "Passionate educator and tech visionary dedicated to democratizing high-quality tech education.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anamika",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
  { 
    name: "Debabrota Gain", 
    role: "Co-Founder & Curriculum Director", 
    bio: "Expert in instructional design with a focus on project-based learning and student success.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debabrota",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
  { 
    name: "Sarah Miller", 
    role: "Student Success Manager", 
    bio: "Ensuring every student has the resources and support they need to reach their career goals.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
  { 
    name: "Michael Chen", 
    role: "Tech Lead", 
    bio: "Building the scalable infrastructure that powers thousands of concurrent learning sessions.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    social: { github: "#", twitter: "#", linkedin: "#" }
  },
];

const values = [
  { icon: GraduationCap, title: "Student-Centric", description: "Every feature and course we design starts with the learner's experience and outcomes in mind." },
  { icon: Lightbulb, title: "Innovation", description: "We constantly update our curriculum to reflect the latest industry trends and technological shifts." },
  { icon: ShieldCheck, title: "Excellence", description: "We maintain the highest standards of quality in our content, platform, and student support services." },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-indigo-200">
              Our Vision
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Empowering the Next Generation of <span className="text-yellow-300">Innovators</span>
            </h1>
            <p className="text-indigo-100/80 text-lg md:text-xl leading-relaxed">
              LearnHub was founded with a single mission: to provide accessible, high-quality, and career-transforming education to anyone, anywhere in the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-16 border border-slate-50">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-2">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Our Story: Redefining the Digital Learning Experience
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                LearnHub started as a small community of developers sharing knowledge. Today, it has grown into a global platform where thousands of students master new skills, build impressive portfolios, and launch successful careers in tech. We believe that learning should be collaborative, project-based, and fun.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-1">
                  <h4 className="text-4xl font-black text-indigo-600">50k+</h4>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Active Learners</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-4xl font-black text-indigo-600">200+</h4>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Expert Courses</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-[2rem] rotate-3 -z-10" />
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                    alt="Students learning together"
                    className="rounded-[2rem] shadow-2xl relative z-10 w-full h-[400px] object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/50 relative overflow-hidden transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                To create an accessible and inspiring digital ecosystem where every individual has the tools, mentorship, and community support needed to master new skills and achieve their full potential.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/50 relative overflow-hidden transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-900 mb-8 shadow-lg shadow-amber-100">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                To become the most impactful global education platform, bridging the skills gap and empowering millions to build the future of technology through continuous, collaborative learning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-20 text-slate-900">Values That Guide Us</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {values.map((v, i) => (
              <div key={i} className="space-y-6">
                <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 shadow-sm">
                  <v.icon className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{v.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium max-w-sm mx-auto">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Meet the Visionaries</h2>
            <p className="text-indigo-200/70 text-lg font-medium">
                The diverse team of educators and engineers working to revolutionize the learning experience.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all hover:border-white/20"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-300 border-2 border-indigo-500/30 p-1 group-hover:border-indigo-400">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full rounded-3xl object-cover bg-indigo-100"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <span className="text-indigo-400 text-sm font-bold uppercase tracking-wider mb-4">{member.role}</span>
                <p className="text-gray-400 text-sm text-center font-medium line-clamp-3 mb-6">
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
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Ready to Master New Skills?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-white text-indigo-700 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-2xl shadow-indigo-900/40 transform hover:-translate-y-1">
              Start Learning Now
            </button>
            <button className="px-10 py-5 bg-indigo-500 text-white font-black rounded-2xl border-2 border-indigo-400 hover:bg-indigo-600 transition-all transform hover:-translate-y-1">
              Browse Courses
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

