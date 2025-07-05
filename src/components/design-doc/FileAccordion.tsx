
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FileSelectionList from "./FileSelectionList";
import { AssetFile } from "@/types/file";

interface FileAccordionProps {
  title: string;
  files: AssetFile[];
  selectedFiles: string[];
  onToggleSelection: (fileId: string) => void;
}

const FileAccordion = ({ title, files, selectedFiles, onToggleSelection }: FileAccordionProps) => {
  if (files.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="rounded-md border">
      <AccordionItem value="files" className="border-b-0">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:bg-accent/50 hover:no-underline">
          {title} ({files.length})
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="bg-background p-4 pt-0 space-y-1 rounded-b-md">
            <FileSelectionList 
              files={files}
              selectedFiles={selectedFiles}
              onToggleSelection={onToggleSelection}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FileAccordion;
