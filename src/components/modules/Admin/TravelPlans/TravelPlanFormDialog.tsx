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
        toast.success(plan ? "Updated successfully!" : "Created successfully!");
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? "Edit Travel Plan" : "Add New Travel Plan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g. Paris"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g. France"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minBudget">Min Budget ($)</Label>
              <Input
                id="minBudget"
                type="number"
                placeholder="0"
                value={formData.minBudget}
                onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxBudget">Max Budget ($)</Label>
              <Input
                id="maxBudget"
                type="number"
                placeholder="1000"
                value={formData.maxBudget}
                onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Travel Type</Label>
            <Select
              value={formData.travelType}
              onValueChange={(value: TravelType) => setFormData({ ...formData, travelType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOLO">Solo</SelectItem>
                <SelectItem value="FAMILY">Family</SelectItem>
                <SelectItem value="FRIENDS">Friends</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us about the plan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 text-sm">
            <div className="space-y-0.5">
              <Label>Public Visibility</Label>
              <p className="text-muted-foreground text-xs">If off, only you can see this plan.</p>
            </div>
            <Switch
              checked={formData.isPublic}
              onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPublic: checked })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : plan ? "Update Plan" : "Create Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
