export type TravelType = "SOLO" | "FAMILY" | "FRIENDS";

export interface ITravelPlanFormData {
  destination: {
    country: string;
    city: string;
  };
  startDate: string;
  endDate: string;
  budgetRange: {
    min: number;
    max: number;
  };
  travelType: TravelType;
  description?: string;
  isPublic?: boolean;
  image?: string; // ✅ optional image URL
}

export interface ITravelPlan extends ITravelPlanFormData {
  _id: string;
  user?: {
    _id: string;
    name: string;
    picture?: string;
    email?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}
