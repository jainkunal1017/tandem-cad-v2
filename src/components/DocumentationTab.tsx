
import { FC } from "react";
import { TabsContent } from "@/components/ui/tabs";

interface DocumentationTabProps {
  projectId: string;
}

const DocumentationTab: FC<DocumentationTabProps> = ({ projectId }) => {
  return (
    <TabsContent value="documentation" className="mt-0">
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Documentation functionality coming soon...</p>
      </div>
    </TabsContent>
  );
};

export default DocumentationTab;
