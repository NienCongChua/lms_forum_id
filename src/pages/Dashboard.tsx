
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bell, Book, Calendar, Clock, MessageCircle, MoreHorizontal, Users } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

// Sample course data
const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Programming",
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    teacher: "David Kim",
    nextSession: "Tomorrow, 10:00 AM",
    category: "Computer Science"
  },
  {
    id: "2",
    title: "Digital Marketing Fundamentals",
    progress: 45,
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    teacher: "Sarah Johnson",
    nextSession: "Wednesday, 2:00 PM",
    category: "Marketing"
  }
];

// Sample upcoming sessions
const upcomingSessions = [
  {
    id: "1",
    title: "Advanced JavaScript Concepts",
    date: "2023-06-22T10:00:00",
    duration: "1.5 hours",
    teacher: "Robert Chen",
    participants: 18
  },
  {
    id: "2",
    title: "UX Design Principles",
    date: "2023-06-23T15:30:00",
    duration: "1 hour",
    teacher: "Michelle Wong",
    participants: 12
  },
  {
    id: "3",
    title: "Data Analysis with Python",
    date: "2023-06-24T13:00:00",
    duration: "2 hours",
    teacher: "James Peterson",
    participants: 24
  }
];

// Sample recent activities
const recentActivities = [
  {
    id: "1",
    type: "comment",
    content: "Alex commented on your question in 'Programming Fundamentals'",
    time: "2 hours ago",
    read: false
  },
  {
    id: "2",
    type: "grade",
    content: "You received a grade for 'Web Development Assignment 3'",
    time: "Yesterday",
    read: false
  },
  {
    id: "3",
    type: "course",
    content: "New material added to 'Introduction to Programming'",
    time: "2 days ago",
    read: true
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AnimatedTransition type="fade" background="gradient">
      <div className="container mx-auto px-4 py-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-full backdrop-blur-sm bg-white/50 border-white/20">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm" className="rounded-full">
              My Profile
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 backdrop-blur-sm bg-white/50 border border-white/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="forums">Forums</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">4</div>
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 in progress, 2 completed
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next: Tomorrow at 10:00 AM
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Forum Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">12</div>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 new replies to your posts
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* In Progress Courses */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">In Progress Courses</h2>
                <Link to="/courses">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden backdrop-blur-sm bg-white/60 border-white/20">
                    <div className="flex h-full">
                      <div className="w-1/3 h-auto">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {course.category}
                            </Badge>
                            <h3 className="font-medium text-base mb-1">{course.title}</h3>
                            <p className="text-xs text-muted-foreground mb-3">
                              Teacher: {course.teacher}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                        
                        <div className="flex items-center mt-3 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Next: {course.nextSession}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upcoming Sessions</h2>
                <Button variant="ghost" size="sm">View Calendar</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingSessions.map((session) => {
                  const sessionDate = new Date(session.date);
                  const formattedDate = sessionDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  const formattedTime = sessionDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <Card key={session.id} className="backdrop-blur-sm bg-white/60 border-white/20">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline">
                            {formattedDate}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardTitle className="text-base mt-2">{session.title}</CardTitle>
                        <CardDescription>with {session.teacher}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{formattedTime} ({session.duration})</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{session.participants}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className={`p-4 flex items-start ${!activity.read ? 'bg-primary/5' : ''}`}>
                        <div className="flex-shrink-0 mr-4">
                          {activity.type === 'comment' && (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <MessageCircle className="h-5 w-5 text-blue-500" />
                            </div>
                          )}
                          {activity.type === 'grade' && (
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Book className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                          {activity.type === 'course' && (
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <Book className="h-5 w-5 text-purple-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm">{activity.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                        {!activity.read && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="text-center py-16 backdrop-blur-sm bg-white/30 rounded-lg border border-white/20">
              <h2 className="text-xl font-bold mb-2">Courses Tab Content</h2>
              <p className="text-muted-foreground mb-4">This tab would show all enrolled courses with detailed progress and materials.</p>
              <Button>Explore More Courses</Button>
            </div>
          </TabsContent>

          <TabsContent value="forums">
            <div className="text-center py-16 backdrop-blur-sm bg-white/30 rounded-lg border border-white/20">
              <h2 className="text-xl font-bold mb-2">Forums Tab Content</h2>
              <p className="text-muted-foreground mb-4">This tab would show your forum activity, subscribed threads, and recent discussions.</p>
              <Button>Go to Forums</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;
