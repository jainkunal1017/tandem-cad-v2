
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';

const OverviewHeroCard = () => {
  // Mock data - in real app this would come from props or API
  const workspaceName = "DREAMS Lab";
  const lastUpdated = "20 minutes ago";
  const updatedBy = "Manual Update";

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Text content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Good morning, {workspaceName}
            </h1>
            <p className="text-muted-foreground mb-6">
              Welcome back to your documentation portal
            </p>
            
            {/* Status and metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  Live
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Last updated {lastUpdated}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>by {updatedBy}</span>
              </div>
            </div>

            {/* Domain info */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm">
                <div className="font-medium">Domain</div>
                <div className="text-muted-foreground">dreamslab.mintlify.app</div>
              </div>
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
      </CardContent>
    </Card>
  );
};

export default OverviewHeroCard;
