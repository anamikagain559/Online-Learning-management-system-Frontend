"use client";

import { useEffect, useState, useTransition } from "react";
import { getUsers } from "@/services/admin/usersManagement";
import { IUser } from "@/types/travelers.interface";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  ChevronRight,
  Filter,
  Users,
  Compass,
  Star,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data || []);
        setFilteredUsers(res.data || []);
        setError(null);
      } else {
        setUsers([]);
        setFilteredUsers([]);
        setError(res.message || "Failed to load users");
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.currentLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.travelInterests?.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    startTransition(() => {
        setFilteredUsers(filtered);
    });
  }, [searchTerm, users]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  if (error) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 text-white py-24 mb-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold uppercase tracking-widest mb-6">
                    <Compass className="w-4 h-4" /> Discover Community
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                    Meet Your Next <span className="text-yellow-300">Adventure Buddy</span>
                </h1>
                <p className="text-indigo-100/80 text-lg md:text-xl leading-relaxed mb-8">
                    Connect with a diverse community of travelers from around the world. Find matches, share stories, and plan your next journey together.
                </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* Search & Filter Bar */}
        <div className="relative -mt-20 z-20 mb-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 flex flex-col md:flex-row gap-4 items-center"
            >
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                        placeholder="Search by name, email, location or interests..." 
                        className="pl-12 h-14 bg-gray-50/50 border-gray-200 rounded-xl text-lg focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button className="h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold gap-2 flex-1 md:flex-none">
                        <Filter className="w-5 h-5" /> Filter
                    </Button>
                    <div className="h-14 px-6 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                        {filteredUsers.length} <Users className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-lg">
                <div className="h-32 bg-gray-200 animate-pulse" />
                <CardContent className="p-6 pt-0 -mt-12">
                  <div className="flex flex-col items-center">
                    <Skeleton className="w-24 h-24 rounded-full border-4 border-white mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-6" />
                    <div className="w-full space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.div
                  key={user._id}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-300 rounded-3xl group-hover:translate-y-[-4px]">
                    {/* Card Header Illustration/Background */}
                    <div className="h-28 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    </div>
                    
                    <CardContent className="p-6 pt-0 -mt-14 relative flex flex-col h-[calc(100%-7rem)]">
                        <div className="flex flex-col items-center mb-6">
                            <Avatar className="w-28 h-28 border-4 border-white shadow-xl mb-4 group-hover:scale-105 transition-transform duration-500">
                                <AvatarImage src={user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                                <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-2xl">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            
                            <div className="text-center w-full">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                    {user.name}
                                </h2>
                                <p className="text-sm font-medium text-gray-500 flex items-center justify-center gap-1 mt-1">
                                    {user.currentLocation ? (
                                        <> <MapPin className="w-3 h-3" /> {user.currentLocation} </>
                                    ) : (
                                        "Citizen of the World"
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Status Tags */}
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                                {user.role}
                            </Badge>
                            {user.isVerified && (
                                <Badge className="bg-emerald-50 text-emerald-700 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                </Badge>
                            )}
                        </div>

                        {/* Bio/Info */}
                        <div className="space-y-4 mb-8 flex-grow">
                            {user.bio ? (
                                <p className="text-sm text-gray-600 line-clamp-3 text-center leading-relaxed italic">
                                    "{user.bio}"
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400 text-center leading-relaxed">
                                    No bio available yet.
                                </p>
                            )}
                            
                            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Visited</p>
                                    <p className="text-sm font-bold text-indigo-600">{user.visitedCountries?.length || 0} Places</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Interests</p>
                                    <p className="text-sm font-bold text-indigo-600">{user.travelInterests?.length || 0} Tags</p>
                                </div>
                            </div>
                        </div>

                        <Button asChild className="w-full rounded-2xl bg-gray-900 hover:bg-indigo-600 transition-all duration-300 py-6 font-bold shadow-lg shadow-gray-200 group-hover:shadow-indigo-200">
                            <Link href={`/allUser/${user._id}`}>
                                View Profile <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredUsers.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No travelers matched your search</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search term to discover other community members.</p>
            <Button onClick={() => setSearchTerm("")} variant="ghost" className="mt-6 text-indigo-600 font-bold hover:text-indigo-700">
                Clear all search terms
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
