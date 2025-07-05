
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Wrench, GitBranch, Settings, RefreshCw } from 'lucide-react';

const ActivityTable = () => {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'Manual Update',
      description: 'Updated design documentation for Project Alpha',
      timestamp: 'Jul 5, 9:18 AM',
      status: 'Successful',
      icon: RefreshCw,
      changes: 'Updated 3 sections, added 2 diagrams'
    },
    {
      id: 2,
      type: 'Design Intent Doc',
      description: 'Generated design intent documentation from CAD analysis',
      timestamp: 'Jul 4, 2:45 PM',
      status: 'Successful',
      icon: FileText,
      changes: 'Created new document with 12 design decisions'
    },
    {
      id: 3,
      type: 'Technical Requirements',
      description: 'Auto-generated technical specifications update',
      timestamp: 'Jul 4, 11:30 AM',
      status: 'Successful',
      icon: Settings,
      changes: 'Updated requirements matrix, 5 new specs'
    },
    {
      id: 4,
      type: 'Part Diff Analysis',
      description: 'Compared Part_V2.1 with Part_V2.0 changes',
      timestamp: 'Jul 3, 4:22 PM',
      status: 'Successful',
      icon: GitBranch,
      changes: 'Detected 8 geometry changes, 3 material updates'
    },
    {
      id: 5,
      type: 'CAD Integration',
      description: 'Synchronized with SolidWorks macro data',
      timestamp: 'Jul 3, 10:15 AM',
      status: 'Successful',
      icon: Wrench,
      changes: 'Processed 15 design sessions, 42 actions'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Activity history</h2>
        <p className="text-sm text-muted-foreground">
          Showing history of updates made on your docs
        </p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Activity</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead>Changes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{activity.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {activity.changes}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityTable;
