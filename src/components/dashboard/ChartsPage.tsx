import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, LineChart, PieChart, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const chartTypes = [
  {
    title: 'Bar Charts',
    description: 'Various bar chart implementations',
    icon: BarChart3,
    href: '/dashboard/charts/bar',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Line Charts',
    description: 'Line chart variations and styles',
    icon: LineChart,
    href: '/dashboard/charts/line',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Pie Charts',
    description: 'Circular charts and donut charts',
    icon: PieChart,
    href: '/dashboard/charts/pie',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    title: 'Realtime Charts',
    description: 'Live updating charts and metrics',
    icon: Activity,
    href: '/dashboard/charts/realtime',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  }
];

export function ChartsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {chartTypes.map((chart, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className={`${chart.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <chart.icon className={`h-8 w-8 ${chart.color}`} />
              </div>
              <CardTitle className="text-lg">{chart.title}</CardTitle>
              <CardDescription>
                {chart.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={chart.href}>
                <Button className="w-full">
                  View Examples
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}