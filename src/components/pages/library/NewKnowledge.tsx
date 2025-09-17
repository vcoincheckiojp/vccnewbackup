import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';

const categories = [
  'Cardano Knowledge',
  'Blockchain Knowledge', 
  'Catalyst Knowledge',
  'Dictionary',
  'DeFi Protocols',
  'Smart Contracts',
  'NFTs & Digital Assets',
  'Governance',
  'Staking & Delegation',
  'Development Tools'
];

const availableTags = [
  'Cardano', 'Blockchain', 'DeFi', 'NFT', 'Smart Contracts', 'Staking', 
  'Governance', 'Catalyst', 'Development', 'Security', 'Tutorial', 'Guide',
  'Advanced', 'Beginner', 'Intermediate', 'Technical', 'Non-technical'
];

export function NewKnowledge() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    file: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
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

  const filteredTagSuggestions = availableTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !formData.tags.includes(tag)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }
    
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would upload file and create knowledge entry
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      toast.success('Knowledge created successfully');
      navigate('/library/overview');
    } catch (error) {
      toast.error('Failed to create knowledge');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/library/overview');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-foreground">Create New Knowledge</h1>
          <p className="text-muted-foreground mt-1">Add new educational content to the VCOINCHECK library</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter knowledge title..."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the knowledge content..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full min-h-[120px] resize-vertical"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="space-y-3">
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 pr-1"
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
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">File Upload (Optional)</Label>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.gif"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, TXT, MD, Images (Max 10MB)
                    </p>
                  </label>
                </div>
                
                {formData.file && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{formData.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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
              'Save Knowledge'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}