"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { BACKEND_API_URL } from "@/config/env";
import { getMessageHistory } from "@/services/message/message.service";

interface Message {
    sender: {
        _id?: string;
        name: string;
        picture?: string;
    } | string;
    message: string;
    createdAt?: string;
    tripId?: string;
}

export const ChatWindow = ({ tripId = "global" }: { tripId?: string }) => {
    const { socket, isConnected, joinRoom } = useSocket();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [user, setUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Get user info and handle room connection
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Use credentials: 'include' to pass cookies for the /me request
                const res = await fetch(`${BACKEND_API_URL}/user/me`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setUser(data.data);
                }
            } catch (err) {
                console.error("User fetch error:", err);
            }
        };
        fetchUser();
    }, []);

    // Fetch history and join room
    useEffect(() => {
        if (tripId && isConnected && socket) {
            joinRoom(tripId);

            const fetchHistory = async () => {
                try {
                    // History fetch should also potentially use credentials if protected
                    const history = await getMessageHistory(tripId);
                    if (history.success) {
                        setChatHistory(history.data);
                    }
                } catch (err) {
                    console.error("History fetch error:", err);
                }
            };
            fetchHistory();
        }
    }, [tripId, isConnected, socket]);

    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (data: Message) => {
            setChatHistory((prev) => [...prev, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                scrollRef.current?.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: "smooth"
                });
            }, 100);
        }
    }, [chatHistory, isOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const msgData = {
                sender: user?._id || "anonymous",
                senderName: user?.name || "Me",
                tripId: tripId,
                message: message,
                room: tripId,
                createdAt: new Date().toISOString(),
            };
            socket.emit("send_message", msgData);
            setMessage("");
        }
    };

    const getSenderName = (msg: Message) => {
        if (typeof msg.sender === 'object') return msg.sender.name;
        return msg.sender === (user?._id || "anonymous") ? "Me" : "User";
    };

    const isMe = (msg: Message) => {
        const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
        return senderId === user?._id;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center transform hover:scale-110 active:scale-95"
            >
                {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
            </button>

            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-primary p-4 text-white flex justify-between items-center shadow-lg">
                        <div>
                            <h3 className="font-semibold text-lg leading-tight">Travel Chat</h3>
                            <p className="text-[10px] opacity-80">{tripId === 'global' ? 'Global Community' : `Trip #${tripId.slice(-5)}`}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-full ${isConnected ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                            {isConnected ? "Online" : "Connecting..."}
                        </span>
                    </div>

                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8F9FB] scroll-smooth">
                        {chatHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full opacity-40">
                                <FaComments size={40} className="mb-2" />
                                <p className="text-sm font-medium">No messages yet</p>
                            </div>
                        ) : (
                            chatHistory.map((msg, index) => (
                                <div key={index} className={`flex flex-col ${isMe(msg) ? "items-end" : "items-start"}`}>
                                    <span className="text-[10px] text-gray-500 mb-1 px-1">{getSenderName(msg)}</span>
                                    <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm transition-all ${isMe(msg) ? "bg-primary text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none"
                                        }`}>
                                        {msg.message}
                                    </div>
                                    <span className="text-[9px] text-gray-400 mt-1 px-1">
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!isConnected || !message.trim()}
                            className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed group shadow-md"
                        >
                            <FaPaperPlane size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
