import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { BookOpen, Play, FileText, Award, Clock } from 'lucide-react';

const learningPaths = [
  {
    title: 'Cardano Fundamentals',
    description: 'Start your journey with the basics of Cardano blockchain',
    progress: 100,
    lessons: 8,
    duration: '2 hours',
    level: 'Beginner',
    completed: true
  },
  {
    title: 'ADA Staking Deep Dive',
    description: 'Learn everything about staking ADA and earning rewards',
    progress: 75,
    lessons: 6,
    duration: '1.5 hours',
    level: 'Intermediate',
    completed: false
  },
  {
    title: 'Smart Contracts with Plutus',
    description: 'Build and deploy smart contracts on Cardano',
    progress: 25,
    lessons: 12,
    duration: '4 hours',
    level: 'Advanced',
    completed: false
  },
];

const featuredContent = [
  {
    title: 'Cardano\'s Proof of Stake Explained',
    type: 'Article',
    readTime: '8 min read',
    icon: FileText,
    featured: true
  },
  {
    title: 'Building Your First DApp on Cardano',
    type: 'Video Tutorial',
    readTime: '25 min watch',
    icon: Play,
    featured: true
  },
  {
    title: 'Cardano Ecosystem Overview 2024',
    type: 'Guide',
    readTime: '12 min read',
    icon: BookOpen,
    featured: false
  },
];

const quickTopics = [
  { topic: 'What is Cardano?', category: 'Basics' },
  { topic: 'ADA Token Economics', category: 'Economics' },
  { topic: 'Ouroboros Consensus', category: 'Technology' },
  { topic: 'Stake Pool Operations', category: 'Staking' },
  { topic: 'Plutus Smart Contracts', category: 'Development' },
  { topic: 'Cardano Improvement Proposals', category: 'Governance' },
  { topic: 'Hydra Scaling Solution', category: 'Scaling' },
  { topic: 'Mithril Light Clients', category: 'Technology' },
];

export function CardanoKnowledge() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cardano Knowledge</h1>
        <p className="text-muted-foreground mt-2">Master the Cardano ecosystem with comprehensive guides and tutorials</p>
      </div>

      {/* Learning Paths */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => (
            <Card key={index} className="bg-card border-border hover:border-[#6c5ce7]/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant={path.level === 'Beginner' ? 'default' : path.level === 'Intermediate' ? 'secondary' : 'outline'}>
                    {path.level}
                  </Badge>
                  {path.completed && (
                    <Award className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <CardTitle className="text-lg">{path.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{path.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{path.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{path.duration}</span>
                  </div>
                </div>
                
                <Button 
                  variant={path.completed ? "outline" : "default"}
                  className="w-full"
                >
                  {path.completed ? 'Review' : path.progress > 0 ? 'Continue' : 'Start Learning'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Content */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Featured Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredContent.map((content, index) => {
                  const Icon = content.icon;
                  
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-[#6c5ce7]/50 transition-colors cursor-pointer">
                      <div className="p-3 rounded-lg bg-[#6c5ce7]/10">
                        <Icon className="h-6 w-6 text-[#6c5ce7]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{content.title}</h4>
                          {content.featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200 text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {content.type}
                          </Badge>
                          <span>{content.readTime}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Topics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickTopics.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium text-sm hover:text-[#6c5ce7] transition-colors">
                    {item.topic}
                  </div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {item.category}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cardano Ecosystem CTA */}
      <Card className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00CEC9]/10 border-[#6C5CE7]/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build on Cardano?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take your Cardano knowledge to the next level. Start building decentralized applications, 
            participate in governance, or contribute to the ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#6c5ce7] hover:bg-[#5a4fcf] text-white">
              Start Building
            </Button>
            <Button variant="outline" className="border-[#6c5ce7]/30 text-[#6c5ce7] hover:bg-[#6c5ce7]/10">
              Developer Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}