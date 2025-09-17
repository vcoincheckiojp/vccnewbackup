import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, Clock, MapPin, Users, ExternalLink, List, CalendarDays, Plus } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Cardano DeFi Summit 2024',
    date: 'March 15, 2024',
    time: '10:00 AM - 6:00 PM PST',
    location: 'Virtual Event',
    attendees: 1247,
    type: 'Conference',
    status: 'Open',
    description: 'Join leading DeFi developers and enthusiasts for a day of insights into Cardano\'s decentralized finance ecosystem.'
  },
  {
    id: 2,
    title: 'Smart Contract Workshop',
    date: 'March 20, 2024',
    time: '2:00 PM - 5:00 PM PST',
    location: 'Online Workshop',
    attendees: 156,
    type: 'Workshop',
    status: 'Open',
    description: 'Hands-on workshop covering Plutus smart contract development and best practices.'
  },
  {
    id: 3,
    title: 'Community AMA with Core Developers',
    date: 'March 25, 2024',
    time: '7:00 PM - 8:30 PM PST',
    location: 'Discord Live',
    attendees: 892,
    type: 'AMA',
    status: 'Open',
    description: 'Ask questions directly to Cardano core developers about the latest updates and roadmap.'
  },
];

const pastEvents = [
  {
    title: 'NFT Marketplace Deep Dive',
    date: 'February 28, 2024',
    attendees: 543,
    recording: true
  },
  {
    title: 'Staking Pool Operators Meetup',
    date: 'February 20, 2024',
    attendees: 234,
    recording: true
  },
  {
    title: 'Catalyst Funding Workshop',
    date: 'February 15, 2024',
    attendees: 678,
    recording: false
  },
];

const eventDates = [
  new Date(2024, 2, 15), // March 15, 2024
  new Date(2024, 2, 20), // March 20, 2024
  new Date(2024, 2, 25), // March 25, 2024
];

export function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return upcomingEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const renderListView = () => (
    <div className="space-y-4">
      <h2>Upcoming Events</h2>
      
      <div className="grid gap-6">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge 
                      variant={event.status === 'Open' ? 'default' : 'secondary'}
                      className={event.status === 'Open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="w-fit">
                    {event.type}
                  </Badge>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Register Now
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCalendarView = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                event: eventDates,
              }}
              modifiersStyles={{
                event: {
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  fontWeight: 'bold',
                },
              }}
              className="w-full"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Events scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="bg-card border-border h-fit">
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                `Events on ${selectedDate.toLocaleDateString()}`
              ) : (
                'Select a date to view events'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{event.title}</h4>
                        <Badge variant="outline" className="mt-1">
                          {event.type}
                        </Badge>
                      </div>
                      <Badge 
                        variant={event.status === 'Open' ? 'default' : 'secondary'}
                        className={event.status === 'Open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                      >
                        {event.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Register Now
                      </Button>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {selectedDate ? 'No events scheduled for this date' : 'Select a date to view events'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>Community Events</h1>
          <p className="text-muted-foreground mt-2">Stay updated with the latest blockchain events and workshops</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/events/submit">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Submit Your Event
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? renderListView() : renderCalendarView()}



      {/* Past Events Section */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <h2>Past Events</h2>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <div>
                      <h4 className="font-medium mb-1">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{event.date}</span>
                        <span>{event.attendees} attended</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.recording && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Recording Available
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Event Calendar CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3>Never Miss an Event</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our event calendar and get notified about upcoming workshops, AMAs, and conferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Subscribe to Calendar
            </Button>
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              Propose Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}