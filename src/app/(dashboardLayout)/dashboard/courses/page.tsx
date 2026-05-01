/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  getMyCourses,
  deleteCourse,
} from "@/services/course/course.service";
import { ICourse } from "@/types/course.interface";
import { BookOpen, Sparkles, Plus, Search, Filter, History, GraduationCap } from "lucide-react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import CourseCard from "@/components/modules/User/Courses/CourseCard";
import CourseFormDialog from "@/components/modules/User/Courses/CourseFormDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserCoursesPage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [, startTransition] = useTransition();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getMyCourses();
      if (res.success) {
        setCourses(res.data);
        setFilteredCourses(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course => 
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: "This curriculum will be permanently removed from your archive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
      background: "#fff",
      customClass: {
        popup: 'rounded-[2rem] border-none shadow-3xl',
        confirmButton: 'rounded-xl px-8 py-3 font-bold',
        cancelButton: 'rounded-xl px-8 py-3 font-bold'
      }
    });

    if (!result.isConfirmed) return;

    const res = await deleteCourse(id);

    if (res.success) {
      setCourses(prev => prev.filter(c => c._id !== id));
      Swal.fire({
        title: "Archived!",
        text: "Course removed from your records.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#fff",
        customClass: {
          popup: 'rounded-[2rem] border-none shadow-xl',
        }
      });
    }
  };

  const handleEdit = (course: ICourse) => {
    setEditingCourse(course);
    setOpen(true);
  };

  const handleCreate = () => {
    setEditingCourse(null);
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 rounded-full animate-spin border-t-indigo-600" />
            <BookOpen className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Curriculums...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-12 animate-in fade-in duration-700 pb-20">
      <ManagementPageHeader
        title="Course Management"
        description="Manage your learning modules and upcoming educational programs"
      >
        <Button 
            onClick={handleCreate}
            className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-3 group"
        >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                <Plus className="h-4 w-4" />
            </div>
            New Course
        </Button>
      </ManagementPageHeader>

      {/* Intelligence Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <Search className="w-6 h-6" />
            </div>
            <div className="relative flex-1 md:w-80">
                <Input 
                    placeholder="Search by category..." 
                    className="h-12 pl-4 pr-10 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-500 font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <Filter className="w-4 h-4" />
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex flex-col items-end pr-4 border-r border-slate-100 hidden sm:flex">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Total Courses</span>
                <span className="text-2xl font-black text-indigo-600">{courses.length}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
                <History className="w-6 h-6" />
            </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredCourses.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard 
                  key={course._id} 
                  course={course} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                <GraduationCap className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No courses found</h3>
              <p className="text-slate-400 font-medium mb-8 max-w-sm">
                Your curriculum vault is currently empty. Start by publishing your first course!
              </p>
              <Button 
                onClick={handleCreate}
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 h-12 px-6 font-bold"
              >
                Create First Course
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CourseFormDialog
        open={open}
        onClose={() => setOpen(false)}
        course={editingCourse}
        onSuccess={fetchCourses}
      />
    </div>
  );
}
