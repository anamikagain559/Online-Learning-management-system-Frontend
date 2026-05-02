"use client";

import { useEffect, useState } from "react";
import { Plus, LayoutTemplate, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/services/category/category.service";
import CategoriesTable from "@/components/modules/Admin/Categories/CategoriesTable";
import CategoryFormDialog from "@/components/modules/Admin/Categories/CategoryFormDialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <LayoutTemplate className="h-8 w-8 text-indigo-600" />
            Manage Categories
          </h1>
          <p className="text-slate-500 font-medium mt-1">Organize your courses into structured groupings</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-3 group"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
            <Plus className="h-4 w-4" />
          </div>
          Add New Category
        </Button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-100">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
          <p className="text-slate-500 font-bold">Fetching categories...</p>
        </div>
      ) : (
        <CategoriesTable 
          categories={filteredCategories} 
          onRefresh={fetchCategories} 
        />
      )}

      {/* Add Dialog */}
      <CategoryFormDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={fetchCategories}
      />
    </div>
  );
}
