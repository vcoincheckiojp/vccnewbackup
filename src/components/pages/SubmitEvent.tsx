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
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from 'sonner@2.0.3';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Globe, 
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  DollarSign,
  Award
} from 'lucide-react';

const eventTypes = [
  { value: 'conference', label: 'Conference', description: 'Large-scale industry conferences' },
  { value: 'workshop', label: 'Workshop', description: 'Hands-on learning sessions' },
  { value: 'meetup', label: 'Meetup', description: 'Local community gatherings' },
  { value: 'webinar', label: 'Webinar', description: 'Online educational sessions' },
  { value: 'ama', label: 'AMA', description: 'Ask Me Anything sessions' },
  { value: 'hackathon', label: 'Hackathon', description: 'Coding competitions and challenges' },
  { value: 'launch', label: 'Product Launch', description: 'New product or feature announcements' },
  { value: 'networking', label: 'Networking', description: 'Professional networking events' }
];

const eventCategories = [
  'Blockchain Technology',
  'DeFi & Finance',
  'NFTs & Digital Art',
  'Smart Contracts',
  'Cryptocurrency Trading',
  'Development & Programming',
  'Governance & DAO',
  'Security & Auditing',
  'Gaming & Metaverse',
  'Enterprise Adoption'
];

const timezones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney'
];

const suggestedTags = [
  'Cardano', 'Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Smart Contracts',
  'Workshop', 'Free', 'Online', 'In-Person', 'Developer', 'Community',
  'Educational', 'Networking', 'Launch', 'AMA', 'Hackathon'
];

export function SubmitEvent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    category: '',
    startTime: '',
    endTime: '',
    timezone: 'UTC',
    location: '',
    isOnline: false,
    meetingLink: '',
    registrationLink: '',
    website: '',
    organizer: '',
    organizerEmail: '',
    organizerWebsite: '',
    maxAttendees: '',
    isFree: true,
    price: '',
    currency: 'USD',
    featuredImage: '',
    tags: [] as string[],
    requirements: '',
    agenda: '',
    speakers: [''],
    sponsors: [''],
    isRecurring: false,
    recurringType: '',
    requiresApproval: false
  });

  const handleInputChange = (field: string, value: string | boolean | number) => {
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

  const handleArrayFieldChange = (field: 'speakers' | 'sponsors', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'speakers' | 'sponsors') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'speakers' | 'sponsors', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Event title is required');
      return;
    }
    
    if (!formData.type) {
      toast.error('Event type is required');
      return;
    }
    
    if (!formData.category) {
      toast.error('Event category is required');
      return;
    }

    if (!startDate) {
      toast.error('Start date is required');
      return;
    }

    if (!formData.startTime) {
      toast.error('Start time is required');
      return;
    }

    if (!formData.organizer.trim()) {
      toast.error('Organizer name is required');
      return;
    }

    if (!formData.organizerEmail.trim()) {
      toast.error('Organizer email is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would submit the event
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Event submitted successfully! It will be reviewed before publication.');
      navigate('/events');
    } catch (error) {
      toast.error('Failed to submit event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/events');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Submit Event</BreadcrumbPage>
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
          Back to Events
        </Button>
        <div className="border-l border-border h-6"></div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Submit Your Event</h1>
          <p className="text-muted-foreground mt-1">Share your blockchain event with the community</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event, what attendees will learn, and why they should attend..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[120px] resize-vertical"
                  />
                </div>

                {/* Type and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Event Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div>{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select end date (optional)"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="online"
                    checked={formData.isOnline}
                    onCheckedChange={(checked) => handleInputChange('isOnline', checked)}
                  />
                  <Label htmlFor="online">This is an online event</Label>
                </div>

                {formData.isOnline ? (
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      placeholder="https://zoom.us/j/..."
                      value={formData.meetingLink}
                      onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="location">Venue Address</Label>
                    <Input
                      id="location"
                      placeholder="Enter venue address..."
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agenda */}
                <div className="space-y-2">
                  <Label htmlFor="agenda">Agenda (Optional)</Label>
                  <Textarea
                    id="agenda"
                    placeholder="Event schedule and topics to be covered..."
                    value={formData.agenda}
                    onChange={(e) => handleInputChange('agenda', e.target.value)}
                    className="h-20"
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (Optional)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Prerequisites, what to bring, technical requirements..."
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    className="h-20"
                  />
                </div>

                {/* Speakers */}
                <div className="space-y-2">
                  <Label>Speakers</Label>
                  <div className="space-y-3">
                    {formData.speakers.map((speaker, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Speaker name and title"
                          value={speaker}
                          onChange={(e) => handleArrayFieldChange('speakers', index, e.target.value)}
                          className="flex-1"
                        />
                        {formData.speakers.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField('speakers', index)}
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
                      onClick={() => addArrayField('speakers')}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Speaker
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer Name *</Label>
                  <Input
                    id="organizer"
                    placeholder="Your name or organization"
                    value={formData.organizer}
                    onChange={(e) => handleInputChange('organizer', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizerEmail">Contact Email *</Label>
                  <Input
                    id="organizerEmail"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.organizerEmail}
                    onChange={(e) => handleInputChange('organizerEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizerWebsite">Website</Label>
                  <Input
                    id="organizerWebsite"
                    placeholder="https://your-website.com"
                    value={formData.organizerWebsite}
                    onChange={(e) => handleInputChange('organizerWebsite', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Registration & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Registration & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="free"
                    checked={formData.isFree}
                    onCheckedChange={(checked) => handleInputChange('isFree', checked)}
                  />
                  <Label htmlFor="free">Free event</Label>
                </div>

                {!formData.isFree && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="ADA">ADA</SelectItem>
                          <SelectItem value="BTC">BTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    placeholder="Leave empty for unlimited"
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationLink">Registration Link</Label>
                  <Input
                    id="registrationLink"
                    placeholder="https://eventbrite.com/..."
                    value={formData.registrationLink}
                    onChange={(e) => handleInputChange('registrationLink', e.target.value)}
                  />
                </div>
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

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Featured Image
                </CardTitle>
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
                Submitting...
              </>
            ) : (
              <>
                <Award className="h-4 w-4" />
                Submit Event
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}