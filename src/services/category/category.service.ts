/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "@/services/auth/tokenHandlers";

export async function createCategory(data: any) {
  try {
    const accessToken = await getCookie("accessToken");
    const response = await serverFetch.post("/categories", {
      body: JSON.stringify(data),
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getAllCategories() {
  try {
    const response = await serverFetch.get("/categories");
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    const accessToken = await getCookie("accessToken");
    const response = await serverFetch.patch(`/categories/${id}`, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    const accessToken = await getCookie("accessToken");
    const response = await serverFetch.delete(`/categories/${id}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
