import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";

const PublicNavbar = async () => {
  const navItems = [
    { href: "/explore", label: "Courses" },
    { href: "#", label: "Instructors" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  const accessToken = await getCookie("accessToken");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Learn
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  <Link href="/login" className="text-lg font-medium">
                    <Button>Login</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
