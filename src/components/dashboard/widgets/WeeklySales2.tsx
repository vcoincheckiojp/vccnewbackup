import React from 'react';
import { BarChart3, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { ComposedChart, Line, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', revenue: 4000, target: 4500, conversion: 3.2 },
  { day: 'Tue', revenue: 3000, target: 4500, conversion: 2.8 },
  { day: 'Wed', revenue: 2000, target: 4500, conversion: 1.9 },
  { day: 'Thu', revenue: 2780, target: 4500, conversion: 2.5 },
  { day: 'Fri', revenue: 1890, target: 4500, conversion: 1.7 },
  { day: 'Sat', revenue: 2390, target: 4500, conversion: 2.1 },
  { day: 'Sun', revenue: 3490, target: 4500, conversion: 3.1 }
];

export function WeeklySales2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cyan-600" />
          Revenue vs Target
        </CardTitle>
        <CardDescription>
          Weekly revenue performance against targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">$19,550</p>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="mr-1 h-3 w-3" />
                -12.4% below target
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Weekly Target</p>
              <p className="font-semibold">$31,500</p>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-cyan-600">
                            Revenue: ${payload[0]?.value?.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Target: ${payload[1]?.value?.toLocaleString()}
                          </p>
                          <p className="text-sm text-orange-600">
                            Conversion: {payload[2]?.value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="revenue" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                <Bar dataKey="target" fill="#6b7280" fillOpacity={0.3} radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey="conversion" stroke="#f97316" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-600 rounded-full" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full" />
                <span>Target</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-orange-600" />
              <span>Conversion %</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}