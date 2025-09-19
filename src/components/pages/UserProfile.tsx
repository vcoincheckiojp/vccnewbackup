import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useAuth } from '../../contexts/AuthContext';
import { useSupabase } from '../../contexts/supabaseContext';
import { mockUserData } from './mockUserData';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Github, 
  Globe,
  Star,
  MessageSquare,
  Heart,
  Eye,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Edit,
  Settings,
  Shield,
  Crown,
  Activity,
  Clock,
  ThumbsUp,
  ChevronRight,
  FolderOpen,
  FileText,
  CheckCircle,
  AlertCircle,
  Hourglass
} from 'lucide-react';


const getRoleInfo = (role: string) => {
  const roleMap = {
    'admin': { name: 'Administrator', icon: Crown, color: 'text-red-500' },
    'super_moderator': { name: 'Super Moderator', icon: Shield, color: 'text-purple-500' },
    'project_moderator': { name: 'Project Moderator', icon: Award, color: 'text-blue-500' },
    'library_moderator': { name: 'Library Moderator', icon: BookOpen, color: 'text-green-500' },
    'community_moderator': { name: 'Community Moderator', icon: Users, color: 'text-orange-500' },
    'user': { name: 'User', icon: User, color: 'text-muted-foreground' }
  };
  return roleMap[role as keyof typeof roleMap] || roleMap.user;
};

export function UserProfile() {
  const { user } = useAuth();
  const { client: supabase } = useSupabase();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [loading, setLoading] = useState(false);

  // Fetch user data from Supabase when user is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {

        // Fetch profile data with role information (fix: use user_id, update select fields)
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select(`
            user_id,
            username,
            avatar_url,
            created_at,
            user_roles!inner(
              roles!inner(
                name
              )
            )
          `)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // Continue using mockUserData on error
          return;
        }

        if (profileData) {
          // Map Supabase data to UI format (fix: use user_id for id)
          const mappedData = {
            
            id: profileData.user_id,
            name: profileData.username || mockUserData.name,
            email: user.email || mockUserData.email,
            avatar: profileData.avatar_url || mockUserData.avatar,
            role: profileData.user_roles?.[0]?.roles?.name || mockUserData.role,
            joinDate: profileData.created_at ? new Date(profileData.created_at).toISOString().split('T')[0] : mockUserData.joinDate
          };
          setUserData(mappedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Continue using mockUserData on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, supabase]);
  
  const roleInfo = getRoleInfo(userData.role);
  const RoleIcon = roleInfo.icon;

  // Show loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-card to-card/50 border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1">
              <div className="relative">
                <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-primary/20">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl lg:text-3xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-card border-2 border-primary/20 rounded-full p-2">
                  <RoleIcon className={`w-5 h-5 ${roleInfo.color}`} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{userData.name}</h1>
                      <Badge variant="outline" className={`${roleInfo.color} border-current`}>
                        {roleInfo.name}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
                      </div>
                      {userData.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{userData.location}</span>
                        </div>
                      )}
                    </div>

                    {userData.bio && (
                      <p className="text-muted-foreground mb-4 max-w-2xl">{userData.bio}</p>
                    )}

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3">
                      {userData.website && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Globe className="w-4 h-4" />
                          Website
                        </Button>
                      )}
                      {userData.twitter && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </Button>
                      )}
                      {userData.github && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Github className="w-4 h-4" />
                          GitHub
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <div className="text-4xl font-bold text-primary mb-1">{userData.stats.contributingScore}</div>
                    <div className="text-sm text-muted-foreground mb-4">Contributing Score</div>
                    
                    <Button 
                      variant={isEditing ? "secondary" : "default"}
                      onClick={() => setIsEditing(!isEditing)}
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Badges & Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {userData.badges.map((badge, index) => (
                <Badge key={index} className={`${badge.color} text-white hover:opacity-80`}>
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userData.stats.totalReviews}</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{userData.stats.threadsCreated}</div>
            <div className="text-xs text-muted-foreground">Threads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{userData.stats.commentsPosted}</div>
            <div className="text-xs text-muted-foreground">Comments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{userData.stats.helpfulVotes}</div>
            <div className="text-xs text-muted-foreground">Helpful Votes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{userData.stats.profileViews}</div>
            <div className="text-xs text-muted-foreground">Profile Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{userData.stats.articlesWritten}</div>
            <div className="text-xs text-muted-foreground">Articles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-500">{userData.stats.eventsAttended}</div>
            <div className="text-xs text-muted-foreground">Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userData.stats.contributingScore}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-card">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contributing Score Breakdown */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Contributing Score Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Reviews Quality</span>
                      <span className="font-medium">850/1000</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Community Engagement</span>
                      <span className="font-medium">720/1000</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Content Creation</span>
                      <span className="font-medium">640/1000</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Moderation Activity</span>
                      <span className="font-medium">640/1000</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivity.slice(0, 5).map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="text-muted-foreground">{activity.action}</span>{' '}
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                My Reviews ({userData.stats.totalReviews})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentReviews.map((review) => (
                  <div key={review.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{review.projectName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">{review.type}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{review.likes}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.excerpt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="following">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Following Projects ({userData.followedProjects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.followedProjects.map((project) => (
                  <div key={project.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-primary">{project.score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <div className={`text-sm ${project.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {project.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                My Project Submissions ({userData.mySubmissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.mySubmissions.map((submission) => {
                  const getStatusIcon = (status: string) => {
                    switch (status) {
                      case 'approved':
                        return <CheckCircle className="w-5 h-5 text-green-500" />;
                      case 'pending':
                        return <Hourglass className="w-5 h-5 text-yellow-500" />;
                      case 'revision_needed':
                        return <AlertCircle className="w-5 h-5 text-orange-500" />;
                      default:
                        return <FileText className="w-5 h-5 text-muted-foreground" />;
                    }
                  };

                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'approved':
                        return 'text-green-500 bg-green-50 border-green-200';
                      case 'pending':
                        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
                      case 'revision_needed':
                        return 'text-orange-600 bg-orange-50 border-orange-200';
                      default:
                        return 'text-muted-foreground bg-muted border-border';
                    }
                  };

                  const getStatusText = (status: string) => {
                    switch (status) {
                      case 'approved':
                        return 'Approved';
                      case 'pending':
                        return 'Under Review';
                      case 'revision_needed':
                        return 'Revision Needed';
                      default:
                        return 'Unknown';
                    }
                  };

                  return (
                    <div key={submission.id} className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img src={submission.image} alt={submission.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-semibold mb-1">{submission.name}</h4>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">{submission.category}</Badge>
                                <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                                  {getStatusIcon(submission.status)}
                                  <span className="ml-1">{getStatusText(submission.status)}</span>
                                </Badge>
                              </div>
                            </div>
                            
                            {submission.score && (
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{submission.score}</div>
                                <div className="text-xs text-muted-foreground">Score</div>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-4 text-sm">{submission.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Submitted:</span>
                              <span className="ml-2 font-medium">
                                {new Date(submission.submittedDate).toLocaleDateString()}
                              </span>
                            </div>
                            {submission.reviewDate && (
                              <div>
                                <span className="text-muted-foreground">Reviewed:</span>
                                <span className="ml-2 font-medium">
                                  {new Date(submission.reviewDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {submission.feedback && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <div className="text-sm font-medium text-muted-foreground mb-1">Reviewer Feedback:</div>
                              <p className="text-sm">{submission.feedback}</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {submission.status === 'revision_needed' && (
                              <Button variant="default" size="sm">
                                Submit Revision
                              </Button>
                            )}
                            {submission.status === 'approved' && (
                              <Button variant="ghost" size="sm">
                                View Project Page
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
