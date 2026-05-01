"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICourse, CourseLevel } from "@/types/course.interface";
import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "@/services/course/course.service";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Sparkles, BookOpen, Calendar, DollarSign, Image as ImageIcon, LayoutTemplate, Globe } from "lucide-react";

interface CourseFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  course?: ICourse | null;
}

export default function CourseFormDialog({
  open,
  onClose,
  onSuccess,
  course,
}: CourseFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    courseLevel: "BEGINNER" as CourseLevel,
    isPublic: true,
    description: "",
    image: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        category: course.category,
        startDate: course.startDate ? new Date(course.startDate).toISOString().split("T")[0] : "",
        endDate: course.endDate ? new Date(course.endDate).toISOString().split("T")[0] : "",
        minPrice: course.priceRange?.min?.toString() ?? "",
        maxPrice: course.priceRange?.max?.toString() ?? "",
        courseLevel: course.courseLevel,
        isPublic: course.isPublic ?? true,
        description: course.description || "",
        image: course.image || "",
      });
    } else {
      setFormData({
        category: "",
        startDate: "",
        endDate: "",
        minPrice: "",
        maxPrice: "",
        courseLevel: "BEGINNER",
        isPublic: true,
        description: "",
        image: "",
      });
    }
  }, [course, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      priceRange: {
        min: Number(formData.minPrice),
        max: Number(formData.maxPrice),
      },
      courseLevel: formData.courseLevel,
      isPublic: formData.isPublic,
      description: formData.description,
      image: formData.image,
    };

    try {
      let res;
      if (course?._id) {
        res = await updateCourse(course._id, payload);
      } else {
        res = await createCourse(payload);
      }

      if (res.success) {
        toast.success(course ? "Course updated!" : "New course published!");
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Failed to save course");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[2rem] border-none shadow-3xl p-0">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden flex items-center px-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-4 left-10 w-20 h-20 border-4 border-white rounded-full translate-x-3 translate-y-2" />
                <div className="absolute bottom-4 right-10 w-32 h-32 border-4 border-white/40 rounded-[2rem] rotate-12" />
            </div>
            <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div>
                     <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                        {course ? "Update Course" : "Publish New Course"}
                      </DialogTitle>
                    </DialogHeader>
                    <p className="text-white/70 text-sm font-medium">Define your curriculum and schedule</p>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Course Details</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="category" className="text-slate-600 pl-1">Course Category / Title</Label>
                        <Input
                            id="category"
                            placeholder="e.g. Web Development"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Schedule</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="startDate" className="text-slate-600 pl-1">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="endDate" className="text-slate-600 pl-1">End Date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Pricing</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="minPrice" className="text-slate-600 pl-1 text-[11px]">Min Price ($)</Label>
                        <Input
                            id="minPrice"
                            type="number"
                            placeholder="0"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.minPrice}
                            onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="maxPrice" className="text-slate-600 pl-1 text-[11px]">Max Price ($)</Label>
                        <Input
                            id="maxPrice"
                            type="number"
                            placeholder="500+"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.maxPrice}
                            onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <LayoutTemplate className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Level & Vision</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label className="text-slate-600 pl-1">Course Level</Label>
                        <Select
                            value={formData.courseLevel}
                            onValueChange={(value: CourseLevel) => setFormData({ ...formData, courseLevel: value })}
                        >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none focus:ring-indigo-500">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100">
                                <SelectItem value="BEGINNER" className="rounded-lg">Beginner</SelectItem>
                                <SelectItem value="INTERMEDIATE" className="rounded-lg">Intermediate</SelectItem>
                                <SelectItem value="ADVANCED" className="rounded-lg">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-50">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Visuals & Context</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="image" className="text-slate-600 pl-1">Course Banner URL</Label>
                        <Input
                            id="image"
                            placeholder="https://images.unsplash.com/..."
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="description" className="text-slate-600 pl-1">Course Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the curriculum, learning outcomes, and prerequisites..."
                            className="min-h-[120px] rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500 p-4 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 transition-colors hover:bg-slate-100/50 group cursor-pointer border border-slate-100">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                         <Globe className={`w-4 h-4 ${formData.isPublic ? 'text-emerald-500' : 'text-slate-400'}`} />
                         <Label className="text-slate-700 font-bold group-hover:text-slate-900">Public Enrollment</Label>
                    </div>
                    <p className="text-slate-400 text-xs font-semibold">Allow students to discover and enroll in this course</p>
                </div>
                <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPublic: checked })}
                    className="data-[state=checked]:bg-indigo-600"
                />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose} 
                disabled={loading}
                className="h-12 px-8 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading}
                className="h-12 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              {loading ? (
                  <div className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Processing...
                  </div>
              ) : course ? "Save Changes" : "Publish Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
