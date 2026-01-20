"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { ITravelPlanFormData } from "@/types/travelPlan.interface";

/**
 * ADMIN: GET ALL TRAVEL PLANS
 */
export async function getAllTravelPlans(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/travel-plans${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching all travel plans:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch travel plans",
    };
  }
}
export async function getMatchedTravelPlans(query?: {
  destination?: string;
  startDate?: string;
  endDate?: string;
  travelType?: string;
}) {
  try {
    // Build query string
    const params = new URLSearchParams();
    if (query?.destination) params.append("destination", query.destination);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);
    if (query?.travelType) params.append("travelType", query.travelType);

    const queryString = params.toString();
    const response = await serverFetch.get(
      `/travel-plans/match${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching matched travel plans:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch matched travel plans",
    };
  }
}

export async function createTravelPlan(data: ITravelPlanFormData) {
  try {
    const response = await serverFetch.post("/travel-plans", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error creating travel plan:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create travel plan",
    };
  }
}

/**
 * GET MY TRAVEL PLANS
 */
export async function getMyTravelPlans(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/travel-plans/my-plans${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching travel plans:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch travel plans",
    };
  }
}

/**
 * GET PUBLIC TRAVEL PLANS (MATCHMAKING)
 */
export async function getPublicTravelPlans(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/travel-plans/public${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching public travel plans:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch public travel plans",
    };
  }
}

/**
 * UPDATE TRAVEL PLAN
 */
export async function updateTravelPlan(
  planId: string,
  data: Partial<ITravelPlanFormData>
) {
  try {
    const response = await serverFetch.patch(
      `/travel-plans/${planId}`,
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error updating travel plan:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update travel plan",
    };
  }
}

/**
 * DELETE TRAVEL PLAN
 */
export async function deleteTravelPlan(planId: string) {
  try {
    const response = await serverFetch.delete(
      `/travel-plans/${planId}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error deleting travel plan:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete travel plan",
    };
  }
}
