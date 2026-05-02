/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getMyEnrollments 
} from "@/services/enrollment/enrollment.service";
import { 
  BookOpen, 
  Search, 
  Filter, 
  GraduationCap,
  LayoutGrid,
  Clock,
  PlayCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/modules/Dashboard/StatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StudentEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await getMyEnrollments();
      if (res.success) {
        setEnrollments(res.data);
        setFilteredEnrollments(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  useEffect(() => {
    const filtered = enrollments.filter(e => 
      e.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.course?.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnrollments(filtered);
  }, [searchTerm, enrollments]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/10 rounded-full animate-spin border-t-primary" />
            <BookOpen className="w-8 h-8 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Loading Enrollments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-10 animate-in fade-in duration-700 pb-20 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            My <span className="text-primary">Enrollments</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium text-lg">
            Track your progress and continue your learning journey.
          </p>
        </motion.div>

        <Link href="/items">
          <Button 
              size="lg"
              className="rounded-2xl font-bold shadow-xl shadow-primary/25 px-8 h-14 group"
          >
              <Search className="mr-2 h-5 w-5" />
              Explore More Courses
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard 
          title="Active Enrollments" 
          value={enrollments.length} 
          icon={LayoutGrid} 
          description="Courses you're studying" 
          iconColor="text-indigo-500"
        />
        <StatsCard 
          title="Hours Learned" 
          value="12.5" 
          icon={Clock} 
          description="Total study time" 
          iconColor="text-emerald-500"
        />
        <StatsCard 
          title="Completed" 
          value="2" 
          icon={GraduationCap} 
          description="Finished curriculums" 
          iconColor="text-amber-500"
        />
      </div>

      {/* Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
                <Search className="w-6 h-6" />
            </div>
            <div className="relative flex-1 md:w-80">
                <Input 
                    placeholder="Search by title or category..." 
                    className="h-12 pl-4 pr-10 rounded-2xl bg-slate-50 border-none focus-visible:ring-primary font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <Filter className="w-4 h-4" />
                </div>
            </div>
        </div>
      </motion.div>

      {/* Enrollments Grid */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredEnrollments.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredEnrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-[2.5rem]">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={enrollment.course?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                        alt={enrollment.course?.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                         <PlayCircle className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold">
                          {enrollment.course?.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{enrollment.course?.title}</h3>
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}
                         </span>
                         <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                            {enrollment.status}
                         </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                         <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>PROGRESS</span>
                            <span>45%</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[45%]" />
                         </div>
                      </div>

                      <Link href={`/dashboard/courses/${enrollment._id}`}>
                        <Button className="w-full rounded-xl font-bold">
                           Resume Learning
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-100"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                <BookOpen className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No enrollments found</h3>
              <p className="text-slate-400 font-medium mb-8 max-w-sm">
                You haven't enrolled in any courses yet. Start exploring our catalog to begin your journey!
              </p>
              <Link href="/items">
                <Button 
                  variant="outline"
                  className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 h-14 px-8 font-bold"
                >
                  Browse Courses
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


