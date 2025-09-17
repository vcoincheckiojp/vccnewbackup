import React from 'react';
import { Clock, User, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const activities = [
  {
    type: 'sale',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    action: 'completed a purchase',
    details: 'Premium Plan - $99.00',
    time: '2 minutes ago',
    icon: ShoppingCart,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    type: 'signup',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    action: 'signed up',
    details: 'New user registration',
    time: '5 minutes ago',
    icon: User,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    type: 'payment',
    user: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    action: 'received payment',
    details: 'Invoice #1234 - $250.00',
    time: '12 minutes ago',
    icon: DollarSign,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    type: 'issue',
    user: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    action: 'reported an issue',
    details: 'Payment processing error',
    time: '18 minutes ago',
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    type: 'sale',
    user: {
      name: 'Lisa Wilson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face'
    },
    action: 'upgraded plan',
    details: 'Basic to Premium Plan',
    time: '25 minutes ago',
    icon: ShoppingCart,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  }
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-600" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest user actions and system events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`${activity.bgColor} p-2 rounded-full`}>
                <activity.icon className={`h-3 w-3 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">
                      {activity.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate">
                    {activity.user.name}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {activity.type}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.action}
                </p>
                
                <p className="text-xs text-muted-foreground mb-1">
                  {activity.details}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}