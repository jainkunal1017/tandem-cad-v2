
import { 
  LayoutDashboard, 
  Edit3, 
  Settings,
  Book,
  Users,
  LifeBuoy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const mainNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/editor', icon: Edit3, label: 'Editor' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const footerItems = [
    { to: '/documentation', icon: Book, label: 'Documentation' },
    { to: '/invite', icon: Users, label: 'Invite Members' },
    { to: '/support', icon: LifeBuoy, label: 'Support' },
  ];

  const NavLink = ({ to, icon: Icon, label, isFooter = false }: { 
    to: string; 
    icon: any; 
    label: string; 
    isFooter?: boolean;
  }) => {
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
          collapsed ? 'justify-center' : 'w-full',
          isFooter && 'text-sm'
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  return (
    <div 
      className={cn(
        'bg-sidebar transition-all duration-300 ease-in-out flex flex-col h-full',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {collapsed ? (
          <img 
            src="/lovable-uploads/1b27103c-6057-451b-8485-9e865676ad9e.png" 
            alt="Tandem Symbol" 
            className="h-8 w-8"
          />
        ) : (
          <img 
            src="/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png" 
            alt="Tandem Logo" 
            className="h-8"
          />
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col space-y-1 px-2 py-4 flex-1">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
      
      {/* Footer Navigation */}
      <div className="px-2 py-4 space-y-1">
        {footerItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isFooter={true}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
