
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';

interface TandemAssistantViewProps {
  selectedFiles: string[];
  onBackToStudio: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const TandemAssistantView = ({ selectedFiles, onBackToStudio }: TandemAssistantViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Mock AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: `I can help you analyze the ${selectedFiles.length} selected files. What would you like to know about your design?`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPlaceholderText = () => {
    if (selectedFiles.length > 0 && messages.length === 0) {
      return "Files selected. Type a prompt below to begin analysis.";
    }
    return "Ask about your technical files...";
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center gap-3 shrink-0">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBackToStudio}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-medium text-gray-900">Studio: Tandem Assistant</h1>
      </div>
      
      {/* Selected Files Info */}
      {selectedFiles.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 shrink-0">
          <p className="text-sm text-blue-700">
            {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected for analysis
          </p>
        </div>
      )}

      {/* Messages Area - Takes remaining space and scrolls only its content */}
      <div className="flex-1 min-h-0 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-sm text-muted-foreground">
              <p tabIndex={-1}>Start chatting with your technical files.</p>
              <p tabIndex={-1} className="mt-2">Select files from the left panel to begin analysis.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Auto-scroll anchor */}
            <div ref={scrollAnchorRef} />
          </div>
        )}
      </div>

      {/* Chat Input Bar - Always visible at bottom, never scrolls */}
      <div className="border-t p-4 bg-white shrink-0">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholderText()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TandemAssistantView;
