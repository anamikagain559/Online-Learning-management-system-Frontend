/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getMyTravelPlans,
  deleteTravelPlan,
  createTravelPlan,
  updateTravelPlan,
} from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan, TravelType } from "@/types/travelPlan.interface";
import { formatDate } from "@/lib/formatDate";

// Helper: format date to YYYY-MM-DD for <input type="date">
const toInputDate = (dateString: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
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

export default function UserTravelPlansPage() {
  const [plans, setPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
    const res = await getMyTravelPlans();
    if (res.success) setPlans(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // 🔥 SweetAlert Delete
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This travel plan will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const res = await deleteTravelPlan(id);

    if (res.success) {
      setPlans(prev => prev.filter(p => p._id !== id));
      Swal.fire("Deleted!", "Travel plan removed.", "success");
    } else {
      Swal.fire("Error!", "Failed to delete travel plan.", "error");
    }
  };

  // 🕒 Date validation
  const validateDates = () => {
    const today = new Date().toISOString().split("T")[0];

    if (formData.startDate < today) {
      Swal.fire("Invalid Date", "Start date cannot be in the past", "error");
      return false;
    }

    if (formData.endDate < formData.startDate) {
      Swal.fire("Invalid Date", "End date must be after start date", "error");
      return false;
    }

    return true;
  };

  // 📝 Handle Add or Edit
  const handleSubmit = async () => {
    if (!validateDates()) return;

    const payload = {
      destination: { city: formData.city, country: formData.country },
      startDate: formData.startDate,
      endDate: formData.endDate,
      budgetRange: { min: Number(formData.minBudget), max: Number(formData.maxBudget) },
      travelType: formData.travelType,
      isPublic: formData.isPublic,
      description: formData.description,
      image: formData.image, // ✅ include image in payload
    };

    let res;
    if (editingId) {
      res = await updateTravelPlan(editingId, payload);
    } else {
      res = await createTravelPlan(payload);
    }

    if (res.success) {
      Swal.fire(
        "Success!",
        editingId ? "Travel plan updated successfully." : "Travel plan created successfully.",
        "success"
      );
      setOpen(false);
      setEditingId(null);
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
    } else {
      Swal.fire("Error!", "Operation failed.", "error");
    }
  };

  // ✏️ Start editing
  const handleEdit = (plan: ITravelPlan) => {
    setEditingId(plan._id);

    setFormData({
      city: plan.destination.city,
      country: plan.destination.country,
      startDate: plan.startDate || "",
      endDate: plan.endDate || "",
      minBudget: plan.budgetRange.min?.toString() || "0",
      maxBudget: plan.budgetRange.max?.toString() || "0",
      travelType: plan.travelType || "SOLO",
      isPublic: plan.isPublic ?? true,
      description: plan.description || "",
      image: (plan as any).image || "", // ✅ include image for editing
    });

    setOpen(true);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Travel Plans</h1>
        <button
          onClick={() => { setOpen(true); setEditingId(null); }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Travel Plan
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th> {/* ✅ new column */}
              <th className="border p-2">Destination</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Budget</th>
              <th className="border p-2">Dates</th>
              <th className="border p-2">Visibility</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan._id}>
                <td className="border p-2">
                  {plan.image ? (
                    <img
                      src={plan.image}
                      alt="Travel"
                      className="h-16 w-24 object-cover rounded"
                    />
                  ) : "N/A"}
                </td>
                <td className="border p-2">{plan.destination.city}, {plan.destination.country}</td>
                <td className="border p-2">{plan.travelType}</td>
                <td className="border p-2">
                  ${plan.budgetRange.min} – ${plan.budgetRange.max}
                </td>
                <td className="border p-2">{formatDate(plan.startDate)} → {formatDate(plan.endDate)}</td>
                <td className="border p-2">{plan.isPublic ? "Public" : "Private"}</td>
                <td className="border p-2 flex gap-2">
                  <button onClick={() => handleEdit(plan)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(plan._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded space-y-3">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Travel Plan" : "Add Travel Plan"}
            </h2>

            {/* Image input */}
            <div className="mb-2">
              <input
                type="text"
                className="input w-full"
                placeholder="Image URL"
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

            <select
              className="input"
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
              className="input"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
