import React, { useState, useRef, useEffect } from 'react'
import { Send, Phone, Video, MoreVertical, Paperclip } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Message {
  id: string
  sender: 'mentor' | 'mentee'
  content: string
  timestamp: Date
}

interface ChatRoomProps {
  mentorName: string
  mentorAvatar: string
}

export default function ChatRoom({ mentorName, mentorAvatar }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mentor',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: '2',
      sender: 'mentee',
      content: 'Hi! I have a question about React hooks.',
      timestamp: new Date(Date.now() - 1000 * 60 * 4)
    },
    {
      id: '3',
      sender: 'mentor',
      content: "Sure, I'd be happy to help. What specifically about hooks are you struggling with?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3)
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'mentee',
        content: newMessage.trim(),
        timestamp: new Date()
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-gray-950">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-900 px-5 py-3 flex items-center justify-between border-b border-amber-500/20 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={mentorAvatar || '/placeholder.svg'}
            alt={mentorName}
            className="w-10 h-10 rounded-full object-cover border border-amber-500/20 shrink-0"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-stone-100">{mentorName}</h2>
            <p className="text-xs text-amber-500">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Voice call"
            className="p-2 border border-amber-500/20 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
          <Link
            to="/call"
            title="Video call"
            className="p-2 border border-amber-500/20 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <Video className="w-4 h-4" />
          </Link>
          <button
            type="button"
            title="More options"
            className="p-2 border border-amber-500/20 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2.5 ${message.sender === 'mentee' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex flex-col gap-1 max-w-xs lg:max-w-md ${message.sender === 'mentee' ? 'items-end' : 'items-start'}`}>
              <time className="text-xs text-gray-400 dark:text-gray-500 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </time>
              <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                message.sender === 'mentee'
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-white dark:bg-gray-900 border border-amber-500/20 text-gray-800 dark:text-stone-200'
              }`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-amber-500/20 flex items-center gap-2 shrink-0"
      >
        <button
          type="button"
          title="Attach file"
          className="p-2 border border-amber-500/20 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-colors shrink-0"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm bg-transparent border border-amber-500/20 text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="submit"
          title="Send"
          disabled={!newMessage.trim()}
          className="p-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
