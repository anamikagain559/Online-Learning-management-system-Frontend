"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Search, Filter, BookOpen, Clock, Users, ArrowRight, LayoutTemplate } from "lucide-react";
import { getPublicCourses } from "@/services/course/course.service";
import { getAllCategories } from "@/services/category/category.service";
import { ICourse } from "@/types/course.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Default course image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80";

// Star rating component
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-amber-400 text-sm">
      {Array(fullStars).fill(0).map((_, i) => <span key={`full-${i}`}>★</span>)}
      {halfStar && <span>★</span>}
      {Array(emptyStars).fill(0).map((_, i) => <span key={`empty-${i}`}>☆</span>)}
    </div>
  );
}

export default function ItemsPage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [priceFilter, setPriceFilter] = useState("Any Price");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseRes, catRes] = await Promise.all([
          getPublicCourses(),
          getAllCategories()
        ]);

        if (courseRes.success) {
          setCourses(courseRes.data);
        } else {
          setError(courseRes.message || "Failed to load courses");
        }

        if (catRes.success) {
          setCategories(catRes.data);
        }
      } catch (err) {
        setError("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const categoryName = course.category ?? "";
    const categoryId = (course as any).categoryId?._id || (course as any).categoryId || "";
    
    const matchesSearch = categoryName.toLowerCase().includes(search.toLowerCase()) || 
                         (course.description ?? "").toLowerCase().includes(search.toLowerCase());

    const matchesLevel =
      levelFilter === "All Levels" ||
      (course.courseLevel && course.courseLevel.toUpperCase() === levelFilter.toUpperCase());

    const matchesCategory = 
      categoryFilter === "All Categories" || 
      categoryId === categoryFilter;

    const price = course.price ?? 0;
    const matchesPrice =
      priceFilter === "Any Price" ||
      (priceFilter === "Free" && price === 0) ||
      (priceFilter === "Economy" && price > 0 && price < 50) ||
      (priceFilter === "Mid-Range" && price >= 50 && price <= 200) ||
      (priceFilter === "Premium" && price > 200);

    return matchesSearch && matchesLevel && matchesPrice && matchesCategory;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-slate-500 font-medium">Loading amazing courses...</p>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 font-bold text-xl">{error}</p>
      <Button onClick={() => window.location.reload()} className="mt-4 bg-indigo-600">Try Again</Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Explore Our <span className="text-indigo-600">Courses</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Master new skills with our comprehensive online courses led by industry experts.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 mb-12 space-y-6">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for courses, skills, or topics..."
            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <LayoutTemplate className="h-4 w-4 text-slate-500" />
            <select
              className="bg-transparent border-none focus:ring-0 text-slate-600 font-bold text-sm outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <Filter className="h-4 w-4 text-slate-500" />
            <select
              className="bg-transparent border-none focus:ring-0 text-slate-600 font-bold text-sm outline-none"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option>All Levels</option>
              <option>BEGINNER</option>
              <option>INTERMEDIATE</option>
              <option>ADVANCED</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <Clock className="h-4 w-4 text-slate-500" />
            <select
              className="bg-transparent border-none focus:ring-0 text-slate-600 font-bold text-sm outline-none"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option>Any Price</option>
              <option value="Free">Free</option>
              <option value="Economy">Under $50</option>
              <option value="Mid-Range">$50 - $200</option>
              <option value="Premium">Above $200</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-slate-600 font-medium">Showing <span className="text-indigo-600 font-bold">{filteredCourses.length}</span> courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const instructor = (course as any).instructorId?.name || course.user?.name || "Professional Instructor";
          const courseImage = course.image || DEFAULT_IMAGE;
          const displayCategory = (course as any).categoryId?.name || course.category || "General";

          return (
            <Card key={course._id} className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl flex flex-col h-full bg-white">
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={courseImage}
                  alt={course.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-white/90 backdrop-blur-md text-indigo-700 border-none shadow-sm font-black px-3 py-1 text-[10px] uppercase">
                    {course.courseLevel || "Standard"}
                  </Badge>
                  <Badge className="bg-indigo-600/90 backdrop-blur-md text-white border-none shadow-sm font-black px-3 py-1 text-[10px] uppercase">
                    {displayCategory}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <p className="text-white text-sm font-medium line-clamp-2">{course.description}</p>
                </div>
              </div>

              <CardHeader className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100">
                    {(course as any).instructorId?.picture || course.user?.picture ? (
                      <img src={(course as any).instructorId?.picture || course.user?.picture} alt={instructor} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="h-4 w-4 text-indigo-600" />
                    )}
                  </div>
                  <span className="text-sm font-bold text-slate-500 truncate max-w-[150px]">{instructor}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {course.category}
                </h3>
              </CardHeader>

              <CardContent className="p-6 pt-2 flex-grow">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>{course.startDate ? new Date(course.startDate).toLocaleDateString() : "Flexible Start"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={4.5} />
                    <span className="font-black text-slate-700">(128)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 font-bold">Industry Standard Curriculum</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tuition Fee</p>
                  <p className="text-2xl font-black text-slate-900">
                    ${course.price ?? 0}
                  </p>
                </div>
                <Link href={`/items/${course._id}`}>
                  <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 group/btn px-6 font-bold">
                    <span className="flex items-center gap-2">
                      Enroll Now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="bg-white h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Search className="h-12 w-12 text-slate-200" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-2">No matching courses</h3>
          <p className="text-slate-500 font-medium">Try broadening your filters or search terms.</p>
          <Button 
            variant="outline" 
            className="mt-8 h-12 px-8 rounded-xl border-slate-200 font-bold hover:bg-white"
            onClick={() => {
              setSearch("");
              setLevelFilter("All Levels");
              setPriceFilter("Any Price");
              setCategoryFilter("All Categories");
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
