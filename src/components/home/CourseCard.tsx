"use client";

import Link from "next/link";
import { Calendar, BookOpen, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: {
    _id: string;
    category: string;
    image?: string;
    description?: string;
    courseLevel?: string;
    priceRange?: { min: number; max: number };
    user?: { name?: string; picture?: string };
    startDate?: string;
  };
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5 text-amber-400 text-sm">
      {Array(fullStars).fill(0).map((_, i) => <span key={`full-${i}`}>★</span>)}
      <span className="text-slate-400 ml-1 font-bold">4.5</span>
    </div>
  );
}

export default function CourseCard({ course }: CourseCardProps) {
  const instructor = course.user?.name || "Professional Instructor";
  const courseImage = course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80";

  return (
    <Card className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] flex flex-col h-full bg-white">
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={courseImage}
          alt={course.category}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-md text-indigo-700 border-none shadow-sm font-bold px-3 py-1">
            {course.courseLevel || "Standard"}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100">
            {course.user?.picture ? (
              <img src={course.user.picture} alt={instructor} className="w-full h-full object-cover" />
            ) : (
              <Users className="h-4 w-4 text-indigo-600" />
            )}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{instructor}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {course.category} Masterclass
        </h3>
      </CardHeader>

      <CardContent className="p-6 pt-2 flex-grow">
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {course.description || "Master the core concepts and advanced techniques in this comprehensive certification course."}
        </p>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-1.5 font-bold text-indigo-600/80">
            <BookOpen className="w-4 h-4" />
            <span>12 Modules</span>
          </div>
          <div className="flex items-center gap-1">
            <StarRating rating={4} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Price</p>
          <p className="text-xl font-black text-slate-900">
            ${course.priceRange?.min ?? 49}
          </p>
        </div>
        <Link href={`/items/${course._id}`}>
          <Button size="sm" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 group/btn">
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
