
import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "./FormField";
import FileAccordion from "./FileAccordion";
import { AssetFile } from "@/types/file";

interface DesignDocFormProps {
  sessionName: string;
  setSessionName: (value: string) => void;
  objectives: string;
  setObjectives: (value: string) => void;
  promptOutput: string;
  setPromptOutput: (value: string) => void;
  existingFiles: AssetFile[];
  selectedExistingFiles: string[];
  setSelectedExistingFiles: (files: string[]) => void;
  contextFiles: FileList | null;
  setContextFiles: (files: FileList | null) => void;
  macroFile: File | null;
  setMacroFile: (file: File | null) => void;
  onSubmit: (e: FormEvent) => void;
}

const DesignDocForm = ({ 
  sessionName,
  setSessionName,
  objectives,
  setObjectives,
  promptOutput,
  setPromptOutput,
  existingFiles, 
  selectedExistingFiles, 
  setSelectedExistingFiles,
  contextFiles,
  setContextFiles,
  macroFile,
  setMacroFile, 
  onSubmit 
}: DesignDocFormProps) => {
  const assets = existingFiles.filter(file => file.type === "asset");
  const parts = existingFiles.filter(file => file.type === "part");

  const toggleFileSelection = (fileId: string) => {
    setSelectedExistingFiles(
      selectedExistingFiles.includes(fileId)
        ? selectedExistingFiles.filter(id => id !== fileId)
        : [...selectedExistingFiles, fileId]
    );
  };

  const handleContextFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setContextFiles(e.target.files);
    }
  };

  const handleMacroFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMacroFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField id="sessionName" label="CAD Session Name">
        <Input
          id="sessionName"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="e.g., Battery Housing Redesign"
          autoFocus
          className="w-full border-input focus-visible:ring-offset-1"
        />
      </FormField>
      
      <FormField id="objectives" label="Session Objectives">
        <Textarea
          id="objectives"
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder="Describe what you aim to achieve in this CAD session"
          className="min-h-[80px] max-h-[150px] w-full border-input focus-visible:ring-offset-1"
        />
      </FormField>
      
      <FormField id="contextFiles" label="Context Files">
        <div className="space-y-3">
          <FileAccordion 
            title="Existing Assets" 
            files={assets} 
            selectedFiles={selectedExistingFiles}
            onToggleSelection={toggleFileSelection}
          />
          
          <FileAccordion 
            title="Existing Part Files" 
            files={parts} 
            selectedFiles={selectedExistingFiles}
            onToggleSelection={toggleFileSelection}
          />
          
          <Input
            id="contextFiles"
            type="file"
            onChange={handleContextFilesChange}
            multiple
            className="cursor-pointer border-input focus-visible:ring-offset-1"
          />
        </div>
        <p className="text-xs text-muted-foreground">Upload any reference files needed for context</p>
      </FormField>
      
      <FormField 
        id="macroFile" 
        label="Macro File (optional)"
        description="Upload a CAD macro file to document operations"
      >
        <Input
          id="macroFile"
          type="file"
          onChange={handleMacroFileChange}
          className="cursor-pointer border-input focus-visible:ring-offset-1"
        />
      </FormField>
      
      <FormField id="promptOutput" label="Output Requirements">
        <Textarea
          id="promptOutput"
          value={promptOutput}
          onChange={(e) => setPromptOutput(e.target.value)}
          placeholder="Describe what the output of this session should look like"
          className="min-h-[80px] max-h-[150px] w-full border-input focus-visible:ring-offset-1"
        />
      </FormField>
    </form>
  );
};

export default DesignDocForm;
