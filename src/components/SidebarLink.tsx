
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  badgeCount?: number;
}

const SidebarLink = ({ to, icon: Icon, label, collapsed, badgeCount }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'group relative flex items-center gap-x-3 px-3 py-2 rounded-md font-medium transition-all',
        'hover:bg-accent hover:text-accent-foreground',
        isActive 
          ? 'bg-accent/80 text-accent-foreground' 
          : 'text-muted-foreground',
        collapsed ? 'justify-center' : 'w-full'
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      
      {!collapsed && <span className="truncate">{label}</span>}
      
      {badgeCount !== undefined && badgeCount > 0 && (
        <Badge 
          className={cn(
            'ml-auto bg-primary text-primary-foreground',
            collapsed && 'absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0'
          )} 
          variant="default"
        >
          {badgeCount}
        </Badge>
      )}
    </Link>
  );
};

export default SidebarLink;
