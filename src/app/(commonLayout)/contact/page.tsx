"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  MessageSquare, 
  Globe, 
  Clock, 
  CheckCircle2,
  ShieldCheck,
  Instagram,
  Twitter,
  Linkedin,
  Facebook
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@travelbuddy.com",
      description: "Our team usually responds within 24 hours.",
      color: "indigo"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm EST.",
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "San Francisco, CA",
      description: "888 Adventure Way, Travel Suite 101",
      color: "indigo"
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-indigo-200">
                Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                Let&apos;s Start a <span className="text-yellow-300">Conversation</span>
            </h1>
            <p className="text-indigo-100/80 text-lg md:text-xl leading-relaxed">
                Have questions, suggestions, or just want to say hi? We&apos;re here to help you make your next travel adventure unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 -mt-16 lg:-mt-24 relative z-20 mb-20">
            
            {/* Left Side: Contact Info & Illustration */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-[45%] space-y-8"
            >
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100/50">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Contact Information</h2>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        {contactInfo.map((info, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                    info.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'
                                }`}>
                                    <info.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{info.title}</h4>
                                    <p className="text-indigo-600 font-bold text-sm mb-0.5">{info.details}</p>
                                    <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 text-sm">Join the Community</h4>
                        <div className="flex gap-2">
                            {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative group">
                    <div className="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <Image 
                        src="/contact_support_illustration.png"
                        alt="Support Illustration"
                        width={600}
                        height={500}
                        className="rounded-[2.5rem] relative z-10 shadow-2xl border border-white"
                        priority
                    />
                </div>
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:w-[55%]"
            >
                <Card className="rounded-[2.5rem] bg-white shadow-2xl border-none p-8 md:p-12 h-full flex flex-col justify-center">
                    <div className="relative mb-10">
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center -rotate-12">
                            <MessageSquare className="w-6 h-6 text-indigo-500" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Send a Message</h2>
                        <p className="text-gray-500 text-lg">We typically respond within a few business hours.</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-10 text-center"
                            >
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Message Delivered!</h3>
                                <p className="text-emerald-700 leading-relaxed mb-8">
                                    Your adventure is one step closer. Our team will reach out to you very soon.
                                </p>
                                <Button 
                                    onClick={() => setSubmitted(false)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                                >
                                    Send Another
                                </Button>
                            </motion.div>
                        ) : (
                            <form key="form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</Label>
                                        <Input 
                                            id="name"
                                            placeholder="John Doe"
                                            className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-indigo-500 shadow-sm"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</Label>
                                        <Input 
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-indigo-500 shadow-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</Label>
                                    <Input 
                                        id="subject"
                                        placeholder="What's on your mind?"
                                        className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-indigo-500 shadow-sm"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-400">Message Content</Label>
                                    <Textarea 
                                        id="message"
                                        placeholder="Tell us everything..."
                                        className="min-h-[160px] bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-indigo-500 shadow-sm pt-4 resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        required
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full h-16 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden relative"
                                    disabled={loading}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? "Sending your message..." : "Send Message"} 
                                        {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </span>
                                </Button>
                            </form>
                        )}
                    </AnimatePresence>
                </Card>
            </motion.div>
        </div>

        {/* Support Banner */}
        <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pb-20"
        >
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-[2.5rem] p-8 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl relative z-10">
                    <h2 className="text-3xl font-bold mb-3">Need faster help?</h2>
                    <p className="text-indigo-100/70 text-lg">Our comprehensive FAQ guide covers everything from account setup to travel planning tips.</p>
                </div>
                
                <div className="flex gap-4 relative z-10">
                    <Button className="h-14 px-8 bg-white text-indigo-900 hover:bg-indigo-50 font-bold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95">
                        FAQ Center
                    </Button>
                </div>
            </div>
        </motion.section>
      </div>
    </main>
  );
}
