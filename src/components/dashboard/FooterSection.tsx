
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Book, Users, LifeBuoy, User, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FooterSectionProps {
  collapsed: boolean;
}

const FooterSection = ({ collapsed }: FooterSectionProps) => {
  const navigate = useNavigate();

  const footerItems = [{
    to: '/documentation',
    icon: Book,
    label: 'Documentation'
  }, {
    to: '/invite',
    icon: Users,
    label: 'Invite Members'
  }, {
    to: '/support',
    icon: LifeBuoy,
    label: 'Support'
  }];

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('tandem-auth');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const FooterNavLink = ({
    to,
    icon: Icon,
    label
  }: {
    to: string;
    icon: any;
    label: string;
  }) => {
    return (
      <Link
        to={to}
        className={cn(
          'group relative flex items-center gap-x-3 px-3 py-2 rounded-md font-medium transition-all text-sm',
          'hover:bg-accent hover:text-accent-foreground text-muted-foreground',
          collapsed ? 'justify-center px-2' : 'w-full'
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  return (
    <div className={cn("py-4 space-y-1 flex-shrink-0 border-t border-border/40", collapsed ? "px-1" : "px-2")}>
      {footerItems.map(item => (
        <FooterNavLink key={item.to} to={item.to} icon={item.icon} label={item.label} />
      ))}
      
      {/* Profile Button */}
      {collapsed ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/profile')}
          className="h-10 w-10 text-muted-foreground hover:text-accent-foreground hover:bg-accent/50"
        >
          <User className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => navigate('/profile')}
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground hover:bg-accent/50 px-3 py-2 h-auto font-medium text-sm"
        >
          <User className="h-5 w-5 shrink-0 mr-3" />
          <span className="truncate">Profile</span>
        </Button>
      )}
      
      {/* Logout Button */}
      {collapsed ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="h-10 w-10 text-muted-foreground hover:text-accent-foreground hover:bg-accent/50"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground hover:bg-accent/50 px-3 py-2 h-auto font-medium text-sm"
        >
          <LogOut className="h-5 w-5 shrink-0 mr-3" />
          <span className="truncate">Log out</span>
        </Button>
      )}
    </div>
  );
};

export default FooterSection;
