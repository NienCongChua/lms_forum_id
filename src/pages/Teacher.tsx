
import { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Calendar, 
  MessageSquare, 
  FileText, 
  PlusCircle,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const Teacher = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <AnimatedTransition type="slide" background="gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Teacher Portal</h1>
            <p className="text-muted-foreground mt-1">Manage your courses and students</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Course
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Active Students
                  </CardTitle>
                  <CardDescription>Students enrolled in your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 15%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Active Courses
                  </CardTitle>
                  <CardDescription>Your published courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 1</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Student Messages
                  </CardTitle>
                  <CardDescription>Unread messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-red-500">↑ 5</span> new today
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { time: 'Today, 10:00 AM', title: 'Introduction to Physics', students: 24 },
                      { time: 'Tomorrow, 2:00 PM', title: 'Advanced Mathematics Tutorial', students: 18 },
                      { time: 'Friday, 11:00 AM', title: 'Office Hours', students: 'Open' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {typeof item.students === 'number' ? `${item.students} students` : item.students}
                          </span>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Course Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'Introduction to Physics', progress: 85 },
                    { title: 'Advanced Mathematics', progress: 60 },
                    { title: 'Computer Science 101', progress: 40 },
                  ].map((course, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{course.title}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Submissions
                </CardTitle>
                <CardDescription>Student assignments pending review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Final Project Submission</p>
                          <p className="text-sm text-muted-foreground">Student: John Doe</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">2 hours ago</span>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View All Submissions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Manage your course content and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 flex items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">Course management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 flex items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">Student management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Upload and manage your teaching materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 flex items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">Course materials interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Teacher;
