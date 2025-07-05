
import { FC, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface ChatMessageInputProps {
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  onSendMessage: () => void;
  isChatActive: boolean;
}

const ChatMessageInput: FC<ChatMessageInputProps> = ({
  currentMessage,
  setCurrentMessage,
  onSendMessage,
  isChatActive
}) => {
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  
  // On key press for sending messages with Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t mt-2">
      <div className="flex gap-2">
        <Textarea
          ref={chatInputRef}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={isChatActive ? "Ask about your design decisions..." : "Start a chat first..."}
          className="min-h-[50px] resize-none"
          onKeyDown={handleKeyPress}
          disabled={!isChatActive}
        />
        <Button 
          onClick={onSendMessage} 
          disabled={!isChatActive || !currentMessage.trim()}
          size="icon"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatMessageInput;
