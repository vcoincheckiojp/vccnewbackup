import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { Badge } from '../ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Separator } from '../ui/Separator';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { 
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Plus,
  Calendar,
  Clock,
  Globe,
  Zap,
  Coins,
  Shield,
  BarChart3,
  Users,
  Tag,
  FileText,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '../ui/utils';

const categories = [
  { value: 'Technology', label: 'Technology', icon: Zap },
  { value: 'DeFi', label: 'DeFi', icon: Coins },
  { value: 'Security', label: 'Security', icon: Shield },
  { value: 'NFT', label: 'NFT', icon: BarChart3 },
  { value: 'Regulation', label: 'Regulation', icon: Users },
  { value: 'News', label: 'General News', icon: Globe }
];

const priorities = [
  { value: 'low', label: 'Low Priority', color: 'bg-gray-500' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500' },
  { value: 'high', label: 'High Priority', color: 'bg-orange-500' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
];

export function CreateNews() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    teaser: '',
    body: '',
    category: '',
    tags: '',
    featuredImage: '',
    priority: 'medium',
    featured: false,
    trending: false,
    readTime: 5,
    source: 'VCOINCHECK Editorial'
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [parsedTags, setParsedTags] = useState<string[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !parsedTags.includes(tagInput.trim())) {
      const newTags = [...parsedTags, tagInput.trim()];
      setParsedTags(newTags);
      setFormData(prev => ({
        ...prev,
        tags: newTags.join(', ')
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = parsedTags.filter(tag => tag !== tagToRemove);
    setParsedTags(newTags);
    setFormData(prev => ({
      ...prev,
      tags: newTags.join(', ')
    }));
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (isDraft = false) => {
    if (!formData.title || !formData.teaser || !formData.body || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create proper database object structure
      const newsArticle = {
        author_id: user?.id, // UUID from user context
        title: formData.title,
        slug: generateSlug(formData.title),
        teaser: formData.teaser,
        body: formData.body,
        is_published: !isDraft,
        published_at: isDraft ? null : new Date().toISOString(),
        metadata: {
          featured: formData.featured,
          trending: formData.trending,
          tags: parsedTags,
          image: formData.featuredImage,
          priority: formData.priority,
          source: formData.source,
          category: formData.category,
          readTime: formData.readTime,
          views: 0,
          likes: 0
        }
      };

      // Here you would save to Supabase
      console.log('Creating news article:', newsArticle);
      
      toast.success(`News article ${isDraft ? 'saved as draft' : 'published'} successfully!`);
      navigate('/news');
      
    } catch (error) {
      toast.error('Failed to create news article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue);
    if (!category) return <Globe className="w-4 h-4" />;
    const IconComponent = category.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    // Strip HTML tags and get plain text for word count
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  React.useEffect(() => {
    const readTime = estimateReadTime(formData.body);
    setFormData(prev => ({ ...prev, readTime }));
  }, [formData.body]);

  if (previewMode) {
    return (
      <div className="space-y-6">
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(false)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Edit
            </Button>
            <h1 className="text-2xl font-bold">Preview Article</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
            >
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Publish Article
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <Card className="overflow-hidden">
          <div className="relative h-64">
            {formData.featuredImage ? (
              <ImageWithFallback
                src={formData.featuredImage}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
            {formData.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              </div>
            )}
            {formData.trending && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-orange-500 text-white">Trending</Badge>
              </div>
            )}
          </div>
          
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="gap-1">
                {getCategoryIcon(formData.category)}
                {formData.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                from {formData.source}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">{formData.teaser}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.role}</div>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Just now
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formData.readTime} min read
                </div>
              </div>
            </div>
            
            <div 
              className={cn(
                "prose max-w-none",
                "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6",
                "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5",
                "[&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4",
                "[&_p]:mb-3 [&_p]:leading-relaxed",
                "[&_ul]:mb-4 [&_ul]:pl-6 [&_li]:mb-1",
                "[&_ol]:mb-4 [&_ol]:pl-6 [&_li]:mb-1",
                "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-muted-foreground [&_blockquote]:bg-muted/20 [&_blockquote]:py-2 [&_blockquote]:rounded-r",
                "[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre]:border",
                "[&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:border",
                "[&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80",
                "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded [&_img]:my-4 [&_img]:shadow-md",
                "[&_strong]:font-bold",
                "[&_em]:italic",
                "[&_u]:underline"
              )}
              dangerouslySetInnerHTML={{ __html: formData.body }}
            />
            
            {parsedTags.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {parsedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/news')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create News Article</h1>
            <p className="text-muted-foreground">Share the latest blockchain and cryptocurrency news</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(true)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
          >
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Publish Article
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Article Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter article title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teaser">Teaser *</Label>
                <Textarea
                  id="teaser"
                  placeholder="Write a compelling teaser that summarizes the article..."
                  value={formData.teaser}
                  onChange={(e) => handleInputChange('teaser', e.target.value)}
                  rows={3}
                />
                <div className="text-xs text-muted-foreground">
                  {formData.teaser.length}/300 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Article Content *</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => handleInputChange('body', e.target.value)}
                  placeholder="Write your article content here..."
                  className="min-h-[300px] border-2 focus-within:border-primary/50 transition-colors"
                />
                <div className="text-xs text-muted-foreground">
                  Estimated read time: {formData.readTime} minutes
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.featuredImage}
                  onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                />
              </div>
              
              {formData.featuredImage && (
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={formData.featuredImage}
                    alt="Featured image preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {parsedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {parsedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Article Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Article Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <category.icon className="w-4 h-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                          {priority.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Featured Article</Label>
                    <p className="text-sm text-muted-foreground">Display prominently on news page</p>
                  </div>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Trending</Label>
                    <p className="text-sm text-muted-foreground">Mark as trending content</p>
                  </div>
                  <Switch
                    checked={formData.trending}
                    onCheckedChange={(checked) => handleInputChange('trending', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Info */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span>Article will be published immediately</span>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Author: {user?.name}</div>
                <div>Role: {user?.role}</div>
                <div>Date: {new Date().toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Writing Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use clear, engaging headlines</li>
                  <li>• Include relevant blockchain terms</li>
                  <li>• Add credible sources</li>
                  <li>• Use appropriate tags</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
