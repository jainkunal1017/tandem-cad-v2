
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProjectDashboard from "./pages/ProjectDashboard";
import PartsListPage from "./pages/PartsListPage";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import WaitlistConfirmation from "./pages/WaitlistConfirmation";
import Overview from "./pages/Overview";
import DocStudio from "./pages/DocStudio";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/waitlist-confirmation" element={<WaitlistConfirmation />} />
            
            {/* Protected Dashboard Layout */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/editor" element={<DocStudio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
              <Route path="/documentation" element={<div className="p-6">Documentation Page (Coming Soon)</div>} />
              <Route path="/invite" element={<div className="p-6">Invite Members Page (Coming Soon)</div>} />
              <Route path="/support" element={<div className="p-6">Support Page (Coming Soon)</div>} />
            </Route>
            
            {/* Protected Legacy routes - keeping for backward compatibility */}
            <Route element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/legacy-dashboard" element={<ProjectDashboard />} />
              <Route path="/projects/:projectId" element={<PartsListPage />} />
              <Route path="/shared" element={<div className="p-4">Shared with Me Page</div>} />
              <Route path="/activity" element={<div className="p-4">Recent Activity Page</div>} />
              <Route path="/approvals" element={<div className="p-4">Approvals Page</div>} />
              <Route path="/favorites" element={<div className="p-4">Favorites Page</div>} />
              <Route path="/archive" element={<div className="p-4">Archive Page</div>} />
              <Route path="/notifications" element={<div className="p-4">Notifications Page</div>} />
              <Route path="/help" element={<div className="p-4">Help & Feedback Page</div>} />
            </Route>
            
            {/* Redirect legacy routes */}
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            
            {/* Catch all - redirect to landing or 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
