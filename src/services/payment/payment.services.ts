/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IPaymentIntentPayload } from "@/types/payment.interface";
import { getCookie } from "@/services/auth/tokenHandlers";

/**
 * CREATE PAYMENT INTENT (Stripe / SSLCommerz)
 */
export async function createPaymentIntent(data: IPaymentIntentPayload) {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return { success: false, message: "User not logged in", data: null };
    }

    const response = await serverFetch.post("/payments/create-intent", {
      body: JSON.stringify(data),
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create payment intent",
      data: null,
    };
  }
}

/**
 * GET MY PAYMENTS
 */
export async function getMyPayments() {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return { success: false, message: "User not logged in", data: [] };
    }

    const response = await serverFetch.get("/payments/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch payments",
      data: [],
    };
  }
}
