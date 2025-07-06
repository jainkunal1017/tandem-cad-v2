
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setCheckingAccess(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_user_allowed', { 
          user_email: user.email 
        });

        if (error) {
          console.error('Error checking beta allowlist:', error);
          setIsAllowed(false);
        } else {
          setIsAllowed(data);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setIsAllowed(false);
      } finally {
        setCheckingAccess(false);
      }
    };

    checkAccess();
  }, [user]);

  // Show loading spinner while checking auth
  if (loading || checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to waitlist if not allowed
  if (isAllowed === false) {
    return <Navigate to="/waitlist-confirmation" replace />;
  }

  // Render children if authenticated and allowed
  return <>{children}</>;
}
