"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITravelPlan, TravelType } from "@/types/travelPlan.interface";
import { useState, useEffect } from "react";
import { createTravelPlan, updateTravelPlan } from "@/services/travelPlan/travelPlan.service";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Sparkles, MapPin, Calendar, DollarSign, Image as ImageIcon, Type, LayoutTemplate, Globe } from "lucide-react";

interface TravelPlanFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan?: ITravelPlan | null;
}

export default function TravelPlanFormDialog({
  open,
  onClose,
  onSuccess,
  plan,
}: TravelPlanFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    minBudget: "",
    maxBudget: "",
    travelType: "SOLO" as TravelType,
    isPublic: true,
    description: "",
    image: "",
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        city: plan.destination.city,
        country: plan.destination.country,
        startDate: plan.startDate ? new Date(plan.startDate).toISOString().split("T")[0] : "",
        endDate: plan.endDate ? new Date(plan.endDate).toISOString().split("T")[0] : "",
        minBudget: plan.budgetRange?.min?.toString() ?? "",
        maxBudget: plan.budgetRange?.max?.toString() ?? "",
        travelType: plan.travelType,
        isPublic: plan.isPublic ?? true,
        description: plan.description || "",
        image: (plan as any).image || "",
      });
    } else {
      setFormData({
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        minBudget: "",
        maxBudget: "",
        travelType: "SOLO",
        isPublic: true,
        description: "",
        image: "",
      });
    }
  }, [plan, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      destination: {
        city: formData.city,
        country: formData.country,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      budgetRange: {
        min: Number(formData.minBudget),
        max: Number(formData.maxBudget),
      },
      travelType: formData.travelType,
      isPublic: formData.isPublic,
      description: formData.description,
      image: formData.image,
    };

    try {
      let res;
      if (plan?._id) {
        res = await updateTravelPlan(plan._id, payload);
      } else {
        res = await createTravelPlan(payload);
      }

      if (res.success) {
        toast.success(plan ? "Travel plan updated!" : "New adventure created!");
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Failed to save travel plan");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[2rem] border-none shadow-3xl p-0">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden flex items-center px-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-4 left-10 w-20 h-20 border-4 border-white rounded-full translate-x-3 translate-y-2" />
                <div className="absolute bottom-4 right-10 w-32 h-32 border-4 border-white/40 rounded-[2rem] rotate-12" />
            </div>
            <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div>
                     <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                        {plan ? "Update Adventure" : "Plan New Journey"}
                      </DialogTitle>
                    </DialogHeader>
                    <p className="text-white/70 text-sm font-medium">Define your next travel blueprint</p>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Location</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="city" className="text-slate-600 pl-1">City Name</Label>
                        <Input
                            id="city"
                            placeholder="e.g. Kyoto"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="country" className="text-slate-600 pl-1">Country</Label>
                        <Input
                            id="country"
                            placeholder="e.g. Japan"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Timeline</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="startDate" className="text-slate-600 pl-1">Departure</Label>
                        <Input
                            id="startDate"
                            type="date"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="endDate" className="text-slate-600 pl-1">Return</Label>
                        <Input
                            id="endDate"
                            type="date"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Budgeting</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="minBudget" className="text-slate-600 pl-1 text-[11px]">Min Budget ($)</Label>
                        <Input
                            id="minBudget"
                            type="number"
                            placeholder="0"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.minBudget}
                            onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="maxBudget" className="text-slate-600 pl-1 text-[11px]">Max Budget ($)</Label>
                        <Input
                            id="maxBudget"
                            type="number"
                            placeholder="1k+"
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.maxBudget}
                            onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <LayoutTemplate className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Style & Vision</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label className="text-slate-600 pl-1">Traveler Type</Label>
                        <Select
                            value={formData.travelType}
                            onValueChange={(value: TravelType) => setFormData({ ...formData, travelType: value })}
                        >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none focus:ring-indigo-500">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100">
                                <SelectItem value="SOLO" className="rounded-lg">Solo Explorer</SelectItem>
                                <SelectItem value="FAMILY" className="rounded-lg">Family Journey</SelectItem>
                                <SelectItem value="FRIENDS" className="rounded-lg">Group Adventure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-50">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Visuals & Context</span>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="image" className="text-slate-600 pl-1">Cover Image URL</Label>
                        <Input
                            id="image"
                            placeholder="https://images.unsplash.com/..."
                            className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 font-semibold">
                        <Label htmlFor="description" className="text-slate-600 pl-1">Adventure Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the vibe, the must-see spots, and your expectations..."
                            className="min-h-[120px] rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500 p-4 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 transition-colors hover:bg-slate-100/50 group cursor-pointer border border-slate-100">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                         <Globe className={`w-4 h-4 ${formData.isPublic ? 'text-emerald-500' : 'text-slate-400'}`} />
                         <Label className="text-slate-700 font-bold group-hover:text-slate-900">Public Visibility</Label>
                    </div>
                    <p className="text-slate-400 text-xs font-semibold">Share your itinerary with the community</p>
                </div>
                <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPublic: checked })}
                    className="data-[state=checked]:bg-indigo-600"
                />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose} 
                disabled={loading}
                className="h-12 px-8 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading}
                className="h-12 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              {loading ? (
                  <div className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Processing...
                  </div>
              ) : plan ? "Save Changes" : "Create Adventure"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
