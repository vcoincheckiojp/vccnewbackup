import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export function Error500() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertOctagon className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div>
            <CardTitle className="text-6xl font-bold text-red-600 dark:text-red-400 mb-2">
              500
            </CardTitle>
            <CardTitle className="text-2xl font-bold mb-2">
              Internal Server Error
            </CardTitle>
            <CardDescription>
              Something went wrong on our end. We're working to fix this issue.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>What you can do:</p>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>Try refreshing the page</li>
              <li>Wait a few minutes and try again</li>
              <li>Contact support if the problem persists</li>
              <li>Check our status page for updates</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleRefresh} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link to="/dashboard" className="w-full">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}