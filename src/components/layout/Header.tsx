import React, { useState } from 'react';
import { Menu, Globe, Sun, Moon, User, LogOut, Settings, UserCircle, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import exampleImage from 'figma:asset/e6f7818f75e77b9056718824bb76014a875fccf0.png';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [hasNotifications, setHasNotifications] = useState(true);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-sidebar-border/50 h-16 px-6 flex items-center justify-between sticky top-0 z-40 shadow-lg shadow-primary/5">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-9 w-9"
          title="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-metallic-silver to-metallic-gray rounded-lg flex items-center justify-center shadow-lg border border-border">
            <img 
              src={exampleImage} 
              alt="VCOINCHECK Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="font-bold text-xl text-foreground">VCOINCHECK</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              EN
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>🇺🇸 EN</DropdownMenuItem>
            <DropdownMenuItem>🇯🇵 JP</DropdownMenuItem>
            <DropdownMenuItem>🇻🇳 VN</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Account Section */}
        {isAuthenticated ? (
          <>
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <Bell className="h-4 w-4" />
                  {hasNotifications && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-primary-foreground rounded-full"></div>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <div className="p-3 border-b border-border">
                  <h4 className="font-medium">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="p-3 flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm font-medium">New project review</span>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Your review on SundaeSwap has been published</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm font-medium">Community thread reply</span>
                      <span className="text-xs text-muted-foreground">4h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Someone replied to your thread about DeFi protocols</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm font-medium">Event reminder</span>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Cardano DeFi Summit starts tomorrow</p>
                  </DropdownMenuItem>
                </div>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link to="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}