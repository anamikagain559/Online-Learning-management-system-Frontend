/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { Role, UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            return { id: "", name: "Guest", email: "", role: Role.STUDENT, picture: "", createdAt: "", updatedAt: "" }; 
        }

        let verifiedToken: JwtPayload | null = null;
        try {
            verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
        } catch (e) {
            console.error("JWT Verification failed", e);
        }

        const response = await serverFetch.get("/user/me", {
            headers: {
                Authorization: `${accessToken}`,
            },
            next: { tags: ["user-info"] },
        });

        if (!response.ok) {
            return { 
                id: verifiedToken?.userId || "", 
                name: verifiedToken?.name || "Guest", 
                email: verifiedToken?.email || "", 
                role: (verifiedToken?.role as any) || Role.STUDENT,
                picture: "",
                createdAt: "",
                updatedAt: ""
            };
        }

        const result = await response.json();
        const data = result?.data || {};

        return {
            id: data._id || data.id || verifiedToken?.userId || "",
            name: data.name 
                || data.user?.name 
                || data.admin?.name 
                || data.student?.name 
                || data.instructor?.name 
                || verifiedToken?.name 
                || "Unknown User",
            email: data.email || verifiedToken?.email || "",
            role: data.role || verifiedToken?.role || Role.STUDENT,
            picture: data.image || data.picture || data.user?.image || data.admin?.image || "",
            ...data
        };
    } catch (error: any) {
        console.error("getUserInfo Error:", error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: Role.STUDENT,
            picture: "",
            createdAt: "",
            updatedAt: "",
        };
    }
}