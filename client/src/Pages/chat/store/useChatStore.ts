import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useSocketContext } from "../../../context/SocketContext";

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
  image: string;
  // ...other message properties
}

interface User {
  avatar: string;
  _id: string ;
  email: string; 
  profilePic: string;
  name: string;
  // ...other user properties
}

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { text: string }) => Promise<void>;
  setSelectedUser: (selectedUser: User | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => {
  // Initialize socket context
  const socket = useSocketContext()?.socket;

  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      set((state) => {
        if (state.selectedUser?._id === newMessage.senderId) {
          return { messages: [...state.messages, newMessage] };
        }
        return state;
      });
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, set]);

  return {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    addMessage: (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    },

    getUsers: async () => {
      set({ isUsersLoading: true });
      try {
        const loggedInUserId = localStorage.getItem("_id");
        const role = localStorage.getItem("role");
        if (loggedInUserId && role) {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/messages/users`,
            {
              id: loggedInUserId,
              role: role,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "id": loggedInUserId,
                "role": role,
              },
            }
          );
        
          set({ users: res.data });
        } else {
          console.error("User ID or role is missing from localStorage");
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred.");
      } finally {
        set({ isUsersLoading: false });
      }
    },

    getMessages: async (userId: string) => {
      set({ isMessagesLoading: true });
      try {
        const loggedInUserId = localStorage.getItem("_id");
        const role = localStorage.getItem("role");
        console.log(userId, loggedInUserId)
        if (loggedInUserId && role) {
          const backendUrl = import.meta.env.VITE_BACKEND_URL;
          if (!backendUrl) {
            throw new Error("Backend URL is not defined");
          }
          const res = await axios.get(`${backendUrl}/api/messages/${userId}`, {
            headers: {
              "Content-Type": "application/json",
              "id": loggedInUserId,
              "role": role,
            },
          });
         
          console.log(res.data)
          set({ messages: res.data });
        } else {
          console.error("User ID or role is missing from localStorage");
        }
      } catch {
        toast.error("An unexpected error occurred.");
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (messageData) => {
      try {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedUser._id}`,
          messageData,
          {
            headers: {
              "Content-Type": "application/json",
              id: localStorage.getItem("_id"),
              role: localStorage.getItem("role"),
            },
          }
        );

        set((state) => ({
          messages: [...state.messages, res.data],
        }));
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred.");
      }
    },

    setSelectedUser: (selectedUser: User|null) => set({ selectedUser }),
  };
});