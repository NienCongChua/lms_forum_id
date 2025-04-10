
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, Users, Video } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

// Sample event data
const events = [
  {
    id: 1,
    title: 'Advanced JavaScript Course',
    date: new Date(2025, 3, 12, 10, 0),
    endTime: new Date(2025, 3, 12, 11, 30),
    location: 'Virtual Classroom 1',
    type: 'course',
    instructor: 'Dr. Sarah Johnson',
    participants: 18,
    isOnline: true,
  },
  {
    id: 2,
    title: 'React Hooks Workshop',
    date: new Date(2025, 3, 15, 14, 0),
    endTime: new Date(2025, 3, 15, 16, 0),
    location: 'Virtual Classroom 3',
    type: 'workshop',
    instructor: 'Robert Chen',
    participants: 12,
    isOnline: true,
  },
  {
    id: 3,
    title: 'Web Development Project Review',
    date: new Date(2025, 3, 18, 15, 30),
    endTime: new Date(2025, 3, 18, 16, 30),
    location: 'Main Building, Room 204',
    type: 'meeting',
    instructor: 'James Peterson',
    participants: 5,
    isOnline: false,
  }
];

const Schedule = () => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  
  // Get all days in the current week
  const getWeekDays = (date: Date) => {
    const current = new Date(date);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    
    const monday = new Date(current.setDate(diff));
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      weekDays.push(nextDay);
    }
    
    return weekDays;
  };
  
  const weekDays = getWeekDays(date || today);
  
  // Filter events for the selected date or week
  const filteredEvents = events.filter((event) => {
    if (view === 'day' && date) {
      return event.date.toDateString() === date.toDateString();
    } else if (view === 'week') {
      return weekDays.some(day => day.toDateString() === event.date.toDateString());
    }
    return true;
  });
  
  // Format time to display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get event badge color based on type
  const getEventBadge = (type: string) => {
    switch (type) {
      case 'course':
        return <Badge className="bg-blue-500">Course</Badge>;
      case 'workshop':
        return <Badge className="bg-purple-500">Workshop</Badge>;
      case 'meeting':
        return <Badge className="bg-green-500">Meeting</Badge>;
      default:
        return <Badge>Event</Badge>;
    }
  };
  
  // Navigate to previous/next day or week
  const navigate = (direction: 'prev' | 'next') => {
    if (!date) return;
    
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setDate(newDate);
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Schedule</h1>
            <p className="text-muted-foreground">Manage your courses and upcoming events</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Button variant="outline" size="sm" onClick={() => setView('day')}>
              Day
            </Button>
            <Button variant={view === 'week' ? 'default' : 'outline'} size="sm" onClick={() => setView('week')}>
              Week
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Upcoming Events</h3>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div 
                        key={event.id} 
                        className="p-3 border rounded-md flex items-start space-x-3 cursor-pointer hover:bg-secondary/50 transition"
                      >
                        <div className="w-12 h-12 rounded-md bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">
                            {event.date.toLocaleString('default', { month: 'short' })}
                          </span>
                          <span className="text-lg font-bold leading-none">
                            {event.date.getDate()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(event.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {view === 'day' && date 
                      ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                      : view === 'week'
                        ? `${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                        : 'Monthly View'
                    }
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => navigate('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigate('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDate(today)}>
                      Today
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                {view === 'week' && (
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day, index) => (
                      <div 
                        key={index}
                        className={`text-center p-2 rounded-md ${
                          day.toDateString() === today.toDateString() 
                            ? 'bg-primary/10 font-medium' 
                            : ''
                        }`}
                      >
                        <p className="text-xs text-muted-foreground">
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="text-sm font-medium">{day.getDate()}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="p-4 border rounded-md hover:bg-secondary/50 transition cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{event.title}</h3>
                          {getEventBadge(event.type)}
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          <div className="flex items-start space-x-3">
                            <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">
                                {event.date.toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'long', 
                                  day: 'numeric'
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatTime(event.date)} - {formatTime(event.endTime)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex items-center">
                              <span className="text-sm">{event.location}</span>
                              {event.isOnline && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  <Video className="h-3 w-3 mr-1" /> 
                                  Online
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">
                                Instructor: {event.instructor}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {event.participants} participant{event.participants !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex mt-4">
                          <Button size="sm">
                            Join Session
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="font-medium text-lg mt-4">No events scheduled</h3>
                    <p className="text-muted-foreground mt-1">
                      {view === 'day' 
                        ? 'There are no events scheduled for this day.' 
                        : 'There are no events scheduled for this week.'}
                    </p>
                    <Button variant="outline" className="mt-4">
                      Browse Available Courses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Schedule;
