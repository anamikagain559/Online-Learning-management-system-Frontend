import { serverFetch } from "@/lib/server-fetch";

export const getMessageHistory = async (tripId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/messages/trip/${tripId}`, {
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching message history:", error);
        return { success: false, data: [] };
    }
};

export const getDirectMessageHistory = async (user1: string, user2: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/messages/direct/${user1}/${user2}`, {
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching direct message history:", error);
        return { success: false, data: [] };
    }
};
