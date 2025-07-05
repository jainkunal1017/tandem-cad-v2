
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormField from "../design-doc/FormField";
import AssetSelector from "../AssetSelector";

type Goal = {
  id: string;
  text: string;
};

interface ChatInputPanelProps {
  projectId: string;
  goalInput: string;
  setGoalInput: (value: string) => void;
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  selectedAssetIds: string[];
  setSelectedAssetIds: (ids: string[]) => void;
  onStartChat: () => void;
  isChatActive: boolean;
}

const ChatInputPanel: FC<ChatInputPanelProps> = ({
  projectId,
  goalInput,
  setGoalInput,
  goals,
  setGoals,
  selectedAssetIds,
  setSelectedAssetIds,
  onStartChat,
  isChatActive
}) => {
  // Handler for adding a new goal
  const handleAddGoal = () => {
    if (goalInput.trim()) {
      const newGoal = {
        id: `goal-${Date.now()}`,
        text: goalInput.trim()
      };
      setGoals([...goals, newGoal]);
      setGoalInput("");
    }
  };
  
  // Handler for removing a goal
  const handleRemoveGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="w-1/3 border-r flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium text-lg">Input Panel</h3>
        <p className="text-sm text-muted-foreground">Configure your design documentation chat</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Goals */}
          <div className="space-y-2">
            <FormField 
              id="goals" 
              label="Goals"
              description="What are you trying to achieve with this design?"
            >
              <div className="flex gap-2">
                <Input 
                  id="goals"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Add a goal"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                />
                <Button onClick={handleAddGoal} type="button">Add</Button>
              </div>
            </FormField>
            
            {/* Goals List */}
            {goals.length > 0 && (
              <div className="pl-4 space-y-1 mt-2">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-2 bg-muted p-2 rounded text-sm">
                    <span className="flex-1">{goal.text}</span>
                    <button 
                      onClick={() => handleRemoveGoal(goal.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <CircleX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Context - Asset Selector */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">Context</h3>
            <AssetSelector 
              projectId={projectId}
              onSelectionChange={setSelectedAssetIds}
            />
          </div>
        </div>
      </ScrollArea>
      
      {/* Start Chat Button */}
      <div className="p-4 border-t mt-auto">
        <Button 
          onClick={onStartChat}
          className="w-full"
        >
          {isChatActive ? 'Refresh Chat Context' : 'Start Chat'}
        </Button>
      </div>
    </div>
  );
};

export default ChatInputPanel;
