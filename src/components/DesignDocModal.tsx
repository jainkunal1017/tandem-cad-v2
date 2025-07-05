
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import DesignDocForm from "./design-doc/DesignDocForm";
import ModalFooter from "./design-doc/ModalFooter";
import { AssetFile } from "@/types/file";

interface DesignDocModalProps {
  onClose: () => void;
  projectId: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const DesignDocModal = ({ onClose, projectId }: DesignDocModalProps) => {
  // Form state
  const [sessionName, setSessionName] = useState("");
  const [objectives, setObjectives] = useState("");
  const [promptOutput, setPromptOutput] = useState("");
  const [contextFiles, setContextFiles] = useState<FileList | null>(null);
  const [macroFile, setMacroFile] = useState<File | null>(null);
  const [selectedExistingFiles, setSelectedExistingFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Design Documentation Assistant. I'll help summarize your CAD session. What are you working on today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  
  // Mock data for existing files - in a real app, this would be fetched from an API
  const existingFiles: AssetFile[] = [
    { 
      id: "asset-1", 
      name: "Battery Housing Specs.pdf", 
      type: "pdf", 
      size: 1540000, 
      dateUploaded: "2025-04-28", 
      uploadedBy: "Alex Thompson" 
    },
    { 
      id: "asset-2", 
      name: "Thermal Analysis Report.pdf", 
      type: "pdf", 
      size: 2850000, 
      dateUploaded: "2025-04-27", 
      uploadedBy: "Maya Rodriguez" 
    },
    { 
      id: "part-1", 
      name: "BP-1234-01_Housing.stp", 
      type: "stp", 
      size: 4200000, 
      dateUploaded: "2025-04-25", 
      uploadedBy: "Ken Williams" 
    },
    { 
      id: "part-2", 
      name: "BP-1235-02_Connector.stp", 
      type: "stp", 
      size: 3680000, 
      dateUploaded: "2025-04-24", 
      uploadedBy: "Lydia Chen" 
    },
  ];
  
  const handleSubmit = async () => {
    if (!sessionName.trim()) {
      toast.error("CAD session name is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Design documentation created successfully");
      onClose();
    } catch (error) {
      console.error("Failed to create design documentation:", error);
      toast.error("Failed to create design documentation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      content: chatInput,
      sender: "user" as const,
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setChatInput("");
    
    // Simulate AI response (this would be replaced with actual AI integration)
    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now() + 1}`,
        content: "I've noted your input. This would connect to an actual AI in the production version.",
        sender: "ai" as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  return (
    <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0">
      <div className="p-6">
        <DialogHeader className="pb-4">
          <DialogTitle>New Design Documentation</DialogTitle>
          <DialogDescription>
            Create a new design documentation record for your CAD session
          </DialogDescription>
        </DialogHeader>
      </div>
      
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-grow overflow-hidden"
      >
        {/* Left Panel - Form */}
        <ResizablePanel defaultSize={50} minSize={40}>
          <ScrollArea className="h-full px-6 pb-6 overflow-y-auto">
            <DesignDocForm 
              sessionName={sessionName}
              setSessionName={setSessionName}
              objectives={objectives}
              setObjectives={setObjectives}
              promptOutput={promptOutput}
              setPromptOutput={setPromptOutput}
              existingFiles={existingFiles}
              selectedExistingFiles={selectedExistingFiles}
              setSelectedExistingFiles={setSelectedExistingFiles}
              contextFiles={contextFiles}
              setContextFiles={setContextFiles}
              macroFile={macroFile}
              setMacroFile={setMacroFile}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
          </ScrollArea>
        </ResizablePanel>
        
        {/* Resizable Handle */}
        <ResizableHandle withHandle />
        
        {/* Right Panel - AI Documentation Display & Chat */}
        <ResizablePanel defaultSize={50} minSize={40}>
          <div className="flex flex-col h-full">
            {/* AI Documentation Display Area */}
            <div className="flex-grow p-6 overflow-hidden flex flex-col">
              <h3 className="text-lg font-medium mb-4">AI-Generated Documentation</h3>
              
              <ScrollArea className="flex-grow border rounded-md p-4 bg-muted/20">
                {sessionName ? (
                  <>
                    <h4 className="font-bold text-lg">{sessionName}</h4>
                    <p className="text-muted-foreground mt-2 mb-4">Generated summary based on your inputs</p>
                    
                    {objectives && (
                      <div className="mb-4">
                        <h5 className="font-medium text-sm">Objectives:</h5>
                        <p className="mt-1">{objectives}</p>
                      </div>
                    )}
                    
                    {promptOutput && (
                      <div className="mb-4">
                        <h5 className="font-medium text-sm">Output Requirements:</h5>
                        <p className="mt-1">{promptOutput}</p>
                      </div>
                    )}
                    
                    {selectedExistingFiles.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium text-sm">Referenced Files:</h5>
                        <ul className="list-disc list-inside mt-1">
                          {selectedExistingFiles.map(id => {
                            const file = existingFiles.find(f => f.id === id);
                            return file ? (
                              <li key={id} className="text-sm">{file.name}</li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-16">
                    <p>Enter information in the form to see AI-generated documentation</p>
                  </div>
                )}
              </ScrollArea>
              
              {/* Chat Interface */}
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Design Assistant</h3>
                
                <div className="border rounded-md">
                  {/* Message Thread */}
                  <ScrollArea className="h-[200px] p-3">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs mt-1 block opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Chat Input */}
                  <div className="flex items-center p-3 border-t">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Message..."
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="icon"
                      variant="ghost" 
                      className="ml-2"
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      <ModalFooter 
        onClose={onClose} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </DialogContent>
  );
};

export default DesignDocModal;
