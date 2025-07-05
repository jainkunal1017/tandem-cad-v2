
import { FC, useRef } from "react";
import { CircleX, Upload, Paperclip } from "lucide-react";
import { toast } from "sonner";

type OutputFormat = {
  name: string;
  size: number;
  type: string;
};

interface OutputFormatUploaderProps {
  outputFormat: OutputFormat | null;
  setOutputFormat: (format: OutputFormat | null) => void;
}

const OutputFormatUploader: FC<OutputFormatUploaderProps> = ({
  outputFormat,
  setOutputFormat
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handler for uploading output format template
  const handleOutputFormatUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setOutputFormat({
        name: file.name,
        size: file.size,
        type: file.type
      });
      toast.success(`Output format template "${file.name}" uploaded`);
    }
  };
  
  // Handler for removing output format template
  const handleRemoveOutputFormat = () => {
    setOutputFormat(null);
  };

  return (
    <div className="px-4 pt-2">
      <div className="text-xs text-muted-foreground mb-1">Output Format Template</div>
      {outputFormat ? (
        <div className="flex items-center gap-2 bg-muted p-2 rounded text-sm">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1">{outputFormat.name}</span>
          <button 
            onClick={handleRemoveOutputFormat}
            className="text-muted-foreground hover:text-destructive"
          >
            <CircleX className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div 
          className="border border-dashed rounded p-2 flex items-center justify-center gap-2 text-sm text-muted-foreground cursor-pointer hover:bg-muted/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          <span>Upload template (.docx, .md, .txt, .pdf)</span>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".docx,.md,.txt,.pdf"
            onChange={handleOutputFormatUpload}
          />
        </div>
      )}
    </div>
  );
};

export default OutputFormatUploader;
