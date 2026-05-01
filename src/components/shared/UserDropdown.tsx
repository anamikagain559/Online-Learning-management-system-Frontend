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
import { LogOut, PlusCircle, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth/logOutUser";
import { toast } from "sonner";

interface UserDropdownProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-indigo-100 hover:border-indigo-300 transition-colors">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.picture} alt={user.name || "User"} />
            <AvatarFallback className="bg-indigo-50 text-indigo-700">
              {user.name?.charAt(0) || <User size={18} />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2 py-1">
            <p className="text-sm font-semibold leading-none text-indigo-950">{user.name}</p>
            <p className="text-xs leading-none text-slate-500 truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer py-2 focus:bg-indigo-50 focus:text-indigo-700">
          <Link href="/items/add" className="flex items-center w-full">
            <PlusCircle className="mr-3 h-4 w-4" />
            <span>Add Course</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer py-2 focus:bg-indigo-50 focus:text-indigo-700">
          <Link href="/items/manage" className="flex items-center w-full">
            <LayoutDashboard className="mr-3 h-4 w-4" />
            <span>Manage Courses</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer py-2 text-rose-600 focus:bg-rose-50 focus:text-rose-700"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
