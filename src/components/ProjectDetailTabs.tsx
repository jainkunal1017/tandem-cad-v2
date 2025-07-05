
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FC } from "react";

interface ProjectDetailTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  children: React.ReactNode;
}

const ProjectDetailTabs: FC<ProjectDetailTabsProps> = ({
  activeTab = "chat",
  onTabChange,
  children,
}) => {
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
      <div className="border-b mb-6">
        <TabsList className="bg-transparent h-12">
          <TabsTrigger value="chat" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Chat
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Assets
          </TabsTrigger>
          <TabsTrigger value="documentation" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Documentation
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export default ProjectDetailTabs;
