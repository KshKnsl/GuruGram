import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios";
import { useAuthStore } from "./useAuthStore";

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
  image: string;
  // ...other message properties
}

interface User {
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
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User|null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const loggedInUserId = localStorage.getItem("_id");
      const role = localStorage.getItem("role");

      if (loggedInUserId && role) {
        const res = await axiosInstance.get("/messages/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "id": loggedInUserId,
            "role": role,
          },
        });
        
      set({ users: res.data });
      } else {
        console.error("User ID or role is missing from localStorage");
      }
    } catch (error) {
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
      console.log(userId,loggedInUserId)
      if (loggedInUserId && role) {
        const res = await axiosInstance({
          url: `/messages/${userId}`,
          method: "GET",
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
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: { text: string }) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    try {
      const loggedInUserId = localStorage.getItem("_id");
      const role = localStorage.getItem("role");

      if (loggedInUserId && role) {
        const res = await axiosInstance({
          url: `/messages/send/${selectedUser._id}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "id": loggedInUserId,
            "role": role,
          },
          data: messageData,
        });
        set({ messages: [...messages, res.data] });
      } else {
        console.error("User ID or role is missing from localStorage");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;
    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser: User|null) => set({ selectedUser }),
}));