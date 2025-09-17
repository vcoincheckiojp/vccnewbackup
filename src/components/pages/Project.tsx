import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { useAuth } from '../../contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Filter, Plus, Eye, Users, TrendingUp, Clock, Play } from 'lucide-react';

const projectsData = [
  { 
    id: 1, 
    name: 'SUNDAESWAP', 
    ecosystem: 'Cardano', 
    category: 'Exchange', 
    scoring: 29, 
    status: 'Active',
    availability: 'Normal',
    projectType: 'DeFi',
    description: 'Cardano blockchain, it allows swapping that the mechanism of the blockchain is fully scalable. you never have to worry...',
    views: 1240,
    contributions: 89,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 2, 
    name: 'MINSWAP', 
    ecosystem: 'Cardano', 
    category: 'Exchange', 
    scoring: 91, 
    status: 'Active',
    availability: 'Good',
    projectType: 'DeFi',
    description: 'There are instances of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.',
    views: 867,
    contributions: 45,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 3, 
    name: 'MATRIXSWAP', 
    ecosystem: 'Cardano', 
    category: 'Exchange', 
    scoring: 1, 
    status: 'Scam',
    availability: 'Scam',
    projectType: 'DeFi',
    description: 'Mach is a decentralized with total AMM liquidity pool, and we can do various for the best DeFi of Cardano and Project. Ethereum Layer 2 blockchain. Unlike traditional DeFi.',
    views: 1456,
    contributions: 124,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 4, 
    name: 'CARDAX', 
    ecosystem: 'Cardano', 
    category: 'CAR', 
    scoring: 5, 
    status: 'Scam',
    availability: 'Scam',
    projectType: 'DeFi',
    description: 'Cardax is an open-source exchange built on top of Cardano blockchain. CAD exchange aims to provide to the needs of users in some form to prove funding to partners who have active Deems.',
    views: 892,
    contributions: 67,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 5, 
    name: 'ADAPOOL', 
    ecosystem: 'Cardano', 
    category: 'Staking', 
    scoring: 1200, 
    status: 'Active',
    availability: '★★★',
    projectType: 'Staking',
    description: 'A comprehensive staking solution for Cardano ecosystem providing secure and reliable delegation services.',
    views: 2134,
    contributions: 156,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: 6, 
    name: 'CATALYST VOTE', 
    ecosystem: 'Cardano', 
    category: 'Governance', 
    scoring: 980, 
    status: 'Active',
    availability: '★★',
    projectType: 'Governance',
    description: 'Decentralized governance platform for Cardano ecosystem enabling community-driven decision making.',
    views: 1678,
    contributions: 203,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
];

const ongoingProjects = [
  {
    id: 101,
    name: 'DeFi Analytics Platform',
    ecosystem: 'Cardano',
    category: 'Analytics',
    progress: 75,
    status: 'In Progress',
    deadline: '2024-04-15',
    team: ['Alice Johnson', 'Bob Smith', 'Carol White'],
    description: 'Building comprehensive analytics dashboard for DeFi protocols on Cardano.',
    lastUpdate: '2 days ago',
    myRole: 'Frontend Developer'
  },
  {
    id: 102,
    name: 'NFT Marketplace V2',
    ecosystem: 'Cardano',
    category: 'NFT',
    progress: 45,
    status: 'In Progress',
    deadline: '2024-05-20',
    team: ['David Lee', 'Emma Wilson'],
    description: 'Enhanced NFT marketplace with advanced trading features and improved UX.',
    lastUpdate: '1 week ago',
    myRole: 'Smart Contract Developer'
  },
  {
    id: 103,
    name: 'Governance Token System',
    ecosystem: 'Cardano',
    category: 'Governance',
    progress: 90,
    status: 'Near Completion',
    deadline: '2024-03-30',
    team: ['Frank Brown', 'Grace Davis', 'Henry Miller', 'Ivy Chen'],
    description: 'Implementing decentralized governance system with voting mechanisms.',
    lastUpdate: '3 hours ago',
    myRole: 'Project Lead'
  }
];

export function Project() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Exchange', 'Staking', 'Governance', 'DeFi', 'NFT'];

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  const renderProjectList = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id} 
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => handleProjectClick(project.id)}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Project Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-metallic-silver p-[2px]">
                  <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                          {project.ecosystem}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <span className="text-accent-red text-sm">{project.availability}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{project.scoring}</div>
                      <div className="text-xs text-muted-foreground">Scoring</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {project.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.contributions}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:bg-primary/10 h-8 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );

  const renderOngoingProjects = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {ongoingProjects.map((project) => (
          <Card key={project.id} className="bg-card border-border hover:border-primary/50 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {project.ecosystem}
                        </Badge>
                        <Badge variant="secondary">
                          {project.category}
                        </Badge>
                        <Badge 
                          variant={project.status === 'Near Completion' ? 'default' : 'outline'}
                          className={project.status === 'Near Completion' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{project.progress}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.team.length} team members</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Play className="h-4 w-4" />
                      <span>Updated {project.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent-red transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <div className="text-sm">
                    <span className="text-muted-foreground">My Role:</span>
                    <p className="font-medium text-primary">{project.myRole}</p>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    Continue Work
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ongoingProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You don't have any ongoing projects yet.</p>
          <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Start New Project
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>Projects</h1>
          <p className="text-muted-foreground mt-2">
            {isAuthenticated 
              ? "Manage your ongoing projects and discover new ones in the ecosystem" 
              : "Discover and evaluate blockchain projects in the ecosystem"
            }
          </p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Submit Project
        </Button>
      </div>

      {isAuthenticated ? (
        <Tabs defaultValue="all-projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-projects">All Projects</TabsTrigger>
            <TabsTrigger value="my-projects">My Ongoing Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="all-projects" className="mt-6">
            {renderProjectList()}
          </TabsContent>
          <TabsContent value="my-projects" className="mt-6">
            {renderOngoingProjects()}
          </TabsContent>
        </Tabs>
      ) : (
        renderProjectList()
      )}
    </div>
  );
}