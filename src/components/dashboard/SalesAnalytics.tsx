import React from 'react';
import { AllSell1 } from './widgets/AllSell1';
import { AllSell2 } from './widgets/AllSell2';
import { WeeklySales1 } from './widgets/WeeklySales1';
import { WeeklySales2 } from './widgets/WeeklySales2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', sales: 45000, target: 50000 },
  { month: 'Feb', sales: 38000, target: 50000 },
  { month: 'Mar', sales: 52000, target: 50000 },
  { month: 'Apr', sales: 47000, target: 50000 },
  { month: 'May', sales: 59000, target: 50000 },
  { month: 'Jun', sales: 51000, target: 50000 }
];

export function SalesAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$292,000</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Period</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 Months</div>
            <p className="text-xs text-muted-foreground">
              Current analysis period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AllSell1 />
        <AllSell2 />
      </div>

      {/* Weekly Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklySales1 />
        <WeeklySales2 />
      </div>

      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales vs Target</CardTitle>
          <CardDescription>
            6-month sales performance compared to monthly targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#ef4444" fillOpacity={0.3} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}