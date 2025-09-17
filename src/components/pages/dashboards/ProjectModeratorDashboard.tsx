import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { FileText, Eye, CheckCircle, XCircle, Clock, TrendingUp, Users, Star } from 'lucide-react';

const projectStats = [
  { label: 'Pending Projects', value: '15', change: '+3', icon: Clock },
  { label: 'Approved Today', value: '8', change: '+2', icon: CheckCircle },
  { label: 'Under Review', value: '12', change: '+1', icon: Eye },
  { label: 'Total Projects', value: '247', change: '+15', icon: FileText },
];

const pendingProjects = [
  { 
    id: 1, 
    name: 'DeFi Protocol v2.0', 
    submitter: 'John Doe', 
    category: 'DeFi',
    quality: 85,
    submitted: '2 hours ago',
    priority: 'High',
    ecosystem: 'Cardano'
  },
  { 
    id: 2, 
    name: 'NFT Marketplace', 
    submitter: 'Jane Smith', 
    category: 'NFT',
    quality: 78,
    submitted: '4 hours ago',
    priority: 'Medium',
    ecosystem: 'Cardano'
  },
  { 
    id: 3, 
    name: 'Staking Pool Manager', 
    submitter: 'Mike Johnson', 
    category: 'Staking',
    quality: 92,
    submitted: '6 hours ago',
    priority: 'High',
    ecosystem: 'Cardano'
  },
  { 
    id: 4, 
    name: 'Governance Tool', 
    submitter: 'Sarah Wilson', 
    category: 'Governance',
    quality: 88,
    submitted: '1 day ago',
    priority: 'Low',
    ecosystem: 'Cardano'
  },
];

const categoryStats = [
  { category: 'DeFi', count: 45, approved: 38, pending: 7 },
  { category: 'NFT', count: 32, approved: 28, pending: 4 },
  { category: 'Staking', count: 28, approved: 25, pending: 3 },
  { category: 'Governance', count: 15, approved: 14, pending: 1 },
];

export function ProjectModeratorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Moderator Dashboard</h1>
          <p className="text-muted-foreground">Review and manage blockchain project submissions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Project Guidelines
          </Button>
          <Button size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Review Queue
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => {
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="categories">Category Overview</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects Awaiting Review</CardTitle>
              <CardDescription>Review and approve project submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quality Score</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.submitter}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.quality} className="w-16" />
                          <span className="text-sm">{project.quality}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={project.priority === 'High' ? 'destructive' : project.priority === 'Medium' ? 'default' : 'secondary'}
                        >
                          {project.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{project.submitted}</TableCell>
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
                            Reject
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
              <CardTitle>Project Categories Overview</CardTitle>
              <CardDescription>Track projects by category and approval status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{category.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {category.count} total projects
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          {category.approved} approved
                        </span>
                        <span className="text-orange-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {category.pending} pending
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={(category.approved / category.count) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Standards</CardTitle>
                <CardDescription>Current quality control metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Quality Score</span>
                    <span className="text-sm font-medium">82.5%</span>
                  </div>
                  <Progress value={82.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Projects Above 80%</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Approval Rate</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
                <CardDescription>Key criteria for project evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Technical Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Code Quality & Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Community Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Innovation & Originality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Sustainability Plan</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Reports</CardTitle>
              <CardDescription>Generate and view project-related reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Daily Review Report
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Quality Trends
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Submitter Analytics
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  Approval Statistics
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Star className="h-6 w-6 mb-2" />
                  Top Rated Projects
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Clock className="h-6 w-6 mb-2" />
                  Review Time Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}