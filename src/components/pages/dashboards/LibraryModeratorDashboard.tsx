import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { Library, BookOpen, Edit, Eye, CheckCircle, Clock, TrendingUp, Users, Star } from 'lucide-react';

const libraryStats = [
  { label: 'Pending Content', value: '8', change: '+2', icon: Clock },
  { label: 'Updated Today', value: '5', change: '+1', icon: Edit },
  { label: 'Under Review', value: '3', change: '0', icon: Eye },
  { label: 'Total Articles', value: '156', change: '+7', icon: BookOpen },
];

const pendingContent = [
  { 
    id: 1, 
    title: 'Cardano Smart Contracts Advanced Guide', 
    author: 'Dr. John Smith', 
    category: 'Cardano Knowledge',
    type: 'Guide',
    submitted: '2 hours ago',
    priority: 'High',
    status: 'Review'
  },
  { 
    id: 2, 
    title: 'DeFi Terminology Dictionary Update', 
    author: 'Jane Doe', 
    category: 'Dictionary',
    type: 'Update',
    submitted: '4 hours ago',
    priority: 'Medium',
    status: 'Review'
  },
  { 
    id: 3, 
    title: 'Blockchain Consensus Mechanisms', 
    author: 'Mike Johnson', 
    category: 'Blockchain Knowledge',
    type: 'Article',
    submitted: '6 hours ago',
    priority: 'Low',
    status: 'Draft'
  },
  { 
    id: 4, 
    title: 'Catalyst Voting Process 2024', 
    author: 'Sarah Wilson', 
    category: 'Catalyst Knowledge',
    type: 'Guide',
    submitted: '1 day ago',
    priority: 'High',
    status: 'Review'
  },
];

const contentCategories = [
  { category: 'Cardano Knowledge', articles: 45, pending: 3, views: 15420 },
  { category: 'Blockchain Knowledge', articles: 38, pending: 2, views: 12350 },
  { category: 'Catalyst Knowledge', articles: 28, pending: 2, views: 8940 },
  { category: 'Dictionary', articles: 45, pending: 1, views: 22150 },
];

const popularContent = [
  { title: 'Introduction to Cardano', views: 2450, rating: 4.8, category: 'Cardano Knowledge' },
  { title: 'DeFi Explained', views: 1920, rating: 4.7, category: 'Blockchain Knowledge' },
  { title: 'Catalyst Voting Guide', views: 1580, rating: 4.9, category: 'Catalyst Knowledge' },
  { title: 'Blockchain Glossary', views: 3200, rating: 4.6, category: 'Dictionary' },
];

export function LibraryModeratorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Library Moderator Dashboard</h1>
          <p className="text-muted-foreground">Manage and curate educational content library</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Content Guidelines
          </Button>
          <Button size="sm">
            <Library className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {libraryStats.map((stat, index) => {
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
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pending">Pending Content</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="popular">Popular Content</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Awaiting Review</CardTitle>
              <CardDescription>Review and approve library submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingContent.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">{content.title}</TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{content.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{content.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={content.status === 'Review' ? 'default' : 'secondary'}>
                          {content.status}
                        </Badge>
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
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
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

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Categories Overview</CardTitle>
              <CardDescription>Track library content by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {contentCategories.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{category.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {category.articles} articles
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-blue-600">
                          <Eye className="h-4 w-4 inline mr-1" />
                          {category.views.toLocaleString()} views
                        </span>
                        <span className="text-orange-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {category.pending} pending
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="font-medium">{category.articles}</div>
                        <div className="text-muted-foreground">Total Articles</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="font-medium">{category.views.toLocaleString()}</div>
                        <div className="text-muted-foreground">Total Views</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="font-medium">{Math.round(category.views / category.articles)}</div>
                        <div className="text-muted-foreground">Avg Views/Article</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Content</CardTitle>
              <CardDescription>Top performing library articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularContent.map((content, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{content.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{content.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          {content.views.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {content.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
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

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Quality Metrics</CardTitle>
                <CardDescription>Overall library quality indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Rating</span>
                    <span className="text-sm font-medium">4.7/5</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Content Freshness</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Approval Rate</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">User Engagement</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Standards</CardTitle>
                <CardDescription>Quality criteria for library content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Technical Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Clear Explanations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Up-to-date Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Proper Citations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Visual Elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Community Relevance</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Library Reports</CardTitle>
              <CardDescription>Generate and view library analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  Content Analytics
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Usage Trends
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Author Performance
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Star className="h-6 w-6 mb-2" />
                  Quality Ratings
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Edit className="h-6 w-6 mb-2" />
                  Update Schedule
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Eye className="h-6 w-6 mb-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}