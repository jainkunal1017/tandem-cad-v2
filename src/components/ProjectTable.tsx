
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileIcon, ChevronRight } from 'lucide-react';
import AvatarStack from './AvatarStack';

interface Part {
  partNumber: string;
  title: string;
  updatedAt: string;
  difCount: number;
  status: string;
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'archived';
  owner: string;
  parts: Part[];
  collaborators: Collaborator[];
}

interface ProjectTableProps {
  projects: Project[];
}

const statusColorMap = {
  active: 'bg-green-500',
  paused: 'bg-amber-500',
  archived: 'bg-gray-500'
};

const ProjectTable = ({
  projects
}: ProjectTableProps) => {
  const navigate = useNavigate();
  const handleOpenClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  // Create a preview of the first two parts plus a count of additional parts
  const renderPartPreview = (parts: Part[]) => {
    if (parts.length === 0) return "No parts";
    if (parts.length === 1) {
      return parts[0].partNumber;
    }
    if (parts.length === 2) {
      return `${parts[0].partNumber} • ${parts[1].partNumber}`;
    }
    return `${parts[0].partNumber} • ${parts[1].partNumber} +${parts.length - 2}`;
  };
  
  return <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Projects</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Parts</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(project => {
          const formattedDate = formatDistanceToNow(new Date(project.updatedAt), {
            addSuffix: true
          });
          const totalDifCount = project.parts.reduce((sum, part) => sum + part.difCount, 0);
          return <TableRow 
                key={project.id} 
                className="cursor-pointer" 
                onClick={() => handleOpenClick(project.id)}
              >
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={project.status === 'active' ? 'default' : 'outline'} className="capitalize">
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FileIcon className="h-3 w-3" />
                    <span>{project.parts.length} Parts, {totalDifCount} DIFs</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {renderPartPreview(project.parts)}
                  </div>
                </TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <AvatarStack collaborators={project.collaborators} />
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent double navigation
                      handleOpenClick(project.id);
                    }} 
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>;
        })}
        </TableBody>
      </Table>
    </div>;
};

export default ProjectTable;
