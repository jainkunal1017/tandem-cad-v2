
import { FC, useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

interface TopBarProps {
  onSearch: (term: string) => void;
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  extraContent?: ReactNode;
  showTitle?: boolean;
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ 
  onSearch, 
  title = "Vault",
  buttonText = "New Project",
  onButtonClick,
  extraContent,
  showTitle = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search input when pressing / key outside of an input field
      if (
        e.key === '/' && 
        document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };
  
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };
  
  return (
    <div className={`flex flex-col gap-4 w-full mb-6 ${className}`}>
      {/* Main top bar row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/1b27103c-6057-451b-8485-9e865676ad9e.png" 
            alt="Tandem Symbol" 
            className="h-8 w-8 md:h-10 md:w-10" 
          />
          {showTitle && <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">{title}</h1>}
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto md:mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              id="search-input"
              type="text" 
              placeholder="Search (Press '/' to focus)" 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Actions area */}
        <div className="flex gap-2 items-center">
          {/* Mobile search toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden" 
            onClick={toggleMobileSearch}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Keep extra content if not mobile or conditionally show based on importance */}
          {!isMobile && extraContent}
          
          <DarkModeToggle />
          
          {/* Responsive button that collapses to icon only on smaller screens */}
          <Button 
            onClick={handleButtonClick}
            className="hidden sm:flex"
          >
            {buttonText}
          </Button>
          <Button 
            onClick={handleButtonClick}
            size="icon"
            className="sm:hidden"
            title={buttonText}
          >
            <span className="sr-only">{buttonText}</span>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile search - conditionally rendered */}
      {showMobileSearch && (
        <div className="w-full md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search" 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
