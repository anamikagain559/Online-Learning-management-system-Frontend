"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, BookOpen, TrendingUp, PlusCircle, CheckCircle, Clock } from "lucide-react";
import StatsCard from "@/components/modules/Dashboard/StatsCard";
import { getUsers } from "@/services/admin/usersManagement";
import { getAllCourses } from "@/services/course/course.service";
import { getAllEnrollments } from "@/services/enrollment/enrollment.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    pendingEnrollments: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
          getUsers(),
          getAllCourses(),
          getAllEnrollments(),
        ]);

        const users = usersRes?.data || [];
        const courses = coursesRes?.data || [];
        const enrollments = enrollmentsRes?.data || [];

        setStats({
          totalUsers: users.length,
          totalCourses: courses.length,
          totalEnrollments: enrollments.length,
          pendingEnrollments: enrollments.filter((e: any) => e.status === "PENDING").length,
        });

        setRecentEnrollments(enrollments.slice(0, 5));
        setRecentCourses(courses.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Admin Overview
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Manage your educational platform, courses, and student performance.
          </p>
        </motion.div>
        
        <div className="flex gap-3">
          <Link href="/admin/dashboard/courses">
            <Button variant="outline" className="rounded-xl font-semibold">
              Manage Courses
            </Button>
          </Link>
          <Link href="/admin/dashboard/user-management">
            <Button className="rounded-xl font-semibold shadow-lg shadow-primary/20">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Students" 
          value={stats.totalUsers} 
          icon={Users} 
          description="Across all roles" 
          iconColor="text-blue-500" 
        />
        <StatsCard 
          title="Active Courses" 
          value={stats.totalCourses} 
          icon={GraduationCap} 
          description="Published courses" 
          iconColor="text-emerald-500" 
        />
        <StatsCard 
          title="Total Enrollments" 
          value={stats.totalEnrollments} 
          icon={BookOpen} 
          description="Course subscriptions" 
          iconColor="text-indigo-500" 
        />
        <StatsCard 
          title="Pending Actions" 
          value={stats.pendingEnrollments} 
          icon={Clock} 
          description="Awaiting approval" 
          iconColor="text-amber-500" 
        />
      </div>


      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Enrollments */}
        <Card className="lg:col-span-4 border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-background/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Recent Enrollments</CardTitle>
                <CardDescription>Latest student course registrations</CardDescription>
              </div>
              <Link href="/admin/dashboard/enrollments">
                <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:bg-primary/10">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider">Student</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider">Course</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnrollments.length > 0 ? (
                  recentEnrollments.map((enrollment, idx) => (
                    <TableRow key={enrollment._id} className="hover:bg-muted/20 transition-colors group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {enrollment.user?.name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <p className="text-sm font-bold leading-none">{enrollment.user?.name || "N/A"}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{enrollment.user?.email || "No email"}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        <span className="text-sm font-medium">{enrollment.course?.title || "Unknown Course"}</span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`rounded-full px-2 py-0 text-[10px] font-bold ${
                            enrollment.status === "APPROVED" 
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          }`}
                        >
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10 text-muted-foreground font-medium">
                      No enrollments found yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Platform Highlights / Quick Actions */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/admin/dashboard/categories" className="col-span-2">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all group">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-sm">Manage Categories</span>
                </Button>
              </Link>
              <Link href="/admin/dashboard/user-management">
                <Button variant="secondary" className="w-full h-24 flex-col gap-2 rounded-2xl hover:scale-[1.02] transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xs">Users List</span>
                </Button>
              </Link>
              <Link href="/admin/dashboard/courses">
                <Button variant="secondary" className="w-full h-24 flex-col gap-2 rounded-2xl hover:scale-[1.02] transition-transform">
                  <BookOpen className="h-6 w-6 text-emerald-500" />
                  <span className="font-bold text-xs">Course Catalog</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-gradient-to-br from-indigo-600 to-indigo-800 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
            <CardHeader>
              <CardTitle className="text-lg font-bold">Platform Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium opacity-80">Monthly Revenue</span>
                  <span className="text-xl font-black">$4,250</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-white" 
                  />
                </div>
                <p className="text-[10px] font-bold opacity-70 flex items-center gap-1 uppercase tracking-widest">
                  <TrendingUp className="h-3 w-3" /> 12% increase from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

