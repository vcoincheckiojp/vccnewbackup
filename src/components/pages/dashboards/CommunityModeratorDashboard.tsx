import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { MessageSquare, Users, Flag, Eye, CheckCircle, XCircle, TrendingUp, Heart, Share, AlertTriangle } from 'lucide-react';

const communityStats = [
  { label: 'Reported Posts', value: '12', change: '+3', icon: Flag },
  { label: 'Active Discussions', value: '45', change: '+8', icon: MessageSquare },
  { label: 'New Members', value: '127', change: '+15', icon: Users },
  { label: 'Resolved Issues', value: '34', change: '+7', icon: CheckCircle },
];

const reportedContent = [
  { 
    id: 1, 
    type: 'Post', 
    content: 'Discussion about new DeFi protocol', 
    author: 'CryptoUser123', 
    reportReason: 'Spam',
    reports: 3,
    submitted: '2 hours ago',
    priority: 'Medium'
  },
  { 
    id: 2, 
    type: 'Comment', 
    content: 'Reply to governance discussion', 
    author: 'BlockchainFan', 
    reportReason: 'Inappropriate Language',
    reports: 5,
    submitted: '4 hours ago',
    priority: 'High'
  },
  { 
    id: 3, 
    type: 'Post', 
    content: 'NFT marketplace announcement', 
    author: 'ArtistDAO', 
    reportReason: 'Self-promotion',
    reports: 2,
    submitted: '6 hours ago',
    priority: 'Low'
  },
  { 
    id: 4, 
    type: 'Comment', 
    content: 'Technical question about staking', 
    author: 'NewbieDev', 
    reportReason: 'Misinformation',
    reports: 4,
    submitted: '1 day ago',
    priority: 'High'
  },
];

const activeDiscussions = [
  { id: 1, title: 'Cardano Governance Updates', posts: 45, participants: 23, lastActivity: '5 minutes ago', engagement: 'High' },
  { id: 2, title: 'DeFi Protocol Comparison', posts: 32, participants: 18, lastActivity: '15 minutes ago', engagement: 'Medium' },
  { id: 3, title: 'NFT Marketplace Discussion', posts: 67, participants: 34, lastActivity: '30 minutes ago', engagement: 'High' },
  { id: 4, title: 'Staking Pool Recommendations', posts: 28, participants: 15, lastActivity: '1 hour ago', engagement: 'Medium' },
];

const memberActivity = [
  { period: 'Daily Active Users', count: 1247, trend: '+5.2%' },
  { period: 'Weekly Active Users', count: 3856, trend: '+8.7%' },
  { period: 'Monthly Active Users', count: 12450, trend: '+12.3%' },
  { period: 'New Registrations', count: 127, trend: '+15.4%' },
];

export function CommunityModeratorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Moderator Dashboard</h1>
          <p className="text-muted-foreground">Manage community discussions and maintain platform standards</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Moderation Queue
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Community Guidelines
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communityStats.map((stat, index) => {
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
                  <span className="text-xs text-green-500">{stat.change} from yesterday</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="reports">Reported Content</TabsTrigger>
          <TabsTrigger value="discussions">Active Discussions</TabsTrigger>
          <TabsTrigger value="members">Member Activity</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reported Content Queue</CardTitle>
              <CardDescription>Review and moderate flagged community content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedContent.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <Badge variant="outline">{content.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs truncate">{content.content}</TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{content.reportReason}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Flag className="h-3 w-3 text-red-500" />
                          {content.reports}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={content.priority === 'High' ? 'destructive' : content.priority === 'Medium' ? 'default' : 'secondary'}
                        >
                          {content.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{content.submitted}</TableCell>
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
                          <Button variant="outline" size="sm">
                            <XCircle className="h-3 w-3 mr-1" />
                            Remove
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

        <TabsContent value="discussions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Community Discussions</CardTitle>
              <CardDescription>Monitor trending discussions and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Discussion Title</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeDiscussions.map((discussion) => (
                    <TableRow key={discussion.id}>
                      <TableCell className="font-medium">{discussion.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          {discussion.posts}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {discussion.participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={discussion.engagement === 'High' ? 'default' : 'secondary'}
                        >
                          {discussion.engagement}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{discussion.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Monitor
                          </Button>
                          <Button variant="outline" size="sm">
                            <Flag className="h-3 w-3 mr-1" />
                            Moderate
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

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Activity Overview</CardTitle>
              <CardDescription>Track community growth and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {memberActivity.map((activity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{activity.period}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{activity.count.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-green-600">
                          {activity.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={Math.random() * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-sm text-muted-foreground">Average engagement rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5 text-blue-500" />
                  Content Shares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-sm text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Issues Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-sm text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>Core rules and standards for community behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Respectful Communication</div>
                      <div className="text-sm text-muted-foreground">Maintain professional and respectful discourse</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">No Spam or Self-Promotion</div>
                      <div className="text-sm text-muted-foreground">Avoid excessive promotional content</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Accurate Information</div>
                      <div className="text-sm text-muted-foreground">Share verified and factual content</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Constructive Feedback</div>
                      <div className="text-sm text-muted-foreground">Provide helpful and constructive criticism</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Moderation Tools</CardTitle>
                <CardDescription>Available actions for community management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag Content
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <XCircle className="h-4 w-4 mr-2" />
                  Remove Post/Comment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Issue Warning
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Temporary Suspension
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Lock Discussion
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Analytics</CardTitle>
              <CardDescription>Generate detailed community reports and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  Discussion Analytics
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Member Growth
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Engagement Trends
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Flag className="h-6 w-6 mb-2" />
                  Moderation Reports
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Heart className="h-6 w-6 mb-2" />
                  Content Performance
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  Issue Tracking
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}