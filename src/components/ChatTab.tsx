
import { FC, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import ChatInputPanel from "./chat/ChatInputPanel";
import ChatMessages from "./chat/ChatMessages";
import ChatMessageInput from "./chat/ChatMessageInput";
import OutputFormatUploader from "./chat/OutputFormatUploader";

interface ChatTabProps {
  projectId: string;
}

// Define Message type with strict role property
type Message = {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
};

// Mock data for the chat with proper typing
const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "system",
    content: "Welcome to Tandem Chat! I'll help you document your design decisions and create structured design intent files.",
  }
];

type Goal = {
  id: string;
  text: string;
};

type OutputFormat = {
  name: string;
  size: number;
  type: string;
};

const ChatTab: FC<ChatTabProps> = ({ projectId }) => {
  // Input Panel State - removed documentationName
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat | null>(null);
  
  // Chat Panel State
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatActive, setIsChatActive] = useState(false);
  
  // Handler for starting the chat - removed documentationName requirement
  const handleStartChat = () => {
    // Prepare context for the chat
    const contextMessage: Message = {
      id: `context-${Date.now()}`,
      role: "system",
      content: `New chat started with goals: ${goals.map(g => g.text).join(", ")}\nSelected assets: ${selectedAssetIds.length} files`
    };
    
    setMessages([...INITIAL_MESSAGES, contextMessage]);
    setIsChatActive(true);
  };
  
  // Handler for sending a message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: currentMessage
    };
    
    setMessages([...messages, userMessage]);
    setCurrentMessage("");
    
    // Mock AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: `I'm analyzing your input about "${currentMessage}". Based on your goals and the ${selectedAssetIds.length} selected files, I'll help document this design decision.`
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
  };
  
  return (
    <TabsContent value="chat" className="mt-0">
      <div className="flex h-[calc(100vh-220px)] min-h-[500px] border rounded-lg overflow-hidden">
        {/* Left Panel - Input Form */}
        <ChatInputPanel
          projectId={projectId}
          goalInput={goalInput}
          setGoalInput={setGoalInput}
          goals={goals}
          setGoals={setGoals}
          selectedAssetIds={selectedAssetIds}
          setSelectedAssetIds={setSelectedAssetIds}
          onStartChat={handleStartChat}
          isChatActive={isChatActive}
        />
        
        {/* Right Panel - Chat Interface */}
        <div className="w-2/3 flex flex-col">
          <ChatMessages messages={messages} />
          
          {/* Output Format Section */}
          <OutputFormatUploader
            outputFormat={outputFormat}
            setOutputFormat={setOutputFormat}
          />
          
          {/* Message Input */}
          <ChatMessageInput
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            onSendMessage={handleSendMessage}
            isChatActive={isChatActive}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default ChatTab;
