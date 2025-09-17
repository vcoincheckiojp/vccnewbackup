import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/sales': 'Sales Analytics',
  '/dashboard/products': 'Products',
  '/dashboard/charts': 'Charts',
  '/dashboard/charts/bar': 'Bar Charts',
  '/dashboard/charts/line': 'Line Charts',
  '/dashboard/charts/pie': 'Pie Charts',
  '/dashboard/charts/realtime': 'Realtime Charts',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/realtime': 'Real-time Data',
  '/dashboard/community': 'Community',
  '/dashboard/settings': 'Settings'
};

export function PageTitle() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentTitle = routeTitles[currentPath] || 'Dashboard';

  // Generate breadcrumb items
  const pathSegments = currentPath.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const title = routeTitles[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
    return { path, title };
  });

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{currentTitle}</h1>
          
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {breadcrumbItems.slice(1).map((item, index) => (
                <React.Fragment key={item.path}>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 2 ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}