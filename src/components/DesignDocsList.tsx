
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus } from "lucide-react";
import DesignDocModal from "./DesignDocModal";

interface DesignDocItem {
  id: string;
  name: string;
  createdAt: string;
  status: string;
}

interface DesignDocsListProps {
  projectId: string;
}

const DesignDocsList = ({ projectId }: DesignDocsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designDocs, setDesignDocs] = useState<DesignDocItem[]>([]);
  
  const handleCreateDoc = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Design Docs</CardTitle>
      </CardHeader>
      <CardContent>
        {designDocs.length > 0 ? (
          <div className="space-y-3">
            {designDocs.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center p-3 border rounded-md hover:bg-accent/50 cursor-pointer"
              >
                <FileText className="h-5 w-5 mr-3 text-primary" />
                <div className="flex-grow">
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {doc.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No design docs yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first design documentation to track CAD sessions
            </p>
            <Button onClick={handleCreateDoc}>
              <Plus className="h-4 w-4 mr-1" />
              New Design Documentation
            </Button>
          </div>
        )}
      </CardContent>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {isModalOpen && <DesignDocModal onClose={handleCloseModal} projectId={projectId} />}
      </Dialog>
    </Card>
  );
};

export default DesignDocsList;
