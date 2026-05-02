"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, LayoutTemplate } from "lucide-react";
import { useState } from "react";
import CategoryFormDialog from "./CategoryFormDialog";
import { deleteCategory } from "@/services/category/category.service";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface CategoriesTableProps {
  categories: any[];
  onRefresh: () => void;
}

export default function CategoriesTable({ categories, onRefresh }: CategoriesTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCategory(id);
        if (res.success) {
          toast.success("Category deleted");
          onRefresh();
        } else {
          toast.error(res.message || "Failed to delete");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[100px] pl-8">Icon</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right pr-8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id} className="hover:bg-slate-50/50 transition-colors group">
              <TableCell className="pl-8">
                <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>';
                      }}
                    />
                  ) : (
                    <LayoutTemplate className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-bold text-slate-700">{category.name}</TableCell>
              <TableCell className="text-slate-500 font-medium text-sm">
                {new Date(category.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsEditDialogOpen(true);
                    }}
                    className="h-9 w-9 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category._id)}
                    className="h-9 w-9 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CategoryFormDialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedCategory(null);
        }}
        onSuccess={onRefresh}
        category={selectedCategory}
      />
    </div>
  );
}
