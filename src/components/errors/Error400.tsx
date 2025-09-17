import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export function Error400() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div>
            <CardTitle className="text-6xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              400
            </CardTitle>
            <CardTitle className="text-2xl font-bold mb-2">
              Bad Request
            </CardTitle>
            <CardDescription>
              The server cannot process your request due to invalid syntax or missing parameters.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>This error typically occurs when:</p>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>Required parameters are missing</li>
              <li>Data format is incorrect</li>
              <li>Request syntax is malformed</li>
              <li>Invalid characters in the URL</li>
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