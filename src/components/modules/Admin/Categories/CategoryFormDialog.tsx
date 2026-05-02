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
import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "@/services/category/category.service";
import { toast } from "sonner";
import { LayoutTemplate, Sparkles, Image as ImageIcon } from "lucide-react";

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: any | null;
}

export default function CategoryFormDialog({
  open,
  onClose,
  onSuccess,
  category,
}: CategoryFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        image: category.image || "",
      });
    } else {
      setFormData({
        name: "",
        image: "",
      });
    }
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (category?._id) {
        res = await updateCategory(category._id, formData);
      } else {
        res = await createCategory(formData);
      }

      if (res.success) {
        toast.success(category ? "Category updated!" : "Category created!");
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Failed to save category");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-3xl p-0 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden flex items-center px-8">
            <div className="relative z-10 flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <LayoutTemplate className="w-6 h-6" />
                </div>
                <div>
                     <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white tracking-tight">
                        {category ? "Edit Category" : "Add Category"}
                      </DialogTitle>
                    </DialogHeader>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
            <div className="space-y-4">
                <div className="space-y-1.5 font-semibold">
                    <Label htmlFor="name" className="text-slate-600 pl-1">Category Name</Label>
                    <Input
                        id="name"
                        placeholder="e.g. Graphic Design"
                        className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-1.5 font-semibold">
                    <Label htmlFor="image" className="text-slate-600 pl-1 flex items-center gap-2">
                        <ImageIcon className="w-3.5 h-3.5" /> Icon / Image URL
                    </Label>
                    <Input
                        id="image"
                        placeholder="https://i.ibb.co/..."
                        className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                    />
                    {formData.image && (
                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Live Preview</span>
                            <div className="h-20 w-20 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white">
                                <img 
                                    src={formData.image} 
                                    alt="Preview" 
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Invalid+Link";
                                    }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">Make sure you use the <span className="text-indigo-600 font-bold">Direct Link</span> from ImgBB</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={onClose} 
                    className="h-12 px-6 rounded-xl font-bold text-slate-400"
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                    {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
