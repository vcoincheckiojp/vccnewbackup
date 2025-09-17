import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { MessageCircle, ThumbsUp, Users, Calendar, Trophy } from 'lucide-react';

const communityStats = [
  { label: 'Total Members', value: '12,847', icon: Users, color: 'text-blue-500' },
  { label: 'Active Contributors', value: '3,245', icon: MessageCircle, color: 'text-green-500' },
  { label: 'Projects Reviewed', value: '1,678', icon: Trophy, color: 'text-purple-500' },
  { label: 'Community Events', value: '24', icon: Calendar, color: 'text-orange-500' },
];

const topContributors = [
  { name: 'Alex Chen', contributions: 156, reputation: 'Expert', avatar: 'AC' },
  { name: 'Maria Rodriguez', contributions: 142, reputation: 'Advanced', avatar: 'MR' },
  { name: 'John Smith', contributions: 128, reputation: 'Advanced', avatar: 'JS' },
  { name: 'Sarah Kim', contributions: 98, reputation: 'Intermediate', avatar: 'SK' },
];

const recentDiscussions = [
  { title: 'Cardano Smart Contract Best Practices', replies: 23, likes: 45, author: 'DevMaster', time: '2 hours ago' },
  { title: 'DeFi Protocol Security Review', replies: 18, likes: 32, author: 'SecureAda', time: '4 hours ago' },
  { title: 'NFT Marketplace Analysis', replies: 15, likes: 28, author: 'NFTExpert', time: '6 hours ago' },
  { title: 'Staking Pool Performance Comparison', replies: 12, likes: 21, author: 'StakeGuru', time: '8 hours ago' },
];

export function Community() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
          <p className="text-muted-foreground mt-2">Connect, collaborate, and contribute to the blockchain community</p>
        </div>
        <Link to="/community/new-thread">
          <Button className="gap-2">
            <MessageCircle className="h-4 w-4" />
            New Thread
          </Button>
        </Link>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Discussions */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Discussions</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border hover:border-[#6c5ce7]/50 transition-colors cursor-pointer">
                    <h4 className="font-medium mb-2 hover:text-[#6c5ce7] transition-colors">
                      {discussion.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>by {discussion.author} • {discussion.time}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Contributors */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[#6c5ce7] text-white">
                      {contributor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{contributor.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {contributor.reputation}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {contributor.contributions} contributions
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join Community CTA */}
      <Card className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00CEC9]/10 border-[#6C5CE7]/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Become part of a passionate community of blockchain enthusiasts, developers, and innovators. 
            Share your knowledge, learn from experts, and help shape the future of decentralized technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#6c5ce7] hover:bg-[#5a4fcf] text-white">
              Join Community
            </Button>
            <Button variant="outline" className="border-[#6c5ce7]/30 text-[#6c5ce7] hover:bg-[#6c5ce7]/10">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}