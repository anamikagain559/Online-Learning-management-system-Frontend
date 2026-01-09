"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [picture, setPicture] = useState<string>(userInfo.picture || "");

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  const form = e.currentTarget;

  const payload = {
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
    picture, // ✅ Image URL
  };

  console.log("Profile payload being sent:", payload); // <<<<< Add this

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-1">
          {/* Personal Information Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">{error}</div>
              )}
              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">{success}</div>
              )}

              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  {picture ? (
                    <AvatarImage src={picture} alt={userInfo.name} />
                  ) : (
                    <AvatarFallback className="text-3xl">{getInitials(userInfo.name)}</AvatarFallback>
                  )}
                </Avatar>

                <div className="space-y-2 w-full mt-2">
                  <Label htmlFor="picture">Profile Image URL</Label>
                  <Input
                    id="picture"
                    name="picture" // ✅ name must match payload key
                    placeholder="https://example.com/image.jpg"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={userInfo.name}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={userInfo.phone || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Current Location */}
                <div className="space-y-2">
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    name="currentLocation"
                    defaultValue={userInfo.currentLocation || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={userInfo.address || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio / About</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={userInfo.bio || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Travel Interests */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="travelInterests">Travel Interests (comma separated)</Label>
                  <Input
                    id="travelInterests"
                    name="travelInterests"
                    defaultValue={userInfo.travelInterests?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Visited Countries */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="visitedCountries">Visited Countries (comma separated)</Label>
                  <Input
                    id="visitedCountries"
                    name="visitedCountries"
                    defaultValue={userInfo.visitedCountries?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
