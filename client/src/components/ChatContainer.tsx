import { useChat } from "../context/ChatContext";
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
  } = useChat();
  const { user: authUser } = useAuth();
  const { socket } = useSocketContext();
  const messageEndRef = useRef<HTMLDivElement>(null);
  // Listen for new messages via socket
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage: any) => {
        console.log("New socket message received:", newMessage);
        // Only add message if it's relevant to current chat
        if (
          selectedUser &&
          ((newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser?._id) ||
            (newMessage.receiverId === selectedUser._id && newMessage.senderId === authUser?._id))
        ) {
          console.log("Adding message to chat:", newMessage);
          addMessage(newMessage);
        }
      };
      
      socket.on("newMessage", handleNewMessage);
      
      return () => {
        socket.off("newMessage", handleNewMessage);
      }
    }
  }, [socket, selectedUser, addMessage]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [getMessages, selectedUser]);
  // Auto-scroll to newest messages
  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No messages yet. Start a conversation!
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={index === messages.length - 1 ? messageEndRef : null}
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