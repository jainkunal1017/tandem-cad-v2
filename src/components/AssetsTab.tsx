
import { FC, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import FileUploadSection from "./FileUploadSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CircuitBoard } from "lucide-react";
import { AssetFile } from "@/types/file";

interface AssetsTabProps {
  projectId: string;
}

// Mock data for different file sections
const MOCK_PARTS_FILES: AssetFile[] = [
  {
    id: "part-1",
    name: "battery-housing.step",
    type: "step",
    size: 2500000,
    dateUploaded: "2025-04-29",
    uploadedBy: "Alex Thompson"
  },
  {
    id: "part-2",
    name: "cooling-plate-v2.sldprt",
    type: "sldprt",
    size: 3200000,
    dateUploaded: "2025-04-27",
    uploadedBy: "Maya Rodriguez"
  },
  {
    id: "part-3",
    name: "cell-module-assembly.asm",
    type: "asm",
    size: 4800000,
    dateUploaded: "2025-04-25",
    uploadedBy: "Lydia Chen"
  }
];

const MOCK_CONTEXT_FILES: AssetFile[] = [
  {
    id: "context-1",
    name: "thermal-requirements.pdf",
    type: "pdf",
    size: 1200000,
    dateUploaded: "2025-04-28",
    uploadedBy: "Alex Thompson"
  },
  {
    id: "context-2",
    name: "material-specifications.docx",
    type: "docx",
    size: 950000,
    dateUploaded: "2025-04-26",
    uploadedBy: "Ken Williams"
  }
];

const MOCK_TRANSCRIPT_FILES: AssetFile[] = [
  {
    id: "transcript-1",
    name: "housing-edit-session.swp",
    type: "swp",
    size: 750000,
    dateUploaded: "2025-04-29",
    uploadedBy: "Maya Rodriguez"
  },
  {
    id: "transcript-2",
    name: "assembly-changes.vba",
    type: "vba",
    size: 320000,
    dateUploaded: "2025-04-25",
    uploadedBy: "Lydia Chen"
  },
  {
    id: "transcript-3",
    name: "design-history.csv",
    type: "csv",
    size: 180000,
    dateUploaded: "2025-04-24",
    uploadedBy: "Ken Williams"
  }
];

const AssetsTab: FC<AssetsTabProps> = ({ projectId }) => {
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false);

  return (
    <TabsContent value="assets" className="mt-0 w-full">
      <div className="flex flex-col gap-6 w-full">
        {/* CAD Transcript Section - Full Width Top Row with button in header */}
        <div className="w-full">
          <FileUploadSection
            title="CAD Transcript"
            description="Upload engineering action logs"
            acceptedFileTypes=".swp,.js,.vba,.csv"
            fileTypeDescriptions="Supported formats: SWP (SOLIDWORKS macros), Onshape JS, VBA, CSV"
            mockFiles={MOCK_TRANSCRIPT_FILES}
            headerButton={
              <Button 
                onClick={() => setIsIntegrationDialogOpen(true)}
                className="flex items-center gap-2 bg-black hover:bg-black/90"
                size="sm"
                variant="default"
              >
                <CircuitBoard className="h-4 w-4" />
                <span>Connect to CAD</span>
              </Button>
            }
          />
        </div>

        {/* Two Column Layout for Parts and Context Files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Parts & Assemblies Column */}
          <div className="w-full">
            <FileUploadSection
              title="Parts & Assemblies"
              description="Upload your CAD models and assemblies"
              acceptedFileTypes=".step,.stp,.sldprt,.sldasm,.prt,.asm"
              fileTypeDescriptions="Supported formats: STEP, SLDPRT, SLDASM, PRT, ASM"
              mockFiles={MOCK_PARTS_FILES}
            />
          </div>
          
          {/* Context Files Column */}
          <div className="w-full">
            <FileUploadSection
              title="Context Files"
              description="Upload general reference material"
              acceptedFileTypes=".pdf,.docx,.pptx,.txt"
              fileTypeDescriptions="Supported formats: PDF, DOCX, PPTX, TXT"
              mockFiles={MOCK_CONTEXT_FILES}
            />
          </div>
        </div>
      </div>
      
      {/* Integration Dialog */}
      <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CAD Integrations</DialogTitle>
            <DialogDescription>
              Direct integrations with leading CAD platforms are coming soon to Tandem Vault!
              <div className="mt-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated DIF capture from SOLIDWORKS</li>
                  <li>Onshape direct API integration</li>
                  <li>Fusion 360 plugin</li>
                  <li>And more...</li>
                </ul>
              </div>
              <div className="mt-6 text-sm">
                Join our waiting list to be notified when these integrations become available.
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default AssetsTab;
