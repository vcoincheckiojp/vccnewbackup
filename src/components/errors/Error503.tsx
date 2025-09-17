import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Wrench, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export function Error503() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
              <Wrench className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div>
            <CardTitle className="text-6xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              503
            </CardTitle>
            <CardTitle className="text-2xl font-bold mb-2">
              Service Unavailable
            </CardTitle>
            <CardDescription>
              Our service is temporarily unavailable due to maintenance or high traffic.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>This usually means:</p>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>Scheduled maintenance is in progress</li>
              <li>High traffic is affecting our servers</li>
              <li>Temporary technical difficulties</li>
              <li>Service will be restored shortly</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm">
              <strong>Estimated restoration:</strong> 15-30 minutes
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleRefresh} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Check Again
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