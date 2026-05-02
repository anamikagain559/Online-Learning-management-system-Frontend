"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, PlusCircle, LayoutDashboard, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/services/auth/logOutUser";
import { toast } from "sonner";

interface UserDropdownProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
    role?: string;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const isAdmin = user.role === "ADMIN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 outline-none group">
           <div className="flex flex-col items-end hidden sm:flex mr-1">
            <span className="text-[13px] font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {user.name}
            </span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              {user.role}
            </span>
          </div>
          <div className="relative h-10 w-10 rounded-xl p-0.5 border-2 border-indigo-50 group-hover:border-indigo-200 transition-all">
            <Avatar className="h-full w-full rounded-[10px]">
              <AvatarImage src={user.picture} alt={user.name || "User"} />
              <AvatarFallback className="bg-indigo-600 text-white font-bold rounded-[8px]">
                {user.name?.charAt(0) || <User size={16} />}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 shadow-sm" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mt-2 rounded-2xl p-2 shadow-2xl border-indigo-50" align="end">
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-slate-900">{user.name}</p>
            <p className="text-xs leading-none text-slate-500 truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-indigo-50" />
        
        <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-indigo-50 focus:text-indigo-700">
          <Link href="/dashboard" className="flex items-center w-full">
            <LayoutDashboard className="mr-3 h-4 w-4 opacity-70" />
            <span className="font-semibold">Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {(user.role === "STUDENT" || user.role === "USER") && (
          <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-indigo-50 focus:text-indigo-700">
            <Link href="/dashboard/courses" className="flex items-center w-full">
              <LayoutDashboard className="mr-3 h-4 w-4 opacity-70" />
              <span className="font-semibold">Your Courses</span>
            </Link>
          </DropdownMenuItem>
        )}

        {(user.role === "INSTRUCTOR" || user.role === "ADMIN") && (
          <>
            <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-indigo-50 focus:text-indigo-700">
              <Link href="/items/add" className="flex items-center w-full">
                <PlusCircle className="mr-3 h-4 w-4 opacity-70" />
                <span className="font-semibold">Add Course</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-indigo-50 focus:text-indigo-700">
              <Link href="/items/manage" className="flex items-center w-full">
                <LayoutDashboard className="mr-3 h-4 w-4 opacity-70" />
                <span className="font-semibold">Manage Courses</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {isAdmin && (
           <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-amber-50 focus:text-amber-700">
           <Link href="/admin/dashboard" className="flex items-center w-full">
             <ShieldCheck className="mr-3 h-4 w-4 opacity-70" />
             <span className="font-semibold text-amber-600">Admin Panel</span>
           </Link>
         </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-indigo-50" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer rounded-xl py-2.5 text-rose-600 focus:bg-rose-50 focus:text-rose-700 transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-bold">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
