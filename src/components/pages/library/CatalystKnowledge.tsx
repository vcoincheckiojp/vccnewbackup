import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Vote, Zap, Users, Target, Calendar, DollarSign, Award, CheckCircle } from 'lucide-react';

const catalystStats = [
  { label: 'Total Funds Distributed', value: '$150M+', icon: DollarSign, color: 'text-green-500' },
  { label: 'Projects Funded', value: '1,200+', icon: Target, color: 'text-blue-500' },
  { label: 'Active Voters', value: '85,000+', icon: Vote, color: 'text-purple-500' },
  { label: 'Community Reviews', value: '25,000+', icon: Users, color: 'text-orange-500' },
];

const fundingRounds = [
  { fund: 'Fund 12', status: 'Active', proposals: 247, totalBudget: '$50M', deadline: 'March 15, 2024' },
  { fund: 'Fund 11', status: 'Completed', proposals: 189, totalBudget: '$35M', deadline: 'Completed' },
  { fund: 'Fund 10', status: 'Completed', proposals: 234, totalBudget: '$40M', deadline: 'Completed' },
];

const participationSteps = [
  {
    step: 1,
    title: 'Register to Vote',
    description: 'Download Catalyst Voting app and register with minimum 500 ADA',
    status: 'completed',
    icon: CheckCircle
  },
  {
    step: 2,
    title: 'Review Proposals',
    description: 'Browse and evaluate project proposals in various categories',
    status: 'current',
    icon: Vote
  },
  {
    step: 3,
    title: 'Cast Your Votes',
    description: 'Vote for projects you believe will benefit the Cardano ecosystem',
    status: 'pending',
    icon: Target
  },
  {
    step: 4,
    title: 'Earn Rewards',
    description: 'Receive ADA rewards for participating in the voting process',
    status: 'pending',
    icon: Award
  },
];

const successfulProjects = [
  { 
    name: 'AdaSwap DEX',
    category: 'DeFi',
    funded: '$125,000',
    completion: 85,
    impact: 'High'
  },
  {
    name: 'Cardano Mobile Wallet',
    category: 'Wallets',
    funded: '$89,000',
    completion: 100,
    impact: 'High'
  },
  {
    name: 'Education Platform',
    category: 'Community',
    funded: '$67,000',
    completion: 90,
    impact: 'Medium'
  },
];

export function CatalystKnowledge() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Project Catalyst Knowledge</h1>
        <p className="text-muted-foreground mt-2">Learn about Cardano's innovation platform and community-driven funding system</p>
      </div>

      {/* Catalyst Overview */}
      <Card className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00CEC9]/10 border-[#6C5CE7]/20">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-[#6c5ce7]" />
            <h2 className="text-2xl font-bold">What is Project Catalyst?</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            Project Catalyst is Cardano's innovation engine and one of the largest decentralized innovation funds in the world. 
            It empowers the community to propose, evaluate, and fund projects that will grow and enhance the Cardano ecosystem.
          </p>
          <Button className="bg-[#6c5ce7] hover:bg-[#5a4fcf] text-white">
            Get Started with Catalyst
          </Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {catalystStats.map((stat, index) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding Rounds */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Funding Rounds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fundingRounds.map((round, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{round.fund}</h4>
                    <Badge variant={round.status === 'Active' ? 'default' : 'secondary'}>
                      {round.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Proposals: </span>
                      <span className="font-medium">{round.proposals}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget: </span>
                      <span className="font-medium">{round.totalBudget}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Deadline: </span>
                      <span className="font-medium">{round.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How to Participate */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>How to Participate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {participationSteps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      step.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                      step.status === 'current' ? 'bg-[#6c5ce7]/10 text-[#6c5ce7]' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        step.status === 'current' ? 'text-[#6c5ce7]' : ''
                      }`}>
                        Step {step.step}: {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Successful Projects */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Successfully Funded Projects</CardTitle>
          <p className="text-muted-foreground">Examples of projects that received Catalyst funding and their progress</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successfulProjects.map((project, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:border-[#6c5ce7]/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold">{project.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funded:</span>
                    <span className="font-medium text-green-600">{project.funded}</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">{project.completion}%</span>
                    </div>
                    <Progress value={project.completion} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impact:</span>
                    <Badge 
                      variant={project.impact === 'High' ? 'default' : 'secondary'}
                      className={project.impact === 'High' ? 'bg-green-500/10 text-green-600 border-green-200' : ''}
                    >
                      {project.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Get Involved CTA */}
      <Card className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00CEC9]/10 border-[#6C5CE7]/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Shape Cardano's Future?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of community members in funding the next generation of Cardano projects. 
            Your voice and vote matter in building a better blockchain ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#6c5ce7] hover:bg-[#5a4fcf] text-white">
              <Vote className="h-4 w-4 mr-2" />
              Start Voting
            </Button>
            <Button variant="outline" className="border-[#6c5ce7]/30 text-[#6c5ce7] hover:bg-[#6c5ce7]/10">
              <Target className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}