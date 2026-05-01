
import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu, GraduationCap, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getUserInfo } from "@/services/auth/getUserInfo";
import UserDropdown from "./shared/UserDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Navbar() {
  const userInfo = await getUserInfo();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    ...(userInfo?.role === "ADMIN" || userInfo?.role === "admin" ? [{ href: "/allUser", label: "All User" }] : []),
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
          {accessToken && userInfo ? (
            <UserDropdown user={userInfo} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold text-slate-600 hover:text-indigo-600">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200">Register</Button>
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
            <SheetContent side="right" className="w-[300px] p-6">
              <SheetTitle className="text-left text-2xl font-bold mb-8">Menu</SheetTitle>
              <nav className="flex flex-col space-y-6">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 flex flex-col space-y-4">
                  {accessToken && userInfo ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={userInfo.picture} />
                          <AvatarFallback>{userInfo.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">{userInfo.name}</span>
                          <span className="text-xs text-slate-500">{userInfo.email}</span>
                        </div>
                      </div>
                      <Link href="/items/add" className="text-lg font-semibold text-slate-700">
                        Add Course
                      </Link>
                      <Link href="/items/manage" className="text-lg font-semibold text-slate-700">
                        Manage Courses
                      </Link>
                      <Button variant="destructive" className="w-full justify-start gap-2">
                        <LogOut size={18} /> Logout
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Link href="/login" className="w-full">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" className="w-full">
                        <Button className="w-full bg-indigo-600">Register</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


