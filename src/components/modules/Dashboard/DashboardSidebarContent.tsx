"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ChevronRight } from "lucide-react";
import { logoutUser } from "@/services/auth/logOutUser";

interface DashboardSidebarContentProps {
  userInfo?: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname() ?? "";

  const displayUserInfo = userInfo || { name: "User", role: "STUDENT" };

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-background/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex h-20 items-center px-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <span className="text-xl font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            LearnHub
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-8">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-3">
              {section.title && (
                <h4 className="px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
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
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-lg bg-primary/10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}

                      <Icon className={cn(
                        "h-4.5 w-4.5 relative z-10 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                      
                      <span className="flex-1 relative z-10">{item.title}</span>

                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-auto text-[10px] px-1.5 h-4.5 min-w-[1.2rem] justify-center relative z-10",
                            isActive ? "bg-primary/20 text-primary border-transparent" : ""
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}

                      {!isActive && (
                        <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info - Premium Card Look */}
      <div className="p-4 border-t bg-accent/20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-1">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-sm font-bold text-primary">
                  {displayUserInfo.name?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-foreground leading-tight">
                {displayUserInfo.name ?? "User"}
              </p>
              <p className="text-[11px] text-muted-foreground capitalize font-medium">
                {displayUserInfo.role?.toLowerCase() ?? ""}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-transparent bg-foreground/5 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-[0.98]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
