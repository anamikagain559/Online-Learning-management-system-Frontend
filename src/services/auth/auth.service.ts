"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { verifyAccessToken } from "@/lib/jwtHanlders";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

import { redirect } from "next/navigation";
import { getUserInfo } from "./getUserInfo";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */

// -------------------- Update Profile --------------------
export const updateMyProfile = async (payload: any) => {
  try {

    const response = await serverFetch.patch("/user/update-my-profile", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
 console.log(payload);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

// -------------------- Reset Password --------------------
export async function resetPassword(_prevState: any, formData: FormData) {
  const redirectTo = formData.get("redirect")?.toString() || null;

  // Build validation payload
  const validationPayload = {
    newPassword: formData.get("newPassword")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };

  // Validate
  const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) throw new Error("User not authenticated");

    const verifiedToken = jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    const userRole: UserRole = verifiedToken.role as UserRole;
    const user = await getUserInfo();

    const response = await serverFetch.post("/auth/reset-password", {
      body: JSON.stringify({
        id: user?.id,
        password: validationPayload.newPassword,
      }),
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!result.success) throw new Error(result.message || "Reset password failed");

    revalidateTag("user-info", { expire: 0 });

    // Handle redirect
    const destination = redirectTo
      ? isValidRedirectForRole(redirectTo, userRole)
        ? `${redirectTo}?loggedIn=true`
        : `${getDefaultDashboardRoute(userRole)}?loggedIn=true`
      : `${getDefaultDashboardRoute(userRole)}?loggedIn=true`;

    redirect(destination);
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    return {
      success: false,
      message: error?.message || "Something went wrong",
      formData: validationPayload,
    };
  }
}

// -------------------- Refresh Tokens --------------------
export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    // Case 1 & 3: Missing tokens
    if (!accessToken && !refreshToken) return { tokenRefreshed: false };
    if (!refreshToken) return { tokenRefreshed: false };

    // Case 2: Access token exists
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);
      if (verifiedToken.success) return { tokenRefreshed: false };
    }

    // Case 4: Refresh token exists, access token expired
    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    if (!result.success) throw new Error(result.message || "Token refresh failed");

    const setCookieHeaders = response.headers.getSetCookie();
    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      throw new Error("No Set-Cookie header found");
    }

    let newAccessToken: string | null = null;
    let newRefreshToken: string | null = null;

    setCookieHeaders.forEach(cookieStr => {
      const parsed = parse(cookieStr);
      if (parsed.accessToken) newAccessToken = parsed.accessToken;
      if (parsed.refreshToken) newRefreshToken = parsed.refreshToken;
    });

    if (!newAccessToken || !newRefreshToken) {
      throw new Error("Tokens not found in cookies");
    }

    // Update cookies
    await deleteCookie("accessToken");
    await setCookie("accessToken", newAccessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", newRefreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/",
      sameSite: "none",
    });

    return { tokenRefreshed: true, success: true, message: "Token refreshed successfully" };
  } catch (error: any) {
    return { tokenRefreshed: false, success: false, message: error?.message || "Something went wrong" };
  }
}
