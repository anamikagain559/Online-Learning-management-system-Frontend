"use client";

import { useState, useEffect } from "react";
import { UserPlus, Trash2, CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminBuddyRequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buddy-requests/all`, {
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) {
                setRequests(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleDelete = async (requestId: string) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buddy-requests/${requestId}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                const data = await res.json();
                if (data.success) {
                    Swal.fire("Deleted!", "The request has been deleted.", "success");
                    fetchRequests();
                } else {
                    Swal.fire("Error", data.message || "Failed to delete request", "error");
                }
            } catch (err) {
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };

    const handleStatusChange = async (requestId: string, newStatus: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buddy-requests/${requestId}/respond`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) {
                Swal.fire({
                    title: "Success",
                    text: `Request marked as ${newStatus}`,
                    icon: "success",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                fetchRequests();
            } else {
                Swal.fire("Error", data.message || "Failed to update status", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <UserPlus className="w-6 h-6 text-indigo-500" />
                    Join Requests Management
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50/50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Trip Destination</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((request) => (
                                <tr
                                    key={request._id}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={request.userId?.picture || "https://i.ibb.co/SxP3NYv/pexels-liza-summer-6347919.jpg"}
                                                alt={request.userId?.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{request.userId?.name}</p>
                                                <p className="text-xs text-gray-500">{request.userId?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.tripId ? (
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {request.tripId.destination?.city}, {request.tripId.destination?.country}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(request.tripId.startDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic">Trip Deleted</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${request.status === "APPROVED"
                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                    : request.status === "REJECTED"
                                                        ? "bg-red-50 text-red-700 border border-red-200"
                                                        : "bg-amber-50 text-amber-700 border border-amber-200"
                                                    }`}
                                            >
                                                {request.status === "APPROVED" && <CheckCircle className="w-3.5 h-3.5" />}
                                                {request.status === "REJECTED" && <XCircle className="w-3.5 h-3.5" />}
                                                {request.status}
                                            </span>

                                            {/* Status Change Dropdown */}
                                            <select
                                                className="text-xs bg-gray-50 border border-gray-200 rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                                                value={request.status}
                                                onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="APPROVED">APPROVED</option>
                                                <option value="REJECTED">REJECTED</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(request.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(request._id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Delete Request"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {requests.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <UserPlus className="w-8 h-8 text-gray-300" />
                                            <p>No buddy requests found.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
