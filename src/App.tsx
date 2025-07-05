import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Index from './pages/Index';
import Overview from './pages/Overview';
import DocStudio from './pages/DocStudio';
import LandingPage from './pages/LandingPage';
import PartsListPage from './pages/PartsListPage';
import ProjectDashboard from './pages/ProjectDashboard';
import PasswordAuth from './pages/PasswordAuth';
import NotFound from './pages/NotFound';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Router>
            <Routes>
              {/* Landing and Auth Routes */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/auth" element={<PasswordAuth />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
              </Route>
              
              <Route path="/editor" element={<DashboardLayout />}>
                <Route index element={<DocStudio />} />
              </Route>
              
              {/* Main Layout Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="parts" element={<PartsListPage />} />
                <Route path="project/:id" element={<ProjectDashboard />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
