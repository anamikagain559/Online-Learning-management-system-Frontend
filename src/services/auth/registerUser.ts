/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    // 1️⃣ Prepare payload from formData
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      role: formData.get("role"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    // 2️⃣ Validate payload
    const validation = zodValidator(payload, registerUserValidationZodSchema);
    if (!validation.success) {
      return validation; // return validation errors
    }

    const validatedPayload: any = validation.data;

    // 3️⃣ Prepare data to send to backend
    const registerData = {
      name: validatedPayload.name,
      address: validatedPayload.address,
      email: validatedPayload.email,
      password: validatedPayload.password,
      role: validatedPayload.role,
    };

    // 4️⃣ Send JSON request (no FormData)
    const res = await serverFetch.post("/user/register", {
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json", // important
      },
    });

    const result = await res.json();

    // 5️⃣ Auto-login after successful registration
    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again.",
    };
  }
};
