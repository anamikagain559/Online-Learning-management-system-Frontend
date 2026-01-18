/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllTravelPlans,
  deleteTravelPlan,
  createTravelPlan,
  updateTravelPlan,
} from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan, TravelType } from "@/types/travelPlan.interface";

/* ---------- Helpers ---------- */
const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
};

const formatBudget = (amount?: number) => {
  if (typeof amount !== "number") return "N/A";
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

interface FormState {
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  minBudget: string;
  maxBudget: string;
  travelType: TravelType;
  isPublic: boolean;
  description: string;
  image: string; // ✅ added image field
}

export default function AdminTravelPlansPage() {
  const [plans, setPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormState>({
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    minBudget: "",
    maxBudget: "",
    travelType: "SOLO",
    isPublic: true,
    description: "",
    image: "",
  });

  const fetchPlans = async () => {
    setLoading(true);
    const res = await getAllTravelPlans();
    if (res.success) setPlans(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmResult.isConfirmed) return;

    const res = await deleteTravelPlan(id);
    if (res.success) {
      setPlans(prev => prev.filter(p => p._id !== id));
      Swal.fire("Deleted!", "Travel plan has been deleted.", "success");
    } else {
      Swal.fire("Error!", res.message || "Failed to delete", "error");
    }
  };

  const toInputDate = (dateString: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (plan: ITravelPlan) => {
    setFormData({
      city: plan.destination.city,
      country: plan.destination.country,
      startDate: plan.startDate,
      endDate: plan.endDate,
      minBudget: plan.budgetRange?.min?.toString() ?? "",
      maxBudget: plan.budgetRange?.max?.toString() ?? "",
      travelType: plan.travelType,
      isPublic: plan.isPublic ?? true,
      description: plan.description || "",
      image: (plan as any).image || "", // ✅ image from plan
    });
    setEditingPlanId(plan._id);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      destination: {
        city: formData.city,
        country: formData.country,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      budgetRange: {
        min: Number(formData.minBudget),
        max: Number(formData.maxBudget),
      },
      travelType: formData.travelType,
      isPublic: formData.isPublic,
      description: formData.description,
      image: formData.image, // ✅ include image in payload
    };

    let res;
    if (editingPlanId) {
      res = await updateTravelPlan(editingPlanId, payload);
    } else {
      res = await createTravelPlan(payload);
    }

    if (res.success) {
      setOpen(false);
      setEditingPlanId(null);
      setFormData({
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        minBudget: "",
        maxBudget: "",
        travelType: "SOLO",
        isPublic: true,
        description: "",
        image: "",
      });
      fetchPlans();
      Swal.fire(
        "Success!",
        editingPlanId
          ? "Travel plan updated successfully!"
          : "Travel plan added successfully!",
        "success"
      );
    } else {
      Swal.fire("Error!", res.message || "Operation failed", "error");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Travel Plans (Admin)</h1>
        <button
          onClick={() => {
            setEditingPlanId(null);
            setFormData({
              city: "",
              country: "",
              startDate: "",
              endDate: "",
              minBudget: "",
              maxBudget: "",
              travelType: "SOLO",
              isPublic: true,
              description: "",
              image: "",
            });
            setOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          + Add Travel Plan
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border p-3">Image</th> {/* ✅ New column */}
              <th className="border p-3">Destination</th>
              <th className="border p-3">User</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Budget</th>
              <th className="border p-3">Dates</th>
              <th className="border p-3">Visibility</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan._id} className="hover:bg-gray-50 transition">
                <td className="border p-3">
                  {plan.image ? (
                    <img
                      src={plan.image}
                      alt="Travel Plan"
                      className="h-16 w-24 object-cover rounded"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border p-3 font-medium">
                  {plan.destination.city}, {plan.destination.country}
                </td>
                <td className="border p-3">{(plan.user as any)?.name || "N/A"}</td>
                <td className="border p-3">{plan.travelType}</td>
                <td className="border p-3">
                  {plan.budgetRange
                    ? `${formatBudget(plan.budgetRange.min)} – ${formatBudget(
                        plan.budgetRange.max
                      )}`
                    : "N/A"}
                </td>
                <td className="border p-3">
                  {formatDate(plan.startDate)} → {formatDate(plan.endDate)}
                </td>
                <td className="border p-3">{plan.isPublic ? "Public" : "Private"}</td>
                <td className="border p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg space-y-4 shadow-lg">
            <h2 className="text-xl font-bold">
              {editingPlanId ? "Edit Travel Plan" : "Add Travel Plan"}
            </h2>

            {/* Image Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Travel Plan Image URL</label>
              <input
                type="text"
                className="input w-full"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="City"
                className="input"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                placeholder="Country"
                className="input"
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
              />
              <input
                type="date"
                className="input"
                value={toInputDate(formData.startDate)}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              />
              <input
                type="date"
                className="input"
                value={toInputDate(formData.endDate)}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              />
              <input
                placeholder="Min Budget"
                className="input"
                value={formData.minBudget}
                onChange={e => setFormData({ ...formData, minBudget: e.target.value })}
              />
              <input
                placeholder="Max Budget"
                className="input"
                value={formData.maxBudget}
                onChange={e => setFormData({ ...formData, maxBudget: e.target.value })}
              />
            </div>

            <select
              className="input w-full mt-2"
              value={formData.travelType}
              onChange={e =>
                setFormData({ ...formData, travelType: e.target.value as TravelType })
              }
            >
              <option value="SOLO">Solo</option>
              <option value="FAMILY">Family</option>
              <option value="FRIENDS">Friends</option>
            </select>

            <textarea
              placeholder="Description"
              className="input w-full mt-2"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                {editingPlanId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
