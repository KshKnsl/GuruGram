import ChatRoom from '../components/ChatRoom/ChatRoom'
import { MessageSquare } from 'lucide-react'

export default function MentorChatPage() {
  return (
    <div className="h-screen flex flex-col bg-stone-50 dark:bg-gray-950">
      <header className="flex-shrink-0 border-b border-amber-500/20 bg-white dark:bg-gray-900 px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-4 w-4 text-amber-500" />
            <span className="font-serif-display text-lg font-bold text-gray-900 dark:text-stone-100">
              Mentor Chat
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Live session
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-amber-500 font-medium">
            Dr. Jane Smith
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ChatRoom
          mentorName="Dr. Jane Smith"
          mentorAvatar="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-19%20132925-0LyNTc4JMPKffhgUBO45kAOcRjDOhv.png"
        />
      </div>
    </div>
  )
}