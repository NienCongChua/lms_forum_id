
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageCircle, Book, Bell, Clock, User, Calendar, CheckCheck, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'comment',
      title: 'New comment on your post',
      content: 'Alex commented on your forum post "Introduction to React Hooks"',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'course',
      title: 'New course material available',
      content: 'New lesson added to "Advanced JavaScript" course',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Upcoming session reminder',
      content: 'Your "Data Structures" session starts in 2 hours',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'system',
      title: 'System maintenance',
      content: 'The platform will be under maintenance on Sunday from 2-4 AM UTC',
      time: '2 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'comment',
      title: 'Your question was answered',
      content: 'Sarah answered your question about CSS Grid layouts',
      time: '3 days ago',
      read: true,
    },
  ];
  
  const filteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(notification => !notification.read);
      case 'forums':
        return notifications.filter(notification => notification.type === 'comment');
      case 'courses':
        return notifications.filter(notification => notification.type === 'course');
      case 'system':
        return notifications.filter(notification => notification.type === 'system');
      default:
        return notifications;
    }
  };
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'course':
        return <Book className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Calendar className="h-5 w-5 text-orange-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your activity</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 backdrop-blur-sm bg-white/50 border border-white/20">
            <TabsTrigger value="all">
              All
              {notifications.length > 0 && (
                <span className="ml-2 text-xs bg-primary/10 px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-2 text-xs bg-primary/10 px-2 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {filteredNotifications().length > 0 ? filteredNotifications().map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 flex items-start rounded-md transition-colors ${
                        !notification.read ? 'bg-primary/5' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className="mr-4 mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getIconForType(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  {notification.read ? 'Mark as unread' : 'Mark as read'}
                                </DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.content}
                        </p>
                        <div className="flex mt-2">
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="py-12 text-center">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                      <h3 className="font-medium text-lg mt-4">No notifications</h3>
                      <p className="text-muted-foreground mt-1">
                        You're all caught up! We'll notify you when there's something new.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Notifications;
