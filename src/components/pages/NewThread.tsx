import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Plus, X, MessageCircle, Hash, Users, AlertTriangle, Pin } from 'lucide-react';

const threadCategories = [
  { name: 'General Discussion', description: 'General blockchain and crypto discussions' },
  { name: 'Technical Help', description: 'Get help with technical issues' },
  { name: 'Project Reviews', description: 'Discuss and review blockchain projects' },
  { name: 'DeFi Discussion', description: 'Decentralized Finance topics' },
  { name: 'NFT Marketplace', description: 'NFT trading and collections' },
  { name: 'Development', description: 'Smart contract and dApp development' },
  { name: 'Trading & Markets', description: 'Market analysis and trading strategies' },
  { name: 'News & Updates', description: 'Latest blockchain news and updates' },
  { name: 'Community Events', description: 'Event announcements and discussions' },
  { name: 'Off Topic', description: 'Non-crypto related discussions' }
];

const threadTypes = [
  { value: 'discussion', label: 'Discussion', icon: MessageCircle, description: 'Start a general discussion' },
  { value: 'question', label: 'Question', icon: AlertTriangle, description: 'Ask for help or advice' },
  { value: 'announcement', label: 'Announcement', icon: Pin, description: 'Share important news or updates' },
  { value: 'poll', label: 'Poll', icon: Users, description: 'Create a community poll' }
];

const suggestedTags = [
  'Cardano', 'Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Smart Contracts', 
  'Staking', 'Trading', 'Analysis', 'Tutorial', 'News', 'Opinion',
  'Development', 'Security', 'Governance', 'Community'
];

export function NewThread() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    type: 'discussion',
    tags: [] as string[],
    isPinned: false,
    isLocked: false,
    allowAnonymous: false,
    notifyOnReply: true,
    pollOptions: ['', ''] // For poll type threads
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const addPollOption = () => {
    setFormData(prev => ({
      ...prev,
      pollOptions: [...prev.pollOptions, '']
    }));
  };

  const removePollOption = (index: number) => {
    if (formData.pollOptions.length > 2) {
      setFormData(prev => ({
        ...prev,
        pollOptions: prev.pollOptions.filter((_, i) => i !== index)
      }));
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      pollOptions: prev.pollOptions.map((option, i) => i === index ? value : option)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Thread title is required');
      return;
    }
    
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Thread content is required');
      return;
    }

    if (formData.type === 'poll') {
      const validOptions = formData.pollOptions.filter(option => option.trim());
      if (validOptions.length < 2) {
        toast.error('Poll must have at least 2 options');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would create the thread
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Thread created successfully');
      navigate('/community');
    } catch (error) {
      toast.error('Failed to create thread');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/community');
  };

  const selectedThreadType = threadTypes.find(type => type.value === formData.type);
  const selectedCategory = threadCategories.find(cat => cat.name === formData.category);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/community">Community</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Thread</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </Button>
        <div className="border-l border-border h-6"></div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Thread</h1>
          <p className="text-muted-foreground mt-1">Start a new discussion in the community</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thread Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Thread Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your thread..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your message here..."
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="min-h-[200px] resize-vertical"
                  />
                  <div className="text-sm text-muted-foreground">
                    You can use markdown formatting. Be respectful and follow community guidelines.
                  </div>
                </div>

                {/* Poll Options - Show only for poll type */}
                {formData.type === 'poll' && (
                  <div className="space-y-4">
                    <Label>Poll Options</Label>
                    <div className="space-y-3">
                      {formData.pollOptions.map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handlePollOptionChange(index, e.target.value)}
                            className="flex-1"
                          />
                          {formData.pollOptions.length > 2 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removePollOption(index)}
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
                        onClick={addPollOption}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thread Type */}
            <Card>
              <CardHeader>
                <CardTitle>Thread Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {threadTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.value}
                        className={`border border-border rounded-lg p-3 cursor-pointer transition-colors ${
                          formData.type === type.value
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => handleInputChange('type', type.value)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                    {threadCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div>
                          <div>{category.name}</div>
                          <div className="text-xs text-muted-foreground">{category.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {selectedCategory.description}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Tags
                </CardTitle>
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

            {/* Thread Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Thread Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify">Notify on replies</Label>
                  <Switch
                    id="notify"
                    checked={formData.notifyOnReply}
                    onCheckedChange={(checked) => handleInputChange('notifyOnReply', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="anonymous">Allow anonymous posting</Label>
                  <Switch
                    id="anonymous"
                    checked={formData.allowAnonymous}
                    onCheckedChange={(checked) => handleInputChange('allowAnonymous', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" />
                Create Thread
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}