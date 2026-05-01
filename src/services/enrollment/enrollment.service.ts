"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";

export async function createEnrollment(courseId: string) {
  try {
    const response = await serverFetch.post(`/enrollments/${courseId}`, {
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to enroll in course",
    };
  }
}

export async function getEnrollmentsByCourse(courseId: string) {
  try {
    const response = await serverFetch.get(`/enrollments/${courseId}`);
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching enrollments:", error);
    return {
      success: false,
      data: [],
    };
  }
}

export async function getMyEnrollments() {
  try {
    const response = await serverFetch.get(`/enrollments/my-requests`);
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching my enrollments:", error);
    return {
      success: false,
      data: [],
    };
  }
}

export async function updateEnrollmentStatus(id: string, status: string) {
  try {
    const response = await serverFetch.patch(`/enrollments/${id}`, {
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error updating enrollment status:", error);
    return {
      success: false,
      message: "Failed to update enrollment status",
    };
  }
}

export async function getAllEnrollments(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/enrollments${queryString ? `?${queryString}` : ""}`
    );
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching all enrollments:", error);
    return {
      success: false,
      data: [],
    };
  }
}
