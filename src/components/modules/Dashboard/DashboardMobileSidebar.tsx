"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, ChevronRight } from "lucide-react";
import { logoutUser } from "@/services/auth/logOutUser";

interface DashboardMobileSidebarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarProps) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <span className="text-sm font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-lg font-bold tracking-tight">TravelBuddy</span>
        </Link>
      </div>
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-8">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-3">
              {section.title && (
                <h4 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary" />
                      )}

                      <Icon className={cn(
                        "h-4.5 w-4.5",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                      
                      <span className="flex-1">{item.title}</span>

                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-auto text-[10px] px-1.5 h-4.5 justify-center",
                            isActive ? "bg-primary/20 text-primary border-transparent" : ""
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}

                      {!isActive && (
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info & Logout */}
      <div className="p-4 border-t bg-accent/20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-1">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-sm font-bold text-primary">
                {userInfo.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-foreground leading-tight">
                {userInfo.name}
              </p>
              <p className="text-[11px] text-muted-foreground capitalize font-medium">
                {userInfo.role.toLowerCase()}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground/5 py-2.5 text-xs font-semibold text-muted-foreground transition-all active:scale-[0.98]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;
