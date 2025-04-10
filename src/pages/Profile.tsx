
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PenLine, Upload, BookOpen, MessageCircle, Clock, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Sample user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'I am an enthusiastic learner interested in computer science and mathematics. I enjoy participating in forums and taking online courses to expand my knowledge.',
    occupation: 'Software Developer',
    location: 'New York, USA',
    joinDate: 'January 2023',
    website: 'https://johndoe.example.com',
    avatar: ''
  });
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically upload the avatar and submit the form data
    // For this demo, we'll just show a success toast
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="shadow-sm backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader className="pb-4 text-center">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt={userData.name} />
                    ) : (
                      <>
                        <AvatarImage src={userData.avatar} alt={userData.name} />
                        <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  
                  <CardTitle className="mt-4">{userData.name}</CardTitle>
                  <CardDescription className="text-sm">{userData.email}</CardDescription>
                  
                  <div className="mt-3">
                    <Badge variant="outline" className="mr-1">Advanced Learner</Badge>
                    <Badge variant="outline">Forum Contributor</Badge>
                  </div>
                </div>
                
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </CardHeader>
              
              {!isEditing && (
                <CardContent className="text-sm">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-1">Bio</h3>
                      <p>{userData.bio}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2">
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-1">Occupation</h3>
                        <p>{userData.occupation}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-1">Location</h3>
                        <p>{userData.location}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-1">Member Since</h3>
                        <p>{userData.joinDate}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-1">Website</h3>
                        <a href={userData.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          {userData.website.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
              
              {isEditing && (
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          {avatarPreview ? (
                            <AvatarImage src={avatarPreview} alt={userData.name} />
                          ) : (
                            <>
                              <AvatarImage src={userData.avatar} alt={userData.name} />
                              <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <Label 
                          htmlFor="avatar-upload" 
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-4 w-4" />
                        </Label>
                        <Input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Click the icon to upload a new avatar
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          value={userData.bio}
                          onChange={(e) => setUserData({...userData, bio: e.target.value})}
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="occupation">Occupation</Label>
                          <Input 
                            id="occupation" 
                            value={userData.occupation}
                            onChange={(e) => setUserData({...userData, occupation: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            value={userData.location}
                            onChange={(e) => setUserData({...userData, location: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          value={userData.website}
                          onChange={(e) => setUserData({...userData, website: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/50 border border-white/20">
                <TabsTrigger value="profile">Activity</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="discussions">My Discussions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex space-x-4 pb-4 border-b last:border-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Commented on "Advanced React Patterns"</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Thank you for sharing this information! It was very helpful for my project.
                            </p>
                            <p className="text-xs text-muted-foreground mt-2 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              2 days ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: "Course Completer", desc: "Completed 5 courses", icon: BookOpen },
                        { title: "Active Contributor", desc: "10+ forum posts", icon: MessageCircle },
                        { title: "Early Adopter", desc: "Joined during beta", icon: CalendarDays },
                      ].map((achievement, i) => (
                        <div key={i} className="flex space-x-3 p-3 border rounded-md">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <achievement.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex space-x-4 pb-4 border-b last:border-0">
                          <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img 
                              src={`https://source.unsplash.com/random/10${i}x10${i}?programming`} 
                              alt="Course" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Introduction to Machine Learning</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Instructor: Dr. Sarah Johnson
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-muted-foreground flex items-center">
                                <BookOpen className="h-3 w-3 mr-1" />
                                8 modules completed
                              </p>
                              <Badge variant="secondary">75% complete</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discussions">
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>My Forum Discussions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 border rounded-md">
                          <div className="flex justify-between">
                            <h3 className="font-medium">Help with React Hooks Implementation</h3>
                            <Badge variant="outline">Active</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            I'm struggling to understand how to use useEffect properly. Can someone explain...
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-xs text-muted-foreground flex items-center">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              12 replies
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Posted 5 days ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Profile;
