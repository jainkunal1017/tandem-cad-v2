
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface ModalFooterProps {
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ModalFooter = ({ onClose, onSubmit, isSubmitting }: ModalFooterProps) => {
  return (
    <DialogFooter className="p-6 pt-4 border-t mt-auto flex-shrink-0 gap-3">
      <Button 
        variant="outline" 
        type="button" 
        onClick={onClose} 
        disabled={isSubmitting} 
        className="min-w-[100px]"
      >
        Cancel
      </Button>
      <Button 
        type="button" 
        onClick={onSubmit} 
        disabled={isSubmitting} 
        className="min-w-[100px]"
      >
        {isSubmitting ? "Creating..." : "Create"}
      </Button>
    </DialogFooter>
  );
};

export default ModalFooter;
