import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { month: 'Jan', positive: 4000, negative: -1200 },
  { month: 'Feb', positive: 3000, negative: -800 },
  { month: 'Mar', positive: 5000, negative: -1500 },
  { month: 'Apr', positive: 4500, negative: -900 },
  { month: 'May', positive: 6000, negative: -1100 },
  { month: 'Jun', positive: 5500, negative: -1300 },
  { month: 'Jul', positive: 7000, negative: -1000 }
];

const stats = [
  {
    title: 'Positive Metrics',
    value: '$45,230',
    change: '+12.5%',
    trend: 'up',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Negative Metrics',
    value: '$8,450',
    change: '-3.2%',
    trend: 'down',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/20'
  },
  {
    title: 'Net Performance',
    value: '$36,780',
    change: '+9.3%',
    trend: 'up',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  }
];

export function PositiveNegativeStats() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Performance Analysis
        </CardTitle>
        <CardDescription>
          Positive vs negative metrics comparison with trend analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} text-right`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 mb-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mb-1" />
                    )}
                    <p className="text-sm font-medium">{stat.change}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="positive"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm" />
              <span>Positive Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-sm" />
              <span>Negative Performance</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}