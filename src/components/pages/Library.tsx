import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Book, FileText, Layers, Link, Zap } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const libraryItems = [
  {
    title: 'Library Overview',
    description: 'Browse through our comprehensive collection of blockchain resources',
    icon: Book,
    href: '/library/overview',
    color: 'from-[#6C5CE7] to-[#A29BFE]'
  },
  {
    title: 'Dictionary',
    description: 'Blockchain and cryptocurrency terms and definitions',
    icon: FileText,
    href: '/library/dictionary',
    color: 'from-[#00CEC9] to-[#55EFC4]'
  },
  {
    title: 'Cardano Knowledge',
    description: 'Everything you need to know about the Cardano ecosystem',
    icon: Layers,
    href: '/library/cardano-knowledge',
    color: 'from-[#FD79A8] to-[#FDCB6E]'
  },
  {
    title: 'Blockchain Knowledge',
    description: 'Fundamental concepts and principles of blockchain technology',
    icon: Link,
    href: '/library/blockchain-knowledge',
    color: 'from-[#E17055] to-[#FDCB6E]'
  },
  {
    title: 'Catalyst Knowledge',
    description: 'Learn about Cardano\'s innovation and voting platform',
    icon: Zap,
    href: '/library/catalyst-knowledge',
    color: 'from-[#74B9FF] to-[#0984E3]'
  }
];

export function Library() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Knowledge Library</h1>
        <p className="text-muted-foreground mt-2">Explore our comprehensive blockchain and cryptocurrency knowledge base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <Card key={index} className="bg-card border-border hover:border-[#6c5ce7]/50 transition-all duration-300 group cursor-pointer">
              <RouterLink to={item.href}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#6c5ce7] transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <Button variant="ghost" className="w-full text-[#6c5ce7] hover:bg-[#6c5ce7]/10 group-hover:bg-[#6c5ce7] group-hover:text-white transition-all">
                    Explore →
                  </Button>
                </CardContent>
              </RouterLink>
            </Card>
          );
        })}
      </div>

      {/* Featured Content */}
      <Card className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00CEC9]/10 border-[#6C5CE7]/20">
        <CardHeader>
          <CardTitle className="text-2xl">Featured: Getting Started with Blockchain</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            New to blockchain technology? Start your journey with our comprehensive beginner's guide covering 
            everything from basic concepts to advanced applications in the Cardano ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#6c5ce7] hover:bg-[#5a4fcf] text-white">
              Start Learning
            </Button>
            <Button variant="outline" className="border-[#6c5ce7]/30 text-[#6c5ce7] hover:bg-[#6c5ce7]/10">
              View All Guides
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}