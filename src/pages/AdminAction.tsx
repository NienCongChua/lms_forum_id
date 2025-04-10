
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ArrowLeft, CheckCheck, Info, Shield, User, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const AdminAction = () => {
  const [actionType, setActionType] = useState('user');
  const [severity, setSeverity] = useState('medium');
  const [notify, setNotify] = useState(true);
  const [confirmInput, setConfirmInput] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Action submitted",
      description: "Your administrative action has been recorded and applied.",
    });
    
    // Navigate back to admin panel after successful action
    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Administrative Action</h1>
              <p className="text-muted-foreground">Apply administrative changes to the platform</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Action Type</CardTitle>
                  <CardDescription>
                    Select the type of action you want to perform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={actionType} onValueChange={setActionType} className="w-full">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="user" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        User Action
                      </TabsTrigger>
                      <TabsTrigger value="system" className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        System Action
                      </TabsTrigger>
                      <TabsTrigger value="announcement" className="flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Announcement
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="user" className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-select">Select User</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a user" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john">John Doe (john@example.com)</SelectItem>
                            <SelectItem value="sarah">Sarah Johnson (sarah@example.com)</SelectItem>
                            <SelectItem value="michael">Michael Chen (michael@example.com)</SelectItem>
                            <SelectItem value="david">David Kim (david@example.com)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="user-action">Action</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="suspend">Suspend Account</SelectItem>
                            <SelectItem value="restore">Restore Account</SelectItem>
                            <SelectItem value="promote">Change Role</SelectItem>
                            <SelectItem value="reset">Reset Password</SelectItem>
                            <SelectItem value="delete">Delete Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="user-reason">Reason</Label>
                        <Textarea 
                          id="user-reason" 
                          placeholder="Provide reason for this action..." 
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="system" className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="system-action">System Action</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Enable Maintenance Mode</SelectItem>
                            <SelectItem value="disable-reg">Disable New Registrations</SelectItem>
                            <SelectItem value="disable-forums">Disable Forums</SelectItem>
                            <SelectItem value="clear-cache">Clear System Cache</SelectItem>
                            <SelectItem value="backup">Create System Backup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (if applicable)</Label>
                        <div className="flex space-x-2">
                          <Input 
                            id="duration" 
                            type="number" 
                            placeholder="Duration"
                            min="1"
                          />
                          <Select defaultValue="hours">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minutes">Minutes</SelectItem>
                              <SelectItem value="hours">Hours</SelectItem>
                              <SelectItem value="days">Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="system-reason">Reason</Label>
                        <Textarea 
                          id="system-reason" 
                          placeholder="Provide reason for this action..." 
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="announcement" className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="announcement-title">Announcement Title</Label>
                        <Input 
                          id="announcement-title" 
                          placeholder="e.g., Important System Update" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="announcement-content">Content</Label>
                        <Textarea 
                          id="announcement-content" 
                          placeholder="Write your announcement here..." 
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Target Audience</Label>
                        <div className="space-y-2 mt-1">
                          <div className="flex items-center space-x-2">
                            <Switch id="target-all" defaultChecked />
                            <Label htmlFor="target-all">All Users</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="target-students" />
                            <Label htmlFor="target-students">Students Only</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="target-teachers" />
                            <Label htmlFor="target-teachers">Teachers Only</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Display Options</Label>
                        <div className="space-y-2 mt-1">
                          <div className="flex items-center space-x-2">
                            <Switch id="display-banner" defaultChecked />
                            <Label htmlFor="display-banner">Show as Banner</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="display-notification" defaultChecked />
                            <Label htmlFor="display-notification">Send as Notification</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="display-email" />
                            <Label htmlFor="display-email">Send as Email</Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Action Details</CardTitle>
                  <CardDescription>
                    Configure additional details for this action
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Action Severity</Label>
                    <RadioGroup 
                      value={severity} 
                      onValueChange={setSeverity}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="severity-low" />
                        <Label htmlFor="severity-low" className="text-green-600 font-medium">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="severity-medium" />
                        <Label htmlFor="severity-medium" className="text-amber-600 font-medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="severity-high" />
                        <Label htmlFor="severity-high" className="text-red-600 font-medium">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-admin">Notify Other Administrators</Label>
                      <p className="text-xs text-muted-foreground">
                        Send a notification to other administrators
                      </p>
                    </div>
                    <Switch 
                      id="notify-admin" 
                      checked={notify}
                      onCheckedChange={setNotify}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-notes">Administrator Notes</Label>
                    <Textarea 
                      id="admin-notes" 
                      placeholder="Add any additional notes for other administrators..." 
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      These notes are only visible to administrators
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20 border-red-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <CardTitle className="text-red-600">Confirmation</CardTitle>
                      <CardDescription>
                        This action will be logged and cannot be automatically undone
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    To confirm this action, please type <span className="font-bold">"CONFIRM"</span> below:
                  </p>
                  <Input 
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    placeholder="Type CONFIRM here"
                  />
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/admin')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={confirmInput !== 'CONFIRM'}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Apply Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default AdminAction;
