import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export function Error404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <CardTitle className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              404
            </CardTitle>
            <CardTitle className="text-2xl font-bold mb-2">
              Page Not Found
            </CardTitle>
            <CardDescription>
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Here are some helpful links instead:</p>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>Check the URL for typos</li>
              <li>Use the navigation menu</li>
              <li>Return to the homepage</li>
              <li>Search for what you need</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/dashboard" className="w-full">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full"
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}