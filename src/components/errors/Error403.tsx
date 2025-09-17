import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export function Error403() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 bg-destructive/10 rounded-full w-fit">
            <Shield className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Forbidden</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-6xl font-bold text-muted-foreground">403</p>
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-muted-foreground">
              This page requires special privileges. Please contact an administrator if you believe this is an error.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link to="/library/overview" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Library
              </Button>
            </Link>
            <Link to="/home" className="w-full">
              <Button className="w-full gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}