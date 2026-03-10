/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  getMyTravelPlans,
  deleteTravelPlan,
} from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Compass, Sparkles, Plus, Search, Filter, History, Map } from "lucide-react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TravelPlanCard from "@/components/modules/User/TravelPlans/TravelPlanCard";
import TravelPlanFormDialog from "@/components/modules/User/TravelPlans/TravelPlanFormDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserTravelPlansPage() {
  const [plans, setPlans] = useState<ITravelPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [, startTransition] = useTransition();

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await getMyTravelPlans();
      if (res.success) {
        setPlans(res.data);
        setFilteredPlans(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    const filtered = plans.filter(plan => 
      plan.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.destination.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlans(filtered);
  }, [searchTerm, plans]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Adventure?",
      text: "This journey blueprint will be permanently removed from your archive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
      background: "#fff",
      customClass: {
        popup: 'rounded-[2rem] border-none shadow-3xl',
        confirmButton: 'rounded-xl px-8 py-3 font-bold',
        cancelButton: 'rounded-xl px-8 py-3 font-bold'
      }
    });

    if (!result.isConfirmed) return;

    const res = await deleteTravelPlan(id);

    if (res.success) {
      setPlans(prev => prev.filter(p => p._id !== id));
      Swal.fire({
        title: "Archived!",
        text: "Travel plan removed from your records.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#fff",
        customClass: {
          popup: 'rounded-[2rem] border-none shadow-xl',
        }
      });
    }
  };

  const handleEdit = (plan: ITravelPlan) => {
    setEditingPlan(plan);
    setOpen(true);
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 rounded-full animate-spin border-t-indigo-600" />
            <Compass className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Blueprints...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-12 animate-in fade-in duration-700 pb-20">
      <ManagementPageHeader
        title="Adventure Vault"
        description="Manage your personal travel blueprints and upcoming journeys"
      >
        <Button 
            onClick={handleCreate}
            className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-3 group"
        >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                <Plus className="h-4 w-4" />
            </div>
            New Adventure
        </Button>
      </ManagementPageHeader>

      {/* Intelligence Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <Search className="w-6 h-6" />
            </div>
            <div className="relative flex-1 md:w-80">
                <Input 
                    placeholder="Search by city or country..." 
                    className="h-12 pl-4 pr-10 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-500 font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <Filter className="w-4 h-4" />
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex flex-col items-end pr-4 border-r border-slate-100 hidden sm:flex">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Total Adventures</span>
                <span className="text-2xl font-black text-indigo-600">{plans.length}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
                <History className="w-6 h-6" />
            </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredPlans.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {filteredPlans.map((plan, index) => (
                <TravelPlanCard 
                  key={plan._id} 
                  plan={plan} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                <Map className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No blueprinted adventures</h3>
              <p className="text-slate-400 font-medium mb-8 max-w-sm">
                Your journey vault is currently empty. Start by blueprinting your first epic adventure!
              </p>
              <Button 
                onClick={handleCreate}
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 h-12 px-6 font-bold"
              >
                Create First Plan
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TravelPlanFormDialog
        open={open}
        onClose={() => setOpen(false)}
        plan={editingPlan}
        onSuccess={fetchPlans}
      />
    </div>
  );
}
