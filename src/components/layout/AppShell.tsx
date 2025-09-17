import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { PageTitle } from './PageTitle';
import { SettingsPanel } from './SettingsPanel';
import { ScrollToTop } from './ScrollToTop';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen">
      <Header 
        onToggleSidebar={handleToggleSidebar}
        onOpenSettings={() => setSettingsPanelOpen(true)}
      />
      
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          {/* Main content area with glass effect */}
          <div className="min-h-[calc(100vh-4rem)] backdrop-blur-sm">
            <div className="p-6">
              <PageTitle />
              {children}
            </div>
            <Footer />
          </div>
        </main>
      </div>
      
      <SettingsPanel 
        open={settingsPanelOpen} 
        onClose={() => setSettingsPanelOpen(false)} 
      />
      
      <ScrollToTop />
    </div>
  );
}