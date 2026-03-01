import { useEffect, useState } from "react"
import { useChat } from "../context/ChatContext"
import { useSocketContext } from "../context/SocketContext"
import { Users, Menu, X } from "lucide-react"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat()
  const { onlineUsers } = useSocketContext()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users

  if (isUsersLoading) return (
    <aside className="h-full w-16 lg:w-72 border-r border-amber-500/20 flex flex-col transition-all duration-200 bg-white dark:bg-gray-900">
      <div className="border-b border-amber-500/20 w-full p-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-medium tracking-widest uppercase hidden lg:block text-gray-500 dark:text-gray-400">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-2">
        {Array(8).fill(null).map((_, idx) => (
          <div key={idx} className="w-full px-3 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0 mx-auto lg:mx-0" />
            <div className="hidden lg:flex flex-col gap-2 flex-1">
              <div className="h-3.5 w-28 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-2.5 w-14 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )

  const SidebarContent = () => (
    <>
      <div className="border-b border-amber-500/20 w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">Contacts</span>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-amber-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <label className="mt-4 flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${
              showOnlineOnly ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${
              showOnlineOnly ? 'translate-x-4' : 'translate-x-0.5'
            }`} />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Online only <span className="text-amber-500">({onlineUsers.length - 1})</span>
          </span>
        </label>
      </div>

      <div className="overflow-y-auto flex-1 w-full py-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user)
              setIsMobileMenuOpen(false)
            }}
            className={`w-full px-3 py-3 flex items-center gap-3 transition-colors duration-150 border-l-2 ${
              selectedUser?._id === user._id
                ? 'border-l-amber-500 bg-amber-500/10'
                : 'border-l-transparent hover:bg-stone-50 dark:hover:bg-gray-800'
            }`}
          >
            <div className="relative shrink-0">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 object-cover rounded-full border border-amber-500/20"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
            </div>
            <div className="text-left min-w-0 hidden lg:block">
              <div className="text-sm font-medium text-gray-900 dark:text-stone-100 truncate">{user.name}</div>
              <div className={`text-xs ${
                onlineUsers.includes(user._id) ? 'text-amber-500' : 'text-gray-400 dark:text-gray-500'
              }`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-xs tracking-widest uppercase text-gray-400 text-center py-8">No users found</p>
        )}
      </div>
    </>
  )

  return (
    <>
      <button
        className="absolute lg:hidden z-20 top-20 left-0 bg-white dark:bg-gray-900 border border-amber-500/20 p-2"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-5 h-5 text-amber-500" />
      </button>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden absolute inset-0 z-30 bg-black/50 transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <aside
          className={`mt-16 h-full w-72 bg-white dark:bg-gray-900 flex flex-col transition-transform duration-200 ease-in-out border-r border-amber-500/20 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent />
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-full w-72 border-r border-amber-500/20 flex-col bg-white dark:bg-gray-900">
        <SidebarContent />
      </aside>
    </>
  )
}

export default Sidebar

