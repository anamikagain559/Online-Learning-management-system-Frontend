/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {
   const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return null; // user not logged in
    }
   const response = await serverFetch.get("/user/me", {
      headers: {
        Authorization: `${accessToken}`,
      },
      next: { tags: ["user-info"] },
    });

    if (!response.ok) {
      return null;
    }
        const result = await response.json();
        console.log(response)

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

    userInfo = {
    name: result?.data?.admin?.name
        || result?.data?.user?.name
        || result?.data?.name
        || "Unknown User",
    ...result?.data
};


        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "PATIENT",
        };
    }

}