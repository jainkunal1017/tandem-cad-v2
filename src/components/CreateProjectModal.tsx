
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createProject } from "@/lib/projectActions";

interface CreateProjectModalProps {
  onClose: () => void;
}

const CreateProjectModal = ({ onClose }: CreateProjectModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Project title is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newProject = await createProject(title.trim(), description.trim());
      toast.success("Project created successfully");
      onClose();
      navigate(`/projects/${newProject.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create a new project</DialogTitle>
        <DialogDescription>
          Enter details for your new project
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-right">
            Project title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-right">
            Short description (optional)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your project"
            className="min-h-[100px]"
          />
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateProjectModal;
