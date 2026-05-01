"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  value: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

export function StatusBadgeCell({
  value,
  variant = "default",
}: StatusBadgeCellProps) {
  // Map "success" to a custom green style if needed, or just use default variants
  const variantClass = variant === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "";

  return (
    <Badge 
      variant={variant === "success" ? "default" : variant}
      className={variantClass}
    >
      {value}
    </Badge>
  );
}
