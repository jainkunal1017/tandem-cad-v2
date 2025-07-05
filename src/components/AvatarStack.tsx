
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface AvatarStackProps {
  collaborators: Collaborator[];
  limit?: number;
  size?: 'sm' | 'md';
}

const AvatarStack: FC<AvatarStackProps> = ({ collaborators = [], limit = 3, size = 'md' }) => {
  // Ensure collaborators is always an array, even if undefined is passed
  const safeCollaborators = Array.isArray(collaborators) ? collaborators : [];
  const displayCollaborators = safeCollaborators.slice(0, limit);
  const remaining = safeCollaborators.length - limit;
  
  const avatarSize = size === 'sm' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm';
  const stackOffset = size === 'sm' ? '-ml-2' : '-ml-3';
  
  return (
    <div className="flex items-center">
      <div className="flex">
        {displayCollaborators.map((collaborator, index) => (
          <Tooltip key={collaborator.id}>
            <TooltipTrigger asChild>
              <Avatar 
                className={`${avatarSize} border-2 border-background ${index > 0 ? stackOffset : ''}`}
              >
                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{collaborator.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {remaining > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={`${avatarSize} ${stackOffset} rounded-full bg-muted flex items-center justify-center border-2 border-background text-muted-foreground font-medium`}
              >
                +{remaining}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{remaining} more collaborator{remaining > 1 ? 's' : ''}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default AvatarStack;
