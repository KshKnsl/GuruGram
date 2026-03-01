import { useChat } from "../context/ChatContext";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
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
      <div className="flex-1 flex flex-col overflow-hidden bg-stone-50 dark:bg-gray-950">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {Array(6).fill(null).map((_, idx) => (
            <div key={idx} className={`flex items-end gap-3 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse shrink-0" />
              <div className={`flex flex-col gap-1.5 ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
                <div className="h-2.5 w-14 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-14 w-52 bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-stone-50 dark:bg-gray-950">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xs tracking-widest uppercase text-gray-400">No messages yet — say hello!</p>
          </div>
        )}
        {messages.map((message, index) => {
          const isMine = message.senderId === authUser?._id;
          return (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? messageEndRef : null}
              className={`flex items-end gap-2.5 ${isMine ? "flex-row-reverse" : "flex-row"}`}
            >
              <img
                src={
                  isMine
                    ? authUser?.avatar || "https://xsgames.co/randomusers/assets/avatars/pixel/10.jpg"
                    : selectedUser?.avatar || "/avatar.png"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-amber-500/20 shrink-0"
              />
              <div className={`flex flex-col gap-1 max-w-xs lg:max-w-md ${isMine ? "items-end" : "items-start"}`}>
                <time className="text-xs text-gray-400 dark:text-gray-500 px-1">
                  {formatMessageTime(message.createdAt)}
                </time>
                <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                  isMine
                    ? "bg-amber-500 text-gray-900"
                    : "bg-white dark:bg-gray-900 border border-amber-500/20 text-gray-800 dark:text-stone-200"
                }`}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-50 mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;