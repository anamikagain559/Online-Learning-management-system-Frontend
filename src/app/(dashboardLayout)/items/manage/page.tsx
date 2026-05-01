"use client";

import { useEffect, useState } from "react";
import { getMyCourses, deleteCourse } from "@/services/course/course.service";
import { ICourse } from "@/types/course.interface";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Eye, 
  Plus, 
  LayoutDashboard, 
  MoreVertical,
  Search,
  BookOpen,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ManageItemsPage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMyCourses = async () => {
    setLoading(true);
    try {
      const res = await getMyCourses();
      if (res.success) {
        setCourses(res.data);
      }
    } catch (err) {
      toast.error("Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await deleteCourse(id);
      if (res.success) {
        toast.success("Course deleted successfully");
        setCourses(courses.filter(c => c._id !== id));
      } else {
        toast.error(res.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const filteredCourses = courses.filter(c => 
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-indigo-600" />
            Manage My Courses
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Monitor and manage all the courses you've published.</p>
        </div>
        <Link href="/items/add">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl px-6 py-6 shadow-xl shadow-indigo-100 flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New Course
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-2xl shadow-indigo-100/50 rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
           <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Filter your courses..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-slate-800 py-6 px-8">Course Info</TableHead>
                <TableHead className="font-bold text-slate-800">Level</TableHead>
                <TableHead className="font-bold text-slate-800">Date Range</TableHead>
                <TableHead className="font-bold text-slate-800">Price</TableHead>
                <TableHead className="font-bold text-slate-800 text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-slate-400">
                     <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <span>Loading your courses...</span>
                     </div>
                  </TableCell>
                </TableRow>
              ) : filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-60 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <div className="bg-slate-50 p-6 rounded-full">
                          <BookOpen className="h-12 w-12 text-slate-200" />
                       </div>
                       <p className="text-slate-500 font-medium">No courses found matching your criteria.</p>
                       <Link href="/items/add">
                          <Button variant="outline" className="rounded-xl">Create your first course</Button>
                       </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course._id} className="group hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0">
                          <img 
                            src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80"} 
                            alt={course.category} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{course.category}</p>
                          <p className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[200px]">{course.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        course.courseLevel === "BEGINNER" ? "bg-emerald-50 text-emerald-700" :
                        course.courseLevel === "INTERMEDIATE" ? "bg-amber-50 text-amber-700" :
                        "bg-rose-50 text-rose-700"
                      } border-none font-bold px-3 py-1`}>
                        {course.courseLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-black text-slate-900">${course.priceRange?.min}</span>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/items/${course._id}`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-slate-400">
                                <MoreVertical className="h-4 w-4" />
                             </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-xl">
                             <DropdownMenuItem onClick={() => handleDelete(course._id)} className="text-rose-600 focus:text-rose-700 focus:bg-rose-50 cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Course</span>
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
