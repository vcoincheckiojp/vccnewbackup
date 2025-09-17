import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', sales: 4000, returns: 240 },
  { day: 'Tue', sales: 3000, returns: 139 },
  { day: 'Wed', sales: 2000, returns: 980 },
  { day: 'Thu', sales: 2780, returns: 390 },
  { day: 'Fri', sales: 1890, returns: 480 },
  { day: 'Sat', sales: 2390, returns: 380 },
  { day: 'Sun', sales: 3490, returns: 430 }
];

export function WeeklySales1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          Weekly Sales Overview
        </CardTitle>
        <CardDescription>
          Daily sales performance for this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">$21,450</p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +5.2% from last week
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Avg. Daily</p>
              <p className="font-semibold">$3,064</p>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
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
                          <p className="text-sm text-blue-600">
                            Sales: ${payload[0]?.value?.toLocaleString()}
                          </p>
                          <p className="text-sm text-red-600">
                            Returns: ${payload[1]?.value?.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[2, 2, 0, 0]} />
                <Bar dataKey="returns" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              <span>Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <span>Returns</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}