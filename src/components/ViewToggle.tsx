
import { useState, useEffect } from 'react';
import { Grid2x2, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ViewToggleProps {
  onChange: (viewMode: 'grid' | 'list') => void;
  defaultValue?: 'grid' | 'list';
}

const ViewToggle = ({ onChange, defaultValue = 'grid' }: ViewToggleProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    const savedView = localStorage.getItem('tandemView');
    return (savedView === 'grid' || savedView === 'list') ? savedView : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem('tandemView', viewMode);
  }, [viewMode]);

  const handleViewChange = (value: string) => {
    if (value === 'grid' || value === 'list') {
      setViewMode(value);
      onChange(value);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={handleViewChange}
      className="border rounded-md"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem 
            value="grid" 
            aria-label="Grid view"
            className={viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}
          >
            <Grid2x2 className="h-4 w-4" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>Grid view</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem 
            value="list" 
            aria-label="List view"
            className={viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}
          >
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>List view</TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
};

export default ViewToggle;
