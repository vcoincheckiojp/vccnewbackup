import React from 'react';
import { TrendingDown, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', revenue: 2400, target: 2800 },
  { name: 'Week 2', revenue: 1398, target: 2800 },
  { name: 'Week 3', revenue: 9800, target: 2800 },
  { name: 'Week 4', revenue: 3908, target: 2800 },
  { name: 'Week 5', revenue: 4800, target: 2800 },
  { name: 'Week 6', revenue: 3800, target: 2800 }
];

export function AllSell2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Revenue vs Target
        </CardTitle>
        <CardDescription>
          Weekly revenue performance vs targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">$89,432</p>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="mr-1 h-3 w-3" />
                -3.2% below target
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Target</p>
              <p className="font-semibold">$92,500</p>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-red-600" />
              <span>Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}