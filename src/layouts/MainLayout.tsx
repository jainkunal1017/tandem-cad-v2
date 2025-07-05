
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(
    JSON.parse(localStorage.getItem("sidebarCollapsed") ?? "false")
  );

  const location = useLocation();
  
  // We don't want the TopBar to appear on any routes that have their own search functionality
  const hideTopBar = ['/dashboard', '/projects'].some(path => 
    location.pathname.startsWith(path)
  );

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(!collapsed));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {!hideTopBar && <TopBar onSearch={() => {}} />}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
