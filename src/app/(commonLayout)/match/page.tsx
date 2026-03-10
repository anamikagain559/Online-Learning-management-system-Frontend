"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Calendar, MapPin, Search, Plane, Filter, DollarSign, Users } from "lucide-react";
import { getMatchedTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function MatchPage() {
  const [filters, setFilters] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelType: "ALL",
    minBudget: "",
    maxBudget: "",
  });

  const [matches, setMatches] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [, startTransition] = useTransition();

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);

    // Transform "ALL" to empty string for backend
    const apiFilters = {
      ...filters,
      travelType: filters.travelType === "ALL" ? "" : filters.travelType,
    };

    try {
      const res = await getMatchedTravelPlans(apiFilters);
      if (res.success) {
        // Handle both direct array and nested data object gracefully
        const plans = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setMatches(plans);

        if (plans.length === 0) {
          toast.info("No exact matches found, try broadening your search!");
        }
      } else {
        toast.error(res.message || "Something went wrong while matching");
        setMatches([]);
      }
    } catch (error) {
      toast.error("Failed to connect to matching service");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      destination: "",
      startDate: "",
      endDate: "",
      travelType: "ALL",
      minBudget: "",
      maxBudget: "",
    });
    setMatches([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white py-28 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] shadow-inner" />
        <div className="container mx-auto px-6 relative z-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Find Your Perfect <span className="text-yellow-300">Travel Match</span>
            </h1>
            <p className="text-indigo-100/80 text-lg mb-8">
              Specify your destination and dates to discover travel buddies planning similar adventures.
            </p>
          </motion.div>

          {/* Sticky Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-2xl shadow-indigo-500/10 text-gray-900 border border-white/20 backdrop-blur-sm mt-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Destination
                </Label>
                <Input
                  placeholder="Where to?"
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                  className="bg-gray-50 border-gray-200 w-full"
                />
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> When
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-xs sm:text-sm px-2"
                  />
                  <span className="text-muted-foreground">→</span>
                  <Input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-xs sm:text-sm px-2"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Users className="w-3 h-3" /> Group Type
                </Label>
                <Select
                  value={filters.travelType}
                  onValueChange={(val) => setFilters({ ...filters, travelType: val })}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 text-sm w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Any Type</SelectItem>
                    <SelectItem value="SOLO">Solo</SelectItem>
                    <SelectItem value="FAMILY">Family</SelectItem>
                    <SelectItem value="FRIENDS">Friends</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-3 h-3" /> Budget (Min-Max)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minBudget}
                    onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-xs h-10"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-xs h-10"
                  />
                </div>
              </div>
              <div className="flex items-end gap-2 w-full md:col-span-3">
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-10 gap-2 shadow-lg shadow-indigo-600/20 truncate"
                >
                  {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" /> : <Search className="w-4 h-4 shrink-0" />}
                  <span className="truncate">Find Matches</span>
                </Button>
                <Button variant="outline" onClick={clearFilters} className="h-10 px-6 shrink-0">
                  Reset
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Plane className="w-12 h-12 text-indigo-300 animate-bounce mb-4" />
            <p className="text-lg font-medium text-gray-500">Scanning for travel buddies...</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {matches.map((trip, idx) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Placeholder or Actual */}
                  <div className="h-48 bg-indigo-100 relative overflow-hidden">
                    {(trip as any).image ? (
                      <img src={(trip as any).image} alt="Trip" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                        <Plane className="w-12 h-12 text-indigo-200" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        {trip.travelType}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {typeof trip.destination === 'string' ? trip.destination : `${trip.destination?.city}, ${trip.destination?.country}`}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                          <Calendar className="w-3 w-3" />
                          <span>{new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-6 min-h-[40px]">
                      {trip.description || "Looking for someone to explore this amazing destination together! Join me on this journey."}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Budget Approx.</span>
                        <span className="text-lg font-extrabold text-indigo-950">${trip.budgetRange?.min || 0}</span>
                      </div>
                      <Link href={`/travel-plans/${trip._id}`}>
                        <Button className="rounded-xl px-5 hover:bg-slate-900 transition-colors">
                          View Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && matches.length === 0 && hasSearched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <Plane className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400">No matching buddies found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your dates or searching a nearby city.</p>
            <Button variant="link" onClick={clearFilters} className="mt-4 text-indigo-600">
              Show all public plans instead?
            </Button>
          </motion.div>
        )}

        {!loading && !hasSearched && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto space-y-4 opacity-40">
              <Search className="w-12 h-12 mx-auto text-gray-200" />
              <p className="text-gray-500 font-medium italic">Your perfect travel buddy is just a search away...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
