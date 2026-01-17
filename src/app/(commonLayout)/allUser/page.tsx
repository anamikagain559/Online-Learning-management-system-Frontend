"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/admin/usersManagement";
import { IUser } from "@/types/travelers.interface";
import Link from "next/link";

export default function AllUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data || []);
        setError(null);
      } else {
        setUsers([]);
        setError(res.message || "Failed to load users");
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading users...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Travelers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col gap-2"
          >
            {/* Profile Picture */}
            <img
              src={user.picture || "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />

            {/* Name */}
            <h2 className="font-bold text-lg text-center">{user.name}</h2>

            {/* Bio */}
            {user.bio && <p className="text-sm text-gray-600 text-center">{user.bio}</p>}

            {/* Contact Info */}
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>📧 {user.email}</p>
              {user.phone && <p>📞 {user.phone}</p>}
            </div>

            {/* Location Info */}
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              {user.currentLocation && <p>📍 {user.currentLocation}</p>}
              {user.address && <p>🏠 {user.address}</p>}
            </div>

            {/* Travel Info */}
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              {user.travelInterests && user.travelInterests.length > 0 && (
                <p>🎯 Interests: {user.travelInterests.join(", ")}</p>
              )}
              {user.visitedCountries && user.visitedCountries.length > 0 && (
                <p>🌍 Visited: {user.visitedCountries.join(", ")}</p>
              )}
            </div>

            {/* Status & Role */}
            <div className="text-sm text-gray-400 mt-2">
              <p>Role: {user.role}</p>
              <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
              <p>Verified: {user.isVerified ? "✅" : "❌"}</p>
            </div>

            {/* Dates */}
            <div className="text-xs text-gray-400 mt-2">
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>

            {/* View Details Link */}
         <div className="mt-3 text-center">
  <Link
    href={`/allUser/${user._id}`} // use _id from backend or fallback to frontend id
    className="text-primary font-medium hover:underline"
  >
    View Details →
  </Link>
</div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No users found.</p>
      )}
    </div>
  );
}
