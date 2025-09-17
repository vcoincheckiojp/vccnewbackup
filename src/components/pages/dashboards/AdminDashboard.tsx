import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Users, Shield, FileText, Library, MessageSquare, Calendar, Settings, Activity, TrendingUp, AlertTriangle } from 'lucide-react';

const systemStats = [
  { label: 'Total Users', value: '12,547', change: '+15%', icon: Users },
  { label: 'Active Projects', value: '1,847', change: '+8%', icon: FileText },
  { label: 'Community Posts', value: '9,234', change: '+23%', icon: MessageSquare },
  { label: 'System Health', value: '99.9%', change: 'Stable', icon: Activity },
];

const moderatorActions = [
  { id: 1, moderator: 'John Doe', action: 'Approved Project: CardanoSwap', timestamp: '2 minutes ago', type: 'Project' },
  { id: 2, moderator: 'Jane Smith', action: 'Updated Library: Blockchain Basics', timestamp: '15 minutes ago', type: 'Library' },
  { id: 3, moderator: 'Mike Johnson', action: 'Moderated Community Post', timestamp: '1 hour ago', type: 'Community' },
  { id: 4, moderator: 'Sarah Wilson', action: 'Created Event: ADA Summit 2024', timestamp: '2 hours ago', type: 'Events' },
];

const userManagement = [
  { id: 1, name: 'Alice Cooper', email: 'alice@example.com', role: 'Super Moderator', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Wilson', email: 'bob@example.com', role: 'Project Moderator', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Library Moderator', status: 'Inactive', joined: '2024-03-10' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Community Moderator', status: 'Active', joined: '2024-01-25' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete system control and management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
          <Button size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Security Panel
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-card border border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="moderators">Moderators</TabsTrigger>
          <TabsTrigger value="system">System Control</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Moderator Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Moderator Actions</CardTitle>
              <CardDescription>Latest activities across all modules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Moderator</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moderatorActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">{action.moderator}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{action.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{action.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all platform users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userManagement.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Suspend</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Super Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-muted-foreground">Active moderators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Active moderators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Library className="h-5 w-5 text-primary" />
                  Library Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">Active moderators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Community Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">Active moderators</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Controls</CardTitle>
                <CardDescription>Manage core system functions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Configuration
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Performance Monitor
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Management</CardTitle>
                <CardDescription>Control platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Project System
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Library className="h-4 w-4 mr-2" />
                  Library System
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Community System
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>Generate and view comprehensive reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  User Analytics
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Project Reports
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Performance Metrics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}