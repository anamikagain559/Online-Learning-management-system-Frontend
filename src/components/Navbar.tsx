
import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu, GraduationCap, LogOut, PlusCircle, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getUserInfo } from "@/services/auth/getUserInfo";
import UserDropdown from "./shared/UserDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "./shared/LogoutButton";

export default async function Navbar() {
  const userInfo = await getUserInfo();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const accessToken = await getCookie("accessToken");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Learn
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-slate-600 hover:text-indigo-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {accessToken ? (
            <UserDropdown user={userInfo || { name: "User", role: "STUDENT" }} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold text-slate-600 hover:text-indigo-600">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all active:scale-95">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 border-l-0 shadow-2xl">
              <div className="flex flex-col h-full bg-gradient-to-b from-white to-slate-50">
                <div className="p-6 border-b">
                  <SheetTitle className="text-left text-2xl font-bold text-indigo-950">LearnHub</SheetTitle>
                </div>
                
                <nav className="flex-1 px-4 py-8">
                  <div className="space-y-2 mb-8">
                    {navItems.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center px-4 py-3 rounded-xl text-lg font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-8">
                    {accessToken ? (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 px-4 py-3 bg-white rounded-2xl border border-indigo-50 shadow-sm">
                          <Avatar className="h-12 w-12 rounded-xl">
                            <AvatarImage src={userInfo?.picture} />
                            <AvatarFallback className="bg-indigo-600 text-white font-bold">{userInfo?.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-base font-bold text-slate-900 truncate">{userInfo?.name || "User"}</span>
                            <span className="text-xs text-slate-500 truncate">{userInfo?.email || "Signed In"}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                           <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            <LayoutDashboard size={20} className="text-indigo-500" /> Dashboard
                          </Link>
                          {(userInfo?.role === "INSTRUCTOR" || userInfo?.role === "ADMIN") && (
                            <>
                              <Link href="/items/add" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <PlusCircle size={20} className="text-indigo-500" /> Add Course
                              </Link>
                              <Link href="/items/manage" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <Settings size={20} className="text-indigo-500" /> Manage Courses
                              </Link>
                            </>
                          )}
                        </div>

                        <div className="pt-4 mt-auto">
                          <LogoutButton fullWidth />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 px-2">
                        <Link href="/login" className="w-full">
                          <Button variant="outline" className="w-full py-6 rounded-xl border-2 border-slate-200 font-bold text-slate-700">
                            Login
                          </Button>
                        </Link>
                        <Link href="/register" className="w-full">
                          <Button className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200 transition-all">
                            Register Now
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
