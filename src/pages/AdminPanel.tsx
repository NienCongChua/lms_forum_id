
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  X, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Settings, 
  FileEdit, 
  BarChart3, 
  ShieldAlert, 
  UserPlus, 
  Trash2,
  Search,
  Download, 
  Bell,
  CheckCheck,
  Filter,
  Plus
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  
  // Sample statistics
  const stats = {
    users: 1247,
    newUsers: 38,
    courses: 52,
    discussions: 183,
    reports: 7,
  };
  
  // Sample users for the user management tab
  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'student', 
      status: 'active',
      joinDate: '2023-01-15',
      courses: 4
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      role: 'teacher', 
      status: 'active',
      joinDate: '2022-11-03',
      courses: 2
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      email: 'michael@example.com', 
      role: 'admin', 
      status: 'active',
      joinDate: '2022-06-22',
      courses: 0
    },
    { 
      id: 4, 
      name: 'Emily Wilson', 
      email: 'emily@example.com', 
      role: 'student', 
      status: 'pending',
      joinDate: '2023-04-05',
      courses: 1
    },
    { 
      id: 5, 
      name: 'David Kim', 
      email: 'david@example.com', 
      role: 'teacher', 
      status: 'suspended',
      joinDate: '2022-09-18',
      courses: 3
    },
  ];
  
  // Sample reports
  const reports = [
    {
      id: 1,
      type: 'content',
      subject: 'Inappropriate content in forum post',
      reportedBy: 'Sarah Johnson',
      date: '2023-05-10',
      status: 'pending'
    },
    {
      id: 2,
      type: 'user',
      subject: 'User spamming in discussions',
      reportedBy: 'Michael Chen',
      date: '2023-05-08',
      status: 'reviewing'
    },
    {
      id: 3,
      type: 'technical',
      subject: 'Video content not loading',
      reportedBy: 'John Doe',
      date: '2023-05-05',
      status: 'resolved'
    },
  ];
  
  // Sample system notifications
  const notifications = [
    {
      id: 1,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on May 15th from 2AM to 4AM UTC',
      target: 'all',
      status: 'scheduled',
      date: '2023-05-15'
    },
    {
      id: 2,
      title: 'New Feature Release',
      message: 'We have launched a new discussion board feature',
      target: 'students',
      status: 'sent',
      date: '2023-05-01'
    },
    {
      id: 3,
      title: 'Course Upload Guidelines Update',
      message: 'New guidelines for course materials have been published',
      target: 'teachers',
      status: 'draft',
      date: ''
    },
  ];
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Suspended</Badge>;
      case 'reviewing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Reviewing</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      case 'sent':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Sent</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your platform settings and users</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <FileEdit className="h-4 w-4 mr-2" />
              Action History
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 backdrop-blur-sm bg-white/50 border border-white/20">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{stats.users}</div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      +{stats.newUsers} new
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <p className="text-xs text-muted-foreground">
                      12% increase from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{stats.courses}</div>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      +3 new
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                    <p className="text-xs text-muted-foreground">
                      8 awaiting approval
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Forum Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{stats.discussions}</div>
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      +24 new
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground mr-1" />
                    <p className="text-xs text-muted-foreground">
                      98 comments this week
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{stats.reports}</div>
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      Needs attention
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <ShieldAlert className="h-4 w-4 text-muted-foreground mr-1" />
                    <p className="text-xs text-muted-foreground">
                      3 high priority reports
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                  <CardDescription>
                    User registrations and logins in the past 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/40" />
                    <p className="text-muted-foreground ml-2">Activity chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>Recent Actions</CardTitle>
                    <CardDescription>
                      Latest activities on the platform
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-start space-x-3 pb-4 border-b last:border-0 last:pb-0">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {['JD', 'MC', 'SJ', 'AK'][i % 4]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{['John Doe', 'Michael Chen', 'Sarah Johnson', 'Admin'][i % 4]}</span>
                            {[
                              ' created a new course "Advanced JavaScript"',
                              ' approved 3 new users',
                              ' posted in "React Hooks Discussion"',
                              ' updated system settings'
                            ][i % 4]}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {['2 hours ago', '5 hours ago', 'Yesterday, 11:30 PM', 'Today, 9:15 AM'][i % 4]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Current status of system components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'Database', status: 'operational', uptime: '99.98%' },
                    { name: 'API Services', status: 'operational', uptime: '100.00%' },
                    { name: 'Storage', status: 'operational', uptime: '99.95%' },
                    { name: 'Email Service', status: 'degraded', uptime: '98.32%' },
                  ].map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-3 ${
                          service.status === 'operational' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></div>
                        <span>{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          Uptime: {service.uptime}
                        </span>
                        <Badge variant="outline" className={
                          service.status === 'operational' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }>
                          {service.status === 'operational' ? 'Operational' : 'Degraded Performance'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts and permissions
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-8 w-full sm:w-[200px]"
                      />
                    </div>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 p-3 font-medium bg-secondary/50 text-sm">
                    <div className="col-span-2">User</div>
                    <div className="col-span-1">Role</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Join Date</div>
                    <div className="col-span-1">Courses</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  
                  {users.map((user) => (
                    <div key={user.id} className="grid grid-cols-7 p-3 border-t items-center text-sm">
                      <div className="col-span-2 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Badge className={`${getRoleColor(user.role)} capitalize`}>
                          {user.role}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="col-span-1 text-muted-foreground">
                        {new Date(user.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="col-span-1">
                        {user.courses}
                      </div>
                      <div className="col-span-1 flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing 5 of 1,247 users
                  </p>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>
                    Manage and configure user permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { role: 'Admin', count: 3, permissions: 'Full system access' },
                      { role: 'Teacher', count: 24, permissions: 'Course management, grading' },
                      { role: 'Student', count: 1220, permissions: 'Course access, forums' },
                    ].map((role, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Badge className={`${
                              i === 0 ? 'bg-red-100 text-red-800' : 
                              i === 1 ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'
                            } capitalize mr-2`}>
                              {role.role}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {role.count} users
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <p className="text-sm mt-2">
                          {role.permissions}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>
                    Registration trends and user activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Registration Sources</h3>
                      <div className="flex items-center space-x-4">
                        <div className="w-1/2 flex flex-col space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Direct</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <div className="w-1/2 flex flex-col space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Referral</span>
                            <span>32%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="w-1/2 flex flex-col space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Social</span>
                            <span>18%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '18%' }}></div>
                          </div>
                        </div>
                        <div className="w-1/2 flex flex-col space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>5%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 rounded-full" style={{ width: '5%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">User Activity</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Active Users</span>
                          </div>
                          <span className="font-medium">864</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">Inactive (30+ days)</span>
                          </div>
                          <span className="font-medium">327</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm">Dormant (90+ days)</span>
                          </div>
                          <span className="font-medium">56</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>Report Management</CardTitle>
                    <CardDescription>
                      Handle user reports and issues
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-md">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-3">
                        <div>
                          <h3 className="font-medium">{report.subject}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                              {report.type}
                            </Badge>
                            {getStatusBadge(report.status)}
                            <span className="text-xs text-muted-foreground">
                              Reported on {new Date(report.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex mt-3 md:mt-0">
                          <Button size="sm" className="mr-2">
                            <Check className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start mt-3">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback>{report.reportedBy.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            Reported by <span className="font-medium">{report.reportedBy}</span>
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {report.type === 'content' && 'This content contains inappropriate language and should be reviewed.'}
                            {report.type === 'user' && 'This user is posting promotional content across multiple discussions.'}
                            {report.type === 'technical' && 'The video content in Module 3 of Advanced JavaScript course is not loading.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <CardTitle>Reports Analytics</CardTitle>
                <CardDescription>
                  Overview of report trends and resolutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Content Reports
                      </h3>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        4 pending, 8 resolved
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        User Reports
                      </h3>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 pending, 6 resolved
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Technical Issues
                      </h3>
                      <p className="text-2xl font-bold">15</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        1 pending, 14 resolved
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3">Resolution Rate</h3>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Overall Resolution</span>
                        <span>82%</span>
                      </div>
                      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center mr-4">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span>Resolved</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-secondary mr-1"></div>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3">Average Resolution Time</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm">High Priority</span>
                        </div>
                        <span className="font-medium">12 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm">Medium Priority</span>
                        </div>
                        <span className="font-medium">36 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm">Low Priority</span>
                        </div>
                        <span className="font-medium">72 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>System Notifications</CardTitle>
                    <CardDescription>
                      Manage and send system-wide notifications
                    </CardDescription>
                  </div>
                  <Button>
                    <Bell className="h-4 w-4 mr-2" />
                    Create New Notification
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border rounded-md">
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{notification.title}</h3>
                            {getStatusBadge(notification.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="capitalize">
                              Target: {notification.target}
                            </Badge>
                            {notification.date && (
                              <span className="text-xs text-muted-foreground">
                                {notification.status === 'scheduled' ? 'Scheduled for: ' : 'Sent on: '}
                                {new Date(notification.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex mt-3 md:mt-0">
                          {notification.status === 'draft' && (
                            <Button size="sm" className="mr-2">
                              <CheckCheck className="h-4 w-4 mr-1" />
                              Send Now
                            </Button>
                          )}
                          {notification.status === 'scheduled' && (
                            <Button size="sm" className="mr-2">
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {notification.status !== 'draft' && (
                            <Button variant="ghost" size="sm" className="ml-2">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <CardTitle>Notification Templates</CardTitle>
                <CardDescription>
                  Manage reusable notification templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Welcome Message', description: 'Sent to new users after registration' },
                    { name: 'Course Reminder', description: 'Sent before scheduled course sessions' },
                    { name: 'Maintenance Alert', description: 'Notifies users about planned maintenance' },
                  ].map((template, i) => (
                    <div key={i} className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                      <div className="flex">
                        <Button variant="ghost" size="sm">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure platform-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Platform Name</Label>
                  <Input id="site-name" defaultValue="EduForum" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-desc">Platform Description</Label>
                  <Textarea 
                    id="site-desc" 
                    defaultValue="A learning platform for students and educators to connect and share knowledge." 
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="et">Eastern Time (ET)</SelectItem>
                        <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lang">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="maint-mode">Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Temporarily disable the site for maintenance
                    </p>
                  </div>
                  <Switch id="maint-mode" />
                </div>
                
                <Button className="mt-4">Save Changes</Button>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security and access control
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">
                        Require 2FA for admin accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Account Lockout</Label>
                      <p className="text-xs text-muted-foreground">
                        Lock accounts after failed login attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label>Password Requirements</Label>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Minimum 8 characters</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Require uppercase letters</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Require special characters</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-2 w-full">
                    Security Audit Log
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>
                    Configure email notifications and templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>SMTP Server</Label>
                    <Input defaultValue="smtp.example.com" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMTP Port</Label>
                      <Input defaultValue="587" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Encryption</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger>
                          <SelectValue placeholder="Select encryption" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Send notification emails
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Test email sent",
                        description: "A test email has been sent to the admin address."
                      });
                    }}
                    variant="outline" 
                    className="mt-2 w-full"
                  >
                    Send Test Email
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions that affect your entire platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive/50 rounded-md space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Reset All User Data</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        This will delete all user data except admin accounts. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Reset Data
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">System Factory Reset</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Reset the entire platform to factory settings. All data will be permanently erased.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Factory Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default AdminPanel;
