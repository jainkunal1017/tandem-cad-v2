
import { FC, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
};

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Effect to scroll to bottom of chat when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-primary/10 ml-10' 
                : msg.role === 'system' 
                  ? 'bg-muted/50 text-xs' 
                  : 'bg-muted mr-10'
            }`}
          >
            <p className="text-xs font-medium mb-1">
              {msg.role === 'user' 
                ? 'You' 
                : msg.role === 'system' 
                  ? 'System' 
                  : 'Tandem Assistant'}
            </p>
            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
