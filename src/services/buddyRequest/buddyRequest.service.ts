import { BACKEND_API_URL } from "@/config/env";

export const sendBuddyRequest = async (tripId: string, message?: string) => {
    try {
        const response = await fetch(`${BACKEND_API_URL}/buddy-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tripId, message }),
            credentials: 'include',
        });

        return await response.json();
    } catch (error) {
        console.error('Error sending buddy request:', error);
        return { success: false, message: 'Failed to send request' };
    }
};

export const getRequestsForTrip = async (tripId: string) => {
    try {
        const response = await fetch(`${BACKEND_API_URL}/buddy-requests/trip/${tripId}`, {
            credentials: 'include',
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching requests:', error);
        return { success: false, data: [] };
    }
};

export const respondToRequest = async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
        const response = await fetch(`${BACKEND_API_URL}/buddy-requests/${requestId}/respond`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
            credentials: 'include',
        });

        return await response.json();
    } catch (error) {
        console.error('Error responding to request:', error);
        return { success: false, message: 'Failed to respond to request' };
    }
};

export const getPlanBuddies = async (tripId: string) => {
    try {
        const response = await fetch(`${BACKEND_API_URL}/buddy-requests/buddies/${tripId}`, {
            credentials: 'include',
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching buddies:', error);
        return { success: false, data: [] };
    }
};
