import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const stats = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Active Users',
    value: '2,847',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Total Orders',
    value: '1,429',
    change: '-2.4%',
    trend: 'down',
    icon: ShoppingCart,
    color: 'text-orange-600'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+0.8%',
    trend: 'up',
    icon: Activity,
    color: 'text-purple-600'
  }
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.trend === 'up' ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}