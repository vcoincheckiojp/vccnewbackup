import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import { Activity, Wifi, Users, Zap } from 'lucide-react';
import { Badge } from '../../ui/badge';

export function RealtimeChartsPage() {
  const [data, setData] = useState([
    { time: '14:00', users: 45, traffic: 120, sales: 8 },
    { time: '14:01', users: 52, traffic: 135, sales: 12 },
    { time: '14:02', users: 48, traffic: 128, sales: 9 },
    { time: '14:03', users: 61, traffic: 155, sales: 15 },
    { time: '14:04', users: 55, traffic: 142, sales: 11 },
    { time: '14:05', users: 67, traffic: 178, sales: 18 }
  ]);

  const [currentStats, setCurrentStats] = useState({
    activeUsers: 67,
    traffic: 178,
    salesPerMin: 18,
    serverLoad: 65
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0');
      
      const newUsers = Math.floor(Math.random() * 30) + 40;
      const newTraffic = Math.floor(Math.random() * 50) + 120;
      const newSales = Math.floor(Math.random() * 15) + 5;
      
      setData(prevData => {
        const newData = [...prevData.slice(-5), {
          time: timeStr,
          users: newUsers,
          traffic: newTraffic,
          sales: newSales
        }];
        return newData;
      });

      setCurrentStats({
        activeUsers: newUsers,
        traffic: newTraffic,
        salesPerMin: newSales,
        serverLoad: Math.floor(Math.random() * 40) + 30
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic</CardTitle>
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-600" />
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.traffic}</div>
            <p className="text-xs text-muted-foreground">
              Requests/min
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales/Min</CardTitle>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.salesPerMin}</div>
            <p className="text-xs text-muted-foreground">
              Real-time sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Load</CardTitle>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-600" />
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.serverLoad}%</div>
            <p className="text-xs text-muted-foreground">
              CPU usage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Active Users (Live)
            </CardTitle>
            <CardDescription>
              Real-time user activity updates every 3 seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-600" />
              Traffic Volume (Live)
            </CardTitle>
            <CardDescription>
              Real-time traffic monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="traffic" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Sales Activity (Live)
            </CardTitle>
            <CardDescription>
              Real-time sales tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multi-Metric Overview</CardTitle>
            <CardDescription>
              Combined real-time metrics view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="traffic" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Real-time system health monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-muted-foreground">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="font-medium">API Services</p>
                <p className="text-sm text-muted-foreground">All systems normal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
              <div>
                <p className="font-medium">CDN</p>
                <p className="text-sm text-muted-foreground">Minor delays</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}