"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    joinRoom: (room: string) => void;
    currentRoom: string | null;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    joinRoom: () => { },
    currentRoom: null,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);

    const joinRoom = (room: string) => {
        if (socket) {
            socket.emit("join_room", room);
            setCurrentRoom(room);
        }
    };

    useEffect(() => {
        // Replace with your backend URL
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
            reconnectionAttempts: 5,
        });

        socketInstance.on("connect", () => {
            console.log("Connected to WebSocket");
            setIsConnected(true);
            // Rejoin room if it exists
            if (currentRoom) {
                socketInstance.emit("join_room", currentRoom);
            }
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from WebSocket");
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected, joinRoom, currentRoom }}>
            {children}
        </SocketContext.Provider>
    );
};
