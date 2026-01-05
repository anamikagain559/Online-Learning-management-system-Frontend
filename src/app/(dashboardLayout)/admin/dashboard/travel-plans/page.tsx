/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
  getAllTravelPlans,
  deleteTravelPlan,
  createTravelPlan,
  updateTravelPlan,
} from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan, TravelType } from "@/types/travelPlan.interface";

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
  });

  // Fetch all travel plans
  const fetchPlans = async () => {
    const res = await getAllTravelPlans();
    console.log(res); // debug
    if (res.success) setPlans(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Delete travel plan
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await deleteTravelPlan(id);
    setPlans(prev => prev.filter(p => p._id !== id));
  };

  // Open modal to edit travel plan
  const handleEdit = (plan: ITravelPlan) => {
    setEditingPlanId(plan._id);
    setOpen(true);
    setFormData({
      city: plan.destination.city,
      country: plan.destination.country,
      startDate: plan.startDate.slice(0, 10),
      endDate: plan.endDate.slice(0, 10),
      minBudget: String(plan.budgetRange.min),
      maxBudget: String(plan.budgetRange.max),
      travelType: plan.travelType,
      isPublic: plan.isPublic ?? true,
      description: plan.description || "",
    });
  };

  // Create or update travel plan
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
    };

    const res = editingPlanId
      ? await updateTravelPlan(editingPlanId, payload)
      : await createTravelPlan(payload);

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
      });
      fetchPlans();
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Travel Plans (Admin)</h1>
        <button
          onClick={() => {
            setEditingPlanId(null);
            setOpen(true);
          }}
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
              <th className="border p-2">Destination</th>
              <th className="border p-2">User</th>
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
                  {plan.destination.city}, {plan.destination.country}
                </td>
                <td className="border p-2">{(plan.user as any)?.name || "N/A"}</td>
                <td className="border p-2">{plan.travelType}</td>
                <td className="border p-2">
                  ${plan.budgetRange.min} – ${plan.budgetRange.max}
                </td>
                <td className="border p-2">
                  {plan.startDate} → {plan.endDate}
                </td>
                <td className="border p-2">
                  {plan.isPublic ? "Public" : "Private"}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="text-red-600"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 rounded space-y-3">
            <h2 className="text-xl font-bold">
              {editingPlanId ? "Edit Travel Plan" : "Add Travel Plan"}
            </h2>

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
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            />
            <input
              type="date"
              className="input"
              value={formData.endDate}
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
                setFormData({
                  ...formData,
                  travelType: e.target.value as TravelType,
                })
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
                {editingPlanId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
