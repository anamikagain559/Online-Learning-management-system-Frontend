"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { Bell, Menu, Search, Home, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  // Simple breadcrumb logic
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 transition-all duration-300">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100">
                <Menu className="h-5 w-5 text-slate-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 border-r-0 shadow-2xl">
              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || ""}
              />
            </SheetContent>
          </Sheet>

          {/* Breadcrumbs / Page Title */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
             <Link href="/dashboard" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Home className="h-4 w-4" />
             </Link>
             {pathSegments.map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                   <ChevronRight className="h-3 w-3 text-slate-300" />
                   <span className={`capitalize font-medium ${index === pathSegments.length - 1 ? "text-slate-900 font-bold" : "text-slate-400"}`}>
                      {segment.replace(/-/g, " ")}
                   </span>
                </div>
             ))}
          </div>

          <div className="sm:hidden flex items-center gap-2">
             <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
             <span className="font-bold text-slate-900">Dashboard</span>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input 
              type="search" 
              placeholder="Quick search courses, users..." 
              className="pl-10 h-10 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" 
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900">
                Hello, {userInfo?.name && userInfo.name !== "User" ? userInfo.name.split(" ")[0] : "Student"}!
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Welcome back</span>
           </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-100 group">
            <Bell className="h-5 w-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Button>

          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
