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
}

export interface ITravelPlan extends ITravelPlanFormData {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
