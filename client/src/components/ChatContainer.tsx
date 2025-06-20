import { useChatStore } from "../Pages/chat/store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuth } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import { formatMessageTime } from "./formatMessageTime";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    addMessage,
  } = useChatStore();
  const { user: authUser } = useAuth();
  const { socket } = useSocketContext();
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Listen for new messages via socket
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        // Only add message if it's relevant to current chat
        if (
          selectedUser &&
          (newMessage.senderId === selectedUser._id ||
            newMessage.receiverId === selectedUser._id)
        ) {
          addMessage(newMessage);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, selectedUser, addMessage]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-white dark:bg-gray-900 text-black dark:text-white">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white dark:bg-gray-900 text-black dark:text-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border border-gray-300 dark:border-gray-700">
                <img
                  src={
                    authUser && message.senderId === authUser._id
                      ? authUser.avatar || "https://avatar.iran.liara.run/public/boy"
                      : selectedUser?.avatar || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 text-gray-500 dark:text-gray-400">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;