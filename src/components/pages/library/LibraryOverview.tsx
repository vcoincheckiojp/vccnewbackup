import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Search, BookOpen, FileText, Video, Download, Plus } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const categories = [
  { name: 'Blockchain Basics', count: 45, color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  { name: 'Cardano Ecosystem', count: 78, color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
  { name: 'DeFi Protocols', count: 32, color: 'bg-green-500/10 text-green-600 border-green-200' },
  { name: 'Smart Contracts', count: 56, color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  { name: 'NFTs & Digital Assets', count: 29, color: 'bg-pink-500/10 text-pink-600 border-pink-200' },
  { name: 'Governance', count: 18, color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
];

const featuredResources = [
  {
    title: 'Complete Guide to Cardano Staking',
    type: 'Guide',
    description: 'Learn everything about staking ADA and choosing the right stake pool.',
    icon: BookOpen,
    downloads: 1247,
    featured: true
  },
  {
    title: 'Smart Contract Security Best Practices',
    type: 'Documentation',
    description: 'Essential security considerations for Plutus smart contract development.',
    icon: FileText,
    downloads: 892,
    featured: true
  },
  {
    title: 'Introduction to Cardano Video Series',
    type: 'Video',
    description: '10-part video series covering Cardano fundamentals and ecosystem.',
    icon: Video,
    downloads: 2156,
    featured: true
  },
];

const recentlyAdded = [
  { title: 'Cardano Improvement Proposals (CIPs) Explained', date: '2 days ago', type: 'Article' },
  { title: 'Hydra Scaling Solution Overview', date: '3 days ago', type: 'Technical Doc' },
  { title: 'Treasury System Deep Dive', date: '5 days ago', type: 'Guide' },
  { title: 'Mithril Protocol Introduction', date: '1 week ago', type: 'Whitepaper' },
];

export function LibraryOverview() {
  const { user } = useAuth();
  
  // Check if user has permission to add new knowledge
  const canAddKnowledge = user && ['admin', 'library_moderator', 'super_moderator'].includes(user.role);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Library Overview</h1>
          <p className="text-muted-foreground mt-2">Comprehensive blockchain knowledge base with guides, documentation, and resources</p>
        </div>
        {canAddKnowledge && (
          <div className="flex gap-3">
            <Link to="/library/articles/new">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Article
              </Button>
            </Link>
            <Link to="/library/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Knowledge
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="bg-card border-border hover:border-[#6c5ce7]/50 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Badge variant="outline" className={`${category.color} mb-2`}>
                  {category.count}
                </Badge>
                <p className="font-medium text-sm">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Resources */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => {
            const Icon = resource.icon;
            
            return (
              <Card key={index} className="bg-card border-border hover:border-[#6c5ce7]/50 transition-colors group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#6c5ce7]/10">
                        <Icon className="h-5 w-5 text-[#6c5ce7]" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    {resource.featured && (
                      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#6c5ce7] transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#6c5ce7] hover:bg-[#6c5ce7]/10">
                      View Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Added */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recently Added</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyAdded.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium hover:text-[#6c5ce7] transition-colors">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Library Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6c5ce7]">258</div>
              <p className="text-sm text-muted-foreground">Total Resources</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00cec9]">45,892</div>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#fd79a8]">12</div>
              <p className="text-sm text-muted-foreground">New This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}