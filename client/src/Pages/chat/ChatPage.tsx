import { useChat } from "../../context/ChatContext";

import Sidebar from "../../components/Sidebar";
import NoChatSelected from "../../components/NoChatSelected";
import ChatContainer from "../../components/ChatContainer";

const ChatPage = () => {
  const { selectedUser } = useChat();
  return (
    <div className="bg-stone-50 dark:bg-gray-950 flex flex-col md:items-center md:justify-center">
      <div className="w-full md:h-[calc(100vh-4rem)] h-screen border border-amber-500/20 flex overflow-hidden bg-white dark:bg-gray-900">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default ChatPage;