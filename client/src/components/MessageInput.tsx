import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { useChat } from "../context/ChatContext";
import { Image, Send, X } from "lucide-react";
import { toast } from "sonner";

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessage } = useChat();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        // image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="px-4 py-3 border-t border-amber-500/20 bg-white dark:bg-gray-900 shrink-0">
      {imagePreview && (
        <div className="mb-3">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover border border-amber-500/30"
            />
            <button
              onClick={removeImage}
              type="button"
              title="Remove image"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-900 dark:bg-stone-100 text-white dark:text-gray-900 flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
          title="Upload an image"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Attach image"
          className={`p-2 border transition-colors shrink-0 ${
            imagePreview
              ? "border-amber-500 text-amber-500"
              : "border-amber-500/20 text-gray-400 hover:border-amber-500 hover:text-amber-500"
          }`}
        >
          <Image className="w-4 h-4" />
        </button>

        <input
          type="text"
          className="flex-1 px-4 py-2.5 text-sm bg-transparent border border-amber-500/20 text-gray-900 dark:text-stone-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          title="Send message"
          className="p-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;