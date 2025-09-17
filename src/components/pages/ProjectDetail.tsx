import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { useAuth } from '../../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  TrendingUp, 
  ExternalLink, 
  GitBranch, 
  Calendar, 
  Globe,
  Twitter,
  Github,
  MessageSquare,
  ThumbsUp,
  Heart,
  Share2,
  Lock,
  Activity,
  DollarSign,
  BarChart3,
  Clock,
  Award,
  Plus,
  Send,
  Eye,
  ChevronRight,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// Mock data - this would come from an API
const getProjectData = (id: string) => {
  const projects = {
    '1': {
      id: 1,
      name: 'SUNDAESWAP',
      ecosystem: 'Cardano',
      category: 'Exchange',
      scoring: 1350,
      status: 'Active',
      availability: '★',
      projectType: 'DeFi',
      description: 'SundaeSwap is a decentralized exchange (DEX) built on the Cardano blockchain. It allows users to swap tokens, provide liquidity, and participate in governance.',
      fullDescription: 'SundaeSwap represents a new generation of decentralized exchanges built specifically for the Cardano ecosystem. Unlike traditional DEXs that rely on order books, SundaeSwap uses an automated market maker (AMM) model that allows for continuous liquidity provision and seamless token swaps.',
      views: 1240,
      contributions: 89,
      image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      website: 'https://sundaeswap.finance',
      twitter: '@SundaeSwap',
      github: 'SundaeSwap-finance',
      launchDate: '2022-01-20',
      totalValueLocked: '$45.2M',
      volume24h: '$2.1M',
      tokenPrice: '$0.0145',
      marketCap: '$145M',
      holders: '12,450',
      team: [
        { name: 'John Doe', role: 'Founder & CEO', avatar: 'JD', bio: 'Experienced blockchain developer with 8+ years in DeFi' },
        { name: 'Jane Smith', role: 'CTO', avatar: 'JS', bio: 'Former lead engineer at major crypto exchange' },
        { name: 'Mike Johnson', role: 'Lead Developer', avatar: 'MJ', bio: 'Smart contract specialist and Cardano expert' }
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Core DEX Launch', status: 'completed', date: 'Q1 2022', description: 'Launch of core AMM functionality' },
        { phase: 'Phase 2', title: 'Liquidity Farming', status: 'completed', date: 'Q2 2022', description: 'Yield farming and staking rewards' },
        { phase: 'Phase 3', title: 'Governance Token', status: 'in-progress', date: 'Q3 2022', description: 'DAO governance implementation' },
        { phase: 'Phase 4', title: 'Mobile App', status: 'upcoming', date: 'Q1 2023', description: 'Native mobile application' }
      ],
      tokenomics: {
        totalSupply: '2,000,000,000',
        circulatingSupply: '450,000,000',
        distribution: [
          { name: 'Community Rewards', percentage: 45, color: '#ef4444' },
          { name: 'Team & Advisors', percentage: 20, color: '#f97316' },
          { name: 'Development Fund', percentage: 15, color: '#eab308' },
          { name: 'Marketing', percentage: 10, color: '#22c55e' },
          { name: 'Partnerships', percentage: 10, color: '#3b82f6' }
        ]
      },
      activities: [
        { type: 'release', title: 'Version 2.1 Released', description: 'New swap interface with improved UX', date: '2024-01-15', icon: 'rocket' },
        { type: 'partnership', title: 'Partnership with CardanoLabs', description: 'Strategic partnership announced', date: '2024-01-12', icon: 'handshake' },
        { type: 'milestone', title: '1M Total Transactions', description: 'Reached 1 million total swaps', date: '2024-01-10', icon: 'target' },
        { type: 'update', title: 'Smart Contract Audit Complete', description: 'Security audit completed successfully', date: '2024-01-08', icon: 'shield' }
      ],
      metrics: {
        security: 92,
        community: 88,
        development: 95,
        adoption: 85,
        innovation: 90
      },
      tags: ['DEX', 'AMM', 'DeFi', 'Cardano', 'Liquidity'],
      scoreHistory: [
        { date: '2024-01-01', score: 1200 },
        { date: '2024-01-05', score: 1250 },
        { date: '2024-01-10', score: 1300 },
        { date: '2024-01-15', score: 1350 },
        { date: '2024-01-20', score: 1400 },
        { date: '2024-01-25', score: 1350 }
      ],
      recentReviews: [
        {
          id: 1,
          user: 'CryptoAnalyst',
          avatar: 'CA',
          rating: 4.5,
          date: '2024-01-20',
          content: 'Excellent DEX with great user experience. The AMM model works smoothly on Cardano.',
          type: 'Expert Review'
        },
        {
          id: 2,
          user: 'DeFiExplorer',
          avatar: 'DE',
          rating: 4.2,
          date: '2024-01-18',
          content: 'Good project with solid fundamentals. Looking forward to governance implementation.',
          type: 'Advanced Review'
        },
        {
          id: 3,
          user: 'CardanoFan',
          avatar: 'CF',
          rating: 4.8,
          date: '2024-01-15',
          content: 'Amazing platform! Easy to use and great for Cardano ecosystem.',
          type: 'Basic Review'
        }
      ]
    }
  };
  
  return projects[id] || null;
};

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeReviewTab, setActiveReviewTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);

  // Review form states
  const [reviewForm, setReviewForm] = useState({
    overallRating: [4],
    security: [4],
    innovation: [4],
    team: [4],
    community: [4],
    tokenomics: [4],
    development: [4],
    content: '',
    pros: '',
    cons: '',
    recommendation: ''
  });

  const project = getProjectData(id || '');

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/project')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = () => {
    toast.success('Review submitted successfully!');
    setActiveTab('community-reviews');
  };

  const ActivityIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'release': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'partnership': return <Users className="w-4 h-4 text-blue-500" />;
      case 'milestone': return <Award className="w-4 h-4 text-yellow-500" />;
      case 'update': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/project')}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>

      {/* Project Hero */}
      <Card className="bg-gradient-to-r from-card to-card/50 border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-primary/70 p-[3px]">
              <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                <ImageWithFallback
                  src={project.image}
                  alt={project.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{project.name}</h1>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {project.ecosystem}
                    </Badge>
                    <Badge variant="secondary">{project.category}</Badge>
                    <span className="text-yellow-500 text-lg">{project.availability}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Launched {project.launchDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.holders} holders
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {project.views} views
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="text-4xl font-bold text-primary mb-1">{project.scoring}</div>
                  <div className="text-sm text-muted-foreground mb-4">Overall Score</div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant={isFollowing ? "secondary" : "default"}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setLiked(!liked)}
                        className={liked ? "text-red-500" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                        {liked ? '124' : '123'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        45
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid bg-card">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="community-reviews">Community Reviews</TabsTrigger>
          <TabsTrigger value="submit-review" className="relative">
            Submit Review
            {!isAuthenticated && <Lock className="w-3 h-3 ml-1" />}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between mb-2">
                            <span className="capitalize">{key}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Market Cap</span>
                        <span className="font-medium">{project.marketCap}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token Price</span>
                        <span className="font-medium">{project.tokenPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">TVL</span>
                        <span className="font-medium">{project.totalValueLocked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">24h Volume</span>
                        <span className="font-medium">{project.volume24h}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          <ActivityIcon type={activity.type} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{activity.title}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenomics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.tokenomics.distribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Token Supply</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Supply</span>
                      <span className="font-medium">{project.tokenomics.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Circulating Supply</span>
                      <span className="font-medium">{project.tokenomics.circulatingSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">{project.marketCap}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.team.map((member, index) => (
                      <div key={index} className="text-center p-4 border border-border rounded-lg">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold mb-1">{member.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.bio}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap">
              <Card>
                <CardHeader>
                  <CardTitle>Project Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.roadmap.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'in-progress' ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold">{item.phase}: {item.title}</h3>
                            <Badge variant={
                              item.status === 'completed' ? 'default' :
                              item.status === 'in-progress' ? 'secondary' : 'outline'
                            }>
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-1">{item.date}</p>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Community Reviews Tab */}
        <TabsContent value="community-reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.recentReviews.map((review) => (
                    <div key={review.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                                ))}
                              </div>
                              <Badge variant="outline" className="text-xs">{review.type}</Badge>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Score Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Score Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={project.scoreHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" hide />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Review Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4.5</div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4.5 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">Based on 89 reviews</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Expert Reviews</span>
                      <span>12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Advanced Reviews</span>
                      <span>34</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Basic Reviews</span>
                      <span>43</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Submit Review Tab */}
        <TabsContent value="submit-review">
          {!isAuthenticated ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
                <p className="text-muted-foreground text-center mb-6">
                  You need to be logged in to submit a review.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/register')}>
                    Create Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeReviewTab} onValueChange={setActiveReviewTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-muted">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="basic">Basic Review</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Review</TabsTrigger>
                <TabsTrigger value="expert">Expert Review</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-border rounded-lg text-center">
                        <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <h3 className="font-medium mb-2">Basic Review</h3>
                        <p className="text-sm text-muted-foreground">Simple rating and comments for general users</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <h3 className="font-medium mb-2">Advanced Review</h3>
                        <p className="text-sm text-muted-foreground">Detailed analysis with multiple criteria</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <h3 className="font-medium mb-2">Expert Review</h3>
                        <p className="text-sm text-muted-foreground">In-depth technical and market analysis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block font-medium mb-3">Overall Rating</label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={reviewForm.overallRating}
                          onValueChange={(value) => setReviewForm(prev => ({ ...prev, overallRating: value }))}
                          max={5}
                          min={1}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="font-medium w-12">{reviewForm.overallRating[0]}/5</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Your Review</label>
                      <Textarea
                        placeholder="Share your thoughts about this project..."
                        value={reviewForm.content}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button onClick={handleReviewSubmit} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {['security', 'innovation', 'team', 'community'].map((criteria) => (
                      <div key={criteria}>
                        <label className="block font-medium mb-3 capitalize">{criteria}</label>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={reviewForm[criteria as keyof typeof reviewForm] as number[]}
                            onValueChange={(value) => setReviewForm(prev => ({ ...prev, [criteria]: value }))}
                            max={5}
                            min={1}
                            step={0.5}
                            className="flex-1"
                          />
                          <span className="font-medium w-12">
                            {(reviewForm[criteria as keyof typeof reviewForm] as number[])[0]}/5
                          </span>
                        </div>
                      </div>
                    ))}

                    <div>
                      <label className="block font-medium mb-2">Pros</label>
                      <Textarea
                        placeholder="What are the project's strengths?"
                        value={reviewForm.pros}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, pros: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Cons</label>
                      <Textarea
                        placeholder="What could be improved?"
                        value={reviewForm.cons}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, cons: e.target.value }))}
                      />
                    </div>

                    <Button onClick={handleReviewSubmit} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Advanced Review
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expert">
                <Card>
                  <CardHeader>
                    <CardTitle>Expert Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {['tokenomics', 'development', 'security', 'innovation', 'team', 'community'].map((criteria) => (
                      <div key={criteria}>
                        <label className="block font-medium mb-3 capitalize">{criteria}</label>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={reviewForm[criteria as keyof typeof reviewForm] as number[]}
                            onValueChange={(value) => setReviewForm(prev => ({ ...prev, [criteria]: value }))}
                            max={5}
                            min={1}
                            step={0.1}
                            className="flex-1"
                          />
                          <span className="font-medium w-12">
                            {(reviewForm[criteria as keyof typeof reviewForm] as number[])[0]}/5
                          </span>
                        </div>
                      </div>
                    ))}

                    <div>
                      <label className="block font-medium mb-2">Detailed Analysis</label>
                      <Textarea
                        placeholder="Provide in-depth technical and market analysis..."
                        value={reviewForm.content}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
                        className="min-h-[150px]"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Investment Recommendation</label>
                      <Select value={reviewForm.recommendation} onValueChange={(value) => setReviewForm(prev => ({ ...prev, recommendation: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recommendation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strong-buy">Strong Buy</SelectItem>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="hold">Hold</SelectItem>
                          <SelectItem value="sell">Sell</SelectItem>
                          <SelectItem value="strong-sell">Strong Sell</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleReviewSubmit} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Expert Review
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}