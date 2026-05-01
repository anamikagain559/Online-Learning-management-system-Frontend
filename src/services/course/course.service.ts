"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { ICourseFormData } from "@/types/course.interface";

/**
 * ADMIN: GET ALL COURSES
 */
export async function getAllCourses(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/courses${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching all courses:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch courses",
    };
  }
}

export async function getMatchedCourses(query?: Record<string, any>) {
  try {
    const { queryStringFormatter } = await import("@/lib/formatters");
    
    const structuredQuery = {
      ...query,
      searchTerm: query?.searchTerm || query?.category || ""
    };
    
    const queryString = queryStringFormatter(structuredQuery);

    const response = await serverFetch.get(
      `/courses/match${queryString ? `?${queryString}` : ""}`
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching matched courses:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch matched courses",
    };
  }
}

export async function createCourse(data: ICourseFormData) {
  try {
    const response = await serverFetch.post("/courses", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error creating course:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create course",
    };
  }
}

/**
 * GET MY COURSES
 */
export async function getMyCourses(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/courses/my-courses${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch courses",
    };
  }
}

/**
 * GET PUBLIC COURSES
 */
export async function getPublicCourses(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/courses/public${queryString ? `?${queryString}` : ""}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching public courses:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch public courses",
    };
  }
}

/**
 * UPDATE COURSE
 */
export async function updateCourse(
  courseId: string,
  data: Partial<ICourseFormData>
) {
  try {
    const response = await serverFetch.patch(
      `/courses/${courseId}`,
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error updating course:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update course",
    };
  }
}

/**
 * DELETE COURSE
 */
export async function deleteCourse(courseId: string) {
  try {
    const response = await serverFetch.delete(
      `/courses/${courseId}`
    );

    return await response.json();
  } catch (error: any) {
    console.error("Error deleting course:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete course",
    };
  }
}
