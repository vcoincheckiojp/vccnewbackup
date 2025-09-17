import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  TrendingUp, 
  Library,
  Users,
  Calendar,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Newspaper
} from 'lucide-react';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  {
    title: 'Home',
    href: '/home',
    icon: Home,
    badge: null
  },
  {
    title: 'News',
    href: '/news',
    icon: Newspaper,
    badge: null
  },
  {
    title: 'Project',
    href: '/project',
    icon: FolderOpen,
    children: [
      { title: 'Project list', href: '/project' },
      { title: 'Submit project', href: '/project/submit' },
    ]
  },
  {
    title: 'Market Info',
    href: '/market-info',
    icon: TrendingUp,
    badge: null
  },
  {
    title: 'Library',
    href: '/library',
    icon: Library,
    children: [
      { title: 'Library overview', href: '/library/overview' },
      { title: 'Dictionary', href: '/library/dictionary' },
      { title: 'Cardano knowledge', href: '/library/cardano-knowledge' },
      { title: 'Blockchain knowledge', href: '/library/blockchain-knowledge' },
      { title: 'Catalyst knowledge', href: '/library/catalyst-knowledge' },
    ]
  },
  {
    title: 'Community',
    href: '/community',
    icon: Users,
    badge: null
  },
  {
    title: 'Events',
    href: '/events',
    icon: Calendar,
    badge: null
  }
];

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['/library', '/project']);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const isExpanded = (href: string) => {
    return expandedItems.includes(href);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar/80 backdrop-blur-md border-r border-sidebar-border/50 transition-all duration-300 z-30 shadow-lg shadow-primary/5",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 h-full overflow-y-auto">
        {/* Collapse Toggle Button */}
        <div className="mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 hover:bg-sidebar-accent"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive(item.href) ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded(item.href) ? "rotate-90" : ""
                        )} />
                      </>
                    )}
                  </button>
                  {!collapsed && isExpanded(item.href) && item.children && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className={({ isActive }) => cn(
                            "block px-3 py-2 rounded-lg transition-colors text-sm",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
                          )}
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="flex-1">{item.title}</span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}