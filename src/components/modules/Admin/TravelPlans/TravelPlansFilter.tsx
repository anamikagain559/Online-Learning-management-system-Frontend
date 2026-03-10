"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";

const TravelPlansFilter = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 mb-8"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        <div className="flex items-center gap-3 text-slate-900">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                <Filter className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-bold text-sm">Advanced Search</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Refine traveler records</p>
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative group flex-1 sm:flex-none">
                <SearchFilter 
                    paramName="searchTerm" 
                    placeholder="Search IDs or keywords..." 
                />
            </div>

            {/* Destination Filter */}
            <div className="relative group flex-1 sm:flex-none">
                <SearchFilter 
                    paramName="destination" 
                    placeholder="City or Country..." 
                />
            </div>

            <div className="flex items-center gap-2 ml-auto lg:ml-0">
                <RefreshButton />
                <ClearFiltersButton />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TravelPlansFilter;
