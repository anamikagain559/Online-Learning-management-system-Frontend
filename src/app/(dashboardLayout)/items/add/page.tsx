"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/services/course/course.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, DollarSign, Calendar, Layers, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AddItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      category: formData.get("category") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      priceRange: {
        min: Number(formData.get("priceMin")),
        max: Number(formData.get("priceMax")),
      },
      courseLevel: formData.get("courseLevel") as any,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      isPublic: true,
    };

    try {
      const res = await createCourse(data);
      if (res.success) {
        toast.success("Course added successfully!");
        router.push("/items/manage");
      } else {
        toast.error(res.message || "Failed to add course");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-none shadow-2xl shadow-indigo-100/50 rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black">Add New Course</CardTitle>
                <CardDescription className="text-indigo-100 text-lg">
                  Share your knowledge with the world by creating a new course.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category/Title */}
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-slate-700 font-bold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-500" />
                    Course Category / Title
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="e.g. Advanced React Patterns"
                    required
                    className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12"
                  />
                </div>

                {/* Course Level */}
                <div className="space-y-3">
                  <Label htmlFor="courseLevel" className="text-slate-700 font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    Difficulty Level
                  </Label>
                  <Select name="courseLevel" required defaultValue="BEGINNER">
                    <SelectTrigger className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Date */}
                <div className="space-y-3">
                  <Label htmlFor="startDate" className="text-slate-700 font-bold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    required
                    className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-3">
                  <Label htmlFor="endDate" className="text-slate-700 font-bold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    required
                    className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12"
                  />
                </div>

                {/* Price Min */}
                <div className="space-y-3">
                  <Label htmlFor="priceMin" className="text-slate-700 font-bold flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-indigo-500" />
                    Minimum Price ($)
                  </Label>
                  <Input
                    id="priceMin"
                    name="priceMin"
                    type="number"
                    placeholder="0"
                    required
                    className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12"
                  />
                </div>

                {/* Price Max */}
                <div className="space-y-3">
                  <Label htmlFor="priceMax" className="text-slate-700 font-bold flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-indigo-500" />
                    Maximum Price ($)
                  </Label>
                  <Input
                    id="priceMax"
                    name="priceMax"
                    type="number"
                    placeholder="100"
                    required
                    className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-3">
                <Label htmlFor="image" className="text-slate-700 font-bold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-indigo-500" />
                  Course Thumbnail URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  className="rounded-xl border-slate-200 focus:ring-indigo-500 h-12"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-slate-700 font-bold">Course Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what students will learn in this course..."
                  required
                  className="rounded-2xl border-slate-200 focus:ring-indigo-500 min-h-[150px] p-4"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-8 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.01]"
                >
                  {loading ? "Publishing Course..." : "Publish Course Now"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
