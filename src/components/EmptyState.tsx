
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  buttonText?: string;
  onAction?: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({
  message = "No projects found",
  buttonText = "Create New Project",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-muted/50 p-6 rounded-full mb-4">
        <FileIcon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="mt-2 text-lg font-medium text-foreground">{message}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">
        Try adjusting your search or filter criteria to find what you're looking for.
      </p>
      <Button className="mt-4" onClick={onAction}>
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyState;
