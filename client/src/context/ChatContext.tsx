import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
  image?: string;
}

interface User {
  avatar: string;
  _id: string;
  email: string;
  profilePic?: string;
  name: string;
}

interface ChatContextType {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { text: string; image?: string }) => Promise<void>;
  setSelectedUser: (u: User | null) => void;
  addMessage: (m: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((s) => [...s, message]);
  }, []);

  const getUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      const loggedInUserId = localStorage.getItem("_id");
      const role = localStorage.getItem("role");
      if (loggedInUserId && role) {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/users`,
          { id: loggedInUserId, role },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : undefined,
              id: loggedInUserId,
              role,
            },
          }
        );
        setUsers(res.data);
      } else {
        console.error("User ID or role is missing from localStorage");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUsersLoading(false);
    }
  }, []);

  const getMessages = useCallback(async (userId: string) => {
    setIsMessagesLoading(true);
    try {
      const loggedInUserId = localStorage.getItem("_id");
      const role = localStorage.getItem("role");
      if (loggedInUserId && role) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) throw new Error("Backend URL is not defined");
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backendUrl}/api/messages/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
            id: loggedInUserId,
            role,
          },
        });
        setMessages(res.data);
      } else {
        console.error("User ID or role is missing from localStorage");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsMessagesLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (messageData: { text: string; image?: string }) => {
    try {
      if (!selectedUser) return;
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
            id: localStorage.getItem("_id"),
            role: localStorage.getItem("role"),
          },
        }
      );
      setMessages((s) => [...s, res.data]);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
      throw error;
    }
  }, [selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};
