import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-16 bg-stone-50 dark:bg-gray-950">
      <div className="max-w-sm text-center">
        <div className="w-16 h-16 border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mx-auto mb-8">
          <MessageSquare className="w-7 h-7 text-amber-500" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
          <span className="text-xs font-medium tracking-widest uppercase text-amber-500">GuruGram Chat</span>
          <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
        </div>
        <h2 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100 mb-3">
          Select a conversation
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choose a contact from the sidebar to start chatting with your mentor or mentee.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;