import { X, Video } from "lucide-react";
import { useSocketContext } from "../context/SocketContext";
import { useChat } from "../context/ChatContext";
import { Link } from "react-router-dom";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const { onlineUsers } = useSocketContext();
  const role = localStorage.getItem("role");

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-5 py-3 border-b border-amber-500/20 bg-white dark:bg-gray-900 shrink-0">
      <div className="flex items-center justify-between">
        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={selectedUser.avatar || "/avatar.png"}
              alt={selectedUser.name}
              className="w-10 h-10 object-cover rounded-full border border-amber-500/20"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
            )}
          </div>
          <div>
            <Link
              to={role === "mentee" ? `/profile/mentor/${selectedUser._id}` : `/profile/${selectedUser._id}`}
              className="text-sm font-semibold text-gray-900 dark:text-stone-100 hover:text-amber-500 transition-colors"
            >
              {selectedUser.name}
            </Link>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {isOnline ? <span className="text-amber-500">Online</span> : "Offline"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/call"
            title="Start video call"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-widest uppercase border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-gray-900 hover:border-amber-500 transition-all duration-200"
          >
            <Video className="w-3.5 h-3.5" />
            Call
          </Link>
          <button
            onClick={() => setSelectedUser(null)}
            title="Close chat"
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;