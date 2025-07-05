
import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { FileIcon, Clock, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface PartCardProps {
  partNumber: string;
  title: string;
  updatedAt: string;
  difCount: number;
  status: string;
  lastEditedBy?: Collaborator;
  onOpenClick: (partNumber: string) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  paused: 'bg-amber-500',
  archived: 'bg-gray-500',
  review: 'bg-blue-500'
};

const PartCard: FC<PartCardProps> = ({
  partNumber,
  title,
  updatedAt,
  difCount,
  status,
  lastEditedBy,
  onOpenClick
}) => {
  const formattedDate = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <div className={`h-1 w-full ${statusColors[status.toLowerCase()] || 'bg-gray-500'}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-muted-foreground mb-1">{partNumber}</div>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {lastEditedBy && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={lastEditedBy.avatar} alt={lastEditedBy.name} />
                    <AvatarFallback>{lastEditedBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last edited by {lastEditedBy.name}</p>
                </TooltipContent>
              </Tooltip>
            )}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant={status.toLowerCase() === 'active' ? 'default' : 'outline'} className="capitalize">
                  {status}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-48">
                <p className="text-sm">
                  Part is in <span className="font-medium">{status}</span> status
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="pt-2 text-xs text-muted-foreground border-t mt-4">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-1">
            <FileIcon className="h-3 w-3" />
            <span>{difCount} DIFs</span>
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
              onClick={() => onOpenClick(partNumber)}
            >
              Open <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PartCard;
