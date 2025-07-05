
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface FilterBarProps {
  statusFilters: {
    active: boolean;
    paused: boolean;
    archived: boolean;
    review?: boolean;
  };
  sortConfig: {
    key: 'updatedAt' | 'title' | 'difCount';
    direction: 'asc' | 'desc';
  };
  onToggleStatus: (status: 'active' | 'paused' | 'archived' | 'review') => void;
  onSortChange: (key: 'updatedAt' | 'title' | 'difCount') => void;
}

const FilterBar: FC<FilterBarProps> = ({
  statusFilters,
  sortConfig,
  onToggleStatus,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Status:</span>
        <Badge
          variant={statusFilters.active ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onToggleStatus('active')}
        >
          Active
        </Badge>
        <Badge
          variant={statusFilters.paused ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onToggleStatus('paused')}
        >
          Paused
        </Badge>
        <Badge
          variant={statusFilters.archived ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onToggleStatus('archived')}
        >
          Archived
        </Badge>
        {statusFilters.review !== undefined && (
          <Badge
            variant={statusFilters.review ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onToggleStatus('review')}
          >
            Review
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Button
          variant="ghost"
          size="sm"
          className={sortConfig.key === 'updatedAt' ? 'font-medium' : ''}
          onClick={() => onSortChange('updatedAt')}
        >
          Date
          {sortConfig.key === 'updatedAt' && (
            sortConfig.direction === 'desc' ? 
            <ArrowDown className="ml-1 h-3 w-3" /> : 
            <ArrowUp className="ml-1 h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={sortConfig.key === 'title' ? 'font-medium' : ''}
          onClick={() => onSortChange('title')}
        >
          Name
          {sortConfig.key === 'title' && (
            sortConfig.direction === 'desc' ? 
            <ArrowDown className="ml-1 h-3 w-3" /> : 
            <ArrowUp className="ml-1 h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={sortConfig.key === 'difCount' ? 'font-medium' : ''}
          onClick={() => onSortChange('difCount')}
        >
          DIFs
          {sortConfig.key === 'difCount' && (
            sortConfig.direction === 'desc' ? 
            <ArrowDown className="ml-1 h-3 w-3" /> : 
            <ArrowUp className="ml-1 h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
