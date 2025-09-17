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
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Plus, X } from 'lucide-react';

const categories = [
  'Fundamental',
  'Platform', 
  'Technology',
  'Finance',
  'Governance'
];

const suggestedTags = [
  'Cardano', 'Blockchain', 'DeFi', 'NFT', 'Smart Contracts', 'Staking', 
  'Governance', 'Catalyst', 'Development', 'Security', 'Consensus',
  'Cryptocurrency', 'Decentralization', 'Protocol', 'Network'
];

export function NewTerm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    term: '',
    category: '',
    definition: '',
    relatedLinks: [''],
    tags: [] as string[]
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

  const handleRelatedLinkChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      relatedLinks: prev.relatedLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const addRelatedLink = () => {
    setFormData(prev => ({
      ...prev,
      relatedLinks: [...prev.relatedLinks, '']
    }));
  };

  const removeRelatedLink = (index: number) => {
    if (formData.relatedLinks.length > 1) {
      setFormData(prev => ({
        ...prev,
        relatedLinks: prev.relatedLinks.filter((_, i) => i !== index)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.term.trim()) {
      toast.error('Term name is required');
      return;
    }
    
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }
    
    if (!formData.definition.trim()) {
      toast.error('Definition is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would create the term
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      toast.success('Term created successfully');
      navigate('/library/dictionary');
    } catch (error) {
      toast.error('Failed to create term');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/library/dictionary');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/library/dictionary">Dictionary</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New</BreadcrumbPage>
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
          Back to Dictionary
        </Button>
        <div className="border-l border-border h-6"></div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Term</h1>
          <p className="text-muted-foreground mt-1">Add a new term to the blockchain dictionary</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Term Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Term Name */}
            <div className="space-y-2">
              <Label htmlFor="term">Term Name *</Label>
              <Input
                id="term"
                placeholder="Enter the term name..."
                value={formData.term}
                onChange={(e) => handleInputChange('term', e.target.value)}
                className="w-full"
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

            {/* Definition */}
            <div className="space-y-2">
              <Label htmlFor="definition">Definition *</Label>
              <Textarea
                id="definition"
                placeholder="Provide a clear and comprehensive definition..."
                value={formData.definition}
                onChange={(e) => handleInputChange('definition', e.target.value)}
                className="w-full min-h-[120px] resize-vertical"
              />
            </div>

            {/* Related Links */}
            <div className="space-y-2">
              <Label>Related Links (Optional)</Label>
              <div className="space-y-3">
                {formData.relatedLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={link}
                      onChange={(e) => handleRelatedLinkChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.relatedLinks.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRelatedLink(index)}
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
                  onClick={addRelatedLink}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add More
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <div className="space-y-3">
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
              'Save Term'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}