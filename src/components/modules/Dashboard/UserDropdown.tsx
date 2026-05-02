"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/types/user.interface";
import { Settings, User, LogOut, ShieldCheck, Mail, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/services/auth/logOutUser";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const isAdmin = userInfo.role === "ADMIN";
  const userDisplayName = userInfo.name === "User" ? "Student" : userInfo.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center outline-none group">
           <div className="relative h-10 w-10 rounded-xl p-0.5 border-2 border-transparent group-hover:border-indigo-100 transition-all">
            <Avatar className="h-full w-full rounded-[8px]">
              <AvatarImage src={userInfo.picture} alt={userInfo.name || "User"} />
              <AvatarFallback className="bg-slate-100 text-slate-500 font-bold rounded-[6px]">
                {userInfo.name && userInfo.name !== "User" ? (
                  userInfo.name.charAt(0).toUpperCase()
                ) : (
                  <User size={18} className="text-slate-400" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 mt-2 rounded-2xl p-2 shadow-2xl border-indigo-50 animate-in fade-in zoom-in-95 duration-200">
        <DropdownMenuLabel className="p-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-slate-900 leading-none">{userDisplayName}</p>
            {userInfo.email && (
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Mail className="h-2.5 w-2.5" />
                <span className="truncate">{userInfo.email}</span>
              </div>
            )}
            <div className="mt-2">
               <span className="text-[9px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                  {userInfo.role || "Member"}
               </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100" />
        
        <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-indigo-50 focus:text-indigo-700">
          <Link href="/dashboard" className="flex items-center w-full">
            <LayoutDashboard className="mr-3 h-4 w-4 opacity-70" />
            <span className="font-semibold text-sm">Dashboard Home</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-indigo-50 focus:text-indigo-700">
          <Link href="/my-profile" className="flex items-center w-full">
            <User className="mr-3 h-4 w-4 opacity-70" />
            <span className="font-semibold text-sm">Profile Settings</span>
          </Link>
        </DropdownMenuItem>



        {isAdmin && (
           <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5 focus:bg-amber-50 focus:text-amber-700">
           <Link href="/admin/dashboard" className="flex items-center w-full">
             <ShieldCheck className="mr-3 h-4 w-4 opacity-70" />
             <span className="font-semibold text-sm text-amber-600">Admin Dashboard</span>
           </Link>
         </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-slate-100" />
        
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-xl py-2.5 text-rose-600 focus:bg-rose-50 focus:text-rose-700 transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-bold text-sm">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
