import React from 'react';
import { Users, MessageSquare, Star, Trophy, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const topMembers = [
  {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    points: 2847,
    level: 'Expert',
    badge: 'Top Contributor'
  },
  {
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    points: 2156,
    level: 'Advanced',
    badge: 'Helper'
  },
  {
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    points: 1943,
    level: 'Advanced',
    badge: 'Rising Star'
  }
];

const recentPosts = [
  {
    author: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    title: 'How to optimize dashboard performance?',
    replies: 12,
    likes: 34,
    time: '2 hours ago',
    category: 'Technical'
  },
  {
    author: 'Lisa Wilson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
    title: 'Best practices for data visualization',
    replies: 8,
    likes: 28,
    time: '4 hours ago',
    category: 'Design'
  },
  {
    author: 'Alex Turner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    title: 'Feature request: Dark mode improvements',
    replies: 15,
    likes: 42,
    time: '6 hours ago',
    category: 'Feature Request'
  }
];

export function CommunityPage() {
  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +23 since yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solutions Shared</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Webinars & workshops
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Recent Discussions
            </CardTitle>
            <CardDescription>
              Latest community posts and discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{post.author}</span>
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.time}
                      </span>
                    </div>
                    
                    <h4 className="font-medium mb-2">{post.title}</h4>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{post.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              View All Discussions
            </Button>
          </CardContent>
        </Card>

        {/* Top Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Top Contributors
            </CardTitle>
            <CardDescription>
              Most active community members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{member.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {member.badge}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{member.level}</span>
                    <span>{member.points} points</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Community Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines</CardTitle>
          <CardDescription>
            Help us maintain a positive and productive community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Be Respectful</h4>
              <p className="text-sm text-muted-foreground">
                Treat all community members with respect and kindness
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Share Knowledge</h4>
              <p className="text-sm text-muted-foreground">
                Help others by sharing your expertise and solutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Stay On Topic</h4>
              <p className="text-sm text-muted-foreground">
                Keep discussions relevant and constructive
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}