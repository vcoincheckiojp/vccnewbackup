import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Shield, FileText, Library, MessageSquare, Calendar, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const moderationStats = [
  { label: 'Pending Reviews', value: '47', change: '+12', icon: Eye },
  { label: 'Approved Today', value: '23', change: '+5', icon: CheckCircle },
  { label: 'Rejected Today', value: '8', change: '+2', icon: XCircle },
  { label: 'Escalated Issues', value: '3', change: '0', icon: AlertTriangle },
];

const pendingItems = [
  { id: 1, type: 'Project', title: 'DeFi Protocol v2.0', submitter: 'John Doe', priority: 'High', submitted: '2 hours ago' },
  { id: 2, type: 'Library', title: 'Cardano Smart Contracts Guide', submitter: 'Jane Smith', priority: 'Medium', submitted: '4 hours ago' },
  { id: 3, type: 'Community', title: 'Community Event Proposal', submitter: 'Mike Johnson', priority: 'Low', submitted: '1 day ago' },
  { id: 4, type: 'Project', title: 'NFT Marketplace Update', submitter: 'Sarah Wilson', priority: 'High', submitted: '6 hours ago' },
];

const recentActions = [
  { id: 1, action: 'Approved project submission', item: 'CardanoSwap', moderator: 'You', timestamp: '30 minutes ago' },
  { id: 2, action: 'Escalated community issue', item: 'User Report #1245', moderator: 'You', timestamp: '1 hour ago' },
  { id: 3, action: 'Updated library content', item: 'Blockchain Basics', moderator: 'You', timestamp: '2 hours ago' },
  { id: 4, action: 'Reviewed event proposal', item: 'ADA Summit 2024', moderator: 'You', timestamp: '3 hours ago' },
];

export function SuperModeratorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Moderator Dashboard</h1>
          <p className="text-muted-foreground">Oversee all moderation activities across the platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Review Queue
          </Button>
          <Button size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Moderation Tools
          </Button>
        </div>
      </div>

      {/* Moderation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moderationStats.map((stat, index) => {
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
                  <span className="text-xs text-muted-foreground">+{stat.change} from yesterday</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="oversight">Module Oversight</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Items Requiring Review</CardTitle>
              <CardDescription>All pending submissions across modules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.submitter}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}
                        >
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.submitted}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oversight" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Module
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">15</div>
                <p className="text-sm text-muted-foreground">Pending reviews</p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Projects
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Library className="h-5 w-5 text-primary" />
                  Library Module
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">8</div>
                <p className="text-sm text-muted-foreground">Pending reviews</p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Library
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Community Module
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Pending reviews</p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Community
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Events Module
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Pending reviews</p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Reports</CardTitle>
                <CardDescription>Generate comprehensive moderation reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Daily Moderation Summary
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Module Performance Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Issues & Escalations
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Review quality and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Review Speed</span>
                    <span className="text-sm font-medium">2.3 hours avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Approval Rate</span>
                    <span className="text-sm font-medium">74%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quality Score</span>
                    <span className="text-sm font-medium">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent moderation actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Moderator</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">{action.action}</TableCell>
                      <TableCell>{action.item}</TableCell>
                      <TableCell>{action.moderator}</TableCell>
                      <TableCell className="text-muted-foreground">{action.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}