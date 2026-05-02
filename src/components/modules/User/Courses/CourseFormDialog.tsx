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
import { getInstructors } from "@/services/admin/usersManagement";
import { getAllCategories } from "@/services/category/category.service";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Sparkles, BookOpen, Calendar, DollarSign, Image as ImageIcon, LayoutTemplate, Globe, Users, Tags } from "lucide-react";

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
  const [instructors, setInstructors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    category: "", // This will now be the Title of the course
    categoryId: "",
    instructorId: "",
    startDate: "",
    endDate: "",
    price: "",
    courseLevel: "BEGINNER" as CourseLevel,
    isPublic: true,
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [instRes, catRes] = await Promise.all([
                getInstructors(),
                getAllCategories()
            ]);
            if (instRes.success) setInstructors(instRes.data);
            if (catRes.success) setCategories(catRes.data);
        } catch (err) {
            console.error("Failed to fetch form data", err);
        }
    };
    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (course) {
      setFormData({
        category: (course as any).category || "",
        categoryId: (course as any).categoryId?._id || (course as any).categoryId || "",
        instructorId: (course as any).instructorId?._id || (course as any).instructorId || "",
        startDate: course.startDate ? new Date(course.startDate).toISOString().split("T")[0] : "",
        endDate: course.endDate ? new Date(course.endDate).toISOString().split("T")[0] : "",
        price: course.price?.toString() ?? "",
        courseLevel: course.courseLevel,
        isPublic: course.isPublic ?? true,
        description: course.description || "",
        image: course.image || "",
      });
    } else {
      setFormData({
        category: "",
        categoryId: "",
        instructorId: "",
        startDate: "",
        endDate: "",
        price: "",
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

    if (!formData.categoryId || !formData.instructorId) {
        toast.error("Please select a category and an instructor");
        setLoading(false);
        return;
    }

    const payload = {
      category: formData.category, // Title
      categoryId: formData.categoryId,
      instructorId: formData.instructorId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      price: Number(formData.price),
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
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto rounded-[2rem] border-none shadow-3xl p-0">
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
            {/* Title & Category */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Course Info</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="category" className="text-slate-600 pl-1">Course Title</Label>
                        <Input
                            id="category"
                            placeholder="e.g. Full Stack Web Development"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label className="text-slate-600 pl-1 flex items-center gap-2">
                            <Tags className="w-3.5 h-3.5" /> Category
                        </Label>
                        <Select
                            value={formData.categoryId}
                            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                        >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none focus:ring-indigo-500">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {categories.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Schedule */}
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
            {/* Pricing & Instructor */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Pricing & Lead</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="price" className="text-slate-600 pl-1">Course Price ($)</Label>
                        <Input
                            id="price"
                            type="number"
                            placeholder="99"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label className="text-slate-600 pl-1 flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" /> Instructor
                        </Label>
                        <Select
                            value={formData.instructorId}
                            onValueChange={(value) => setFormData({ ...formData, instructorId: value })}
                        >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none focus:ring-indigo-500">
                                <SelectValue placeholder="Assign Instructor" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {instructors.map((inst) => (
                                    <SelectItem key={inst._id} value={inst._id}>
                                        <div className="flex items-center gap-2">
                                            <span>{inst.name}</span>
                                            <span className="text-[10px] text-muted-foreground">({inst.email})</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Level */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <LayoutTemplate className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Difficulty</span>
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
            {/* Visuals */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Media & Content</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="image" className="text-slate-600 pl-1">Banner Image URL</Label>
                        <Input
                            id="image"
                            placeholder="https://images.unsplash.com/..."
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="description" className="text-slate-600 pl-1">Detailed Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Outline the curriculum and learning objectives..."
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
                         <Label className="text-slate-700 font-bold group-hover:text-slate-900">Public Visibility</Label>
                    </div>
                    <p className="text-slate-400 text-xs font-semibold">Make this course discoverable on the main catalog</p>
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
                       Publishing...
                  </div>
              ) : course ? "Save Changes" : "Create Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
