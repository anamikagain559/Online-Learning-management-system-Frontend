"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  PlusCircle, 
  Clock, 
  Award, 
  Users, 
  TrendingUp,
  ArrowRight,
  PlayCircle
} from "lucide-react";
import Link from "next/link";
import { getMyCourses } from "@/services/course/course.service";
import { getMyEnrollments } from "@/services/enrollment/enrollment.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Role } from "@/types/user.interface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const UserDashboardPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await getUserInfo();
        setUserInfo(user);

        if (user.role === Role.INSTRUCTOR) {
          const res = await getMyCourses();
          if (res.success) setData(res.data);
        } else {
          const res = await getMyEnrollments();
          if (res.success) setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  const isInstructor = userInfo?.role === "INSTRUCTOR";

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Welcome back, <span className="text-primary">{userInfo?.name?.split(' ')[0] || "Scholar"}</span>!
          </h1>
          <p className="text-muted-foreground mt-2 font-medium text-lg">
            {isInstructor 
              ? "Your knowledge is shaping the future. Here's your teaching overview."
              : "Ready to continue your learning journey? Here's what's happening."}
          </p>
        </motion.div>
        
        <Link href={isInstructor ? "/items/add" : "/courses"}>
          <Button size="lg" className="rounded-2xl font-bold shadow-xl shadow-primary/25 px-8 h-14 group">
            {isInstructor ? (
              <>
                <PlusCircle className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                Create New Course
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Catalog
              </>
            )}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {isInstructor ? (
          <>
            <StatItem 
              title="My Courses" 
              value={data.length} 
              icon={GraduationCap} 
              desc="Courses you've created" 
              color="text-blue-500" 
              bg="bg-blue-500/10" 
              index={0}
            />
            <StatItem 
              title="Total Students" 
              value="1.2k" 
              icon={Users} 
              desc="Learning from you" 
              color="text-emerald-500" 
              bg="bg-emerald-500/10" 
              index={1}
            />
            <StatItem 
              title="Monthly Revenue" 
              value="$840" 
              icon={TrendingUp} 
              desc="Earnings this month" 
              color="text-amber-500" 
              bg="bg-amber-500/10" 
              index={2}
            />
          </>
        ) : (
          <>
            <StatItem 
              title="Enrolled Courses" 
              value={data.length} 
              icon={BookOpen} 
              desc="Active learning tracks" 
              color="text-indigo-500" 
              bg="bg-indigo-500/10" 
              index={0}
            />
            <StatItem 
              title="Hours Spent" 
              value="24.5" 
              icon={Clock} 
              desc="Total study time" 
              color="text-purple-500" 
              bg="bg-purple-500/10" 
              index={1}
            />
            <StatItem 
              title="Certificates" 
              value="3" 
              icon={Award} 
              desc="Completed courses" 
              color="text-rose-500" 
              bg="bg-rose-500/10" 
              index={2}
            />
          </>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              {isInstructor ? "Managed Courses" : "Continue Learning"}
            </h2>
            <Link href={isInstructor ? "/items/manage" : "/dashboard/courses"} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            {data.length > 0 ? (
              data.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                >
                  <Card className="overflow-hidden border-none shadow-lg shadow-slate-200/60 hover:shadow-xl transition-all duration-300 group bg-background/60 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-32 relative overflow-hidden">
                        <img 
                          src={(isInstructor ? item.image : item.course?.image) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                          alt="Course" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {!isInstructor && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="h-10 w-10 text-white fill-white/20" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                              {isInstructor ? item.title : item.course?.title}
                            </h3>
                            <Badge variant="secondary" className="rounded-lg text-[10px] font-bold uppercase tracking-wider">
                              {isInstructor ? (item.isPublic ? "Public" : "Private") : item.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {isInstructor ? item.description : item.course?.description}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          {!isInstructor && (
                            <div className="flex-1 max-w-[200px]">
                              <div className="flex justify-between text-[10px] font-bold mb-1 opacity-70">
                                <span>PROGRESS</span>
                                <span>65%</span>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[65%]" />
                              </div>
                            </div>
                          )}
                          <Link href={isInstructor ? `/items/manage/${item._id}` : `/dashboard/courses/${item._id}`}>
                            <Button variant="ghost" size="sm" className="font-bold text-xs group/btn">
                              {isInstructor ? "Edit Course" : "Resume Lesson"}
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="border-dashed border-2 py-16 bg-muted/5">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                    <BookOpen className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold">Nothing here yet</h3>
                  <p className="text-muted-foreground max-w-sm mt-2 mb-8">
                    {isInstructor 
                      ? "Start your teaching journey by creating your first course today!" 
                      : "Explore our catalog and find the perfect course to start your journey."}
                  </p>
                  <Link href={isInstructor ? "/items/add" : "/courses"}>
                    <Button variant="outline" className="rounded-xl font-bold">
                      {isInstructor ? "Create a Course" : "Browse Courses"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar/Quick Info */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl shadow-slate-200/60 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 blur-3xl -mt-10 -mr-10 rounded-full" />
            <CardHeader>
              <CardTitle className="text-lg font-bold">Upcoming Task</CardTitle>
              <CardDescription className="text-slate-400 font-medium italic">
                Don't miss out!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative z-10">
                <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                    15
                  </div>
                  <div>
                    <p className="text-sm font-bold">Live Q&A Session</p>
                    <p className="text-xs text-slate-400">Today at 4:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                    18
                  </div>
                  <div>
                    <p className="text-sm font-bold">New Assignment Due</p>
                    <p className="text-xs text-slate-400">Tomorrow at 11:59 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/60 overflow-hidden group">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Latest Achievement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 mb-4 group-hover:scale-110 transition-transform duration-500">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-lg font-black italic">Fast Learner</h4>
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  Completed 3 lessons in a single day!
                </p>
                <Button variant="ghost" size="sm" className="mt-4 text-xs font-bold text-primary">
                  View Badges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ title, value, icon: Icon, desc, color, bg, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Card className="border-none shadow-xl shadow-slate-200/60 group hover:translate-y-[-5px] transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em]">{title}</CardTitle>
        <div className={`${bg} p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300`}>
          <Icon className={`h-4.5 w-4.5 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black tracking-tight">{value}</div>
        <p className="text-[11px] text-muted-foreground mt-1 font-medium opacity-80">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default UserDashboardPage;

