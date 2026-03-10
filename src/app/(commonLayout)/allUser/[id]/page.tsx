"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/services/admin/usersManagement";
import { IUser } from "@/types/travelers.interface";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Globe, 
  Heart, 
  Compass, 
  ShieldCheck,
  Plane,
  Home,
  Instagram,
  Twitter,
  Linkedin,
  Clock,
  CheckCircle2,
  Loader2,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserDetailsPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = Array.isArray(id) ? id[0] : id; 

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(userId);
        if (res.success && res.data) {
          setUser(res.data);
          setError(null);
        } else {
          setError(res.message || "User not found");
          setUser(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load user");
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-gray-500 font-medium">Fetching traveler profile...</p>
        </div>
    );
  }

  if (error || !user) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">{error || "The user you are looking for does not exist."}</p>
            <Button onClick={() => router.back()}>Go Back</Button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Profile Cover */}
      <div className="h-64 md:h-80 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-6 h-full relative">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="absolute top-8 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Explorers
            </motion.button>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 -mt-24 relative z-10">
          {/* Left Sidebar - Profile Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/3 space-y-6"
          >
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
                <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="w-40 h-40 border-8 border-white shadow-2xl -mt-20 mb-6 transition-transform hover:scale-105 duration-500">
                            <AvatarImage src={user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback className="text-3xl font-bold bg-indigo-100 text-indigo-600">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                            {user.isVerified && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        </div>
                        
                        <Badge className="bg-indigo-50 text-indigo-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            {user.role} Traveler
                        </Badge>
                        
                        <div className="flex justify-center gap-4 mb-8">
                            <Button size="icon" variant="ghost" className="rounded-full bg-gray-50 text-gray-400 hover:text-indigo-600"><Instagram className="w-5 h-5"/></Button>
                            <Button size="icon" variant="ghost" className="rounded-full bg-gray-50 text-gray-400 hover:text-indigo-600"><Twitter className="w-5 h-5"/></Button>
                            <Button size="icon" variant="ghost" className="rounded-full bg-gray-50 text-gray-400 hover:text-indigo-600"><Linkedin className="w-5 h-5"/></Button>
                        </div>

                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl font-bold shadow-lg shadow-indigo-600/20">
                            Message Traveler
                        </Button>
                    </div>

                    <div className="mt-10 space-y-6 border-t border-gray-100 pt-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</p>
                                <p className="text-sm font-medium text-gray-900">{user.currentLocation || "Global Citizen"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Member Since</p>
                                <p className="text-sm font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-xl bg-white overflow-hidden">
                <CardContent className="p-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Stats & Reputation
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl text-center">
                            <h4 className="text-2xl font-black text-indigo-600">
                                {user.visitedCountries?.length || 0}
                            </h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Countries</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl text-center">
                            <h4 className="text-2xl font-black text-indigo-600">
                                {user.travelInterests?.length || 0}
                            </h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Interests</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </motion.div>

          {/* Right Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8"
          >
            {/* Biography */}
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 md:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-40" />
                <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
                <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-indigo-200 pl-6 mb-8">
                   {user.bio || "This traveler hasn't shared a bio yet, but they're definitely ready for adventure!"}
                </p>
                
                {user.address && (
                    <div className="flex items-start gap-3 text-gray-500 bg-gray-50 p-4 rounded-2xl">
                        <Home className="w-5 h-5 mt-0.5 text-indigo-400" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Personal Address</p>
                            <p className="text-sm font-medium">{user.address}</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Travel Interests & Experience */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" /> Travel Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {user.travelInterests && user.travelInterests.length > 0 ? (
                            user.travelInterests.map((interest, i) => (
                                <Badge key={i} variant="outline" className="px-4 py-2 border-indigo-100 text-indigo-600 bg-indigo-50/30 rounded-xl font-semibold">
                                    {interest}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-gray-400 italic text-sm">No regular interests listed.</p>
                        )}
                    </div>
                </Card>

                <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-indigo-500" /> Visited Countries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {user.visitedCountries && user.visitedCountries.length > 0 ? (
                            user.visitedCountries.map((country, i) => (
                                <Badge key={i} className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white border-none rounded-xl font-semibold">
                                    {country}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-gray-400 italic text-sm">Adventure is waiting to begin!</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Verification Status Banner */}
            <Card className={`rounded-[2rem] border-none shadow-xl overflow-hidden ${user.isActive ? 'bg-emerald-600' : 'bg-slate-800'} text-white`}>
                <CardContent className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Account Verification</h3>
                            <p className="text-white/80">User is currently {user.isActive ? 'active and verified' : 'under review'}.</p>
                        </div>
                    </div>
                    {user.isActive && (
                        <div className="hidden md:block">
                            <Badge className="bg-white text-emerald-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">
                                Trusted Member
                            </Badge>
                        </div>
                    )}
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
