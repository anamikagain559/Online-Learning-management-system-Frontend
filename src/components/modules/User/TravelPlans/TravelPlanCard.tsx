"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Globe, 
  Lock, 
  Edit, 
  Trash2, 
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { formatDate } from "@/lib/formatDate";

interface TravelPlanCardProps {
  plan: ITravelPlan;
  onEdit: (plan: ITravelPlan) => void;
  onDelete: (id: string) => void;
  index: number;
}

export default function TravelPlanCard({ plan, onEdit, onDelete, index }: TravelPlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 rounded-[2.5rem]">
        <div className="relative h-56 w-full overflow-hidden">
          {plan.image ? (
            <img
              src={plan.image}
              alt={plan.destination.city}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">No Preview</span>
            </div>
          )}
          
          {/* Overlay Gradients */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/20 backdrop-blur-md border hover:bg-white/30 text-white font-bold py-1 px-3 rounded-xl border-white/20">
              {plan.travelType}
            </Badge>
          </div>

          {/* Visibility Badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              className={`flex items-center gap-1.5 backdrop-blur-md border font-bold py-1 px-3 rounded-xl ${
                plan.isPublic 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
              }`}
            >
              {plan.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {plan.isPublic ? "Public" : "Private"}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                {plan.destination.city}
              </h3>
              <p className="text-white/80 text-sm font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {plan.destination.country}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">Timeline</span>
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>{formatDate(plan.startDate)}</span>
                <ArrowRight className="w-3 h-3 text-slate-300" />
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">Budget Range</span>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>${plan.budgetRange.min.toLocaleString()} - ${plan.budgetRange.max.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-8 font-medium italic">
            &ldquo;{plan.description || "Embarking on a new journey to discover the unknown..."}&rdquo;
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(plan)}
                className="w-10 h-10 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Edit className="w-4 h-4 transition-transform group-hover:scale-110" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(plan._id)}
                className="w-10 h-10 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Active Plan</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
