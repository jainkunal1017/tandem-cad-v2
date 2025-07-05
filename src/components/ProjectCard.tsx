
import { FC, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { FileIcon, Clock, ChevronRight, Share } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AvatarStack from './AvatarStack';
import ShareModal from './ShareModal';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface Part {
  partNumber: string;
  title: string;
  updatedAt: string;
  difCount: number;
  status: string;
  lastEditedBy?: Collaborator;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'archived';
  owner: string;
  parts: Part[];
  collaborators: Collaborator[];
}

const statusColors = {
  active: 'bg-green-500',
  paused: 'bg-amber-500',
  archived: 'bg-gray-500',
  review: 'bg-blue-500'
};

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  title,
  description,
  updatedAt,
  status,
  owner,
  parts,
  collaborators,
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const formattedDate = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
  const navigate = useNavigate();
  const totalDifCount = parts.reduce((sum, part) => sum + part.difCount, 0);
  
  const handleOpenClick = () => {
    navigate(`/projects/${id}`);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent project navigation when clicking share
    setShareModalOpen(true);
  };

  const handleAddCollaborator = (email: string) => {
    console.log(`Adding collaborator with email: ${email}`);
    // This would call an API in a real app
  };

  const handleRemoveCollaborator = (id: string) => {
    console.log(`Removing collaborator with id: ${id}`);
    // This would call an API in a real app
  };

  // Create a preview of the first two parts plus a count of additional parts
  const partPreview = () => {
    if (parts.length === 0) return "No parts";
    
    if (parts.length === 1) {
      return parts[0].partNumber;
    }
    
    if (parts.length === 2) {
      return `${parts[0].partNumber} • ${parts[1].partNumber}`;
    }
    
    return `${parts[0].partNumber} • ${parts[1].partNumber} +${parts.length - 2}`;
  };
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer"
      onClick={handleOpenClick}
    >
      <div className={`h-1 w-full ${statusColors[status as keyof typeof statusColors]}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant={status === 'active' ? 'default' : 'outline'} className="capitalize">
                {status}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-48">
              <p className="text-sm">
                Project is <span className="font-medium">{status}</span>
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{partPreview()}</p>
        <div className="flex justify-between items-center mt-4">
          <AvatarStack collaborators={collaborators} />
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleShareClick}
          >
            <Share className="h-4 w-4 mr-1" /> Share
          </Button>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground border-t">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-1">
            <FileIcon className="h-3 w-3" />
            <span>{parts.length} Parts, {totalDifCount} DIFs</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated {formattedDate}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 p-0" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent double navigation
                handleOpenClick();
              }}
            >
              Open <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardFooter>

      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        projectTitle={title}
        collaborators={collaborators}
        onAddCollaborator={handleAddCollaborator}
        onRemoveCollaborator={handleRemoveCollaborator}
      />
    </Card>
  );
};

export default ProjectCard;
