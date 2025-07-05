
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import DashboardTopBar from '@/components/dashboard/TopBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(
    JSON.parse(localStorage.getItem("dashboardSidebarCollapsed") ?? "false")
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setCollapsed(!collapsed);
      localStorage.setItem("dashboardSidebarCollapsed", JSON.stringify(!collapsed));
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <DashboardSidebar collapsed={collapsed} onToggle={toggleSidebar} />
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <DashboardSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          
          {/* Mobile Menu Button */}
          <div className="fixed top-4 left-4 z-50 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="bg-background border-border"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardTopBar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
