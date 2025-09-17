import React from 'react';
import { Target, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

const goals = [
  {
    title: 'Monthly Revenue',
    current: 75,
    target: '$50,000',
    achieved: '$37,500',
    color: 'bg-blue-500'
  },
  {
    title: 'New Customers',
    current: 85,
    target: '500',
    achieved: '425',
    color: 'bg-green-500'
  },
  {
    title: 'Product Sales',
    current: 60,
    target: '1,000',
    achieved: '600',
    color: 'bg-purple-500'
  }
];

const quickActions = [
  {
    title: 'Add New Product',
    description: 'Create a new product listing',
    icon: Target,
    color: 'text-blue-600'
  },
  {
    title: 'Invite Team Member',
    description: 'Send invitation to join workspace',
    icon: Users,
    color: 'text-green-600'
  },
  {
    title: 'View Analytics',
    description: 'Check detailed performance metrics',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

export function AsideLeft() {
  return (
    <div className="space-y-6">
      {/* Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Monthly Goals
          </CardTitle>
          <CardDescription>
            Track your progress towards monthly targets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{goal.title}</span>
                <span className="text-muted-foreground">{goal.current}%</span>
              </div>
              
              <Progress value={goal.current} className="h-2" />
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{goal.achieved}</span>
                <span>of {goal.target}</span>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            View All Goals
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start p-3 h-auto"
            >
              <div className="flex items-center gap-3">
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}