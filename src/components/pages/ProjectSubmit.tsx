import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { ArrowLeft, Upload, Plus, X, Globe, Twitter, Github, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export function ProjectSubmit() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    category: '',
    ecosystem: 'Cardano',
    website: '',
    twitter: '',
    github: '',
    tags: [] as string[],
    logo: null as File | null,
    teamMembers: [{ name: '', role: '', email: '' }],
    roadmapItems: [{ phase: '', title: '', description: '', timeline: '' }]
  });
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const categories = ['DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Governance', 'Staking', 'Exchange', 'Other'];
  const ecosystems = ['Cardano', 'Ethereum', 'Polygon', 'Solana', 'Other'];

  const validateStep = (stepNumber: number) => {
    const stepErrors: {[key: string]: string} = {};

    switch (stepNumber) {
      case 1:
        if (!formData.name.trim()) stepErrors.name = 'Project name is required';
        if (!formData.description.trim()) stepErrors.description = 'Description is required';
        if (!formData.category) stepErrors.category = 'Category is required';
        break;
      case 2:
        if (!formData.fullDescription.trim()) stepErrors.fullDescription = 'Full description is required';
        if (formData.tags.length === 0) stepErrors.tags = 'At least one tag is required';
        break;
      case 3:
        if (!formData.website.trim()) stepErrors.website = 'Website URL is required';
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to submit a project');
      navigate('/login');
      return;
    }

    if (validateStep(3)) {
      // Simulate API call
      toast.success('Project submitted successfully! It will be reviewed within 24 hours.');
      navigate('/project');
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, { name: '', role: '', email: '' }]
    });
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const updatedMembers = formData.teamMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const removeTeamMember = (index: number) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index)
    });
  };

  const progress = (step / 4) * 100;

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-[#6c5ce7] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground text-center mb-6">
            You need to be logged in to submit a project for evaluation.
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
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/project')}
          className="hover:bg-[#6c5ce7]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of 4</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            {['Basic Info', 'Details', 'Links & Team', 'Review'].map((stepName, index) => (
              <div key={index} className={`${step > index ? 'text-[#6c5ce7]' : step === index + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm ${
                  step > index + 1 ? 'bg-[#6c5ce7] text-white' : 
                  step === index + 1 ? 'bg-[#6c5ce7]/20 text-[#6c5ce7] border-2 border-[#6c5ce7]' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className="text-xs">{stepName}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Steps */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Project Details'}
            {step === 3 && 'Links & Team'}
            {step === 4 && 'Review & Submit'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your project name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of your project (max 200 characters)"
                  maxLength={200}
                  className={errors.description ? 'border-red-500' : ''}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.description.length}/200 characters
                </p>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label>Ecosystem</Label>
                  <Select value={formData.ecosystem} onValueChange={(value) => setFormData({...formData, ecosystem: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ecosystems.map((ecosystem) => (
                        <SelectItem key={ecosystem} value={ecosystem}>{ecosystem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullDescription">Full Description *</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  placeholder="Detailed description of your project, its goals, and value proposition"
                  rows={6}
                  className={errors.fullDescription ? 'border-red-500' : ''}
                />
                {errors.fullDescription && <p className="text-red-500 text-sm mt-1">{errors.fullDescription}</p>}
              </div>

              <div>
                <Label>Tags *</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
                {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Links</h3>
                
                <div>
                  <Label htmlFor="website">Website URL *</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://yourproject.com"
                      className={`pl-10 ${errors.website ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twitter">Twitter (Optional)</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                        placeholder="@yourproject"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="github">GitHub (Optional)</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="github"
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        placeholder="yourproject/repository"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <Button type="button" onClick={addTeamMember} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
                    <Input
                      placeholder="Full Name"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                      />
                      {formData.teamMembers.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeTeamMember(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review Your Submission</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">PROJECT NAME</h4>
                    <p>{formData.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">CATEGORY</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{formData.ecosystem}</Badge>
                      <Badge variant="secondary">{formData.category}</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">DESCRIPTION</h4>
                    <p className="text-sm">{formData.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">TAGS</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">WEBSITE</h4>
                    <p className="text-sm text-[#6c5ce7]">{formData.website}</p>
                  </div>

                  {formData.twitter && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">TWITTER</h4>
                      <p className="text-sm">{formData.twitter}</p>
                    </div>
                  )}

                  {formData.github && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">GITHUB</h4>
                      <p className="text-sm">{formData.github}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">TEAM</h4>
                    <div className="space-y-2">
                      {formData.teamMembers.filter(member => member.name).map((member, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{member.name}</span>
                          {member.role && <span className="text-muted-foreground"> - {member.role}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By submitting this project, you confirm that all information provided is accurate and you have the right to submit this project for evaluation. The VCOINCHECK team will review your submission within 24-48 hours.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/project')}>
                Cancel
              </Button>
              {step < 4 ? (
                <Button onClick={handleNext} className="bg-[#6c5ce7] hover:bg-[#5a4fcf]">
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-[#6c5ce7] hover:bg-[#5a4fcf]">
                  Submit Project
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}