
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { ExternalLink, LogOut } from "lucide-react";

export default function WaitlistConfirmation() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const handleFollowTwitter = () => {
    window.open('https://twitter.com/tandemhq', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <Card className="text-center">
          <CardHeader>
            <img 
              src="/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png" 
              alt="Tandem Logo" 
              className="h-12 w-auto mx-auto mb-4" 
            />
            <div className="text-4xl mb-2">🛠️</div>
            <h1 className="text-2xl font-bold">You're on the list!</h1>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Thanks for signing up. We'll email you as soon as our beta opens.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleFollowTwitter}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Follow us on X for updates
              </Button>
              
              <Button 
                onClick={handleLogout}
                variant="ghost"
                className="w-full"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
