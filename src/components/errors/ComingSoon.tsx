import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner@2.0.3';

export function ComingSoon() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer - set to 30 days from now
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you! We\'ll notify you when it\'s ready.');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Clock className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold mb-2">
              Coming Soon
            </CardTitle>
            <CardDescription className="text-lg">
              We're working hard to bring you something amazing. Stay tuned!
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            <h3 className="font-semibold">What's coming:</h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Advanced analytics dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Real-time collaboration tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Enhanced security features</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Mobile app integration</span>
              </div>
            </div>
          </div>

          {/* Email subscription */}
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Get notified when we launch</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button type="submit">
                  Notify Me
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
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