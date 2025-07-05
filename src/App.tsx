
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProjectDashboard from "./pages/ProjectDashboard";
import PartsListPage from "./pages/PartsListPage";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import PasswordAuth from "./pages/PasswordAuth";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('tandem-auth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated on app load
    const authStatus = localStorage.getItem('tandem-auth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page as default route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<PasswordAuth />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            <Route element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<ProjectDashboard />} />
              <Route path="/projects/:projectId" element={<PartsListPage />} />
              {/* Placeholder routes for sidebar navigation */}
              <Route path="/shared" element={<div className="p-4">Shared with Me Page</div>} />
              <Route path="/activity" element={<div className="p-4">Recent Activity Page</div>} />
              <Route path="/approvals" element={<div className="p-4">Approvals Page</div>} />
              <Route path="/favorites" element={<div className="p-4">Favorites Page</div>} />
              <Route path="/archive" element={<div className="p-4">Archive Page</div>} />
              <Route path="/notifications" element={<div className="p-4">Notifications Page</div>} />
              <Route path="/settings" element={<div className="p-4">Settings Page</div>} />
              <Route path="/help" element={<div className="p-4">Help & Feedback Page</div>} />
            </Route>
            {/* Redirect /app to /dashboard */}
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
