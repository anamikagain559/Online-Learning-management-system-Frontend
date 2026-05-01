"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CourseFormDialog from "../../User/Courses/CourseFormDialog";
import { useRouter } from "next/navigation";

export default function AddCourseButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-3 group"
      >
        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <Plus className="h-4 w-4" />
        </div>
        Add Course
      </Button>

      <CourseFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}
