import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { BookOpen, Shield, Zap, Globe, TrendingUp, Link } from 'lucide-react';

const fundamentals = [
  {
    title: 'What is Blockchain?',
    description: 'Introduction to distributed ledger technology',
    icon: Link,
    level: 'Beginner',
    readTime: '5 min'
  },
  {
    title: 'Cryptographic Hashing',
    description: 'Understanding the security foundation of blockchain',
    icon: Shield,
    level: 'Intermediate',
    readTime: '8 min'
  },
  {
    title: 'Consensus Mechanisms',
    description: 'Proof of Work, Proof of Stake, and other protocols',
    icon: Zap,
    level: 'Intermediate',
    readTime: '12 min'
  },
  {
    title: 'Decentralization Principles',
    description: 'Why decentralization matters and how it works',
    icon: Globe,
    level: 'Beginner',
    readTime: '7 min'
  },
];

const advancedTopics = [
  {
    title: 'Layer 2 Scaling Solutions',
    description: 'Payment channels, sidechains, and rollups',
    complexity: 'High',
    category: 'Scaling'
  },
  {
    title: 'Interoperability Protocols',
    description: 'Cross-chain communication and bridges',
    complexity: 'High',
    category: 'Technology'
  },
  {
    title: 'Privacy Technologies',
    description: 'Zero-knowledge proofs and privacy coins',
    complexity: 'High',
    category: 'Privacy'
  },
  {
    title: 'Tokenomics and Economics',
    description: 'Token distribution, inflation, and incentives',
    complexity: 'Medium',
    category: 'Economics'
  },
];

const useCases = [
  { title: 'Digital Currency', description: 'Peer-to-peer electronic cash systems', icon: '💰' },
  { title: 'Supply Chain', description: 'Transparent and traceable goods movement', icon: '📦' },
  { title: 'Identity Management', description: 'Self-sovereign digital identity solutions', icon: '🆔' },
  { title: 'Voting Systems', description: 'Transparent and tamper-proof elections', icon: '🗳️' },
  { title: 'Healthcare Records', description: 'Secure and interoperable medical data', icon: '🏥' },
  { title: 'Real Estate', description: 'Property ownership and transfer records', icon: '🏠' },
];

const comparisons = [
  {
    name: 'Bitcoin',
    consensus: 'Proof of Work',
    focus: 'Digital Gold',
    tps: '7',
    launched: '2009'
  },
  {
    name: 'Ethereum',
    consensus: 'Proof of Stake',
    focus: 'Smart Contracts',
    tps: '15',
    launched: '2015'
  },
  {
    name: 'Cardano',
    consensus: 'Ouroboros PoS',
    focus: 'Sustainability',
    tps: '250+',
    launched: '2017'
  },
  {
    name: 'Solana',
    consensus: 'Proof of History',
    focus: 'High Performance',
    tps: '65,000',
    launched: '2020'
  },
];

export function BlockchainKnowledge() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Blockchain Knowledge</h1>
        <p className="text-muted-foreground mt-2">Master the fundamentals and advanced concepts of blockchain technology</p>
      </div>

      <Tabs defaultValue="fundamentals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Topics</TabsTrigger>
          <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
          <TabsTrigger value="comparisons">Blockchain Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="fundamentals" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Blockchain Fundamentals</CardTitle>
              <p className="text-muted-foreground">Start with the essential concepts that power all blockchain networks</p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundamentals.map((topic, index) => {
              const Icon = topic.icon;
              
              return (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant={topic.level === 'Beginner' ? 'default' : 'secondary'}>
                        {topic.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{topic.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{topic.readTime}</span>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Advanced Blockchain Topics</CardTitle>
              <p className="text-muted-foreground">Deep dive into complex blockchain technologies and concepts</p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedTopics.map((topic, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {topic.category}
                    </Badge>
                    <Badge 
                      variant={topic.complexity === 'High' ? 'destructive' : 'secondary'}
                      className={topic.complexity === 'High' ? 'bg-orange-500/10 text-orange-600 border-orange-200' : ''}
                    >
                      {topic.complexity}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    Explore Topic
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="use-cases" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Real-World Applications</CardTitle>
              <p className="text-muted-foreground">Discover how blockchain technology is transforming various industries</p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Blockchain Platform Comparison</CardTitle>
              <p className="text-muted-foreground">Compare different blockchain networks and their characteristics</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Platform</th>
                      <th className="text-left py-3 px-4 font-semibold">Consensus</th>
                      <th className="text-left py-3 px-4 font-semibold">Primary Focus</th>
                      <th className="text-left py-3 px-4 font-semibold">TPS</th>
                      <th className="text-left py-3 px-4 font-semibold">Launched</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((platform, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-primary">{platform.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{platform.consensus}</td>
                        <td className="py-3 px-4">{platform.focus}</td>
                        <td className="py-3 px-4">{platform.tps}</td>
                        <td className="py-3 px-4 text-muted-foreground">{platform.launched}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Learning Resources CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-metallic-silver/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Continue Your Blockchain Journey</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to dive deeper? Explore specialized courses, hands-on tutorials, and connect with the 
            blockchain developer community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <TrendingUp className="h-4 w-4 mr-2" />
              Advanced Courses
            </Button>
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <BookOpen className="h-4 w-4 mr-2" />
              Study Guides
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}