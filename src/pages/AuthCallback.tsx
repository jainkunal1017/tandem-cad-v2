
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        if (data.session?.user) {
          // Check if user is in beta allowlist
          const { data: isAllowed, error: rpcError } = await supabase.rpc('is_user_allowed', { 
            user_email: data.session.user.email 
          });

          if (rpcError) {
            console.error('Error checking beta allowlist:', rpcError);
            navigate('/waitlist-confirmation');
            return;
          }

          if (isAllowed) {
            toast({
              title: "Welcome to Tandem!",
              description: "Authentication successful",
            });
            navigate('/dashboard');
          } else {
            // Auto-add to waitlist if not already there
            try {
              await supabase.from('waitlist').upsert([
                {
                  email: data.session.user.email,
                  first_name: data.session.user.user_metadata?.full_name?.split(' ')[0] || '',
                  last_name: data.session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
                }
              ], { onConflict: 'email' });
            } catch (waitlistError) {
              console.error('Error adding to waitlist:', waitlistError);
            }
            
            navigate('/waitlist-confirmation');
          }
        } else {
          navigate('/auth');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}
