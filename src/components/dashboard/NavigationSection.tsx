
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Edit3, Settings } from 'lucide-react';

interface NavigationSectionProps {
  collapsed: boolean;
}

const NavigationSection = ({ collapsed }: NavigationSectionProps) => {
  const location = useLocation();

  const mainNavItems = [{
    to: '/dashboard',
    icon: LayoutDashboard,
    label: 'Overview'
  }, {
    to: '/editor',
    icon: Edit3,
    label: 'Doc Studio'
  }, {
    to: '/settings',
    icon: Settings,
    label: 'Settings'
  }];

  const NavLink = ({
    to,
    icon: Icon,
    label
  }: {
    to: string;
    icon: any;
    label: string;
  }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={cn(
          'group relative flex items-center gap-x-3 px-3 py-2 rounded-md font-medium transition-all',
          'hover:bg-accent hover:text-accent-foreground',
          isActive ? 'bg-accent/80 text-accent-foreground' : 'text-muted-foreground',
          collapsed ? 'justify-center px-2' : 'w-full'
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  return (
    <nav className={cn("flex flex-col space-y-1 py-2 flex-1 overflow-y-auto", collapsed ? "px-1" : "px-2")}>
      {mainNavItems.map(item => (
        <NavLink key={item.to} to={item.to} icon={item.icon} label={item.label} />
      ))}
    </nav>
  );
};

export default NavigationSection;
