import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useSupabase } from '../../contexts/supabaseContext'
import { 
  Search, Calendar, Tag, Eye, Heart, ExternalLink, Newspaper, Plus, Filter, 
  TrendingUp, Zap, Coins, Shield, BarChart3, Users, Globe, Clock, ChevronRight,
  BookmarkPlus, Share2
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'
import { Separator } from '../ui/Separator'
import { ImageWithFallback } from '../ui/ImageWithFallback'

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export function News() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { client, isConnected } = useSupabase()
  const [articles, setArticles] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Check if user has permission to create news
  const canCreateNews = isAuthenticated && user && ['admin', 'super_moderator', 'project_moderator', 'library_moderator', 'community_moderator'].includes(user.role);

  // ✅ Fetch News từ Supabase
  useEffect(() => {
    if (!isConnected) return

    const fetchNews = async () => {
      const { data, error } = await client
        .from('news')
        .select('*')
        .eq('is_published', true)  // Chỉ lấy published articles
        .order('published_at', { ascending: false })

      if (error) {
        console.error('❌ Error fetching news:', error)
      } else {
        setArticles(data || [])
      }
    }

    fetchNews()

    // ✅ Realtime update
    const channel = client
      .channel('news-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news' },
        () => {
          fetchNews()
        }
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [isConnected, client])

  // ✅ Lọc tin theo search + tag
  const filteredNews = articles.filter((article) => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.teaser?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.body?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = selectedTag
      ? article.metadata?.tags?.includes(selectedTag)
      : true

    return matchesSearch && matchesTag
  })

  // ✅ Tách featured / trending / regular
  const featuredArticle = articles.find((article) => article.metadata?.featured)
  const trendingArticles = articles
    .filter((article) => article.metadata?.trending && !article.metadata?.featured)
    .slice(0, 3)
  const regularArticles = filteredNews.filter((article) => !article.metadata?.featured)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Blockchain News</h1>
              <p className="text-muted-foreground">Stay updated with the latest developments in blockchain and cryptocurrency</p>
            </div>
          </div>
          
          {canCreateNews && (
            <Button 
              onClick={() => navigate('/news/create')}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Create News
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news, articles, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {['Cardano', 'Blockchain', 'Catalyst', 'Community'].map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className="gap-2"
            >
              <Tag className="w-4 h-4" />
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <Card className="bg-gradient-to-r from-card to-card/50 border-primary/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <div className="relative h-64 lg:h-full">
                <ImageWithFallback
                  src={featuredArticle.metadata?.image || '/default.jpg'}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 line-clamp-3">
                {featuredArticle.title}
              </h2>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {featuredArticle.teaser}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(featuredArticle.published_at || featuredArticle.created_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatNumber(featuredArticle.metadata?.views || 0)}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {formatNumber(featuredArticle.metadata?.likes || 0)}
                </div>
              </div>
              
              <Button className="gap-2">
                Read More
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main News Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid gap-4">
            {regularArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 flex-shrink-0">
                    <div className="relative h-48 md:h-full">
                      <ImageWithFallback
                        src={article.metadata?.image || '/default.jpg'}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      {article.metadata?.trending && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {article.teaser}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.published_at || article.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(article.metadata?.views || 0)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatNumber(article.metadata?.likes || 0)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        Read More
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Articles */}
          {trendingArticles.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Trending Now</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingArticles.map((article) => (
                  <div key={article.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(article.published_at || article.created_at)}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatNumber(article.metadata?.views || 0)} views
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">News Stats</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Published Articles</span>
                <span className="font-medium">{articles.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Featured</span>
                <span className="font-medium">{articles.filter(a => a.metadata?.featured).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Trending</span>
                <span className="font-medium">{articles.filter(a => a.metadata?.trending).length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Subscribe Newsletter */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <Newspaper className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold">Stay Informed</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest blockchain news delivered to your inbox
                </p>
                <Button className="w-full">
                  Subscribe to Newsletter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
