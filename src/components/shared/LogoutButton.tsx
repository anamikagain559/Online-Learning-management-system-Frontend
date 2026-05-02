"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logOutUser";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

interface LogoutButtonProps {
  fullWidth?: boolean;
}

const LogoutButton = ({ fullWidth = false }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className={`${fullWidth ? "w-full" : ""} flex items-center justify-center gap-2 py-6 rounded-xl font-bold shadow-lg shadow-rose-100 hover:scale-[1.02] active:scale-[0.98] transition-all`}
    >
      <LogOut size={20} />
      Logout
    </Button>
  );
};

export default LogoutButton;
