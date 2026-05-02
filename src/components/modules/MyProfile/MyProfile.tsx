"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";
import { Loader2, Save, User, Mail, Phone, MapPin, Home, Heart, Globe, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [picture, setPicture] = useState<string>(userInfo?.picture || "");

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-full p-10">
         <p className="text-muted-foreground">Unable to load profile information. Please try logging in again.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;

    const payload: any = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      currentLocation: (form.elements.namedItem("currentLocation") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      bio: (form.elements.namedItem("bio") as HTMLTextAreaElement).value,
      travelInterests: ((form.elements.namedItem("travelInterests") as HTMLInputElement).value || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      visitedCountries: ((form.elements.namedItem("visitedCountries") as HTMLInputElement).value || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      picture: picture || undefined,
    };

    // Clean payload of empty strings for optional fields
    Object.keys(payload).forEach(key => {
      if (payload[key] === "" || (Array.isArray(payload[key]) && payload[key].length === 0)) {
        delete payload[key];
      }
    });

    startTransition(async () => {
      const result = await updateMyProfile(payload);

      if (result.success) {
        setSuccess(result.message || "Profile updated successfully");
        router.refresh();
      } else {
        setError(result.message || "Failed to update profile");
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-[200px] space-y-8 pb-10"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-extrabold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your personal profile and travel preferences.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8">
          <Card className="w-full border-none shadow-xl bg-gradient-to-br from-background via-background to-primary/5 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <CardHeader className="pb-2 pt-8 px-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Personal Profile</CardTitle>
                  <CardDescription>Update your information to stand out to other travelers.</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-10 p-10">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-destructive/10 text-destructive px-6 py-4 rounded-2xl border border-destructive/20 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 text-green-600 px-6 py-4 rounded-2xl border border-green-500/20 text-sm font-medium"
                >
                  {success}
                </motion.div>
              )}

              {/* Profile Image Section */}
              <div className="flex flex-col md:flex-row items-center gap-10 bg-accent/30 p-8 rounded-[2rem] border border-border/50">
                <div className="relative group">
                  <Avatar className="h-40 w-40 border-4 border-background shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    {picture ? (
                      <AvatarImage src={picture} alt={userInfo.name} className="object-cover" />
                    ) : (
                      <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                        {getInitials(userInfo.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg cursor-pointer transition-transform active:scale-90">
                    <Camera className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="picture" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      Profile Image URL
                    </Label>
                    <Input
                      id="picture"
                      name="picture"
                      placeholder="https://example.com/image.jpg"
                      value={picture}
                      onChange={(e) => setPicture(e.target.value)}
                      disabled={isPending}
                      className="bg-background border-border/60 h-12 rounded-2xl px-5 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <p className="text-xs text-muted-foreground ml-1 italic">We recommend a high-quality traveler photo!</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 mt-4">
                {/* Full Name */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={userInfo.name}
                    required
                    disabled={isPending}
                    className="h-14 rounded-2xl px-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                  />
                </div>

                {/* Email (Disabled) */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="h-14 rounded-2xl px-6 bg-muted/50 border-border/50 cursor-not-allowed text-muted-foreground font-medium text-base shadow-sm"
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" /> Contact Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 234 567 890"
                    defaultValue={userInfo.phone || ""}
                    disabled={isPending}
                    className="h-14 rounded-2xl px-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                  />
                </div>

                {/* Current Location */}
                <div className="space-y-3">
                  <Label htmlFor="currentLocation" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Current Base
                  </Label>
                  <Input
                    id="currentLocation"
                    name="currentLocation"
                    placeholder="e.g. Dhaka, Bangladesh"
                    defaultValue={userInfo.currentLocation || ""}
                    disabled={isPending}
                    className="h-14 rounded-2xl px-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                  />
                </div>

                {/* Address */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" /> Complete Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your mailing address"
                    defaultValue={userInfo.address || ""}
                    disabled={isPending}
                    className="h-14 rounded-2xl px-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <Separator className="bg-border/60" />
                </div>

                {/* Bio */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="bio" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" /> About Your Travel Journey
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Share your travel experiences and what you look for in a buddy..."
                    defaultValue={userInfo.bio || ""}
                    disabled={isPending}
                    className="min-h-[160px] rounded-[2rem] p-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none text-base"
                  />
                </div>

                {/* Travel Interests */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="travelInterests" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> Travel Interests
                  </Label>
                  <Input
                    id="travelInterests"
                    name="travelInterests"
                    placeholder="e.g. Mountains, Beaches, Cultural Heritage (comma separated)"
                    defaultValue={userInfo.travelInterests?.join(", ") || ""}
                    disabled={isPending}
                    className="h-14 rounded-2xl px-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                  />
                </div>

                {/* Visited Countries */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="visitedCountries" className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> Explored Countries
                  </Label>
                  <Input
                    id="visitedCountries"
                    name="visitedCountries"
                    placeholder="e.g. Japan, France, Italy (comma separated)"
                    defaultValue={userInfo.visitedCountries?.join(", ") || ""}
                    disabled={isPending}
                    className="h-14 rounded-2xl px-6 bg-background border-border shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="h-14 px-12 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Update Profile
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </motion.div>
  );
};

export default MyProfile;
