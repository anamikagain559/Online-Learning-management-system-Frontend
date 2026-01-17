"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/services/admin/usersManagement";
import { IUser } from "@/types/travelers.interface";

export default function UserDetailsPage() {
  const { id } = useParams(); 
  console.log(id);// get user ID from URL
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
      const res = await getUserById(userId); // ✅ always a string

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

  if (loading) return <p className="text-center mt-8">Loading user details...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-primary hover:underline"
      >
        ← Back
      </button>

      <div className="border rounded-lg p-6 shadow flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <img
          src={user.picture || "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg"}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover"
        />

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          {user.bio && <p className="text-gray-600">{user.bio}</p>}

          {/* Contact */}
          <div className="text-gray-500 mt-2">
            <p>📧 Email: {user.email}</p>
            {user.phone && <p>📞 Phone: {user.phone}</p>}
          </div>

          {/* Location */}
          <div className="text-gray-500 mt-2">
            {user.currentLocation && <p>📍 Location: {user.currentLocation}</p>}
            {user.address && <p>🏠 Address: {user.address}</p>}
          </div>

          {/* Travel Info */}
          <div className="text-gray-500 mt-2">
            {user.travelInterests && user.travelInterests.length > 0 && (
              <p>🎯 Interests: {user.travelInterests.join(", ")}</p>
            )}
            {user.visitedCountries && user.visitedCountries.length > 0 && (
              <p>🌍 Visited: {user.visitedCountries.join(", ")}</p>
            )}
          </div>

          {/* Role & Status */}
          <div className="text-gray-400 mt-2">
            <p>Role: {user.role}</p>
            <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
            <p>Verified: {user.isVerified ? "✅" : "❌"}</p>
          </div>

          {/* Dates */}
          <div className="text-gray-400 mt-2 text-sm">
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
