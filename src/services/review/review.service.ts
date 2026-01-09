"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";

export interface ICreateReview {
  travelPlan: string; // Travel plan ID
  rating: number; // 1–5
  comment: string;
}

/**
 * CREATE REVIEW
 * Only logged-in users
 */
export async function createReview(data: ICreateReview) {
  try {
    const response = await serverFetch.post("/reviews", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error creating review:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create review",
    };
  }
}

/**
 * GET ALL REVIEWS FOR A TRAVEL PLAN (PUBLIC)
 */
export async function getReviewsByTravelPlan(travelPlanId: string) {
  try {
    const response = await serverFetch.get(`/reviews/travel-plan/${travelPlanId}`);

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch reviews",
    };
  }
}

/**
 * UPDATE OWN REVIEW
 */
export async function updateReview(
  reviewId: string,
  data: Partial<ICreateReview>
) {
  try {
    const response = await serverFetch.patch(`/reviews/${reviewId}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error updating review:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update review",
    };
  }
}

/**
 * DELETE OWN REVIEW
 */
export async function deleteReview(reviewId: string) {
  try {
    const response = await serverFetch.delete(`/reviews/${reviewId}`);

    return await response.json();
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete review",
    };
  }
}
