import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/Sidebar';
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
  const location = useLocation();

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

  // Check if current route is DocStudio to remove outer padding/wrapper
  const isDocStudioRoute = location.pathname === '/studio';

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F4F4F5' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <DashboardSidebar collapsed={collapsed} onToggle={toggleSidebar} />
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64 bg-sidebar">
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
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {isDocStudioRoute ? (
          // Doc Studio gets direct viewport access without wrapper padding
          <main className="flex-1 min-h-0 overflow-hidden">
            <Outlet />
          </main>
        ) : (
          // Other routes get the card wrapper with independent scrolling
          <div className="flex-1 p-3 min-h-0 overflow-hidden">
            <div className="bg-background border-2 rounded-2xl h-full overflow-hidden flex flex-col" style={{ borderColor: '#F2F2F3' }}>
              <main className="flex-1 p-8 overflow-auto">
                <Outlet />
              </main>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
