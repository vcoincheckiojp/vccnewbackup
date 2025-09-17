import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../ui/breadcrumb';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Plus, X, Eye, FileText, Save, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

const categories = [
  'Blockchain Basics',
  'Cardano Ecosystem',
  'DeFi Protocols',
  'Smart Contracts',
  'NFTs & Digital Assets',
  'Governance',
  'Development',
  'Security',
  'Trading & Finance',
  'Technical Analysis'
];

const suggestedTags = [
  'Cardano', 'Blockchain', 'DeFi', 'NFT', 'Smart Contracts', 'Staking', 
  'Governance', 'Catalyst', 'Development', 'Security', 'ADA', 'Plutus',
  'Tutorial', 'Guide', 'Analysis', 'Review', 'News', 'Opinion'
];

export function NewArticle() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    tags: [] as string[],
    isFeatured: false,
    isPublished: false,
    allowComments: true,
    seoTitle: '',
    seoDescription: '',
    externalLinks: [''],
    estimatedReadTime: 5
  });

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExternalLinkChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const addExternalLink = () => {
    setFormData(prev => ({
      ...prev,
      externalLinks: [...prev.externalLinks, '']
    }));
  };

  const removeExternalLink = (index: number) => {
    if (formData.externalLinks.length > 1) {
      setFormData(prev => ({
        ...prev,
        externalLinks: prev.externalLinks.filter((_, i) => i !== index)
      }));
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput.trim());
      }
    }
  };

  const filteredTagSuggestions = suggestedTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !formData.tags.includes(tag)
  );

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  React.useEffect(() => {
    if (formData.content) {
      const readTime = estimateReadTime(formData.content);
      setFormData(prev => ({ ...prev, estimatedReadTime: readTime }));
    }
  }, [formData.content]);

  const handleSubmit = async (e: React.FormEvent, isDraft = true) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Article title is required');
      return;
    }
    
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Article content is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would create the article
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isDraft) {
        toast.success('Article saved as draft');
      } else {
        toast.success('Article published successfully');
      }
      navigate('/library/overview');
    } catch (error) {
      toast.error('Failed to save article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/library/overview');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/library/overview">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Library
          </Button>
          <div className="border-l border-border h-6"></div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Article</h1>
            <p className="text-muted-foreground mt-1">Share your knowledge with the community</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Publish Article
              </>
            )}
          </Button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <Card>
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  {formData.category && (
                    <Badge variant="outline">{formData.category}</Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {formData.estimatedReadTime} min read
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{formData.title || 'Article Title'}</h1>
                {formData.subtitle && (
                  <p className="text-xl text-muted-foreground mb-6">{formData.subtitle}</p>
                )}
                {formData.featuredImage && (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-6">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="whitespace-pre-wrap">
                  {formData.content || 'Article content will appear here...'}
                </div>
              </div>

              {/* Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
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

                  {/* Subtitle */}
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                    <Input
                      id="subtitle"
                      placeholder="Enter article subtitle..."
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your article content here..."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      className="min-h-[400px] resize-vertical"
                    />
                    <div className="text-sm text-muted-foreground text-right">
                      Estimated read time: {formData.estimatedReadTime} minutes
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief summary of the article..."
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      className="h-20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      placeholder="SEO optimized title..."
                      value={formData.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      placeholder="SEO meta description..."
                      value={formData.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      className="h-20"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Article</Label>
                    <Switch
                      id="featured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Publish Immediately</Label>
                    <Switch
                      id="published"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comments">Allow Comments</Label>
                    <Switch
                      id="comments"
                      checked={formData.allowComments}
                      onCheckedChange={(checked) => handleInputChange('allowComments', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop image or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                  <Input
                    placeholder="Or paste image URL..."
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Tags */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="gap-1 pr-1 rounded-full"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Tag Input */}
                  <div className="relative">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tags..."
                        value={tagInput}
                        onChange={(e) => {
                          setTagInput(e.target.value);
                          setShowTagSuggestions(e.target.value.length > 0);
                        }}
                        onKeyPress={handleTagInputKeyPress}
                        onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                        onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (tagInput.trim()) {
                            addTag(tagInput.trim());
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Tag Suggestions */}
                    {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-10 max-h-40 overflow-y-auto">
                        {filteredTagSuggestions.slice(0, 8).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                            onClick={() => addTag(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* External Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    External Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.externalLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="https://example.com"
                        value={link}
                        onChange={(e) => handleExternalLinkChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.externalLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeExternalLink(index)}
                          className="px-3"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExternalLink}
                    className="w-full gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Link
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}