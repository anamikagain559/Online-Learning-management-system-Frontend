"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Calendar, 
  Trash2, 
  Edit2, 
  BookOpen, 
  Users, 
  Clock, 
  ArrowLeft, 
  Star, 
  CheckCircle,
  PlayCircle,
  FileText,
  Award
} from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { getPublicCourses } from "@/services/course/course.service";
import { ICourse } from "@/types/course.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ItemDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await getPublicCourses();
        if (res.success) {
          const found = res.data.find((c: ICourse) => c._id === id);
          if (found) {
            setCourse(found);
          } else {
            setError("Course not found");
          }
        } else {
          setError(res.message || "Failed to load course");
        }
      } catch (err) {
        setError("Something went wrong while fetching the course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-slate-500 font-medium">Loading course details...</p>
    </div>
  );

  if (error || !course) return (
    <div className="text-center py-20 px-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">{error || "Course not found"}</h2>
      <Button onClick={() => router.push("/items")} className="bg-indigo-600">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Back Button Overlay */}
      <div className="container mx-auto max-w-6xl px-4 pt-8 mb-4 relative z-20">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/items")}
          className="text-slate-600 hover:text-indigo-600 transition-colors bg-white/50 backdrop-blur-sm rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Courses
        </Button>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-indigo-50 text-indigo-700 border-none font-bold px-4 py-1.5 rounded-full">
                  {course.courseLevel || "Standard"}
                </Badge>
                <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold px-4 py-1.5 rounded-full">
                  Newly Added
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {course.category} Certification Masterclass
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-slate-900 font-bold">4.8</span>
                  <span>(1.2k Ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <span>15,420 students enrolled</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 w-fit">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={course.user?.picture} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700">
                    {course.user?.name?.charAt(0) || <Users size={18} />}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Instructor</p>
                  <p className="font-bold text-slate-800">{course.user?.name || "Professional Instructor"}</p>
                </div>
              </div>
            </motion.div>

            {/* Visual Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-100 group"
            >
              <img
                src={course.image || DEFAULT_IMAGE}
                alt={course.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="h-20 w-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white" />
                 </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-indigo-600" />
                Course Description
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                <p className="whitespace-pre-line">{course.description}</p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Hands-on projects and real-world scenarios",
                  "Lifetime access to course materials",
                  "Verified certificate of completion",
                  "Access to exclusive student community",
                  "Weekly live Q&A sessions with mentors",
                  "Comprehensive study guides and resources"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-indigo-100 border border-slate-100"
            >
              <div className="p-8">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-slate-900">${course.priceRange?.min || 0}</span>
                  <span className="text-slate-400 line-through text-xl font-bold">${(course.priceRange?.min || 0) + 50}</span>
                  <Badge className="bg-rose-50 text-rose-600 border-none font-bold ml-2">80% OFF</Badge>
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-8 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95">
                  Enroll Now
                </Button>
                
                <p className="text-center text-slate-400 text-sm mt-4 font-medium">30-Day Money-Back Guarantee</p>

                <div className="mt-10 space-y-5">
                  <p className="font-bold text-slate-900 flex items-center gap-2">
                    This course includes:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <PlayCircle className="h-4 w-4 text-indigo-500" />
                      <span>24 hours of high-quality video</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <FileText className="h-4 w-4 text-indigo-500" />
                      <span>12 downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <Clock className="h-4 w-4 text-indigo-500" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <Award className="h-4 w-4 text-indigo-500" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Course Info</h3>
                <div className="space-y-3">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Category</span>
                      <span className="font-bold text-slate-700">{course.category}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Language</span>
                      <span className="font-bold text-slate-700">English</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Last Updated</span>
                      <span className="font-bold text-slate-700">{course.startDate ? new Date(course.startDate).toLocaleDateString() : "N/A"}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
