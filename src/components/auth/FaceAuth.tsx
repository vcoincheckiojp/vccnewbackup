import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function FaceAuth() {
  const [isScanning, setIsScanning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Cleanup camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startFaceAuth = async () => {
    try {
      setIsScanning(true);
      setProgress(0);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 320, 
          height: 240,
          facingMode: 'user'
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Simulate face authentication progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            completeFaceAuth();
            return 100;
          }
          return prev + 10;
        });
      }, 200);

    } catch (error) {
      toast.error('Camera access denied or not available');
      setIsScanning(false);
    }
  };

  const completeFaceAuth = async () => {
    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsAuthenticated(true);
    
    // Simulate successful authentication
    setTimeout(async () => {
      const success = await login('face@example.com', 'faceauth');
      if (success) {
        toast.success('Face authentication successful!');
        navigate('/dashboard');
      }
    }, 1000);
  };

  const stopScanning = () => {
    setIsScanning(false);
    setProgress(0);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              {isAuthenticated ? (
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              ) : (
                <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isAuthenticated ? 'Authentication Successful' : 'Face Authentication'}
          </CardTitle>
          <CardDescription className="text-center">
            {isAuthenticated 
              ? 'You will be redirected to your dashboard shortly'
              : 'Position your face in the camera to authenticate'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden relative">
              {isScanning && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}
              
              {!isScanning && !isAuthenticated && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Camera will activate when you start scanning
                    </p>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
              )}

              {/* Face detection overlay */}
              {isScanning && (
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary rounded-full animate-pulse" />
                  
                  {/* Progress indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/80 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span>{progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isAuthenticated && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Make sure your face is well lit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Look directly at the camera</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Keep your device steady</span>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          {!isAuthenticated && (
            <>
              {!isScanning ? (
                <Button onClick={startFaceAuth} className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Start Face Authentication
                </Button>
              ) : (
                <Button onClick={stopScanning} variant="outline" className="w-full">
                  Stop Scanning
                </Button>
              )}
            </>
          )}
          
          <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}