"use client";

import { motion } from "framer-motion";
import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import { ICourse } from "@/types/course.interface";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCourse } from "@/services/course/course.service";
import { toast } from "sonner";
import CourseFormDialog from "../../User/Courses/CourseFormDialog";
import Swal from "sweetalert2";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Globe, 
  Lock, 
  ChevronRight,
  User,
  GraduationCap
} from "lucide-react";

interface CoursesTableProps {
  courses: ICourse[];
}

const CoursesTable = ({ courses }: CoursesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = async (course: ICourse) => {
    const confirmResult = await Swal.fire({
      title: "Delete Course?",
      text: "This action will permanently remove the course curriculum from the database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
      background: "#fff",
      customClass: {
        popup: 'rounded-3xl border-none shadow-2xl',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold'
      }
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await deleteCourse(course._id);
      if (res.success) {
        toast.success("Course removed successfully");
        handleRefresh();
      } else {
        toast.error(res.message || "Failed to delete course");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
    }
  };

  const columns: Column<ICourse>[] = [
    {
      header: "Course Overview",
      accessor: (course) => (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 py-1"
        >
          <div className="h-14 w-20 relative rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
             {course.image ? (
                <Image 
                  src={course.image} 
                  alt={course.category} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110 duration-500" 
                />
             ) : (
               <div className="h-full w-full bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase transition-colors group-hover:bg-slate-100">
                 No Image
               </div>
             )}
             <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              {course.category}
              <ChevronRight className="w-3 h-3 text-slate-300" />
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Online Learning
            </span>
          </div>
        </motion.div>
      ),
      sortKey: "category",
    },
    {
        header: "Instructor",
        accessor: (course) => (
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {course.user?.name || "Anonymous"}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Instructor</span>
            </div>
          </div>
        ),
    },
    {
      header: "Details",
      accessor: (course) => (
        <div className="flex flex-col gap-1.5">
            <Badge variant="outline" className="w-fit bg-slate-50 border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-wide">
                {course.courseLevel}
            </Badge>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>${course.priceRange.min.toLocaleString()} - ${course.priceRange.max.toLocaleString()}</span>
            </div>
        </div>
      ),
      sortKey: "courseLevel",
    },
    {
      header: "Timeline",
      accessor: (course) => (
        <div className="flex flex-col gap-1.5 py-1">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>{new Date(course.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 pl-5 relative">
            <div className="absolute left-1.5 top-[-4px] bottom-0 w-[1.5px] bg-slate-100" />
            <span>to {new Date(course.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Enrollment",
      accessor: (course) => (
        <Badge 
          className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-lg border-none text-[11px] font-bold tracking-tight shadow-sm ${
            course.isPublic 
              ? 'bg-emerald-50 text-emerald-600' 
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {course.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          {course.isPublic ? "Public Access" : "Private Only"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <ManagementTable
        data={courses}
        columns={columns}
        onEdit={(course) => setEditingCourse(course)}
        onDelete={handleDelete}
        getRowKey={(course) => course._id}
        emptyMessage="No course curriculums found in the vault."
      />

      <CourseFormDialog
        open={!!editingCourse}
        onClose={() => setEditingCourse(null)}
        course={editingCourse}
        onSuccess={handleRefresh}
      />
    </div>
  );
};

export default CoursesTable;
