import { X } from "lucide-react";
import { useAuthStore } from "../Pages/chat/store/useAuthStore";
import { useChatStore } from "../Pages/chat/store/useChatStore";
import { Link } from "react-router-dom";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) {
    return null;
  }
    return (
      <div className="p-2.5 border-b border-base-300 dark:border-base-700 c">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.avatar || "/avatar.png"} alt={selectedUser.name} />
              </div>
            </div>
  
            {/* User info */}
            <div>
              <h3 className="font-medium dark:text-white">{selectedUser.name}</h3>
              <p className="text-sm text-base-content/70 dark:text-base-content/50">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
  
          <div className="flex items-center gap-3">
            {/* Video call button */}
            <Link to="/call" title="Start video call" className="btn btn-primary">
              Video Call
            </Link>
  
            {/* Close button */}
            <button onClick={() => setSelectedUser(null)} title="Close chat">
              <X className="dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    );

};
export default ChatHeader;
