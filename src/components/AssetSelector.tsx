import { FC, useState, useRef } from "react";
import { ChevronDown, ChevronUp, FileText, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetFile } from "@/types/file";
import { toast } from "sonner";

interface AssetCategory {
  name: string;
  files: AssetFile[];
}

interface AssetSelectorProps {
  projectId: string;
  onSelectionChange: (selectedIds: string[]) => void;
}

// Mock data for different file sections - using the same mock data from AssetsTab
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

const AssetSelector: FC<AssetSelectorProps> = ({ projectId, onSelectionChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Parts & Assemblies": true,
    "Context Files": true,
    "CAD Transcript": true
  });
  
  // Define asset categories
  const assetCategories: AssetCategory[] = [
    {
      name: "Parts & Assemblies",
      files: MOCK_PARTS_FILES
    },
    {
      name: "Context Files",
      files: MOCK_CONTEXT_FILES
    },
    {
      name: "CAD Transcript",
      files: MOCK_TRANSCRIPT_FILES
    }
  ];
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Toggle file selection
  const toggleFileSelection = (fileId: string) => {
    let newSelected: string[];
    
    if (selectedAssetIds.includes(fileId)) {
      newSelected = selectedAssetIds.filter(id => id !== fileId);
    } else {
      newSelected = [...selectedAssetIds, fileId];
    }
    
    setSelectedAssetIds(newSelected);
    onSelectionChange(newSelected);
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Mock upload - in reality, this would upload the files to the server
      const fileCount = e.target.files.length;
      toast.success(`${fileCount} file(s) queued for upload. This is a mockup.`);
    }
  };
  
  return (
    <div className="space-y-4 border rounded-lg p-3">
      {/* Asset categories */}
      <div className="space-y-2">
        {assetCategories.map((category) => (
          <div key={category.name} className="space-y-1">
            {/* Category header */}
            <button 
              className="w-full flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
              onClick={() => toggleCategory(category.name)}
            >
              <span className="font-medium text-sm">{category.name}</span>
              {expandedCategories[category.name] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {/* Files list */}
            {expandedCategories[category.name] && (
              <div className="pl-4 space-y-1">
                {category.files.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="w-4 h-4 border rounded flex items-center justify-center">
                      {selectedAssetIds.includes(file.id) && (
                        <Check className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Upload additional files */}
      <div className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          <span>Upload additional files</span>
        </Button>
        <input 
          type="file" 
          className="hidden" 
          multiple 
          onChange={handleFileUpload}
          ref={fileInputRef}
          accept=".step,.stp,.sldprt,.sldasm,.prt,.asm,.pdf,.docx,.pptx,.txt,.swp,.js,.vba,.csv"
        />
      </div>
      
      {/* Selected count */}
      <div className="text-xs text-muted-foreground text-right">
        {selectedAssetIds.length} file(s) selected
      </div>
    </div>
  );
};

export default AssetSelector;
