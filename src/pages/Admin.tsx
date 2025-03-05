
import { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  BarChart, 
  Shield, 
  BadgeCheck 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <AnimatedTransition type="scale" background="gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your educational platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Admin Actions
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="forums">Forums</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Total Users
                  </CardTitle>
                  <CardDescription>Active student and teacher accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Active Courses
                  </CardTitle>
                  <CardDescription>Currently published courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 8%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Forum Activity
                  </CardTitle>
                  <CardDescription>Posts in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 24%</span> from last week
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Platform Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    Recent Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">New Course: Advanced Mathematics</p>
                          <p className="text-sm text-muted-foreground">Submitted by Prof. Johnson</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Review</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 flex items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">User management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage all courses and materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 flex items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">Course management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="forums">
            <Card>
              <CardHeader>
                <CardTitle>Forum Management</CardTitle>
                <CardDescription>Manage forum posts and moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 flex items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">Forum management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Admin;
