"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string, p0: { httpOnly: boolean; secure: boolean; sameSite: string; path: string; maxAge: number; }) => {
    const cookieStore = await cookies();
    cookieStore.set(key, value);
}

export const getCookie = async (key: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
}

export const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}