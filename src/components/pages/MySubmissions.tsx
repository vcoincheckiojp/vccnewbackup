import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Search, 
  Edit, 
  Eye, 
  MoreVertical, 
  Calendar,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Plus
} from 'lucide-react';

// Mock data for user submissions
const mockSubmissions = [
  {
    id: 1,
    name: 'CardanoSwap DEX',
    description: 'A decentralized exchange built specifically for the Cardano ecosystem',
    category: 'DeFi',
    ecosystem: 'Cardano',
    status: 'approved',
    submissionDate: '2024-01-15',
    lastUpdate: '2024-01-20',
    scoring: 1250,
    views: 856,
    contributions: 23,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    feedback: 'Great project with strong technical foundation. Community engagement is excellent.'
  },
  {
    id: 2,
    name: 'NFT Marketplace Pro',
    description: 'Advanced NFT marketplace with royalty management and fractional ownership',
    category: 'NFT',
    ecosystem: 'Cardano',
    status: 'review',
    submissionDate: '2024-01-22',
    lastUpdate: '2024-01-22',
    scoring: null,
    views: 124,
    contributions: 5,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    feedback: null
  },
  {
    id: 3,
    name: 'Staking Pool Manager',
    description: 'Comprehensive staking pool management solution',
    category: 'Staking',
    ecosystem: 'Cardano',
    status: 'pending',
    submissionDate: '2024-01-25',
    lastUpdate: '2024-01-25',
    scoring: null,
    views: 45,
    contributions: 1,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    feedback: null
  },
  {
    id: 4,
    name: 'DAO Governance Tool',
    description: 'Decentralized governance platform with advanced voting mechanisms',
    category: 'Governance',
    ecosystem: 'Cardano',
    status: 'rejected',
    submissionDate: '2024-01-10',
    lastUpdate: '2024-01-18',
    scoring: null,
    views: 234,
    contributions: 8,
    image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBsb2dvfGVufDF8fHx8MTc1NzA0NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    feedback: 'Project needs more detailed documentation and clearer roadmap before approval.'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'review':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'pending':
      return <AlertCircle className="w-4 h-4 text-blue-500" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'review':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'pending':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'rejected':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export function MySubmissions() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || submission.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const statusCounts = {
    all: mockSubmissions.length,
    pending: mockSubmissions.filter(s => s.status === 'pending').length,
    review: mockSubmissions.filter(s => s.status === 'review').length,
    approved: mockSubmissions.filter(s => s.status === 'approved').length,
    rejected: mockSubmissions.filter(s => s.status === 'rejected').length,
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-[#6c5ce7] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground text-center mb-6">
            You need to be logged in to view your project submissions.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/login')} className="bg-[#6c5ce7] hover:bg-[#5a4fcf]">
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigate('/register')}>
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>My Project Submissions</h1>
          <p className="text-muted-foreground mt-2">Track and manage your submitted projects</p>
        </div>
        
        <Button 
          onClick={() => navigate('/project/submit')}
          className="bg-[#6c5ce7] hover:bg-[#5a4fcf] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Submit New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your submissions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-card">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Pending ({statusCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            In Review ({statusCounts.review})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3" />
            Approved ({statusCounts.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="w-3 h-3" />
            Rejected ({statusCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredSubmissions.length > 0 ? (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="bg-card border-border hover:border-[#6c5ce7]/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Project Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#6c5ce7] to-[#00cec9] p-[2px]">
                        <div className="w-full h-full rounded-md bg-card flex items-center justify-center">
                          <ImageWithFallback
                            src={submission.image}
                            alt={submission.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{submission.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {submission.ecosystem}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {submission.category}
                              </Badge>
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs ${getStatusColor(submission.status)}`}>
                                {getStatusIcon(submission.status)}
                                <span className="capitalize">{submission.status}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {submission.description}
                            </p>
                          </div>

                          {submission.scoring && (
                            <div className="text-right">
                              <div className="text-xl font-bold text-[#6c5ce7]">{submission.scoring}</div>
                              <div className="text-xs text-muted-foreground">Score</div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Submitted {new Date(submission.submissionDate).toLocaleDateString()}
                            </div>
                            {submission.status === 'approved' && (
                              <>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {submission.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {submission.contributions}
                                </div>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {submission.status === 'approved' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/project/${submission.id}`)}
                                className="text-[#6c5ce7] hover:bg-[#6c5ce7]/10"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            )}
                            {(submission.status === 'pending' || submission.status === 'rejected') && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>

                        {submission.feedback && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <h4 className="text-xs font-medium text-muted-foreground mb-1">FEEDBACK</h4>
                            <p className="text-sm">{submission.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                {activeTab === 'all' ? (
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
                ) : (
                  getStatusIcon(activeTab)
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? 'No matching submissions found' : 
                 activeTab === 'all' ? 'No submissions yet' : 
                 `No ${activeTab} submissions`}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 
                 activeTab === 'all' ? 'Submit your first project to get started with the VCOINCHECK evaluation process.' :
                 `You don't have any ${activeTab} submissions at the moment.`}
              </p>
              {!searchTerm && activeTab === 'all' && (
                <Button 
                  onClick={() => navigate('/project/submit')}
                  className="bg-[#6c5ce7] hover:bg-[#5a4fcf]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Project
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}