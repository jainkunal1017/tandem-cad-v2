
import { Badge } from '@/components/ui/badge';
import { Clock, User, GitBranch } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const OverviewHeroCard = () => {
  const { user } = useAuth();

  // Fetch user profile data
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, full_name')
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

  // Mock data - in real app this would come from props or API
  const displayName = profile?.first_name || profile?.full_name || "there";
  const lastUpdated = "20 minutes ago";
  const updatedBy = "Manual Update";

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Text content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Good morning, {displayName}
          </h1>
          <p className="text-muted-foreground mb-6">
            Welcome back to your documentation portal
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Status and metadata */}
        <div className="flex-1 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              Live
            </Badge>
          </div>
          
          {/* Last updated info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last updated</span>
            <span className="font-medium">{lastUpdated}</span>
            <span>by</span>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="font-medium">{updatedBy}</span>
            </div>
          </div>

          {/* Domain info */}
          <div className="space-y-1">
            <div className="text-sm font-medium">Domain</div>
            <div className="text-sm text-muted-foreground">dreamslab.mintlify.app</div>
          </div>

          {/* Branch info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitBranch className="w-4 h-4" />
            <span>jainkuinal1017 / docs</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitBranch className="w-4 h-4" />
            <span>branch main</span>
          </div>
        </div>
        
        {/* Right side - Documentation preview */}
        <div className="lg:w-80">
          <div className="bg-muted rounded-lg p-4 h-48 flex items-center justify-center">
            <img 
              src="/lovable-uploads/8eb43b44-8979-42aa-8074-4ca324911423.png" 
              alt="Documentation site preview" 
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewHeroCard;
