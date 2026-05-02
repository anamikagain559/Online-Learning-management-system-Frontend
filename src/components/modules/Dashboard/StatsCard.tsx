import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  className,
  iconColor = "text-primary",
  trend,
}: StatsCardProps) => {
  return (
    <Card className={cn(
      "border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-background/50 backdrop-blur-sm group hover:translate-y-[-4px] transition-all duration-300",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className={cn(
          "p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
          iconColor.replace("text-", "bg-") + "/10"
        )}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black tracking-tight">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {description && (
            <p className="text-[10px] text-muted-foreground font-medium">{description}</p>
          )}
          {trend && (
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
              trend.isUp ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
            )}>
              {trend.isUp ? "+" : "-"}{trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

