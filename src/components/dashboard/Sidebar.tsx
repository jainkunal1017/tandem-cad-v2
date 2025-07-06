
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import UserSection from './UserSection';
import NavigationSection from './NavigationSection';
import FooterSection from './FooterSection';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({
  collapsed,
  onToggle
}: DashboardSidebarProps) => {
  const { user } = useAuth();

  // Fetch user profile data
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  // Get display name and avatar
  const displayName = profile?.username || profile?.first_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url;
  const avatarFallback = profile?.first_name?.[0] || profile?.username?.[0] || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div 
      className={cn(
        'transition-all duration-300 ease-in-out flex flex-col h-full bg-[#F4F4F5]',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <UserSection 
        collapsed={collapsed}
        onToggle={onToggle}
        displayName={displayName}
        avatarUrl={avatarUrl}
        avatarFallback={avatarFallback}
      />
      
      <NavigationSection collapsed={collapsed} />
      
      <FooterSection collapsed={collapsed} />
    </div>
  );
};

export default DashboardSidebar;
