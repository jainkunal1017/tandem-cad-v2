import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, FileIcon, FileText } from 'lucide-react';
import AvatarStack from './AvatarStack';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface DIF {
  id: string;
  title: string;
  createdAt: string;
  collaborators: Collaborator[];
}

interface Part {
  partNumber: string;
  title: string;
  updatedAt: string;
  difCount: number;
  status: string;
  lastEditedBy?: Collaborator;
  difs?: DIF[];
}

interface ExpandablePartListProps {
  parts: Part[];
  onOpenClick: (partNumber: string) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  paused: 'bg-amber-500',
  archived: 'bg-gray-500',
  review: 'bg-blue-500'
};

const ExpandablePartList = ({ parts, onOpenClick }: ExpandablePartListProps) => {
  const [expandedParts, setExpandedParts] = useState<string[]>([]);

  const togglePart = (partNumber: string) => {
    setExpandedParts(prev => 
      prev.includes(partNumber)
        ? prev.filter(p => p !== partNumber)
        : [...prev, partNumber]
    );
  };

  return (
    <Accordion type="multiple" value={expandedParts} onValueChange={setExpandedParts}>
      {parts.map(part => (
        <AccordionItem key={part.partNumber} value={part.partNumber} className="bg-white rounded-lg mb-4 overflow-hidden shadow border">
          <div className={`h-1 w-full ${statusColors[part.status.toLowerCase()] || 'bg-gray-500'}`} />
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex flex-1 justify-between items-center">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium">{part.title}</h3>
                  <p className="text-sm text-muted-foreground">{part.partNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <FileIcon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{part.difCount} DIFs</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(part.updatedAt), { addSuffix: true })}
                  </span>
                </div>
                
                <Badge variant={part.status.toLowerCase() === 'active' ? 'default' : 'outline'} className="capitalize">
                  {part.status}
                </Badge>
                
                {part.lastEditedBy && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={part.lastEditedBy.avatar} alt={part.lastEditedBy.name} />
                        <AvatarFallback>{part.lastEditedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Last edited by {part.lastEditedBy.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-4 pb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Design-Intent Files</h4>
              {part.difs && part.difs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {part.difs.map(dif => (
                    <div
                      key={dif.id}
                      className="bg-white p-3 rounded border cursor-pointer hover:shadow transition-shadow"
                      onClick={() => console.log(`Opening DIF: ${dif.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h5 className="font-medium text-sm">{dif.title}</h5>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">DOC</span>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(dif.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <AvatarStack collaborators={dif.collaborators} size="sm" limit={2} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No Design-Intent Files available</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ExpandablePartList;
