import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data1 = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 }
];

const data2 = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 200 },
  { name: 'Product D', value: 278 },
  { name: 'Product E', value: 189 }
];

const stackedData = [
  { name: 'Q1', desktop: 4000, mobile: 2400, tablet: 1200 },
  { name: 'Q2', desktop: 3000, mobile: 1398, tablet: 2100 },
  { name: 'Q3', desktop: 2000, mobile: 9800, tablet: 1500 },
  { name: 'Q4', desktop: 2780, mobile: 3908, tablet: 1800 }
];

export function BarChartsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Bar Chart</CardTitle>
            <CardDescription>Simple bar chart with single data series</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data2}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Multiple Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Bar Series</CardTitle>
            <CardDescription>Bar chart with multiple data series</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data1}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stacked Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stacked Bar Chart</CardTitle>
            <CardDescription>Bar chart with stacked data series</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackedData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="desktop" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="mobile" stackId="a" fill="#10b981" />
                  <Bar dataKey="tablet" stackId="a" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Horizontal Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Horizontal Bars</CardTitle>
            <CardDescription>Horizontal orientation bar chart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="horizontal" data={data2}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}